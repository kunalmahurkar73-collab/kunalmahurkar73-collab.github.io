# Research validation and experimentation plan

Prepared 27 November 2026. Independent proposed pilot; not executed. All numerical baselines, targets, costs and sample-size inputs below are illustrative assumptions.

This independent product management case study currently uses publicly available secondary research and a clearly labelled synthetic customer dataset to demonstrate research analysis, hypothesis formation, feature prioritization and MVP design. Primary customer research has not been conducted for this version. Synthetic responses are not actual participant responses and are excluded from verified research findings. Product recommendations will be reassessed as genuine customer and host feedback becomes available.

## Before pilot exposure

Complete anonymous collection setup and privacy review. Collect genuine baseline traffic and conversion. Review Airbnb's latest India product availability to avoid redundant proposals. Conduct 5–10 usability sessions and at least 10 host interviews. Verify supply suitability and provider operations. Run accessibility, security and event QA; confirm A/A balance and stable persistent assignments. Preregister the protocol, one primary hypothesis, analysis population, cutoff, exclusions, power, multiplicity approach and rollback thresholds. Finance must approve cost attribution and incrementality assumptions.

## Main experiment: Group Decision Room

- Scope: consenting adult organisers from Mumbai/Pune, domestic Indian accommodation, groups of at least three, and intended stay checkout within the defined observation window.
- Exclude test users, employees, bots, duplicate prior groups and ineligible stays using rules defined before randomisation.
- Control: existing planning/booking tools. Treatment: existing tools plus structured availability, private budget compatibility and explicit shared decision.
- Unit: persistent group/organiser cluster. Link invited companions to assignment to reduce spillover; diagnose overlapping groups. Cluster by host for supply experiments where properties share operations.
- Exposure: `experiment_assigned` for intention-to-treat denominator; `group_room_exposed` records actual use separately. Persist user/group assignment across sessions.
- Primary: proportion of all eligible randomised groups reaching at least one completed domestic group stay within 90 days after assignment. One reservation/group contribution per primary success; dedupe reservation IDs.
- Secondary: decision completion within 14 days, confirmed bookings within 30 days, time to shared decision, per-group incremental contribution.
- Guardrails: cancellations, complaints, host satisfaction, privacy/safety incidents, refunds and support demand. Do not reward invitations or bookings that subsequently fail.

### Illustrative power

For baseline p0=0.20 and target p1=0.22 (10% relative improvement), independent two-proportion normal approximation at two-sided alpha=0.05, power=80%:

`n_per_arm = ceil((1.96*sqrt(2*pbar*(1-pbar)) + 0.8416*sqrt(p0*(1-p0)+p1*(1-p1)))^2 / (p1-p0)^2)`

This gives approximately **6,510 groups per arm**; reserve at least 6,600 before accounting for clustering, missing data, exclusions and multiplicity. This is a planning estimate, not an achieved sample or a guaranteed design. Confirm with Data using genuine baseline and feasible traffic. If infeasible, continue discovery or narrow the test rather than make an underpowered success claim.

### Duration and decisions

The controlled exposure pilot lasts 90 days after build approval. The last assigned group still needs its full 90-day completed-stay window, so final primary readout can extend beyond exposure day 90. Analyse at the preregistered fixed horizon. Do not repeatedly peek for efficacy; any interim efficacy rule requires a sequential design. Monitor safety continuously.

Illustrative success gate: a useful positive treatment effect with the prespecified confidence interval supporting improvement, acceptable incremental contribution, and all guardrails met. A point estimate of +10% alone is not proof. Investigate inconclusive results and determine whether confidence intervals exclude practical value.

Proposed pause thresholds to preregister with owners: cancellation increases by more than 1 percentage point, complaints by more than 0.5 point, host satisfaction falls more than 0.3 on a 5-point scale. Immediately suspend for a material privacy or safety incident. Sparse guardrail counts require judgement and incident review, not mechanical certainty. Product owns launch; Trust & Safety/Legal may block; Engineering owns rollback.

## Repeat Travel Engine

Randomise eligible completed-index-stay organiser clusters into existing discovery versus opt-in reusable group constraints. Primary: 180-day repeat booking proportion among organisers with a fully observed 180 days after index checkout. Also report non-cancelled bookings and completed repeat stays separately. The illustrative target is +3 percentage points, not +3% relative.

For p0=0.20, p1=0.23 under the same independent approximation, approximately **2,943 mature organisers per arm** are required before design inflation. This cohort is not automatically powered by the main experiment. Allow 180 days after the final index stay, beyond the initial 90-day pilot. Track notification opt-outs, privacy complaints, irrelevant suggestions and contribution as guardrails.

## Host Growth Assistant

Test group-readiness guidance as an extension to existing host tools. Randomise by host/property operations cluster. Primary is verified checklist pass rate; distinguish self-attested actions from verified evidence. Measure host burden, fulfilment incidents, suitability conversion and action completion. Do not interpret simulated readiness-score changes as actual occupancy uplift. Do not recommend facilities that cannot be safely fulfilled.

## Optional Local Experience Bundles

Randomise eligible confirmed reservations with relevant vetted inventory. Compare existing discovery with optional item-level bundles. Primary is incremental contribution per eligible stay; measure completed experience attachment, not just clicks. Guardrail against refunds, incidents, stay cancellation, complaints and forced/preselected purchases. Account for cannibalised standalone experience revenue and provider fulfilment cost.

## Data contract

Events need `event_id`, `event_version`, timestamp, assignment, pseudonymous organiser/group ID, reservation ID where relevant, source and eligibility. Capture `group_created`, `invite_delivered`, `invite_accepted`, `participant_preferences_submitted`, `group_decision_confirmed`, `reservation_confirmed`, `stay_completed`, `reservation_cancelled`, `experience_offer_exposed`, `experience_completed`, `readiness_assessment_completed`, `refund_posted` and ledger costs. Validate ordering, deduplication, late events and source-of-truth reconciliation. Never place individual private budgets, contact information or raw survey answers into public analytics.

## Research gates

20 genuine responses: discovery gaps. 50: emerging patterns. 100: reassess priorities. 5–10 usability sessions: refine task flow. At least 10 host interviews: reassess supply strategy. None guarantees statistical significance or replaces a powered experiment. Real-response counters start at zero until configured collection yields reviewed genuine responses. Completed interview count remains zero until actual consented sessions are completed.
