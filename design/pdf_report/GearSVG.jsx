// Square SVG matching the production print report in source/script.js
function GearSVG({ letter, active, accent, size=110, label }) {
  const fill   = active ? accent : '#e8ecf3';
  const txt    = active ? '#ffffff' : '#a7adb9';
  const stroke = active ? accent : '#c7ccd6';
  return (
    <div style={{ textAlign:'center', width: size, flexShrink: 0, overflow:'visible' }}>
      <svg viewBox="-46 -46 92 92" width={size} height={size}
           preserveAspectRatio="xMidYMid meet"
           style={{ display:'block', margin:'0 auto' }}>
        <rect x="-44" y="-44" width="88" height="88" rx="18" ry="18"
              fill={fill} stroke={stroke} strokeWidth="1.4" />
        <text x="0" y="2" textAnchor="middle" dominantBaseline="middle"
              fontFamily="Unbounded, Manrope, sans-serif" fontWeight="700"
              fontSize="54" fill={txt}>{letter}</text>
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
