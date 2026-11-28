# Airbnb India product-led growth case study

Public download links now expose PDF/PowerPoint formats only. Research Markdown, synthetic CSV source files and generated PNGs remain in the repository for reproducibility. The site includes a sixteen-screen mobile comparison gallery and an interactive Desktop/Mobile switch. Current-capability phone views are conceptual illustrations; proposed views are captures of the implemented MVPs. To rebuild document PDFs and the public manifest, run `node airbnb-plg/tools/build-download-pdfs.cjs` then `node airbnb-plg/tools/use-pdf-downloads.cjs` after capturing mobile screens.

Independent educational assignment by Kunal Mahurkar. Buildless HTML/CSS/JavaScript, compatible with GitHub Pages at `/airbnb-plg/`. Existing portfolio, chatbot, Amazon work, resume and CNAME remain in place. Only the homepage work count/card and a small card style are changed outside this directory.

## Run locally

From repository root with Node 24 or later:

```powershell
node airbnb-plg/tools/qa/server.cjs
```

Open http://127.0.0.1:4173/airbnb-plg/ . No production dependency installation or build is needed. Stop the server with Ctrl+C.

## Data and privacy

`data.js` contains only deterministic synthetic records: 100 travellers, 20 hosts, 12 fictional interview scenarios. Generator assertions check exact traveller segments and six illustrative pain-point shares. `model.js` implements finance, RICE, filtering and pricing. `research-content.js` includes 13 primary sources with claim-level limitations and publication/review dates.

Real research starts at zero published verified responses. It never falls back to synthetic records. No response collection service is configured. `survey-config.js` contains empty public endpoint/site-key values and submission is disabled. See [exact backend setup](downloads/survey-setup.md). The Cloudflare Worker and Supabase schema support private centralized collection with Turnstile, validation, idempotency and server-side rate limits. Do not put any private credential or raw survey export in this checkout. Configure providers, execute SQL, validate a real test submission and delete test rows before research launch.

## Verification

```powershell
node airbnb-plg/tools/generate-data.cjs
node airbnb-plg/tools/test-model.cjs
node airbnb-plg/tools/test-survey-backend.cjs
npm.cmd ci --prefix airbnb-plg/tools/qa
# In a second terminal while the local server runs:
node airbnb-plg/tools/qa/browser-tests.cjs
node airbnb-plg/tools/qa/accessibility.cjs
node airbnb-plg/tools/build-gallery.cjs
node airbnb-plg/tools/finalize.cjs
```

Browser scripts use installed Chrome and Edge at their standard Windows paths. Adapt executable paths on other systems. The static server is local development tooling; never deploy it as the survey backend. Artifact reproduction and format limitations are in [tools/ARTIFACTS.md](tools/ARTIFACTS.md). Production runs without npm packages. QA dependencies are development-only, lockfile pinned and ignored at `node_modules`.

Actual results and limitations: [QA report](downloads/qa-report.md). Screenshots are captured from the actual prototype and copied into the downloadable screen gallery. Documents currently include a 23-page case study PDF, a five-slide executive PDF/HTML deck, narration, storyboard, research protocol, sources, CSVs, survey and experiment plans. A real PPTX is not generated because Spaces/Artifact Tool is unavailable; there is no broken or disguised PowerPoint download. No video link exists.

## Deploy through GitHub Pages

1. Review and merge the feature pull request into `main` after checks. The prior Amazon merge authorization does not apply to this new project; this change is prepared as a PR.
2. Preserve repository Settings > Pages current branch/source and `CNAME` (`kunalmahurkar.is-a.dev`). This is a static subdirectory; no new hosting configuration is required.
3. Wait for GitHub Pages build/deploy to complete.
4. Verify https://kunalmahurkar.is-a.dev/airbnb-plg/ and `/airbnb-plg/survey.html`, all download links, main-page project card, and four demo flows. Cache refresh may be needed.
5. Collection remains disabled until the separate account/provider setup is complete. Publishing the site does not configure the survey backend.

## Product limitations

All properties/rates/participants are fictional; no actual Airbnb inventory, identity, AI, payment or messages are connected. Personalization is explicit rules. Group demo supports 2–4 people; repeat demo supports 2–8. Budgets and preferences are in-memory only. The complete public real dashboard currently has an honest empty state; future publication requires a reviewed aggregate implementation and suppression of small cells. None of the prototypes claims measured uplift or completed research.
