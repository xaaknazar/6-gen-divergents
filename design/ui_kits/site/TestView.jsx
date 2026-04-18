const SAMPLE_QUESTIONS = [
  { n: 1,  type: 'T', text: 'У меня чрезвычайно высокие стандарты точности и качества.' },
  { n: 2,  type: 'G', text: 'У меня есть дар объединять людей вокруг плана или идеи и вдохновлять их на действия.' },
  { n: 3,  type: 'W', text: 'Мне удобно сидеть и размышлять о смысле вещей дольше, чем большинству других.' },
  { n: 4,  type: 'I', text: 'Я не могу не придумывать новые и оригинальные идеи, даже когда в этом нет необходимости.' },
  { n: 5,  type: 'E', text: 'Люди, которые меня знают, сказали бы, что я естественно откликаюсь на нужды других.' },
];

const ANSWERS = [
  { label: 'Совершенно не согласен(-на)', value: 1 },
  { label: 'Иногда / немного',            value: 2 },
  { label: 'Полностью согласен(-на)',     value: 3 },
];

function TestView({ onFinish }) {
  const t = window.dsTokens;
  const [i, setI] = React.useState(0);
  const total = 42;
  const q = SAMPLE_QUESTIONS[i % SAMPLE_QUESTIONS.length];
  const displayN = i + 1;
  const pct = Math.round(((i + 1) / total) * 100);

  function pick() {
    if (i < total - 1) setI(i + 1);
    else onFinish();
  }

  return (
    <section style={{ maxWidth: 720, margin: '20px auto 0' }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontSize: 13, color: t.fgDim, marginBottom: 10,
          fontWeight: 500, letterSpacing: '0.04em',
        }}>
          <span>{displayN} из {total}</span>
          <span>{pct}%</span>
        </div>
        <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${pct}%`,
            background: t.gradientBrandH,
            borderRadius: 999,
            transition: 'width 400ms cubic-bezier(0.22, 1, 0.36, 1)',
          }} />
        </div>
      </div>

      <div key={i} style={{
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 18,
        padding: '36px 32px',
        marginBottom: 20,
        backdropFilter: 'blur(14px)',
        boxShadow: t.shadowLg,
        animation: 'dsSlideIn 350ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}>
        <div style={{ fontSize: 13, color: t.fgMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12, fontWeight: 600 }}>
          Вопрос {displayN}
        </div>
        <h2 style={{
          fontFamily: t.fontDisplay,
          fontSize: 'clamp(20px, 2.8vw, 26px)',
          fontWeight: 500, lineHeight: 1.35,
          margin: '0 0 30px',
          letterSpacing: '-0.01em',
        }}>{q.text}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {ANSWERS.map(a => <AnswerButton key={a.value} label={a.label} onClick={pick} />)}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <GhostButton disabled={i === 0} onClick={()=>setI(Math.max(0, i - 1))}>← Назад</GhostButton>
        <div style={{ color: t.fgMuted, fontSize: 13 }}>Нажмите на вариант, чтобы продолжить</div>
      </div>

      <style>{`@keyframes dsSlideIn { from { opacity:0; transform: translateY(14px);} to { opacity:1; transform: translateY(0);} }`}</style>
    </section>
  );
}

function AnswerButton({ label, onClick }) {
  const t = window.dsTokens;
  const [hover, setHover] = React.useState(false);
  const [sel, setSel] = React.useState(false);
  return (
    <button
      onClick={() => { setSel(true); setTimeout(onClick, 180); }}
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
      style={{
        width: '100%',
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '18px 20px',
        borderRadius: 12,
        border: `1.5px solid ${hover||sel ? t.accentIndigo : t.borderStrong}`,
        background: sel ? 'rgba(124,156,255,0.15)' : hover ? 'rgba(124,156,255,0.08)' : 'rgba(0,0,0,0.18)',
        color: t.fg,
        textAlign: 'left',
        fontSize: 15,
        fontWeight: 500,
        fontFamily: t.fontBody,
        cursor: 'pointer',
        transform: hover ? 'translateX(3px)' : 'translateX(0)',
        transition: 'all 180ms ease',
      }}
    >
      <span style={{
        width: 20, height: 20, borderRadius: '50%',
        border: `1.5px solid ${hover||sel ? t.accentIndigo : t.borderStrong}`,
        flexShrink: 0,
        position: 'relative',
      }}>
        {sel && <span style={{ position: 'absolute', inset: 3, borderRadius: '50%', background: t.accentIndigo }} />}
      </span>
      <span>{label}</span>
    </button>
  );
}

Object.assign(window, { TestView, AnswerButton });
