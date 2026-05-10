/* blog.js — Search, filter and sort logic for blog list page */
(function () {
  const grid      = document.getElementById('posts-grid');
  const noResults = document.getElementById('no-results');
  const countEl   = document.getElementById('result-count');
  const searchEl  = document.getElementById('search-input');
  const clearBtn  = document.getElementById('search-clear');
  const sortSel   = document.getElementById('sort-select');

  if (!grid) return;

  let activeSeries = 'all';
  let activeTag    = null;
  let searchQuery  = '';

  function applyFilters() {
    const q     = searchQuery.toLowerCase().trim();
    const cards = grid.querySelectorAll('.post-card');
    let visible = 0;

    cards.forEach(card => {
      const tags     = card.dataset.tags || '';
      const seriesOk = activeSeries === 'all' || tags.includes(activeSeries);
      const tagOk    = !activeTag || tags.includes(activeTag);
      const searchOk = !q || [
        card.dataset.title || '',
        card.dataset.desc || '',
        card.dataset.tags || ''
      ].some(f => f.includes(q));
      const show = seriesOk && tagOk && searchOk;

      card.classList.toggle('hidden', !show);
      if (show) visible++;
    });

    if (countEl)   countEl.textContent = visible;
    if (noResults) noResults.classList.toggle('show', visible === 0);
  }

  function applySortAndRender() {
    const val   = sortSel ? sortSel.value : 'newest';
    const cards = Array.from(grid.querySelectorAll('.post-card'));

    cards.sort((a, b) => {
      if (val === 'oldest') return (a.dataset.date || '').localeCompare(b.dataset.date || '');
      if (val === 'readtime') return parseInt(a.dataset.rt || '0') - parseInt(b.dataset.rt || '0');
      return (b.dataset.date || '').localeCompare(a.dataset.date || '');
    });

    cards.forEach(card => grid.appendChild(card));
    applyFilters();
  }

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeSeries = btn.dataset.tag || 'all';
      applyFilters();
    });
  });

  document.querySelectorAll('.tag-item').forEach(tag => {
    tag.addEventListener('click', () => {
      if (tag.classList.contains('active')) {
        tag.classList.remove('active');
        activeTag = null;
      } else {
        document.querySelectorAll('.tag-item').forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        activeTag = (tag.dataset.tag || '').toLowerCase();
      }

      applyFilters();
    });
  });

  if (searchEl) {
    searchEl.addEventListener('input', e => {
      searchQuery = e.target.value;
      if (clearBtn) clearBtn.classList.toggle('show', searchQuery.length > 0);
      applyFilters();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchEl) searchEl.value = '';
      searchQuery = '';
      clearBtn.classList.remove('show');
      applyFilters();
    });
  }

  if (sortSel) {
    sortSel.addEventListener('change', applySortAndRender);
  }

  applyFilters();
})();
