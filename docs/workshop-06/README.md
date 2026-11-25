# Workshop 06: sales academy and business development

Completed November 25, 2026 (in ChatGPT). Integrated into the repository through Claude Code and reconciled against the approved source of truth. **Status: draft v1, pending founder review of the open items below.**

## What's here

| File | What it is |
|---|---|
| [`05-decision-record.md`](05-decision-record.md) | Workshop 06 decisions, unchanged from the handoff |
| [`01-sales-playbook.md`](01-sales-playbook.md) | Sales and business development playbook (reconciled) |
| [`02-sales-academy.md`](02-sales-academy.md) | Six-module Sales Academy workbook and certification (reconciled) |
| [`03-ai-coaching.md`](03-ai-coaching.md) | Instructions for the AI coach and assessor (reconciled) |
| [`04-angelo-launch-plan.md`](04-angelo-launch-plan.md) | Angelo's launch action plan, Nov 25 – Dec 27 (reconciled with the Workshop 05 timeline) |
| [`pdf/`](pdf/) | Branded PDFs of the playbook, workbook and Angelo's plan, plus `build.js` to regenerate them |
| [`source/`](source/) | The handoff package exactly as received, for audit |

Regenerate the PDFs after editing the Markdown, from the repo root: `node docs/workshop-06/pdf/build.js` (needs Playwright). The PDFs use the brand kit's fonts, wordmark, five colours, progress bars, column rules and the workbook cover layout from `brand-kit/templates/workbook-cover.html`.

## Approved in Workshop 06

- One comprehensive certification: six modules, three AI-led assessments, at least 85/100 on each, and a retake after any critical error.
- No live outreach before certification.
- Evergreen training is kept separate from Angelo's dated plan.
- Equal attention to new and established businesses; New Jersey first.
- Respectful, personalized outreach; listen before recommending.
- HubSpot documentation.
- Technical scope and discounts require approval.

## How the handoff was reconciled

Approved repository decisions win over the handoff's placeholders and proposed defaults:

| Handoff said | Reconciled to | Source |
|---|---|---|
| "Use the approved four packages and pricing" (not filled in) | do it yourself. $19/$29/$49 · get started. $1,500 · think bigger. $3,500 · let's talk. custom, with Workshop 05 definitions, the buying flow and support terms | `brand/messaging.md` v1.1, `docs/workshop-05.md` |
| "We sit beside business owners, not above them" | Approved tagline and core message first (*your business. our expertise.* / *You know your business. We know how to help.*), then the approved philosophy wording *we sit next to you, not above you.* | `brand/messaging.md`, `brand-kit/guidelines.md` |
| "Approved four-touch sequence and timing" | The approved scripts: a first message and two follow-ups. The fourth touch and timing are flagged, not invented | `sales/playbook.md` |
| Outreach could begin Dec 7–13 | No sending before the **Dec 15 soft launch**. Dec 7–14 is research and drafting outreach for approval | `docs/workshop-05.md` decision 10 |
| 3 h of "business formation and finance coordination" | Angelo **leads the LLC setup** (file by Dec 1, bank by Dec 5, Stripe by Dec 8). Academy hours trimmed (7→6 study, 4→3 assessments) to fit 15 h | `docs/workshop-05.md` decision 10 |
| Activity targets only | Added the approved primary measure: **one qualified meeting booked per week**, reviewed after 30 days | Workshop 02, `sales/playbook.md` |
| No compliance line | Added CAN-SPAM, accurate sender identity and opt-outs | `sales/playbook.md` |
| Critical errors list | Added: stating a package name or price that differs from `brand/messaging.md` | — |

## Unresolved discrepancies for founder decision

1. **Four-touch sequence.** Workshop 06 says four touches with set timing. The approved scripts have three, and no timing is approved. Write and approve the fourth touch and the spacing.
2. **Phone outreach.** Workshop 06 adds phone openers. The Nov 24 strategy meeting set email and social as Angelo's starting channels, not calls. The docs say "phone where appropriate". Confirm whether phone joins the sequence.
3. **Target segments.** The Workshop 03 assignment and `sales/playbook.md` start with home services, beauty/wellness and professional services. Workshop 06 says equal attention to new and established businesses, with no segments. Confirm whether the three segments still apply.
4. **Angelo's first week.** Workshop 03 assigned 20 researched businesses, a top-10 ranking and three emails plus two follow-ups by Dec 1. Workshop 06 replaces this with academy study and five training records, and the LLC setup was added on top. Confirm which applies this week.
5. **Proposed defaults awaiting approval:** the scoring rubric weights, the CRM stages, the weekly activity targets and the hour splits in Angelo's plan.
6. **Two sales playbooks.** `sales/playbook.md` (Workshop 04 messaging and scripts) and `docs/workshop-06/01-sales-playbook.md` (full process) now overlap. Both are kept; nothing was overwritten. Decide whether to merge them into one.
7. **Brand kit vs. approved messaging (pre-existing).** `brand-kit/guidelines.md` calls ten forty five a "business growth partner", and the tagline lockup SVGs read *we sit next to you, not above you.* Workshop 04 approved "Marketing & Technology Consultancy", the official tagline *your business. our expertise.*, and avoiding "partner" as a default descriptor. The brand kit predates Workshop 04. A new tagline lockup and a guidelines update are needed. The PDFs use the plain wordmark only.
8. **Next workshop scope.** The decision record lists website creative direction, messaging, sitemap, customer journey and the Claude Code development brief. Sitemap and customer journey were already decided in Workshop 05 (run in Claude Code). The remaining scope is creative direction and the development brief.
9. **Decision record's open verification items.** The GitHub push is now done through this branch. **Drive: no Workshop 06 files were found in the ten forty five folder**, so they still need publishing. Angelo's Drive and GitHub access, and the recap email, can't be verified from here.
10. **Merge order.** These docs cite `docs/workshop-05.md` and `brand/messaging.md` v1.1, which are in [EmilyTanis/tenfortyfive#1](https://github.com/EmilyTanis/tenfortyfive/pull/1). Merge that pull request first, or the links won't resolve on `main`.

The PDFs are marked "Draft v1" on the cover. Rebuild them once these items are settled.
