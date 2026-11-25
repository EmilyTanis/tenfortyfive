# ten forty five: brand guidelines v1.0

**Status:** Approved, November 2026
**Direction:** The Modern Consultancy with editorial accents
**Visual reference:** [`brand-board.html`](brand-board.html) ([preview](previews/brand-board.jpg))

## 1. Who we are

ten forty five is a business growth partner covering marketing strategy, digital experiences, lead generation, AI, automation and marketing efficiency. We work like an in-house team, not an outside agency: we understand the business problem first, then build and run the marketing solution.

**Philosophy:** *We sit next to you, not above you.*

**Audiences**
1. Small-business owners and entrepreneurs with little marketing experience, who need affordable, easy-to-use resources.
2. Growing and established businesses that need sophisticated, customised strategy, systems and solutions.

**Personality:** sharp, structured, efficient. Intelligent but approachable. Witty, natural and human. Clear and confident. Professional without being corporate: the capable partner everyone wants in the room.

## 2. Logo

| Asset | File | Use |
|---|---|---|
| Primary wordmark | `logos/svg/tff-wordmark-primary.svg` | Default on white or cloud |
| Reverse wordmark | `logos/svg/tff-wordmark-reverse.svg` | On midnight |
| Wordmark on steel | `logos/svg/tff-wordmark-on-steel.svg` | On steel |
| Mono | `logos/svg/tff-wordmark-mono-midnight.svg`, `-mono-white.svg` | One-colour print, embossing, foil |
| Stacked lockup | `logos/svg/tff-stacked-primary.svg`, `-reverse.svg` | Tall formats, signage |
| Tagline lockup | `logos/svg/tff-tagline-primary.svg`, `-reverse.svg` | Campaigns, cards, title slides |
| Compact mark | `logos/svg/tff-mark-midnight.svg`, `-steel.svg`, `-cloud.svg` | Avatars, app icons, favicons |

- The wordmark is **ten forty five.** in lowercase, set in Inter Tight SemiBold at −4.5% tracking, ending in a square full stop. The square is the brand's only ornament.
- The compact mark is a lowercase "t" above a progress bar at 72%: always moving forward.
- **Clear space:** the height of the "t" on every side. **Minimum size:** 96px or 25mm wide for the wordmark, 16px for the compact mark.
- Use the supplied files. Don't retype the wordmark, except in live web text using the `.tff-wordmark` class from `tokens/tokens.css`.
- **Never:** capitalise it, put it in italics, add gradients, shadows or outlines, stretch, rotate or recolour it outside the approved pairings, or use the compact mark in place of the wordmark as the main logo.

## 3. Colour

| Name | HEX | RGB | CMYK (approx.) | Role |
|---|---|---|---|---|
| Midnight | `#142C3B` | 20 44 59 | 88 63 42 52 | Primary text and dark grounds |
| Steel | `#52788F` | 82 120 143 | 70 40 28 12 | Accent, at most 10% of a layout |
| Mist | `#A9BDC9` | 169 189 201 | 34 16 12 0 | Support, text on dark grounds |
| Cloud | `#EDF2F5` | 237 242 245 | 6 2 2 0 | Panels and surfaces |
| White | `#FFFFFF` | 255 255 255 | 0 0 0 0 | Base |

- **Ratio:** 35 white · 30 midnight · 20 cloud · 10 steel · 5 mist.
- **Approved pairings:** midnight on white, midnight on cloud, white on midnight, white on steel, mist on midnight (for secondary text only).
- No other hues. Emphasis comes from contrast, weight and scale, not extra colour. No gradients and no neon.
- Before printing, confirm the CMYK values with a proof.

## 4. Typography

| Role | Typeface | Weights | Settings |
|---|---|---|---|
| Display and headlines | Inter Tight | 500, 600 | Tracking −2.5% (headings) to −4.5% (display), line height 1.0–1.1 |
| Body | Inter | 400, 500 | 15–17px, line height 1.55–1.6, about 65 characters per line |
| Labels, data, metadata | IBM Plex Mono | 400, 500 | 11px, uppercase, +8% tracking |
| Accent | Instrument Serif *Italic* | 400 | 1.1× the size of the surrounding headline |

