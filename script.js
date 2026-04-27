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

  function toTitleCase(s) {
    return s.toLowerCase().replace(/(^|[\s\-'’])(\p{L})/gu, (_, sep, ch) => sep + ch.toUpperCase());
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
    state.name = toTitleCase(name);
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
    I: { full: 'Дар Изобретения — создавать оригинальные идеи и решения с чистого листа. Без людей с этим даром команда редко рождает что‑то по‑настоящему новое.', strength: 'Создаете оригинальное и небанальное.', shadow: 'Можете потерять интерес до воплощения идеи.' },
    D: { full: 'Дар Оценки — интуитивное чувство того, что сработает, а что нет. Распознавание паттернов и нюансов, когда остальные тонут в деталях.', strength: 'Принимаете точные решения в условиях неопределенности.', shadow: 'Вам сложно объяснить логику — «я просто чувствую».' },
    G: { full: 'Дар Гальванизации — превращать идеи в движение. Объединять людей, заряжать энергией, убеждать присоединиться к делу.', strength: 'Запускаете импульс и преодолеваете инерцию.', shadow: 'Можете вдохновлять на то, что еще не готово к запуску.' },
    E: { full: 'Дар Поддержки — интуитивно чувствовать, что нужно другим, и с готовностью подставлять плечо. Тот «клей», что удерживает команду вместе.', strength: 'Создаете атмосферу безопасности и заботы.', shadow: 'Можете забывать о собственных границах и потребностях.' },
    T: { full: 'Дар Доводки — не успокаиваться, пока задача не закрыта. Жить сроками и конкретными результатами, превращая планы в реальные достижения.', strength: 'Гарантируете, что работа действительно завершается.', shadow: 'Можете ставить задачу выше людей.' }
  };

  const OVERVIEW_DEFS = {
    W: 'Замечает потребность в улучшении или изменении.',
    I: 'Подтверждает важность этой потребности и предлагает идею или решение.',
    D: 'Оценивает ценность и жизнеспособность идеи или решения.',
    G: 'Создает энтузиазм и импульс для действий вокруг идеи.',
    E: 'Инициирует поддержку и помогает в реализации.',
    T: 'Доводит решение до завершения и добивается результата.'
  };

  // One-line summaries used on the compact summary page (page 3).
  const SUMMARY_TOP = {
    W: 'Получаешь энергию и радость, размышляя о потенциале и возможностях в любой ситуации.',
    I: 'Получаешь энергию и радость, создавая оригинальные идеи и решения с нуля.',
    D: 'Получаешь энергию и радость, оценивая идеи интуитивно, а не по данным.',
    G: 'Получаешь энергию и радость, объединяя людей и запуская движение вокруг идеи.',
    E: 'Получаешь энергию и радость, откликаясь на запросы других и подставляя плечо.',
    T: 'Получаешь энергию и радость, доводя задачи до завершения и добиваясь результата.'
  };
  const SUMMARY_MID = {
    W: 'Справляешься с размышлением о возможностях, но не заряжаешься от него.',
    I: 'Способен придумывать новое при необходимости, но не испытываешь от этого подъема.',
    D: 'Умеешь оценивать и чувствовать идеи, но не считаешь это своим призванием.',
    G: 'Способен вдохновлять и объединять людей, но не возвращаешься к этому за энергией.',
    E: 'Умеешь поддерживать и помогать, но это не главный источник радости.',
    T: 'Можешь довести дело до конца, если требуется — просто без подъема сил.'
  };
  const SUMMARY_LOW = {
    W: 'Не получаешь особой радости от долгих размышлений и больших вопросов.',
    I: 'Не получаешь особой радости от создания идей и решений с чистого листа.',
    D: 'Не получаешь особой радости от интуитивной оценки идей и планов.',
    G: 'Не получаешь особой радости от того, чтобы заряжать людей действовать.',
    E: 'Не получаешь особой радости от помощи и поддержки в реализации идей других.',
    T: 'Не получаешь особой радости от необходимости доводить задачи до конца.'
  };

  // 15 Lencioni pairings — keyed in "WIDGET" letter order.
  const PAIRINGS = {
    WI: { title: 'Творческий мечтатель',        blurb: 'Страстный идеалист с бесконечным потоком больших вопросов и идей. Живет с головой в облаках — и именно оттуда приходят открытия.' },
    WD: { title: 'Созерцательный советник',     blurb: 'Вдумчивый, проницательный, тонкий собеседник. Не спешит с выводами, но глубок в мудрости, интуиции и обоснованиях.' },
    WG: { title: 'Философствующий мотиватор',   blurb: 'Возбужденный, любопытный и увлеченный сторонник идей и людей. Редкое сочетание рвения и вдумчивой рефлексии.' },
    WE: { title: 'Идеалистичный помощник',      blurb: 'Преданный, скромный и чуткий участник. Внимательно видит потребности других и не склонен требовать внимания к себе.' },
    WT: { title: 'Методичный исполнитель',      blurb: 'Обстоятельный, практичный и аккуратный. Уникальное сочетание стабильной надежности и тихой глубины.' },
    ID: { title: 'Разборчивый идеатор',         blurb: 'Креативный, интуитивный, уверенный генератор идей. Опирается на чутье и интегративное мышление.' },
    IG: { title: 'Евангелист инноваций',        blurb: 'Возбуждающий и убеждающий создатель и промоутер новых идей. Любопытство, уверенность и заразительный энтузиазм в одном.' },
    IE: { title: 'Адаптивный дизайнер',         blurb: 'Порождает новые идеи в ответ на потребности других. Уникальное сочетание креативности и гибкости.' },
    IT: { title: 'Методичный архитектор',       blurb: 'Точный, надежный, плановый решатель задач. Инновационное мышление встречается с практичной реализацией.' },
    DG: { title: 'Интуитивный активатор',       blurb: 'Инстинктивный и уверенный принимающий решения. Быстро оценивает ситуацию и мобилизует людей на действие.' },
    DE: { title: 'Проницательный партнер',      blurb: 'Интуитивный, эмпатичный советник и командный игрок. Бескорыстно и вовремя дает другим именно то, что им нужно.' },
    DT: { title: 'Рассудительный достигатор',   blurb: 'Надежный, осторожный и сфокусированный исполнитель. Редкое сочетание практичной срочности и интуитивного суждения.' },
    GE: { title: 'Воодушевляющий вдохновитель', blurb: 'Теплый и позитивный «поднимающий дух». Быстро поддерживает и заряжает тех, кому нужна энергия или уверенность.' },
    GT: { title: 'Настойчивый драйвер',         blurb: 'Таск-мастер экстра-класса. Готов подталкивать, напоминать и вписываться сам — лишь бы дело шло.' },
    ET: { title: 'Преданный завершатель',       blurb: 'Отзывчивый, надежный исполнитель. Готов подключиться, когда нужно, и доводит обещанное до конца.' }
  };

  function pairingKey(pair) {
    const order = 'WIDGET';
    const a = pair[0], b = pair[1];
    const ia = order.indexOf(a), ib = order.indexOf(b);
    return ia < ib ? a + b : b + a;
  }

  const PAGES = {
    geniuses:     { variant: 'geniuses',     page: 4, accent: '#1a9b5a', eyebrow: 'Результаты · рабочие таланты', title: 'Твои рабочие таланты', intro: (a, b) => `По результатам теста, твои рабочие таланты — <b>${a}</b> и <b>${b}</b>. Это деятельность, которая приносит радость, энергию и страсть. Именно поэтому ты особенно силен в этих областях.` },
    competencies: { variant: 'competencies', page: 5, accent: '#e8a21b', eyebrow: 'Результаты · компетенции',     title: 'Твои компетенции',     intro: (a, b) => `Твои компетенции — <b>${a}</b> и <b>${b}</b>. Это деятельность, которая не приносит ни полного удовлетворения, ни сильного дискомфорта. Ты справляешься в этих областях, но со временем можешь уставать, если нет возможности использовать настоящие таланты.` },
    frustrations: { variant: 'frustrations', page: 6, accent: '#c04a3e', eyebrow: 'Результаты · фрустрации',     title: 'Твои фрустрации',     intro: (a, b) => `Твои фрустрации — <b>${a}</b> и <b>${b}</b>. Знать их важно по двум причинам: не проводить в этих областях слишком много времени — это ведет к усталости, — и не испытывать ненужной вины за то, что ты не одарен от природы именно в них.` }
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
      renderSummaryPage(top, mid, low) +
      renderResultsPage(top, PAGES.geniuses) +
      renderResultsPage(mid, PAGES.competencies) +
      renderResultsPage(low, PAGES.frustrations) +
      renderPairingPage(top) +
      renderNextStepsPage();
  }

  function reportHeader(eyebrow, accent, eyebrowLarge) {
    return `
      <header class="pdf-header">
        <div class="pdf-wordmark">
          <span class="pdf-wordmark-name">TalentsLab</span><span class="pdf-wordmark-dot">·</span><span class="pdf-wordmark-sub">6 гениев команды</span>
        </div>
        ${eyebrow ? `<div class="pdf-header-eyebrow${eyebrowLarge ? ' pdf-header-eyebrow--lg' : ''}" style="color:${accent || '#1a1d24'}">${eyebrow}</div>` : ''}
      </header>`;
  }

  function reportFooter(page) {
    return `
      <div class="pdf-footer">
        <span class="pdf-footer-brand"><img class="pdf-footer-logo" src="divergents-logo.png" alt="">Powered by Divergents.kz · методология The 6 Types of Working Genius</span>
        <span>${state.name || ''}</span>
        <span>${page} / 8</span>
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
        ${reportHeader(date, '#1a1d24', true)}
        <div class="pdf-cover-bg"></div>
        <div class="pdf-cover-glow"></div>
        <div class="pdf-cover-body">
          <div class="pdf-cover-eyebrow">Отчет по ассессменту · 6 гениев команды</div>
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
            <div class="pdf-overview-def-title">${g.name.toUpperCase()}</div>
            <div class="pdf-overview-def-desc">${OVERVIEW_DEFS[k]}</div>
          </div>
        </div>`;
    }).join('');

    return `
      <section class="pdf-page pdf-overview">
        ${reportHeader('Обзор', '#4c5160')}
        <div class="pdf-overview-body">
          <h2 class="pdf-overview-title">Шесть типов рабочего таланта</h2>
          <p class="pdf-overview-p">
            У каждого из нас есть два типа деятельности — <b>рабочие таланты</b>, — которые дают нам радость, энергию и страсть.
            Еще два — <b>фрустрации</b> — отнимают силы. Оставшиеся два — <b>компетенции</b> — нейтральны:
            мы можем делать их хорошо какое‑то время, но со временем устаем.
          </p>
          <p class="pdf-overview-p">
            Шесть типов образуют взаимозависимую модель — полный цикл любой работы.
            Каждый тип передает эстафету следующему: все начинается с <b>Задумки</b> и завершается <b>Доводкой</b>.
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

  function renderSummaryPage(top, mid, low) {
    const section = (eyebrow, accent, keys, copy) => {
      const rows = keys.map((k) => {
        const g = GENIUSES[k];
        return `
          <div class="pdf-summary-row" style="border-left-color:${accent}">
            <div class="pdf-summary-chip" style="background:${accent}">${k}</div>
            <div class="pdf-summary-row-body">
              <div class="pdf-summary-name">${g.name.toUpperCase()}</div>
              <div class="pdf-summary-text">${copy[k]}</div>
            </div>
          </div>`;
      }).join('');
      return `
        <div class="pdf-summary-section">
          <div class="pdf-summary-eyebrow" style="color:${accent}">${eyebrow}</div>
          <div class="pdf-summary-rows">${rows}</div>
        </div>`;
    };

    return `
      <section class="pdf-page pdf-summary">
        ${reportHeader('Результаты', '#4c5160')}
        <div class="pdf-summary-body">
          <h2 class="pdf-summary-title">Твои результаты</h2>
          <p class="pdf-summary-lead">
            <b>${state.name || ''}</b>, ниже — краткая сводка твоего профиля по шести типам.
            На следующих страницах каждая пара разобрана подробно.
          </p>
          ${section('Рабочие таланты', '#1a9b5a', top, SUMMARY_TOP)}
          ${section('Компетенции',     '#e8a21b', mid, SUMMARY_MID)}
          ${section('Фрустрации',      '#c04a3e', low, SUMMARY_LOW)}
        </div>
        ${reportFooter(3)}
      </section>`;
  }

  function renderPairingPage(top) {
    const [a, b] = top;
    const key = pairingKey(top);
    const reverseKey = key[1] + key[0];
    const pair = PAIRINGS[key] || PAIRINGS[reverseKey];
    const gA = GENIUSES[a];
    const gB = GENIUSES[b];

    const list = Object.entries(PAIRINGS).map(([k, p]) => {
      const isMine = k === key || k === reverseKey;
      return `
        <div class="pdf-pairing-item${isMine ? ' pdf-pairing-item--active' : ''}">
          <span class="pdf-pairing-code">${k}</span>
          <span class="pdf-pairing-title">${p.title}</span>
        </div>`;
    }).join('');

    return `
      <section class="pdf-page pdf-pairing">
        ${reportHeader('Уникальное сочетание', '#4c5160')}
        <div class="pdf-pairing-body">
          <div class="pdf-pairing-eyebrow">Твое сочетание</div>
          <h2 class="pdf-pairing-title-h">${pair.title}</h2>
          <p class="pdf-pairing-lead">
            Каждый талант важен сам по себе, но <b>комбинация</b> двух ведущих талантов
            еще точнее описывает твои уникальные дары. Ниже — описание сочетания
            <b>${gA.name}</b> + <b>${gB.name}</b>.
          </p>

          <div class="pdf-pairing-card">
            <div class="pdf-pairing-bar" style="background:linear-gradient(180deg, ${gA.color}, ${gB.color})"></div>
            <div class="pdf-pairing-card-head">
              ${gearBlock(a, true, gA.color, gA.name, 80)}
              <div class="pdf-pairing-plus">+</div>
              ${gearBlock(b, true, gB.color, gB.name, 80)}
              <div class="pdf-pairing-code-wrap">
                <div class="pdf-pairing-code-label">Код</div>
                <div class="pdf-pairing-code-value">${a}${b} <span>·</span> ${b}${a}</div>
              </div>
            </div>
            <p class="pdf-pairing-blurb">${pair.blurb}</p>
          </div>

          <div class="pdf-pairing-all-label">Все 15 сочетаний</div>
          <div class="pdf-pairing-grid">${list}</div>
        </div>
        ${reportFooter(7)}
      </section>`;
  }

  function renderNextStepsPage() {
    const blocks = [
      {
        eyebrow: 'Работай из своего таланта',
        bullets: [
          'Пересмотри свою работу — где ты можешь чаще опираться на ведущие таланты и меньше задерживаться во фрустрациях.',
          'Планируй задачи из области фрустраций и компетенций на то время дня, когда у тебя больше энергии.',
          'Замечай и называй вслух, когда работаешь вне своих талантов, — это помогает осознанно управлять силами.',
          'Проси о помощи в областях, где ты не одарен от природы. Это не слабость — это уважение к модели.'
        ]
      },
      {
        eyebrow: 'Поделись результатами',
        bullets: [
          'Расскажи близким, коллегам и команде, что ты узнал о себе.',
          'Пригласи их пройти тест — и обсудите результаты вместе.',
          'Договоритесь, как можно поддерживать друг друга: использовать свои таланты и избегать чужих фрустраций.',
          'Предложи применить свой талант там, где это нужно другим.'
        ]
      },
      {
        eyebrow: 'Используй модель в команде',
        bullets: [
          'Соберите общую карту талантов команды — сильные стороны и пробелы.',
          'Обсудите, как лучше распределить задачи и роли с учетом талантов.',
          'Подумайте, где команде не хватает определенного гения — и как этот пробел закрыть.'
        ]
      }
    ];

    const blocksHTML = blocks.map((b, i) => `
      <div class="pdf-next-block">
        <div class="pdf-next-head">
          <div class="pdf-next-num">0${i + 1}</div>
          <div class="pdf-next-eyebrow">${b.eyebrow}</div>
        </div>
        <ul class="pdf-next-list">
          ${b.bullets.map((t) => `<li>${t}</li>`).join('')}
        </ul>
      </div>`).join('');

    return `
      <section class="pdf-page pdf-next">
        ${reportHeader('Что дальше', '#4c5160')}
        <div class="pdf-next-body">
          <div class="pdf-next-eyebrow-top">Применение</div>
          <h2 class="pdf-next-title">Как применить результаты</h2>
          <p class="pdf-next-lead">
            Многие работают в ролях, которые расходятся с их природными талантами —
            и даже не понимают, почему им тяжело. Знание своих даров и фрустраций
            дает осознанность, радость и продуктивность. Ниже — три направления,
            чтобы начать применять результаты уже сегодня.
          </p>
          <div class="pdf-next-blocks">${blocksHTML}</div>
          <div class="pdf-next-quote">
            <b>Помни:</b> ты не обязан одинаково любить все шесть видов работы.
            Модель нужна, чтобы <b>команды</b> закрывали друг друга, а ты проводил
            больше времени там, где расцветаешь.
          </div>
        </div>
        ${reportFooter(8)}
      </section>`;
  }

  function gearBlock(letter, active, accent, label, size) {
    const fill = active ? accent : '#e8ecf3';
    const stroke = active ? accent : '#c7ccd6';
    const txt = active ? '#ffffff' : '#a7adb9';
    const labelColor = active ? (accent || '#8a8f9a') : '#8a8f9a';
    return `
      <div class="pdf-gear" style="--gear-size:${size}px;--gear-color:${accent || '#c7ccd6'}">
        <div class="pdf-gear-mark" style="background:${fill};border-color:${stroke};color:${txt}">${letter}</div>
        <div class="pdf-gear-label" style="color:${labelColor}">${label}</div>
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
      status.textContent = '✓ Результат сохранен';
    }).catch(() => {
      status.className = 'save-status error';
      status.textContent = 'Не удалось отправить результат (будет доступен локально).';
    });
  }

  // ===== PDF export =====
  async function downloadPdf() {
    const btn = $('printBtn');
    const container = $('print-report');
    if (!container) return;
    const pages = container.querySelectorAll('.pdf-page');
    if (!pages.length) return;

    const originalLabel = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = 'Генерируем PDF…';

    // Make the hidden report measurable by moving it off-screen but visible.
    const prev = {
      display: container.style.display,
      position: container.style.position,
      left: container.style.left,
      top: container.style.top,
      zIndex: container.style.zIndex,
      pointerEvents: container.style.pointerEvents
    };
    container.style.display = 'block';
    container.style.position = 'fixed';
    container.style.left = '-10000px';
    container.style.top = '0';
    container.style.zIndex = '-1';
    container.style.pointerEvents = 'none';
    container.classList.add('capturing');

    try {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
      // Force one frame so layout settles.
      await new Promise((r) => requestAnimationFrame(() => r()));

      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true });
      const pageW = 210;
      const pageH = 297;
      // A4 at 96dpi in CSS pixels: 210mm = 793.7px, 297mm = 1122.5px.
      // Pin html2canvas to these dimensions so mobile viewports (~375px wide)
      // don't trigger responsive reflow of the report.
      const pxW = 794;
      const pxH = 1123;

      for (let i = 0; i < pages.length; i += 1) {
        const canvas = await window.html2canvas(pages[i], {
          scale: 2,
          useCORS: true,
          backgroundColor: '#faf8f3',
          logging: false,
          width: pxW,
          height: pxH,
          windowWidth: pxW,
          windowHeight: pxH
        });
        const img = canvas.toDataURL('image/jpeg', 0.95);
        if (i > 0) pdf.addPage('a4', 'portrait');
        pdf.addImage(img, 'JPEG', 0, 0, pageW, pageH, undefined, 'FAST');
      }

      const safeName = (state.name || 'report').replace(/[^\p{L}\p{N}\-_. ]+/gu, '').trim() || 'report';
      pdf.save(`${safeName} - TalentsLab 6 Genius Test.pdf`);
    } catch (err) {
      console.error('PDF export failed', err);
      alert('Не удалось сгенерировать PDF. Попробуй еще раз.');
    } finally {
      container.classList.remove('capturing');
      container.style.display = prev.display;
      container.style.position = prev.position;
      container.style.left = prev.left;
      container.style.top = prev.top;
      container.style.zIndex = prev.zIndex;
      container.style.pointerEvents = prev.pointerEvents;
      btn.disabled = false;
      btn.innerHTML = originalLabel;
    }
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
    $('printBtn').addEventListener('click', downloadPdf);
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
