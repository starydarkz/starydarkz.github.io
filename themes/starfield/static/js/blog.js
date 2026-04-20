/* blog.js — Search, filter and sort logic for blog list page */
(function () {
  const grid      = document.getElementById('posts-grid');
  const noResults = document.getElementById('no-results');
  const countEl   = document.getElementById('result-count');
  const searchEl  = document.getElementById('search-input');
  const clearBtn  = document.getElementById('search-clear');
  const sortSel   = document.getElementById('sort-select');

  if (!grid || typeof window.POSTS_DATA === 'undefined') return;

  let activeFilter = 'all';
  let activeTag    = null;
  let searchQuery  = '';

  /* ── Build cards from embedded JSON ── */
  function catSlug(cat) { return (cat || 'web').toLowerCase().replace(/\s+/g, ''); }

  function catBg(slug) {
    return {
      web:     'linear-gradient(135deg,#0a1a2e,#162840)',
      malware: 'linear-gradient(135deg,#0d1a30,#1a0d2e)',
      redteam: 'linear-gradient(135deg,#100d2a,#1e1040)',
      ctf:     'linear-gradient(135deg,#1a1000,#2e2000)',
      crypto:  'linear-gradient(135deg,#1a001a,#2e002e)',
      network: 'linear-gradient(135deg,#001a1a,#002e2a)',
    }[slug] || 'linear-gradient(135deg,#0a0a1a,#1a1a2e)';
  }

  function catEmoji(slug) {
    return { web:'🔐', malware:'🛡️', redteam:'🎯', ctf:'🏆', crypto:'🔓', network:'🌐' }[slug] || '✦';
  }

  function buildCard(p) {
    const slug  = catSlug(p.cat);
    const tags  = (p.tags || []).slice(0, 2).map(t => `<span class="ptag">${t}</span>`).join('');
    const imgEl = p.cover
      ? `<img src="${p.cover}" alt="${p.title}" loading="lazy">`
      : `<span class="post-card-emoji">${catEmoji(slug)}</span>`;
    return `
      <a href="${p.url}" class="post-card"
         data-cat="${slug}"
         data-tags="${(p.tags||[]).join(',').toLowerCase()}"
         data-title="${p.title.toLowerCase()}"
         data-desc="${(p.desc||'').toLowerCase()}"
         data-date="${p.date}"
         data-rt="${p.readtime||5}">
        <div class="post-card-img post-img-${slug}" style="${p.cover?'':'background:'+catBg(slug)}">
          ${imgEl}
          <div class="post-card-img-overlay"></div>
          <span class="post-card-tag tag-${slug}">${p.catLabel}</span>
        </div>
        <div class="post-card-body">
          <div class="post-card-date">${p.date}</div>
          <h3 class="post-card-title">${p.title}</h3>
          <p class="post-card-desc">${p.desc||''}</p>
        </div>
        <div class="post-card-footer">
          <div class="post-card-meta">
            <span class="post-card-readtime">${p.readtime||5} min</span>
            <div class="post-card-tags">${tags}</div>
          </div>
          <span class="post-arrow">→</span>
        </div>
      </a>`;
  }

  /* Initial render */
  let sortedPosts = [...window.POSTS_DATA];
  grid.innerHTML  = sortedPosts.map(buildCard).join('');

  /* ── Filter / search ── */
  function applyFilters() {
    const q     = searchQuery.toLowerCase().trim();
    const cards = grid.querySelectorAll('.post-card');
    let visible = 0;

    cards.forEach(card => {
      const catOk    = activeFilter === 'all' || card.dataset.cat === activeFilter;
      const tagOk    = !activeTag  || card.dataset.tags.includes(activeTag);
      const searchOk = !q || [card.dataset.title, card.dataset.desc, card.dataset.tags, card.dataset.cat].some(f => f.includes(q));
      const show     = catOk && tagOk && searchOk;
      card.classList.toggle('hidden', !show);
      if (show) visible++;
    });

    if (countEl)   countEl.textContent = visible;
    if (noResults) noResults.classList.toggle('show', visible === 0);
  }

  /* ── Sort ── */
  function applySortAndRender() {
    const val = sortSel ? sortSel.value : 'newest';
    const data = [...window.POSTS_DATA];
    if (val === 'newest')   data.sort((a, b) => b.date.localeCompare(a.date));
    if (val === 'oldest')   data.sort((a, b) => a.date.localeCompare(b.date));
    if (val === 'readtime') data.sort((a, b) => parseInt(a.readtime) - parseInt(b.readtime));
    grid.innerHTML = data.map(buildCard).join('');
    applyFilters();
  }

  /* ── Events ── */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.cat;
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
        activeTag = tag.dataset.tag.toLowerCase();
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
})();
