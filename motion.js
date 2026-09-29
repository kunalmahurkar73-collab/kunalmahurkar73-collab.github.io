// Keep the hero photo in a deliberate, undistorted square crop regardless of its source ratio.
const portraitStyle = document.createElement('style');
portraitStyle.textContent = `
  .portrait { width: min(350px, 100%); aspect-ratio: 1 / 1; overflow: visible; }
  .portrait img { width: 100%; height: 100%; object-fit: cover; object-position: center 28%; }
`;
document.head.appendChild(portraitStyle);

(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const elements = document.querySelectorAll('.card,.path article,.capabilities article');
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
