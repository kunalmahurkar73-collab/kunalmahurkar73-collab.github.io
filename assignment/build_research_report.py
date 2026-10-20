"""Generate the uploadable, evidence-led Amazon India checkout research PDF."""
from pathlib import Path
from xml.sax.saxutils import escape

from PIL import Image as PILImage
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, Table,
    TableStyle, Image, KeepTogether, PageBreak,
)

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assignment' / 'amazon-india-checkout-ux-research.pdf'
EVIDENCE = ROOT / 'evidence'
NAVY = colors.HexColor('#131921')
TEAL = colors.HexColor('#007185')
AMBER = colors.HexColor('#c45500')
INK = colors.HexColor('#171b1e')
GRAY = colors.HexColor('#526067')
PALE = colors.HexColor('#f3f6f6')

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='TitleX', fontName='Helvetica-Bold', fontSize=25, leading=29, textColor=NAVY, spaceAfter=13))
styles.add(ParagraphStyle(name='DeckX', fontName='Helvetica', fontSize=11.5, leading=16, textColor=GRAY, spaceAfter=18))
styles.add(ParagraphStyle(name='H1X', fontName='Helvetica-Bold', fontSize=16, leading=20, textColor=NAVY, spaceBefore=13, spaceAfter=8))
styles.add(ParagraphStyle(name='H2X', fontName='Helvetica-Bold', fontSize=11, leading=14, textColor=TEAL, spaceBefore=10, spaceAfter=5))
styles.add(ParagraphStyle(name='BodyX', fontName='Helvetica', fontSize=9.2, leading=13.2, textColor=INK, spaceAfter=5))
styles.add(ParagraphStyle(name='SmallX', fontName='Helvetica', fontSize=7.8, leading=10.4, textColor=GRAY, spaceAfter=5))
styles.add(ParagraphStyle(name='CellX', fontName='Helvetica', fontSize=7.5, leading=10, textColor=INK))
styles.add(ParagraphStyle(name='CellHeadX', fontName='Helvetica-Bold', fontSize=7.5, leading=10, textColor=colors.white))
styles.add(ParagraphStyle(name='CalloutX', fontName='Helvetica-Bold', fontSize=9.3, leading=13.5, textColor=TEAL, spaceAfter=8))

story = []
def P(t, style='BodyX'):
    for old, new in {'“':'&quot;','”':'&quot;','’':"'",'–':'-','—':' - '}.items():
        t=t.replace(old,new)
    return Paragraph(t, styles[style])
def para(t, style='BodyX'):
    story.append(P(t, style))
def heading(t):
    para(t, 'H1X')
def sub(t):
    para(t, 'H2X')
def photo(file, width=6.75*inch, max_height=2.0*inch):
    path = EVIDENCE / 'clean' / Path(file).with_suffix('.png')
    if not path.exists():
        path = EVIDENCE / file
    with PILImage.open(path) as im:
        w,h=im.size
    scale=min(width/w,max_height/h)
    return Image(str(path),w*scale,h*scale)
def table(headers, rows, widths):
    data=[[P(escape(x),'CellHeadX') for x in headers]]
    data += [[P(x,'CellX') for x in row] for row in rows]
    t=Table(data,colWidths=widths,repeatRows=1,hAlign='LEFT')
    t.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,0),NAVY),('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.white,PALE]),
        ('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),7),
        ('RIGHTPADDING',(0,0),(-1,-1),7),('TOPPADDING',(0,0),(-1,-1),6),
        ('BOTTOMPADDING',(0,0),(-1,-1),6),('LINEBELOW',(0,0),(-1,0),.5,TEAL),
    ]))
    story.append(t)

