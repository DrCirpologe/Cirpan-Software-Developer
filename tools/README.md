Anleitung zum Erstellen von Screenshots (lokal)

1) Node.js (>=14) installieren, falls nicht vorhanden.
2) Im Workspace-Ordner `MeineWebsite` das folgende ausführen:

```bash
# einmalig: in Projektverzeichnis
npm init -y
npm install playwright --save-dev
# optional: Playwright-Browser installieren (falls npm nicht automatisch die Browser lädt)
npx playwright install

# dann die Screenshots erzeugen
node tools/screenshot.js
```

Die Screenshots werden im Verzeichnis `screenshots/` gespeichert als:
- index-desktop.png
- index-tablet.png
- index-mobile.png
- project-*.png
- reachOut-*.png

Hinweis: Das Skript öffnet die Dateien per file:// URL. Einige Umgebungen (lokale Fonts, CORS-Assets) können anders laden als auf einem Server. Für exakte Produktions-Preview ist ein lokaler HTTP-Server (z. B. `npx http-server .`) empfehlenswert.