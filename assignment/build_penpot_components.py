"""Generate small, editable SVG elements for Penpot's component library."""
from pathlib import Path
from html import escape

OUT=Path(__file__).resolve().parent/'penpot-import'/'components'
OUT.mkdir(parents=True,exist_ok=True)
items=[
  ('Primary Button','Place simulated order',320,68,'#ffd814','#131921'),
  ('Secondary Button','Change payment method',320,68,'#ffffff','#131921'),
  ('Selection Card','◉  Fastest delivery · FREE',410,84,'#f5f6f6','#131921'),
  ('Input Field','Sample address',410,84,'#ffffff','#52606d'),
  ('Progress Step','03  Delivery',250,68,'#232f3e','#ffffff'),
  ('Success Status','✓  Demo order confirmed',410,84,'#e5f7f4','#007185'),
  ('Error Status','!  No payment was taken',410,84,'#fff0ef','#a8262b'),
  ('Order Summary','Total payable    ₹214',410,84,'#ffffff','#131921'),
]
for i,(name,label,w,h,fill,ink) in enumerate(items,1):
    border='#d3d9d9'
    svg=f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">
<title>{escape(name)}</title><rect x="1" y="1" width="{w-2}" height="{h-2}" rx="10" fill="{fill}" stroke="{border}"/>
<text x="20" y="{h//2+7}" fill="{ink}" font-family="Arial" font-size="20" font-weight="700">{escape(label)}</text></svg>'''
    (OUT/f'{i:02d}-{name.lower().replace(" ","-")}.svg').write_text(svg,encoding='utf-8')
print(f'{len(items)} component imports: {OUT}')
