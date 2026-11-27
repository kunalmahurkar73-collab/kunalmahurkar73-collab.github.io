# Research methodology

Airbnb India: independent PM and PLG case study by Kunal Mahurkar. Protocol prepared 27 November 2026. No completed primary sessions or genuine responses are claimed.

This independent product management case study currently uses publicly available secondary research and a clearly labelled synthetic customer dataset to demonstrate research analysis, hypothesis formation, feature prioritization and MVP design. Primary customer research is ongoing. Synthetic responses are not actual participant responses and are excluded from verified research findings. Product recommendations will be reassessed as genuine customer and host feedback becomes available.

## Decision and questions

Decide whether a Mumbai/Pune domestic group-travel pilot merits investment. Investigate how people choose dates, reconcile individual budgets, assess accommodation reliability and return to a previous group. Ask whether the proposed structured constraints add value over existing wishlists, messaging, comparison and social tools. Investigate host feasibility before prescribing amenities.

## Evidence hierarchy

1. Dated official and first-party secondary sources establish context and visible existing capabilities. Company-sponsored survey results retain their sampling limitations.
2. The deterministic synthetic set (100 travellers, 20 hosts, 12 fictional interview scenarios) demonstrates analytical methods. It cannot establish population prevalence, real intent or causal impact. It is never merged with genuine responses.
3. Genuine anonymous survey submissions, once the backend is configured, describe a self-selected convenience sample. Treat self-reported behaviour as reported, not observed.
4. Consented interviews establish recent stories and contextual themes. Usability sessions establish task comprehension and friction in the simulation. Neither alone establishes causal conversion lift.
5. An instrumented, sufficiently powered randomised pilot tests causal hypotheses with mature outcomes.

## Recruitment

Recruit adults aged 18+ across Mumbai, Pune and additional Indian cities for discovery. Seek Airbnb bookers, hotel/OTA customers, Airbnb explorers who have not booked, and occasional domestic travellers. Record recruitment source. The synthetic 35/30/20/15 split is an illustration, not a quota already achieved. Balance gender and age where feasible; actively seek abandoned and unsuccessful group plans. Recruit hosts across property types, tenure and operational models. Avoid recruiting only friends or enthusiasts; report this limitation if unavoidable.

## Anonymous survey

Use neutral recent-behaviour questions before introducing concepts. Branch into traveller and host paths and show a 3–4 minute estimate. Avoid identifiers, exact addresses, payment details and real booking IDs. City is optional or includes “prefer not to say”; age is a band. Inform participants about purpose, voluntary participation, storage and deletion policy before collecting responses. Do not collect under-18 responses.

Optional interview contact must use a separate consented form/store. Do not place contact information in anonymous answers or attempt to join the two datasets through a hidden identifier. If contact collection is not configured, do not request it.

## Collection and governance

GitHub Pages cannot securely store shared private research on its own. Activate the documented serverless or hosted form integration before recruiting. Until activation, submission must visibly fail closed with configuration guidance; never show a successful-save message. A public frontend endpoint is not a credential, but private service-role/admin credentials must remain server-side.

Require schema validation, consent, allowed values and payload size limits on the server. Add a hidden honeypot, minimum completion-time checks, idempotency and rate limiting. A browser token or cookie is only a duplicate heuristic, not proof of identity. Flag suspicious data for review rather than silently treating it as genuine. Test retries and network failure. Do not publish raw responses, free text or small identifiable cross-tabs. Serve only reviewed, anonymised aggregates with small-cell suppression. Research owner exports the private store to CSV/JSON through authenticated administration.

Before recruitment, set retention (suggested pilot default: delete interview contact within 90 days of last contact and raw research within 180 days of synthesis), name an owner and document how deletion requests work. These are proposed research practices, not legal advice or a claim of implemented production controls.

## Interviews and usability

Conduct 10 or more host interviews to reassess supply strategy and 5–10 moderated usability sessions to refine MVPs. These are future milestones. Ask travellers to recount their last trip: how the group chose dates and a property, who paid, what changed, what nearly stopped the plan, and what they would do differently. Ask hosts for recent group requests, operational failures, feasible amenity improvements and trade-offs. Ask permission before recording; never record payment or identity information.

Usability tasks: create a trip; enter an individual constraint; invite a simulated companion; identify a budget/date conflict; compare total and per-person costs; confirm a simulated decision; reuse preferences; evaluate and complete a host action; add and remove optional activities and explain the final total. Observe unaided success, time, errors, confusion and a 1–5 post-task confidence rating. Do not ask leading questions such as “Was the improved flow easier?”

## Analysis

Keep synthetic and genuine data in separate stores and namespaces. Deduplicate reviewed genuine responses using transparent, minimised heuristics. Publish completed counts and recruitment composition. Calculate every percentage from selected eligible records, with numerator and denominator. Multi-select pain points can sum above 100%. Use “not answered” explicitly rather than treating missing answers as “no”. Avoid displaying a city/age cross-tab below five responses. Free-text quotes require explicit permission and careful redaction; fictional scenarios are not quotes.

At 20 responses review discovery gaps; at 50 review emerging themes; at 100 reassess priorities. These are learning checkpoints, not statistical significance thresholds. Review negative and disconfirming evidence, triangulate against interviews/tasks, and record a decision log before changing RICE confidence. Do not automatically reprioritise from each new response.

## Limitations

Public page access is incomplete for some dynamic competitor flows. Survey self-selection, recall and feature-intent bias remain. Urban platform users do not represent all Indian travellers. Synthetic distributions were specified for demonstration and cannot support inferential claims. Prototype behaviour does not establish marketplace feasibility or actual growth. No real Airbnb payment, booking or external invitation is made.
