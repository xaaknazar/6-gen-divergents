// Page 1 — Cover (hero only; Overview is page 2)
function CoverPage({ name='Азамат Жусупов', top=['E','W'] }) {
  const G = window.REPORT_GENIUSES;
  return (
    <ReportPage variant="01 Cover">
      <ReportHeader eyebrow="18.04.2026" eyebrowSize={14} />

      {/* grid + glow background */}
      <div style={{
        position:'absolute', top:90, left:-40, right:-40, height:560,
        backgroundImage:
          'linear-gradient(rgba(40,44,60,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(40,44,60,0.04) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        WebkitMaskImage: 'radial-gradient(circle at 50% 30%, black 30%, transparent 75%)',
        maskImage: 'radial-gradient(circle at 50% 30%, black 30%, transparent 75%)',
      }} />
      <div style={{
        position:'absolute', top:140, left:'50%', transform:'translateX(-50%)',
        width: 720, height: 460,
        background: 'radial-gradient(closest-side, rgba(124,156,255,0.35), transparent 70%), radial-gradient(closest-side, rgba(255,177,153,0.28), transparent 70%)',
        filter: 'blur(30px)',
        pointerEvents:'none',
      }} />

      <div style={{ position:'relative', padding:'74px 64px 0' }}>
        <div style={{
          fontFamily:"'Manrope',sans-serif",
          fontSize:11, fontWeight:700,
          letterSpacing:'0.24em',
          textTransform:'uppercase',
          color:'#8a8f9a',
          marginBottom: 18,
        }}>Отчет по ассессменту · 6 гениев команды</div>

        <h1 style={{
          fontFamily:"'Unbounded',sans-serif",
          fontWeight:700,
          fontSize: 66,
          lineHeight: 1.02,
          letterSpacing:'-0.03em',
          margin: '0 0 22px',
          color:'#1a1d24',
          maxWidth: 640,
        }}>
          Найди дары,<br/>которые ты приносишь в работу.
        </h1>

        <p style={{
          fontFamily:"'Manrope',sans-serif",
          fontSize: 16,
          lineHeight: 1.6,
          color:'#4c5160',
          margin:'0 0 46px',
          maxWidth: 540,
        }}>
          Результаты ассессмента <b style={{color:'#1a1d24'}}>{name}</b>. На следующих
          страницах — твой уникальный профиль по шести типам рабочего таланта.
        </p>

        {/* 6 gears row, top two highlighted */}
        <div style={{ display:'flex', justifyContent:'space-between', gap:10, margin:'0 0 44px' }}>
          {window.REPORT_ORDER.map(k => {
            const g = G[k];
            const active = top.includes(k);
            return <GearSVG key={k} letter={k} active={active} accent={g.color} size={88} label={g.name} />;
          })}
        </div>

        <div style={{
          padding: '20px 22px',
          border: '1px solid #ece8dd',
          borderLeft: '3px solid #1a1d24',
          background: '#fff',
          borderRadius: 4,
          maxWidth: 560,
        }}>
          <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:10, fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'#8a8f9a', marginBottom:6 }}>Ведущие таланты</div>
          <div style={{ fontFamily:"'Unbounded',sans-serif", fontSize:24, fontWeight:700, letterSpacing:'-0.01em', color:'#1a1d24' }}>
            {top.map(k => G[k].name).join(' · ')}
          </div>
        </div>
      </div>

      <ReportFooter page={1} total={8} name={name} />
    </ReportPage>
  );
}

Object.assign(window, { CoverPage });
