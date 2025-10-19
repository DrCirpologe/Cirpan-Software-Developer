const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    const files = ['index.html', 'project.html', 'reachOut.html'];
    const sizes = [
      { name: 'desktop', width: 1366, height: 768 },
      { name: 'tablet', width: 1024, height: 768 },
      { name: 'mobile', width: 375, height: 812 }
    ];

    const outDir = path.resolve(__dirname, '..', 'screenshots');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    for (const file of files) {
      const filePath = path.resolve(__dirname, '..', file);
      if (!fs.existsSync(filePath)) {
        console.warn(`Überspringe ${file} – Datei nicht gefunden: ${filePath}`);
        continue;
      }

      for (const s of sizes) {
        await page.setViewportSize({ width: s.width, height: s.height });
        const url = 'file://' + filePath;
        console.log(`Öffne ${url} bei ${s.name} (${s.width}x${s.height})`);
        await page.goto(url, { waitUntil: 'load', timeout: 10000 });
        // kleine Wartezeit, damit Fonts/Assets laden
        await page.waitForTimeout(500);
        const nameSafe = path.basename(file, path.extname(file));
        const out = path.join(outDir, `${nameSafe}-${s.name}.png`);
        await page.screenshot({ path: out, fullPage: true });
        console.log(`Screenshot gespeichert: ${out}`);
      }
    }

    await browser.close();
    console.log('Fertig. Screenshots im Ordner: screenshots/');
  } catch (err) {
    console.error('Fehler beim Erstellen der Screenshots:', err);
    process.exit(1);
  }
})();
