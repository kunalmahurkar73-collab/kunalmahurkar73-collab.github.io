const styles = document.createElement('style');
styles.textContent = `
  .portrait{width:min(350px,100%);aspect-ratio:1;overflow:visible}.portrait img{width:100%;height:100%;object-fit:cover;object-position:center 28%}
  .transition-line{margin:20px 0 24px;color:var(--v);font-size:clamp(18px,2vw,27px);font-weight:850;letter-spacing:-.04em}.transition-line span{color:var(--i);padding:0 7px}
  .journey{background:#f1eadc}.journey .eyebrow{color:#8d6414}.path:before{border-color:#d99b24}.path article:before{border-color:#d99b24}.path .next:before{background:var(--g);border-color:var(--i)}
  .case-story{margin:auto 0 0;display:flex;align-items:center;gap:5px;flex-wrap:wrap;font-size:10px;font-weight:900;letter-spacing:.04em}.case-story i{font:inherit;opacity:.7}.case-story b{border:1px solid currentColor;border-radius:999px;padding:5px 7px}
  .additional-work{padding:80px 0;background:#ece9e2}.additional-work h2{font-size:clamp(38px,5vw,68px);max-width:850px}.additional-work h2 i{color:var(--v)}.additional-work .intro{max-width:570px;color:var(--m);margin:20px 0 32px}.project-index{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.project-index article{background:var(--p);border:1px solid var(--l);border-radius:14px;padding:20px;min-height:175px}.project-index small{font-size:10px;font-weight:900;letter-spacing:.11em;color:var(--m)}.project-index h3{font-size:23px;letter-spacing:-.045em;line-height:1;margin:28px 0 10px}.project-index p{font-size:12px;line-height:1.5;color:var(--m);margin:0}.safe-note{margin-top:22px;font-size:11px;color:var(--m)}
  .capabilities p{display:inline-block;border:1px solid var(--l);border-radius:999px;padding:8px 10px;line-height:1.45}.ask-hint{font-size:11px;color:var(--m);margin:-8px 0 9px}
  @media(max-width:800px){.additional-work{padding:64px 0}.project-index{grid-template-columns:1fr}.case-story{gap:4px}.transition-line{font-size:18px}.path article>div{padding:14px}.capabilities p{display:block}.journey{padding-top:70px}}
`;
document.head.appendChild(styles);

// Positioning: enterprise technology → AI & automation → product management.
const hero = document.querySelector('.hero');
if (hero) {
  hero.querySelector('.eyebrow').textContent = 'KUNAL MAHURKAR · ENTERPRISE TECHNOLOGY → PRODUCT';
  hero.querySelector('h1').innerHTML = 'I turn complex enterprise problems into products people can actually use.';
  hero.querySelector('.lede').textContent = '9+ years across enterprise software, customer workflows, ERP/MES, APIs, integrations and automation — now applying that experience to AI-first product problems.';
  hero.querySelector('.actions .primary').textContent = 'Explore product work ↓';
  const transition = document.createElement('div');
  transition.className = 'transition-line';
  transition.innerHTML = 'Enterprise Technology <span>→</span> AI & Automation <span>→</span> Product Management';
  hero.querySelector('.lede').before(transition);
}

const journey = document.querySelector('#journey');
const work = document.querySelector('#work');
if (journey && work) work.before(journey);
if (journey) {
  journey.querySelector('.eyebrow').textContent = '01 / MY JOURNEY';
  journey.querySelector('h2').innerHTML = 'Enterprise experience,<br>moving closer to <i>product.</i>';
  journey.querySelector('.lede').textContent = 'Systems → customer workflows → integrations → automation → product delivery.';
  const stages = [
    ['01','Enterprise systems','3DEXPERIENCE · platforms · delivery'],
    ['02','Customer problems','User workflows · friction · stakeholder needs'],
    ['03','APIs & integrations','ERP / MES · REST / GraphQL · connected systems'],
    ['04','AI & automation','LLMs · RAG · n8n · assisted workflows'],
    ['05','Product management','Discovery · prioritization · UAT · iteration']
  ];
  journey.querySelectorAll('.path article').forEach((item,index)=>{item.querySelector('time').textContent=stages[index][0];item.querySelector('div').innerHTML=`<b>${stages[index][1]}</b><span>${stages[index][2]}</span>`});
}

