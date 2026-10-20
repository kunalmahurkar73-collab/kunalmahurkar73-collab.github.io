# Amazon India desktop checkout evidence catalog

Captured 20 October 2026 in Edge. Platform: signed-in desktop web. These public crops exclude personal address, contact, and payment details. The original JPGs are preserved. `clean/` contains presentation copies with only browser cursor pixels removed, as documented in [README.md](README.md).

Coordinates below use relative image positions `(x%, y%)` from the top-left of each public crop. They identify annotation targets, not measured control dimensions.

| ID | Original screenshot | Stage | Directly observable element | Linked finding | Annotation target | Limit |
|---|---|---|---|---|---|---|
| EV-01 | `cart-item.jpg` | Cart | Book, ₹207 price, quantity control, coupon/promotion area, delivery promise | UX-02, UX-06 | Item price `(56, 34)`; quantity `(40, 70)` | A crop cannot establish attention, target error, or decision time. |
| EV-02 | `address-stage-header.jpg` | Address | Select delivery address heading and six saved choices indicated | UX-03 | Heading `(47, 42)` | Address rows are withheld because they contain private data; editing behavior is unobserved. |
| EV-03 | `payment-methods.jpg` | Payment | Card, net banking, UPI scan and pay, cash on delivery; insufficient Amazon Pay balance | UX-02, UX-04 | Method list `(48, 55)` | Comprehension and selection errors require user testing. |
| EV-04 | `delivery-options.jpg` | Delivery on review | Fastest and a later Friday delivery choice, each shown as free | UX-02 | Choice list `(45, 48)` | Choice effort is not measured; wording and options can vary. |
| EV-05 | `review-total.jpg` | Review | ₹207 item price, free delivery, ₹7 cash on delivery fee, ₹214 total | UX-01, UX-03 | Fee `(74, 56)`; total `(74, 77)` | Visibility in a screenshot does not prove that shoppers noticed or misunderstood the fee. |
| EV-06 | `order-confirmation.jpg` | Confirmation | “Order placed” state and email confirmation message | Outcome | Status `(45, 45)` | This is a single real order, not a conversion or task-success rate. |
| EV-07 | `cancellation-success.jpg` | Cancellation | Successful cancellation and cancelled item status | Outcome | Status `(49, 33)` | It does not document payment failure or refund processing. |

The captured order was cash on delivery and cancelled immediately. No naturally occurring payment failure was captured. The proposed failure screen is a concept, not evidence of an Amazon defect.
