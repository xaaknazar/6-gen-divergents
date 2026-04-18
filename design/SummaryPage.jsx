// Pages 3/4/5 — Geniuses, Competencies, Frustrations (same layout, different accent + copy)

const REPORT_DESCRIPTIONS = {
  W: { full: 'Дар Задумки — тонко чувствовать потенциал в людях и ситуациях, задавать большие вопросы о смысле и возможностях. Это почти внутренний процесс, но с него начинается почти каждая инициатива.', strength:'Замечаете возможности, которых не видят другие.', shadow:'Иногда застреваете в размышлениях без действий.' },
  I: { full: 'Дар Изобретения — создавать оригинальные идеи и решения с чистого листа. Без людей с этим даром команда редко рождает что‑то по‑настоящему новое.', strength:'Создаете оригинальное и небанальное.', shadow:'Можете потерять интерес до воплощения идеи.' },
  D: { full: 'Дар Оценки — интуитивное чувство того, что сработает, а что нет. Распознавание паттернов и нюансов, когда остальные тонут в деталях.', strength:'Принимаете точные решения в условиях неопределенности.', shadow:'Вам сложно объяснить логику — «я просто чувствую».' },
  G: { full: 'Дар Гальванизации — превращать идеи в движение. Объединять людей, заряжать энергией, убеждать присоединиться к делу.', strength:'Запускаете импульс и преодолеваете инерцию.', shadow:'Можете вдохновлять на то, что еще не готово к запуску.' },
  E: { full: 'Дар Поддержки — интуитивно чувствовать, что нужно другим, и с готовностью подставлять плечо. Тот «клей», что удерживает команду вместе.', strength:'Создаете атмосферу безопасности и заботы.', shadow:'Можете забывать о собственных границах и потребностях.' },
  T: { full: 'Дар Доводки — не успокаиваться, пока задача не закрыта. Жить сроками и конкретными результатами, превращая планы в реальные достижения.', strength:'Гарантируете, что работа действительно завершается.', shadow:'Можете ставить задачу выше людей.' },
};
window.REPORT_DESCRIPTIONS = REPORT_DESCRIPTIONS;

