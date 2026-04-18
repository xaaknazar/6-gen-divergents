// Page 3 — Results summary (compact: all 6 types categorized, one sentence each)
function SummaryPage({ name, top, mid, low }) {
  const G = window.REPORT_GENIUSES;

  const summary = {
    W: 'Получаешь энергию и радость, размышляя о потенциале и возможностях в любой ситуации.',
    I: 'Получаешь энергию и радость, создавая оригинальные идеи и решения с нуля.',
    D: 'Получаешь энергию и радость, оценивая идеи интуитивно, а не по данным.',
    G: 'Получаешь энергию и радость, объединяя людей и запуская движение вокруг идеи.',
    E: 'Получаешь энергию и радость, откликаясь на запросы других и подставляя плечо.',
    T: 'Получаешь энергию и радость, доводя задачи до завершения и добиваясь результата.',
  };
  const comp = {
    W: 'Справляешься с размышлением о возможностях, но не заряжаешься от него.',
    I: 'Способен придумывать новое при необходимости, но не испытываешь от этого подъема.',
    D: 'Умеешь оценивать и чувствовать идеи, но не считаешь это своим призванием.',
    G: 'Способен вдохновлять и объединять людей, но не возвращаешься к этому за энергией.',
    E: 'Умеешь поддерживать и помогать, но это не главный источник радости.',
    T: 'Можешь довести дело до конца, если требуется — просто без подъема сил.',
  };
  const frus = {
    W: 'Не получаешь особой радости от долгих размышлений и больших вопросов.',
    I: 'Не получаешь особой радости от создания идей и решений с чистого листа.',
    D: 'Не получаешь особой радости от интуитивной оценки идей и планов.',
    G: 'Не получаешь особой радости от того, чтобы заряжать людей действовать.',
    E: 'Не получаешь особой радости от помощи и поддержки в реализации идей других.',
    T: 'Не получаешь особой радости от необходимости доводить задачи до конца.',
  };

  const Section = ({ eyebrow, accent, keys, copy, pageLabel }) => (
    <div style={{ marginBottom: 26 }}>
      <div style={{
        fontFamily:"'Manrope',sans-serif", fontSize:11, fontWeight:700,
        letterSpacing:'0.2em', textTransform:'uppercase',
        color: accent, marginBottom: 10,
      }}>{eyebrow}</div>
      <div style={{ display:'grid', gap: 10 }}>
        {keys.map(k => {
          const g = G[k];
          return (
            <div key={k} style={{
              display:'flex', gap: 16,
              padding:'14px 16px',
              background:'#fff',
              border:'1px solid #ece8dd',
              borderLeft: `3px solid ${accent}`,
              borderRadius: 4,
              alignItems: 'center',
            }}>
              <div style={{
                width: 36, height: 36, flexShrink: 0,
                borderRadius: 8,
                background: accent, color: '#fff',
                display:'grid', placeItems:'center',
                fontFamily:"'Unbounded',sans-serif", fontWeight:700, fontSize:15,
              }}>{k}</div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{
                  fontFamily:"'Unbounded',sans-serif", fontWeight:700, fontSize:13,
                  color:'#1a1d24', letterSpacing:'-0.005em',
                  marginBottom: 3,
                }}>
                  {g.name.toUpperCase()}
                </div>
                <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:12, lineHeight:1.5, color:'#4c5160' }}>
                  {copy[k]}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <ReportPage variant="03 Summary">
      <ReportHeader eyebrow="Результаты" accent="#4c5160" />
      <div style={{ padding:'32px 64px 80px' }}>
        <h2 style={{
          fontFamily:"'Unbounded',sans-serif", fontWeight:700,
          fontSize: 36, lineHeight:1.08, letterSpacing:'-0.02em',
          margin:'0 0 10px', color:'#1a1d24',
        }}>Твои результаты</h2>
        <p style={{ fontFamily:"'Manrope',sans-serif", fontSize:13.5, lineHeight:1.6, color:'#4c5160', margin:'0 0 28px', maxWidth: 620 }}>
          <b style={{color:'#1a1d24'}}>{name}</b>, ниже — краткая сводка твоего профиля по
          шести типам. На следующих страницах каждая пара разобрана подробно.
        </p>

        <Section eyebrow="Рабочие таланты" accent="#1a9b5a" keys={top} copy={summary} />
        <Section eyebrow="Компетенции"     accent="#e8a21b" keys={mid} copy={comp} />
        <Section eyebrow="Фрустрации"      accent="#c04a3e" keys={low} copy={frus} />
      </div>
      <ReportFooter page={3} total={8} name={name} />
    </ReportPage>
  );
}

Object.assign(window, { SummaryPage });
