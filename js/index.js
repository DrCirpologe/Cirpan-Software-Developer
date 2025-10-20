// Footer laden
fetch('footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer-placeholder').innerHTML = data;
  })
  .catch(err => console.error('Fehler beim Laden des Footers:', err));


  // === Responsive Navigation (Hamburger Menü) ===
function toggleMenu() {
  const menu = document.querySelector('.nav-links-container');
  const hamburger = document.querySelector('.hamburger');
  menu.classList.toggle('active');
  hamburger.classList.toggle('active');
}

// Klick außerhalb des Menüs schließt es
document.addEventListener('click', (e) => {
  const menu = document.querySelector('.nav-links-container');
  const hamburger = document.querySelector('.hamburger');
  if (menu.classList.contains('active') && !menu.contains(e.target) && !hamburger.contains(e.target)) {
    menu.classList.remove('active');
    hamburger.classList.remove('active');
  }
});
