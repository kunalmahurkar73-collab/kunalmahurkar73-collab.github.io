const links=document.getElementById('links'),menu=document.getElementById('menu');
menu.addEventListener('click',()=>{const o=links.classList.toggle('open');menu.setAttribute('aria-expanded',o);menu.textContent=o?'×':'☰'});
links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰'}));
const themes=['cream','night','electric'];let ti=0;const vibe=document.getElementById('vibe');
vibe.addEventListener('click',()=>{ti=(ti+1)%themes.length;document.documentElement.dataset.theme=themes[ti];vibe.textContent='Vibe: '+themes[ti]});
document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('on'));b.classList.add('on');const f=b.dataset.f;document.querySelectorAll('.project').forEach(p=>p.style.display=(f==='all'||p.dataset.c.split(' ').includes(f))?'flex':'none')}));
document.querySelectorAll('.casebtn').forEach(b=>b.addEventListener('click',()=>{const c=b.nextElementSibling;c.classList.toggle('open');b.textContent=c.classList.contains('open')?'Hide breakdown ↑':'View breakdown ↓'}));
const chat=document.getElementById('chat'),msgs=document.getElementById('msgs'),inp=document.getElementById('input'),launcher=document.querySelector('.launch');
function openChat(){chat.classList.add('open');document.body.classList.add('lock');setTimeout(()=>inp.focus(),80)}
function closeChat(){chat.classList.remove('open');document.body.classList.remove('lock')}
document.querySelectorAll('.ask').forEach(b=>b.addEventListener('click',openChat));document.getElementById('close').addEventListener('click',closeChat);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeChat()});
const kb=[
[['who','about','summary','background'],'Kunal Mahurkar is an enterprise software consultant with 9+ years of experience across customer delivery, enterprise platforms, APIs, integrations, upgrades and automation. He is building toward AI-first product leadership.'],
[['product','why product','pm transition'],'Product is a natural extension of work Kunal already does: understanding customer problems, translating needs into workflows, aligning customer/engineering/R&D teams, validating releases and improving solutions from user feedback.'],
[['ai','llm','rag','agent','mcp'],'His AI work includes local RAG and LLM experiments, AI-assisted API documentation, n8n workflow automation and AI operations concepts using historical operational context.'],
[['projects','strongest','best'],'Strong examples include the five-environment enterprise upgrade, warehouse scanner UX work, AI-assisted API documentation, quote workflow automation and private RAG/LLM experiments.'],
[['upgrade','3dexperience','13 weeks'],'Kunal coordinated a 3DEXPERIENCE upgrade across five environments in a 13-week window, aligning customer, engineering and R&D dependencies including disaster-recovery feasibility and testing.'],
[['scanner','warehouse','vue','node'],'He worked on a warehouse scanner experience using Vue and Node.js, translating frontline feedback into usability and responsive-design improvements.'],
[['skills','technical'],'His strengths span product discovery and delivery, stakeholder alignment, enterprise software, APIs and integrations, plus practical AI/automation fluency including LLMs, RAG and n8n.'],
[['roles','fit','job'],'His profile is especially relevant to AI Product, Technical Product, Product Operations and customer-facing product roles where enterprise software depth and cross-functional execution matter.'],
[['course','learning','airtribe'],'Kunal is strengthening structured AI-first product management skills including discovery, prioritization, experimentation, metrics and AI product strategy.']
];
function add(t,w){const d=document.createElement('div');d.className='msg '+w;d.textContent=t;msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight}
function ans(q){const x=q.toLowerCase();let best=null,score=0;kb.forEach(([ks,a])=>{const n=ks.reduce((z,k)=>z+(x.includes(k)?k.length:0),0);if(n>score){score=n;best=a}});return best||'I don’t have a reliable portfolio fact for that yet. Try asking about Kunal’s AI work, product direction, enterprise upgrade, scanner project, skills or target roles.'}
function send(q){if(!q.trim())return;add(q,'user');setTimeout(()=>add(ans(q),'bot'),120)}
document.getElementById('form').addEventListener('submit',e=>{e.preventDefault();const q=inp.value;inp.value='';send(q)});
document.querySelectorAll('.prompt').forEach(p=>p.addEventListener('click',()=>send(p.textContent)));