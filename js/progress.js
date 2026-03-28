// ========================================
// 進度追蹤系統
// ========================================

const Progress = {
  MODULES: [
    { id: 'concept-api', label: '概念：API', type: 'page' },
    { id: 'concept-webhook', label: '概念：Webhook', type: 'page' },
    { id: 'concept-mcp', label: '概念：MCP', type: 'page' },
    { id: 'concept-browser', label: '概念：Browser', type: 'page' },
    { id: 'concept-skill', label: '概念：Skill', type: 'page' },
    { id: 'concept-markdown', label: '進階：Markdown 格式', type: 'page' },
    { id: 'concept-rss', label: '進階：RSS 與網頁爬蟲', type: 'page' },
    { id: 'concept-json', label: '進階：JSON 結構化', type: 'page' },
    { id: 'concept-ifelse', label: '進階：條件判斷 If-Else', type: 'page' },
    { id: 'concept-database', label: '進階：資料庫查詢', type: 'page' },
    { id: 'case-1', label: '案例一：自動晨報機器人', type: 'page' },
    { id: 'case-2', label: '案例二：多平台發文', type: 'page' },
    { id: 'case-3', label: '案例三：客戶私訊分流', type: 'page' },
    { id: 'case-4', label: '案例四：競品監測', type: 'page' },
    { id: 'case-5', label: '案例五：智能排程', type: 'page' },
    { id: 'dialog-skills', label: '與 AI 對話技巧', type: 'page' },
    { id: 'automation-map', label: '自動化地圖', type: 'page' },
    { id: 'workshop', label: '逆向工程工作坊', type: 'page' }
  ],

  markVisited(moduleId) {
    const visited = JSON.parse(localStorage.getItem('visited_pages') || '[]');
    if (!visited.includes(moduleId)) {
      visited.push(moduleId);
      localStorage.setItem('visited_pages', JSON.stringify(visited));
    }
    this.updateOverall();
  },

  isVisited(moduleId) {
    const visited = JSON.parse(localStorage.getItem('visited_pages') || '[]');
    return visited.includes(moduleId);
  },

  getOverallProgress() {
    const visited = JSON.parse(localStorage.getItem('visited_pages') || '[]');
    const total = this.MODULES.length;
    const done = this.MODULES.filter(m => visited.includes(m.id)).length;
    return { done, total, percent: total > 0 ? Math.round((done / total) * 100) : 0 };
  },

  updateOverall() {
    const { percent } = this.getOverallProgress();
    const bar = document.querySelector('.progress-bar-fill');
    const label = document.getElementById('progress-percent');
    if (bar) bar.style.width = percent + '%';
    if (label) label.textContent = percent + '%';

    // Update nav check marks
    const visited = JSON.parse(localStorage.getItem('visited_pages') || '[]');
    document.querySelectorAll('.nav-item').forEach(item => {
      const route = item.dataset.route;
      if (route && visited.includes(route)) {
        item.classList.add('completed');
      }
    });
  },

  renderProgressPage() {
    const { done, total, percent } = this.getOverallProgress();
    const visited = JSON.parse(localStorage.getItem('visited_pages') || '[]');

    const conceptModules = this.MODULES.filter(m => m.id.startsWith('concept'));
    const caseModules = this.MODULES.filter(m => m.id.startsWith('case'));
    const otherModules = this.MODULES.filter(m => !m.id.startsWith('concept') && !m.id.startsWith('case'));

    const renderGroup = (title, modules) => {
      const groupDone = modules.filter(m => visited.includes(m.id)).length;
      const groupPercent = modules.length > 0 ? Math.round((groupDone / modules.length) * 100) : 0;
      return `
        <div class="progress-card">
          <div class="progress-card-title">${title}</div>
          <div style="font-size:var(--text-sm);color:var(--color-text-muted);">${groupDone} / ${modules.length} 完成</div>
          <div class="progress-card-bar"><div class="progress-card-fill" style="width:${groupPercent}%"></div></div>
          <div style="margin-top:var(--space-4);">
            ${modules.map(m => `
              <div style="display:flex;align-items:center;gap:var(--space-2);padding:var(--space-2) 0;font-size:var(--text-sm);color:${visited.includes(m.id) ? 'var(--color-accent-success)' : 'var(--color-text-muted)'};">
                ${visited.includes(m.id) ? '✅' : '⬜'} ${m.label}
              </div>
            `).join('')}
          </div>
        </div>`;
    };

    return `
      <h1>📊 我的學習進度</h1>
      <p>追蹤你的學習旅程，查看已完成和待完成的模組。</p>

      <div style="text-align:center;margin:var(--space-8) 0;">
        <div style="font-size:var(--text-5xl);font-weight:800;" class="text-gradient">${percent}%</div>
        <p style="color:var(--color-text-muted);">整體完成度 (${done} / ${total} 模組)</p>
        <div class="progress-bar-wrap" style="max-width:400px;margin:var(--space-4) auto;height:10px;">
          <div class="progress-bar-fill" style="width:${percent}%"></div>
        </div>
      </div>

      <div class="progress-overview">
        ${renderGroup('📖 核心概念', conceptModules)}
        ${renderGroup('🔍 案例拆解', caseModules)}
        ${renderGroup('🛠️ 其他模組', otherModules)}
      </div>

      <div style="text-align:center;margin-top:var(--space-8);">
        <button class="btn btn-secondary" onclick="if(confirm('確定要清除所有學習進度嗎？此操作無法復原。')){localStorage.clear();location.reload();}">🗑️ 重置所有進度</button>
      </div>
    `;
  }
};
