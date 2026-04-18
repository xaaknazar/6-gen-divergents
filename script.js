(function () {
  'use strict';

  const state = {
    name: '',
    email: '',
    current: 0,
    answers: new Array(QUESTIONS.length).fill(null),
    startedAt: null
  };

  const $ = (id) => document.getElementById(id);

  // ===== Views =====
  const views = {
    intro:   $('view-intro'),
    test:    $('view-test'),
    results: $('view-results')
  };
  function showView(name) {
    Object.entries(views).forEach(([k, el]) => { el.hidden = k !== name; });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    $('restartBtn').hidden = name === 'intro';
  }

  // ===== Intro =====
  function renderHeroGeniuses() {
    const wrap = document.querySelector('.hero-geniuses');
    wrap.innerHTML = GENIUS_ORDER.map((k) => {
      const g = GENIUSES[k];
      return `
        <div class="hero-genius" style="--g-color:${g.color}">
          <span class="g-icon" style="color:${g.color}">${g.icon}</span>
          <span class="g-name">${g.name}</span>
        </div>`;
    }).join('');
  }

  function startTest() {
    const name = $('inp-name').value.trim();
    const email = $('inp-email').value.trim();
    const err = $('startError');
    err.hidden = true;

    if (name.length < 2) {
      err.textContent = 'Укажите имя и фамилию';
      err.hidden = false;
      return;
    }
    if (!email) {
      err.textContent = 'Укажите email';
      err.hidden = false;
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      err.textContent = 'Проверьте email — кажется, он некорректный';
      err.hidden = false;
      return;
    }
    state.name = name;
    state.email = email;
    state.current = 0;
    state.answers = new Array(QUESTIONS.length).fill(null);
    state.startedAt = new Date().toISOString();

    showView('test');
    renderQuestion();
  }

  // ===== Test =====
  function renderQuestion() {
    const i = state.current;
    const q = QUESTIONS[i];

    $('q-num').textContent = q.n;
    $('q-text').textContent = q.text;
    $('progress-count').textContent = `${i + 1} из ${QUESTIONS.length}`;
    const pct = Math.round(((i + 1) / QUESTIONS.length) * 100);
    $('progress-percent').textContent = `${pct}%`;
    $('progress-fill').style.width = `${pct}%`;

    const wrap = $('q-answers');
    const selected = state.answers[i];
    wrap.innerHTML = ANSWER_OPTIONS.map((opt) => `
      <button type="button"
              class="answer-btn ${selected === opt.value ? 'selected' : ''}"
              data-value="${opt.value}">
        <span class="dot"></span>
        <span class="label">${opt.label}</span>
      </button>
    `).join('');

    wrap.querySelectorAll('.answer-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const v = Number(btn.dataset.value);
        state.answers[i] = v;
        wrap.querySelectorAll('.answer-btn').forEach((b) => b.classList.remove('selected'));
        btn.classList.add('selected');

        // Advance (or finish) with a slight delay for feedback
        setTimeout(() => {
          if (i < QUESTIONS.length - 1) {
            state.current = i + 1;
            renderQuestion();
          } else {
            finishTest();
          }
        }, 180);
      });
    });

    // Animate card in
    const card = $('question-card');
    card.style.animation = 'none';
    // eslint-disable-next-line no-unused-expressions
    card.offsetHeight;
    card.style.animation = '';

    $('prevBtn').disabled = i === 0;
  }

  function prevQuestion() {
    if (state.current > 0) {
      state.current -= 1;
      renderQuestion();
    }
  }

  // ===== Scoring =====
  function computeScores() {
    const scores = { W: 0, I: 0, D: 0, G: 0, E: 0, T: 0 };
    QUESTIONS.forEach((q, idx) => {
      const a = state.answers[idx];
      if (typeof a === 'number') scores[q.type] += a;
    });
    const max = 7 * 3; // 7 questions per type × max 3 = 21
    const ranked = GENIUS_ORDER
      .map((k) => ({ key: k, score: scores[k], pct: scores[k] / max }))
      .sort((a, b) => b.score - a.score);
    return { scores, max, ranked };
  }

  // ===== Results =====
  function renderCoverGears() {
    const wrap = $('cover-gears');
    if (!wrap) return;
    wrap.innerHTML = GENIUS_ORDER.map((k) => {
      const g = GENIUSES[k];
      return `
        <div class="cover-gear" style="--g-color:${g.color}">
          <span class="cover-gear-icon">${g.icon}</span>
          <span class="cover-gear-label">${g.name}</span>
        </div>`;
    }).join('');
  }

  function finishTest() {
    const result = computeScores();
    renderResults(result);
    showView('results');
    submitToSheets(result);
  }

  function renderResults(result) {
    const { scores, max, ranked } = result;

    $('r-name').textContent = state.name;
    renderCoverGears();

    // Top 2 = Working Geniuses
    const top = ranked.slice(0, 2);
    const mid = ranked.slice(2, 4);
    const low = ranked.slice(4, 6);

    $('top-geniuses').innerHTML = top.map((r) => renderPill(r)).join('');
    $('mid-geniuses').innerHTML = mid.map((r) => renderPill(r)).join('');
    $('low-geniuses').innerHTML = low.map((r) => renderPill(r)).join('');

    // Detail cards (full list, sorted by score)
    $('results-details').innerHTML = ranked.map((r) => {
      const g = GENIUSES[r.key];
      return `
        <div class="detail-card" style="--g-color:${g.color}">
          <div class="detail-header">
            <div class="detail-mark" style="background:${g.colorSoft};color:${g.color}">${g.icon}</div>
            <div>
              <div class="detail-title">${g.name}</div>
              <div class="detail-sub">${g.subtitle}</div>
            </div>
            <div class="detail-score" style="color:${g.color}">${Math.round(r.pct * 100)}<span style="color:var(--text-muted);font-size:14px;font-weight:500">%</span></div>
          </div>
          <p class="detail-desc">${g.description}</p>
          <div class="detail-meta">
            <div class="meta-row"><span class="meta-label">Сила</span><span class="meta-value">${g.strength}</span></div>
            <div class="meta-row"><span class="meta-label">Тень</span><span class="meta-value">${g.shadow}</span></div>
          </div>
        </div>`;
    }).join('');

    // Print report
    renderPrintReport(top, mid, low);
  }

  const SHORT_DEFS = {
    W: 'замечает необходимость улучшений и перемен',
    I: 'подтверждает важность задачи и рождает идеи и решения',
    D: 'оценивает жизнеспособность идеи или решения',
    G: 'создаёт импульс и заряжает людей действовать',
    E: 'подхватывает инициативу и помогает её реализовать',
    T: 'доводит дело до результата и проверяет, что цель достигнута'
  };

  const PRINT_PAGES = [
    {
      key: 'geniuses',
      variant: 'top',
      accent: '#10b981',
      accentSoft: 'rgba(16, 185, 129, 0.14)',
      label: 'РАБОЧИЙ ГЕНИЙ',
      title: 'Твои рабочие гении',
      icon: '↑',
      intro: (a, b) => `По результатам теста, твои рабочие гении — <b>${a}</b> и <b>${b}</b>. Это деятельность, которая приносит тебе радость, энергию и увлечённость. Поэтому ты особенно силён в этих областях.`
    },
    {
      key: 'competencies',
      variant: 'mid',
      accent: '#f59e0b',
      accentSoft: 'rgba(245, 158, 11, 0.14)',
      label: 'КОМПЕТЕНЦИЯ',
      title: 'Твои компетенции',
      icon: '≈',
      intro: (a, b) => `По результатам теста, твои компетенции — <b>${a}</b> и <b>${b}</b>. Эта деятельность не вызывает ни полного восторга, ни отторжения. Важно понимать свои компетенции: большинство людей справляются в этих областях достаточно хорошо какое‑то время, но устают, если нет возможности опираться на настоящие гении.`
    },
    {
      key: 'frustrations',
      variant: 'low',
      accent: '#ef4444',
      accentSoft: 'rgba(239, 68, 68, 0.14)',
      label: 'ФРУСТРАЦИЯ',
      title: 'Твои фрустрации',
      icon: '↓',
      intro: (a, b) => `По результатам теста, твои фрустрации — <b>${a}</b> и <b>${b}</b>. Знать свои фрустрации важно по двум причинам. Во‑первых, чтобы не проводить в них слишком много времени — это ведёт к усталости и выгоранию. Во‑вторых, чтобы не винить себя за то, что ты не одарён от природы именно в этих областях.`
    }
  ];

  function renderPrintReport(top, mid, low) {
    const container = $('print-report');
    if (!container) return;
    const groups = [top, mid, low];

    const cover = renderCoverPage();
    const overview = renderOverviewPage();
    const summary = renderSummaryPage(top, mid, low);
    const details = PRINT_PAGES.map((page, i) => renderDetailPage(page, groups[i])).join('');

    container.innerHTML = cover + overview + summary + details;
  }

  function renderCoverPage() {
    const gears = GENIUS_ORDER.map((k) => {
      const g = GENIUSES[k];
      return `
        <div class="pp-cover-chip" style="background:${g.color}">
          <span>${g.icon}</span>
        </div>`;
    }).join('');

    return `
      <section class="print-page pp-cover">
        <div class="pp-cover-top">
          <span class="pp-cover-eyebrow">ОТЧЁТ ПО РЕЗУЛЬТАТАМ</span>
        </div>
        <div class="pp-cover-body">
          <h1 class="pp-cover-title">
            <span class="pp-cover-gradient">6 ТИПОВ</span>
            <span class="pp-cover-strong">РАБОЧЕГО</span>
            <span class="pp-cover-strong">ГЕНИЯ</span>
          </h1>
          <div class="pp-cover-row">${gears}</div>
          <p class="pp-cover-subtitle">Рабочий гений <b>${state.name}</b> раскрыт</p>
          <div class="pp-cover-cta">
            <span class="pp-cover-cta-text">Открой дары,<br>которые ты приносишь в работу</span>
            <span class="pp-cover-cta-arrow">↓</span>
          </div>
        </div>
        <div class="pp-cover-footer">
          <span class="pp-cover-powered">Сделано в</span>
          <span class="pp-cover-brand">Divergents</span>
        </div>
      </section>`;
  }

  function renderOverviewPage() {
    const diagram = GENIUS_ORDER.map((k, idx) => {
      const g = GENIUSES[k];
      const row = idx % 2 === 0 ? 'top' : 'bottom';
      return `
        <div class="pp-ov-gear" data-row="${row}" style="--g-color:${g.color}">
          <div class="pp-ov-label">${g.name}</div>
          <div class="pp-ov-body">${gearSVG(k, g.color)}</div>
        </div>`;
    }).join('');

    const defs = GENIUS_ORDER.map((k) => {
      const g = GENIUSES[k];
      return `
        <div class="pp-ov-def">
          <div class="pp-ov-def-term" style="color:${g.color}">${g.name.toUpperCase()}</div>
          <div class="pp-ov-def-desc">${SHORT_DEFS[k]}</div>
        </div>`;
    }).join('');

    return `
      <section class="print-page pp-overview">
        <header class="pp-banner"><span class="pp-section">ОБЗОР</span></header>
        <div class="pp-body">
          <h1 class="pp-title">Кратко о рабочих гениях</h1>
          <p class="pp-intro">
            У каждого человека есть природные таланты в работе. Существует шесть типов, и каждый из них
            необходим, чтобы довести любое дело до результата. Два из шести — это то, что мы называем
            <b>рабочими гениями</b>: деятельность, которая даёт радость, энергию и увлечённость. Ещё два —
            это <b>рабочие фрустрации</b>: они забирают силы. Оставшиеся два — <b>рабочие компетенции</b>:
            в них можно работать нормально какое‑то время, но они не питают и не истощают.
          </p>
          <p class="pp-intro">
            Шесть типов образуют единый поток, необходимый для реализации любого проекта. Каждый тип
            получает импульс от соседа и передаёт его дальше — от Задумки к Доводке.
          </p>

          <h2 class="pp-subtitle">ШЕСТЬ ТИПОВ</h2>
          <div class="pp-ov-diagram">${diagram}</div>

          <div class="pp-ov-list">${defs}</div>
        </div>
        <div class="pp-page-foot"><span>${state.name}</span><span>divergents.kz</span></div>
      </section>`;
  }

  function renderSummaryPage(top, mid, low) {
    const card = (pair, page) => {
      const aName = GENIUSES[pair[0].key].name;
      const bName = GENIUSES[pair[1].key].name;
      const items = pair.map((r) => {
        const g = GENIUSES[r.key];
        return `
          <div class="pp-sum-item">
            <div class="pp-sum-mark" style="color:${g.color};background:${g.colorSoft}">${g.icon}</div>
            <div class="pp-sum-text">${g.tagline}</div>
          </div>`;
      }).join('');
      return `
        <div class="pp-sum-card pp-sum-${page.variant}" style="--pp-accent:${page.accent};--pp-accent-soft:${page.accentSoft}">
          <div class="pp-sum-head">
            <span class="pp-sum-icon">${page.icon}</span>
            <span class="pp-sum-label">${page.label}</span>
          </div>
          <p class="pp-sum-desc">Твои области <b>${page.label.toLowerCase()}</b> — <b>${aName}</b> и <b>${bName}</b>.</p>
          <div class="pp-sum-items">${items}</div>
        </div>`;
    };

    return `
      <section class="print-page pp-summary">
        <header class="pp-banner"><span class="pp-section">РЕЗУЛЬТАТЫ</span></header>
        <div class="pp-body">
          <h1 class="pp-title">Твои результаты</h1>
          <p class="pp-intro">${state.name}, ниже — краткая сводка результатов твоего теста.</p>
          ${card(top, PRINT_PAGES[0])}
          ${card(mid, PRINT_PAGES[1])}
          ${card(low, PRINT_PAGES[2])}
        </div>
        <div class="pp-page-foot"><span>${state.name}</span><span>divergents.kz</span></div>
      </section>`;
  }

  function renderDetailPage(page, pair) {
    const activeKeys = new Set(pair.map((r) => r.key));
    const aName = GENIUSES[pair[0].key].name;
    const bName = GENIUSES[pair[1].key].name;

    const gears = GENIUS_ORDER.map((k, idx) => {
      const g = GENIUSES[k];
      const active = activeKeys.has(k);
      const row = (idx % 2 === 0) ? 'top' : 'bottom';
      return `
        <div class="pp-gear ${active ? 'is-active' : ''}" data-row="${row}" style="${active ? `--pp-accent:${page.accent}` : ''}">
          <div class="pp-gear-label">${g.name}</div>
          <div class="pp-gear-body">
            ${gearSVG(k, active ? page.accent : null)}
          </div>
        </div>`;
    }).join('');

    const cols = pair.map((r) => {
      const g = GENIUSES[r.key];
      return `
        <div class="pp-col">
          <div class="pp-col-title" style="color:${page.accent}">${g.name.toUpperCase()}</div>
          <p class="pp-col-text">${g.description}</p>
          <div class="pp-col-meta">
            <div><span>Сила:</span> ${g.strength}</div>
            <div><span>Тень:</span> ${g.shadow}</div>
          </div>
        </div>`;
    }).join('');

    return `
      <section class="print-page pp-detail" data-variant="${page.key}" style="--pp-accent:${page.accent}">
        <header class="pp-banner"><span class="pp-section">РЕЗУЛЬТАТЫ</span></header>
        <div class="pp-body">
          <h1 class="pp-title">${page.title}</h1>
          <p class="pp-intro">${page.intro(aName.toUpperCase(), bName.toUpperCase())}</p>
          <div class="pp-gears">${gears}</div>
          <div class="pp-cols">${cols}</div>
        </div>
        <div class="pp-page-foot"><span>${state.name}</span><span>divergents.kz</span></div>
      </section>`;
  }

  function gearSVG(letter, activeColor) {
    const isActive = Boolean(activeColor);
    const fill = isActive ? activeColor : '#d4d8e0';
    const stroke = isActive ? activeColor : '#b8bdc8';
    const inner = '#ffffff';
    const txt = isActive ? activeColor : '#a0a6b4';
    return `
<svg viewBox="-52 -52 104 104" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g fill="${fill}" stroke="${stroke}" stroke-width="1.5" stroke-linejoin="round">
    <path d="M -8 -46 L 8 -46 L 11 -37 L 20 -34 L 28 -40 L 40 -28 L 34 -20 L 37 -11 L 46 -8 L 46 8 L 37 11 L 34 20 L 40 28 L 28 40 L 20 34 L 11 37 L 8 46 L -8 46 L -11 37 L -20 34 L -28 40 L -40 28 L -34 20 L -37 11 L -46 8 L -46 -8 L -37 -11 L -34 -20 L -40 -28 L -28 -40 L -20 -34 L -11 -37 Z" />
  </g>
  <circle r="22" fill="${inner}" stroke="${stroke}" stroke-width="1.5" />
  <text x="0" y="2" text-anchor="middle" dominant-baseline="middle" font-family="Unbounded, Manrope, sans-serif" font-weight="700" font-size="26" fill="${txt}">${letter}</text>
</svg>`;
  }

  function renderPill(r) {
    const g = GENIUSES[r.key];
    return `
      <div class="genius-pill">
        <div class="g-mark" style="background:${g.colorSoft};color:${g.color}">${g.icon}</div>
        <div class="g-info">
          <div class="g-name">${g.name}</div>
          <div class="g-tag">${g.tagline}</div>
        </div>
      </div>`;
  }

  // ===== Google Sheets submission =====
  function submitToSheets(result) {
    if (window.DEMO_MODE) return;
    const url = (window.APP_CONFIG && window.APP_CONFIG.SHEETS_WEBHOOK_URL) || '';
    const status = $('saveStatus');
    if (!url) {
      status.hidden = true;
      return;
    }

    const payload = {
      timestamp: new Date().toISOString(),
      startedAt: state.startedAt,
      name: state.name,
      email: state.email,
      answers: state.answers,
      scores: result.scores,
      ranked: result.ranked.map((r) => ({ type: r.key, score: r.score })),
      topGeniuses: result.ranked.slice(0, 2).map((r) => GENIUSES[r.key].name).join(', '),
      frustrations: result.ranked.slice(4, 6).map((r) => GENIUSES[r.key].name).join(', ')
    };

    status.hidden = false;
    status.className = 'save-status';
    status.textContent = 'Сохраняем результат…';

    fetch(url, {
      method: 'POST',
      mode: 'no-cors', // Apps Script Web App requires this from browsers
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    }).then(() => {
      status.className = 'save-status success';
      status.textContent = '✓ Результат сохранён';
    }).catch(() => {
      status.className = 'save-status error';
      status.textContent = 'Не удалось отправить результат (будет доступен локально).';
    });
  }

  // ===== Actions =====
  function copyResult() {
    const { scores, max, ranked } = computeScores();
    const topNames = ranked.slice(0, 2).map((r) => GENIUSES[r.key].name).join(' и ');
    const lowNames = ranked.slice(4, 6).map((r) => GENIUSES[r.key].name).join(' и ');
    const lines = [
      `Результат теста 6 Гениев — ${state.name}`,
      '',
      `Ведущие таланты: ${topNames}`,
      `Фрустрации: ${lowNames}`,
      '',
      'Результаты по типам:',
      ...GENIUS_ORDER.map((k) => `• ${GENIUSES[k].name}: ${Math.round((scores[k] / max) * 100)}%`)
    ];
    const text = lines.join('\n');
    navigator.clipboard.writeText(text).then(() => {
      const btn = $('shareBtn');
      const old = btn.textContent;
      btn.textContent = '✓ Скопировано';
      setTimeout(() => { btn.textContent = old; }, 1800);
    });
  }

  function restart() {
    state.current = 0;
    state.answers = new Array(QUESTIONS.length).fill(null);
    showView('intro');
  }

  function runDemo() {
    const pattern = { W: 2, I: 3, D: 3, G: 2, E: 1, T: 1 };
    state.name = 'Азамат Демо';
    state.email = 'demo@divergents.kz';
    state.startedAt = new Date().toISOString();
    state.answers = QUESTIONS.map((q, i) => {
      const base = pattern[q.type];
      if (q.type === 'D' && i % 5 === 0) return 2;
      if (q.type === 'T' && i === 0) return 2;
      return base;
    });
    finishTest();
  }

  // ===== Wire up =====
  document.addEventListener('DOMContentLoaded', () => {
    renderHeroGeniuses();

    $('startBtn').addEventListener('click', startTest);
    $('inp-name').addEventListener('keydown', (e) => { if (e.key === 'Enter') startTest(); });
    $('inp-email').addEventListener('keydown', (e) => { if (e.key === 'Enter') startTest(); });

    $('prevBtn').addEventListener('click', prevQuestion);
    $('restartBtn').addEventListener('click', restart);
    $('retakeBtn').addEventListener('click', restart);
    $('printBtn').addEventListener('click', () => window.print());
    window.addEventListener('beforeprint', () => {
      const el = $('print-date');
      if (el) {
        el.textContent = new Date().toLocaleString('ru-RU', {
          day: '2-digit', month: '2-digit', year: 'numeric',
          hour: '2-digit', minute: '2-digit'
        });
      }
    });
    $('shareBtn').addEventListener('click', copyResult);

    // Keyboard shortcuts for test: 1/2/3
    document.addEventListener('keydown', (e) => {
      if (views.test.hidden) return;
      if (['1', '2', '3'].includes(e.key)) {
        const idx = Number(e.key) - 1;
        const btn = document.querySelectorAll('.answer-btn')[idx];
        if (btn) btn.click();
      } else if (e.key === 'ArrowLeft') {
        prevQuestion();
      }
    });

    if (window.DEMO_MODE) runDemo();
  });
})();
