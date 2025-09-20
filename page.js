(function() {
  // Basic document setup
  document.title = "JS-only Page";
  document.head.innerHTML = '<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">';
  // Styles
  const style = document.createElement('style');
  style.textContent = `
    :root{--bg:#0f1724;--card:#0b1220;--muted:#9aa4b2;--accent:#38bdf8}
    [data-theme="light"]{--bg:#f6fbff;--card:#ffffff;--muted:#475569;--accent:#0ea5e9}
    html,body{height:100%;margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,"Helvetica Neue",Arial;color:var(--muted);background:linear-gradient(180deg,var(--bg),#051027);-webkit-font-smoothing:antialiased}
    .wrap{max-width:980px;margin:32px auto;padding:20px;border-radius:12px;background:linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01));box-shadow:0 8px 30px rgba(2,6,23,0.6);}
    header{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px}
    h1{margin:0;color:var(--accent);font-size:22px}
    .controls{display:flex;gap:8px;align-items:center}
    button{background:transparent;border:1px solid rgba(255,255,255,0.06);padding:8px 12px;border-radius:8px;color:var(--muted);cursor:pointer}
    .grid{display:grid;grid-template-columns:1fr 320px;gap:14px}
    .card{background:var(--card);padding:12px;border-radius:10px;box-shadow:inset 0 1px 0 rgba(255,255,255,0.02)}
    .muted{color:var(--muted);font-size:13px}
    textarea{width:100%;height:160px;padding:8px;border-radius:8px;border:1px dashed rgba(255,255,255,0.03);background:transparent;color:inherit}
    .row{display:flex;gap:8px;align-items:center}
    .big{font-size:20px;color:var(--accent)}
    input[type="text"]{width:100%;padding:8px;border-radius:8px;border:1px solid rgba(255,255,255,0.04);background:transparent;color:inherit}
    footer{margin-top:14px;font-size:12px;color:var(--muted);text-align:center}
    @media (max-width:880px){ .grid{grid-template-columns:1fr} }
  `;
  document.head.appendChild(style);

  // App container
  document.body.innerHTML = ''; // clear
  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  wrap.innerHTML = `
    <header>
      <h1>JS-only Page</h1>
      <div class="controls">
        <div class="muted" id="clock">--:--:--</div>
        <button id="themeBtn">Toggle theme</button>
        <button id="resetBtn" title="Reset saved notes">Reset</button>
      </div>
    </header>
    <main class="grid">
      <section class="card" id="mainCol">
        <div class="row" style="justify-content:space-between;align-items:center;margin-bottom:10px">
          <div>
            <div class="big" id="welcome">Welcome!</div>
            <div class="muted" id="sub">A small interactive page built entirely from JavaScript.</div>
          </div>
          <div style="text-align:right">
            <div class="muted">Counter</div>
            <div style="font-size:18px;margin-top:4px">
              <button id="dec">−</button>
              <span id="count" style="display:inline-block;min-width:36px;text-align:center">0</span>
              <button id="inc">+</button>
            </div>
          </div>
        </div>

        <div style="margin-top:12px">
          <div class="muted">Quick calculator</div>
          <div class="row" style="margin-top:8px">
            <input id="calcInput" type="text" placeholder="Type expression, e.g. 12*(3+4)"/>
            <button id="calcBtn">Calc</button>
          </div>
          <div id="calcResult" class="muted" style="margin-top:8px">Result: —</div>
        </div>

        <hr style="border:none;height:1px;margin:14px 0;background:rgba(255,255,255,0.02)">

        <div>
          <div class="muted">Notes (saved locally)</div>
          <textarea id="notes" placeholder="Write something — saved to localStorage automatically"></textarea>
        </div>
      </section>

      <aside class="card">
        <div class="muted" style="margin-bottom:8px">Shortcuts</div>
        <div style="display:flex;flex-direction:column;gap:8px">
          <button id="fillSample">Insert sample note</button>
          <button id="copyNotes">Copy notes</button>
          <button id="openGreet">Show greeting</button>
        </div>
        <hr style="border:none;height:1px;margin:12px 0;background:rgba(255,255,255,0.02)">
        <div class="muted">About</div>
        <div style="margin-top:8px;font-size:13px">This interface was created only by running JavaScript — no external files required. Works when pasted into the console or saved as a bookmarklet.</div>
      </aside>
    </main>

    <footer>Local storage keys used: <code>js_page_notes</code>, <code>js_page_count</code></footer>
  `;
  document.body.appendChild(wrap);

  // Elements
  const clock = document.getElementById('clock');
  const themeBtn = document.getElementById('themeBtn');
  const resetBtn = document.getElementById('resetBtn');
  const notesEl = document.getElementById('notes');
  const countEl = document.getElementById('count');
  const inc = document.getElementById('inc');
  const dec = document.getElementById('dec');
  const calcInput = document.getElementById('calcInput');
  const calcBtn = document.getElementById('calcBtn');
  const calcResult = document.getElementById('calcResult');
  const fillSample = document.getElementById('fillSample');
  const copyNotes = document.getElementById('copyNotes');
  const openGreet = document.getElementById('openGreet');

  // Theme: remember
  const themeKey = 'js_page_theme';
  const savedTheme = localStorage.getItem(themeKey) || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  function toggleTheme(){
    const t = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem(themeKey, t);
  }
  themeBtn.addEventListener('click', toggleTheme);

  // Clock
  function updateClock(){
    const d = new Date();
    const hh = String(d.getHours()).padStart(2,'0');
    const mm = String(d.getMinutes()).padStart(2,'0');
    const ss = String(d.getSeconds()).padStart(2,'0');
    clock.textContent = `${hh}:${mm}:${ss}`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  // Notes: autosave
  const notesKey = 'js_page_notes';
  notesEl.value = localStorage.getItem(notesKey) || '';
  notesEl.addEventListener('input', () => {
    localStorage.setItem(notesKey, notesEl.value);
  });

  // Counter
  const countKey = 'js_page_count';
  let count = parseInt(localStorage.getItem(countKey) || '0', 10);
  countEl.textContent = count;
  function setCount(n){
    count = n;
    countEl.textContent = String(count);
    localStorage.setItem(countKey, String(count));
  }
  inc.addEventListener('click', () => setCount(count + 1));
  dec.addEventListener('click', () => setCount(count - 1));

  // Calculator (safe eval with Function constructor)
  calcBtn.addEventListener('click', () => {
    const expr = calcInput.value.trim();
    if(!expr){ calcResult.textContent = 'Result: —'; return; }
    try {
      // Disallow letters to reduce risk (very simple sandbox)
      if(/[a-zA-Z]/.test(expr)) throw new Error('Letters are not allowed in expression.');
      // Evaluate numeric expression
      const fn = new Function('return (' + expr + ')');
      const res = fn();
      calcResult.textContent = 'Result: ' + String(res);
    } catch(e) {
      calcResult.textContent = 'Error: ' + e.message;
    }
  });

  // shortcuts
  fillSample.addEventListener('click', () => {
    notesEl.value = 'Sample note — typed at ' + new Date().toLocaleString() + '\\n\\n- To-do\\n- Ideas';
    notesEl.dispatchEvent(new Event('input'));
  });
  copyNotes.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(notesEl.value);
      copyNotes.textContent = 'Copied!';
      setTimeout(()=> copyNotes.textContent = 'Copy notes', 1200);
    } catch(err) {
      copyNotes.textContent = 'Copy failed';
      setTimeout(()=> copyNotes.textContent = 'Copy notes', 1200);
    }
  });
  openGreet.addEventListener('click', () => {
    alert('Hello! This page was created by a single JS snippet — enjoy!');
  });

  // Reset
  resetBtn.addEventListener('click', () => {
    if(confirm('Clear saved notes and counter?')){
      localStorage.removeItem(notesKey);
      localStorage.removeItem(countKey);
      notesEl.value = '';
      setCount(0);
    }
  });

  // tiny accessibility: focus first input
  calcInput.focus();
})();
