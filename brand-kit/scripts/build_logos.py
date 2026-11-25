#!/usr/bin/env python3
"""Build the ten forty five logo files as outlined SVGs.

Text is shaped with HarfBuzz (kerning on) and converted to paths, so the
SVGs need no fonts installed. Re-run after changing a colour or spacing:

    pip install fonttools uharfbuzz
    python3 brand-kit/scripts/build_logos.py
"""
from pathlib import Path

import uharfbuzz as hb
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

KIT = Path(__file__).resolve().parent.parent
FONTS = KIT / "fonts"
OUT = KIT / "logos" / "svg"

MIDNIGHT, STEEL, MIST, CLOUD, WHITE = "#142C3B", "#52788F", "#A9BDC9", "#EDF2F5", "#FFFFFF"

DISPLAY = FONTS / "InterTight-SemiBold.ttf"   # wordmark face
ACCENT = FONTS / "InstrumentSerif-Italic.ttf"   # tagline face

WORDMARK = "ten forty five"
TAGLINE = "we sit next to you, not above you."
TRACK_WORDMARK = -0.045   # em
TRACK_TAGLINE = -0.01     # em

_cache = {}


def _font(path):
    if path not in _cache:
        blob = hb.Blob.from_file_path(str(path))
        tt = TTFont(str(path))
        _cache[path] = (hb.Font(hb.Face(blob)), tt, tt.getGlyphSet(), tt.getGlyphOrder(), tt["head"].unitsPerEm)
    return _cache[path]


def text_path(path, text, size, x0=0.0, y0=0.0, tracking=0.0):
    """Return (svg path data, end x, bounds) for text set on baseline y0."""
    hbfont, _, gs, order, upem = _font(path)
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(hbfont, buf, {"kern": True, "liga": True})
    s = size / upem
    x = x0
    cmds = []
    bounds = [float("inf"), float("inf"), float("-inf"), float("-inf")]
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        g = gs[order[info.codepoint]]
        t = (s, 0, 0, -s, x + pos.x_offset * s, y0 - pos.y_offset * s)
        pen = SVGPathPen(gs, ntos=lambda v: f"{v:.2f}".rstrip("0").rstrip("."))
        g.draw(TransformPen(pen, t))
        cmds.append(pen.getCommands())
        bp = BoundsPen(gs)
        g.draw(TransformPen(bp, t))
        if bp.bounds:
            b = bp.bounds
            bounds = [min(bounds[0], b[0]), min(bounds[1], b[1]), max(bounds[2], b[2]), max(bounds[3], b[3])]
        x += pos.x_advance * s + tracking * size
    return " ".join(c for c in cmds if c), x, bounds


def write_svg(name, title, w, h, body, pad=0.0):
    vb = f"{-pad:.2f} {-pad:.2f} {w + 2 * pad:.2f} {h + 2 * pad:.2f}"
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" '
           f'width="{w + 2 * pad:.0f}" height="{h + 2 * pad:.0f}" role="img" aria-label="{title}">\n'
           f'<title>{title}</title>\n{body}\n</svg>\n')
    (OUT / name).write_text(svg)
    print("wrote", name)


def wordmark(text_col, dot_col, size=100.0):
    """Primary wordmark: 'ten forty five' + square full stop on the baseline."""
    d, end, b = text_path(DISPLAY, WORDMARK, size, tracking=TRACK_WORDMARK)
    dot = 0.16 * size
    dx = end + 0.06 * size
    top, bottom = b[1], b[3]
    w = dx + dot
    shift = -top
    body = (f'<g transform="translate(0 {shift:.2f})">'
            f'<path fill="{text_col}" d="{d}"/>'
            f'<rect fill="{dot_col}" x="{dx:.2f}" y="{-dot:.2f}" width="{dot:.2f}" height="{dot:.2f}"/></g>')
    return w, bottom - top, body, shift


