"""Build the seven-slide Amazon India web checkout assignment deck.

Run from the repository root: python assignment/build_presentation.py
The PDF is exported from the PPTX by Microsoft PowerPoint on Windows.
"""

from pathlib import Path
import time

from PIL import Image
from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.util import Inches, Pt


ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assignment"
PPTX = OUT / "amazon-india-web-checkout-ux-evaluation.pptx"
PDF = OUT / "amazon-india-web-checkout-ux-evaluation.pdf"

INK = RGBColor(27, 34, 43)
MUTED = RGBColor(86, 96, 107)
ORANGE = RGBColor(227, 112, 35)
PAPER = RGBColor(250, 248, 244)
LINE = RGBColor(218, 215, 209)
WHITE = RGBColor(255, 255, 255)

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)


def box(slide, x, y, w, h, color=PAPER, stroke=None, radius=False):
    shape = slide.shapes.add_shape(
        MSO_SHAPE.ROUNDED_RECTANGLE if radius else MSO_SHAPE.RECTANGLE,
        Inches(x), Inches(y), Inches(w), Inches(h),
    )
    shape.fill.solid()
    shape.fill.fore_color.rgb = color
    shape.line.fill.background() if stroke is None else None
    if stroke is not None:
        shape.line.color.rgb = stroke
    return shape


def txt(slide, text, x, y, w, h, size=18, color=INK, bold=False, align=None):
    shape = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = shape.text_frame
    tf.clear()
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = Inches(.02)
    tf.margin_top = tf.margin_bottom = Inches(.02)
    for i, line in enumerate(text.split("\n")):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.text = line
        p.font.name = "Aptos"
        p.font.size = Pt(size)
        p.font.bold = bold
        p.font.color.rgb = color
        p.space_after = Pt(5)
        if align is not None:
            p.alignment = align
    return shape


def pic(slide, name, x, y, w, max_h):
    path = ROOT / "evidence" / name
    with Image.open(path) as im:
        ratio = im.height / im.width
    h = min(max_h, w * ratio)
    actual_w = min(w, h / ratio)
    slide.shapes.add_picture(str(path), Inches(x), Inches(y), width=Inches(actual_w), height=Inches(h))
    return h


def base(title, n, note):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    slide.background.fill.solid()
    slide.background.fill.fore_color.rgb = PAPER
    box(slide, .55, .43, .10, .34, ORANGE)
    txt(slide, title, .84, .34, 11.8, .70, 29, INK, True)
    box(slide, .65, 7.10, 12.05, .012, LINE)
    txt(slide, "AMAZON INDIA WEB CHECKOUT  /  INDEPENDENT EDUCATIONAL STUDY", .7, 7.17, 10.8, .2, 8, MUTED)
    txt(slide, f"{n:02d} / 07", 11.65, 7.16, .95, .2, 8, MUTED, align=PP_ALIGN.RIGHT)
    slide.notes_slide.notes_text_frame.text = note
    return slide


s = base("Amazon India web checkout", 1, "Scope: desktop web in Edge, captured 20 October 2026. Independent educational UX case study; not affiliated with Amazon. Objective: document the visible path and test redesign hypotheses. Prototype: https://kunalmahurkar.is-a.dev/amazon-checkout-prototype/")
txt(s, "UX evaluation & redesign", .8, 1.55, 7.2, .7, 37, INK, True)
txt(s, "Cart → delivery → payment → review → confirmation → cancellation", .82, 2.42, 7.5, .72, 23, MUTED)
box(s, .82, 3.52, 7.0, 1.32, WHITE, LINE, True)
txt(s, "Objective", 1.13, 3.73, 2.2, .36, 17, ORANGE, True)
txt(s, "Make the final cost, choices, editing and recovery easier to understand, then validate with shoppers.", 1.13, 4.05, 6.25, .62, 18)
pic(s, "cart-item.jpg", 8.45, 1.48, 4.0, 2.7)
txt(s, "7 genuine desktop captures  •  1 placed and cancelled COD order", 8.46, 4.95, 3.9, 1.0, 17, MUTED)

s = base("User and checkout journey", 2, "The persona is an assumption, not an interviewed participant. The journey reflects browser captures from 20 October 2026. The six saved addresses were visible by count, but personal address information was withheld from publication.")
txt(s, "Assumption-based persona", .82, 1.22, 4.1, .4, 19, ORANGE, True)
txt(s, "An India-based desktop shopper who wants to confirm the payable amount, choose delivery and payment, and know whether the order succeeded.", .82, 1.67, 4.3, 1.52, 22)
txt(s, "Context", .82, 3.66, 4.1, .4, 18, ORANGE, True)
txt(s, "Signed-in Amazon India web checkout; a ₹207 book, cash on delivery, ₹7 fee, ₹214 final total.", .82, 4.12, 4.2, 1.2, 20)
stages = [("01", "Cart", "Item and quantity"), ("02", "Address", "Saved choices"), ("03", "Payment", "Method selection"), ("04", "Delivery", "Speed choice"), ("05", "Review", "₹214 total"), ("06", "Outcome", "Place and cancel")]
for i, (num, head, detail) in enumerate(stages):
    y = 1.22 + i * .88
    box(s, 5.72, y, 6.65, .72, WHITE, LINE, True)
    txt(s, num, 6.0, y + .17, .46, .3, 13, ORANGE, True)
    txt(s, head, 6.55, y + .10, 2.15, .42, 19, INK, True)
    txt(s, detail, 8.73, y + .17, 3.24, .3, 14, MUTED)

