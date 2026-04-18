function IntroView({ onStart }) {
  const t = window.dsTokens;
  const G = window.dsGeniuses;
  const order = window.dsGeniusOrder;
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [err, setErr] = React.useState(null);

  function start() {
    if (name.trim().length < 2) return setErr('Укажите имя и фамилию');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setErr('Проверьте email');
    setErr(null);
    onStart({ name: name.trim(), email: email.trim() });
  }

  return (
    <section style={{ maxWidth: 760, margin: '24px auto 0', textAlign: 'center' }}>
      <h1 style={{
        fontFamily: t.fontDisplay, fontSize: 'clamp(36px, 6vw, 62px)',
        lineHeight: 1.05, margin: '0 0 18px', fontWeight: 700,
        letterSpacing: '-0.02em',
      }}>
        Найди свой{' '}
        <span style={{
          background: t.gradientBrand,
          WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
        }}>рабочий талант</span>
      </h1>
      <p style={{ fontSize: 17, color: t.fgDim, maxWidth: 560, margin: '0 auto 36px' }}>
        42 утверждения · 5–7 минут
      </p>

      <div style={{
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 18,
        padding: 28,
        backdropFilter: 'blur(14px)',
        boxShadow: t.shadowLg,
        textAlign: 'left',
      }}>
        <Field label="Имя и фамилия" value={name} onChange={setName} placeholder="Например, Азамат Жусупов" />
        <Field label="Email" value={email} onChange={setEmail} placeholder="you@example.com" type="email" />
        <PrimaryButton onClick={start} style={{ width: '100%', marginTop: 8 }}>
          Начать тест <span style={{ fontSize: 18 }}>→</span>
        </PrimaryButton>
        {err && <p style={{ color: t.error, fontSize: 14, marginTop: 10, marginBottom: 0 }}>{err}</p>}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: 10, marginTop: 32,
      }}>
        {order.map(k => {
          const g = G[k];
          return (
            <div key={k} style={{
              padding: '14px 8px',
              borderRadius: 12,
              border: `1px solid ${t.border}`,
              background: t.surface,
              textAlign: 'center',
              fontSize: 12,
              color: t.fgDim,
            }}>
              <span style={{ fontSize: 20, display: 'block', marginBottom: 4, color: g.color, fontFamily: t.fontDisplay }}>{g.icon}</span>
              <span style={{ fontWeight: 600, color: t.fg, fontSize: 13 }}>{g.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Field({ label, value, onChange, placeholder, type='text' }) {
  const t = window.dsTokens;
  const [focus, setFocus] = React.useState(false);
  return (
    <label style={{ display: 'block', marginBottom: 14 }}>
      <span style={{ display: 'block', fontSize: 13, color: t.fgDim, marginBottom: 8, fontWeight: 500 }}>{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        onFocus={()=>setFocus(true)}
        onBlur={()=>setFocus(false)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '14px 16px',
          background: focus ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.25)',
          border: `1px solid ${focus ? t.accentIndigo : t.borderStrong}`,
          borderRadius: 12,
          color: t.fg,
          fontSize: 15,
          fontFamily: t.fontBody,
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'all 180ms ease',
        }}
      />
    </label>
  );
}

Object.assign(window, { IntroView, Field });
