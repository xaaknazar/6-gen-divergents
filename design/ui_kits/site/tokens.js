// Shared design tokens for UI kit components
// All components inline styles read from this object

window.dsTokens = {
  bg: '#0a0e1a',
  bgSoft: '#111831',
  surface: 'rgba(255,255,255,0.04)',
  surfaceStrong: 'rgba(255,255,255,0.07)',
  surfaceInset: 'rgba(0,0,0,0.25)',
  border: 'rgba(255,255,255,0.09)',
  borderStrong: 'rgba(255,255,255,0.16)',
  fg: '#eef2ff',
  fgDim: '#a6b0cf',
  fgMuted: '#6f7896',
  accentIndigo: '#7c9cff',
  accentLavender: '#b794ff',
  accentPeach: '#ffb199',
  gradientBrand: 'linear-gradient(135deg, #7c9cff 0%, #b794ff 45%, #ffb199 100%)',
  gradientBrandH: 'linear-gradient(90deg, #7c9cff, #b794ff)',
  success: '#10b981',
  error: '#f87171',
  shadowLg: '0 30px 80px -20px rgba(0,0,0,0.6)',
  shadowBtn: '0 8px 24px -8px rgba(124,156,255,0.6)',
  radiusLg: 18,
  radiusMd: 12,
  fontBody: "'Manrope', system-ui, sans-serif",
  fontDisplay: "'Unbounded', 'Manrope', sans-serif",
};

window.dsGeniuses = {
  W: { key:'W', name:'Задумка',     subtitle:'Wonder',      icon:'✦', color:'#8b5cf6', soft:'rgba(139,92,246,0.15)',  tagline:'Дар задаваться большими вопросами.', strength:'Замечаете возможности, которых не видят другие.', shadow:'Иногда застреваете в размышлениях без действий.' },
  I: { key:'I', name:'Изобретение', subtitle:'Invention',   icon:'✸', color:'#f59e0b', soft:'rgba(245,158,11,0.15)',  tagline:'Дар создавать с чистого листа.',     strength:'Создаёте оригинальное и небанальное.',            shadow:'Можете потерять интерес до воплощения идеи.' },
  D: { key:'D', name:'Оценка',      subtitle:'Discernment', icon:'◈', color:'#14b8a6', soft:'rgba(20,184,166,0.15)',  tagline:'Дар интуитивной оценки.',            strength:'Точные решения в условиях неопределённости.',     shadow:'Сложно объяснить логику — «я просто чувствую».' },
  G: { key:'G', name:'Гальванизация', subtitle:'Galvanizing', icon:'▲', color:'#ef4444', soft:'rgba(239,68,68,0.15)',  tagline:'Дар вдохновлять на действия.',        strength:'Запускаете импульс и преодолеваете инерцию.',     shadow:'Вдохновляете на то, что ещё не готово к запуску.' },
  E: { key:'E', name:'Поддержка',   subtitle:'Enablement',  icon:'♥', color:'#10b981', soft:'rgba(16,185,129,0.15)', tagline:'Дар помогать и откликаться.',         strength:'Создаёте атмосферу безопасности и заботы.',       shadow:'Забываете о собственных границах.' },
  T: { key:'T', name:'Доводка',     subtitle:'Tenacity',    icon:'◆', color:'#3b82f6', soft:'rgba(59,130,246,0.15)', tagline:'Дар доводить до результата.',         strength:'Гарантируете, что работа действительно завершается.', shadow:'Можете ставить задачу выше людей.' },
};

window.dsGeniusOrder = ['W','I','D','G','E','T'];