s = base("Observed current experience", 3, "Original screenshots: evidence/cart-item.jpg, evidence/payment-methods.jpg, evidence/review-total.jpg, evidence/order-confirmation.jpg and evidence/cancellation-success.jpg. All were captured from the signed-in desktop web flow on 20 October 2026. Public crops exclude personal account information. Screenshot evidence establishes visible states, not participant friction.")
pic(s, "cart-item.jpg", .82, 1.22, 5.15, 2.42)
txt(s, "Cart: item, quantity, coupon and delivery promise", .84, 3.62, 5.0, .6, 15, MUTED)
pic(s, "payment-methods.jpg", 6.61, 1.22, 2.46, 2.18)
txt(s, "Payment methods", 6.62, 3.63, 2.7, .34, 15, MUTED)
pic(s, "review-total.jpg", 9.44, 1.28, 2.88, 1.26)
txt(s, "Review: ₹207 + ₹7 COD fee = ₹214", 9.44, 2.58, 2.93, .83, 15, MUTED)
box(s, .82, 4.36, 11.48, 1.87, WHITE, LINE, True)
pic(s, "order-confirmation.jpg", 1.06, 4.60, 4.42, .66)
pic(s, "cancellation-success.jpg", 6.03, 4.52, 2.55, 1.35)
txt(s, "Order placed; then successfully cancelled", 8.84, 4.80, 2.85, .8, 16, INK, True)
txt(s, "No payment failure was encountered or captured.", .84, 6.44, 11.3, .35, 15, ORANGE, True)

s = base("Nielsen heuristic audit", 4, "All six candidate usability issues are hypotheses. Provisional severity is a risk ranking, not a validated defect rating. UX-01 is grounded in the observed ₹7 cash-on-delivery fee at review; whether it confused users is untested. UX-05 has no original payment-failure screenshot. See the case study for original evidence and full rationale.")
txt(s, "Observed interface facts support the questions below; user impact needs testing.", .82, 1.05, 11.3, .5, 17, MUTED)
rows = [
    ("01", "Final cost clarity", "Visibility of status", "Review shows ₹7 COD fee", "3/4"),
    ("02", "Choice overload", "Minimalist design", "Coupon and extra-choice screens", "2/4"),
    ("03", "Edit without rework", "User control", "Change links at review", "3/4"),
    ("04", "Payment language", "Real-world match", "Card, UPI, COD labels", "2/4"),
    ("05", "Failure recovery", "Error recovery", "Failure evidence missing", "4/4"),
    ("06", "Primary control ease", "Efficiency of use", "Controls visible; targets unmeasured", "2/4"),
]
headers = [("ID", .86, .5), ("Evaluation question", 1.38, 3.15), ("Heuristic", 4.55, 2.68), ("Evidence boundary", 7.28, 3.67), ("Risk", 11.17, 1.0)]
for label, x, w in headers:
    txt(s, label, x, 1.69, w, .36, 13, ORANGE, True)
for i, (id_, issue, heur, ev, risk) in enumerate(rows):
    y = 2.10 + i * .66
    box(s, .79, y, 11.56, .57, WHITE if i % 2 == 0 else PAPER)
    for val, x, w, sz in [(id_, .87, .48, 15), (issue, 1.38, 3.10, 16), (heur, 4.55, 2.68, 15), (ev, 7.28, 3.67, 14), (risk, 11.17, 1.0, 15)]:
        txt(s, val, x, y + .12, w, .34, sz, INK, i == 0)
txt(s, "All six are hypotheses; severity scores are provisional. No participant usability test has been run.", .84, 6.37, 11.6, .44, 15, ORANGE, True)

