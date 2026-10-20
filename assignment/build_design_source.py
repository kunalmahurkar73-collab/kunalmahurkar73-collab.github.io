"""Create editable checkout screen designs with native PowerPoint shapes."""
from pathlib import Path
from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.util import Inches, Pt

OUT=Path(__file__).resolve().parent
INK=RGBColor(19,25,33); NAVY=RGBColor(35,47,62); YELLOW=RGBColor(255,216,20)
TEAL=RGBColor(0,113,133); PAPER=RGBColor(245,246,246); WHITE=RGBColor(255,255,255)
LINE=RGBColor(211,217,217); MUTED=RGBColor(83,91,94); RED=RGBColor(168,38,43)
prs=Presentation(); prs.slide_width=Inches(13.333); prs.slide_height=Inches(7.5)

def rect(s,x,y,w,h,fill,line=None):
    z=s.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(x),Inches(y),Inches(w),Inches(h))
    z.fill.solid(); z.fill.fore_color.rgb=fill
    if line: z.line.color.rgb=line
    else: z.line.fill.background()
    return z

def text(s,label,x,y,w,h,size=16,color=INK,bold=False):
    z=s.shapes.add_textbox(Inches(x),Inches(y),Inches(w),Inches(h)); z.text_frame.clear(); z.text_frame.word_wrap=True
    z.text_frame.margin_left=Inches(.02); z.text_frame.margin_top=Inches(.02)
    p=z.text_frame.paragraphs[0]; p.text=label; p.font.name='Aptos'; p.font.size=Pt(size); p.font.bold=bold; p.font.color.rgb=color

def button(s,label,x,y,w=3.5,primary=True):
    rect(s,x,y,w,.48,YELLOW if primary else WHITE,LINE); text(s,label,x+.16,y+.09,w-.3,.29,14,INK,True)

def shell(title,step):
    s=prs.slides.add_slide(prs.slide_layouts[6]); s.background.fill.solid(); s.background.fill.fore_color.rgb=PAPER
    rect(s,0,0,13.333,.7,INK); text(s,'KM.  /  CHECKOUT LAB',.48,.18,4.1,.36,18,WHITE,True)
    text(s,'SAFE SIMULATION  ·  NO REAL PAYMENT',9.1,.22,3.8,.27,11,WHITE)
    text(s,'PROPOSED DESKTOP CHECKOUT  /  DESIGN CONCEPT',.55,.92,8.2,.27,12,TEAL,True)
    text(s,title,.55,1.25,8.7,.57,30,INK,True)
    for i,name in enumerate(['Cart','Address','Delivery','Payment','Review']):
        x=.55+i*2.48; rect(s,x,2.02,2.26,.48,NAVY if i<=step else WHITE,LINE)
        text(s,f'{i+1:02d}  {name}',x+.13,2.13,2,.25,13,WHITE if i<=step else MUTED,i==step)
    rect(s,.55,2.79,8,3.84,WHITE,LINE); rect(s,8.79,2.79,3.98,3.84,WHITE,LINE)
    text(s,'ORDER SUMMARY',9.09,3.10,3.3,.35,15,INK,True)
    text(s,'DIP: A Little Book of Wisdom',9.09,3.66,3.2,.4,14)
    text(s,'Item subtotal',9.09,4.20,2.2,.33,14,MUTED); text(s,'₹207',11.87,4.20,.62,.33,14,INK,True)
    text(s,'Delivery',9.09,4.70,2.2,.33,14,MUTED); text(s,'FREE',11.77,4.70,.72,.33,14,TEAL,True)
    if title == 'Review your order':
        text(s,'COD fee',9.09,5.09,2.1,.3,13,MUTED)
        text(s,'+ ₹7',11.75,5.09,.82,.3,13,INK,True)
    rect(s,9.07,5.52,3.39,.02,LINE); text(s,'Total payable',9.09,5.72,2.1,.4,18,INK,True)
    text(s,'₹214' if title == 'Review your order' else '₹207',11.75,5.72,.82,.4,18,INK,True)
    text(s,'Educational redesign · editable PowerPoint source',.57,7.08,8.4,.2,10,MUTED)
    return s

