// Page 8 — What's Next: how to apply the results
function NextStepsPage({ name }) {
  const blocks = [
    {
      eyebrow: 'Работай из своего таланта',
      bullets: [
        'Пересмотри свою работу — где ты можешь чаще опираться на ведущие таланты и меньше задерживаться во фрустрациях.',
        'Планируй задачи из области фрустраций и компетенций на то время дня, когда у тебя больше энергии.',
        'Замечай и называй вслух, когда работаешь вне своих талантов, — это помогает осознанно управлять силами.',
        'Проси о помощи в областях, где ты не одарен от природы. Это не слабость — это уважение к модели.',
      ],
    },
    {
      eyebrow: 'Поделись результатами',
      bullets: [
        'Расскажи близким, коллегам и команде, что ты узнал о себе.',
        'Пригласи их пройти тест — и обсудите результаты вместе.',
        'Договоритесь, как можно поддерживать друг друга: использовать свои таланты и избегать чужих фрустраций.',
        'Предложи применить свой талант там, где это нужно другим.',
      ],
    },
    {
      eyebrow: 'Используй модель в команде',
      bullets: [
        'Соберите общую карту талантов команды — сильные стороны и пробелы.',
        'Обсудите, как лучше распределить задачи и роли с учетом талантов.',
        'Подумайте, где команде не хватает определенного гения — и как этот пробел закрыть.',
      ],
    },
  ];

  return (
    <ReportPage variant="08 Next steps">
      <ReportHeader eyebrow="Что дальше" accent="#4c5160" />
      <div style={{ padding:'24px 64px 70px' }}>

        <div style={{
          fontFamily:"'Manrope',sans-serif", fontSize:11, fontWeight:700,
          letterSpacing:'0.2em', textTransform:'uppercase',
          color:'#4c5160', marginBottom: 10,
        }}>Применение</div>

        <h2 style={{
          fontFamily:"'Unbounded',sans-serif", fontWeight:700,
          fontSize: 36, lineHeight:1.05, letterSpacing:'-0.02em',
          margin:'0 0 14px', color:'#1a1d24',
        }}>Как применить результаты</h2>

        <p style={{ fontFamily:"'Manrope',sans-serif", fontSize:13, lineHeight:1.55, color:'#4c5160', margin:'0 0 18px', maxWidth: 640 }}>
          Многие работают в ролях, которые расходятся с их природными талантами —
          и даже не понимают, почему им тяжело. Знание своих даров и фрустраций
          дает осознанность, радость и продуктивность. Ниже — три направления,
          чтобы начать применять результаты уже сегодня.
        </p>

        <div style={{ display:'grid', gap: 12 }}>
          {blocks.map((b, i) => (
            <div key={i} style={{
              padding:'14px 20px 16px',
              background:'#fff',
              border:'1px solid #ece8dd',
              borderRadius: 6,
              position: 'relative',
            }}>
              <div style={{
                display:'flex', alignItems:'baseline', gap: 12,
                marginBottom: 8,
              }}>
                <div style={{
                  fontFamily:"'Unbounded',sans-serif", fontWeight:700, fontSize: 22,
                  color:'#cfc9b8', letterSpacing:'-0.01em', lineHeight: 1,
                }}>0{i+1}</div>
                <div style={{
                  fontFamily:"'Unbounded',sans-serif", fontWeight:700, fontSize:14.5,
                  letterSpacing:'-0.005em', color:'#1a1d24',
                }}>{b.eyebrow}</div>
              </div>
              <ul style={{ margin:0, paddingLeft: 18, display:'grid', gap: 4 }}>
                {b.bullets.map((t, j) => (
                  <li key={j} style={{
                    fontFamily:"'Manrope',sans-serif", fontSize:11.5,
                    lineHeight: 1.5, color:'#4c5160',
                  }}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 16,
          padding:'12px 18px',
          borderLeft:'3px solid #1a1d24',
          background:'#faf4e6',
          borderRadius: 4,
          maxWidth: 640,
        }}>
          <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:11.5, lineHeight:1.5, color:'#1a1d24' }}>
            <b>Помни:</b> ты не обязан одинаково любить все шесть видов работы.
            Модель нужна, чтобы <b>команды</b> закрывали друг друга, а ты проводил
            больше времени там, где расцветаешь.
          </div>
        </div>
      </div>
      <ReportFooter page={8} total={8} name={name} />
    </ReportPage>
  );
}

Object.assign(window, { NextStepsPage });
