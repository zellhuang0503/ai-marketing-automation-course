// ========================================
// 互動式練習元件
// ========================================

// ── 拖拉排序 (DragSort) ──────────────────
const DragSort = {
  _dragging: null,

  render(id, title, hint, items, correctOrder) {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    return `
      <div class="ds-wrap" id="ds-${id}" data-correct='${JSON.stringify(correctOrder)}'>
        <div class="ds-title">${title}</div>
        <p class="ds-hint">💡 ${hint}</p>
        <div class="ds-list" id="ds-list-${id}">
          ${shuffled.map(item => `
            <div class="ds-item" draggable="true" data-id="${item.id}"
              ondragstart="DragSort._onStart(event,'${id}')"
              ondragover="DragSort._onOver(event)"
              ondrop="DragSort._onDrop(event)"
              ondragend="DragSort._onEnd(event)">
              <span class="ds-handle" title="拖拉">⠿</span>
              <span class="ds-num"></span>
              <span class="ds-text">${item.label}</span>
              <span class="ds-move-btns">
                <button class="ds-mv-btn" onclick="DragSort._moveUp(this)" title="往上移">↑</button>
                <button class="ds-mv-btn" onclick="DragSort._moveDown(this)" title="往下移">↓</button>
              </span>
            </div>
          `).join('')}
        </div>
        <div class="ds-actions">
          <button class="btn btn-primary" onclick="DragSort.check('${id}')">確認順序 ✓</button>
          <button class="btn btn-secondary" onclick="DragSort.shuffle('${id}')">重新打亂</button>
        </div>
        <div class="ds-feedback" id="ds-fb-${id}"></div>
      </div>`;
  },

  _onStart(e, _id) {
    DragSort._dragging = e.currentTarget;
    e.currentTarget.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
  },

  _onOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const target = e.currentTarget;
    if (!target.classList.contains('ds-item') || target === DragSort._dragging) return;
    const list = target.parentNode;
    const items = [...list.querySelectorAll('.ds-item')];
    const dragIdx = items.indexOf(DragSort._dragging);
    const targetIdx = items.indexOf(target);
    if (dragIdx < targetIdx) list.insertBefore(DragSort._dragging, target.nextSibling);
    else list.insertBefore(DragSort._dragging, target);
  },

  _onDrop(e) {
    e.preventDefault();
  },

  _onEnd(e) {
    e.currentTarget.classList.remove('dragging');
    DragSort._dragging = null;
  },

  _moveUp(btn) {
    const item = btn.closest('.ds-item');
    const list = item.parentNode;
    const prev = item.previousElementSibling;
    if (prev && prev.classList.contains('ds-item')) list.insertBefore(item, prev);
  },

  _moveDown(btn) {
    const item = btn.closest('.ds-item');
    const list = item.parentNode;
    const next = item.nextElementSibling;
    if (next && next.classList.contains('ds-item')) list.insertBefore(next, item);
  },

  check(id) {
    const wrap = document.getElementById(`ds-${id}`);
    const list = document.getElementById(`ds-list-${id}`);
    const correct = JSON.parse(wrap.dataset.correct);
    const items = [...list.querySelectorAll('.ds-item')];

    items.forEach((item, i) => {
      item.classList.remove('ds-correct', 'ds-wrong');
      item.querySelector('.ds-num').textContent = (i + 1) + '.';
    });

    const current = items.map(el => el.dataset.id);
    let wrongCount = 0;
    items.forEach((item, i) => {
      if (current[i] === correct[i]) item.classList.add('ds-correct');
      else { item.classList.add('ds-wrong'); wrongCount++; }
    });

    const fb = document.getElementById(`ds-fb-${id}`);
    if (wrongCount === 0) {
      fb.innerHTML = `<div class="ex-success">🎉 完全正確！你已掌握這個流程的完整順序。<br><small style="opacity:0.8;">綠色 = 位置正確，每一步都在它該在的地方。</small></div>`;
      items.forEach(item => item.setAttribute('draggable', 'false'));
      wrap.querySelectorAll('.ds-mv-btn').forEach(b => b.disabled = true);
    } else {
      fb.innerHTML = `<div class="ex-error">❌ 有 ${wrongCount} 個步驟位置不對（紅色標示）。再調整看看！</div>`;
    }
  },

  shuffle(id) {
    const list = document.getElementById(`ds-list-${id}`);
    const items = [...list.querySelectorAll('.ds-item')];
    items.forEach(item => {
      item.classList.remove('ds-correct', 'ds-wrong');
      item.querySelector('.ds-num').textContent = '';
      item.setAttribute('draggable', 'true');
      item.querySelectorAll('.ds-mv-btn').forEach(b => b.disabled = false);
    });
    items.sort(() => Math.random() - 0.5).forEach(item => list.appendChild(item));
    document.getElementById(`ds-fb-${id}`).innerHTML = '';
  }
};