def heading(s,label,sub):
    text(s,label,.88,3.12,7.1,.48,23,INK,True); text(s,sub,.88,3.61,7,.57,15,MUTED)

s=shell('Your cart',0); heading(s,'DIP: A Little Book of Wisdom','Paperback · sample item · ₹207')
text(s,'Quantity',.9,4.47,2,.35,16,INK,True); rect(s,3.1,4.38,1.65,.52,WHITE,LINE); text(s,'−    1    +',3.32,4.47,1.2,.3,16,INK,True)
button(s,'Continue to address',.9,5.53,3.7)
s=shell('Choose a delivery address',1); heading(s,'Where should it go?','Sample addresses only. No personal information is collected.')
for i,(label,active) in enumerate([('Home · sample address',True),('Work · sample address',False)]):
    y=4.27+i*.83; rect(s,.88,y,6.9,.67,PAPER if active else WHITE,TEAL if active else LINE)
    text(s,('◉  ' if active else '○  ')+label,1.09,y+.2,5.8,.29,16)
button(s,'Continue to delivery',.9,5.92,3.7)
s=shell('Select delivery',2); heading(s,'Choose your delivery option','Compare timing and price before continuing.')
for i,(label,active) in enumerate([('Fastest available delivery       FREE',True),('Later delivery day                 FREE',False)]):
    y=4.27+i*.83; rect(s,.88,y,6.9,.67,PAPER if active else WHITE,TEAL if active else LINE)
    text(s,('◉  ' if active else '○  ')+label,1.09,y+.2,6.1,.29,16)
button(s,'Continue to payment',.9,5.92,3.7)
s=shell('Choose payment',3); heading(s,'How would you like to pay?','Simulated methods only. No credentials are requested.')
for i,(label,active) in enumerate([('UPI · no added fee',True),('Card · no added fee',False),('Cash on delivery · ₹7 fee',False)]):
    y=4.17+i*.62; rect(s,.88,y,6.9,.53,PAPER if active else WHITE,TEAL if active else LINE)
    text(s,('◉  ' if active else '○  ')+label,1.09,y+.13,6.2,.27,15)
button(s,'Review your order',.9,6.10,3.7)
s=shell('Review your order',4); heading(s,'Check before you place','Edit any choice without losing progress.')
for i,(label,value) in enumerate([('Item','DIP × 1'),('Address','Home'),('Delivery','Fastest'),('Payment','Cash on delivery')]):
    y=4.11+i*.47; text(s,label,.92,y,1.58,.3,14,MUTED); text(s,value,2.64,y,3.47,.3,14,INK,True); text(s,'Edit',6.91,y,.5,.3,13,TEAL,True)
button(s,'Place simulated order',.9,6.03,3.7)
s=shell('Processing',4); heading(s,'Checking your demo order','This simulation sends no payment or order to Amazon.')
rect(s,.9,4.45,6.8,.75,PAPER,LINE); text(s,'Please wait · your choices remain saved',1.18,4.67,5.9,.3,17)
s=shell('Payment could not be completed',4); heading(s,'No payment was taken','Your selections are saved. Choose a safe next step.')
rect(s,.9,4.44,6.8,.62,WHITE,RED); text(s,'Simulated failure · transaction status is clear',1.18,4.61,6,.31,15,RED,True)
button(s,'Retry from review',.9,5.47,2.85); button(s,'Change payment method',3.95,5.47,3.45,False)
s=shell('Recovery options',3); heading(s,'Choose another way to pay','Your address, delivery and quantity remain selected.')
rect(s,.88,4.27,6.9,.67,PAPER,TEAL); text(s,'◉  Cash on delivery · ₹7 fee',1.09,4.47,6.1,.29,16)
button(s,'Return to review',.9,5.46,3.4)
s=shell('Demo order confirmed',4); heading(s,'Your simulated order is confirmed','Local demo reference: LOCAL-2026 · no real order was placed.')
rect(s,.9,4.35,6.75,.75,PAPER,TEAL); text(s,'✓  Confirmation state is clear',1.2,4.59,6,.33,18,TEAL,True)
button(s,'Reset demo',.9,5.53,2.7)
path=OUT/'amazon-checkout-editable-design-source.pptx'; prs.save(path)
print(f'{path} · {len(prs.slides)} editable screens')
