// ========================================
// 互動元件邏輯
// ========================================

const Components = {

  // ── 翻轉卡片 ──
  flipCard(front, back) {
    return `
      <div class="flip-card" onclick="Components.toggleFlip(this)">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            ${front}
            <span class="flip-hint">👆 點擊翻轉查看技術解釋</span>
          </div>
          <div class="flip-card-back">
            ${back}
          </div>
        </div>
      </div>`;
  },

  toggleFlip(el) {
    el.classList.toggle('flipped');
  },

  // ── 手風琴 ──
  accordion(items) {
    return `<div class="accordion">
      ${items.map((item, i) => `
        <div class="accordion-item" id="acc-${i}">
          <button class="accordion-header" onclick="Components.toggleAccordion('acc-${i}')">
            <span>${item.title}</span>
            <span class="accordion-arrow">▼</span>
          </button>
          <div class="accordion-body">
            <div class="accordion-content">${item.content}</div>
          </div>
        </div>
      `).join('')}
    </div>`;
  },

  toggleAccordion(id) {
    const item = document.getElementById(id);
    if (item) item.classList.toggle('open');
  },

  // ── Step 揭露 ──
  stepReveal(steps) {
    return `<div class="step-reveal-list">
      ${steps.map((s, i) => `
        <div class="step-reveal-item" id="step-${i}">
          <div class="step-reveal-question" onclick="Components.toggleStep('step-${i}')">
            <span class="step-reveal-num">${i + 1}</span>
            <span class="step-reveal-text">${s.q}</span>
            <span class="step-reveal-toggle">▼</span>
          </div>
          <div class="step-reveal-answer">
            <div class="step-reveal-answer-content">
              <span class="step-reveal-tag">${s.tag}</span>
              <p style="font-size:var(--text-lg);font-weight:700;color:var(--color-accent-primary);margin-bottom:var(--space-2);">${s.answer}</p>
              <p style="color:var(--color-text-secondary);font-size:var(--text-sm);margin:0;">${s.detail}</p>
            </div>
          </div>
        </div>
      `).join('')}
    </div>`;
  },

  toggleStep(id) {
    const item = document.getElementById(id);
    if (item) item.classList.toggle('revealed');
  },

  // ── Code Block ──
  codeBlock(code, lang = '') {
    const escaped = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `
      <div class="code-block-wrapper">
        <div class="code-block-header">
          <span class="code-block-lang">${lang}</span>
          <button class="code-copy-btn" onclick="Components.copyCode(this)">📋 複製</button>
        </div>
        <pre class="code-block"><code>${escaped}</code></pre>
      </div>`;
  },

  copyCode(btn) {
    const code = btn.closest('.code-block-wrapper').querySelector('code').textContent;
    navigator.clipboard.writeText(code).then(() => {
      btn.textContent = '✅ 已複製！';
      setTimeout(() => btn.textContent = '📋 複製', 2000);
    });
  },

  // ── Table ──
  table(headers, rows) {
    return `
      <div class="table-wrapper">
        <table class="styled-table">
          <thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
          <tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody>
        </table>
      </div>`;
  },

  // ── Info Box ──
  infoBox(text, type = 'tip') {
    const icons = { tip: '💡', warning: '⚠️', success: '✅', info: 'ℹ️' };
    return `<div class="info-box ${type}">${icons[type] || ''} ${text}</div>`;
  },

  // ── Chat Mockup ──
  chatMockup(messages, title = 'LINE') {
    return `
      <div class="mockup-phone">
        <div class="mockup-phone-header">${title}</div>
        <div class="mockup-chat">
          ${messages.map((m, i) => `
            <div class="chat-bubble ${m.type}" style="animation-delay:${i * 0.3}s">${m.text.replace(/\n/g, '<br>')}</div>
          `).join('')}
        </div>
      </div>`;
  },

  // ── Checklist ──
  checklist(items, storageKey) {
    const saved = JSON.parse(localStorage.getItem(`checklist_${storageKey}`) || '[]');
    return `<div class="checklist" data-key="${storageKey}">
      ${items.map((item, i) => `
        <div class="checklist-item ${saved.includes(i) ? 'checked' : ''}" onclick="Components.toggleCheck(this, ${i}, '${storageKey}')">
          <span class="checklist-box">${saved.includes(i) ? '✓' : ''}</span>
          <span class="checklist-text">${item}</span>
        </div>
      `).join('')}
    </div>`;
  },

  toggleCheck(el, idx, key) {
    el.classList.toggle('checked');
    const box = el.querySelector('.checklist-box');
    const isChecked = el.classList.contains('checked');
    box.textContent = isChecked ? '✓' : '';

    let saved = JSON.parse(localStorage.getItem(`checklist_${key}`) || '[]');
    if (isChecked && !saved.includes(idx)) saved.push(idx);
    else saved = saved.filter(i => i !== idx);
    localStorage.setItem(`checklist_${key}`, JSON.stringify(saved));

    Progress.updateOverall();
  },

  // ── Page Navigation ──
  pageNav(prev, next) {
    return `<div class="page-nav">
      ${prev ? `<button class="page-nav-btn" onclick="App.navigate('${prev.route}')">← ${prev.label}</button>` : '<div></div>'}
      ${next ? `<button class="page-nav-btn" onclick="App.navigate('${next.route}')"> ${next.label} →</button>` : '<div></div>'}
    </div>`;
  },

  // ── Toast ──
  toast(message, type = 'success') {
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.remove(), 300); }, 3000);
  },

  // ── Comparison Grid ──
  comparison(bad, good) {
    return `<div class="comparison-grid">
      <div class="comparison-col">
        <div class="comparison-header bad">❌ 無效對話</div>
        <div class="comparison-body">${bad}</div>
      </div>
      <div class="comparison-col">
        <div class="comparison-header good">✅ 有效對話</div>
        <div class="comparison-body">${good}</div>
      </div>
    </div>`;
  },

  // ── Section Title ──
  sectionTitle(title, subtitle) {
    return `<div class="section-title">
      <h2>${title}</h2>
      ${subtitle ? `<p>${subtitle}</p>` : ''}
    </div>`;
  }
};
