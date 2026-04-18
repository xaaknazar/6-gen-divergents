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
  function finishTest() {
    const result = computeScores();
    renderResults(result);
    showView('results');
    submitToSheets(result);
  }

  function renderResults(result) {
    const { ranked } = result;
    $('r-name').textContent = state.name;

    const top = ranked.slice(0, 2).map((r) => r.key);
    const mid = ranked.slice(2, 4).map((r) => r.key);
    const low = ranked.slice(4, 6).map((r) => r.key);

    renderPrintReport(top, mid, low);
  }

  // Richer descriptions used on the PDF results pages.
  const REPORT_DESCRIPTIONS = {
    W: { full: 'Дар Задумки — тонко чувствовать потенциал в людях и ситуациях, задавать большие вопросы о смысле и возможностях. Это почти внутренний процесс, но с него начинается почти каждая инициатива.', strength: 'Замечаете возможности, которых не видят другие.', shadow: 'Иногда застреваете в размышлениях без действий.' },
    I: { full: 'Дар Изобретения — создавать оригинальные идеи и решения с чистого листа. Без людей с этим даром команда редко рождает что‑то по‑настоящему новое.', strength: 'Создаёте оригинальное и небанальное.', shadow: 'Можете потерять интерес до воплощения идеи.' },
    D: { full: 'Дар Оценки — интуитивное чувство того, что сработает, а что нет. Распознавание паттернов и нюансов, когда остальные тонут в деталях.', strength: 'Принимаете точные решения в условиях неопределённости.', shadow: 'Вам сложно объяснить логику — «я просто чувствую».' },
    G: { full: 'Дар Гальванизации — превращать идеи в движение. Объединять людей, заряжать энергией, убеждать присоединиться к делу.', strength: 'Запускаете импульс и преодолеваете инерцию.', shadow: 'Можете вдохновлять на то, что ещё не готово к запуску.' },
    E: { full: 'Дар Поддержки — интуитивно чувствовать, что нужно другим, и с готовностью подставлять плечо. Тот «клей», что удерживает команду вместе.', strength: 'Создаёте атмосферу безопасности и заботы.', shadow: 'Можете забывать о собственных границах и потребностях.' },
    T: { full: 'Дар Доводки — не успокаиваться, пока задача не закрыта. Жить сроками и конкретными результатами, превращая планы в реальные достижения.', strength: 'Гарантируете, что работа действительно завершается.', shadow: 'Можете ставить задачу выше людей.' }
  };

  const OVERVIEW_DEFS = {
    W: 'Замечает потребность в улучшении или изменении.',
    I: 'Подтверждает важность этой потребности и предлагает идею или решение.',
    D: 'Оценивает ценность и жизнеспособность идеи или решения.',
    G: 'Создаёт энтузиазм и импульс для действий вокруг идеи.',
    E: 'Инициирует поддержку и помогает в реализации.',
    T: 'Доводит решение до завершения и добивается результата.'
  };

  const PAGES = {
    geniuses:     { variant: 'geniuses',     page: 3, accent: '#1a9b5a', eyebrow: 'Результаты · рабочие таланты', title: 'Твои рабочие таланты', intro: (a, b) => `По результатам теста, твои рабочие таланты — <b>${a}</b> и <b>${b}</b>. Это деятельность, которая приносит радость, энергию и страсть. Именно поэтому ты особенно силён в этих областях.` },
    competencies: { variant: 'competencies', page: 4, accent: '#e8a21b', eyebrow: 'Результаты · компетенции',     title: 'Твои компетенции',     intro: (a, b) => `Твои компетенции — <b>${a}</b> и <b>${b}</b>. Это деятельность, которая не приносит ни полного удовлетворения, ни сильного дискомфорта. Ты справляешься в этих областях, но со временем можешь уставать, если нет возможности использовать настоящие таланты.` },
    frustrations: { variant: 'frustrations', page: 5, accent: '#c04a3e', eyebrow: 'Результаты · фрустрации',     title: 'Твои фрустрации',     intro: (a, b) => `Твои фрустрации — <b>${a}</b> и <b>${b}</b>. Знать их важно по двум причинам: не проводить в этих областях слишком много времени — это ведёт к усталости, — и не испытывать ненужной вины за то, что ты не одарён от природы именно в них.` }
  };

  function formatDate(iso) {
    const d = iso ? new Date(iso) : new Date();
    const pad = (n) => String(n).padStart(2, '0');
    return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
  }

  function renderPrintReport(top, mid, low) {
    const container = $('print-report');
    if (!container) return;
    container.innerHTML =
      renderCoverPage(top) +
      renderOverviewPage() +
      renderResultsPage(top, PAGES.geniuses) +
      renderResultsPage(mid, PAGES.competencies) +
      renderResultsPage(low, PAGES.frustrations);
  }

  function reportHeader(eyebrow, accent) {
    return `
      <header class="pdf-header">
        <div class="pdf-wordmark">
          Divergents<span class="pdf-wordmark-dot">·</span><span class="pdf-wordmark-sub">6 гениев команды</span>
        </div>
        ${eyebrow ? `<div class="pdf-header-eyebrow" style="color:${accent || '#1a1d24'}">${eyebrow}</div>` : ''}
      </header>`;
  }

  function reportFooter(page) {
    return `
      <div class="pdf-footer">
        <span>Divergents.kz · 6 гениев команды</span>
        <span>${state.name || ''}</span>
        <span>${page} / 5</span>
      </div>`;
  }

  function renderCoverPage(top) {
    const date = formatDate(state.startedAt);
    const gears = GENIUS_ORDER.map((k) => {
      const g = GENIUSES[k];
      const active = top.includes(k);
      return gearBlock(k, active, g.color, g.name, 88);
    }).join('');

    const topNames = top.map((k) => GENIUSES[k].name).join(' · ');

    return `
      <section class="pdf-page pdf-cover">
        ${reportHeader(date, '#1a1d24')}
        <div class="pdf-cover-bg"></div>
        <div class="pdf-cover-glow"></div>
        <div class="pdf-cover-body">
          <div class="pdf-cover-eyebrow">Отчёт по ассессменту · 6 гениев команды</div>
          <h1 class="pdf-cover-title">Найди дары,<br>которые ты приносишь в работу.</h1>
          <p class="pdf-cover-lead">
            Результаты ассессмента <b>${state.name || ''}</b>. На следующих страницах — твой уникальный профиль по шести типам рабочего таланта.
          </p>
          <div class="pdf-cover-gears">${gears}</div>
          <div class="pdf-cover-callout">
            <div class="pdf-cover-callout-label">Ведущие таланты</div>
            <div class="pdf-cover-callout-value">${topNames}</div>
          </div>
        </div>
        <div class="pdf-cover-powered">Powered by Divergents · методология The 6 Types of Working Genius</div>
        ${reportFooter(1)}
      </section>`;
  }

  function renderOverviewPage() {
    const gears = GENIUS_ORDER.map((k, i) => {
      const g = GENIUSES[k];
      return gearBlock(k, true, g.color, g.name, 78) +
        (i < 5 ? '<div class="pdf-overview-arrow">→</div>' : '');
    }).join('');

    const defs = GENIUS_ORDER.map((k) => {
      const g = GENIUSES[k];
      return `
        <div class="pdf-overview-def">
          <div class="pdf-overview-chip" style="background:${g.color}">${k}</div>
          <div class="pdf-overview-def-body">
            <div class="pdf-overview-def-title">${g.name.toUpperCase()} <span>· ${g.subtitle}</span></div>
            <div class="pdf-overview-def-desc">${OVERVIEW_DEFS[k]}</div>
          </div>
        </div>`;
    }).join('');

    return `
      <section class="pdf-page pdf-overview">
        ${reportHeader('Обзор · Overview', '#4c5160')}
        <div class="pdf-overview-body">
          <h2 class="pdf-overview-title">Шесть типов рабочего таланта</h2>
          <p class="pdf-overview-p">
            У каждого из нас есть два типа деятельности — <b>рабочие таланты</b>, — которые дают нам радость, энергию и страсть.
            Ещё два — <b>фрустрации</b> — отнимают силы. Оставшиеся два — <b>компетенции</b> — нейтральны:
            мы можем делать их хорошо какое‑то время, но со временем устаём.
          </p>
          <p class="pdf-overview-p">
            Шесть типов образуют взаимозависимую модель — полный цикл любой работы.
            Каждый тип передаёт эстафету следующему: всё начинается с <b>Задумки</b> и завершается <b>Доводкой</b>.
          </p>
          <div class="pdf-overview-cycle">${gears}</div>
          <div class="pdf-overview-grid">${defs}</div>
        </div>
        ${reportFooter(2)}
      </section>`;
  }

  function renderResultsPage(pair, page) {
    const [a, b] = pair;
    const aName = GENIUSES[a].name;
    const bName = GENIUSES[b].name;
    const activeSet = new Set(pair);

    const gears = GENIUS_ORDER.map((k) => {
      const g = GENIUSES[k];
      const active = activeSet.has(k);
      return gearBlock(k, active, active ? page.accent : null, g.name, 80);
    }).join('');

    const cols = pair.map((k) => {
      const g = GENIUSES[k];
      const d = REPORT_DESCRIPTIONS[k];
      return `
        <div class="pdf-results-col">
          <div class="pdf-results-col-title" style="color:${page.accent}">
            ${g.name.toUpperCase()}
            <span class="pdf-results-col-sub">${g.subtitle.toUpperCase()}</span>
          </div>
          <p class="pdf-results-col-text">${d.full}</p>
          <div class="pdf-results-col-meta">
            <div class="pdf-meta-row">
              <span class="pdf-meta-label" style="color:${page.accent}">Сила</span>
              <span class="pdf-meta-value">${d.strength}</span>
            </div>
            <div class="pdf-meta-row">
              <span class="pdf-meta-label" style="color:${page.accent}">Тень</span>
              <span class="pdf-meta-value">${d.shadow}</span>
            </div>
          </div>
        </div>`;
    }).join('');

    return `
      <section class="pdf-page pdf-results" data-variant="${page.variant}">
        ${reportHeader(page.eyebrow, page.accent)}
        <div class="pdf-results-body">
          <div class="pdf-results-eyebrow" style="color:${page.accent}">${page.eyebrow}</div>
          <h2 class="pdf-results-title">${page.title}</h2>
          <p class="pdf-results-intro">${page.intro(aName.toUpperCase(), bName.toUpperCase())}</p>
          <div class="pdf-results-gears">${gears}</div>
          <div class="pdf-results-cols">${cols}</div>
        </div>
        <div class="pdf-results-watermark">${state.name || ''}</div>
        ${reportFooter(page.page)}
      </section>`;
  }

  function gearBlock(letter, active, accent, label, size) {
    return `
      <div class="pdf-gear" style="--gear-size:${size}px;--gear-color:${accent || '#c7ccd6'}">
        ${gearSVG(letter, active, accent)}
        <div class="pdf-gear-label" style="color:${active ? (accent || '#8a8f9a') : '#8a8f9a'}">${label}</div>
      </div>`;
  }

  function gearSVG(letter, active, accent) {
    const fill = active ? accent : '#e8ecf3';
    const stroke = active ? accent : '#c7ccd6';
    const txt = active ? accent : '#a7adb9';
    return `
<svg viewBox="-52 -52 104 104" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="pdf-gear-svg">
  <g fill="${fill}" stroke="${stroke}" stroke-width="1.4" stroke-linejoin="round">
    <path d="M -8 -46 L 8 -46 L 11 -37 L 20 -34 L 28 -40 L 40 -28 L 34 -20 L 37 -11 L 46 -8 L 46 8 L 37 11 L 34 20 L 40 28 L 28 40 L 20 34 L 11 37 L 8 46 L -8 46 L -11 37 L -20 34 L -28 40 L -40 28 L -34 20 L -37 11 L -46 8 L -46 -8 L -37 -11 L -34 -20 L -40 -28 L -28 -40 L -20 -34 L -11 -37 Z" />
  </g>
  <circle r="22" fill="#ffffff" stroke="${stroke}" stroke-width="1.4" />
  <text x="0" y="2" text-anchor="middle" dominant-baseline="middle" font-family="Unbounded, Manrope, sans-serif" font-weight="700" font-size="26" fill="${txt}">${letter}</text>
</svg>`;
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
