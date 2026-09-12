(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.body.classList.add("motion-ready");

  // Scroll progress
  const progress = document.createElement("div");
  progress.className = "motion-progress";
  document.body.appendChild(progress);
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? window.scrollY / max : 0;
    progress.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
  };
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);

  // Reveal content as it enters viewport
  const revealTargets = [
    ...document.querySelectorAll(
      ".recruiter-grid .signal, .proof-card, .metric, .value, .project, .step, .row, .skill, .panel, .artifact-card, .recognition-card, .role-panel"
    )
  ];
  revealTargets.forEach((el, index) => {
    el.classList.add("reveal");
    el.style.setProperty("--reveal-delay", `${(index % 4) * 65}ms`);
  });

  if (!reduceMotion && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    revealTargets.forEach(el => revealObserver.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add("revealed"));
  }

  // Continuous ticker: duplicate once and move exactly half its content
  const ticker = document.querySelector(".ticker-inner");
  if (ticker && !ticker.dataset.motionReady) {
    ticker.dataset.motionReady = "1";
    ticker.innerHTML += ticker.innerHTML;
    ticker.classList.add("motion-marquee");
  }

  // Count up meaningful numeric metrics
  const animateMetric = (el) => {
    const original = el.textContent.trim();
    const match = original.match(/^(\d+)(\+?)$/);
    if (!match || el.dataset.counted) return;
    el.dataset.counted = "1";
    const target = Number(match[1]);
    const suffix = match[2] || "";
    const duration = 850;
    const start = performance.now();
    el.classList.add("counting");
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = `${Math.round(target * eased)}${suffix}`;
      if (t < 1) requestAnimationFrame(tick);
      else {
        el.textContent = original;
        el.classList.remove("counting");
      }
    };
    requestAnimationFrame(tick);
  };

  const metricNumbers = document.querySelectorAll(".metric b, .proof-metrics strong");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const metricObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        animateMetric(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: .75 });
    metricNumbers.forEach(el => metricObserver.observe(el));
  }

  // Active nav section
  const navLinks = [...document.querySelectorAll(".links a[href^='#']")];
  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
      });
    }, { rootMargin: "-20% 0px -65% 0px", threshold: [0, .2, .5] });
    sections.forEach(section => navObserver.observe(section));
  }

  // Desktop-only cursor aura
  const finePointer = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
  if (finePointer && !reduceMotion) {
    const aura = document.createElement("div");
    aura.className = "cursor-aura";
    document.body.appendChild(aura);
    window.addEventListener("pointermove", (e) => {
      aura.style.left = `${e.clientX}px`;
      aura.style.top = `${e.clientY}px`;
      document.body.classList.add("aura-on");
    }, { passive: true });
    document.addEventListener("mouseleave", () => document.body.classList.remove("aura-on"));
  }

  // 3D tilt for featured proof cards, desktop only
  if (finePointer && !reduceMotion) {
    document.querySelectorAll(".proof-card").forEach(card => {
      card.classList.add("motion-tilt");
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        card.style.transform = `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 7}deg) translateY(-5px)`;
      });
      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }

  // Subtle hero orb parallax on desktop
  const orb = document.querySelector(".orb");
  if (orb && finePointer && !reduceMotion) {
    window.addEventListener("pointermove", (e) => {
      const x = (e.clientX / window.innerWidth - .5) * 28;
      const y = (e.clientY / window.innerHeight - .5) * 18;
      orb.style.translate = `${x}px ${y}px`;
    }, { passive: true });
  }

  // Re-animate the role panel when the existing role tabs change it
  document.querySelectorAll(".role-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      const panel = document.querySelector(".role-panel");
      if (!panel) return;
      panel.classList.remove("motion-swap");
      void panel.offsetWidth;
      panel.classList.add("motion-swap");
    });
  });

  // Role-specific deep links
  const roleParam = new URLSearchParams(window.location.search).get("role");
  const roleMap = {
    "ai-product":"ai",
    "technical-product":"technical",
    "product-ops":"ops",
    "customer-product":"customer"
  };
  if (roleParam && roleMap[roleParam]) {
    const target = document.querySelector(`.role-tab[data-role="${roleMap[roleParam]}"], .role-tab[data-r="${roleMap[roleParam]}"], .role-tab[data-key="${roleMap[roleParam]}"]`);
    if (target) {
      window.setTimeout(() => target.click(), 100);
    }
  }

})();