para('AMAZON INDIA WEB CHECKOUT', 'CalloutX')
para('UX evaluation &amp; redesign research', 'TitleX')
para('Assignment research dossier | Desktop web | One cart-to-confirmation flow | 20 October 2026', 'DeckX')
para('<b>Author:</b> Kunal Mahurkar. Independent educational evaluation; not affiliated with Amazon. Seven public evidence crops document one real checkout and cancellation. Proposed screens and prototype are independent concepts.')
heading('1. Brief, scope and method')
para('<b>Product:</b> Amazon India desktop website. <b>Key flow:</b> cart, address, delivery, payment, review, confirmation. Cancellation was captured only to close the single real cash-on-delivery order. The evaluation does not extend to search, product discovery, returns, or the mobile app.')
para('<b>Method:</b> one expert walkthrough of a signed-in desktop journey; seven timestamped interface crops; issue mapping to Nielsen heuristics and Hick, Fitts and Jakob; a proposed redesign; and a planned moderated usability test. I placed one cash-on-delivery order and cancelled it immediately. No real payment was made.')
para('<b>Evidence boundary:</b> Screenshots prove what was shown in this journey. They do not prove confusion, slow decisions, missed clicks, conversion impact, or a site-wide defect. No participant sessions, interviews, analytics, control group, or natural payment failure were observed. Issue severity below is an expert risk estimate, not a measured outcome.','CalloutX')
heading('2. Evidence from the current experience')
para('The public crops omit personal address and payment details. Original JPGs are retained in <b>evidence/</b>; presentation copies remove only visible cursor pixels. EV identifiers match <b>evidence/catalog.md</b>.')
table(['ID / stage','Directly visible','What remains unknown'],[
    ('EV-01 Cart','Book price, quantity control, promotion area','Attention, decision time, and click accuracy'),
    ('EV-02 Address','Address step and six saved choices indicated','Private rows and editing behavior'),
    ('EV-03 Payment','Card, net banking, UPI scan, COD; balance message','Method comprehension or error rate'),
    ('EV-04 Delivery','Fastest and later delivery choices marked free','Preference and choice time'),
    ('EV-05 Review','Item 207 rupees; COD fee 7 rupees; total 214 rupees','Whether fee was noticed before commitment'),
    ('EV-06 Confirmation','Order placed state','Any population-level completion rate'),
    ('EV-07 Cancellation','Cancellation success state','Failure or refund behavior'),
], [1.03*inch,2.75*inch,2.95*inch])
story.append(Spacer(1,8))
story.append(photo('review-total.jpg',max_height=1.72*inch))
para('EV-05 — Real review crop: the COD fee and final total are visible. The research question is whether shoppers comprehend them before committing.','SmallX')
story.append(PageBreak())
heading('3. Six heuristic concerns: fact, interpretation and response')
findings=[
('UX-01 | Final amount and fee','EV-05: 207-rupee item, 7-rupee COD fee, 214-rupee total are visible.','<b>Hypothesis:</b> a shopper may miss the method-specific fee before committing. Visibility itself is established; confusion is not.','Nielsen #1 — visibility of system status.','Keep an itemized, persistent summary and label the final “Total payable.”','Ask for the amount and reason for the fee before the final action.','P1; expert severity 3/4; impact confidence low.'),
('UX-02 | Competing choices','EV-01 shows promotion content; EV-03 several payment methods; EV-04 two delivery choices.','<b>Hypothesis:</b> multiple decisions across the flow may increase effort. No delay has been measured.','Nielsen #8 — aesthetic and minimalist design.','Group related methods and de-emphasize secondary content while retaining access.','Record unprompted choice time, wrong turns and confidence.','P2; severity 2/4; confidence low.'),
('UX-03 | Late editing','EV-02 indicates saved addresses. Change links were observed during review; the public EV-05 crop concentrates on totals.','<b>Opportunity:</b> direct, predictable editing with retained selections. Amazon already offers Change; absence of editing is not claimed.','Nielsen #3 — user control and freedom.','Place contextual Edit controls beside each choice; preserve progress on return.','Change address and payment late in checkout; check retained state.','P2; severity 2/4; confidence low.'),
('UX-04 | Payment language and fees','EV-03 shows card, net banking, UPI scan and pay, and cash on delivery.','<b>Hypothesis:</b> some shoppers may need simpler explanations of eligibility or method-specific costs.','Nielsen #2 — match between system and real world.','Use plain method labels and show relevant fees alongside the choice.','Ask what each method means and what the selected method will cost.','P2; severity 2/4; confidence low.'),
('UX-05 | Recovery after a failed payment','No failure was observed. EV-06 shows success; EV-07 shows later cancellation.','<b>Design scenario only:</b> uncertainty after payment failure would be high risk; no Amazon defect is established.','Nielsen #9 — help users recognize, diagnose and recover from errors.','State whether payment was taken; offer safe retry or change method; retain choices.','Use a controlled simulated failure and check status comprehension and safe recovery.','P1 discovery; potential severity 4/4; evidence confidence very low.'),
('UX-06 | Pointer controls','EV-01 shows quantity; review offered Change controls. Target dimensions and misses were not measured.','<b>Hypothesis:</b> small or inconsistent hit areas could increase desktop pointer errors.','Nielsen #7 — flexibility and efficiency of use.','Give key controls consistent, generous hit areas and clear focus states.','Measure CSS targets and missed clicks during desktop tasks.','P3; severity 2/4; confidence low.'),
]
for title,observed,interpretation,heuristic,response,test,priority in findings:
    sub(title)
    para('<b>Observed:</b> '+observed)
    para('<b>Assessment:</b> '+interpretation)
    para('<b>Principle:</b> '+heuristic+' <b>Redesign:</b> '+response)
    para('<b>Validation:</b> '+test+' <b>Priority:</b> '+priority,'SmallX')
