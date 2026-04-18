const DEMO_SCORES = { W: 18, E: 17, G: 14, D: 13, T: 8, I: 7 };

function ResultsView({ name }) {
  const t = window.dsTokens;
  const G = window.dsGeniuses;
  const order = window.dsGeniusOrder;
  const max = 21;
  const ranked = order.map(k => ({ key:k, score: DEMO_SCORES[k], pct: DEMO_SCORES[k]/max }))
                      .sort((a,b)=>b.score-a.score);
  const top = ranked.slice(0,2);
  const mid = ranked.slice(2,4);
  const low = ranked.slice(4,6);
  const chartRef = React.useRef(null);

  React.useEffect(() => {
    if (!chartRef.current || !window.Chart) return;
    if (chartRef.current._c) chartRef.current._c.destroy();
    const labels = order.map(k => G[k].name);
    const data = order.map(k => Math.round((DEMO_SCORES[k]/max)*100));
    chartRef.current._c = new window.Chart(chartRef.current.getContext('2d'), {
      type: 'radar',
      data: { labels, datasets: [{
        data,
        backgroundColor: 'rgba(124, 156, 255, 0.18)',
        borderColor: 'rgba(183, 148, 255, 0.9)',
        borderWidth: 2,
        pointBackgroundColor: order.map(k => G[k].color),
        pointBorderColor: '#0a0e1a',
        pointBorderWidth: 2,
        pointRadius: 5,
      }]},
      options: {
        responsive: true, maintainAspectRatio: true,
        plugins: { legend: { display: false } },
        scales: { r: {
          min: 0, max: 100,
          ticks: { stepSize: 20, color: t.fgMuted, backdropColor: 'transparent', font: { size: 11 }, callback: v => v+'%' },
          grid: { color: 'rgba(255,255,255,0.08)' },
          angleLines: { color: 'rgba(255,255,255,0.08)' },
          pointLabels: { color: t.fg, font: { size: 13, family: 'Manrope', weight: '600' } }
        }}
      }
    });
  }, []);

  return (
    <section style={{ maxWidth: 1040, margin: '10px auto 0' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ marginBottom: 18 }}><Eyebrow>Результат</Eyebrow></div>
        <h1 style={{
          fontFamily: t.fontDisplay,
          fontSize: 'clamp(30px, 5vw, 48px)',
          margin: '0 0 10px', fontWeight: 700, letterSpacing: '-0.02em',
        }}>{name}</h1>
        <p style={{ color: t.fgDim, fontSize: 16, margin: 0 }}>Твой профиль по 6 типам рабочего таланта</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: 20, marginBottom: 40,
      }}>
        <Card>
          <CardTitle>Карта талантов</CardTitle>
          <div style={{ position: 'relative', aspectRatio: '1/1', maxWidth: 460, margin: '0 auto' }}>
            <canvas ref={chartRef} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px 16px', marginTop: 22, fontSize: 13 }}>
            {order.map(k => {
              const g = G[k]; const pct = Math.round((DEMO_SCORES[k]/max)*100);
              return (
                <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 10, color: t.fgDim }}>
                  <span style={{ width:12,height:12,borderRadius:3,background:g.color,flexShrink:0 }} />
                  <span>{g.name}</span>
                  <span style={{ marginLeft: 'auto', color: t.fg, fontWeight: 600 }}>{pct}%</span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <CardTitle>Твои рабочие таланты</CardTitle>
          <PillList items={top} G={G} />
          <CardTitle style={{ marginTop: 28 }}>Компетенции</CardTitle>
          <PillList items={mid} G={G} />
          <CardTitle style={{ marginTop: 28 }}>Фрустрации</CardTitle>
          <PillList items={low} G={G} />
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 36 }}>
        {ranked.map(r => <DetailCard key={r.key} r={r} g={G[r.key]} />)}
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <PrimaryButton style={{ width: 'auto', minWidth: 180 }}>Скачать PDF</PrimaryButton>
        <GhostButton>Скопировать результат</GhostButton>
        <GhostButton>Пройти заново</GhostButton>
      </div>
    </section>
  );
}