**Type scale (desktop):** display 76 · H1 56 · H2 40 · H3 28 · body-lg 17 · body 15 · label 11. At phone width: display 44 · H1 38 · H2 30.

**The italic accent.** This is the brand's second voice, the moment it sounds human:
- Use it once per layout, for a phrase rather than a whole headline. For example: "We sit next to you, *not above you.*"
- Set it in steel on light grounds and mist on dark grounds, or in the headline colour.
- Never use it in the logo, body copy, buttons or labels.

All fonts are in `fonts/` under the SIL Open Font License and are free on Google Fonts.

## 5. Layout

- **Grid:** 12 columns, 20px gutter, 40px page margin (16px on phones), 1280px maximum width.
- **One idea per layout:** one headline, one proof point, one action.
- **Whitespace is structure.** Leave at least a third of any composition empty.
- **Corners are square** everywhere, including buttons, cards, images and the compact mark.
- Hairlines (1px cloud on light, mist at 35% on dark) separate content instead of boxes and shadows.
- Use shadows only on physical mockups (cards, documents), never in UI.

## 6. Graphic elements

| Element | Description | Use |
|---|---|---|
| Column rules | Hairline verticals on the 12-column grid | Backgrounds, dividers, cover details |
| Progress bars | Solid steel or mist bars of varying length | Momentum, steps, data, card and slide footers |
| Measuring ticks | A ruler line with a long tick every third column | Framing key figures, document covers |
| Pull quote | A large serif opening quote mark with italic quote text | Client voices and testimonials |
| Carousel pager | A segmented bar showing slide position | Every Instagram carousel slide |

Avoid: AI imagery, robots, circuit boards, glowing tech graphics, rounded playful shapes, icons as decoration, stock illustrations.

## 7. Photography and art direction

- **Documentary, not staged.** Show owners in their own spaces, teams at real tables and hands on real work.
- Use natural light and a cool white balance, never warmer than 5200K. Lift the shadows and keep the mid-tones neutral.
- Place the subject off-centre and leave about a third of the frame clear for type.
- Architectural detail (structure, light and shadow) works as texture.
- **Never:** handshakes, people pointing at whiteboards, glowing screens, VR headsets, generic corporate stock.

## 8. Voice

Write the way a sharp, friendly colleague talks: short sentences, plain words and a little wit.

| We say | We don't say |
|---|---|
| Fix the funnel before you fund the ads. | Leverage an omnichannel growth solution. |
| Your marketing, minus the guesswork. | Unlock your brand's full potential. |
| Here's what we'd change, and why. | Our proprietary methodology delivers synergy. |

- Lead with the business problem, then the marketing answer.
- Use numbers when we have them, such as "−41% cost per lead", and never invent them.
- Be witty only when it makes the point clearer. Never be snarky about clients or competitors.

## 9. Applications

Ready-made templates are in [`templates/`](templates/):

| Template | Size |
|---|---|
| `business-card.html` | 85 × 55 mm, front and back |
| `instagram-carousel.html` | 1080 × 1080 slides: cover, step, data, close |
| `linkedin-post.html` | 1200 × 1200 point of view, 1200 × 627 client result |
| `ads.html` | 300 × 250, 728 × 90, 1080 × 1080 feed, 1080 × 1920 story |
| `proposal-cover.html` | A4 |
| `workbook-cover.html` | A4 |
| `website-hero.html` | Responsive homepage hero with nav and stats |

## 10. Checklist before anything ships

- [ ] The logo is a supplied file, lowercase, with clear space, at or above minimum size
- [ ] Only the five brand colours are used, and steel covers 10% or less
- [ ] Inter Tight for headlines, Inter for body, Plex Mono for labels
- [ ] At most one italic accent phrase
- [ ] Aligned to the 12-column grid, with square corners
- [ ] One headline, one proof point, one action
- [ ] No AI imagery, gradients, stock poses or rounded playful type
