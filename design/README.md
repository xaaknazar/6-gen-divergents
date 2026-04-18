// Page 7 — Unique pairing — the Lencioni 15 pairings. Shows the user's own.

const PAIRINGS = {
  WI: { title: 'Творческий мечтатель',       blurb: 'Страстный идеалист с бесконечным потоком больших вопросов и идей. Живет с головой в облаках — и именно оттуда приходят открытия.' },
  WD: { title: 'Созерцательный советник',    blurb: 'Вдумчивый, проницательный, тонкий собеседник. Не спешит с выводами, но глубок в мудрости, интуиции и обоснованиях.' },
  WG: { title: 'Философствующий мотиватор',  blurb: 'Возбужденный, любопытный и увлеченный сторонник идей и людей. Редкое сочетание рвения и вдумчивой рефлексии.' },
  WE: { title: 'Идеалистичный помощник',     blurb: 'Преданный, скромный и чуткий участник. Внимательно видит потребности других и не склонен требовать внимания к себе.' },
  WT: { title: 'Методичный исполнитель',     blurb: 'Обстоятельный, практичный и аккуратный. Уникальное сочетание стабильной надежности и тихой глубины.' },
  ID: { title: 'Разборчивый идеатор',        blurb: 'Креативный, интуитивный, уверенный генератор идей. Опирается на чутье и интегративное мышление.' },
  IG: { title: 'Евангелист инноваций',       blurb: 'Возбуждающий и убеждающий создатель и промоутер новых идей. Любопытство, уверенность и заразительный энтузиазм в одном.' },
  IE: { title: 'Адаптивный дизайнер',        blurb: 'Порождает новые идеи в ответ на потребности других. Уникальное сочетание креативности и гибкости.' },
  IT: { title: 'Методичный архитектор',      blurb: 'Точный, надежный, плановый решатель задач. Инновационное мышление встречается с практичной реализацией.' },
  DE: { title: 'Проницательный партнер',     blurb: 'Интуитивный, эмпатичный советник и командный игрок. Бескорыстно и вовремя дает другим именно то, что им нужно.' },
  DG: { title: 'Интуитивный активатор',      blurb: 'Инстинктивный и уверенный принимающий решения. Быстро оценивает ситуацию и мобилизует людей на действие.' },
  DT: { title: 'Рассудительный достигатор',  blurb: 'Надежный, осторожный и сфокусированный исполнитель. Редкое сочетание практичной срочности и интуитивного суждения.' },
  GE: { title: 'Воодушевляющий вдохновитель', blurb: 'Теплый и позитивный «поднимающий дух». Быстро поддерживает и заряжает тех, кому нужна энергия или уверенность.' },
  GT: { title: 'Настойчивый драйвер',        blurb: 'Таск-мастер экстра-класса. Готов подталкивать, напоминать и вписываться сам — лишь бы дело шло.' },
  ET: { title: 'Преданный завершатель',      blurb: 'Отзывчивый, надежный исполнитель. Готов подключиться, когда нужно, и доводит обещанное до конца.' },
};

function pairingKey(pair) {
  const a = pair[0], b = pair[1];
  const order = 'WIDGET'; // W I D G E T
  const ia = order.indexOf(a), ib = order.indexOf(b);
  return ia < ib ? a + b : b + a;
}

