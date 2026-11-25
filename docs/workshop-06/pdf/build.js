// Build branded A4 PDFs for Workshop 06 from the reconciled Markdown.
// Usage (from the repo root): node docs/workshop-06/pdf/build.js
// Needs Playwright + Chromium. Uses brand-kit fonts, wordmark and colours (brand-kit/guidelines.md).
const { chromium } = require('playwright');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../..');
const W06 = path.resolve(__dirname, '..');
const KIT = path.join(ROOT, 'brand-kit');
const url = (p) => 'file://' + p;

const DOCS = [
  {
    src: '01-sales-playbook.md', out: 'ten-forty-five-sales-playbook.pdf', kicker: 'Internal reference · Workshop 06',
    title: 'The sales <span class="accent">playbook.</span>',
    sub: 'How we find, talk to and earn the trust of the right customers.',
  },
  {
    src: '02-sales-academy.md', out: 'ten-forty-five-sales-academy-workbook.pdf', kicker: 'Workbook · Workshop 06',
    title: 'Sales <span class="accent">academy.</span>',
    sub: 'Six modules and three assessments. Learn, apply, practice, demonstrate.',
  },
  {
    src: '04-angelo-launch-plan.md', out: 'ten-forty-five-angelo-launch-action-plan.pdf', kicker: 'Internal · Workshop 06',
    title: 'Launch <span class="accent">action plan.</span>',
    sub: 'Angelo · November 25 to December 27, 2026, with the soft launch on December 15.',
  },
];