// ── 填空練習 (FillBlank) ─────────────────
const FillBlank = {
  render(id, title, segments) {
    // segments: [{type:'text', text:''} | {type:'blank', answers:[], hint:'', width:5}]
    let html = `<div class="fb-wrap" id="fb-${id}">`;
    html += `<div class="fb-title">${title}</div>`;
    html += `<div class="fb-text">`;

    let blankIdx = 0;
    segments.forEach(seg => {
      if (seg.type === 'text') {
        html += `<span>${seg.text}</span>`;
      } else {
        const w = seg.width || Math.max(seg.answers[0].length * 1.6 + 1, 4);
        const bIdx = blankIdx++;
        html += `<span class="fb-blank-wrap">
          <input class="fb-blank" id="fb-${id}-b${bIdx}"
            data-answers='${JSON.stringify(seg.answers)}'
            placeholder="${seg.hint || '？'}"
            style="width:${w}em"
            oninput="FillBlank._onInput('${id}', ${bIdx})"
            onkeydown="if(event.key==='Enter')this.blur()">
          <span class="fb-tick" id="fb-${id}-t${bIdx}"></span>
        </span>`;
      }
    });

    html += `</div>`;
    html += `<div class="fb-actions">
      <button class="btn btn-secondary btn-sm" onclick="FillBlank._showAll('${id}')">查看答案</button>
    </div>`;
    html += `<div class="fb-feedback" id="fb-fb-${id}"></div>`;
    html += `</div>`;
    return html;
  },

  _onInput(id, bIdx) {
    const input = document.getElementById(`fb-${id}-b${bIdx}`);
    const tick = document.getElementById(`fb-${id}-t${bIdx}`);
    const answers = JSON.parse(input.dataset.answers);
    const val = input.value.trim();

    if (!val) {
      input.classList.remove('fb-ok', 'fb-err');
      tick.textContent = '';
      return;
    }

    const correct = answers.some(a => val.toLowerCase() === a.toLowerCase());
    input.classList.toggle('fb-ok', correct);
    input.classList.toggle('fb-err', !correct);
    tick.textContent = correct ? '✓' : '✗';
    tick.style.color = correct ? 'var(--color-accent-success)' : 'var(--color-accent-orange)';

    // Check if all blanks done correctly
    const wrap = document.getElementById(`fb-${id}`);
    const blanks = [...wrap.querySelectorAll('.fb-blank')];
    const allFilled = blanks.every(b => b.value.trim().length > 0);
    const allCorrect = blanks.every(b => {
      const ans = JSON.parse(b.dataset.answers);
      return ans.some(a => b.value.trim().toLowerCase() === a.toLowerCase());
    });
    const fb = document.getElementById(`fb-fb-${id}`);
    if (allFilled && allCorrect) {
      fb.innerHTML = `<div class="ex-success">🎉 全部正確！你完全掌握了這個概念的關鍵詞彙。</div>`;
    } else {
      fb.innerHTML = '';
    }
  },

  _showAll(id) {
    const wrap = document.getElementById(`fb-${id}`);
    const blanks = [...wrap.querySelectorAll('.fb-blank')];
    blanks.forEach((b, bIdx) => {
      const answers = JSON.parse(b.dataset.answers);
      b.value = answers[0];
      b.classList.add('fb-ok');
      b.classList.remove('fb-err');
      const tick = document.getElementById(`fb-${id}-t${bIdx}`);
      if (tick) { tick.textContent = '✓'; tick.style.color = 'var(--color-accent-success)'; }
    });
    document.getElementById(`fb-fb-${id}`).innerHTML = `<div class="ex-info">💡 答案已顯示。理解每個詞的角色，是學好這個概念的關鍵。</div>`;
  }
};


