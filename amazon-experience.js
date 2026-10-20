(function () {
  const sections = [...document.querySelectorAll('main > section')];
  const names = ['Overview', 'Research method', 'Current experience', 'Heuristic findings', 'UX laws', 'Before / after', 'Priorities', 'Validation plan', 'Lessons learned'];
  sections.forEach((section, i) => { section.id ||= `chapter-${i + 1}`; });

  const nav = document.createElement('nav');
  nav.className = 'guided-nav';
  nav.setAttribute('aria-label', 'Case study chapters');
  nav.innerHTML = '<div class="wrap guided-inner"><a href="#chapter-1" class="guided-start">Start experience</a><span class="guided-count" aria-live="polite">01 / 09</span><select aria-label="Jump to case study chapter"></select><button type="button" class="guided-prev" aria-label="Previous chapter">← Previous</button><button type="button" class="guided-next" aria-label="Next chapter">Next →</button></div>';
  document.querySelector('main').insertBefore(nav, sections[0]);
  const select = nav.querySelector('select');
  names.forEach((name, i) => select.add(new Option(`${String(i + 1).padStart(2, '0')} · ${name}`, sections[i].id)));
  let active = 0;
  function setActive(i, navigate = false) {
    active = Math.max(0, Math.min(sections.length - 1, i));
    nav.querySelector('.guided-count').textContent = `${String(active + 1).padStart(2, '0')} / ${String(sections.length).padStart(2, '0')}`;
    select.value = sections[active].id;
    nav.querySelector('.guided-prev').disabled = active === 0;
    nav.querySelector('.guided-next').disabled = active === sections.length - 1;
    if (navigate) sections[active].scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  }
  nav.querySelector('.guided-prev').addEventListener('click', () => setActive(active - 1, true));
  nav.querySelector('.guided-next').addEventListener('click', () => setActive(active + 1, true));
  select.addEventListener('change', () => setActive(sections.findIndex(s => s.id === select.value), true));
  document.addEventListener('keydown', e => {
    if (e.altKey || e.ctrlKey || e.metaKey || ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
    if (e.key === 'ArrowRight') setActive(active + 1, true);
    if (e.key === 'ArrowLeft') setActive(active - 1, true);
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(sections.indexOf(visible.target));
    }, {rootMargin: '-24% 0px -45% 0px', threshold: [0, .2, .5]});
    sections.forEach(s => observer.observe(s));
  }

  const comparison = document.querySelector('.comparison');
  comparison.closest('section').classList.add('comparison-section');
  comparison.classList.add('visual-comparison');
  comparison.innerHTML = `
    <div class="comparison-toolbar" role="group" aria-label="Choose comparison">
      <button type="button" data-finding="pricing" aria-pressed="true">UX-01 · Price clarity</button>
      <button type="button" data-finding="payment" aria-pressed="false">UX-04 · Payment choice</button>
      <button type="button" data-finding="recovery" aria-pressed="false">UX-05 · Recovery concept</button>
    </div>
    <div class="mobile-view-switch" role="group" aria-label="Choose view"><button type="button" data-view="before" aria-pressed="true">Current experience</button><button type="button" data-view="after" aria-pressed="false">Proposed design</button></div>
    <div class="comparison-panels"><figure class="comparison-before"><span class="comparison-badge">Observed Amazon interface</span><img alt="" loading="lazy"><figcaption></figcaption></figure><figure class="comparison-after"><span class="comparison-badge">Proposed editable design</span><img alt="" loading="lazy"><figcaption></figcaption></figure></div>
    <div class="comparison-annotation" aria-live="polite"></div>`;
  const cases = {
    pricing: {before:'evidence/clean/review-total.png', after:'assignment/design-previews/screen-05.png', beforeAlt:'Original Amazon review showing ₹207 item price, ₹7 cash on delivery fee and ₹214 total', afterAlt:'Proposed review screen with itemized order summary, ₹7 fee, ₹214 total and Edit actions', beforeText:'Observed: the ₹7 cash on delivery fee raises the final total to ₹214.', afterText:'Design opportunity: group cost details by the decision point and show an explicit total payable.', note:'Visibility of system status · Hick’s Law. Hypothesis: a clearer breakdown may aid cost comprehension. Validate by asking shoppers to state the payable amount and fee unaided.'},
    payment: {before:'evidence/clean/payment-methods.png', after:'assignment/design-previews/screen-04.png', beforeAlt:'Original Amazon payment method choices including card, UPI scan and pay and cash on delivery', afterAlt:'Proposed payment choice screen with grouped methods and fee labels', beforeText:'Observed: card, net banking, UPI scan and pay, and cash on delivery are listed.', afterText:'Design opportunity: concise method descriptions and visible fee labels.', note:'Match between system and real world · Hick’s Law. Hypothesis: grouping and plain language may reduce decision effort. Test method comprehension and selection time.'},
    recovery: {before:'evidence/order-confirmation.jpg', after:'assignment/design-previews/screen-07.png', beforeAlt:'Original Amazon order placed confirmation; no payment failure was captured', afterAlt:'Proposed simulated payment failure screen with clear transaction status and safe recovery actions', beforeText:'Evidence boundary: the captured journey succeeded. No real payment failure was observed.', afterText:'Untested scenario: show transaction status, preserve selections, and offer retry or change method.', note:'Error recovery · Design opportunity only. The original capture cannot establish a failure problem. Validate with a controlled simulated failure, then observe recovery and confidence.'}
  };
  function showFinding(key) {
    const item = cases[key];
    comparison.querySelectorAll('[data-finding]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.finding === key)));
    const before = comparison.querySelector('.comparison-before'), after = comparison.querySelector('.comparison-after');
    before.querySelector('img').src = item.before; before.querySelector('img').alt = item.beforeAlt; before.querySelector('figcaption').textContent = item.beforeText;
    after.querySelector('img').src = item.after; after.querySelector('img').alt = item.afterAlt; after.querySelector('figcaption').textContent = item.afterText;
    comparison.querySelector('.comparison-annotation').textContent = item.note;
  }
  comparison.querySelectorAll('[data-finding]').forEach(b => b.addEventListener('click', () => showFinding(b.dataset.finding)));
  comparison.querySelectorAll('[data-view]').forEach(b => b.addEventListener('click', () => {
    comparison.dataset.view = b.dataset.view;
    comparison.querySelectorAll('[data-view]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  }));
  comparison.dataset.view = 'before'; showFinding('pricing'); setActive(0);
})();