function Card({ children, style }) {
  const t = window.dsTokens;
  return (
    <div style={{
      background: t.surface, border: `1px solid ${t.border}`,
      borderRadius: 18, padding: 28, backdropFilter: 'blur(14px)',
      ...style,
    }}>{children}</div>
  );
}

function CardTitle({ children, style }) {
  const t = window.dsTokens;
  return (
    <div style={{
      fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase',
      color: t.fgMuted, fontWeight: 700, marginBottom: 18, ...style,
    }}>{children}</div>
  );
}

function PillList({ items, G }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map(r => {
        const g = G[r.key];
        return (
          <div key={r.key} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '14px 16px', borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.09)',
            background: 'rgba(255,255,255,0.07)',
          }}>
            <div style={{ width:40, height:40, display:'grid', placeItems:'center', borderRadius:10, background:g.soft, color:g.color, fontSize:18, fontWeight:700, fontFamily:"'Unbounded',sans-serif", flexShrink:0 }}>{g.icon}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontWeight:700, fontSize:15, lineHeight:1.2, marginBottom:2 }}>{g.name}</div>
              <div style={{ color:'#6f7896', fontSize:12 }}>{g.tagline}</div>
            </div>
            <div style={{ fontFamily:"'Unbounded',sans-serif", fontSize:20, fontWeight:700 }}>{r.score}</div>
          </div>
        );
      })}
    </div>
  );
}

function DetailCard({ r, g }) {
  const t = window.dsTokens;
  return (
    <div style={{
      background: t.surface, border: `1px solid ${t.border}`,
      borderRadius: 18, padding: 24, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position:'absolute', inset:'0 auto 0 0', width:3, background:g.color }} />
      <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:14 }}>
        <div style={{ width:44, height:44, display:'grid', placeItems:'center', borderRadius:12, background:g.soft, color:g.color, fontSize:20, fontWeight:700, fontFamily:t.fontDisplay }}>{g.icon}</div>
        <div>
          <div style={{ fontFamily:t.fontDisplay, fontSize:20, fontWeight:700, margin:'0 0 2px' }}>{g.name}</div>
          <div style={{ fontSize:12, color:t.fgMuted, letterSpacing:'0.08em', textTransform:'uppercase', fontWeight:600 }}>{g.subtitle}</div>
        </div>
        <div style={{ marginLeft:'auto', fontFamily:t.fontDisplay, fontSize:22, fontWeight:700, color:g.color }}>
          {Math.round(r.pct*100)}<span style={{ color:t.fgMuted, fontSize:14, fontWeight:500 }}>%</span>
        </div>
      </div>
      <p style={{ color:t.fgDim, fontSize:14.5, lineHeight:1.6, margin:'0 0 14px' }}>
        Описание дара <b style={{ color: t.fg }}>{g.name}</b> — {g.tagline.toLowerCase()} Эта сила раскрывается, когда команде нужно именно то, что вы делаете естественно.
      </p>
      <div style={{ display:'grid', gap:8, fontSize:13 }}>
        <div style={{ display:'flex', gap:8 }}>
          <span style={{ color:t.fgMuted, textTransform:'uppercase', letterSpacing:'0.08em', fontSize:11, fontWeight:700, width:72, flexShrink:0, paddingTop:3 }}>Сила</span>
          <span style={{ color:t.fg }}>{g.strength}</span>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <span style={{ color:t.fgMuted, textTransform:'uppercase', letterSpacing:'0.08em', fontSize:11, fontWeight:700, width:72, flexShrink:0, paddingTop:3 }}>Тень</span>
          <span style={{ color:t.fg }}>{g.shadow}</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ResultsView, Card, CardTitle, PillList, DetailCard });