s = base("UX laws as design considerations", 5, "Hick's Law: complex choice sets can lengthen decision time; linked to UX-02. Fitts's Law: target acquisition depends on size and distance; linked to UX-06. Jakob's Law: familiar conventions shape expectation; linked to UX-03. None of these law violations has been established for Amazon by the screenshots alone.")
laws = [
    ("Hick’s Law", "UX-02", "Many choices can slow decisions.", "Group delivery and payment choices; reveal secondary details when needed.", "Measure selection time."),
    ("Fitts’s Law", "UX-06", "Small or distant controls take more effort to acquire.", "Use clear, adequately sized primary and Edit controls.", "Measure missed clicks."),
    ("Jakob’s Law", "UX-03", "Shoppers expect familiar checkout editing patterns.", "Keep direct Edit links and preserve earlier choices.", "Measure wrong turns."),
]
for i, (name, issue, law, rec, metric) in enumerate(laws):
    x = .84 + i * 4.12
    box(s, x, 1.47, 3.82, 4.83, WHITE, LINE, True)
    box(s, x, 1.47, 3.82, .08, ORANGE)
    txt(s, name, x + .25, 1.83, 3.36, .55, 24, INK, True)
    txt(s, issue + "  ·  HYPOTHESIS", x + .25, 2.43, 3.3, .34, 13, ORANGE, True)
    txt(s, law, x + .25, 2.97, 3.32, 1.0, 17)
    txt(s, rec, x + .25, 4.00, 3.32, 1.2, 17, MUTED)
    txt(s, metric, x + .25, 5.67, 3.32, .35, 14, ORANGE, True)
txt(s, "These laws guide the redesign; the screenshots alone do not establish a violation.", .84, 6.52, 11.8, .4, 15, MUTED)

s = base("Before / after: review and recovery", 6, "Before is the genuine Amazon India review crop, evidence/review-total.jpg. After is a design concept, not an Amazon screen. The concept emphasizes a single itemized total, contextual Edit controls and safe payment retry. Prototype: https://kunalmahurkar.is-a.dev/amazon-checkout-prototype/")
txt(s, "BEFORE  ·  observed Amazon review", .84, 1.31, 5.75, .4, 16, ORANGE, True)
box(s, .82, 1.78, 5.66, 3.88, WHITE, LINE, True)
pic(s, "review-total.jpg", 1.06, 2.20, 5.12, 1.56)
txt(s, "The ₹7 COD fee and ₹214 final total are visible. Whether shoppers notice the fee is untested.", 1.08, 4.36, 4.95, 1.05, 18, MUTED)
txt(s, "AFTER  ·  proposed design concept", 6.90, 1.31, 5.52, .4, 16, ORANGE, True)
box(s, 6.86, 1.78, 5.65, 3.88, WHITE, LINE, True)
txt(s, "Review your order", 7.18, 2.04, 4.9, .52, 24, INK, True)
txt(s, "Item                                      ₹207\nDelivery                                FREE\nCash on delivery fee                 ₹7", 7.18, 2.73, 4.94, 1.42, 18)
box(s, 7.15, 4.21, 4.92, .016, LINE)
txt(s, "Total payable                         ₹214", 7.18, 4.36, 4.94, .4, 20, INK, True)
txt(s, "Edit address   ·   Edit payment   ·   Retry safely", 7.18, 4.97, 4.98, .35, 15, ORANGE, True)
txt(s, "Prototype: kunalmahurkar.is-a.dev/amazon-checkout-prototype/", .85, 6.17, 11.6, .45, 17, INK)

s = base("Priorities, measures and next test", 7, "P1 payment recovery is a risk hypothesis; no original failure was observed. P1 cost clarity is based on visible fee presentation, but comprehension is unmeasured. P2 covers editing and choice grouping. P3 covers click target polish. Five India-based desktop shoppers should try the simulated checkout. Track completion, abandonment, time, clicks, recovery and reported clarity. All baselines are not measured. Prototype and full case: https://kunalmahurkar.is-a.dev/case-amazon-checkout.html")
txt(s, "Priority", .85, 1.33, 2.0, .38, 17, ORANGE, True)
txt(s, "P1  Payment recovery + price clarity\nP2  Editing, choices and terminology\nP3  Primary control polish", .85, 1.85, 5.35, 2.10, 20)
txt(s, "Five-participant validation plan", 6.70, 1.33, 5.55, .4, 19, ORANGE, True)
txt(s, "Recruit India-based desktop shoppers with varied checkout familiarity. Ask them to change an address, inspect the payable total, select payment and recover from a simulated failure.", 6.70, 1.82, 5.55, 2.1, 19)
box(s, .84, 4.27, 11.50, 1.72, WHITE, LINE, True)
txt(s, "Success measures", 1.12, 4.49, 3.3, .42, 21, INK, True)
txt(s, "Completion / abandonment · time and clicks · failure recovery · cost clarity · unaided task success", 1.12, 5.02, 10.65, .78, 18)
txt(s, "Baseline not measured. No usability sessions have been conducted. Prototype: kunalmahurkar.is-a.dev/amazon-checkout-prototype/", .85, 6.27, 11.8, .61, 14, MUTED)

OUT.mkdir(exist_ok=True)
prs.save(PPTX)
print(PPTX)

try:
    import win32com.client
    powerpoint = win32com.client.DispatchEx("PowerPoint.Application")
    deck = powerpoint.Presentations.Open(str(PPTX), WithWindow=False)
    try:
        deck.SaveAs(str(PDF), 32)
        print(PDF)
    finally:
        deck.Close()
        powerpoint.Quit()
except Exception as exc:
    raise RuntimeError(f"PPTX saved; PowerPoint PDF export failed: {exc}") from exc
