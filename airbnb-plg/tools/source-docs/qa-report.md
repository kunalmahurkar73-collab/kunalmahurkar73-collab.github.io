# QA record

## Public-source review update, 28 November 2026

- Added a separate secondary-research view containing 20 observations across 17 source discussions/posts; no invented survey answers or demographics.
- Verified all source records have citations, source locations, date/date-uncertainty fields, summaries and explicit limitations.
- Browser checks passed for context/theme filters and synthetic/public/real separation: synthetic traveller count remains 100; public review count is 20; project survey and interview counts remain zero.
- PDF-only download checks passed, with no visible Markdown links. Edge axe scans found zero automated violations on the two tested pages.
- Public-review PDF and refreshed report/deck were rendered for visual review. Public claims and identities were not independently verified; no representative or causal conclusion is claimed.

## Update: 28 November 2026

- Featured Airbnb above the homepage Work grid and moved its project card first; refreshed asset versions.
- Added sixteen actual 390px mobile prototype captures and four stage-by-stage current-capability/proposed comparisons. Current views are labelled illustrations, not captured Airbnb screens.
- Verified all comparison selectors, the interactive Desktop/Mobile preview switch, and page-width containment at 390, 768 and 1440px.
- Made scrollable phone previews keyboard focusable; repeated Edge axe checks found zero automated violations on the case-study and initial survey screens.
- Changed the public download library to PDF/PowerPoint files only. Research documents are rendered PDFs. Source Markdown, CSV and image files remain repository materials and are not exposed as download buttons.
- Survey collection remains unconfigured and submission remains disabled. No genuine submissions are claimed.

Executed 27 November 2026. Results apply to the feature branch and local static preview, not a production Airbnb service.

| Check actually executed | Result |
|---|---|
| Node syntax checks for application, model, research, survey and Worker | Passed |
| Deterministic data generation assertions | Passed: 100 travellers, 20 hosts, 12 fictional interview scenarios; segments 35/30/20/15; pain counts 68/61/57/54/48/32 |
| Financial model independent expected values | Passed: 4,000 incremental bookings; INR 4.8 crore GBV; INR 74.4 lakh accommodation fee revenue; INR 90.4 lakh total platform revenue; INR 76.4 lakh contribution before fixed; INR 51.4 lakh net contribution; break-even 597 incremental bookings; ROI 131.79% |
| Model edge cases, date validation, RICE, filters, readiness and full property cost | Passed |
| Worker tests with mocked Turnstile and Supabase providers | Passed: configured/unconfigured states, input/enum/consent validation, wrong origins, hostname mismatch, 16KB bound, rate limit and mocked success |
| Installed Chrome automated browser flows | Passed for all four MVP workflows across sixteen screens; invalid dates, sample invitation, selected property, insufficient budget block, consent, rebooking, readiness actions, activity pricing and optional skip |
| Research dashboard interaction | Passed: 100 synthetic travellers to 35 existing Airbnb customers; real mode has zero verified published responses and no synthetic charts |
| Revenue and RICE UI recalculation | Passed: base and zero-uplift cases; zero confidence gives zero RICE |
| Survey traveller and host branching | Passed: consent required, role-specific fields, final submit disabled while unconfigured |
| Responsive layout | No horizontal page overflow at 390, 768 and 1440 CSS pixels; screenshots captured and inspected |
| Edge accessibility scan using axe WCAG 2 A/AA and 2.1 AA rules | Zero automated violations in landing page and initial survey screen |
| Existing homepage | Five project cards and chatbot dialog open verified; previous project files and CNAME unchanged |
| Same-origin assets and downloads | Browser scan found no broken requested resources or uncaught page errors; downloadable targets checked over local HTTP |
| PDF generation and visual QA | All 23 report pages and 5 executive slides rendered with PDF.js; document montages visually reviewed; full disclosure verified |
| Actual prototype screenshots | Sixteen screen captures generated, inspected representative group/mobile captures, bundled in gallery |

## Not executed / not claimed

- Live Supabase SQL execution, configured Turnstile, real serverless deployment or a genuine end-to-end survey save. Account setup and credentials are required. Submission remains disabled.
- Production deployment or final live-site verification for this new feature: pending merge and GitHub Pages deployment.
- Safari, Firefox, assistive-technology screen-reader or complete manual keyboard audit. Automated accessibility is not a guarantee of conformance.
- Independent verification of accommodation availability or amenities. Inventory is fictional.
- Genuine interviews, survey recruitment, A/B experiments or measured conversion/revenue outcomes.
- PowerPoint creation/opening: required presentation runtime unavailable. Five-slide PDF and HTML are provided instead; no `.pptx` link is exposed.
- Video recording/upload. Storyboard and narration are preparation materials only.

Tests and dependency lockfiles are in `../tools/`. Mock tests do not establish real provider integration. Chrome and Edge share Chromium, so their checks do not establish cross-engine compatibility.
