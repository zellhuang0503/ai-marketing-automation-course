// ========================================
// 教學內容資料 — 以 Antigravity IDE 為核心
// ========================================

const CONTENT = {

  // ── 核心概念 ──
  concepts: [
    {
      id: 'api',
      icon: '🍽️',
      title: 'API — 程式之間的「共同語言」',
      shortTitle: 'API',
      analogy: {
        title: '生活比喻：餐廳點餐',
        text: '你去餐廳吃飯，你不會自己跑進廚房炒菜。你跟服務生說「我要一份牛排」，服務生去廚房傳達，廚房做好後服務生端給你。',
        mapping: [
          { life: '你', tech: '你的程式' },
          { life: '服務生', tech: 'API' },
          { life: '廚房', tech: '另一個服務（LINE、OpenAI、Google Sheets...）' },
          { life: '菜單', tech: 'API 文件（告訴你可以點什麼）' }
        ]
      },
      why: '幾乎所有自動化都靠 API 串接。理解 API 就能理解「為什麼不同工具可以互相講話」。',
      inAntigravity: '當你跟 AI 說「幫我發一則 LINE 訊息」，AI 實際上就是在呼叫 LINE 的 API。在 Antigravity IDE 中，你只需要用自然語言描述你要什麼，AI 就會幫你撰寫呼叫 API 的程式碼。',
      quiz: [
        {
          question: '以下哪個最能描述 API 的角色？',
          options: ['廚師，負責做菜', '菜單，列出所有選項', '服務生，負責傳遞你的需求', '餐廳老闆，決定一切'],
          correct: 2,
          explanation: 'API 像服務生，負責在「你的程式」和「另一個服務」之間傳遞請求和回應。你不需要知道廚房怎麼做菜（程式怎麼運作），只要跟服務生說你要什麼。'
        },
        {
          question: '為什麼學 API 對做自動化很重要？',
          options: ['因為幾乎所有自動化都靠 API 串接不同服務', '因為要自己寫 API', '因為 API 很貴需要精打細算', '因為老闆要求的'],
          correct: 0,
          explanation: '自動化的本質就是讓不同的工具和服務互相溝通。API 就是它們溝通的方式，理解 API 就掌握了自動化的基礎。'
        },
        {
          question: '在 Antigravity IDE 中，你想讓 AI 幫你發 LINE 訊息，底層實際上做了什麼？',
          options: ['AI 直接打開 LINE App 輸入訊息', 'AI 寄 Email 給 LINE 公司', 'AI 用語音助理念出訊息', 'AI 撰寫程式碼呼叫 LINE 的 API'],
          correct: 3,
          explanation: '即使你用自然語言跟 AI 互動，底層還是透過 API 來與 LINE 溝通。Antigravity 的強大之處在於它幫你寫好呼叫 API 的程式碼。'
        }
      ]
    },
    {
      id: 'webhook',
      icon: '📞',
      title: 'Webhook — 「有事發生就通知我」',
      shortTitle: 'Webhook',
      analogy: {
        title: '生活比喻：等包裹',
        text: '傳統方式（輪詢）：你每 5 分鐘打一通電話問「我的包裹到了嗎？」非常浪費時間和精力。\n\nWebhook 方式：你跟物流說「包裹到了就打給我」，你不用一直問，它會主動通知你。',
        mapping: [
          { life: '一直打電話問', tech: '輪詢（Polling）' },
          { life: '到了打給我', tech: 'Webhook（被動接收通知）' },
          { life: '你的電話號碼', tech: 'Webhook URL（接收通知的地址）' },
          { life: '包裹到了', tech: '事件發生（有人傳訊息、表單送出等）' }
        ]
      },
      why: '聊天機器人、即時通知、自動化觸發，全部靠 Webhook。它讓你的程式能「即時反應」外部事件。',
      inAntigravity: '在 Antigravity IDE 中建立 Webhook 就像設定一個「接聽電話的號碼」。當有人在 LINE 傳訊息給你的 Bot，LINE 就會打這通電話（發送資料到你的 Webhook URL），你的程式就能即時處理。',
      quiz: [
        {
          question: 'Webhook 和一直去檢查（輪詢）最大的差別是什麼？',
          options: ['Webhook 是被動等通知，不需要一直主動去問', 'Webhook 比較貴', 'Webhook 只能用在 LINE', '沒有差別，只是名字不同'],
          correct: 0,
          explanation: 'Webhook 的核心概念就是「反轉主動和被動的關係」。不是你去問，是事件發生時主動通知你，效率高很多。'
        },
        {
          question: '以下哪個場景最適合用 Webhook？',
          options: ['每天早上 8 點產生報告', '每週一次備份資料', '有人在粉專留言時立刻通知你', '瀏覽一個靜態網頁'],
          correct: 2,
          explanation: '需要「即時回應」的場景最適合 Webhook。有人留言是一個「事件」，Webhook 可以在事件發生的瞬間通知你的程式。'
        }
      ]
    },
    {
      id: 'mcp',
      icon: '🔑',
      title: 'MCP — 讓 AI 有「鑰匙」存取你的工具',
      shortTitle: 'MCP',
      analogy: {
        title: '生活比喻：智慧助理的鑰匙',
        text: '想像你有一個超聰明的助理（AI），但他被關在一個房間裡。他很會分析、很會寫東西，但他看不到你的 Email、你的試算表、你的行事曆。\n\nMCP 就像是「幫這個房間裝上門」：\n• Google Sheets MCP → 他可以看到你的試算表了\n• Gmail MCP → 他可以讀你的信了\n• Calendar MCP → 他可以看你的行事曆了\n• Supabase MCP → 他可以讀寫你的資料庫了\n\n每一個 MCP Server = 一道「門」，連接到一個外部服務。',
        mapping: [
          { life: '聰明但被關在房間的助理', tech: 'AI (LLM)' },
          { life: '各個房間的鑰匙', tech: 'MCP Server' },
          { life: '打開門看到的東西', tech: '外部服務的資料和功能' },
          { life: 'AI + 所有鑰匙', tech: '一個能存取所有工具的智慧助理' }
        ]
      },
      why: 'MCP（Model Context Protocol）是 Antigravity IDE 最強大的功能之一。理解 MCP 就能理解「為什麼 AI 可以幫你操作 Google Sheets、讀你的 Email、存取資料庫」。',
      inAntigravity: 'Antigravity IDE 已經內建多種 MCP Server。你只需要設定連接，AI 就能直接存取你的 Google Sheets、Supabase 資料庫、Notion 等工具，不需要自己寫 API 串接的程式碼。',
      manualInstall: {
        title: 'Antigravity Market 沒有的 MCP Server 怎麼辦？',
        steps: [
          { step: '1. 找到 MCP Server', desc: '大多數開源 MCP Server 都放在 GitHub 上。搜尋「MCP Server [你要的服務名稱]」即可找到，例如「MCP Server Airtable」。' },
          { step: '2. 查看安裝說明', desc: '進入 GitHub 頁面，找到 README 中的「Installation」或「Configuration」部分。通常會提供一段 JSON 設定。' },
          { step: '3. 複製 JSON 設定', desc: '典型格式如下：\n{"mcpServers": {"工具名稱": {"command": "npx", "args": ["-y", "@套件名稱"]}}}' },
          { step: '4. 在 Antigravity 手動新增', desc: '進入 Antigravity IDE → 設定 → MCP Servers → 手動新增，貼上 JSON 設定即可。AI 就能立刻使用這個新工具。' }
        ],
        tip: '可以去 mcp.so 或 smithery.ai 搜尋各種 MCP Server 的完整列表，幾乎所有主流服務都已有對應的 MCP Server。'
      },
      quiz: [
        {
          question: 'MCP 讓 AI 能做到什麼？',
          options: ['讓 AI 變得更聰明', '讓 AI 畫圖更好看', '讓 AI 說話更自然', '讓 AI 能存取外部工具和服務（如 Google Sheets、資料庫）'],
          correct: 3,
          explanation: 'MCP 不是讓 AI 更聰明，而是讓 AI 能「看到」和「操作」你的外部工具。就像給助理一把鑰匙，讓他能進你的辦公室看資料。'
        },
        {
          question: '「每一個 MCP Server = 一道門」這句話的意思是？',
          options: ['每個 MCP Server 連接到一個特定的外部服務', '每個 MCP Server 都很安全', 'MCP Server 很多會很亂', 'AI 只能開一道門'],
          correct: 0,
          explanation: 'Google Sheets MCP 連接 Google Sheets、Supabase MCP 連接 Supabase 資料庫。每一個 MCP Server 就是通往一個特定服務的通道。'
        },
        {
          question: 'Antigravity IDE 的 Market 沒有某個 MCP Server 時，應該怎麼辦？',
          options: ['放棄這個功能', '等 Antigravity 更新', '手動安裝：在設定中貼上 MCP Server 的 JSON 設定（名稱+指令+參數）', '改用 API 取代'],
          correct: 2,
          explanation: '大多數 MCP Server 都可以手動安裝。只要取得該 Server 的 JSON 設定格式（通常在 GitHub README 中），貼到 Antigravity 的 MCP 設定頁面即可。'
        }
      ]
    },
    {
      id: 'browser',
      icon: '🌐',
      title: 'Browser 自動化 — 讓程式像人一樣操作瀏覽器',
      shortTitle: 'Browser 自動化',
      analogy: {
        title: '生活比喻：不會累的實習生',
        text: '你平常怎麼看競品粉專？\n→ 打開 Chrome → 輸入網址 → 滑鼠滾動 → 眼睛看內容 → 腦袋記下來\n\n程式怎麼做？\n→ 打開虛擬 Chrome → 程式輸入網址 → 程式滾動頁面 → 程式讀取文字 → AI 分析內容\n\n兩者做的事情完全一樣，只是一個是你手動，一個是程式代勞。\nBrowser 自動化 = 你僱了一個不會累的實習生，24 小時幫你看網頁。',
        mapping: [
          { life: '打開 Chrome 上網', tech: '啟動 Headless Browser' },
          { life: '輸入網址', tech: '程式導航到 URL' },
          { life: '滑鼠滾動、點擊', tech: 'DOM 操作（scroll、click）' },
          { life: '眼睛看內容', tech: '讀取頁面元素的文字' },
          { life: '腦袋記下來', tech: 'AI 分析 + 儲存到資料庫' }
        ]
      },
      why: '很多網站沒有開放 API，但透過 Browser 自動化，依然可以抓取公開資料、自動填表、截圖等。',
      inAntigravity: 'Antigravity IDE 內建 Browser 工具（Browser Sub-Agent），你可以直接告訴 AI「幫我打開某個網頁，抓取上面的內容」，AI 就會操作虛擬瀏覽器完成任務。',
      canDo: ['自動打開網頁、滾動、點擊', '自動讀取頁面上的文字', '自動截圖', '自動填寫表單'],
      cantDo: ['不能破解密碼或繞過安全機制', '不建議用於違反平台規則的操作'],
      glossary: [
        { term: 'Headless Browser（無頭瀏覽器）', emoji: '👻', explain: '一個「看不見的瀏覽器」。它在電腦背後偷偷運作，做跟 Chrome 一樣的事（讀網頁、執行 JavaScript），但不會出現視窗畫面。速度更快，適合讓程式自動執行。常見例子：Puppeteer、Playwright、Selenium。' },
        { term: 'URL（統一資源定位符）', emoji: '🔗', explain: '就是「網址」。例如 https://www.facebook.com 就是一個 URL。程式打開網頁時，也需要知道這個地址，才知道要去哪裡。完整的 URL 包含：協定（https://）、域名（facebook.com）、路徑（/pages）。' },
        { term: 'DOM（文件物件模型）', emoji: '🌳', explain: '網頁的「骨架結構」。瀏覽器把 HTML 頁面讀進來之後，會把它轉換成一個樹狀的結構。程式可以透過 DOM 找到頁面上任何一個元素（標題、按鈕、圖片）並讀取或修改它。你看到的文字，程式也能看到，靠的就是 DOM。' },
        { term: 'Scroll（滾動）', emoji: '📜', explain: '就是「往下滑」的動作。很多社群平台（Facebook、Instagram、Twitter）是「無限滾動」設計，新內容要等你往下滑才會載入。程式用 scroll 指令模擬你往下滑，讓更多內容出現，才能抓到更多資料。' },
        { term: 'Click（點擊）', emoji: '🖱️', explain: '程式模擬滑鼠點擊的動作。就像你用手指點螢幕，程式也能對著任何按鈕、連結、展開箭頭「點一下」。例如：點開「顯示更多留言」的按鈕，讓留言全部展開後再讀取。' }
      ],
      quiz: [
        {
          question: 'Browser 自動化的本質是什麼？',
          options: ['破解網站的安全系統', '加速網路速度', '讓程式模擬人類操作瀏覽器的行為', '設計網頁的工具'],
          correct: 2,
          explanation: 'Browser 自動化就是讓程式做跟你一樣的事——打開網頁、滾動、點擊、讀取文字——只是它更快、不會累。'
        },
        {
          question: '什麼時候會需要用 Browser 自動化而不是 API？',
          options: ['目標網站沒有開放 API，但有公開網頁可以讀取', '目標網站有提供 API 時', '想要加速 API 呼叫速度', '永遠都該用 Browser 自動化'],
          correct: 0,
          explanation: '有 API 就用 API（更穩定、更快）。Browser 自動化是在沒有 API 的情況下的替代方案。'
        },
        {
          question: '什麼是「Headless Browser」（無頭瀏覽器）？',
          options: ['壞掉的瀏覽器', '沒有安裝外掛的瀏覽器', '沒有視覺畫面的瀏覽器，只在背景執行', '速度很慢的瀏覽器'],
          correct: 2,
          explanation: 'Headless Browser 就是「看不見的瀏覽器」。它在電腦背後執行，做跟一般瀏覽器一樣的事（讀取網頁、執行 JS），但不會顯示任何視窗畫面，所以速度更快、也不佔螢幕空間。'
        }
      ]
    },
    {
      id: 'skill',
      icon: '📋',
      title: 'Skill — AI 的「工作說明書」',
      shortTitle: 'Skill',
      analogy: {
        title: '生活比喻：新員工的工作說明書',
        text: '你僱了一個新員工（AI），他什麼都能做，但需要你告訴他「做什麼、怎麼做」。\n\nSkill 就是你寫給他的「工作說明書」：\n• 工作名稱：每日產業新聞彙整\n• 什麼時候做：每天早上 8 點\n• 做什麼：去這 3 個網站抓新聞 → 寫摘要 → 發到 LINE\n• 注意事項：用繁體中文、不超過 200 字',
        mapping: [
          { life: '新員工', tech: 'AI Agent' },
          { life: '工作說明書', tech: 'Skill 檔案' },
          { life: '工作名稱', tech: 'Skill 名稱和描述' },
          { life: '具體步驟', tech: 'Skill 內的指令' },
          { life: '注意事項', tech: '限制條件和輸出格式' }
        ]
      },
      why: 'Skill 是 Antigravity IDE 的核心。學會寫 Skill = 學會「指揮 AI 做事」。Skill 讓你能把重複性的工作流程標準化。',
      inAntigravity: '在 Antigravity IDE 中，Skill 是 Markdown 格式的檔案。你只要用自然語言描述工作流程，AI 就會按照你寫的 Skill 來執行任務。不需要寫程式碼，只需要會「說清楚你要什麼」。',
      structure: ['什麼時候做？（觸發條件）', '做什麼？（具體步驟）', '做完怎麼處理？（輸出 / 通知）'],
      quiz: [
        {
          question: 'Skill 的本質是什麼？',
          options: ['一種程式語言', 'AI 的記憶體', '一種付費功能', '給 AI 的「工作說明書」，告訴它要做什麼'],
          correct: 3,
          explanation: 'Skill 就是指令，用自然語言寫成。你描述清楚工作內容，AI 就按照你的指示執行。'
        },
        {
          question: 'Skill 的三個基本要素是什麼？',
          options: ['帳號、密碼、API Key', '開始、中間、結束', '觸發條件、具體步驟、輸出處理', '輸入、處理、輸出'],
          correct: 2,
          explanation: '寫 Skill 就是回答三個問題：什麼時候做（觸發）？做什麼（步驟）？做完怎麼處理（輸出）？'
        }
      ]
    }
  ],

  // ── 核心概念補充 ──
  additionalConcepts: [
    {
      id: 'prompt-engineering',
      icon: '💬',
      title: 'Prompt Engineering — 跟 AI 說話的藝術',
      shortTitle: 'Prompt 工程',
      desc: '就像跟實習生交代工作，說得越清楚，結果越好。Prompt Engineering 就是學會「怎麼跟 AI 說話才能得到你要的結果」。'
    },
    {
      id: 'json',
      icon: '📦',
      title: '結構化輸出 (JSON) — 填固定格式的表格',
      shortTitle: 'JSON 結構化',
      desc: '讓 AI 不是隨意回答，而是把答案「填進固定格式的表格」。這樣程式才能自動讀取和處理 AI 的回答。'
    },
    {
      id: 'tool-calling',
      icon: '🔧',
      title: 'Tool Calling — AI 不只給建議，還幫你做',
      shortTitle: 'Tool Calling',
      desc: '傳統 AI 只能給你文字回答。Tool Calling 讓 AI 可以「動手做事」——幫你查資料庫、發訊息、寫入試算表等。'
    }
  ],

  // ── 案例拆解 ──
  cases: [
    {
      id: 1,
      icon: '📰',
      title: '自動晨報機器人',
      subtitle: '每天早上自動彙整產業新聞發到 LINE 群組',
      demo: {
        type: 'chat',
        messages: [
          { type: 'incoming', text: '📰 今日 AI 行銷快報（3/25）\n\n1. Meta 推出新廣告自動化工具... \n2. TikTok 演算法更新影響自然觸及...\n3. Google 推出 AI 生成購物廣告功能...\n\n💡 AI 觀點：本週品牌應關注 TikTok 觸及下降問題...' }
        ]
      },
      questions: [
        { q: '新聞從哪裡來的？', answer: 'RSS / 網頁抓取', tag: '資料來源', detail: '透過 RSS Feed 訂閱新聞來源，就像「訂閱報紙」一樣，會自動收到最新文章。也可以用 Browser 自動化去網頁抓取。' },
        { q: '誰讀了這些新聞然後寫摘要？', answer: 'AI（LLM）API 呼叫', tag: 'AI 處理', detail: '把文章丟給大語言模型「請它用繁中寫 50 字摘要」。就像請一位秘書幫你讀完資料後寫重點。' },
        { q: '怎麼每天早上 8 點自動跑？', answer: '排程 / Cron / 定時觸發', tag: '觸發方式', detail: '就像設鬧鐘一樣，告訴程式「每天早上 8 點執行一次」。' },
        { q: '怎麼發到 LINE？', answer: 'Webhook / LINE API 串接', tag: '行動輸出', detail: '透過 LINE 的 API，用程式自動發送訊息到指定的群組或個人。' }
      ],
      modules: [
        { concept: '資料來源', analogy: '訂閱報紙', tech: 'RSS Feed', howTo: '用 Skill 告訴 AI：「去抓這幾個網站的最新文章」' },
        { concept: 'AI 處理', analogy: '請秘書讀完幫你寫摘要', tech: 'LLM API Call', howTo: '用 Skill 告訴 AI：「把文章用繁中寫 50 字摘要」' },
        { concept: '定時執行', analogy: '設鬧鐘', tech: 'Scheduled Task', howTo: 'Antigravity 的排程功能或系統 Cron' },
        { concept: '發送通知', analogy: '傳訊息給朋友', tech: 'LINE Message API', howTo: 'MCP 或 HTTP Request 發送到 LINE Message API' }
      ],
      minimalBuild: [
        '用 Antigravity IDE 建立一個 Skill',
        '手動觸發（先不排程）',
        '從 1 個 RSS 來源抓 3 篇文章',
        '請 AI 寫摘要',
        '印出結果（先不發 LINE）'
      ]
    },
    {
      id: 2,
      icon: '📝',
      title: '一鍵多平台發文助手',
      subtitle: '寫一次貼文，自動轉換成 FB/IG/LinkedIn 格式',
      demo: {
        type: 'multi',
        items: [
          { platform: 'Facebook', text: '🎉 我們很高興宣布新品正式上市！經過團隊數月的研發，這款產品將為您帶來全新的體驗... #新品上市 #品牌故事' },
          { platform: 'Instagram', text: '✨ 新品來啦！快來看看我們的最新力作 💫\n\n#新品 #上市 #品牌 #設計 #質感 #lifestyle #newproduct #launch' },
          { platform: 'LinkedIn', text: '我們正式推出最新產品線。根據市場調查，83% 的消費者表示...' }
        ]
      },
      questions: [
        { q: 'AI 怎麼知道三個平台的風格不一樣？', answer: 'Prompt Engineering', tag: '提示詞工程', detail: '在提示詞中明確描述每個平台的特色和風格要求。就像跟實習生說：「FB 要長文案、IG 要短文配多 hashtag、LinkedIn 要專業口吻」。' },
        { q: '為什麼能同時產出三個版本且格式整齊？', answer: '結構化輸出（JSON）', tag: '格式控制', detail: '要求 AI 用 JSON 格式回覆，就像填固定格式的表格。這樣每次輸出都是統一格式。' },
        { q: '如果我想讓它記住我的品牌語氣？', answer: 'System Prompt / 上下文記憶', tag: '品牌設定', detail: '在 System Prompt 中定義品牌調性，就像給員工一本「品牌訓練手冊」，讓 AI 記住你的風格。' },
        { q: '有辦法讓它自動發佈嗎？', answer: 'API 權限與操作', tag: 'API 串接', detail: '透過各平台的 API 就能自動發佈。不過需要先取得對應的 API 權限。' }
      ],
      modules: [
        { concept: '給 AI 指令', analogy: '跟實習生交代工作', tech: 'Prompt Engineering' },
        { concept: '格式化輸出', analogy: '填固定格式的表格', tech: 'JSON 結構化輸出' },
        { concept: '品牌設定', analogy: '員工訓練手冊', tech: 'System Prompt' },
        { concept: '自動發佈', analogy: '助理幫你貼文', tech: 'Social Media API' }
      ],
      minimalBuild: [
        '在 Antigravity IDE 寫一個 Skill 定義品牌調性',
        '輸入一段素材',
        'AI 自動產出三平台文案',
        '輸出為結構化 JSON 格式'
      ]
    },
    {
      id: 3,
      icon: '💬',
      title: '客戶私訊自動分流',
      subtitle: '粉專私訊自動判斷類型並回應',
      demo: {
        type: 'chat-multi',
        scenarios: [
          { input: '你們營業時間是幾點？', output: '自動回覆營業資訊', icon: '🕐' },
          { input: '我的訂單 #12345 到哪了？', output: '自動查詢並回覆物流狀態', icon: '📦' },
          { input: '你們產品害我過敏！', output: '標記「緊急客訴」，立刻通知真人客服', icon: '🚨' },
          { input: '想合作業配', output: '自動回覆合作方案 PDF', icon: '🤝' }
        ]
      },
      questions: [
        { q: '機器人怎麼「看得懂」客戶在問什麼？', answer: 'AI 分類 / 意圖辨識', tag: '意圖辨識', detail: 'AI 可以理解自然語言的意思，判斷客戶是在「問問題」「抱怨」還是「想合作」。' },
        { q: '它怎麼決定該自動回還是轉真人？', answer: '條件判斷 / If-Else 邏輯', tag: '條件邏輯', detail: '就像客服電話「按 1 轉售後、按 2 轉業務」，程式根據 AI 判斷的類別走不同的處理路線。' },
        { q: '訂單資料從哪裡來？', answer: '資料庫查詢 / 外部系統串接', tag: '資料串接', detail: '透過 MCP 連接 Supabase 或其他資料庫，用訂單編號去查詢對應的物流資料。' },
        { q: '怎麼做到 24 小時都能回？', answer: 'Webhook（即時監聽）', tag: '即時回應', detail: 'Webhook 讓程式「值班電話永遠有人接」。客戶傳訊息的瞬間就觸發處理流程。' }
      ],
      modules: [
        { concept: 'AI 判斷意圖', analogy: '櫃檯人員聽懂客人要什麼', tech: 'Intent Classification' },
        { concept: '條件分流', analogy: '客服電話按 1 轉售後、按 2 轉業務', tech: 'If-Else / Switch' },
        { concept: '查資料', analogy: '翻出客戶的訂單記錄', tech: 'Database Query / API Call' },
        { concept: '24 小時待命', analogy: '值班電話永遠有人接', tech: 'Webhook（即時接收）' }
      ],
      minimalBuild: [
        '用 Antigravity IDE 建立一個接收訊息的 Webhook',
        'AI 判斷訊息屬於哪一類（JSON 結構化輸出）',
        '根據類別回覆不同內容',
        '「客訴」類自動發通知給管理員'
      ]
    },
    {
      id: 4,
      icon: '📊',
      title: '競品社群監測儀表板',
      subtitle: '自動追蹤競品動態並生成週報',
      demo: {
        type: 'report',
        content: '📊 上週競品動態摘要\n\n• 競品 A：發了 5 篇貼文，平均互動率 3.2%，主推「春季折扣」\n• 競品 B：新開設 Threads 帳號，首篇貼文 500 讚\n• 競品 C：被網友負評「出貨太慢」，相關討論 23 則\n\n💡 建議：本週可針對「快速出貨」做差異化宣傳'
      },
      questions: [
        { q: '資料從哪裡抓的？不會要我手動去看吧？', answer: '網頁爬取 / Browser 自動化', tag: 'Browser', detail: '用 Antigravity 的 Browser Sub-Agent 自動打開競品的粉專頁面，抓取最新貼文內容。' },
        { q: '為什麼可以自動操作瀏覽器？', answer: 'Browser Agent / Headless Browser', tag: 'Browser 原理', detail: '程式可以操作一個「看不見的瀏覽器」，做跟你一樣的事：打開網頁、滾動、讀取文字。就像遙控器可以遙控電視。' },
        { q: 'AI 怎麼分析正面負面？', answer: '情緒分析（Sentiment Analysis）', tag: 'AI 分析', detail: 'AI 可以判斷文字的語氣是「正面」、「負面」還是「中性」。就像你看評論能判斷是誇還是罵。' },
        { q: '報告怎麼自動產生的？', answer: '模板化輸出 / 結構化報表', tag: '自動化報表', detail: 'AI 分析完數據後，用預設的模板格式自動產生報告。就像助理幫你把資料整理成簡報。' }
      ],
      modules: [
        { concept: '自動看網頁', analogy: '派偵探去觀察對手', tech: 'Browser Automation', howTo: 'Antigravity 內建 Browser Sub-Agent' },
        { concept: '操作瀏覽器原理', analogy: '遙控器可以遙控電視', tech: 'Headless Browser / DOM 操作', howTo: 'Antigravity 內建 Browser 工具' },
        { concept: '正負面判斷', analogy: '看評論是誇還是罵', tech: 'Sentiment Analysis', howTo: 'AI API Call（LLM 分析情緒）' },
        { concept: '自動產報告', analogy: '助理幫你整理成簡報', tech: 'Template Rendering', howTo: 'Skill + 結構化輸出' }
      ],
      minimalBuild: [
        '用 Antigravity 的 Browser 工具打開一個公開粉專',
        '抓取最新 3 篇貼文內容',
        'AI 分析每篇的主題和情緒',
        '產出簡單的文字報告'
      ]
    },
    {
      id: 5,
      icon: '📈',
      title: '智能排程助手',
      subtitle: '根據歷史數據建議最佳發文時間',
      demo: {
        type: 'report',
        content: '📈 發文時間分析報告\n\n• 最佳時段：週二、四 晚上 8-9 點（平均互動率 4.5%）\n• 次佳時段：週日 上午 10-11 點（平均互動率 3.8%）\n• 避免時段：週一 上午（互動率僅 1.2%）\n• 建議：影片型內容在週末表現最好，圖文在週間較優'
      },
      questions: [
        { q: '資料從 Google Sheets 讀的？還是直接從社群平台抓的？', answer: 'MCP（外部服務連接）', tag: 'MCP', detail: '透過 MCP 連接 Google Sheets 或 Supabase 資料庫，讓 AI 能直接讀取你的數據。' },
        { q: 'MCP 是什麼？為什麼 AI 能讀我的 Google Sheets？', answer: 'MCP 原理', tag: 'MCP 原理', detail: 'MCP = 給 AI 一把鑰匙。Google Sheets MCP 讓 AI 可以打開門去看你的試算表資料。' },
        { q: 'AI 怎麼分析數據的？', answer: '資料分析 + AI 推論', tag: 'AI 分析', detail: 'AI 讀取數據後，用統計方法找出規律（如哪個時段互動率最高），然後給出建議。' },
        { q: '能不能直接幫我排好貼文？', answer: 'Tool Calling / 工具呼叫', tag: 'Tool Calling', detail: 'Tool Calling 讓 AI 不只給建議，還能實際「動手做」——幫你在排程工具上設定好發文時間。' }
      ],
      modules: [
        { concept: 'MCP 連接', analogy: '給助理一把鑰匙，讓他能進你的辦公室看資料', tech: 'Model Context Protocol' },
        { concept: '讀取外部資料', analogy: '翻出過去的業績表', tech: 'Google Sheets API via MCP' },
        { concept: 'AI 分析', analogy: '請顧問看數據給建議', tech: 'Data Analysis + LLM' },
        { concept: '執行動作', analogy: '不只給建議，還幫你做', tech: 'Tool Calling / Function Calling' }
      ],
      minimalBuild: [
        '準備一份 Google Sheets（模擬的貼文數據）',
        '透過 MCP 連接 Google Sheets',
        'AI 讀取數據並分析',
        '產出建議報告'
      ]
    }
  ],

  // ── 與 AI 對話技巧 ──
  dialogSkills: {
    comparisons: [
      {
        bad: '幫我做一個社群自動化',
        good: '幫我做一個每天早上 8 點自動去 TechCrunch 抓最新 3 篇 AI 新聞，用繁中寫 50 字摘要，發到我的 LINE 群組'
      },
      {
        bad: '這個 code 有 error',
        good: '我執行後出現這個錯誤訊息：[貼上錯誤]，我期望的結果是 [描述]，請幫我修正'
      },
      {
        bad: '加一個功能',
        good: '在目前的晨報機器人基礎上，加一個功能：如果新聞提到我們的品牌名稱，就額外發一則通知給我'
      }
    ],
    threeSteps: [
      { step: 1, title: '說清楚「我要什麼成果」', example: '我希望每天自動收到一份競品分析報告' },
      { step: 2, title: '說清楚「輸入是什麼、輸出到哪裡」', example: '從這 3 個競品的 Facebook 粉專抓資料，分析後發到我的 LINE' },
      { step: 3, title: '說清楚「有什麼限制或要求」', example: '用繁體中文、重點不超過 5 條、如果有負面評論要特別標註' }
    ],
    askRight: [
      '這段程式在做什麼？請用非技術人員能理解的方式解釋',
      '這段如果失敗了會怎樣？',
      '我想修改 [某個行為]，應該改哪裡？',
      '幫我加上中文註解，讓我看懂每一步在做什麼'
    ]
  },

  // ── 自動化地圖 ──
  automationMap: {
    triggers: [
      { name: '定時排程', desc: '每天8點、每小時執行', icon: '⏰' },
      { name: 'Webhook', desc: '收到訊息就觸發', icon: '📨' },
      { name: '手動觸發', desc: '按一下就執行', icon: '👆' },
      { name: '收到訊息', desc: 'LINE/Telegram 傳訊息', icon: '💬' }
    ],
    processors: [
      { name: 'AI 分析', desc: '理解、分類、判斷', icon: '🧠' },
      { name: 'AI 生成', desc: '寫文案、做摘要', icon: '✍️' },
      { name: '資料轉換', desc: '格式轉換、篩選', icon: '🔄' },
      { name: '條件判斷', desc: '如果A就做B', icon: '🔀' }
    ],
    actions: [
      { name: '發通知', desc: 'LINE/Telegram/Email', icon: '📢' },
      { name: '寫入資料庫', desc: 'Supabase/Sheets', icon: '💾' },
      { name: '發貼文', desc: '社群平台發佈', icon: '📱' },
      { name: '寄 Email', desc: '自動寄送郵件', icon: '📧' }
    ],
    connectors: [
      { name: 'API', desc: '程式之間互相溝通的「共同語言」' },
      { name: 'Webhook', desc: '「有事發生時打電話通知我」' },
      { name: 'MCP', desc: '讓 AI 能「打開門」存取外部工具' },
      { name: 'Browser', desc: '讓程式像人一樣「操作瀏覽器」' },
      { name: 'Skill', desc: '教 AI 做特定工作的「工作說明書」' }
    ]
  },

  // ── 程式能做什麼（認知校準）──
  capabilities: {
    canDo: [
      { category: '重複性工作', example: '每天發相同格式的報告、定時抓資料' },
      { category: '大量處理', example: '一次分析 1000 篇留言的情緒' },
      { category: '跨平台串接', example: '收到 LINE 訊息 → 記到 Supabase → 通知 Telegram' },
      { category: '24 小時運作', example: '半夜收到客訴也能自動回覆' },
      { category: '操作瀏覽器', example: '自動打開網頁、截圖、抓資料' },
      { category: '讀寫各種工具', example: '透過 MCP 存取 Google Sheets、Supabase、Gmail 等' }
    ],
    cantDo: [
      { category: '品牌創意判斷', note: 'AI 可以產出文案，但最終品牌調性需要人決定' },
      { category: '複雜人際互動', note: '真正需要同理心的客訴處理，還是要真人' },
      { category: '100% 準確率', note: 'AI 會犯錯，重要決策需要人類審核' },
      { category: '繞過安全機制', note: '不能破解密碼、繞過驗證碼' }
    ],
    mindset: '自動化不是「取代你」，而是「幫你處理無聊的部分」。你的價值在於：決定「要自動化什麼」（策略）、判斷「AI 產出的東西好不好」（品質控制）、處理「機器人搞不定的事」（創意與同理心）。AI 是你的超級實習生，不是你的替代品。'
  },

  // ── 推薦案例 ──
  references: [
    { name: 'Infinite Laundry', source: 'SocialPilot', insight: '內容排程時間從 3-4 天降至 1 天' },
    { name: 'A.S. Watson', source: 'Revieve', insight: 'AI 顧問提升 396% 轉換率' },
    { name: 'NBA 球隊', source: 'Talkwalker', insight: '社群聆聽帶來 352% 影片觀看成長' },
    { name: 'Salesforce', source: 'Sprout Social', insight: 'Smart Inbox 一年省下 12,000 小時' },
    { name: '香港航空', source: 'Agorapulse', insight: '社群監測化危機為轉機' }
  ],

  // ── Markdown 格式教學 ──
  markdown: {
    intro: 'Markdown 是一種「輕量級標記語言」，讓你用純文字就能排版出漂亮的文件。在 Antigravity IDE 中，Skill 檔案就是用 Markdown 寫的。',
    analogy: '就像你在寫 Word 文件，但不需要用工具列點粗體、斜體——你直接在文字旁邊加幾個符號，它就會自動變漂亮。',
    examples: [
      { label: '標題', syntax: '# 大標題\n## 中標題\n### 小標題', result: '<h1 style="font-size:1.4em;margin:0">大標題</h1><h2 style="font-size:1.1em;margin:0">中標題</h2><h3 style="font-size:0.95em;margin:0">小標題</h3>' },
      { label: '粗體 / 斜體', syntax: '**粗體文字**\n*斜體文字*\n***粗斜體***', result: '<strong>粗體文字</strong><br><em>斜體文字</em><br><strong><em>粗斜體</em></strong>' },
      { label: '清單', syntax: '- 項目一\n- 項目二\n- 項目三\n\n1. 第一步\n2. 第二步\n3. 第三步', result: '<ul style="margin:0;padding-left:16px"><li>項目一</li><li>項目二</li><li>項目三</li></ul><ol style="margin:4px 0 0;padding-left:16px"><li>第一步</li><li>第二步</li><li>第三步</li></ol>' },
      { label: '程式碼', syntax: '行內：`console.log("hello")`\n\n區塊：\n```python\nprint("Hello World")\n```', result: '行內：<code style="background:#2a2a3a;padding:2px 6px;border-radius:4px">console.log("hello")</code><br><br><pre style="background:#2a2a3a;padding:8px;border-radius:6px;margin:0;font-size:0.85em">print("Hello World")</pre>' },
      { label: '連結 / 引用', syntax: '[點我連結](https://example.com)\n\n> 這是一段引用文字\n> 可以多行', result: '<a href="#" style="color:#7c6af7">點我連結</a><br><br><blockquote style="border-left:3px solid #7c6af7;margin:4px 0;padding:4px 8px;color:#aaa">這是一段引用文字<br>可以多行</blockquote>' },
      { label: '分隔線 / 表格', syntax: '---\n\n| 欄位A | 欄位B |\n|------|------|\n| 資料1 | 資料2 |', result: '<hr style="border-color:#333"><table style="border-collapse:collapse;font-size:0.85em"><tr><th style="border:1px solid #444;padding:4px 8px">欄位A</th><th style="border:1px solid #444;padding:4px 8px">欄位B</th></tr><tr><td style="border:1px solid #444;padding:4px 8px">資料1</td><td style="border:1px solid #444;padding:4px 8px">資料2</td></tr></table>' }
    ],
    skillExample: `# 每日新聞彙整 Skill\n\n## 任務描述\n每天早上 8 點自動執行，彙整科技新聞並發送到 LINE 群組。\n\n## 步驟\n1. 從以下來源抓取最新文章：\n   - TechCrunch RSS\n   - The Verge RSS\n2. 每篇文章用**繁體中文**寫 50 字摘要\n3. 整理成以下格式後發送\n\n## 輸出格式\n\`\`\`\n📰 今日科技快報（日期）\n\n1. 文章標題\n   摘要...\n\n2. 文章標題\n   摘要...\n\`\`\`\n\n> 注意：如果抓不到文章，回報「今日無新內容」`,
    quiz: [
      {
        question: '在 Markdown 中，要讓文字變成粗體，應該用什麼符號包住它？',
        options: ['__雙底線__', '**雙星號**', '##雙井號##', '[[雙括號]]'],
        correct: 1,
        explanation: '在 Markdown 中，**粗體** 是用兩個星號包住文字。單個星號 *斜體* 是斜體。'
      },
      {
        question: 'Antigravity IDE 的 Skill 檔案是用什麼格式寫的？',
        options: ['Word 文件（.docx）', 'Excel 試算表（.xlsx）', 'Markdown 格式（.md）', 'Python 程式（.py）'],
        correct: 2,
        explanation: 'Skill 檔案是純文字的 Markdown 格式（.md）。你用自然語言加上 Markdown 排版語法來寫工作說明書，AI 就能讀懂並執行。'
      },
      {
        question: '以下哪個是正確的 Markdown 清單寫法？',
        options: ['* 項目一 * 項目二', '- 項目一\\n- 項目二', '1) 項目一 2) 項目二', '[項目一][項目二]'],
        correct: 1,
        explanation: 'Markdown 的無序清單用「- 」（減號加空格）開頭，有序清單用「1. 」（數字加點加空格）開頭。'
      }
    ]
  },

  // ── RSS 與網頁爬蟲 ──
  rss: {
    intro: '想要讓自動化流程「讀取最新資訊」，有兩種主要方式：RSS 訂閱 和 網頁爬蟲（Web Scraping）。',
    rssSection: {
      title: '什麼是 RSS？',
      analogy: '想像你很喜歡 10 家不同的報紙，但每天要跑去這 10 家網站看有沒有新文章，超麻煩。\n\nRSS 就像是「訂報紙到家」：你只要訂閱一次，新文章一出來，它會自動整理好發給你。你不用一直跑去各個網站，文章會自己來。',
      whatIs: 'RSS（Really Simple Syndication）是一種標準格式。許多網站（新聞、部落格、Podcast）會提供一個 RSS Feed URL，裡面以固定格式列出最新的文章清單。你的程式去這個 URL 拿資料，就能知道有哪些新文章。',
      whyNotKnown: '現在很多年輕人不知道 RSS，因為社群媒體（Facebook、IG、TikTok）已經取代了 RSS 的功能——它們用演算法幫你「整理」你想看的東西。但 RSS 的優點是：沒有演算法干預，你訂閱什麼就看什麼，而且可以讓程式自動讀取。',
      howToFind: [
        '在網站 URL 後面加 /feed 或 /rss（許多 WordPress 網站有這個）',
        '用瀏覽器搜尋「[網站名稱] RSS feed」',
        '看網站底部是否有 RSS 圖示（橘色的訊號圖示）',
        '用工具如 rsshub.app 幫沒有 RSS 的網站產生 RSS'
      ],
      exampleFeed: `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>TechCrunch</title>
    <link>https://techcrunch.com</link>
    <item>
      <title>OpenAI 發布新模型</title>
      <link>https://techcrunch.com/2026/03/28/openai-new-model</link>
      <pubDate>Fri, 28 Mar 2026 08:00:00 GMT</pubDate>
      <description>OpenAI 今日宣布...</description>
    </item>
    <item>
      <title>Meta 推出 AR 眼鏡</title>
      <link>https://techcrunch.com/2026/03/27/meta-ar-glasses</link>
      <pubDate>Thu, 27 Mar 2026 10:30:00 GMT</pubDate>
      <description>Meta 昨日發布...</description>
    </item>
  </channel>
</rss>`
    },
    scrapingSection: {
      title: '沒有 RSS 怎麼辦？— 網頁爬蟲（Web Scraping）',
      analogy: '如果 RSS 是「訂報紙到家」，那爬蟲就是「派一個助理去報攤把報紙的重要內容抄回來」。\n\n有些網站（如 Facebook 粉專、Instagram、大多數企業官網）根本不提供 RSS。這時候就需要爬蟲：讓程式打開網頁，找到你要的資料，然後把它抄下來。',
      steps: [
        { step: '打開網頁', desc: '程式用 Headless Browser（無頭瀏覽器）打開目標網址，就像你打開 Chrome 一樣。', code: '// Antigravity 中：\n// 直接告訴 AI「幫我打開 https://example.com/news」' },
        { step: '等待載入', desc: '現代網站很多內容是「動態載入」的（需要等 JavaScript 執行完才出現）。程式需要等待這些內容出現。', code: '// 在 Skill 中描述：\n// 「等待頁面完全載入後再讀取內容」' },
        { step: '定位資料', desc: '告訴程式「那個標題在哪裡」。通常透過 CSS 選擇器或文字特徵來找到特定元素。', code: '// 例如：找到所有 class 為 "article-title" 的元素\ndocument.querySelectorAll(".article-title")' },
        { step: '提取資料', desc: '讀取找到的元素的文字內容，存成變數備用。', code: '// 取出文字內容\nconst title = element.innerText;\nconst link = element.href;' },
        { step: '儲存或處理', desc: '把抓到的資料存進資料庫，或直接交給 AI 分析。', code: '// 在 Skill 中描述：\n// 「把抓到的標題和連結存進 Supabase 的 articles 表」' }
      ],
      vsRss: [
        { aspect: '穩定性', rss: '高（格式固定，不易變動）', scraping: '中（網站改版就要更新）' },
        { aspect: '速度', rss: '快', scraping: '慢（需要載入整個網頁）' },
        { aspect: '可用性', rss: '只有有提供的網站', scraping: '幾乎所有公開網頁' },
        { aspect: '資料量', rss: '通常只有最新幾篇', scraping: '可以抓很多（要注意不要造成伺服器負擔）' },
        { aspect: '在 Antigravity', rss: '用 HTTP Request 拿 RSS XML', scraping: '用 Browser Sub-Agent 操作瀏覽器' }
      ]
    },
    quiz: [
      {
        question: 'RSS Feed 最大的優點是什麼？',
        options: ['可以破解付費內容', '讓程式自動訂閱並讀取網站的最新文章，不需要一直去網站查看', '比 API 速度更快', '可以訂閱任何網站'],
        correct: 1,
        explanation: 'RSS 提供標準格式的文章清單，程式只要定期去讀這個 URL，就能知道有哪些新文章。就像訂報紙到家，不用每天跑去報攤。'
      },
      {
        question: '什麼情況下會選擇用「網頁爬蟲」而不是 RSS？',
        options: ['當網站速度很慢時', '當你想要匿名瀏覽時', '當目標網站沒有提供 RSS Feed 或 API 時', '當資料量很小時'],
        correct: 2,
        explanation: '如果網站有 RSS 就用 RSS（更穩定），有 API 就用 API（更快）。爬蟲是在「沒有更好選擇」時的方案。Facebook、Instagram 等不提供開放 RSS 的平台，通常需要爬蟲。'
      },
      {
        question: '在 Antigravity IDE 中，要做網頁爬蟲，應該使用哪個工具？',
        options: ['MCP Server', 'Browser Sub-Agent（瀏覽器子代理）', 'Webhook', 'Google Sheets MCP'],
        correct: 1,
        explanation: 'Antigravity 的 Browser Sub-Agent 可以操作無頭瀏覽器，打開網頁、等待載入、讀取內容。這就是在 Antigravity 中進行網頁爬蟲的方式。'
      }
    ]
  },

  // ── JSON 結構化格式 ──
  json: {
    intro: 'JSON（JavaScript Object Notation）是一種「資料交換格式」。當程式和程式之間需要傳遞資料，或 AI 需要輸出格式化的結果，通常就用 JSON。',
    analogy: '想像你要填一份「新員工入職表格」：\n姓名：___\n年齡：___\n職位：___\n\nJSON 就是電腦版的「固定格式表格」。不是讓人填，而是讓程式讀。',
    basicSyntax: {
      rules: [
        '用 { } 大括號包住整份資料',
        '用 " " 雙引號包住所有「欄位名稱」（key）',
        '用 : 冒號分隔名稱和值',
        '不同欄位之間用 , 逗號分隔',
        '字串用雙引號，數字不用，陣列用 [ ]'
      ],
      example: `{
  "name": "小明",
  "age": 28,
  "isVIP": true,
  "tags": ["行銷", "設計", "AI"],
  "address": {
    "city": "台北市",
    "district": "信義區"
  }
}`
    },
    marketingExamples: [
      {
        scenario: '多平台貼文生成器的輸出',
        desc: '讓 AI 用 JSON 輸出三個平台的文案，程式才能自動分別發到不同平台。',
        code: `{
  "facebook": {
    "text": "🎉 新品正式上市！這款產品...",
    "hashtags": ["新品", "上市"]
  },
  "instagram": {
    "text": "✨ 新品來啦！",
    "hashtags": ["新品", "lifestyle", "fashion"]
  },
  "linkedin": {
    "text": "我們很榮幸宣布..."
  }
}`
      },
      {
        scenario: '客戶訊息分類結果',
        desc: '讓 AI 把客戶訊息分類後用 JSON 回覆，程式才能根據類別執行不同動作。',
        code: `{
  "originalMessage": "我的訂單什麼時候到？",
  "category": "order_inquiry",
  "urgency": "normal",
  "autoReply": true,
  "replyTemplate": "ORDER_STATUS",
  "needsHuman": false
}`
      },
      {
        scenario: '競品分析報告',
        desc: '讓 AI 把分析結果結構化，方便程式存入資料庫或自動製作圖表。',
        code: `{
  "competitor": "競品A",
  "analysisDate": "2026-03-28",
  "posts": [
    {
      "title": "春季特賣",
      "likes": 523,
      "comments": 41,
      "sentiment": "positive",
      "topic": "促銷活動"
    }
  ],
  "summary": "本週主推春季折扣活動，互動率比上週成長 15%"
}`
      }
    ],
    quiz: [
      {
        question: '為什麼讓 AI 用 JSON 格式輸出，比用一般文字更好？',
        options: ['JSON 比較省字', '因為 JSON 是固定格式，程式可以自動讀取特定欄位做後續處理', 'AI 用 JSON 輸出比較快', 'JSON 比較安全'],
        correct: 1,
        explanation: '如果 AI 用自然語言回覆，程式很難「找到」特定資訊。但 JSON 格式固定，程式可以精準取出 result["category"] 等欄位，自動執行後續邏輯。'
      },
      {
        question: '以下哪個是合法的 JSON 格式？',
        options: ['{name: "小明", age: 28}', '{"name": "小明", age: 28}', '{"name": "小明", "age": 28}', '[name="小明", age=28]'],
        correct: 2,
        explanation: 'JSON 規定：所有 key（欄位名稱）都必須用雙引號包住。數字不需要引號，但 key 一定要有。選項 A 的 key 沒有引號，選項 B 的 age 沒有引號（key 也要有），所以只有 C 正確。'
      },
      {
        question: '在行銷自動化中，JSON 最常用在哪個環節？',
        options: ['設計網頁版面', 'AI 分析或生成內容後，以固定格式輸出結果供程式繼續處理', '傳送圖片和影片', '設定帳號密碼'],
        correct: 1,
        explanation: 'AI 處理完資料（分類、生成文案、分析情緒）後，如果用 JSON 格式輸出，後續程式就能自動讀取並執行：發到哪個平台、存進哪個資料庫、通知誰。'
      }
    ]
  },

  // ── 條件判斷 / If-Else ──
  ifelse: {
    intro: '條件判斷是程式的「大腦」：根據不同情況，做不同的事。就像你日常生活中無時無刻都在判斷：「如果下雨，就帶傘。否則，就不帶。」',
    analogy: '想像一個客服電話的語音選單：\n「您好，請選擇服務項目：按 1 查詢訂單，按 2 投訴，按 3 轉業務...」\n\n客戶按了什麼，系統就走不同的路線。If-Else 就是讓程式做這件事。',
    flowchart: {
      question: '客戶訊息是什麼類型？',
      branches: [
        { condition: '如果是「詢問問題」', action: '自動回覆 FAQ 答案', icon: '💬' },
        { condition: '如果是「客訴」', action: '標記緊急 + 通知真人客服', icon: '🚨' },
        { condition: '如果是「下訂單」', action: '查詢庫存並確認訂單', icon: '🛒' },
        { condition: '以上都不是', action: '請客戶重新描述需求', icon: '❓' }
      ]
    },
    realExamples: [
      {
        scenario: '自動晨報機器人',
        code: `# 在 Skill 中用自然語言描述：
如果今天是週末（六、日）：
  → 不發送新聞
  → 改發「週末休刊，明日恢復」
如果今天是週一到週五：
  → 正常抓取並發送新聞`,
        pseudocode: `if (today === 'Saturday' || today === 'Sunday') {
  sendMessage("週末休刊，明日恢復");
} else {
  fetchNews();
  summarize();
  sendNewsletter();
}`
      },
      {
        scenario: '客訊自動分流',
        code: `# 在 Skill 中用自然語言描述：
讓 AI 分析收到的訊息，判斷類別：
- 如果類別是「客訴」且情緒是「負面」：
    → 回覆安撫訊息 + 傳送 LINE 通知給客服主管
- 如果類別是「詢問訂單」：
    → 查詢資料庫中的訂單狀態並回覆
- 其他情況：
    → 回覆一般 FAQ`,
        pseudocode: `const result = await AI.classify(message);

if (result.category === 'complaint' && result.sentiment === 'negative') {
  await sendReply(templates.apology);
  await notifyManager(message);
} else if (result.category === 'order_inquiry') {
  const order = await DB.query(result.orderId);
  await sendReply(order.status);
} else {
  await sendReply(templates.faq);
}`
      }
    ],
    quiz: [
      {
        question: '條件判斷（If-Else）在自動化中最主要的用途是什麼？',
        options: ['讓程式跑得更快', '根據不同情況執行不同的動作，實現「智慧分流」', '讓 AI 更聰明', '儲存大量資料'],
        correct: 1,
        explanation: 'If-Else 是自動化的「路口」。收到客訴走這條路，收到一般詢問走那條路。沒有條件判斷，程式對所有情況都只能做同樣一件事。'
      },
      {
        question: '在 Antigravity IDE 中，你想讓 AI「判斷收到的訊息類別，然後做不同回應」，最好的做法是？',
        options: ['寫一大堆 if-else 程式碼', '在 Skill 中用自然語言描述每種情況對應的處理方式', '讓 AI 自己決定怎麼做', '用 Google Sheets 做判斷'],
        correct: 1,
        explanation: '在 Antigravity 中，你可以用自然語言在 Skill 裡描述條件邏輯。AI 會理解你的意圖並執行相應的程式碼，不需要自己寫 if-else。'
      },
      {
        question: '「如果客戶評分低於 3 分，就自動發送致歉 Email」，這段描述中的「如果」對應到程式中的什麼概念？',
        options: ['API', 'Webhook', 'If 條件判斷', 'JSON'],
        correct: 2,
        explanation: '「如果...就...否則...」的結構就是 If-Else。這個例子中：If（評分 < 3）→ 發致歉信；else → 發感謝信。'
      }
    ]
  },

  // ── 資料庫查詢 / 外部系統串接 ──
  database: {
    intro: '自動化流程需要「記憶」和「查詢」。客戶的訂單在哪？過去的貼文數據呢？這些都存在資料庫裡。學會讀寫資料庫，你的 AI 才真的「有記憶」。',
    analogy: '把資料庫想像成一間超級有組織的倉庫：\n• 倉庫本身 = 資料庫（Database）\n• 各個貨架 = 資料表（Table）\n• 每格貨架上的箱子 = 一筆資料（Row）\n• 箱子上的標籤（品名、數量） = 欄位（Column）\n\n查詢資料庫就是告訴倉庫管理員：「幫我找 3 號貨架上、標籤寫著「2026年」的所有箱子。」',
    supabaseIntro: 'Supabase 是 Antigravity 課程主要使用的資料庫服務，類似「雲端版的 Excel 表格」，但功能更強大，可以透過 API 或 MCP 讓 AI 直接讀寫。',
    tableExample: {
      name: 'orders（訂單表）',
      headers: ['id', 'customer_name', 'product', 'status', 'created_at'],
      rows: [
        ['001', '王小明', '行銷工具包', 'shipped', '2026-03-25'],
        ['002', '李美華', 'AI 課程', 'pending', '2026-03-27'],
        ['003', '陳大雄', '諮詢服務', 'completed', '2026-03-28']
      ]
    },
    queryExamples: [
      {
        scenario: '查詢客戶訂單狀態',
        naturalLanguage: '「幫我查訂單編號 001 的狀態」',
        sql: `SELECT status, product
FROM orders
WHERE id = '001';`,
        result: '回傳：status = "shipped"，product = "行銷工具包"'
      },
      {
        scenario: '找出所有未出貨的訂單',
        naturalLanguage: '「列出所有狀態是 pending 的訂單」',
        sql: `SELECT * FROM orders
WHERE status = 'pending'
ORDER BY created_at DESC;`,
        result: '回傳訂單 002 的資料'
      },
      {
        scenario: '新增一筆訂單',
        naturalLanguage: '「新增一筆訂單：客戶張三，購買 AI 工具包」',
        sql: `INSERT INTO orders (customer_name, product, status)
VALUES ('張三', 'AI 工具包', 'pending');`,
        result: '成功新增一筆資料到資料庫'
      }
    ],
    mcpFlow: [
      { step: '1. 設定 Supabase MCP', desc: '在 Antigravity IDE 中連接你的 Supabase 資料庫（MCP 設定）', icon: '🔑' },
      { step: '2. 用自然語言下指令', desc: '直接跟 AI 說「幫我查訂單 #123 的狀態」', icon: '💬' },
      { step: '3. AI 自動查詢', desc: 'AI 透過 MCP 自動產生並執行對應的資料庫查詢', icon: '🔍' },
      { step: '4. 取得結果', desc: 'AI 把查詢結果整理好回覆給你或繼續處理', icon: '✅' }
    ],
    quiz: [
      {
        question: '在自動化流程中，「資料庫」最主要的作用是什麼？',
        options: ['讓網頁跑得更快', '儲存和查詢需要長期保留的資料（如訂單、客戶、歷史紀錄）', '設計網頁版面', '執行 AI 運算'],
        correct: 1,
        explanation: '資料庫就是自動化流程的「長期記憶」。沒有資料庫，程式每次執行完就忘光了。資料庫讓你能儲存訂單、查詢歷史、累積數據。'
      },
      {
        question: '在 Antigravity IDE 中，如何讓 AI 讀寫 Supabase 資料庫？',
        options: ['匯出 CSV 再匯入', '複製貼上 SQL 指令', '透過 Supabase MCP，直接用自然語言告訴 AI 你要做什麼', '寄 Email 給 Supabase 客服'],
        correct: 2,
        explanation: '設定好 Supabase MCP 後，AI 就能直接存取你的資料庫。你不需要會 SQL，只要說「幫我查訂單 123」，AI 會自動寫好查詢並回傳結果。'
      },
      {
        question: '「外部系統串接」和「資料庫查詢」的主要差別是什麼？',
        options: ['沒有差別', '資料庫存自己的資料，外部系統串接是連接第三方服務（如物流、金流系統）', '外部系統比資料庫更快', '資料庫只能存文字'],
        correct: 1,
        explanation: '資料庫（如 Supabase）存的是你自己的資料。外部系統串接（API 呼叫）是去連接別人的服務，例如：查物流狀態（黑貓 API）、查庫存（ERP 系統 API）、發票查詢（政府 API）。'
      }
    ]
  }
};
