// Background layer — fixed grid + glow behind everything
function SiteBackground() {
  return (
    <>
      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
        backgroundSize: '56px 56px',
        WebkitMaskImage: 'radial-gradient(circle at 50% 0%, black 0%, transparent 80%)',
        maskImage: 'radial-gradient(circle at 50% 0%, black 0%, transparent 80%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      <div style={{
        position: 'fixed',
        top: -250, left: '50%',
        transform: 'translateX(-50%)',
        width: 900, height: 700,
        background: 'radial-gradient(closest-side, rgba(124,156,255,0.35), transparent 70%), radial-gradient(closest-side, rgba(183,148,255,0.25) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
    </>
  );
}

function TopBar({ showRestart, onRestart }) {
  const t = window.dsTokens;
  return (
    <header style={{
      position: 'relative', zIndex: 5,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '22px 28px', maxWidth: 1200, margin: '0 auto', width: '100%',
      boxSizing: 'border-box',
    }}>
      <a href="#" onClick={(e)=>e.preventDefault()} style={{
        display: 'flex', alignItems: 'center', gap: 12,
        textDecoration: 'none', color: 'inherit',
        fontFamily: t.fontDisplay,
      }}>
        <span style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: 22, color: t.fg, letterSpacing: '0.01em' }}>Divergents</span>
        <span style={{ color: t.fgMuted, fontWeight: 400, fontSize: 18 }}>·</span>
        <span style={{ color: t.fgDim, fontWeight: 500, fontSize: 17, fontFamily: t.fontBody }}>6 гениев команды</span>
      </a>
      {showRestart && (
        <button onClick={onRestart} style={{
          padding: '10px 16px',
          borderRadius: 12,
          border: `1px solid ${t.borderStrong}`,
          background: t.surface,
          color: t.fgDim,
          fontWeight: 600, fontSize: 13,
          fontFamily: t.fontBody,
          cursor: 'pointer',
        }}>Начать заново</button>
      )}
    </header>
  );
}

function Footer() {
  const t = window.dsTokens;
  return (
    <footer style={{
      position: 'relative', zIndex: 1,
      textAlign: 'center',
      padding: 24,
      color: t.fgMuted,
      fontSize: 13,
    }}>
      <span>Divergents.kz | est. 2020 | All rights reserved</span>
    </footer>
  );
}

function PrimaryButton({ children, onClick, style }) {
  const t = window.dsTokens;
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        padding: '16px 22px',
        borderRadius: 12,
        border: 0,
        background: t.gradientBrand,
        color: '#0a0e1a',
        fontWeight: 700, fontSize: 16,
        fontFamily: t.fontBody,
        cursor: 'pointer',
        boxShadow: t.shadowBtn,
        filter: hover ? 'brightness(1.08)' : 'none',
        transform: hover ? 'translateY(-1px)' : 'translateY(0)',
        transition: 'all 150ms ease',
        ...style,
      }}
    >{children}</button>
  );
}

function GhostButton({ children, onClick, disabled, style }) {
  const t = window.dsTokens;
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
      style={{
        padding: '12px 18px',
        borderRadius: 12,
        border: `1px solid ${t.borderStrong}`,
        background: hover && !disabled ? t.surfaceStrong : t.surface,
        color: hover && !disabled ? t.fg : t.fgDim,
        fontWeight: 600, fontSize: 14,
        fontFamily: t.fontBody,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transition: 'all 150ms ease',
        ...style,
      }}
    >{children}</button>
  );
}

function Eyebrow({ children }) {
  const t = window.dsTokens;
  return (
    <div style={{
      display: 'inline-block',
      padding: '6px 14px',
      border: `1px solid ${t.borderStrong}`,
      borderRadius: 999,
      fontSize: 12,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: t.fgDim,
      background: t.surface,
      fontWeight: 500,
    }}>{children}</div>
  );
}

Object.assign(window, { SiteBackground, TopBar, Footer, PrimaryButton, GhostButton, Eyebrow });
