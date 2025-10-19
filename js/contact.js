/*
  contact.js - Kontaktformular mit EmailJS
  - Verwendet deine Service-, Template- und User-ID
  - Sicherer Umgang mit externen Links
*/

// Safe helper to open external links without leaving opener reference
const openExternal = (url) => {
  const w = window.open(url, '_blank');
  if (w) try { w.opener = null; } catch (e) { /* ignore */ }
};

// Externe Buttons
const linkedinBtn = document.getElementById('linkedinBtn');
if (linkedinBtn) linkedinBtn.addEventListener('click', () => openExternal('https://linkedin.com'));
const githubBtn = document.getElementById('githubBtn');
if (githubBtn) githubBtn.addEventListener('click', () => openExternal('https://github.com'));

// Reach Out Button
const reachOutBtn = document.getElementById('reachOutBtn');
if (reachOutBtn) reachOutBtn.addEventListener('click', () => { window.location.href = 'reachOut.html'; });

// mailto fallback
const emailLink = document.getElementById('emailLink');
if (emailLink) emailLink.addEventListener('click', (e) => { e.preventDefault(); window.location.href = 'mailto:ocirpan920@gmail.com'; });

// EmailJS Initialisierung
if (window.emailjs) {
  emailjs.init('y3DYAOkaoWSL6brCU'); // Dein User ID / Public Key
}

// Kontaktformular
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const form = this;
    const name = form.name ? String(form.name.value).trim() : '';
    const email = form.email ? String(form.email.value).trim() : '';
    const message = form.message ? String(form.message.value).trim() : '';
    const msgEl = document.getElementById('formMessage');

    if (!name || !email || !message) {
      if (msgEl) msgEl.textContent = 'Bitte alle Felder ausfüllen.';
      return;
    }

    // EmailJS senden
    emailjs.sendForm('service_y2qfp0k', 'template_d1q49pp', form)
      .then(() => {
        if (msgEl) msgEl.textContent = 'Nachricht erfolgreich gesendet!';
        form.reset();
      })
      .catch((err) => {
        if (msgEl) msgEl.textContent = 'Fehler beim Senden, bitte später versuchen.';
        console.error('EmailJS Error:', err);
      });
  });
}