// Minimal Markdown → HTML for the constructs these documents use.
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const inline = (s) => esc(s)
  .replace(/`([^`]+)`/g, '<code>$1</code>')
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');

function md(text) {
  const lines = text.split('\n');
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim()) { i++; continue; }
    if (l.startsWith('## ')) { out.push(`<h2>${inline(l.slice(3))}</h2>`); i++; continue; }
    if (l.startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith('|')) rows.push(lines[i++]);
      const cells = (r) => r.replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
      const [head, , ...body] = rows;
      out.push('<table><thead><tr>' + cells(head).map((c) => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>' +
        body.map((r) => '<tr>' + cells(r).map((c) => `<td>${inline(c)}</td>`).join('') + '</tr>').join('') + '</tbody></table>');
      continue;
    }
    if (/^- \[ \] /.test(l)) {
      const items = [];
      while (i < lines.length && /^- \[ \] /.test(lines[i])) items.push(lines[i++].slice(6));
      out.push('<ul class="check">' + items.map((t) => `<li>${inline(t)}</li>`).join('') + '</ul>');
      continue;
    }
    if (/^(- |\d+\. )/.test(l)) {
      const ordered = /^\d+\. /.test(l);
      const items = [];
      while (i < lines.length && /^(- |\d+\. )/.test(lines[i])) items.push(lines[i++].replace(/^(- |\d+\. )/, ''));
      const tag = ordered ? 'ol' : 'ul';
      out.push(`<${tag}>` + items.map((t) => `<li>${inline(t)}</li>`).join('') + `</${tag}>`);
      continue;
    }
    const para = [];
    while (i < lines.length && lines[i].trim() && !/^(## |\||- |\d+\. )/.test(lines[i])) para.push(lines[i++]);
    out.push(`<p>${inline(para.join(' '))}</p>`);
  }
  return out.join('\n');
}

const fontFaces = [
  ['Inter Tight', 500, 'normal', 'InterTight-Medium'], ['Inter Tight', 600, 'normal', 'InterTight-SemiBold'],
  ['Inter', 400, 'normal', 'Inter-Regular'], ['Inter', 500, 'normal', 'Inter-Medium'], ['Inter', 600, 'normal', 'Inter-SemiBold'],
  ['IBM Plex Mono', 400, 'normal', 'IBMPlexMono-Regular'], ['IBM Plex Mono', 500, 'normal', 'IBMPlexMono-Medium'],
  ['Instrument Serif', 400, 'italic', 'InstrumentSerif-Italic'],
].map(([f, w, s, file]) => `@font-face{font-family:"${f}";font-weight:${w};font-style:${s};src:url("${url(path.join(KIT, 'fonts', file + '.ttf'))}")}`).join('\n');

const CSS = `${fontFaces}
:root{--midnight:#142C3B;--steel:#52788F;--mist:#A9BDC9;--cloud:#EDF2F5}
@page{size:A4;margin:22mm 20mm 24mm}
@page:first{margin:0}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:"Inter",sans-serif;font-size:10.5pt;line-height:1.58;color:var(--midnight);-webkit-print-color-adjust:exact;print-color-adjust:exact}
.cover{width:210mm;height:297mm;padding:19mm;display:flex;flex-direction:column;justify-content:space-between;page-break-after:always;position:relative}
.cover .rules{position:absolute;inset:0;display:grid;grid-template-columns:repeat(12,1fr);padding:0 19mm;gap:0 5mm;pointer-events:none}
.cover .rules i{border-left:1px solid var(--cloud)}
.cover .top,.cover .mid,.cover .foot{position:relative}
.cover .top{display:flex;justify-content:space-between;align-items:center}
.cover .top img{width:50mm}
.label{font-family:"IBM Plex Mono",monospace;font-size:8pt;letter-spacing:.08em;text-transform:uppercase;color:var(--steel)}
.bars{display:flex;flex-direction:column;gap:3mm;margin-bottom:14mm}.bars i{display:block;height:3mm}
.cover h1{font-family:"Inter Tight",sans-serif;font-weight:600;font-size:54pt;line-height:1.02;letter-spacing:-.04em}
.accent{font-family:"Instrument Serif",serif;font-style:italic;font-weight:400;letter-spacing:-.01em;color:var(--steel);font-size:1.1em}
.cover .sub{font-size:15pt;line-height:1.4;color:var(--steel);margin-top:7mm;max-width:30ch}
.cover .foot{display:flex;justify-content:space-between;border-top:1px solid var(--cloud);padding-top:4mm}
h2{font-family:"Inter Tight",sans-serif;font-weight:600;font-size:17pt;letter-spacing:-.025em;line-height:1.15;margin:9mm 0 3mm;padding-top:4mm;border-top:1px solid var(--cloud);break-after:avoid}
.content>h2:first-child{margin-top:0;border-top:0;padding-top:0}
p{margin:0 0 3mm;max-width:68ch}
strong{font-weight:600}
code{font-family:"IBM Plex Mono",monospace;font-size:8.5pt;background:var(--cloud);padding:0 1mm}
ul,ol{margin:0 0 3.5mm 5mm}li{margin:0 0 1.2mm;padding-left:1.5mm}
ul{list-style:none}ul>li{position:relative}ul>li::before{content:"";position:absolute;left:-4mm;top:2.2mm;width:1.4mm;height:1.4mm;background:var(--steel)}
ul.check>li::before{width:3mm;height:3mm;top:1.3mm;left:-5mm;background:none;border:1px solid var(--midnight)}
ul.check{margin-left:6mm}
table{width:100%;border-collapse:collapse;margin:1mm 0 5mm;font-size:9.5pt;break-inside:avoid}
th{font-family:"IBM Plex Mono",monospace;font-weight:500;font-size:7.5pt;letter-spacing:.08em;text-transform:uppercase;text-align:left;background:var(--midnight);color:#fff;padding:2mm 2.5mm}
td{padding:2mm 2.5mm;border-bottom:1px solid var(--cloud);vertical-align:top}
tbody tr:nth-child(even) td{background:#F6F9FA}
`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const wordmark = url(path.join(KIT, 'logos', 'svg', 'tff-wordmark-primary.svg'));
  for (const d of DOCS) {
    const raw = fs.readFileSync(path.join(W06, d.src), 'utf8');
    const [, meta] = raw.split('\n');
    const body = raw.split('\n').slice(2).join('\n');
    const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><style>${CSS}</style></head><body>
<section class="cover"><div class="rules">${'<i></i>'.repeat(12)}</div>
  <div class="top"><img src="${wordmark}" alt="ten forty five"><span class="label">${esc(d.kicker)}</span></div>
  <div class="mid"><div class="bars"><i style="background:var(--midnight);width:90%"></i><i style="background:var(--steel);width:65%"></i><i style="background:var(--mist);width:40%"></i></div>
    <h1>${d.title}</h1><p class="sub">${esc(d.sub)}</p></div>
  <div class="foot"><span class="label">${esc(meta.split('·').pop().trim())}</span><span class="label">Internal · do not distribute</span></div>
</section>
<main class="content">${md(body)}</main></body></html>`;
    const tmp = path.join(os.tmpdir(), `tff-w06-${path.basename(d.out, '.pdf')}.html`);
    fs.writeFileSync(tmp, html);
    await page.goto(url(tmp), { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({
      path: path.join(__dirname, d.out), format: 'A4', printBackground: true, preferCSSPageSize: true,
      displayHeaderFooter: true, headerTemplate: '<span></span>',
      footerTemplate: `<div style="width:100%;padding:0 20mm;display:flex;justify-content:space-between;font-family:'IBM Plex Mono',monospace;font-size:7pt;letter-spacing:.08em;text-transform:uppercase;color:#52788F"><span>ten forty five · ${esc(d.kicker.split('·')[0].trim())}</span><span class="pageNumber"></span></div>`,
    });
    console.log('wrote', path.relative(ROOT, path.join(__dirname, d.out)));
  }
  await browser.close();
})();
