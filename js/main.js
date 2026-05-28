const COUNTER_DURATION = 1600;
const COUNTER_THRESHOLD = 0.4;

const counters = document.querySelectorAll('[data-target]');
if (counters.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / COUNTER_DURATION, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target).toLocaleString('pt-BR');
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: COUNTER_THRESHOLD });
  counters.forEach(counter => observer.observe(counter));
}