function PairingPage({ name, top }) {
  const G = window.REPORT_GENIUSES;
  const key = pairingKey(top);
  const reverseKey = key[1] + key[0];
  const pair = PAIRINGS[key] || PAIRINGS[reverseKey];
  const [a, b] = top;

  return (
    <ReportPage variant="07 Pairing">
      <ReportHeader eyebrow="Уникальное сочетание" accent="#4c5160" />
      <div style={{ padding:'34px 64px 80px' }}>

        <div style={{
          fontFamily:"'Manrope',sans-serif", fontSize:11, fontWeight:700,
          letterSpacing:'0.2em', textTransform:'uppercase',
          color:'#4c5160', marginBottom: 10,
        }}>Твое сочетание</div>

        <h2 style={{
          fontFamily:"'Unbounded',sans-serif", fontWeight:700,
          fontSize: 42, lineHeight:1.05, letterSpacing:'-0.02em',
          margin:'0 0 22px', color:'#1a1d24',
        }}>{pair.title}</h2>

        <p style={{ fontFamily:"'Manrope',sans-serif", fontSize:14.5, lineHeight:1.65, color:'#4c5160', margin:'0 0 28px', maxWidth: 640 }}>
          Каждый талант важен сам по себе, но <b style={{color:'#1a1d24'}}>комбинация</b> двух
          ведущих талантов еще точнее описывает твои уникальные дары. Ниже —
          описание сочетания <b>{G[a].name}</b> + <b>{G[b].name}</b>.
        </p>

        <div style={{
          padding: '26px 28px',
          background: '#fff',
          border: '1px solid #ece8dd',
          borderRadius: 6,
          position: 'relative',
          marginBottom: 30,
          overflow: 'hidden',
        }}>
          {/* gradient accent bar */}
          <div style={{
            position:'absolute', inset:'0 auto 0 0', width: 4,
            background: `linear-gradient(180deg, ${G[a].color}, ${G[b].color})`,
          }} />

          <div style={{ display:'flex', alignItems:'center', gap: 18, marginBottom: 18 }}>
            <GearSVG letter={a} active accent={G[a].color} size={80} label={G[a].name} />
            <div style={{
              fontFamily:"'Unbounded',sans-serif", fontWeight:700, fontSize: 36,
              color:'#cfc9b8', letterSpacing:'-0.02em',
            }}>+</div>
            <GearSVG letter={b} active accent={G[b].color} size={80} label={G[b].name} />

            <div style={{ marginLeft: 'auto', textAlign:'right' }}>
              <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:10, fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'#8a8f9a', marginBottom:4 }}>Код</div>
              <div style={{ fontFamily:"'Unbounded',sans-serif", fontWeight:700, fontSize: 24, letterSpacing:'0.02em', color:'#1a1d24' }}>
                {a}{b} <span style={{color:'#cfc9b8'}}>·</span> {b}{a}
              </div>
            </div>
          </div>

          <p style={{
            fontFamily:"'Manrope',sans-serif", fontSize: 14.5,
            lineHeight: 1.65, color: '#1a1d24', margin: 0,
          }}>{pair.blurb}</p>
        </div>

        <div style={{
          fontFamily:"'Manrope',sans-serif", fontSize:11, fontWeight:700,
          letterSpacing:'0.2em', textTransform:'uppercase',
          color:'#8a8f9a', marginBottom: 12, marginTop: 24,
        }}>Все 15 сочетаний</div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: '8px 18px' }}>
          {Object.entries(PAIRINGS).map(([k, p]) => {
            const isMine = k === key || k === reverseKey;
            return (
              <div key={k} style={{
                padding: '8px 12px',
                borderRadius: 4,
                background: isMine ? '#1a1d24' : 'transparent',
                color: isMine ? '#faf8f3' : '#4c5160',
                display:'flex', gap: 10, alignItems:'baseline',
              }}>
                <span style={{
                  fontFamily:"'Unbounded',sans-serif", fontWeight:700, fontSize: 10.5,
                  letterSpacing:'0.04em',
                  color: isMine ? '#faf8f3' : '#8a8f9a',
                  minWidth: 30,
                }}>{k}</span>
                <span style={{ fontFamily:"'Manrope',sans-serif", fontSize:11.5, fontWeight: isMine ? 600 : 500, lineHeight: 1.3 }}>
                  {p.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <ReportFooter page={7} total={8} name={name} />
    </ReportPage>
  );
}

Object.assign(window, { PairingPage });
