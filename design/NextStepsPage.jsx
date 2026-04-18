// Gear SVG matching the production print report in source/script.js
function GearSVG({ letter, active, accent, size=110, label }) {
  const fill   = active ? accent : '#e8ecf3';
  const inner  = '#ffffff';
  const txt    = active ? '#ffffff' : '#a7adb9';
  const stroke = active ? accent : '#c7ccd6';
  return (
    <div style={{ textAlign:'center', width: size, flexShrink: 0, overflow:'visible' }}>
      <svg viewBox="-52 -52 104 104" width={size} height={size} style={{ display:'block', margin:'0 auto' }}>
        <g fill={fill} stroke={stroke} strokeWidth="1.4" strokeLinejoin="round">
          <path d="M -8 -46 L 8 -46 L 11 -37 L 20 -34 L 28 -40 L 40 -28 L 34 -20 L 37 -11 L 46 -8 L 46 8 L 37 11 L 34 20 L 40 28 L 28 40 L 20 34 L 11 37 L 8 46 L -8 46 L -11 37 L -20 34 L -28 40 L -40 28 L -34 20 L -37 11 L -46 8 L -46 -8 L -37 -11 L -34 -20 L -40 -28 L -28 -40 L -20 -34 L -11 -37 Z" />
        </g>
        <circle r="22" fill={inner} stroke={stroke} strokeWidth="1.4" />
        <text x="0" y="2" textAnchor="middle" dominantBaseline="middle"
              fontFamily="Unbounded, Manrope, sans-serif" fontWeight="700"
              fontSize="26" fill={active ? accent : txt}>{letter}</text>
      </svg>
      <div style={{
        marginTop: 8,
        fontFamily: "'Manrope', sans-serif",
        fontSize: size < 85 ? 9.5 : 10.5,
        fontWeight: 700,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: active ? accent : '#8a8f9a',
        lineHeight: 1.15,
        whiteSpace: 'nowrap',
      }}>{label}</div>
    </div>
  );
}

Object.assign(window, { GearSVG });