// ── 流程建構器 (FlowBuilder) ─────────────
const FlowBuilder = {
  _state: {},
  _configs: {},

  render(id, config) {
    FlowBuilder._configs[id] = config;
    FlowBuilder._state[id] = {};
    return `
      <div class="flb-wrap" id="flb-${id}">
        <div class="flb-title">${config.title}</div>
        <div class="flb-progress" id="flb-prog-${id}">
          ${config.steps.map((s, i) => `
            <div class="flb-prog-step" id="flb-ps-${id}-${i}">
              <span class="flb-prog-num">${i + 1}</span>
              <span class="flb-prog-label">${s.tag}</span>
            </div>
            ${i < config.steps.length - 1 ? '<span class="flb-prog-arrow">→</span>' : ''}
          `).join('')}
        </div>
        <div class="flb-built" id="flb-built-${id}">
          <span class="flb-built-placeholder">做完選擇後，你的流程會出現在這裡 →</span>
        </div>
        <div class="flb-step-area" id="flb-step-${id}">
          ${FlowBuilder._renderStep(id, 0)}
        </div>
        <div class="flb-result" id="flb-result-${id}" style="display:none;"></div>
      </div>`;
  },

  _renderStep(id, stepIdx) {
    const config = FlowBuilder._configs[id];
    const step = config.steps[stepIdx];
    return `
      <div class="flb-step animate-fadeInUp">
        <div class="flb-step-label">步驟 ${stepIdx + 1} / ${config.steps.length}　▸　${step.tag}</div>
        <div class="flb-step-q">${step.q}</div>
        <div class="flb-options">
          ${step.options.map(opt => `
            <div class="flb-option" onclick="FlowBuilder._choose('${id}', ${stepIdx}, '${opt.value}')">
              <div class="flb-option-icon">${opt.icon}</div>
              <div class="flb-option-label">${opt.label}</div>
              ${opt.desc ? `<div class="flb-option-desc">${opt.desc}</div>` : ''}
            </div>
          `).join('')}
        </div>
      </div>`;
  },

  _choose(id, stepIdx, value) {
    if (!FlowBuilder._state[id]) FlowBuilder._state[id] = {};
    FlowBuilder._state[id][stepIdx] = value;

    const config = FlowBuilder._configs[id];
    const step = config.steps[stepIdx];
    const choice = step.options.find(o => o.value === value);

    // Animate chosen option
    const stepArea = document.getElementById(`flb-step-${id}`);
    const opts = stepArea.querySelectorAll('.flb-option');
    opts.forEach(o => {
      const isChosen = o.querySelector('.flb-option-label')?.textContent === choice.label;
      if (isChosen) o.classList.add('chosen');
      else o.classList.add('unchosen');
    });

    // Mark progress
    const ps = document.getElementById(`flb-ps-${id}-${stepIdx}`);
    if (ps) ps.classList.add('done');

    // Update built display
    const builtEl = document.getElementById(`flb-built-${id}`);
    builtEl.innerHTML = Object.entries(FlowBuilder._state[id]).map(([si, v]) => {
      const s = config.steps[parseInt(si)];
      const o = s.options.find(x => x.value === v);
      return `<div class="built-pill">
        <span class="built-pill-tag">${s.tag}</span>
        <span class="built-pill-icon">${o.icon}</span>
        <span class="built-pill-text">${o.label}</span>
      </div>`;
    }).join('<span class="built-arrow">→</span>');

    // Next step or result
    const nextStep = stepIdx + 1;
    setTimeout(() => {
      if (nextStep < config.steps.length) {
        stepArea.innerHTML = FlowBuilder._renderStep(id, nextStep);
      } else {
        stepArea.innerHTML = '';
        const resultEl = document.getElementById(`flb-result-${id}`);
        resultEl.style.display = '';
        const key = Object.values(FlowBuilder._state[id]).join('+');
        const result = (config.results && (config.results[key] || config.results['default'])) || {
          title: '流程建立完成！',
          desc: '你組合了一個完整的自動化流程。',
          feedback: '試試其他組合，看看不同設計的差異！'
        };
        resultEl.innerHTML = `
          <div class="flb-result-box animate-fadeInUp">
            <div class="flb-result-badge">✅ 你建立了一個自動化流程！</div>
            <div class="flb-result-name">${result.title}</div>
            <div class="flb-result-desc">${result.desc}</div>
            ${result.feedback ? `<div class="flb-result-feedback">${result.feedback}</div>` : ''}
            <button class="btn btn-secondary" style="margin-top:var(--space-4);" onclick="FlowBuilder._reset('${id}')">🔄 重新嘗試其他組合</button>
          </div>`;
      }
    }, 350);
  },

  _reset(id) {
    FlowBuilder._state[id] = {};
    document.getElementById(`flb-built-${id}`).innerHTML =
      `<span class="flb-built-placeholder">做完選擇後，你的流程會出現在這裡 →</span>`;
    document.getElementById(`flb-step-${id}`).innerHTML = FlowBuilder._renderStep(id, 0);
    const resultEl = document.getElementById(`flb-result-${id}`);
    resultEl.style.display = 'none';
    resultEl.innerHTML = '';
    document.querySelectorAll(`[id^="flb-ps-${id}-"]`).forEach(el => el.classList.remove('done'));
  }
};


