/* Services dropdown in the main nav. Only touches .nav-drop elements. */
(() => {
  const drops = document.querySelectorAll('.nav-drop');
  if (!drops.length) return;
  const close = (d) => {
    d.classList.remove('is-open');
    const b = d.querySelector('.nav-drop-toggle');
    if (b) b.setAttribute('aria-expanded', 'false');
  };
  drops.forEach((d) => {
    const btn = d.querySelector('.nav-drop-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const open = !d.classList.contains('is-open');
      d.classList.remove('is-dismissed');
      d.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
    d.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      close(d);
      d.classList.add('is-dismissed');
      btn.focus();
    });
    d.addEventListener('mouseleave', () => d.classList.remove('is-dismissed'));
    d.addEventListener('focusout', (e) => {
      if (!d.contains(e.relatedTarget)) { close(d); d.classList.remove('is-dismissed'); }
    });
  });
  document.addEventListener('click', (e) => {
    drops.forEach((d) => { if (!d.contains(e.target)) close(d); });
  });
})();
