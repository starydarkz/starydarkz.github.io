/* proyectos.js — Language filter for projects page */
(function () {
  const grid = document.getElementById('proyectos-grid');
  if (!grid) return;

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const lang = btn.dataset.lang;
      grid.querySelectorAll('.proj-full-card').forEach(card => {
        const match = lang === 'all' || card.dataset.lang === lang;
        card.classList.toggle('hidden', !match);
      });
    });
  });
})();