def stacked(text_col, bar_col, size=100.0):
    """Secondary: three stacked lines with a vertical rule on the left."""
    bar_w, gap, lead = 0.09 * size, 0.32 * size, 0.92 * size
    x = bar_w + gap
    parts, tops, bottoms, rights = [], [], [], []
    for i, word in enumerate(["ten", "forty", "five"]):
        d, _, b = text_path(DISPLAY, word, size, x0=x, y0=i * lead, tracking=-0.04)
        parts.append(f'<path fill="{text_col}" d="{d}"/>')
        tops.append(b[1]); bottoms.append(b[3]); rights.append(b[2])
    top = tops[0]
    bar_bottom = 2 * lead + 0.02 * size
    h = max(bottoms[-1], bar_bottom) - top
    body = (f'<g transform="translate(0 {-top:.2f})">'
            f'<rect fill="{bar_col}" x="0" y="{top:.2f}" width="{bar_w:.2f}" height="{bar_bottom - top:.2f}"/>'
            + "".join(parts) + "</g>")
    return max(rights), h, body


def tagline_lockup(text_col, dot_col, tag_col, size=100.0):
    w1, h1, body1, shift = wordmark(text_col, dot_col, size)
    tsize = size * 22 / 30
    base = shift + 1.15 * size
    d, end, b = text_path(ACCENT, TAGLINE, tsize, y0=base, tracking=TRACK_TAGLINE)
    w = max(w1, b[2])
    h = b[3]
    body = body1 + f'\n<path fill="{tag_col}" d="{d}"/>'
    return w, h, body


def compact(bg, t_col, bar_col):
    """Compact mark: a lowercase 't' above a progress bar at 72%, on a 96-unit square."""
    s = 96.0
    d, _, b = text_path(DISPLAY, "t", 44)
    gw, gh = b[2] - b[0], b[3] - b[1]
    tx = (s - gw) / 2 - b[0]
    ty = 62 - b[3]
    bx, bw, by, bh = 22.0, 52.0, 71.0, 5.0
    body = (f'<rect fill="{bg}" width="{s}" height="{s}"/>'
            f'<path fill="{t_col}" transform="translate({tx:.2f} {ty:.2f})" d="{d}"/>'
            f'<rect fill="{bar_col}" fill-opacity=".3" x="{bx}" y="{by}" width="{bw}" height="{bh}"/>'
            f'<rect fill="{bar_col}" x="{bx}" y="{by}" width="{bw * .72:.2f}" height="{bh}"/>')
    return s, s, body


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for name, cols, title in [
        ("wordmark-primary", (MIDNIGHT, STEEL), "ten forty five"),
        ("wordmark-reverse", (WHITE, MIST), "ten forty five"),
        ("wordmark-on-steel", (WHITE, MIDNIGHT), "ten forty five"),
        ("wordmark-mono-midnight", (MIDNIGHT, MIDNIGHT), "ten forty five"),
        ("wordmark-mono-white", (WHITE, WHITE), "ten forty five"),
    ]:
        w, h, body, _ = wordmark(*cols)
        write_svg(f"tff-{name}.svg", title, w, h, body)
    for name, cols in [("stacked-primary", (MIDNIGHT, STEEL)), ("stacked-reverse", (WHITE, MIST))]:
        w, h, body = stacked(*cols)
        write_svg(f"tff-{name}.svg", "ten forty five", w, h, body)
    for name, cols in [("tagline-primary", (MIDNIGHT, STEEL, STEEL)), ("tagline-reverse", (WHITE, MIST, MIST))]:
        w, h, body = tagline_lockup(*cols)
        write_svg(f"tff-{name}.svg", "ten forty five. we sit next to you, not above you.", w, h, body)
    for name, cols in [("mark-midnight", (MIDNIGHT, WHITE, MIST)), ("mark-steel", (STEEL, WHITE, MIDNIGHT)),
                       ("mark-cloud", (CLOUD, MIDNIGHT, STEEL))]:
        w, h, body = compact(*cols)
        write_svg(f"tff-{name}.svg", "ten forty five compact mark", w, h, body)


if __name__ == "__main__":
    main()
