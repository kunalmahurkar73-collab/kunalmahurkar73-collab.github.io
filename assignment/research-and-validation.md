# Research decisions and validation plan

## Evidence boundary

Seven original Amazon India desktop web crops document one checkout and subsequent cancellation on 20 October 2026. They show interface states, not participant behavior. No interviews, usability sessions, analytics baselines, or payment failures were observed. See [`evidence/catalog.md`](../evidence/catalog.md) for screenshot-level observations.

## Heuristic evaluation

Severity is an **expert risk estimate** on Nielsen's 0–4 scale. Confidence concerns the proposed usability impact, not whether the named UI element is visible.

| ID | Stage and evidence | Direct observation | Interpretation and possible impact | Nielsen heuristic | Expert severity / confidence | Proposed solution | Validation |
|---|---|---|---|---|---|---|---|
| UX-01 | Review · EV-05 | ₹7 COD fee and ₹214 total are visible after a ₹207 item price. | **Hypothesis:** fee may be overlooked before commitment. | Visibility of system status | 3 / low | Persistent itemized summary and explicit “Total payable”. | Ask participants to state final amount and fee before clicking. |
| UX-02 | Cart, payment, delivery · EV-01, 03, 04 | Coupon/promotion area, multiple methods and delivery options appear. | **Hypothesis:** competing choices may add decision effort. | Aesthetic and minimalist design | 2 / low | Group methods and disclose secondary explanation when needed. | Record decision time and wrong turns in both designs. |
| UX-03 | Address, review · EV-02, 05 | Review offers Change links; saved address count is visible. | **Design opportunity:** preserve progress during edits. Existing links already support editing; a defect is unverified. | User control and freedom | 2 / low | Clear Edit controls with preserved selections. | Change address/payment from review and observe retained state. |
| UX-04 | Payment · EV-03 | Card, net banking, UPI scan and pay, and COD labels are present. | **Hypothesis:** a first-time shopper may need fee and eligibility explanations. | Match between system and real world | 2 / low | Plain-language labels and contextual fee explanation. | Comprehension question and method selection task. |
| UX-05 | No original failure capture | The observed COD order succeeded and was cancelled. | **Design opportunity:** prepare a clear simulated failure and safe retry. No Amazon failure defect established. | Recognize, diagnose and recover from errors | 4 potential risk / very low | Explicit transaction state, retry, change method, retain choices. | Controlled simulated failure task; verify no duplicate submission. |
| UX-06 | Cart, review · EV-01, 05 | Quantity, checkout and Change controls are visible. | **Hypothesis:** size or placement could affect pointer use; no target measurement yet. | Flexibility and efficiency of use | 2 / low | Consistent button hierarchy and generous click areas. | Measure targets and record missed clicks on desktop. |

## UX laws

- **Hick's Law (UX-02, UX-04):** EV-03 presents several payment choices. Grouping by familiar method and showing fees beside each method may reduce decision effort. Compare selection time and comprehension; a violation is unproven.
- **Fitts's Law (UX-06):** EV-01 and EV-05 show pointer targets, but crops alone do not establish physical size or misses. The redesign uses consistent, larger action areas. Measure CSS dimensions and missed clicks in a desktop test.
- **Jakob's Law (UX-03):** Familiar checkout review pages permit direct edits and preserve selections. EV-05 already shows Change links, so the redesign improves visibility and retained state rather than claiming Amazon lacks editing. Test predictability with first-time shoppers.

## Prioritization

All ratings are qualitative expert estimates (high / medium / low). Test risk first when confidence is low.

| Recommendation | User impact | Evidence confidence | Effort | User risk | Priority |
|---|---|---|---|---|---|
| Clarify final total and fee | High | Medium for visible fee; low for confusion | Low | Medium | P1 |
| Prototype safe failure recovery | High potential | Very low for actual Amazon issue | Medium | High potential | P1 discovery |
| Preserve state with contextual edits | Medium | Low | Medium | Medium | P2 |
| Group payment choices and explain fees | Medium | Low | Medium | Low | P2 |
| Tune pointer targets | Low to medium | Low | Low | Low | P3 |

Top three design experiments: cost comprehension, payment recovery, and editing without rework. Recovery is a risk-led concept and should be investigated before treating it as a verified production problem.

## Five-participant moderated test, planned

Recruit five India-based desktop shoppers with varied frequency of online shopping and payment familiarity. Use the local simulated prototype; collect no real addresses or payment details. Each participant receives the same item scenario and tasks: change quantity, choose a sample address, compare delivery choices, select COD, state the fee and total, edit payment from review, trigger a simulated failure, recover, then identify the confirmation state.

Moderator prompts: “What do you expect this action to do?” “What will you pay?” “Has any payment been taken?” “What would you do next?” Avoid leading terms such as “hidden fee.” Observe hesitations, backtracking, wrong turns, missed targets, help requests, and verbal uncertainty. A task succeeds when the intended state is reached unaided with the correct cost or transaction-status explanation. Track start and end times, errors, and a 1–5 confidence rating after each task. Use screen recording only with participant consent.

Analysis template per participant: task, completion (yes/no), seconds, errors, quote, observed issue, severity interpretation, and design response. Synthesize recurring themes across the five; do not treat the small sample as a population estimate.

## Proposed product metrics

| Metric | Definition and measurement | Baseline | Expected relationship |
|---|---|---|---|
| Checkout completion | Completed simulated orders / started checkouts | Baseline not measured | May improve with clarity. |
| Abandonment | Started checkouts without completion / started checkouts | Baseline not measured | May decrease; compare with a valid control. |
| Time on task | Seconds from cart start to confirmation | Baseline not measured | May decrease if choices are easier. |
| Task success | Participants completing task unaided / participants attempting | Baseline not measured | Should improve for edit/recovery tasks. |
| Pricing comprehension | Correct unaided statement of total and fee / attempts | Baseline not measured | Primary measure for UX-01. |
| Recovery success | Safe completion or method change after simulated failure / attempts | Baseline not measured | Primary measure for UX-05 concept. |
| User confidence | Post-task 1–5 rating plus qualitative explanation | Baseline not measured | May improve if state is explicit. |

No numeric improvement target is asserted before baseline collection.
