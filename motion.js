const enhancements = document.createElement('style');
enhancements.textContent = `
  .portrait { width: min(350px, 100%); aspect-ratio: 1 / 1; overflow: visible; }
  .portrait img { width: 100%; height: 100%; object-fit: cover; object-position: center 28%; }
  .additional-work { padding: 96px 0; background: #ece9e2; }
  .additional-work h2 { font-size: clamp(38px, 5vw, 68px); max-width: 850px; }
  .additional-work h2 i { color: var(--v); }
  .additional-work .intro { max-width: 570px; color: var(--m); margin: 20px 0 35px; }
  .project-index { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .project-index article { background: var(--p); border: 1px solid var(--l); border-radius: 14px; padding: 20px; min-height: 185px; display: flex; flex-direction: column; }
  .project-index small { font-size: 10px; font-weight: 900; letter-spacing: .11em; color: var(--m); }
  .project-index h3 { font-size: 23px; letter-spacing: -.045em; line-height: 1; margin: 28px 0 10px; }
  .project-index p { font-size: 12px; line-height: 1.5; color: var(--m); margin: 0; }
  .safe-note { margin-top: 22px; font-size: 11px; color: var(--m); }
  @media (max-width: 800px) { .additional-work { padding: 70px 0; } .project-index { grid-template-columns: 1fr; } .project-index article { min-height: auto; } }
`;
document.head.appendChild(enhancements);

const work = document.querySelector('#work');
if (work) {
  work.insertAdjacentHTML('afterend', `
    <section class="additional-work" aria-labelledby="additional-work-title">
      <div class="shell">
        <p class="eyebrow">01.5 / ADDITIONAL WORK</p>
        <h2 id="additional-work-title">More enterprise product work.<br><i>Safely summarized.</i></h2>
        <p class="intro">An anonymized index of additional products, prototypes and delivery foundations. Each summary focuses on the product problem and approach—not client data, internal systems or confidential implementation detail.</p>
        <div class="project-index">
          <article><small>API EXPERIENCE</small><h3>Interactive API Documentation</h3><p>Turned fragmented API knowledge into browsable, structured documentation designed to support integration discovery.</p></article>
          <article><small>AUTOMATION</small><h3>ERP Workflow Connector</h3><p>Explored reusable workflow automation across core business objects using a low-code automation extension.</p></article>
          <article><small>AI + INTEGRATION</small><h3>AI-Assisted Data Mapping</h3><p>Designed a connector approach that combines schema matching, deterministic transforms, review boundaries and auditability.</p></article>
          <article><small>DEVELOPER EXPERIENCE</small><h3>Enterprise MCP Integration</h3><p>Prototyped a controlled tool layer for named business operations, shared authentication patterns and replaceable service endpoints.</p></article>
          <article><small>PRODUCT OPERATIONS</small><h3>Custom App Delivery Framework</h3><p>Defined lifecycle gates for discovery, design, verification, release readiness and handover in enterprise custom delivery.</p></article>
          <article><small>COMPLIANCE WORKFLOW</small><h3>Tax &amp; Configuration Workbench</h3><p>Shaped a rules-driven operational workflow with effective dates, exception handling, approvals and audit history.</p></article>
          <article><small>OPERATIONS</small><h3>Incident Intelligence Concept</h3><p>Explored an attention-first operations view for incident investigation, workload visibility and evidence-led assistance.</p></article>
          <article><small>FIELD SERVICE</small><h3>Service Operations MVP</h3><p>Designed a mobile-first maintenance workflow spanning complaints, work orders, technician checklists and completion evidence.</p></article>
          <article><small>QUOTE WORKFLOW</small><h3>Freight &amp; Quote Automation</h3><p>Explored a workflow to surface order records needing attention, bring external quote data into review, and preserve approval points.</p></article>
        </div>
        <p class="safe-note">Names, customer references, live environments, commercial data, screenshots and proprietary implementation details are intentionally excluded.</p>
      </div>
    </section>`);
}

(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const elements = document.querySelectorAll('.card,.path article,.capabilities article,.project-index article');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  }), { threshold: .12 });
  elements.forEach((element, index) => {
    element.classList.add('reveal');
    element.style.transitionDelay = `${(index % 3) * 70}ms`;
    observer.observe(element);
  });
})();
