<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Divergents · 6 Geniuses UI Kit</title>
<link rel="stylesheet" href="../../colors_and_type.css" />
<style>
  html, body { margin: 0; padding: 0; min-height: 100vh; background: var(--bg); color: var(--fg); font-family: var(--font-body); overflow-x: hidden; }
  body { display: flex; flex-direction: column; }
  main { position: relative; z-index: 1; flex: 1; width: 100%; max-width: 1100px; margin: 0 auto; padding: 20px 28px 80px; box-sizing: border-box; }
  .view { animation: fadeIn 0.4s ease; }
  @keyframes fadeIn { from { opacity:0; transform: translateY(8px);} to { opacity:1; transform: translateY(0);} }
  .kit-switch {
    position: fixed; top: 20px; right: 24px; z-index: 100;
    display: flex; gap: 4px;
    padding: 4px;
    background: rgba(10,14,26,0.8);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 12px;
  }
  .kit-switch button {
    padding: 8px 14px;
    background: transparent;
    border: 0;
    color: #a6b0cf;
    font: 600 12px 'Manrope', sans-serif;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    border-radius: 8px;
    cursor: pointer;
  }
  .kit-switch button.active { background: rgba(124,156,255,0.2); color: #eef2ff; }
</style>
</head>
<body>
<div id="root" data-screen-label="00 UI Kit Root"></div>

<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
<script src="tokens.js"></script>
<script type="text/babel" src="Chrome.jsx"></script>
<script type="text/babel" src="IntroView.jsx"></script>
<script type="text/babel" src="TestView.jsx"></script>
<script type="text/babel" src="ResultsView.jsx"></script>
<script type="text/babel">
  function App() {
    const [view, setView] = React.useState(
      () => localStorage.getItem('ds_view') || 'intro'
    );
    const [user, setUser] = React.useState({ name: 'Азамат Жусупов', email: 'azamat@divergents.kz' });

    React.useEffect(() => { localStorage.setItem('ds_view', view); }, [view]);

    function reset() { setView('intro'); }

    return (
      <>
        <SiteBackground />
        <div className="kit-switch">
          <button className={view==='intro'?'active':''} onClick={()=>setView('intro')}>Intro</button>
          <button className={view==='test'?'active':''} onClick={()=>setView('test')}>Test</button>
          <button className={view==='results'?'active':''} onClick={()=>setView('results')}>Results</button>
        </div>
        <TopBar showRestart={view !== 'intro'} onRestart={reset} />
        <main>
          <div className="view" data-screen-label={`01 ${view}`}>
            {view === 'intro'   && <IntroView onStart={(u)=>{ setUser(u); setView('test'); }} />}
            {view === 'test'    && <TestView onFinish={()=>setView('results')} />}
            {view === 'results' && <ResultsView name={user.name} />}
          </div>
        </main>
        <Footer />
      </>
    );
  }

  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
</script>
</body>
</html>
