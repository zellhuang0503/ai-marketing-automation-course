// ========================================
// 主應用程式 — SPA 路由 + 頁面渲染
// ========================================

const App = {
  currentRoute: '',

  init() {
    window.addEventListener('hashchange', () => this.route());
    this.route();
    Search.buildIndex();
    Progress.updateOverall();

    // Mobile sidebar
    document.getElementById('hamburger')?.addEventListener('click', () => this.toggleSidebar());
    document.getElementById('sidebar-overlay')?.addEventListener('click', () => this.closeSidebar());

    // Scroll reveal
    this.setupScrollReveal();
  },

  navigate(route) {
    window.location.hash = '#/' + route;
  },

  route() {
    const hash = window.location.hash.replace('#/', '') || 'home';
    this.currentRoute = hash;
    this.updateActiveNav(hash);
    this.closeSidebar();

    const content = document.getElementById('page-content');
    if (!content) return;

    let html = '';
    if (hash === 'home') html = this.renderHome();
    else if (hash === 'concept-markdown') html = this.renderMarkdown();
    else if (hash === 'concept-rss') html = this.renderRSS();
    else if (hash === 'concept-json') html = this.renderJSON();
    else if (hash === 'concept-ifelse') html = this.renderIfElse();
    else if (hash === 'concept-database') html = this.renderDatabase();
    else if (hash.startsWith('concept-')) html = this.renderConcept(hash.replace('concept-', ''));
    else if (hash.startsWith('case-')) html = this.renderCase(parseInt(hash.replace('case-', '')));
    else if (hash === 'automation-map') html = this.renderMap();
    else if (hash === 'dialog-skills') html = this.renderDialogSkills();
    else if (hash === 'workshop') html = this.renderWorkshop();
    else if (hash === 'progress') html = Progress.renderProgressPage();
    else if (hash === 'capabilities') html = this.renderCapabilities();
    else html = this.renderHome();

    content.innerHTML = `<div class="content-area">${html}</div>`;
    content.scrollTop = 0;
    window.scrollTo(0, 0);

    // Mark as visited
    if (hash !== 'home' && hash !== 'progress') {
      Progress.markVisited(hash);
    }

    this.setupScrollReveal();
  },

  updateActiveNav(route) {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.route === route);
    });
  },

  toggleSidebar() {
    document.querySelector('.sidebar')?.classList.toggle('open');
    document.getElementById('sidebar-overlay')?.classList.toggle('open');
  },

  closeSidebar() {
    document.querySelector('.sidebar')?.classList.remove('open');
    document.getElementById('sidebar-overlay')?.classList.remove('open');
  },

  setupScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  },

  // ── 首頁 ──
  renderHome() {
    const { percent, done, total } = Progress.getOverallProgress();
    return `
      <div class="hero">
        <div class="hero-badge animate-fadeInUp">🚀 AI 自動化流程建構</div>
        <h1 class="animate-fadeInUp stagger-1">
          <span class="text-gradient">案例拆解式</span><br>自動化教學法
        </h1>
        <p class="hero-subtitle animate-fadeInUp stagger-2">
          從「成品展示」出發，反向拆解技術原理，用 Antigravity IDE 實戰建構。<br>
          讓你從「看得懂自動化」到「自己建得出來」。
        </p>
        <div class="animate-fadeInUp stagger-3">
          <button class="btn btn-primary btn-lg" onclick="App.navigate('concept-api')">開始學習 →</button>
        </div>
        <div class="hero-stats animate-fadeInUp stagger-4">
          <div class="hero-stat">
            <div class="hero-stat-value">10</div>
            <div class="hero-stat-label">核心概念</div>
          </div>
          <div class="hero-stat">
            <div class="hero-stat-value">5</div>
            <div class="hero-stat-label">拆解案例</div>
          </div>
          <div class="hero-stat">
            <div class="hero-stat-value">50+</div>
            <div class="hero-stat-label">互動測驗</div>
          </div>
          <div class="hero-stat">
            <div class="hero-stat-value">${percent}%</div>
            <div class="hero-stat-label">你的進度</div>
          </div>
        </div>
      </div>

      <hr class="section-divider">

      ${Components.sectionTitle('🗺️ 學習路徑', '從基礎概念到實戰應用的三階段學習旅程')}
      <div class="learning-path reveal">
        <div class="path-node" onclick="App.navigate('concept-api')">
          <div class="path-node-icon">🧠</div>
          <div class="path-node-title">Phase 1<br>認知建構</div>
          <div class="path-node-hours">核心概念 × 5</div>
        </div>
        <div class="path-arrow">→</div>
        <div class="path-node" onclick="App.navigate('case-1')">
          <div class="path-node-icon">🔍</div>
          <div class="path-node-title">Phase 2<br>案例拆解</div>
          <div class="path-node-hours">拆解案例 × 5</div>
        </div>
        <div class="path-arrow">→</div>
        <div class="path-node" onclick="App.navigate('workshop')">
          <div class="path-node-icon">🛠️</div>
          <div class="path-node-title">Phase 3<br>自主實作</div>
          <div class="path-node-hours">逆向工程工作坊</div>
        </div>
      </div>

      <hr class="section-divider">

      ${Components.sectionTitle('📖 核心概念', '掌握自動化的 5 大基礎知識')}
      <div class="card-grid reveal">
        ${CONTENT.concepts.map(c => `
          <div class="entry-card" onclick="App.navigate('concept-${c.id}')">
            <span class="card-icon">${c.icon}</span>
            <div class="card-title">${c.shortTitle}</div>
            <div class="card-desc">${c.title.split('—')[1] || ''}</div>
          </div>
        `).join('')}
      </div>

      <hr class="section-divider">

      ${Components.sectionTitle('🔍 案例拆解', '5 個真實業界案例，反向拆解技術原理')}
      <div class="card-grid reveal">
        ${CONTENT.cases.map(c => `
          <div class="entry-card" onclick="App.navigate('case-${c.id}')">
            <span class="card-icon">${c.icon}</span>
            <div class="card-title">${c.title}</div>
            <div class="card-desc">${c.subtitle}</div>
          </div>
        `).join('')}
      </div>

      <hr class="section-divider">

      ${Components.sectionTitle('🛠️ 更多學習資源')}
      <div class="card-grid reveal">
        <div class="entry-card" onclick="App.navigate('automation-map')">
          <span class="card-icon">🗺️</span>
          <div class="card-title">自動化地圖</div>
          <div class="card-desc">觸發 → 處理 → 行動 全貌圖</div>
        </div>
        <div class="entry-card" onclick="App.navigate('dialog-skills')">
          <span class="card-icon">💬</span>
          <div class="card-title">與 AI 對話技巧</div>
          <div class="card-desc">學會有效地跟 AI 溝通</div>
        </div>
        <div class="entry-card" onclick="App.navigate('capabilities')">
          <span class="card-icon">🎯</span>
          <div class="card-title">程式能做什麼？</div>
          <div class="card-desc">認知校準：能做與不能做</div>
        </div>
        <div class="entry-card" onclick="App.navigate('workshop')">
          <span class="card-icon">📝</span>
          <div class="card-title">逆向工程工作坊</div>
          <div class="card-desc">自己動手拆解一個案例</div>
        </div>
        <div class="entry-card" onclick="App.navigate('concept-markdown')">
          <span class="card-icon">📝</span>
          <div class="card-title">Markdown 格式</div>
          <div class="card-desc">Skill 檔案的寫作語言</div>
        </div>
        <div class="entry-card" onclick="App.navigate('concept-rss')">
          <span class="card-icon">📡</span>
          <div class="card-title">RSS 與網頁爬蟲</div>
          <div class="card-desc">自動讀取最新資訊的兩種方式</div>
        </div>
        <div class="entry-card" onclick="App.navigate('concept-json')">
          <span class="card-icon">📦</span>
          <div class="card-title">JSON 結構化</div>
          <div class="card-desc">讓 AI 輸出可被程式讀取的格式</div>
        </div>
        <div class="entry-card" onclick="App.navigate('concept-ifelse')">
          <span class="card-icon">🔀</span>
          <div class="card-title">條件判斷 If-Else</div>
          <div class="card-desc">根據情況做不同事的程式邏輯</div>
        </div>
        <div class="entry-card" onclick="App.navigate('concept-database')">
          <span class="card-icon">🗄️</span>
          <div class="card-title">資料庫查詢</div>
          <div class="card-desc">讓 AI 有記憶、能查詢數據</div>
        </div>
      </div>
    `;
  },

  // ── 核心概念頁面 ──
  renderConcept(id) {
    const c = CONTENT.concepts.find(x => x.id === id);
    if (!c) return '<h1>找不到此概念</h1>';

    const conceptIds = CONTENT.concepts.map(x => x.id);
    const idx = conceptIds.indexOf(id);
    const prev = idx > 0 ? { route: `concept-${conceptIds[idx-1]}`, label: CONTENT.concepts[idx-1].shortTitle } : { route: 'home', label: '首頁' };
    const next = idx < conceptIds.length - 1 ? { route: `concept-${conceptIds[idx+1]}`, label: CONTENT.concepts[idx+1].shortTitle } : { route: 'case-1', label: '案例拆解' };

    let extraContent = '';
    if (c.structure) {
      extraContent += `
        ${Components.sectionTitle('📝 Skill 的三個基本要素')}
        <div class="card-grid reveal">
          ${c.structure.map((s, i) => `
            <div class="card" style="text-align:center;">
              <div style="font-size:2rem;margin-bottom:var(--space-2);">${['⏰', '📋', '📤'][i]}</div>
              <div style="font-size:var(--text-base);font-weight:700;color:var(--color-text-primary);">${s}</div>
            </div>
          `).join('')}
        </div>`;
    }
    if (c.canDo) {
      extraContent += `
        <div class="reveal" style="margin-top:var(--space-8);">
          ${Components.sectionTitle('✅ 能做的事 vs ❌ 不能做的事')}
          ${Components.comparison(
            '<ul>' + (c.cantDo || []).map(x => `<li style="margin-bottom:8px;">• ${x}</li>`).join('') + '</ul>',
            '<ul>' + c.canDo.map(x => `<li style="margin-bottom:8px;">• ${x}</li>`).join('') + '</ul>'
          )}
        </div>`;
    }

    if (c.manualInstall) {
      extraContent += `
        <div class="reveal" style="margin-top:var(--space-8);">
          ${Components.sectionTitle('🔧 ' + c.manualInstall.title)}
          ${Components.infoBox(c.manualInstall.tip, 'tip')}
          ${Components.accordion(c.manualInstall.steps.map(s => ({
            title: s.step,
            content: s.desc.includes('{')
              ? s.desc.split('\n').map((line, i) => i === 0 ? `<p>${line}</p>` : Components.codeBlock(line, 'json')).join('')
              : `<p>${s.desc}</p>`
          })))}
        </div>`;
    }

    if (c.glossary) {
      extraContent += `
        <div class="reveal" style="margin-top:var(--space-8);">
          ${Components.sectionTitle('📖 專業術語小辭典', '這些英文詞彙，用大白話解釋給你聽')}
          <div class="card-grid">
            ${c.glossary.map(g => `
              <div class="card">
                <div style="font-size:2rem;margin-bottom:var(--space-2);">${g.emoji}</div>
                <div style="font-size:var(--text-base);font-weight:700;color:var(--color-accent-primary);margin-bottom:var(--space-2);">${g.term}</div>
                <div style="font-size:var(--text-sm);color:var(--color-text-secondary);line-height:1.7;">${g.explain}</div>
              </div>
            `).join('')}
          </div>
        </div>`;
    }

    return `
      <div class="concept-hero animate-fadeInUp">
        <div class="concept-icon">${c.icon}</div>
        <div>
          <div class="tag tag-blue" style="margin-bottom:var(--space-2);">核心概念</div>
          <h1 style="margin-bottom:var(--space-2);">${c.title}</h1>
          <p style="margin:0;">${c.why}</p>
        </div>
      </div>

      <div class="analogy-block reveal">
        <div class="analogy-title">${c.analogy.title}</div>
        <blockquote>${c.analogy.text.replace(/\n/g, '<br>')}</blockquote>
        <div style="margin-top:var(--space-6);">
          ${Components.table(
            ['生活中', '對應到技術'],
            c.analogy.mapping.map(m => [m.life, m.tech])
          )}
        </div>
      </div>

      <div class="reveal">
        ${Components.sectionTitle('🛠️ 在 Antigravity IDE 中怎麼做？')}
        ${Components.infoBox(c.inAntigravity, 'tip')}
      </div>

      ${extraContent}

      <div class="reveal">
        ${Components.sectionTitle('🧪 測驗一下')}
        ${Quiz.render(c.quiz, c.id)}
      </div>

      ${Components.pageNav(prev, next)}
    `;
  },

  // ── 案例拆解頁面 ──
  renderCase(id) {
    const c = CONTENT.cases.find(x => x.id === id);
    if (!c) return '<h1>找不到此案例</h1>';

    const prev = id > 1 ? { route: `case-${id-1}`, label: CONTENT.cases[id-2].title } : { route: 'concept-skill', label: '核心概念' };
    const next = id < CONTENT.cases.length ? { route: `case-${id+1}`, label: CONTENT.cases[id].title } : { route: 'automation-map', label: '自動化地圖' };

    // Demo section
    let demoHtml = '';
    if (c.demo.type === 'chat') {
      demoHtml = Components.chatMockup(c.demo.messages, 'LINE Bot');
    } else if (c.demo.type === 'chat-multi') {
      demoHtml = `<div class="card-grid">${c.demo.scenarios.map(s => `
        <div class="card" style="text-align:center;">
          <div style="font-size:2rem;margin-bottom:var(--space-2);">${s.icon}</div>
          <div style="font-size:var(--text-sm);color:var(--color-text-muted);margin-bottom:var(--space-2);">客戶說：「${s.input}」</div>
          <div style="font-size:var(--text-sm);font-weight:600;color:var(--color-accent-success);">→ ${s.output}</div>
        </div>
      `).join('')}</div>`;
    } else if (c.demo.type === 'multi') {
      demoHtml = `<div class="card-grid">${c.demo.items.map(item => `
        <div class="card">
          <div class="tag tag-blue" style="margin-bottom:var(--space-3);">${item.platform}</div>
          <p style="font-size:var(--text-sm);color:var(--color-text-secondary);margin:0;line-height:1.7;">${item.text}</p>
        </div>
      `).join('')}</div>`;
    } else if (c.demo.type === 'report') {
      demoHtml = `<div class="card" style="white-space:pre-line;font-size:var(--text-sm);line-height:1.8;">${c.demo.content}</div>`;
    }

    return `
      <div class="case-header animate-fadeInUp">
        <div class="case-num">案例拆解 ${c.id}</div>
        <h1>${c.icon} ${c.title}</h1>
        <div class="case-desc">${c.subtitle}</div>
      </div>

      <div class="reveal">
        ${Components.sectionTitle('🎬 成品展示', '先看最終成果，再回頭拆解')}
        ${demoHtml}
      </div>

      <hr class="section-divider">

      <div class="reveal">
        ${Components.sectionTitle('🔍 引導式拆解', '一步步揭開自動化的秘密（點擊每個問題看答案）')}
        ${Components.stepReveal(c.questions)}
      </div>

      <hr class="section-divider">

      <div class="reveal">
        ${Components.sectionTitle('📊 知識模組對照表', '生活化類比 ↔ 技術概念')}
        ${Components.table(
          ['概念', '生活化類比', '技術名稱', '怎麼做？'],
          c.modules.map(m => [m.concept, m.analogy, m.tech, m.howTo || '—'])
        )}
      </div>

      <hr class="section-divider">

      <div class="reveal">
        ${Components.sectionTitle('🛠️ 最小實作版本', '30 分鐘內完成的簡化版')}
        ${Components.checklist(c.minimalBuild, `case-${c.id}`)}
      </div>

      ${Components.pageNav(prev, next)}
    `;
  },

  // ── 自動化地圖 ──
  renderMap() {
    const m = CONTENT.automationMap;
    return `
      <h1 class="animate-fadeInUp">🗺️ 自動化地圖</h1>
      <p class="animate-fadeInUp stagger-1">任何自動化流程都可以拆成三個階段：<strong class="text-accent">觸發 → 處理 → 行動</strong></p>

      <div class="automation-map">
        <div class="reveal">
          <h3 style="text-align:center;margin-bottom:var(--space-4);">⚡ 觸發（Trigger）</h3>
          <p style="text-align:center;color:var(--color-text-muted);font-size:var(--text-sm);">什麼事件啟動了這個流程？</p>
          <div class="map-row">
            ${m.triggers.map(t => `
              <div class="map-block">
                <div style="font-size:1.5rem;">${t.icon}</div>
                <div class="map-block-title">${t.name}</div>
                <div class="map-block-desc">${t.desc}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="map-connectors reveal">↓ ↓ ↓</div>

        <div class="reveal">
          <h3 style="text-align:center;margin-bottom:var(--space-4);">🧠 處理（Process）</h3>
          <p style="text-align:center;color:var(--color-text-muted);font-size:var(--text-sm);">收到資料後怎麼處理？</p>
          <div class="map-row">
            ${m.processors.map(p => `
              <div class="map-block">
                <div style="font-size:1.5rem;">${p.icon}</div>
                <div class="map-block-title">${p.name}</div>
                <div class="map-block-desc">${p.desc}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="map-connectors reveal">↓ ↓ ↓</div>

        <div class="reveal">
          <h3 style="text-align:center;margin-bottom:var(--space-4);">🎯 行動（Action）</h3>
          <p style="text-align:center;color:var(--color-text-muted);font-size:var(--text-sm);">處理完後做什麼？</p>
          <div class="map-row">
            ${m.actions.map(a => `
              <div class="map-block">
                <div style="font-size:1.5rem;">${a.icon}</div>
                <div class="map-block-title">${a.name}</div>
                <div class="map-block-desc">${a.desc}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <hr class="section-divider">

      <div class="reveal">
        ${Components.sectionTitle('🔗 連接器（Connector）', '串起觸發、處理、行動的技術')}
        <div class="card-grid">
          ${m.connectors.map(c => `
            <div class="card" onclick="App.navigate('concept-${c.name.toLowerCase()}')">
              <div style="font-size:var(--text-lg);font-weight:700;color:var(--color-accent-primary);margin-bottom:var(--space-2);">${c.name}</div>
              <div style="font-size:var(--text-sm);color:var(--color-text-secondary);">${c.desc}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <hr class="section-divider">

      <div class="reveal">
        ${Components.sectionTitle('➕ 補充概念')}
        <div class="card-grid">
          ${CONTENT.additionalConcepts.map(c => `
            <div class="card">
              <div style="font-size:1.5rem;margin-bottom:var(--space-2);">${c.icon}</div>
              <div style="font-size:var(--text-base);font-weight:700;color:var(--color-text-primary);margin-bottom:var(--space-2);">${c.shortTitle}</div>
              <div style="font-size:var(--text-sm);color:var(--color-text-secondary);">${c.desc}</div>
            </div>
          `).join('')}
        </div>
      </div>

      ${Components.pageNav({ route: 'case-5', label: '案例五' }, { route: 'dialog-skills', label: '對話技巧' })}
    `;
  },

  // ── 與 AI 對話技巧 ──
  renderDialogSkills() {
    const d = CONTENT.dialogSkills;
    return `
      <h1 class="animate-fadeInUp">💬 與 AI 對話技巧</h1>
      <p class="animate-fadeInUp stagger-1">跟 AI 說話就像跟新員工交代工作——說得越清楚，結果越好。</p>

      <div class="reveal">
        ${Components.sectionTitle('❌ vs ✅ 對話對比', '看看無效和有效對話的差別')}
        ${d.comparisons.map(c => Components.comparison(
          `<p style="margin:0;font-size:var(--text-base);">「${c.bad}」</p>`,
          `<p style="margin:0;font-size:var(--text-base);">「${c.good}」</p>`
        )).join('<div style="margin-top:var(--space-4);"></div>')}
      </div>

      <hr class="section-divider">

      <div class="reveal">
        ${Components.sectionTitle('📝 有效對話三步驟')}
        <div class="step-reveal-list">
          ${d.threeSteps.map(s => `
            <div class="card" style="display:flex;align-items:flex-start;gap:var(--space-4);">
              <div class="step-reveal-num">${s.step}</div>
              <div>
                <div style="font-weight:700;color:var(--color-text-primary);margin-bottom:var(--space-2);">${s.title}</div>
                <div style="font-size:var(--text-sm);color:var(--color-text-muted);">範例：「${s.example}」</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <hr class="section-divider">

      <div class="reveal">
        ${Components.sectionTitle('🤔 看不懂 Code 怎麼辦？', '這些問題模板幫你搞懂 AI 寫的程式')}
        <div class="card-grid">
          ${d.askRight.map(q => `
            <div class="card" style="cursor:pointer;" onclick="navigator.clipboard.writeText('${q}');Components.toast('已複製到剪貼簿！')">
              <div style="font-size:var(--text-sm);color:var(--color-text-primary);">「${q}」</div>
              <div style="font-size:var(--text-xs);color:var(--color-text-muted);margin-top:var(--space-2);">📋 點擊複製</div>
            </div>
          `).join('')}
        </div>
      </div>

      ${Components.pageNav({ route: 'automation-map', label: '自動化地圖' }, { route: 'workshop', label: '逆向工程工作坊' })}
    `;
  },

  // ── 逆向工程工作坊 ──
  renderWorkshop() {
    const savedData = JSON.parse(localStorage.getItem('workshop_data') || '{}');
    const fields = [
      { key: 'caseName', label: '🎯 我要拆解的自動化案例名稱', type: 'input', placeholder: '例如：自動客服回覆系統' },
      { key: 'finalResult', label: '🎬 最終成果是什麼？（使用者看到什麼？）', type: 'textarea', placeholder: '描述這個自動化最終呈現的結果...' },
      { key: 'trigger', label: '⚡ 觸發條件（什麼事件啟動它？）', type: 'textarea', placeholder: '例如：收到客戶 LINE 訊息...' },
      { key: 'processing', label: '🧠 AI 處理（收到資料後怎麼處理？）', type: 'textarea', placeholder: '例如：AI 分析訊息意圖，分類為「詢問」「客訴」「合作」...' },
      { key: 'action', label: '🎯 行動輸出（處理完後做什麼？）', type: 'textarea', placeholder: '例如：自動回覆對應內容 / 通知管理員...' },
      { key: 'data', label: '💾 需要什麼資料？從哪裡來？', type: 'textarea', placeholder: '例如：FAQ 資料庫（Supabase）、商品資料（Google Sheets）...' },
      { key: 'techStack', label: '🔗 用到哪些技術/概念？', type: 'textarea', placeholder: '例如：Webhook（接收訊息）、API（呼叫 AI）、MCP（讀取資料庫）...' },
      { key: 'minimalVersion', label: '🛠️ 最小實作版本（30 分鐘能做到的簡化版）', type: 'textarea', placeholder: '例如：先做一個接收訊息 → AI 分類 → 回覆分類結果的 Demo...' },
      { key: 'extensions', label: '🚀 可以怎麼延伸？', type: 'textarea', placeholder: '例如：加入歷史對話記憶、多語系支援...' }
    ];

    return `
      <h1 class="animate-fadeInUp">📝 逆向工程工作坊</h1>
      <p class="animate-fadeInUp stagger-1">選一個你感興趣的自動化案例，用這張工作單來練習拆解。所有內容會自動儲存。</p>

      ${Components.infoBox('💡 小提示：先看看前面的 5 個案例拆解是怎麼做的，再來這裡練習自己拆。', 'tip')}

      <div class="worksheet reveal">
        <div class="worksheet-title">🔧 自動化拆解工作單</div>
        ${fields.map(f => `
          <div class="worksheet-field">
            <label class="worksheet-label">${f.label}</label>
            ${f.type === 'input'
              ? `<input class="worksheet-input" type="text" placeholder="${f.placeholder}" value="${savedData[f.key] || ''}" oninput="App.saveWorkshop('${f.key}', this.value)">`
              : `<textarea class="worksheet-textarea" placeholder="${f.placeholder}" oninput="App.saveWorkshop('${f.key}', this.value)">${savedData[f.key] || ''}</textarea>`
            }
          </div>
        `).join('')}
        <div style="display:flex;gap:var(--space-3);justify-content:center;margin-top:var(--space-6);">
          <button class="btn btn-primary" onclick="Components.toast('工作單已自動儲存！');Progress.markVisited('workshop');">✅ 完成並儲存</button>
          <button class="btn btn-secondary" onclick="if(confirm('確定要清空工作單嗎？')){localStorage.removeItem('workshop_data');location.reload();}">🗑️ 清空重填</button>
        </div>
      </div>

      ${Components.pageNav({ route: 'dialog-skills', label: '對話技巧' }, { route: 'progress', label: '學習進度' })}
    `;
  },

  saveWorkshop(key, value) {
    const data = JSON.parse(localStorage.getItem('workshop_data') || '{}');
    data[key] = value;
    localStorage.setItem('workshop_data', JSON.stringify(data));
  },

  // ── Markdown 格式 ──
  renderMarkdown() {
    const md = CONTENT.markdown;
    return `
      <div class="concept-hero animate-fadeInUp">
        <div class="concept-icon">📝</div>
        <div>
          <div class="tag tag-blue" style="margin-bottom:var(--space-2);">核心格式</div>
          <h1 style="margin-bottom:var(--space-2);">Markdown 格式</h1>
          <p style="margin:0;">${md.intro}</p>
        </div>
      </div>

      <div class="analogy-block reveal">
        <div class="analogy-title">💡 一句話理解 Markdown</div>
        <blockquote>${md.analogy}</blockquote>
      </div>

      <div class="reveal">
        ${Components.sectionTitle('✍️ 語法對照表', '左邊輸入符號，右邊看到效果')}
        <div style="display:grid;gap:var(--space-4);">
          ${md.examples.map(ex => `
            <div class="card">
              <div style="font-size:var(--text-sm);font-weight:700;color:var(--color-accent-primary);margin-bottom:var(--space-3);">📌 ${ex.label}</div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);align-items:start;">
                <div>
                  <div style="font-size:var(--text-xs);color:var(--color-text-muted);margin-bottom:var(--space-1);">輸入（原始碼）</div>
                  <pre style="background:var(--color-surface-2);padding:var(--space-3);border-radius:8px;font-size:var(--text-xs);white-space:pre-wrap;margin:0;font-family:'JetBrains Mono',monospace;">${ex.syntax.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</pre>
                </div>
                <div>
                  <div style="font-size:var(--text-xs);color:var(--color-text-muted);margin-bottom:var(--space-1);">顯示效果</div>
                  <div style="background:var(--color-surface-2);padding:var(--space-3);border-radius:8px;font-size:var(--text-sm);min-height:40px;">${ex.result}</div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <hr class="section-divider">

      <div class="reveal">
        ${Components.sectionTitle('📄 實際 Skill 範例', '這是一個用 Markdown 寫的 Skill 檔案，完整示範')}
        ${Components.codeBlock(md.skillExample, 'markdown')}
        ${Components.infoBox('在 Antigravity IDE 中，你就是用這種格式來告訴 AI 要做什麼。不需要寫程式碼，只要用清楚的 Markdown 描述工作流程。', 'tip')}
      </div>

      <div class="reveal">
        ${Components.sectionTitle('🧪 測驗一下')}
        ${Quiz.render(md.quiz, 'markdown')}
      </div>

      ${Components.pageNav({ route: 'concept-skill', label: 'Skill' }, { route: 'concept-rss', label: 'RSS 與爬蟲' })}
    `;
  },

  // ── RSS 與網頁爬蟲 ──
  renderRSS() {
    const rss = CONTENT.rss;
    const rs = rss.rssSection;
    const ss = rss.scrapingSection;
    return `
      <div class="concept-hero animate-fadeInUp">
        <div class="concept-icon">📡</div>
        <div>
          <div class="tag tag-blue" style="margin-bottom:var(--space-2);">資料來源</div>
          <h1 style="margin-bottom:var(--space-2);">RSS 訂閱 與 網頁爬蟲</h1>
          <p style="margin:0;">${rss.intro}</p>
        </div>
      </div>

      <div class="analogy-block reveal">
        <div class="analogy-title">📰 ${rs.title}</div>
        <blockquote>${rs.analogy.replace(/\n/g,'<br>')}</blockquote>
        <p style="color:var(--color-text-secondary);font-size:var(--text-sm);margin-top:var(--space-4);">${rs.whatIs}</p>
      </div>

      <div class="reveal">
        ${Components.infoBox('<strong>為什麼現在年輕人不知道 RSS？</strong><br>' + rs.whyNotKnown, 'info')}
      </div>

      <div class="reveal">
        ${Components.sectionTitle('🔍 如何找到網站的 RSS Feed？')}
        ${Components.checklist(rs.howToFind, 'rss-find')}
      </div>

      <div class="reveal">
        ${Components.sectionTitle('📄 RSS Feed 長什麼樣？', '這是實際的 XML 格式範例')}
        ${Components.codeBlock(rs.exampleFeed, 'xml')}
      </div>

      <hr class="section-divider">

      <div class="analogy-block reveal">
        <div class="analogy-title">🕷️ ${ss.title}</div>
        <blockquote>${ss.analogy.replace(/\n/g,'<br>')}</blockquote>
      </div>

      <div class="reveal">
        ${Components.sectionTitle('🔧 網頁爬蟲的五個步驟')}
        <div class="step-reveal-list">
          ${ss.steps.map((s,i) => `
            <div class="step-reveal-item" id="scrape-step-${i}">
              <div class="step-reveal-question" onclick="Components.toggleStep('scrape-step-${i}')">
                <span class="step-reveal-num">${i+1}</span>
                <span class="step-reveal-text">${s.step}</span>
                <span class="step-reveal-toggle">▼</span>
              </div>
              <div class="step-reveal-answer">
                <div class="step-reveal-answer-content">
                  <p style="color:var(--color-text-secondary);font-size:var(--text-sm);margin-bottom:var(--space-3);">${s.desc}</p>
                  ${Components.codeBlock(s.code, 'javascript')}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="reveal">
        ${Components.sectionTitle('⚖️ RSS vs 爬蟲 比較表')}
        ${Components.table(
          ['比較項目', 'RSS 訂閱', '網頁爬蟲'],
          ss.vsRss.map(r => [r.aspect, r.rss, r.scraping])
        )}
      </div>

      <div class="reveal">
        ${Components.sectionTitle('🧪 測驗一下')}
        ${Quiz.render(rss.quiz, 'rss')}
      </div>

      ${Components.pageNav({ route: 'concept-markdown', label: 'Markdown 格式' }, { route: 'concept-json', label: 'JSON 結構化' })}
    `;
  },

  // ── JSON 結構化格式 ──
  renderJSON() {
    const json = CONTENT.json;
    return `
      <div class="concept-hero animate-fadeInUp">
        <div class="concept-icon">📦</div>
        <div>
          <div class="tag tag-blue" style="margin-bottom:var(--space-2);">資料格式</div>
          <h1 style="margin-bottom:var(--space-2);">JSON 結構化格式</h1>
          <p style="margin:0;">${json.intro}</p>
        </div>
      </div>

      <div class="analogy-block reveal">
        <div class="analogy-title">📋 生活比喻：電腦版的固定格式表格</div>
        <blockquote>${json.analogy.replace(/\n/g,'<br>')}</blockquote>
      </div>

      <div class="reveal">
        ${Components.sectionTitle('📐 JSON 基本語法規則')}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-6);align-items:start;">
          <div>
            ${Components.checklist(json.basicSyntax.rules, 'json-rules')}
          </div>
          <div>
            ${Components.codeBlock(json.basicSyntax.example, 'json')}
          </div>
        </div>
      </div>

      <hr class="section-divider">

      <div class="reveal">
        ${Components.sectionTitle('🎯 行銷自動化中的 JSON 實例', '這些是你在課程專案中會真正用到的格式')}
        ${Components.accordion(json.marketingExamples.map(ex => ({
          title: '📌 ' + ex.scenario,
          content: `<p style="color:var(--color-text-secondary);font-size:var(--text-sm);margin-bottom:var(--space-3);">${ex.desc}</p>${Components.codeBlock(ex.code, 'json')}`
        })))}
      </div>

      <div class="reveal">
        ${Components.sectionTitle('🧪 測驗一下')}
        ${Quiz.render(json.quiz, 'json')}
      </div>

      ${Components.pageNav({ route: 'concept-rss', label: 'RSS 與爬蟲' }, { route: 'concept-ifelse', label: '條件判斷' })}
    `;
  },

  // ── 條件判斷 / If-Else ──
  renderIfElse() {
    const ie = CONTENT.ifelse;
    return `
      <div class="concept-hero animate-fadeInUp">
        <div class="concept-icon">🔀</div>
        <div>
          <div class="tag tag-blue" style="margin-bottom:var(--space-2);">程式邏輯</div>
          <h1 style="margin-bottom:var(--space-2);">條件判斷 / If-Else 邏輯</h1>
          <p style="margin:0;">${ie.intro}</p>
        </div>
      </div>

      <div class="analogy-block reveal">
        <div class="analogy-title">📞 生活比喻：客服電話語音選單</div>
        <blockquote>${ie.analogy.replace(/\n/g,'<br>')}</blockquote>
      </div>

      <div class="reveal">
        ${Components.sectionTitle('🗺️ 視覺化：條件判斷流程圖')}
        <div class="card" style="text-align:center;">
          <div style="font-size:var(--text-base);font-weight:700;color:var(--color-accent-primary);margin-bottom:var(--space-6);padding:var(--space-3);background:var(--color-surface-2);border-radius:8px;display:inline-block;">❓ ${ie.flowchart.question}</div>
          <div class="card-grid" style="margin-top:var(--space-4);">
            ${ie.flowchart.branches.map(b => `
              <div class="card" style="border-left:3px solid var(--color-accent-primary);">
                <div style="font-size:1.5rem;margin-bottom:var(--space-2);">${b.icon}</div>
                <div style="font-size:var(--text-xs);color:var(--color-text-muted);margin-bottom:var(--space-2);">${b.condition}</div>
                <div style="font-size:var(--text-sm);font-weight:600;color:var(--color-accent-success);">→ ${b.action}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <hr class="section-divider">

      <div class="reveal">
        ${Components.sectionTitle('💡 實際案例：自然語言 ↔ 程式碼對照')}
        ${ie.realExamples.map(ex => `
          <div style="margin-bottom:var(--space-6);">
            <div style="font-size:var(--text-base);font-weight:700;color:var(--color-text-primary);margin-bottom:var(--space-4);">📌 ${ex.scenario}</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);">
              <div>
                <div style="font-size:var(--text-xs);color:var(--color-text-muted);margin-bottom:var(--space-2);">在 Skill 中用自然語言描述</div>
                <pre style="background:var(--color-surface-2);padding:var(--space-4);border-radius:8px;font-size:var(--text-xs);white-space:pre-wrap;font-family:'JetBrains Mono',monospace;color:var(--color-text-secondary);">${ex.code.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</pre>
              </div>
              <div>
                <div style="font-size:var(--text-xs);color:var(--color-text-muted);margin-bottom:var(--space-2);">底層程式邏輯（AI 幫你寫）</div>
                ${Components.codeBlock(ex.pseudocode, 'javascript')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="reveal">
        ${Components.sectionTitle('🧪 測驗一下')}
        ${Quiz.render(ie.quiz, 'ifelse')}
      </div>

      ${Components.pageNav({ route: 'concept-json', label: 'JSON 結構化' }, { route: 'concept-database', label: '資料庫查詢' })}
    `;
  },

  // ── 資料庫查詢 ──
  renderDatabase() {
    const db = CONTENT.database;
    return `
      <div class="concept-hero animate-fadeInUp">
        <div class="concept-icon">🗄️</div>
        <div>
          <div class="tag tag-blue" style="margin-bottom:var(--space-2);">資料管理</div>
          <h1 style="margin-bottom:var(--space-2);">資料庫查詢 / 外部系統串接</h1>
          <p style="margin:0;">${db.intro}</p>
        </div>
      </div>

      <div class="analogy-block reveal">
        <div class="analogy-title">🏭 生活比喻：超級有組織的倉庫</div>
        <blockquote>${db.analogy.replace(/\n/g,'<br>')}</blockquote>
      </div>

      <div class="reveal">
        ${Components.infoBox('<strong>課程使用的資料庫：Supabase</strong><br>' + db.supabaseIntro, 'tip')}
      </div>

      <div class="reveal">
        ${Components.sectionTitle('📊 資料表長什麼樣？', '以「訂單表」為例')}
        <div style="font-size:var(--text-sm);color:var(--color-text-muted);margin-bottom:var(--space-3);">表格名稱：<strong>${db.tableExample.name}</strong></div>
        ${Components.table(db.tableExample.headers, db.tableExample.rows)}
      </div>

      <hr class="section-divider">

      <div class="reveal">
        ${Components.sectionTitle('🔍 資料庫查詢實例', '自然語言 → 查詢指令 → 結果')}
        ${Components.accordion(db.queryExamples.map(ex => ({
          title: '📌 ' + ex.scenario,
          content: `
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);align-items:start;">
              <div>
                <div style="font-size:var(--text-xs);color:var(--color-text-muted);margin-bottom:var(--space-2);">你說的話</div>
                <div class="card" style="font-size:var(--text-sm);">${ex.naturalLanguage}</div>
              </div>
              <div>
                <div style="font-size:var(--text-xs);color:var(--color-text-muted);margin-bottom:var(--space-2);">AI 自動產生的 SQL 查詢</div>
                ${Components.codeBlock(ex.sql, 'sql')}
              </div>
            </div>
            <div style="margin-top:var(--space-3);">
              ${Components.infoBox('✅ 結果：' + ex.result, 'success')}
            </div>`
        })))}
      </div>

      <hr class="section-divider">

      <div class="reveal">
        ${Components.sectionTitle('🔑 在 Antigravity 中如何使用 MCP 連接資料庫')}
        <div class="card-grid">
          ${db.mcpFlow.map(f => `
            <div class="card" style="text-align:center;">
              <div style="font-size:2rem;margin-bottom:var(--space-2);">${f.icon}</div>
              <div style="font-size:var(--text-sm);font-weight:700;color:var(--color-accent-primary);margin-bottom:var(--space-2);">${f.step}</div>
              <div style="font-size:var(--text-sm);color:var(--color-text-secondary);">${f.desc}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="reveal">
        ${Components.sectionTitle('🧪 測驗一下')}
        ${Quiz.render(db.quiz, 'database')}
      </div>

      ${Components.pageNav({ route: 'concept-ifelse', label: '條件判斷' }, { route: 'automation-map', label: '自動化地圖' })}
    `;
  },

  // ── 程式能做什麼 ──
  renderCapabilities() {
    const cap = CONTENT.capabilities;
    return `
      <h1 class="animate-fadeInUp">🎯 程式能做什麼？</h1>
      <p class="animate-fadeInUp stagger-1">在開始之前，讓我們先校準認知：自動化能做什麼、不能做什麼。</p>

      <div class="reveal">
        ${Components.sectionTitle('✅ 程式能做的事')}
        <div class="card-grid">
          ${cap.canDo.map(item => `
            <div class="card">
              <div style="font-size:var(--text-base);font-weight:700;color:var(--color-accent-success);margin-bottom:var(--space-2);">✅ ${item.category}</div>
              <div style="font-size:var(--text-sm);color:var(--color-text-secondary);">${item.example}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="reveal" style="margin-top:var(--space-8);">
        ${Components.sectionTitle('⚠️ 需要人類判斷的事')}
        <div class="card-grid">
          ${cap.cantDo.map(item => `
            <div class="card">
              <div style="font-size:var(--text-base);font-weight:700;color:var(--color-accent-warning);margin-bottom:var(--space-2);">⚠️ ${item.category}</div>
              <div style="font-size:var(--text-sm);color:var(--color-text-secondary);">${item.note}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="reveal" style="margin-top:var(--space-8);">
        <div class="analogy-block">
          <div class="analogy-title">💡 正確心態</div>
          <blockquote>${cap.mindset}</blockquote>
        </div>
      </div>

      ${Components.pageNav({ route: 'home', label: '首頁' }, { route: 'concept-api', label: '開始學習' })}
    `;
  }
};

// Boot
document.addEventListener('DOMContentLoaded', () => App.init());
