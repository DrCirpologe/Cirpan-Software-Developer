// Footer laden
fetch('footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer-placeholder').innerHTML = data;
  })
  .catch(err => console.error('Fehler beim Laden des Footers:', err));