// ── 配對連連看 (MatchPair) ────────────────
const MatchPair = {
  _selected: {},
  _pairs: {},
  _colors: ['#0d9488', '#f97316', '#8b5cf6', '#06b6d4', '#84cc16'],

  render(id, title, hint, leftItems, rightItems, correctPairs) {
    MatchPair._pairs[id] = {};
    MatchPair._selected[id] = null;
    const shuffled = [...rightItems].sort(() => Math.random() - 0.5);
    return `
      <div class="mp-wrap" id="mp-${id}" data-correct='${JSON.stringify(correctPairs)}'>
        <div class="mp-title">${title}</div>
        <p class="mp-hint">💡 ${hint}</p>
        <div class="mp-grid">
          <div class="mp-col" id="mp-left-${id}">
            ${leftItems.map(item => `
              <div class="mp-item mp-left-item" id="mp-l-${id}-${item.id}" data-id="${item.id}"
                onclick="MatchPair._clickLeft('${id}','${item.id}')">
                ${item.icon ? `<span class="mp-icon">${item.icon}</span>` : ''}
                <span class="mp-label">${item.label}</span>
              </div>
            `).join('')}
          </div>
          <div class="mp-col" id="mp-right-${id}">
            ${shuffled.map(item => `
              <div class="mp-item mp-right-item" id="mp-r-${id}-${item.id}" data-id="${item.id}"
                onclick="MatchPair._clickRight('${id}','${item.id}')">
                ${item.icon ? `<span class="mp-icon">${item.icon}</span>` : ''}
                <span class="mp-label">${item.label}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="mp-actions">
          <button class="btn btn-primary" onclick="MatchPair.check('${id}')">確認配對 ✓</button>
          <button class="btn btn-secondary" onclick="MatchPair.reset('${id}')">重新配對</button>
        </div>
        <div class="mp-feedback" id="mp-fb-${id}"></div>
      </div>`;
  },

  _clickLeft(id, leftId) {
    document.querySelectorAll(`#mp-left-${id} .mp-item`).forEach(el => el.classList.remove('selecting'));
    if (MatchPair._selected[id] === leftId) { MatchPair._selected[id] = null; return; }
    MatchPair._selected[id] = leftId;
    document.getElementById(`mp-l-${id}-${leftId}`).classList.add('selecting');
  },

  _clickRight(id, rightId) {
    const selLeft = MatchPair._selected[id];
    if (!selLeft) return;
    const pairs = MatchPair._pairs[id];
    // Un-pair if rightId already paired
    const prevLeft = Object.keys(pairs).find(l => pairs[l] === rightId);
    if (prevLeft) { delete pairs[prevLeft]; MatchPair._clearStyle(id, prevLeft, rightId); }
    // Un-pair left's old match
    if (pairs[selLeft]) { const oldRight = pairs[selLeft]; delete pairs[selLeft]; MatchPair._clearStyle(id, selLeft, oldRight); }
    // New pair
    pairs[selLeft] = rightId;
    const colorIdx = Object.keys(pairs).length - 1;
    const color = MatchPair._colors[colorIdx % MatchPair._colors.length];
    const lEl = document.getElementById(`mp-l-${id}-${selLeft}`);
    const rEl = document.getElementById(`mp-r-${id}-${rightId}`);
    [lEl, rEl].forEach(el => { if (el) { el.style.borderColor = color; el.style.background = color + '18'; el.style.color = color; } });
    lEl?.classList.remove('selecting');
    MatchPair._selected[id] = null;
  },

  _clearStyle(id, leftId, rightId) {
    [document.getElementById(`mp-l-${id}-${leftId}`), document.getElementById(`mp-r-${id}-${rightId}`)].forEach(el => {
      if (el) { el.style.borderColor = ''; el.style.background = ''; el.style.color = ''; el.classList.remove('mp-correct', 'mp-wrong'); }
    });
  },

  check(id) {
    const correct = JSON.parse(document.getElementById(`mp-${id}`).dataset.correct);
    const pairs = MatchPair._pairs[id];
    const total = Object.keys(correct).length;
    let ok = 0;
    Object.keys(correct).forEach(lid => {
      const lEl = document.getElementById(`mp-l-${id}-${lid}`);
      const rEl = pairs[lid] ? document.getElementById(`mp-r-${id}-${pairs[lid]}`) : null;
      const pass = pairs[lid] === correct[lid];
      if (pass) { ok++; lEl?.classList.add('mp-correct'); rEl?.classList.add('mp-correct'); }
      else { lEl?.classList.add('mp-wrong'); rEl?.classList.add('mp-wrong'); }
    });
    const fb = document.getElementById(`mp-fb-${id}`);
    fb.innerHTML = ok === total
      ? `<div class="ex-success">🎉 全部配對正確！你已掌握每個工具對應的使用場景。</div>`
      : `<div class="ex-error">❌ 有 ${total - ok} 組配對不對（紅色標示）。再調整看看！</div>`;
  },

  reset(id) {
    MatchPair._pairs[id] = {};
    MatchPair._selected[id] = null;
    document.querySelectorAll(`#mp-${id} .mp-item`).forEach(el => {
      el.style.borderColor = ''; el.style.background = ''; el.style.color = '';
      el.classList.remove('selecting', 'mp-correct', 'mp-wrong');
    });
    const rc = document.getElementById(`mp-right-${id}`);
    [...rc.querySelectorAll('.mp-item')].sort(() => Math.random() - 0.5).forEach(el => rc.appendChild(el));
    document.getElementById(`mp-fb-${id}`).innerHTML = '';
  }
};