if (work) {
  work.querySelector('.eyebrow').textContent = '02 / SELECTED PRODUCT WORK';
  work.querySelector('h2').innerHTML = 'Three problems that shaped<br>how I think about <i>products.</i>';
  work.querySelector('.heading > p:last-child').textContent = 'Problem → decision → solution → learning.';
  const stories = [
    'Scope|Dependencies|Environment sequence|Validation|Go-live',
    'User problem|Insight|Product decision|Iteration',
    'Known input|Structure|AI assist|Human validation|OpenAPI'
  ];
  work.querySelectorAll('.card').forEach((card,index)=>{const story=document.createElement('div');story.className='case-story';story.innerHTML=stories[index].split('|').map((step,i)=>`${i?'<i>→</i>':''}<b>${step}</b>`).join('');card.querySelector('strong').before(story)});
}

const thinking = document.querySelector('#thinking');
if (thinking) {
  thinking.querySelector('.eyebrow').textContent = '03 / HOW I THINK ABOUT PRODUCTS';
  thinking.querySelector('.thought > p').textContent = 'A compact loop for turning friction into a testable change.';
  thinking.querySelectorAll('.capabilities article').forEach(card=>{const text=card.querySelector('p');text.textContent=text.textContent.replaceAll(' · ', '  ·  ')});
}

if (thinking) thinking.insertAdjacentHTML('afterend', `
  <section class="additional-work" aria-labelledby="additional-work-title"><div class="shell"><p class="eyebrow">04 / ADDITIONAL ENTERPRISE WORK</p><h2 id="additional-work-title">More evidence.<br><i>Safely summarized.</i></h2><p class="intro">An anonymized index of additional products, prototypes and delivery foundations—focused on the product problem, not client data or proprietary implementation detail.</p><div class="project-index">
  <article><small>API EXPERIENCE</small><h3>Interactive API Documentation</h3><p>Structured fragmented API knowledge for integration discovery.</p></article><article><small>AUTOMATION</small><h3>ERP Workflow Connector</h3><p>Explored reusable automation across core business objects.</p></article><article><small>AI + INTEGRATION</small><h3>AI-Assisted Data Mapping</h3><p>Combined schema matching, deterministic transforms and review boundaries.</p></article><article><small>DEVELOPER EXPERIENCE</small><h3>Enterprise MCP Integration</h3><p>Prototyped controlled tools for named business operations.</p></article><article><small>PRODUCT OPERATIONS</small><h3>Custom App Delivery Framework</h3><p>Defined evidence-based gates from discovery through handover.</p></article><article><small>COMPLIANCE WORKFLOW</small><h3>Tax &amp; Configuration Workbench</h3><p>Shaped rules, exceptions, approvals and audit history.</p></article><article><small>OPERATIONS</small><h3>Incident Intelligence Concept</h3><p>Explored evidence-led incident and workload visibility.</p></article><article><small>FIELD SERVICE</small><h3>Service Operations MVP</h3><p>Designed mobile maintenance workflows from issue to completion.</p></article><article><small>QUOTE WORKFLOW</small><h3>Freight &amp; Quote Automation</h3><p>Surfaced records needing attention while retaining approval points.</p></article>
  </div><p class="safe-note">Names, customer references, environments, commercial data, screenshots and proprietary details are intentionally excluded.</p></div></section>`);

const chat = document.querySelector('.chat');
if(chat){chat.querySelector('.chathead small').textContent='Want the 30-second version?';chat.querySelector('.msgs .bot').textContent='I’m a portfolio navigation assistant. Ask why Kunal is moving into Product, his strongest product work, AI experience, enterprise experience or technical depth.';chat.querySelector('.prompts').innerHTML='<button class="prompt">Why Product?</button><button class="prompt">Strongest product work?</button><button class="prompt">AI experience?</button><button class="prompt">Enterprise experience?</button>'}

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const elements = document.querySelectorAll('.card,.path article,.capabilities article,.project-index article');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('show');observer.unobserve(entry.target)}}),{threshold:.12});
  elements.forEach((element,index)=>{element.classList.add('reveal');element.style.transitionDelay=`${(index%3)*70}ms`;observer.observe(element)});
}

// The assistant prompt buttons are replaced above, so connect their existing local responder.
document.querySelectorAll('.chat .prompt').forEach(button => {
  button.addEventListener('click', () => window.send?.(button.textContent));
});
