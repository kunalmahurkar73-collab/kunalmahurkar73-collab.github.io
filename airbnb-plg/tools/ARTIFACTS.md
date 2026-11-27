# Assignment artifact build

The downloadable report is `../downloads/airbnb-india-case-study.pdf` (23 pages). The executive summary is `../downloads/airbnb-india-executive.pdf` (exactly five slides), with an accessible editable HTML source at `../downloads/airbnb-india-executive.html`. Narration and the recording storyboard are separate Markdown downloads.

## Reproduce

From the repository root, on Windows with Node.js and Segoe UI fonts:

```powershell
npm.cmd ci --prefix airbnb-plg/tools/artifact-build
node airbnb-plg/tools/build-artifacts.cjs
node airbnb-plg/tools/render-artifacts.mjs
```

The builder consumes `research-content.js` for the verified source register. It embeds local Segoe UI font files from `C:/Windows/Fonts/`. For other systems, update the two font paths in the builder to installed TrueType fonts with the required character coverage. Dependencies are free, pinned by the package lock and only needed for artifact generation, not for the GitHub Pages website.

The renderer uses PDF.js with a native canvas to render every page to PNG. It also produces montages and extracted text under `artifact-build/previews/`, which is ignored by Git. It does not automate a browser or application UI.

## Validation actually executed

- Built the report and executive PDFs from the checked-in generator.
- Reopened both PDFs with PDF.js and rendered every page.
- Confirmed 23 report pages and exactly five executive slides.
- Inspected both full-document montages; corrected a table flow position issue and an executive footer pagination issue, then regenerated and re-rendered.
- Extracted all page text for verification. The PDFs contain the full research disclosure.
- Checked report assumptions against the website: 40,000 bookings, 10% uplift, INR 12,000 value, 15.5% modeled fee, INR 16 lakh experience revenue, INR 350 variable cost per incremental booking and INR 25 lakh fixed costs.
- Matched the illustrative pilot baseline of 20% to 22% conversion (approximately 6,510 independent groups per arm), and 20% to 23% repeat booking (approximately 2,943 mature organisers per arm), before inflation for clustering, missingness and multiplicity.

These checks do not establish accessibility tagging in the PDF. The HTML deck offers a semantic text alternative. No PowerPoint or browser compatibility test of a PPTX has been performed.

## PowerPoint limitation

The requested `.pptx` has not been generated. The presentation skill requires Spaces/Artifact Tool authoring; this session exposes neither `create_spaces_artifact` nor `connect_spaces_artifact`, has no `load_workspace_dependencies`, and the `@oai/artifact-tool` import fails in the available Node runtime. A filesystem check of the bundled plugin cache found presentation instructions but no importable Artifact Tool runtime. Installing a substitute PPTX generator would violate the skill's explicit runtime instructions.

Do not label the HTML or PDF as a PowerPoint file, and do not add a broken `.pptx` download link. When Artifact Tool/Spaces becomes available, author/import the five-slide content, export a real `.pptx`, validate its slide count and rendering, and add that successfully created file to the download library. The current editable HTML deck and five-slide PDF allow review of all presentation content meanwhile.

No video has been recorded or uploaded. The storyboard is a recording plan, not a video artifact.