// ── 分類練習 (Classify) ───────────────────
const Classify = {
  _state: {},

  render(id, title, hint, items, categories, correctMap) {
    Classify._state[id] = {};
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    return `
      <div class="cl-wrap" id="cl-${id}" data-correct='${JSON.stringify(correctMap)}'>
        <div class="cl-title">${title}</div>
        <p class="cl-hint">💡 ${hint}</p>
        <div class="cl-items" id="cl-items-${id}">
          ${shuffled.map(item => `
            <div class="cl-item" id="cl-item-${id}-${item.id}" data-id="${item.id}">
              <span class="cl-item-text">${item.icon ? item.icon + ' ' : ''}${item.label}</span>
              <div class="cl-item-btns">
                ${categories.map(cat => `
                  <button class="cl-cat-btn" data-cat="${cat.value}"
                    onclick="Classify._assign('${id}','${item.id}','${cat.value}')">
                    ${cat.label}
                  </button>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
        <div class="cl-legend">
          ${categories.map(cat => `<span class="cl-legend-item">${cat.label}</span>`).join('')}
        </div>
        <div class="cl-actions">
          <button class="btn btn-primary" onclick="Classify.check('${id}')">確認分類 ✓</button>
          <button class="btn btn-secondary" onclick="Classify.reset('${id}')">重新分類</button>
        </div>
        <div class="cl-feedback" id="cl-fb-${id}"></div>
      </div>`;
  },

  _assign(id, itemId, catValue) {
    Classify._state[id][itemId] = catValue;
    const item = document.getElementById(`cl-item-${id}-${itemId}`);
    item.querySelectorAll('.cl-cat-btn').forEach(b => b.classList.toggle('active', b.dataset.cat === catValue));
    item.classList.remove('cl-correct', 'cl-wrong');
  },

  check(id) {
    const correct = JSON.parse(document.getElementById(`cl-${id}`).dataset.correct);
    const state = Classify._state[id];
    const total = Object.keys(correct).length;
    let ok = 0;
    let unset = 0;
    document.querySelectorAll(`#cl-${id} .cl-item`).forEach(item => {
      const iid = item.dataset.id;
      item.classList.remove('cl-correct', 'cl-wrong');
      if (!state[iid]) { unset++; return; }
      if (state[iid] === correct[iid]) { item.classList.add('cl-correct'); ok++; }
      else item.classList.add('cl-wrong');
    });
    const fb = document.getElementById(`cl-fb-${id}`);
    if (unset > 0) fb.innerHTML = `<div class="ex-error">還有 ${unset} 個項目尚未分類，全部選好再確認！</div>`;
    else if (ok === total) fb.innerHTML = `<div class="ex-success">🎉 全部分類正確！你已清楚分辨哪些任務適合自動化、哪些需要人工。</div>`;
    else fb.innerHTML = `<div class="ex-error">❌ 有 ${total - ok} 個分類不正確（紅色標示）。想想哪些任務有固定規則可以程式化？</div>`;
  },

  reset(id) {
    Classify._state[id] = {};
    document.querySelectorAll(`#cl-${id} .cl-item`).forEach(item => {
      item.classList.remove('cl-correct', 'cl-wrong');
      item.querySelectorAll('.cl-cat-btn').forEach(b => b.classList.remove('active'));
    });
    document.getElementById(`cl-fb-${id}`).innerHTML = '';
  }
};


// ── Markdown 即時預覽 (MarkdownLive) ──────
const MarkdownLive = {
  _configs: {},
  _done: {},

  render(id, intro, startText, challenges) {
    MarkdownLive._configs[id] = challenges;
    MarkdownLive._done[id] = new Set();
    return `
      <div class="mde-wrap" id="mde-${id}">
        <p class="mde-intro">${intro}</p>
        <div class="mde-challenges">
          ${challenges.map((c, i) => `
            <div class="mde-ch" id="mde-ch-${id}-${i}">
              <span class="mde-ch-num">${i + 1}</span>
              <span class="mde-ch-text">${c.task}</span>
              <span class="mde-ch-tick" id="mde-ct-${id}-${i}">○</span>
            </div>
          `).join('')}
        </div>
        <div class="mde-editor">
          <div class="mde-pane">
            <div class="mde-pane-label">✏️ 輸入（Markdown 語法）</div>
            <textarea class="mde-ta" id="mde-ta-${id}"
              oninput="MarkdownLive._update('${id}')"
              spellcheck="false">${startText}</textarea>
          </div>
          <div class="mde-pane">
            <div class="mde-pane-label">👁️ 即時預覽（渲染結果）</div>
            <div class="mde-preview" id="mde-pv-${id}"></div>
          </div>
        </div>
        <div class="mde-fb" id="mde-fb-${id}"></div>
      </div>`;
  },

  _md2html(text) {
    const lines = text.split('\n');
    const out = [];
    let inUL = false;
    for (const line of lines) {
      let l = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      if (/^### /.test(line)) { if (inUL) { out.push('</ul>'); inUL = false; } out.push(`<h3>${MarkdownLive._inline(l.slice(4))}</h3>`); continue; }
      if (/^## /.test(line))  { if (inUL) { out.push('</ul>'); inUL = false; } out.push(`<h2>${MarkdownLive._inline(l.slice(3))}</h2>`); continue; }
      if (/^# /.test(line))   { if (inUL) { out.push('</ul>'); inUL = false; } out.push(`<h1>${MarkdownLive._inline(l.slice(2))}</h1>`); continue; }
      if (/^- /.test(line))   { if (!inUL) { out.push('<ul>'); inUL = true; } out.push(`<li>${MarkdownLive._inline(l.slice(2))}</li>`); continue; }
      if (inUL) { out.push('</ul>'); inUL = false; }
      if (l.trim() === '') { out.push('<br>'); continue; }
      out.push(`<p>${MarkdownLive._inline(l)}</p>`);
    }
    if (inUL) out.push('</ul>');
    return out.join('');
  },

  _inline(l) {
    return l
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code>$1</code>');
  },

  _update(id) {
    const text = document.getElementById(`mde-ta-${id}`).value;
    document.getElementById(`mde-pv-${id}`).innerHTML = MarkdownLive._md2html(text);
    const challenges = MarkdownLive._configs[id];
    let allDone = true;
    challenges.forEach((c, i) => {
      const passed = c.check === 'regex'
        ? new RegExp(c.pattern).test(text)
        : text.includes(c.pattern);
      const tick = document.getElementById(`mde-ct-${id}-${i}`);
      const chEl = document.getElementById(`mde-ch-${id}-${i}`);
      if (passed) { MarkdownLive._done[id].add(i); tick.textContent = '✅'; chEl.classList.add('ch-done'); }
      else if (!MarkdownLive._done[id].has(i)) { tick.textContent = '○'; chEl.classList.remove('ch-done'); }
      if (!MarkdownLive._done[id].has(i)) allDone = false;
    });
    const fb = document.getElementById(`mde-fb-${id}`);
    if (allDone && challenges.length > 0) fb.innerHTML = `<div class="ex-success">🎉 所有挑戰完成！你已掌握 Markdown 的核心語法，可以開始撰寫 Skill 檔案了。</div>`;
    else fb.innerHTML = '';
  },

  init(id) {
    MarkdownLive._update(id);
  }
};
