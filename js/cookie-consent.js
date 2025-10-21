/* cookie-consent.js
   Simple cookie consent manager that stores preferences in localStorage.
   - categories: necessary (always on), analytics (Google Analytics), media (YouTube embeds)
   - provides methods to check consent and to run callbacks when consent granted
*/
(function(){
  const KEY = 'cirpan_cookie_consent_v1';

  function getPrefs(){
    try{ return JSON.parse(localStorage.getItem(KEY)) || { necessary: true, analytics: false, media: false }; }catch(e){ return { necessary: true, analytics: false, media: false }; }
  }

  function savePrefs(prefs){ localStorage.setItem(KEY, JSON.stringify(prefs)); document.dispatchEvent(new CustomEvent('cookieConsentChanged', { detail: prefs })); }

  function showBanner(){
    if (document.getElementById('cirpan-cookie-banner')) return;
    const container = document.createElement('div');
    container.id = 'cirpan-cookie-banner';
    container.innerHTML = `
      <div class="cc-inner">
        <div class="cc-text">
          <strong>CIRPAN Software Development</strong> verwendet Cookies, um die Website zu betreiben und die Nutzererfahrung zu verbessern. Einige Cookies sind technisch notwendig, andere helfen uns, die Nutzung der Seite zu analysieren oder Medieninhalte darzustellen.
        </div>
        <div class="cc-actions">
          <button id="cc-manage">Einstellungen</button>
          <button id="cc-accept" class="primary">Alle akzeptieren</button>
        </div>
      </div>
      <div id="cc-panel" class="cc-panel" aria-hidden="true">
        <h3>Cookie‑Einstellungen</h3>
        <p>Wähle aus, welche Cookies du zulassen möchtest. Technisch notwendige Cookies sind für die Funktion der Website erforderlich.</p>
        <form id="cc-form">
          <label><input type="checkbox" name="necessary" disabled checked> Technisch notwendige Cookies (unbedingt erforderlich)</label>
          <label><input type="checkbox" name="analytics"> Google Analytics (anonymisierte Nutzungsstatistiken)</label>
          <label><input type="checkbox" name="media"> YouTube & eingebettete Medien (Vorschau & Wiedergabe)</label>
          <div class="cc-panel-actions">
            <button type="button" id="cc-save" class="primary">Speichern</button>
            <button type="button" id="cc-cancel">Abbrechen</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(container);

    // simple styles
    const css = document.createElement('style');
    css.textContent = `
      #cirpan-cookie-banner{ position: fixed; left: 12px; right:12px; bottom: 12px; z-index: 99999; font-family: Inter, sans-serif; }
      #cirpan-cookie-banner .cc-inner{ background: rgba(18,18,18,0.96); color:#fff; padding:14px; border-radius:8px; display:flex; align-items:center; gap:12px; justify-content:space-between; box-shadow:0 8px 30px rgba(0,0,0,0.6); }
      #cirpan-cookie-banner .cc-text{ max-width: 62%; font-size:0.95rem; line-height:1.3; }
      #cirpan-cookie-banner .cc-actions button{ margin-left:8px; }
      #cirpan-cookie-banner button{ background:transparent; border:1px solid rgba(255,255,255,0.12); color:#fff; padding:8px 12px; border-radius:6px; cursor:pointer; }
      #cirpan-cookie-banner button.primary{ background:#FDC03B; color:#000; border:0; }
      .cc-panel{ margin-top:10px; background: #0f0f0f; padding:12px; border-radius:6px; display:none; color:#ddd; }
      .cc-panel[aria-hidden="false"]{ display:block; }
      .cc-panel label{ display:block; margin:8px 0; }
      .cc-panel-actions{ display:flex; gap:8px; margin-top:12px; }
    `;
    document.head.appendChild(css);

    // events
    const panel = document.getElementById('cc-panel');
    document.getElementById('cc-manage').addEventListener('click', ()=>{ panel.setAttribute('aria-hidden','false'); });
    document.getElementById('cc-cancel').addEventListener('click', ()=>{ panel.setAttribute('aria-hidden','true'); });
    document.getElementById('cc-accept').addEventListener('click', ()=>{ const prefs = { necessary:true, analytics:true, media:true }; savePrefs(prefs); panel.setAttribute('aria-hidden','true'); container.style.display='none'; });
    document.getElementById('cc-save').addEventListener('click', ()=>{ const form = document.getElementById('cc-form'); const fd = new FormData(form); const prefs = { necessary:true, analytics:!!fd.get('analytics'), media:!!fd.get('media') }; savePrefs(prefs); panel.setAttribute('aria-hidden','true'); container.style.display='none'; });

    // initialize form with saved values
    const prefs = getPrefs();
    const form = document.getElementById('cc-form');
    form.elements['analytics'].checked = !!prefs.analytics;
    form.elements['media'].checked = !!prefs.media;
  }

  // expose helper methods
  window.CIRPAN = window.CIRPAN || {};
  window.CIRPAN.cookieConsent = {
    get: getPrefs,
    set: savePrefs,
    show: showBanner,
    onChange: function(cb){ document.addEventListener('cookieConsentChanged', function(e){ cb(e.detail); }); }
  };

  // show banner if user hasn't chosen yet
  // Use the presence of the localStorage key to determine whether the user made a choice.
  // getPrefs() returns default values which would incorrectly indicate a choice was made.
  if (!localStorage.getItem(KEY)) {
    showBanner();
  }

})();
