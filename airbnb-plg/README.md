# Airbnb India product strategy

Buildless GitHub Pages case study at /airbnb-plg/. The project uses published research, 20 cited public observations across 17 discussions and a separate labelled illustrative dataset. Public accounts are self-reported and unverified. The study focuses on secondary evidence and product simulations.

## Published documents

The single downloadable research document is downloads/airbnb-india-case-study.pdf. It consolidates the strategy, methodology, public-source ledger, references, MVP specifications, examples, prioritization, economics and proposed experiments. The public manifest allows this PDF and airbnb-india-executive.pptx only. The PowerPoint entry remains unavailable until a real PPTX exists. Five-slide source material is retained under tools/presentation-source and is not linked from the public study.

Former supporting documents are removed from the download directory. Source notes and authored data remain under tools/source-docs and tools/source-data for provenance. Legacy research-form and screen-gallery URLs redirect to the study. Other portfolio projects, chatbot and CNAME are preserved.

## Build and verify

From repository root:

    npm.cmd ci --prefix airbnb-plg/tools/artifact-build
    node airbnb-plg/tools/build-artifacts.cjs
    node airbnb-plg/tools/publish-downloads.cjs
    node airbnb-plg/tools/render-artifacts.mjs airbnb-india-case-study
    node airbnb-plg/tools/qa/server.cjs

In another terminal:

    npm.cmd ci --prefix airbnb-plg/tools/qa
    node airbnb-plg/tools/qa/consolidated-study-tests.cjs
    node airbnb-plg/tools/qa/accessibility.cjs

Preview: http://127.0.0.1:4173/airbnb-plg/ . Browser tests use installed Windows Chrome/Edge. PDF generation uses local Segoe UI fonts. No build dependencies run in production.

The consolidated-study tests check the restricted download list, removal of obsolete research workflows, public/illustrative evidence separation, group decision completion and responsive widths. Historical checks for superseded UI remain in Git history.

## PowerPoint limitation

The required Spaces/Artifact Tool runtime is unavailable. No substitute format is labelled as PowerPoint and no broken download is exposed. Future export must create and validate a real airbnb-india-executive.pptx, then run the restricted manifest publisher.