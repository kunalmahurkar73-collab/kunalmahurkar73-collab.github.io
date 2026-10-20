# Five-minute walkthrough script

**Status:** recording planned. Replace the walkthrough placeholder only after a real recording URL is verified. This script is about 590 spoken words; allow time to click through the prototype.

## 0:00–0:30 · Opening · Slide 1

**On screen:** title slide, then case-study hero.

“Hi, I’m Kunal. This project evaluates one Amazon India desktop checkout journey, from cart through order confirmation and cancellation. My goal was to separate what I could actually observe from what I only suspected, then turn the strongest opportunities into a testable redesign. This is an independent educational study. Amazon has not implemented these concepts.”

## 0:30–1:00 · Scope · Slides 2–3

**On screen:** move through the journey map and scroll the genuine screenshot gallery.

“I captured seven desktop web screenshots in Edge on October twentieth, twenty twenty-six. They show a book in the cart, an address step, payment choices, delivery choices, the final total, an order confirmation, and a successful cancellation. The cash-on-delivery order was cancelled immediately. The public crops exclude personal details. A screenshot can establish a visible interface fact, but it cannot tell me whether a shopper was confused or how long they took.”

## 1:00–2:15 · Heuristic evaluation · Slide 4

**On screen:** point to EV-05, then the finding matrix.

“The most concrete cost observation is at review: the item costs two hundred and seven rupees, a seven-rupee cash-on-delivery fee appears, and the final total is two hundred and fourteen. My UX-01 question is whether shoppers notice and understand that fee before placing an order. That is a hypothesis, mapped to visibility of system status. I also evaluated the volume of decisions in cart and payment, edit controls at review, payment terminology, and pointer targets. In each case, I document the UI element separately from the possible user impact. One particularly important boundary: I did not observe a payment failure. The recovery screen is a proposed risk scenario, not a claim that Amazon’s current recovery is broken.”

## 2:15–3:00 · UX laws · Slide 5

**On screen:** show payment choices, then the interactive Before/After payment comparison.

“Three interaction laws guided the concepts. Hick’s Law suggests that grouping payment and delivery choices could make decisions easier, but I need to measure that. Fitts’s Law guides the size and placement of desktop pointer targets; I have not measured a current violation. Jakob’s Law suggests familiar edit patterns and retained state. Amazon already shows Change links, so the design opportunity is to make editing clearer and preserve earlier choices, not to invent a missing feature.”

## 3:00–4:15 · Design and prototype · Slide 6

**On screen:** open the editable design source, compare the original review crop with the proposed review screen, then enter the React prototype.

“The redesigned review screen places an itemized summary next to the decision, labels the final payable total, and gives each choice a direct Edit action. The proposed payment screen shows method-specific fees in plain language. I created nine editable screen designs covering cart, address, delivery, payment, review, processing, failure, recovery, and confirmation. The interactive prototype lets me change quantity, select sample options, and see totals recalculate. I can place only a simulated order; it never asks for real payment information. I can also trigger a simulated failure, inspect the explicit ‘no payment was taken’ message, retry safely, or change method. Progress persists after refresh, and Reset Demo starts over.”

## 4:15–5:00 · Priorities and validation · Slide 7

**On screen:** priorities and metrics, then finish on the case-study hero.

“My first experiments are final-cost comprehension, safe failure recovery, and editing without rework. These priorities reflect potential user risk, evidence confidence, and implementation effort; they are expert estimates. Next I would run five moderated desktop sessions with India-based shoppers. I would ask them to state the payable amount and fee, make a late edit, and recover from a simulated failure, recording task success, time, errors, and confidence. Completion, abandonment, and recovery baselines have not been measured. The core lesson is simple: use authentic evidence to frame questions, prototype the proposed answer, and let observed user behavior determine the next product decision. Thank you.”

## Slide notes and recording checklist

| Slide | Speaking focus | Screen action |
|---|---|---|
| 1 | Product, role, question | Show title and project hero. |
| 2 | Captured journey | Trace cart to outcome. |
| 3 | Evidence limits | Enlarge original review and payment crops. |
| 4 | Six evaluations | Emphasize fact vs hypothesis. |
| 5 | Three UX laws | Open Before/After payment view. |
| 6 | Redesign | Show editable shapes, then simulated failure and retry. |
| 7 | Priorities and test | State no measured baseline, close on the portfolio. |

Before recording: open the case study and prototype; reset demo; preload slide deck; verify browser zoom, audio, and cursor placement; keep personal Amazon account tabs closed; confirm that the final recording link is public before publishing it.
