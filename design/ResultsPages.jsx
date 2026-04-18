// Shared report primitives: page frame, header, footer

const REPORT_GENIUSES = {
  W: { key:'W', name:'Задумка',       subtitle:'Wonder',       color:'#8b5cf6' },
  I: { key:'I', name:'Изобретение',   subtitle:'Invention',    color:'#f59e0b' },
  D: { key:'D', name:'Оценка',        subtitle:'Discernment',  color:'#14b8a6' },
  G: { key:'G', name:'Гальванизация', subtitle:'Galvanizing',  color:'#ef4444' },
  E: { key:'E', name:'Поддержка',     subtitle:'Enablement',   color:'#10b981' },
  T: { key:'T', name:'Доводка',       subtitle:'Tenacity',     color:'#3b82f6' },
};
const REPORT_ORDER = ['W','I','D','G','E','T'];

window.REPORT_GENIUSES = REPORT_GENIUSES;
window.REPORT_ORDER = REPORT_ORDER;

// A4 at 96dpi ≈ 794 × 1123px
function ReportPage({ children, variant='default' }) {
  return (
    <section
      data-screen-label={`Page · ${variant}`}
      style={{
        width: 794,
        minHeight: 1123,
        background: '#faf8f3',
        margin: '24px auto',
        boxShadow: '0 30px 80px -30px rgba(0,0,0,0.35)',
        position: 'relative',
        fontFamily: "'Manrope', sans-serif",
        color: '#1a1d24',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </section>
  );
}

function ReportHeader({ eyebrow, accent='#1a1d24', eyebrowSize=11 }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '28px 56px 20px',
      borderBottom: `1px solid #ece8dd`,
    }}>
      <div style={{
        fontFamily: 'Inter',
        fontWeight: 800,
        fontSize: 18,
        letterSpacing: '0.01em',
        color: '#1a1d24',
        display: 'flex', alignItems: 'center', gap: 0,
        opacity: 1,
      }}>
        <img src="divergents-logo.png" alt="" style={{ height: 50, width: 50, display:'block', margin: 0, opacity: 1 }} />
        Divergents<span style={{ color: '#8a8f9a', fontWeight: 400, margin: '0 8px' }}>·</span>
        <span style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 600, fontSize: 15, color: '#4c5160' }}>
          6 гениев команды
        </span>
      </div>
      {eyebrow && (
        <div style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: eyebrowSize, fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: accent,
        }}>{eyebrow}</div>
      )}
    </div>
  );
}

function ReportFooter({ page, total=8, name='' }) {
  return (
    <div style={{
      position: 'absolute', bottom: 24, left: 56, right: 56,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      fontFamily: "'Manrope', sans-serif",
      fontSize: 10,
      color: '#8a8f9a',
      letterSpacing: '0.06em',
      paddingTop: 14,
      borderTop: '1px solid #ece8dd',
    }}>
      <span style={{ display:'inline-flex', alignItems:'center', gap: 0 }}>
        <img src="divergents-logo.png" alt="" style={{ height: 14, width: 14, display:'block', marginRight: 2 }} />
        Divergents.kz · методология The 6 Types of Working Genius
      </span>
      <span>{name}</span>
      <span>{page} / {total}</span>
    </div>
  );
}

// Tall vertical rule of the six letters on the side of the page (aesthetic accent)
function SideMonogram({ highlights=[], accent='#1a1d24' }) {
  return (
    <div style={{
      position: 'absolute',
      top: 110, right: 20,
      display: 'flex', flexDirection: 'column',
      gap: 14,
      fontFamily: "'Unbounded', sans-serif",
      fontWeight: 700, fontSize: 13,
      color: '#cfc9b8',
      letterSpacing: '0.1em',
    }}>
      {REPORT_ORDER.map(k => (
        <span key={k} style={{
          color: highlights.includes(k) ? accent : '#cfc9b8',
          transition: 'color 200ms'
        }}>{k}</span>
      ))}
    </div>
  );
}

Object.assign(window, { ReportPage, ReportHeader, ReportFooter, SideMonogram });
