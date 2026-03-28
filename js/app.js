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

    // Init MarkdownLive preview if present on this page
    if (hash === 'concept-markdown' && typeof MarkdownLive !== 'undefined') {
      MarkdownLive.init('markdown-live');
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

      ${this._renderConceptExercise(id)}

      ${Components.pageNav(prev, next)}
    `;
  },

  // ── 概念頁互動練習 ──
  _renderConceptExercise(id) {
    if (id === 'webhook') {
      return `
        <hr class="section-divider">
        <div class="reveal">
          ${Components.sectionTitle('🎮 動手練習：排列 Webhook 流程順序', '把以下 6 個步驟拖拉成正確的執行順序')}
          ${DragSort.render(
            'webhook-flow',
            '當客戶在 LINE 傳訊息給你的 Bot，背後發生了什麼？',
            '在桌機可以直接拖拉，手機可以用 ↑↓ 按鈕調整順序',
            [
              { id: 'step1', label: '👤 客戶在 LINE 傳訊息「我想預約美容服務」' },
              { id: 'step2', label: '📡 LINE 伺服器接收到這則訊息' },
              { id: 'step3', label: '🔗 LINE 把訊息資料（含文字、用戶ID）POST 到你的 Webhook URL' },
              { id: 'step4', label: '🖥️ 你的程式伺服器收到 LINE 傳來的資料' },
              { id: 'step5', label: '🤖 程式呼叫 AI 分析訊息意圖，判斷客戶要預約' },
              { id: 'step6', label: '📤 程式呼叫 LINE Messaging API，把回覆傳送給客戶' }
            ],
            ['step1', 'step2', 'step3', 'step4', 'step5', 'step6']
          )}
        </div>`;
    }

    if (id === 'api') {
      return `
        <hr class="section-divider">
        <div class="reveal">
          ${Components.sectionTitle('✏️ 填空練習：用你的話解釋 API', '根據餐廳比喻，填入正確的詞彙')}
          ${FillBlank.render(
            'api-concept',
            '完成這段對 API 的解釋：',
            [
              { type: 'text', text: 'API 就像餐廳的' },
              { type: 'blank', answers: ['服務生', '服務員', '侍者'], hint: '角色？', width: 5 },
              { type: 'text', text: '，負責在' },
              { type: 'blank', answers: ['你的程式', '程式', '客戶端', '你'], hint: '誰發出請求？', width: 6 },
              { type: 'text', text: '和' },
              { type: 'blank', answers: ['另一個服務', '外部服務', '廚房', '第三方服務'], hint: '另一端是？', width: 7 },
              { type: 'text', text: '之間傳遞訊息。你不需要知道對方的系統怎麼運作，只要按照' },
              { type: 'blank', answers: ['API 文件', 'API文件', '說明文件', '文件'], hint: '查什麼？', width: 6 },
              { type: 'text', text: '的格式呼叫，就能拿到你要的資料。' }
            ]
          )}
        </div>`;
    }

    if (id === 'mcp') {
      return `
        <hr class="section-divider">
        <div class="reveal">
          ${Components.sectionTitle('🎮 動手練習：MCP Server 配對連連看', '把左邊的業務需求，配對到對應的 MCP Server')}
          ${MatchPair.render(
            'mcp-match',
            '每個 MCP Server 是通往一個外部服務的「門」，配對正確才算裝對鑰匙',
            '先點左邊的需求，再點右邊對應的 MCP Server，連成一對',
            [
              { id: 'email',  icon: '📧', label: '讀取並整理客戶的 Email 郵件' },
              { id: 'sheets', icon: '📊', label: '讀寫 Google 試算表的資料' },
              { id: 'notion', icon: '📝', label: '在 Notion 上建立和更新頁面' },
              { id: 'db',     icon: '🗄️', label: '存取 Supabase 資料庫' }
            ],
            [
              { id: 'gmail',      icon: '✉️',  label: 'Gmail MCP' },
              { id: 'gsheets',    icon: '📈',  label: 'Google Sheets MCP' },
              { id: 'notion-mcp', icon: '🗒️',  label: 'Notion MCP' },
              { id: 'supabase',   icon: '💾',  label: 'Supabase MCP' }
            ],
            { email: 'gmail', sheets: 'gsheets', notion: 'notion-mcp', db: 'supabase' }
          )}
        </div>`;
    }

    if (id === 'browser') {
      return `
        <hr class="section-divider">
        <div class="reveal">
          ${Components.sectionTitle('🎮 動手練習：瀏覽器自動化流程排序', '把監測競品粉專的 5 個步驟排成正確順序')}
          ${DragSort.render(
            'browser-steps',
            '監測競品 Facebook 粉專的最新貼文，程式怎麼做到？',
            '拖拉排列（桌機）或用 ↑↓ 調整（手機），排好後按「確認順序」',
            [
              { id: 's1', label: '🚀 啟動虛擬瀏覽器（Headless Browser）' },
              { id: 's2', label: '🔗 程式導航到競品粉專的 Facebook 網址' },
              { id: 's3', label: '⏳ 等待頁面完全載入（含 JavaScript 動態內容）' },
              { id: 's4', label: '📖 讀取頁面上的貼文標題和文字內容' },
              { id: 's5', label: '🤖 AI 分析貼文並儲存到資料庫' }
            ],
            ['s1', 's2', 's3', 's4', 's5']
          )}
        </div>`;
    }

    if (id === 'skill') {
      return `
        <hr class="section-divider">
        <div class="reveal">
          ${Components.sectionTitle('✏️ 填空練習：Skill 的核心概念', '填入正確的詞彙，完成對 Skill 的完整描述')}
          ${FillBlank.render(
            'skill-concept',
            '完成這段說明：',
            [
              { type: 'text', text: '在 Antigravity IDE 中，Skill 就是一份給 AI 的「' },
              { type: 'blank', answers: ['工作說明書', '工作手冊', '說明書', '工作指南'], hint: '什麼文件？', width: 6 },
              { type: 'text', text: '」。它用' },
              { type: 'blank', answers: ['Markdown', 'markdown'], hint: '什麼語法？', width: 5 },
              { type: 'text', text: '語法撰寫，主要描述三件事：「' },
              { type: 'blank', answers: ['觸發條件', '觸發', '何時執行', '什麼時候執行'], hint: '何時做？', width: 6 },
              { type: 'text', text: '」（何時執行）、「' },
              { type: 'blank', answers: ['執行步驟', '步驟', '做什麼', '要做什麼'], hint: '做什麼？', width: 6 },
              { type: 'text', text: '」（要做哪些動作），以及「' },
              { type: 'blank', answers: ['輸出結果', '輸出', '結果', '回傳結果'], hint: '然後呢？', width: 6 },
              { type: 'text', text: '」（完成後如何通知）。你不需要寫程式碼，只用' },
              { type: 'blank', answers: ['自然語言', '文字', '白話文', '中文'], hint: '用什麼溝通？', width: 5 },
              { type: 'text', text: '描述，AI 就會按照這份說明書行動。' }
            ]
          )}
        </div>`;
    }

    return '';
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

      <hr class="section-divider">

      <div class="reveal">
        ${Components.sectionTitle('🎮 動手練習：組合一個清楚的提示詞', '三步驟建立一個完整的 AI 指令，看看清楚的提示詞長什麼樣子')}
        ${FlowBuilder.render('dialog-prompt', {
          title: '練習：給 AI 寫一個清楚的貼文生成指令',
          steps: [
            {
              tag: '平台 + 目標',
              q: '這篇貼文要發在哪裡？目標受眾是誰？',
              options: [
                { icon: '📘', label: 'Facebook，目標：30-45 歲家長', value: 'fb-parent', desc: '強調家庭、生活感' },
                { icon: '📸', label: 'Instagram，目標：18-28 歲年輕人', value: 'ig-young', desc: '視覺優先、簡短有力' },
                { icon: '💼', label: 'LinkedIn，目標：B2B 決策者', value: 'li-biz', desc: '專業、數據、商業價值' },
                { icon: '💬', label: 'LINE，目標：現有客戶', value: 'line-cust', desc: '親切、促銷、行動呼籲' }
              ]
            },
            {
              tag: '內容 + 風格',
              q: '這篇貼文要說什麼？風格怎麼調？',
              options: [
                { icon: '🎁', label: '推廣優惠活動，風格輕鬆帶 emoji', value: 'promo-fun', desc: '活動期限感 + 行動呼籲' },
                { icon: '📖', label: '分享知識教學，風格專業清楚', value: 'edu-pro', desc: '建立品牌信任感' },
                { icon: '😄', label: '品牌故事，風格溫暖有故事性', value: 'story-warm', desc: '拉近與受眾的距離' },
                { icon: '📊', label: '產品比較，風格理性列點', value: 'compare-logic', desc: '幫助受眾做決策' }
              ]
            },
            {
              tag: '長度 + 規格',
              q: '字數和格式有什麼要求？',
              options: [
                { icon: '✂️', label: '100 字以內，1 個行動呼籲', value: 'short-cta', desc: '快速吸引注意' },
                { icon: '📝', label: '150-200 字，3 個重點條列', value: 'med-list', desc: '資訊完整但不冗長' },
                { icon: '📄', label: '300 字，有標題有段落', value: 'long-struct', desc: '深度內容建立權威' },
                { icon: '🏷️', label: '50 字 + 5 個 hashtag', value: 'micro-hash', desc: '適合 IG 短貼配圖' }
              ]
            }
          ],
          results: {
            'fb-parent+promo-fun+short-cta': { title: '✅ Facebook 家長族群促銷貼文', desc: '你組合出了一個清楚的 AI 指令！', feedback: '完整指令範例：「幫我寫一篇 Facebook 貼文，目標對象是 30-45 歲家長，推廣週年慶優惠，風格輕鬆帶 emoji，字數 100 字以內，結尾加一個行動呼籲（點擊連結）。」\n\n💡 注意：你給了 AI 平台、受眾、主題、風格、字數、結尾格式——6 個條件，AI 才能給你真正想要的結果！' },
            'ig-young+promo-fun+micro-hash': { title: '✅ Instagram 年輕族群促銷貼文', desc: '很適合 IG 的組合！', feedback: '完整指令範例：「幫我寫一篇 IG 貼文，目標是 18-28 歲年輕人，推廣限時優惠，風格活潑帶 emoji，50 字以內，加 5 個相關 hashtag。」\n\n💡 短、有圖感、hashtag 齊全——這就是 IG 演算法喜歡的格式！' },
            'li-biz+edu-pro+long-struct': { title: '✅ LinkedIn 專業知識分享貼文', desc: '最適合 LinkedIn 的組合！', feedback: '完整指令範例：「幫我寫一篇 LinkedIn 文章，目標是 B2B 決策者，主題是 AI 自動化提升效率的 3 個方法，風格專業有數據支撐，300 字，有標題有段落。」\n\n💡 LinkedIn 受眾重視深度，長文加結構是標配！' },
            'line-cust+promo-fun+short-cta': { title: '✅ LINE 客戶促銷推播訊息', desc: 'LINE 最適合這種組合！', feedback: '完整指令範例：「幫我寫一則 LINE 推播訊息，對象是現有客戶，推廣會員專屬 9 折優惠（限今天），風格親切帶 emoji，50 字以內，結尾加優惠碼和購買連結。」\n\n💡 LINE 打開率高，但要快速到重點！促銷 + 期限感 + 行動呼籲是黃金公式。' },
            'default': { title: '✅ 你組合出了一個清楚的提示詞框架！', desc: '每個選擇都為 AI 提供了更具體的指引。', feedback: '💡 關鍵原則：好的 AI 指令要包含「平台」「受眾」「主題」「風格」「字數」至少 5 個條件，模糊的指令只會得到模糊的結果。試試其他組合，看看不同組合的完整指令範例！' }
          }
        })}
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

      <hr class="section-divider">

      <div class="reveal">
        ${Components.sectionTitle('🎮 先試試看：組合你的自動化流程', '三步驟選出你的觸發 → 處理 → 行動，看看你組合出了什麼系統')}
        ${FlowBuilder.render('workshop-flow', {
          title: '組合一個屬於你的自動化流程',
          steps: [
            {
              tag: '觸發',
              q: '⚡ 第一步：什麼事件啟動這個自動化？',
              options: [
                { icon: '💬', label: 'LINE / IG 收到訊息', value: 'msg', desc: '用戶主動傳訊觸發' },
                { icon: '📋', label: 'Google 表單送出', value: 'form', desc: '填表即觸發後續流程' },
                { icon: '⏰', label: '每天固定時間', value: 'schedule', desc: '排程自動定時執行' },
                { icon: '📰', label: '監測到新文章或新資料', value: 'monitor', desc: 'RSS / 爬蟲偵測更新' }
              ]
            },
            {
              tag: '處理',
              q: '🧠 第二步：收到資料後怎麼處理？',
              options: [
                { icon: '🤖', label: 'AI 分析並生成回覆', value: 'ai', desc: '讓 AI 理解並產生內容' },
                { icon: '🔀', label: 'If-Else 條件判斷', value: 'ifelse', desc: '根據內容走不同分支' },
                { icon: '🗄️', label: '查詢資料庫', value: 'db', desc: '從資料庫找對應資訊' },
                { icon: '📊', label: '統計 / 彙整資料', value: 'aggregate', desc: '計算或整理多筆資料' }
              ]
            },
            {
              tag: '行動',
              q: '🎯 第三步：處理完後做什麼？',
              options: [
                { icon: '📤', label: '回覆 LINE / IG 訊息', value: 'reply-msg', desc: '即時回應使用者' },
                { icon: '📧', label: '寄 Email 通知', value: 'email', desc: '發送通知給相關人員' },
                { icon: '📝', label: '寫入 Google Sheets', value: 'sheets', desc: '自動記錄到試算表' },
                { icon: '🗄️', label: '更新資料庫', value: 'update-db', desc: '儲存或修改資料' }
              ]
            }
          ],
          results: {
            'msg+ai+reply-msg': { title: 'AI 客服 / 聊天機器人', desc: '收到訊息 → AI 分析意圖 → 即時回覆。這是 LINE Bot 最經典的架構。', feedback: '🏆 黃金組合！幾乎每個 AI 客服 Bot 都是這個基本架構。可以再加上：查詢資料庫（讓 AI 知道你的商品資訊）、If-Else 分流（讓敏感問題轉人工）。你已掌握了最核心的自動化模式！' },
            'msg+ifelse+reply-msg': { title: '規則型客服機器人', desc: '收到訊息 → 關鍵字判斷 → 回覆對應內容。', feedback: '✅ 穩定可靠！規則型機器人回應速度快、成本低，特別適合常見問題有限且固定的場景。缺點是無法處理「規則之外」的問題，通常需要兜底讓 AI 或人工接手。' },
            'msg+db+reply-msg': { title: '查詢型機器人', desc: '收到訊息 → 查資料庫找資訊 → 回傳查詢結果。', feedback: '💡 實用型設計！讓客戶自助查詢訂單狀態、庫存、預約記錄，大幅減少人工客服負擔。電商和服務業最常用這個架構。' },
            'form+ai+email': { title: '表單分析通知系統', desc: '表單送出 → AI 分析內容 → 發摘要通知給管理員。', feedback: '🎯 省力又聰明！把人工整理表單回覆的時間完全省掉，特別適合大量應徵表、客戶意見回饋。AI 可以自動分類、標記重要訊息，管理員只要看摘要就好。' },
            'form+ifelse+sheets': { title: '表單分流記錄系統', desc: '表單送出 → 條件分類 → 自動歸檔到不同試算表。', feedback: '📊 組織化設計！不同類型的表單（如：問題、建議、投訴）自動分流到對應的試算表，讓資料從一開始就整理好，後續分析也更容易。' },
            'form+ai+sheets': { title: '表單 AI 處理存檔系統', desc: '表單送出 → AI 分析整理 → 結構化存入試算表。', feedback: '📋 資料整理神器！AI 可以把自由填寫的文字表單轉換成結構化資料（如分類、情緒、關鍵詞）再存入試算表，讓原本難以分析的質性資料變得可分析。' },
            'schedule+ai+email': { title: '定時 AI 日報 / 週報', desc: '每天/每週 → AI 產生摘要報告 → 寄送 Email。', feedback: '⏰ 解放你的早晨！讓 AI 在你睡覺時準備好報告，早上醒來直接讀重點。可以設定：競品動態日報、業績摘要週報、新聞重點整理，無限組合。' },
            'schedule+aggregate+sheets': { title: '定時統計報表', desc: '排程觸發 → 統計彙整資料 → 寫入試算表。', feedback: '📈 數據驅動決策！自動收集並整理數據，讓你隨時掌握業務狀況，不再需要手動統計。搭配 Google Data Studio 還能自動更新視覺化圖表。' },
            'monitor+ai+email': { title: '競品監測 / 新聞追蹤系統', desc: '偵測到新內容 → AI 分析摘要重點 → Email 通知你。', feedback: '🔍 業界人士最愛！追蹤競品官網、產業新聞、法規更新、關鍵詞提及，第一時間掌握動態。AI 幫你過濾雜訊，只把真正重要的推送給你。' },
            'monitor+ai+reply-msg': { title: '即時監控通報系統', desc: '偵測到異常或更新 → AI 判斷重要性 → 推播 LINE 通知。', feedback: '🚨 即時預警！適合監控：網站是否正常、庫存是否不足、價格是否異常。AI 過濾後只有真正需要注意的才會打擾你，避免通知轟炸。' },
            'default': { title: '自動化流程已組合！', desc: '你選出了一個可行的自動化流程組合。', feedback: '💡 每個組合都有它的應用場景！試試其他組合，看看不同設計會出現什麼應用名稱和評估。找到最符合你業務需求的那個組合，就是你下一個要實作的自動化！' }
          }
        })}
      </div>

      <hr class="section-divider">
      ${Components.sectionTitle('📝 進階：用工作單拆解你自己的案例', '把上面模擬的流程，展開成完整的設計規格')}

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

      <hr class="section-divider">

      <div class="reveal">
        ${Components.sectionTitle('🎮 動手練習：Markdown 即時預覽挑戰', '在左側輸入 Markdown 語法，右側即時看到渲染結果，完成所有挑戰')}
        ${MarkdownLive.render(
          'markdown-live',
          '這是你的 Markdown 練習場。左邊是輸入區，右邊是渲染結果，改一個字右邊就會立刻變化。試著完成以下 4 個挑戰：',
          '晨報系統 Skill 說明\n\n功能說明\n\n執行步驟：\n- 抓取 RSS 訂閱的最新文章\n- AI 分析和摘要內容\n- 傳送到 LINE 群組\n\n注意事項：每天早上 8 點執行',
          [
            { task: '把第一行「晨報系統 Skill 說明」改成一級標題（在行首加上 # 和空格）', check: 'contains', pattern: '# 晨報系統 Skill 說明' },
            { task: '把「功能說明」改成二級標題（在行首加 ## 和空格）', check: 'contains', pattern: '## 功能說明' },
            { task: '把「LINE 群組」這三個字用 ** 包住，變成粗體', check: 'contains', pattern: '**LINE 群組**' },
            { task: '把「RSS」用反引號 ` 包住，變成行內程式碼格式', check: 'regex', pattern: '`RSS`' }
          ]
        )}
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

      <hr class="section-divider">

      <div class="reveal">
        ${Components.sectionTitle('🎮 動手練習：RSS vs 爬蟲，你會怎麼選？', '判斷每個情境應該用 RSS 訂閱還是網頁爬蟲')}
        ${Classify.render(
          'rss-classify',
          '這兩種方式各有適合的場景，能清楚分辨才能選到對的工具',
          '每個情境點選你的判斷，全部選完後按「確認分類」',
          [
            { id: 'i1', icon: '📰', label: '訂閱 BBC、TechCrunch 等大型媒體的最新文章' },
            { id: 'i2', icon: '🏢', label: '抓取競品官方網站首頁的最新消息（該網站無 RSS）' },
            { id: 'i3', icon: '▶️', label: '追蹤 YouTube 頻道有無發佈新影片' },
            { id: 'i4', icon: '📘', label: '監測 Facebook 粉專的最新貼文內容' },
            { id: 'i5', icon: '🏛️', label: '接收政府開放資料平台的資料更新通知' },
            { id: 'i6', icon: '⭐', label: '定期抓取 Google 地圖上的商家最新評論' }
          ],
          [
            { value: 'rss', label: '📡 RSS 訂閱' },
            { value: 'scrape', label: '🕷️ 網頁爬蟲' }
          ],
          { i1: 'rss', i2: 'scrape', i3: 'rss', i4: 'scrape', i5: 'rss', i6: 'scrape' }
        )}
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

      <hr class="section-divider">

      <div class="reveal">
        ${Components.sectionTitle('✏️ 填空練習：JSON 的本質是什麼？', '填入關鍵詞彙，理解 JSON 在自動化中扮演的角色')}
        ${FillBlank.render(
          'json-concept',
          '完成這段 JSON 的說明：',
          [
            { type: 'text', text: 'JSON 是一種' },
            { type: 'blank', answers: ['結構化', '固定格式', '格式固定'], hint: '什麼特性？', width: 5 },
            { type: 'text', text: '的資料交換' },
            { type: 'blank', answers: ['格式', '形式', '文字格式'], hint: '什麼東西？', width: 4 },
            { type: 'text', text: '，用' },
            { type: 'blank', answers: ['{}', '花括號', '大括號'], hint: '什麼符號？', width: 4 },
            { type: 'text', text: '包住一組「' },
            { type: 'blank', answers: ['鍵值對', 'key-value', 'key value'], hint: '什麼結構？', width: 5 },
            { type: 'text', text: '」。在 AI 自動化中，我們用 JSON 來確保 AI 的輸出是可以被程式直接' },
            { type: 'blank', answers: ['讀取', '解析', '讀取和處理', '處理'], hint: '做什麼用？', width: 4 },
            { type: 'text', text: '的格式，例如：{"platform": "Facebook", "word_count": 150}。' }
          ]
        )}
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

      <hr class="section-divider">

      <div class="reveal">
        ${Components.sectionTitle('🎮 動手練習：建立你的第一個條件規則', '選擇條件和對應行動，看看不同組合的設計評估')}
        ${FlowBuilder.render('ifelse-rule', {
          title: '情境：你正在設計一個 LINE 客服 Bot 的回應邏輯',
          steps: [
            {
              tag: '條件',
              q: '如果客戶傳來的訊息包含…',
              options: [
                { icon: '😡', label: '「投訴」或「不滿意」', value: 'complaint', desc: '客戶在抱怨' },
                { icon: '📅', label: '「預約」或「預訂」', value: 'booking', desc: '客戶要預約' },
                { icon: '🎁', label: '「優惠」或「折扣」', value: 'promo', desc: '客戶問促銷' },
                { icon: '❓', label: '無法分類的訊息', value: 'other', desc: '其他各種問題' }
              ]
            },
            {
              tag: '行動',
              q: '就執行以下哪個動作？',
              options: [
                { icon: '👨‍💼', label: '轉交人工客服', value: 'human', desc: '讓真人接手處理' },
                { icon: '🗓️', label: '開啟預約流程', value: 'book-flow', desc: '自動詢問時間細節' },
                { icon: '📢', label: '傳送優惠訊息', value: 'send-promo', desc: '回傳目前優惠方案' },
                { icon: '🤖', label: '讓 AI 自由回答', value: 'ai-reply', desc: '交由 AI 判斷回覆' }
              ]
            }
          ],
          results: {
            'complaint+human': {
              title: '投訴訊息 → 轉人工客服',
              desc: '偵測到「投訴」「不滿意」等關鍵字時，自動轉交真人客服，並發送「已為您轉接專人，請稍候」。',
              feedback: '✅ 非常專業的設計！投訴類訊息轉人工，避免 AI 應對敏感抱怨，是業界最佳實踐。顧客情緒激動時，感受到「有人在處理」比看到 AI 制式回應重要得多。'
            },
            'complaint+ai-reply': {
              title: '投訴訊息 → AI 自動回答',
              desc: '讓 AI 直接處理投訴訊息。',
              feedback: '⚠️ 技術上可行，但風險較高。情緒激動的投訴如果收到 AI 的制式回應，容易讓客戶覺得「沒有人在乎」，反而讓問題惡化。建議改為先道歉再轉人工，或確保 AI 的措辭夠有同理心。'
            },
            'booking+book-flow': {
              title: '預約訊息 → 開啟預約流程',
              desc: '偵測到預約意圖後，自動詢問時間、項目等細節，配合日曆 API 查詢可用時段。',
              feedback: '🎯 完美搭配！預約是最結構化的需求，非常適合自動化流程。這個組合讓客戶不用等人工回覆，24 小時都能完成預約，轉換率也會大幅提升。'
            },
            'booking+human': {
              title: '預約訊息 → 轉人工',
              desc: '把預約需求轉給真人處理。',
              feedback: '💡 這樣可以運作，但有點浪費自動化的優勢。預約的結構非常固定，最適合全自動流程處理。如果擔心複雜需求，可以先自動詢問基本資訊，收集完再判斷是否需要轉人工。'
            },
            'promo+send-promo': {
              title: '優惠詢問 → 立即傳送優惠訊息',
              desc: '客戶一問優惠，立刻回傳目前的優惠方案，附上有效期限和使用條件。',
              feedback: '✅ 精準有效！問優惠的客戶往往正在考慮購買，零延遲的回應比等人工回覆的轉換率高很多。搭配追蹤點擊的連結，還能知道哪個優惠最受歡迎。'
            },
            'promo+ai-reply': {
              title: '優惠詢問 → AI 自由回答',
              desc: '讓 AI 根據情境介紹優惠。',
              feedback: '💡 AI 可以更靈活地介紹優惠，甚至根據對話推薦最適合的方案。但要確保 AI 能正確取得最新優惠資訊，否則說錯折扣會造成糾紛。搭配 MCP 讀取試算表中的優惠資料，效果最好。'
            },
            'other+ai-reply': {
              title: '其他訊息 → AI 自由回答',
              desc: '對所有無法分類的訊息，讓 AI 根據上下文彈性判斷如何回應。',
              feedback: '🤖 聰明的兜底策略！用 if-else 處理「確定性高」的情境，其他的交給 AI 靈活應對。這是最常見的混合設計：規則引擎 + AI 兜底，兼顧可靠性與靈活性。'
            },
            'other+human': {
              title: '其他訊息 → 轉人工',
              desc: '無法分類的訊息一律轉真人處理。',
              feedback: '⚠️ 這樣會讓客服人員非常忙碌。建議先讓 AI 嘗試回答，只有在 AI 信心不足或客戶明確要求時才轉人工，可以大幅降低人工客服的工作量。'
            },
            'default': {
              title: '條件規則已建立！',
              desc: '你選擇的這個組合在特定情境下也有其應用價值。',
              feedback: '💡 思考一下：這個組合在什麼業務情境下最合理？什麼時候可能產生問題？試試其他組合，看看不同的設計評估！'
            }
          }
        })}
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

      <hr class="section-divider">

      <div class="reveal">
        ${Components.sectionTitle('🎮 動手練習：業務需求 ↔ 資料庫操作配對', '把左邊你想做的事，配對到右邊對應的資料庫操作')}
        ${MatchPair.render(
          'db-match',
          '每個業務需求都對應到一種資料庫操作指令，配對正確代表你已理解資料庫的基本操作',
          '先點左邊的業務需求（選中後高亮），再點右邊對應的操作',
          [
            { id: 'q1', icon: '🔍', label: '查詢訂單 #1234 目前的狀態' },
            { id: 'q2', icon: '📋', label: '列出昨天新增的所有訂單' },
            { id: 'q3', icon: '✏️', label: '把訂單 #1234 的狀態改為「已出貨」' },
            { id: 'q4', icon: '➕', label: '新增一筆客戶資料：王小明，電話 0912-345-678' }
          ],
          [
            { id: 'a1', icon: '🎯', label: 'SELECT（精確查詢單筆）' },
            { id: 'a2', icon: '📅', label: 'SELECT + WHERE（條件篩選多筆）' },
            { id: 'a3', icon: '🔄', label: 'UPDATE（更新現有資料）' },
            { id: 'a4', icon: '💾', label: 'INSERT（新增一筆資料）' }
          ],
          { q1: 'a1', q2: 'a2', q3: 'a3', q4: 'a4' }
        )}
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

      <hr class="section-divider">

      <div class="reveal">
        ${Components.sectionTitle('🎮 動手練習：任務分類挑戰', '判斷下列 8 個任務，哪些適合自動化、哪些需要人工判斷')}
        ${Classify.render(
          'cap-classify',
          '正確分辨「可自動化」和「需人工」，是設計自動化系統的第一步',
          '每個任務點選你的判斷，全部選完後按「確認分類」看結果',
          [
            { id: 'c1', icon: '⏰', label: '每天早上 8 點自動發送晨報摘要到 LINE 群組' },
            { id: 'c2', icon: '🎨', label: '決定公司今年全新的品牌視覺識別方向' },
            { id: 'c3', icon: '📊', label: '每週自動統計各社群平台的互動數字並製作報表' },
            { id: 'c4', icon: '😤', label: '安撫一位憤怒客戶的情緒並解決其投訴問題' },
            { id: 'c5', icon: '🔄', label: '把同一篇文章自動轉換成 FB / IG / LinkedIn 不同格式版本' },
            { id: 'c6', icon: '🎯', label: '判斷哪個廣告創意最能強化品牌的長期形象' },
            { id: 'c7', icon: '🕷️', label: '每小時自動監測競品網站是否有新的公告或價格異動' },
            { id: 'c8', icon: '💡', label: '發現全新商業機會並制定公司未來五年的策略方向' }
          ],
          [
            { value: 'auto', label: '✅ 可以自動化' },
            { value: 'human', label: '⚠️ 需要人工判斷' }
          ],
          { c1: 'auto', c2: 'human', c3: 'auto', c4: 'human', c5: 'auto', c6: 'human', c7: 'auto', c8: 'human' }
        )}
      </div>

      ${Components.pageNav({ route: 'home', label: '首頁' }, { route: 'concept-api', label: '開始學習' })}
    `;
  }
};

// Boot
document.addEventListener('DOMContentLoaded', () => App.init());
