# MuseumX

MuseumX is a responsive React + Vite museum exploration app built with Tailwind-style styling and local translation support. It showcases museum landing pages, detail views, gallery browsing, and an admin area for adding new exhibit entries.

## Features

- 📍 Museum directory with detail pages for iconic Indian cultural sites
- 🖼️ Interactive gallery view with image preview, metadata, and navigation
- 🌐 Language switching with dynamic translation support (English / Hindi)
- 🧑‍💼 Admin mode for adding new museum entries
- 🎨 Built with React, React Router, Vite, and iconography via `lucide-react`

## Project Structure

- `src/App.jsx` — application context, routing, language management, and translation workflow
- `src/constants.js` — initial museum data, gallery asset imports, and UI labels
- `src/components/` — shared layout and reusable UI building blocks
- `src/pages/` — page views for Home, MuseumDetail, Gallery, and Admin
- `src/services/` — translation and local AI support helpers
- `src/assets/images/` — museum artwork and gallery imagery

## Getting Started

### Requirements

- Node.js 18+ / npm

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Notes

- The app uses `HashRouter` from `react-router-dom` for client-side routing.
- Text translation is powered by `src/services/translationService.js` and is applied to labels, museum content, highlights, and gallery metadata.
- Image assets are imported directly from `src/assets/images/` for predictable Vite bundling.

## Additions

To add a museum entry, extend `src/constants.js` with a new museum object and gallery assets, or use the Admin page to create entries at runtime.

## License

This project is currently private.
