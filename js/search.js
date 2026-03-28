// ========================================
// 搜尋功能
// ========================================

const Search = {
  index: null,

  buildIndex() {
    this.index = [];

    // Index concepts
    CONTENT.concepts.forEach(c => {
      this.index.push({ title: c.title, desc: c.why, route: `concept-${c.id}`, section: '核心概念' });
      this.index.push({ title: c.analogy.title, desc: c.analogy.text.substring(0, 100), route: `concept-${c.id}`, section: '核心概念' });
    });

    // Index cases
    CONTENT.cases.forEach(c => {
      this.index.push({ title: `案例${c.id}：${c.title}`, desc: c.subtitle, route: `case-${c.id}`, section: '案例拆解' });
      c.questions.forEach(q => {
        this.index.push({ title: q.q, desc: q.answer + ' — ' + q.detail.substring(0, 80), route: `case-${c.id}`, section: '案例拆解' });
      });
    });

    // Index additional concepts
    CONTENT.additionalConcepts.forEach(c => {
      this.index.push({ title: c.title, desc: c.desc, route: 'automation-map', section: '補充概念' });
    });

    // Index dialog skills
    this.index.push({ title: '與 AI 對話技巧', desc: '學會有效地跟 AI 溝通', route: 'dialog-skills', section: '對話技巧' });

    // Index automation map
    this.index.push({ title: '自動化地圖', desc: '觸發 → 處理 → 行動的完整概覽', route: 'automation-map', section: '自動化地圖' });
  },

  search(query) {
    if (!this.index) this.buildIndex();
    if (!query || query.length < 1) return [];

    const q = query.toLowerCase();
    return this.index.filter(item =>
      item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q)
    ).slice(0, 8);
  },

  highlight(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
  },

  renderSearchBar() {
    return `
      <div class="search-wrapper" id="search-wrapper">
        <span class="search-icon">🔍</span>
        <input class="search-input" type="text" placeholder="搜尋概念、案例、技術名稱..."
               oninput="Search.onInput(this.value)" onfocus="Search.onFocus()" id="search-input">
        <div class="search-results" id="search-results"></div>
      </div>`;
  },

  onInput(value) {
    const results = this.search(value);
    const container = document.getElementById('search-results');
    if (!container) return;

    if (results.length === 0 || !value) {
      container.classList.remove('open');
      return;
    }

    container.innerHTML = results.map(r => `
      <div class="search-result-item" onclick="App.navigate('${r.route}');Search.close();">
        <div style="font-size:var(--text-sm);font-weight:600;color:var(--color-text-primary);">
          ${this.highlight(r.title, value)}
        </div>
        <div style="font-size:var(--text-xs);color:var(--color-text-muted);margin-top:2px;">
          ${r.section} · ${this.highlight(r.desc.substring(0, 60), value)}...
        </div>
      </div>
    `).join('');
    container.classList.add('open');
  },

  onFocus() {
    const input = document.getElementById('search-input');
    if (input && input.value) this.onInput(input.value);
  },

  close() {
    const container = document.getElementById('search-results');
    const input = document.getElementById('search-input');
    if (container) container.classList.remove('open');
    if (input) input.value = '';
  }
};

// Close search when clicking outside
document.addEventListener('click', (e) => {
  const wrapper = document.getElementById('search-wrapper');
  if (wrapper && !wrapper.contains(e.target)) Search.close();
});