heading('4. UX laws applied to the one checkout flow')
table(['Law / issue','Observed anchor','Design response','How to check'],[
    ('Hick — UX-02, 04','EV-03 shows several payment methods; EV-04 offers delivery choices.','Group methods by familiar type and place fees next to each option.','Compare choice time and understanding. No measured violation yet.'),
    ('Fitts — UX-06','Quantity and Change controls were visible; target size was not recorded.','Use larger, consistent pointer targets for key actions.','Measure CSS hit areas and missed clicks.'),
    ('Jakob — UX-03','Change links already exist in review.','Use familiar contextual Edit actions and retain prior choices.','Ask first-time shoppers to make a late edit without help.'),
], [1.25*inch,1.95*inch,1.95*inch,1.58*inch])
para('These laws explain possible interaction costs and inform design decisions. They do not, by themselves, prove that the observed Amazon interface violates a law or that the redesign performs better.','SmallX')
heading('5. Before / after recommendations')
table(['Current evidence','Proposed redesign','Intended benefit'],[
    ('EV-05: total and COD fee visible at review','Persistent itemized summary and explicit Total payable','Easier unaided cost comprehension'),
    ('EV-03: several payment methods','Grouped plain-language methods with fee context','Faster, more informed choice'),
    ('Review Change links already present','Contextual Edit controls with retained state','Predictable late changes'),
    ('No real failure capture','Simulated failure state with safe recovery actions','Clear transaction status and next step'),
    ('EV-01 quantity and review controls visible','Consistent, larger action areas','Fewer pointer misses'),
], [2.1*inch,2.55*inch,2.08*inch])
story.append(Spacer(1,12))
story.append(photo('payment-methods.jpg',max_height=2.7*inch))
para('EV-03 — Real payment crop. The redesign is a separate concept, not a modified Amazon screenshot.','SmallX')
story.append(PageBreak())
heading('6. Priority and validation plan')
para('<b>P1:</b> test cost comprehension; investigate failure recovery as a risk-led scenario. <b>P2:</b> test payment labels, grouping, and late edits. <b>P3:</b> refine target sizes after measuring interaction errors. Priority combines potential user risk, evidence confidence, and implementation effort; it is not a measured severity ranking.')
para('<b>Participants:</b> five India-based desktop shoppers with varied shopping frequency and payment familiarity. <b>Protocol:</b> start at cart; change quantity; select a sample address and delivery option; choose COD; state the fee and total without prompting; edit an earlier choice from review; experience a controlled simulated failure; recover; identify confirmation. Use only synthetic data in the prototype.')
para('<b>Measures:</b> unaided task success, correct total and fee, payment method comprehension, time per task, wrong turns, missed clicks, recovery success, and a 1–5 confidence rating. A task succeeds when the intended state is reached without moderator help and the relevant cost or transaction status is explained correctly.')
para('<b>Analysis:</b> capture task, completion, seconds, errors, participant quote, evidence ID, and proposed response. Synthesize repeated themes; do not treat five qualitative sessions as a population estimate. Get consent before screen recording. No test has yet been run.','SmallX')
heading('7. Metrics, limitations and learning')
para('Potential product measures are checkout completion, abandonment, time to confirmation, price comprehension, late-edit success, and safe recovery rate. Their baselines and any improvements remain <b>unmeasured</b>. A valid comparison needs the current flow or controlled benchmark as well as the proposed prototype.')
para('The strongest conclusion from this work is a set of testable design priorities. One expert journey and screenshots establish interface facts but cannot establish customer harm. Real user testing should decide whether the proposed changes are useful.')
sub('Proposed review design')
preview=ROOT/'assignment'/'design-previews'/'screen-05.png'
with PILImage.open(preview) as im:
    pw,ph=im.size
