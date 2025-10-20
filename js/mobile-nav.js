// mobile-nav.js
// Lightweight hamburger overlay for small screens.
(function(){
  function qs(sel){ return document.querySelector(sel); }
  const hamburger = qs('.hamburger');
  const navLinks = qs('.nav-links-container');
  if (!hamburger) return; // nothing to do

  // build overlay if not present
  let overlay = qs('.mobile-nav-overlay');
  if (!overlay){
    overlay = document.createElement('div');
    overlay.className = 'mobile-nav-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = '<div class="mobile-inner">'
  + '<button class="mobile-close" aria-label="Schliessen">✕</button>'
  + '<nav class="mobile-links"><a href="index.html">START</a><a href="index.html#about">ÜBER</a><a href="project.html">PROJEKTE</a><a href="reachOut.html">KONTAKT</a></nav>'
      + '</div>';
    document.body.appendChild(overlay);
  }

  const closeBtn = overlay.querySelector('.mobile-close');

  function open(){
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden','false');
    document.body.classList.add('no-scroll');
    hamburger.classList.add('open');
  }
  function close(){
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden','true');
    document.body.classList.remove('no-scroll');
    hamburger.classList.remove('open');
  }

  hamburger.addEventListener('click', function(){
    if (overlay.classList.contains('open')) close(); else open();
  });
  closeBtn && closeBtn.addEventListener('click', close);

  // close when a link is clicked
  // close when a link is clicked or when clicking outside the inner panel (backdrop)
  overlay.addEventListener('click', function(e){
    // if clicked a link inside the mobile panel, close
    const a = e.target.closest('a');
    if (a) return close();

    // if the click happened outside the mobile-inner (i.e., on the backdrop), close
    const inner = e.target.closest('.mobile-inner');
    if (!inner) return close();
    // else: clicked inside the panel — do nothing
  });

  // keyboard
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') close(); });

})();
