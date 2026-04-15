// Animação dos contadores
const counters = document.querySelectorAll('[data-target]');
if (counters.length) {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, t = +el.dataset.target, dur = 1600, s = performance.now();
    (function f(n) {
      const p = Math.min((n - s) / dur, 1), v = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(v * t).toLocaleString('pt-BR');
      if (p < 1) requestAnimationFrame(f);
    })(s);
    io.unobserve(el);
  }), { threshold: .4 });
  counters.forEach(c => io.observe(c));
}