scale=min(6.75*inch/pw,2.15*inch/ph)
story.append(Image(str(preview),pw*scale,ph*scale))
para('Independent concept: the itemized total remains beside the final action, with direct Edit controls.','SmallX')
heading('Sources and artifact trail')
para('Original screenshots and observation log: <b>evidence/catalog.md</b>. Full issue matrix and protocol: <b>assignment/research-and-validation.md</b>. Editable design source: <b>assignment/amazon-checkout-editable-design-source.pptx</b>. Interactive prototype: <link href="https://kunalmahurkar.is-a.dev/amazon-checkout-prototype/" color="#007185">kunalmahurkar.is-a.dev/amazon-checkout-prototype/</link>.','SmallX')
para('Nielsen Norman Group: <link href="https://www.nngroup.com/articles/ten-usability-heuristics/" color="#007185">10 Usability Heuristics</link>. Interaction Design Foundation: <link href="https://www.interaction-design.org/literature/topics/hick-s-law" color="#007185">Hick\'s Law</link> and <link href="https://www.interaction-design.org/literature/topics/fitts-law" color="#007185">Fitts\'s Law</link>. Laws of UX: <link href="https://lawsofux.com/jakobs-law/" color="#007185">Jakob\'s Law</link>.','SmallX')

def footer(canvas, doc):
    canvas.saveState()
    w,h=doc.pagesize
    canvas.setStrokeColor(colors.HexColor('#d5d9d9'))
    canvas.line(43,43,w-43,43)
    canvas.setFont('Helvetica',7)
    canvas.setFillColor(GRAY)
    canvas.drawString(43,29,'Kunal Mahurkar | Amazon India checkout UX research | 20 Oct 2026')
    canvas.drawRightString(w-43,29,str(doc.page))
    canvas.restoreState()

doc=BaseDocTemplate(str(OUT),pagesize=(8.27*inch,11.69*inch),leftMargin=43,rightMargin=43,topMargin=48,bottomMargin=58)
frame=Frame(43,58,doc.pagesize[0]-86,doc.pagesize[1]-106,leftPadding=0,rightPadding=0,topPadding=0,bottomPadding=0)
doc.addPageTemplates(PageTemplate(id='research',frames=[frame],onPage=footer))
doc.build(story)
print(OUT)
