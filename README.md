# Health Tracker (Offline) - Screenshot-style UI

This version matches the layout you shared:
- Title + Save button
- Date navigator with arrows
- 3 summary cards
- Stacked sections: Blood Sugar, Fasting, Supplements, Exercise, Measurements, Data Management
- Separate Charts view with pill tabs

## Run locally
Python:
```bash
python -m http.server 8000
```
Open: http://localhost:8000

## Install on Android
Host on GitHub Pages (or any static host), open in Chrome, then:
Menu ⋮ → Install app / Add to Home Screen.

## v11 reliability update
- Fixes record counter on startup (including Android WebView quirks)
- Adds IndexedDB read fallback when `getAll()` isn’t supported
- Adds focus/visibility refresh so the counter stays correct after returning to the app