function ResultsSection({ variant, pageNum, accent, eyebrow, title, introHTML, pair, name }) {
  const G = window.REPORT_GENIUSES;
  const order = window.REPORT_ORDER;
  const activeSet = new Set(pair);

  return (
    <ReportPage variant={variant}>
      <ReportHeader eyebrow={eyebrow} accent={accent} />
      <div style={{ padding:'38px 64px 80px' }}>

        <div style={{
          fontFamily:"'Manrope',sans-serif", fontSize: 11, fontWeight:700,
          letterSpacing:'0.2em', textTransform:'uppercase',
          color: accent, marginBottom: 10,
        }}>{eyebrow}</div>

        <h2 style={{
          fontFamily:"'Unbounded',sans-serif", fontWeight:700,
          fontSize: 42, lineHeight:1.05, letterSpacing:'-0.02em',
          margin:'0 0 22px', color:'#1a1d24',
        }}>{title}</h2>

        <p style={{
          fontFamily:"'Manrope',sans-serif", fontSize:14.5, lineHeight:1.65,
          color:'#4c5160', margin:'0 0 30px', maxWidth: 640,
        }} dangerouslySetInnerHTML={{ __html: introHTML }} />

        {/* 6 gears, with pair highlighted in accent */}
        <div style={{
          padding:'24px 16px',
          background:'#fff',
          border:'1px solid #ece8dd',
          borderRadius: 6,
          display:'flex', justifyContent:'space-between', gap:8,
          marginBottom: 34,
        }}>
          {order.map(k => (
            <GearSVG key={k} letter={k} active={activeSet.has(k)}
                     accent={accent} size={80} label={G[k].name} />
          ))}
        </div>

        {/* Two definition columns */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 28 }}>
          {pair.map(k => {
            const g = G[k];
            const d = REPORT_DESCRIPTIONS[k];
            return (
              <div key={k}>
                <div style={{
                  fontFamily:"'Unbounded',sans-serif", fontWeight:700, fontSize: 22,
                  color: accent, letterSpacing:'-0.01em', marginBottom: 10,
                }}>
                  {g.name.toUpperCase()}
                </div>
                <p style={{
                  fontFamily:"'Manrope',sans-serif", fontSize:12.5,
                  lineHeight:1.6, color:'#4c5160', margin:'0 0 14px',
                }}>{d.full}</p>
                <div style={{
                  borderTop:'1px solid #ece8dd',
                  paddingTop: 12,
                  display:'grid', gap: 8,
                }}>
                  <MetaRow label="Сила" value={d.strength} accent={accent} />
                  <MetaRow label="Тень" value={d.shadow} accent={accent} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Big watermark name */}
      <div style={{
        position:'absolute', bottom: 70, right: 64,
        fontFamily:"'Unbounded',sans-serif", fontWeight:700,
        fontSize: 34, letterSpacing:'-0.02em',
        color: '#ece8dd',
        pointerEvents:'none',
      }}>{name}</div>

      <ReportFooter page={pageNum} total={8} name={name} />
    </ReportPage>
  );
}

function MetaRow({ label, value, accent }) {
  return (
    <div style={{ display:'flex', gap: 10 }}>
      <span style={{
        fontFamily:"'Manrope',sans-serif",
        fontSize: 10, fontWeight: 700,
        letterSpacing:'0.12em', textTransform:'uppercase',
        color: accent, minWidth: 44, paddingTop: 2,
      }}>{label}</span>
      <span style={{
        fontFamily:"'Manrope',sans-serif", fontSize: 12.5,
        color:'#1a1d24', lineHeight: 1.5,
      }}>{value}</span>
    </div>
  );
}

function GeniusesPage({ name, top }) {
  const G = window.REPORT_GENIUSES;
  const [a, b] = top;
  return (
    <ResultsSection
      variant="04 Geniuses"
      pageNum={4}
      accent="#1a9b5a"
      eyebrow="Результаты · рабочие таланты"
      title="Твои рабочие таланты"
      introHTML={`По результатам теста, твои рабочие таланты — <b>${G[a].name.toUpperCase()}</b> и <b>${G[b].name.toUpperCase()}</b>. Это деятельность, которая приносит радость, энергию и страсть. Именно поэтому ты особенно силен в этих областях.`}
      pair={top}
      name={name}
    />
  );
}

function CompetenciesPage({ name, mid }) {
  const G = window.REPORT_GENIUSES;
  const [a, b] = mid;
  return (
    <ResultsSection
      variant="05 Competencies"
      pageNum={5}
      accent="#e8a21b"
      eyebrow="Результаты · компетенции"
      title="Твои компетенции"
      introHTML={`Твои компетенции — <b>${G[a].name.toUpperCase()}</b> и <b>${G[b].name.toUpperCase()}</b>. Это деятельность, которая не приносит ни полного удовлетворения, ни сильного дискомфорта. Ты справляешься в этих областях, но со временем можешь уставать, если нет возможности использовать настоящие таланты.`}
      pair={mid}
      name={name}
    />
  );
}

function FrustrationsPage({ name, low }) {
  const G = window.REPORT_GENIUSES;
  const [a, b] = low;
  return (
    <ResultsSection
      variant="06 Frustrations"
      pageNum={6}
      accent="#c04a3e"
      eyebrow="Результаты · фрустрации"
      title="Твои фрустрации"
      introHTML={`Твои фрустрации — <b>${G[a].name.toUpperCase()}</b> и <b>${G[b].name.toUpperCase()}</b>. Знать их важно по двум причинам: не проводить в этих областях слишком много времени — это ведет к усталости, — и не испытывать ненужной вины за то, что ты не одарен от природы именно в них.`}
      pair={low}
      name={name}
    />
  );
}

Object.assign(window, { ResultsSection, GeniusesPage, CompetenciesPage, FrustrationsPage });
