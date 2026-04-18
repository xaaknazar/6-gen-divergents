// Page 2 — Overview of the model (Brief Overview of Working Genius equivalent)
function OverviewPage({ name='Азамат Жусупов' }) {
  const G = window.REPORT_GENIUSES;
  const types = [
    { k:'W', def:'Замечает потребность в улучшении или изменении.' },
    { k:'I', def:'Подтверждает важность этой потребности и предлагает идею или решение.' },
    { k:'D', def:'Оценивает ценность и жизнеспособность идеи или решения.' },
    { k:'G', def:'Создает энтузиазм и импульс для действий вокруг идеи.' },
    { k:'E', def:'Инициирует поддержку и помогает в реализации.' },
    { k:'T', def:'Доводит решение до завершения и добивается результата.' },
  ];
  return (
    <ReportPage variant="02 Overview">
      <ReportHeader eyebrow="Обзор" accent="#4c5160" />
      <div style={{ padding:'40px 64px 80px', maxWidth: 680 }}>
        <h2 style={{
          fontFamily:"'Unbounded',sans-serif",
          fontWeight:700, fontSize: 36, lineHeight:1.1,
          letterSpacing:'-0.02em', margin:'0 0 20px', color:'#1a1d24',
        }}>Шесть типов рабочего таланта</h2>
        <p style={{ fontFamily:"'Manrope',sans-serif", fontSize:14.5, lineHeight:1.65, color:'#4c5160', margin:'0 0 14px' }}>
          У каждого из нас есть два типа деятельности — <b style={{color:'#1a1d24'}}>рабочие таланты</b>, — которые дают нам радость, энергию и страсть. Еще два — <b style={{color:'#1a1d24'}}>фрустрации</b> — отнимают силы. Оставшиеся два — <b style={{color:'#1a1d24'}}>компетенции</b> — нейтральны: мы можем делать их хорошо какое‑то время, но со временем устаем.
        </p>
        <p style={{ fontFamily:"'Manrope',sans-serif", fontSize:14.5, lineHeight:1.65, color:'#4c5160', margin:'0 0 36px' }}>
          Шесть типов образуют взаимозависимую модель — полный цикл любой работы. Каждый тип передает эстафету следующему: все начинается с <b>Задумки</b> и завершается <b>Доводкой</b>.
        </p>

        {/* Cycle visualization — horizontal gear row with arrows */}
        <div style={{
          display:'flex', alignItems:'center', gap: 4, justifyContent:'space-between',
          margin: '0 -4px 44px',
        }}>
          {window.REPORT_ORDER.map((k, i) => (
            <React.Fragment key={k}>
              <GearSVG letter={k} active accent={G[k].color} size={78} label={G[k].name} />
              {i < 5 && <div style={{ color:'#cfc9b8', fontSize: 18, marginTop:-16 }}>→</div>}
            </React.Fragment>
          ))}
        </div>

        {/* Definitions grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'18px 30px' }}>
          {types.map(({k, def}) => {
            const g = G[k];
            return (
              <div key={k} style={{ display:'flex', gap:14 }}>
                <div style={{
                  width: 32, height: 32, flexShrink: 0,
                  borderRadius: 8,
                  background: g.color,
                  color: '#fff',
                  display:'grid', placeItems:'center',
                  fontFamily:"'Unbounded',sans-serif", fontWeight:700, fontSize:14,
                }}>{k}</div>
                <div>
                  <div style={{ fontFamily:"'Unbounded',sans-serif", fontWeight:700, fontSize:14, color:'#1a1d24', marginBottom: 3, letterSpacing:'-0.005em' }}>
                    {g.name.toUpperCase()}
                  </div>
                  <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:12.5, lineHeight:1.5, color:'#4c5160' }}>{def}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ReportFooter page={2} total={8} name={name} />
    </ReportPage>
  );
}

Object.assign(window, { OverviewPage });
