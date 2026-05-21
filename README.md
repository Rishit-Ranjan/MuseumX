# MuseumX

MuseumX is a responsive React + Vite museum exploration app built with Tailwind-style styling and local translation support. It showcases museum landing pages, detail views, gallery browsing, and an admin area for adding new exhibit entries.

## Features

- 📍 Museum directory with detail pages for iconic Indian cultural sites
- 🖼️ Interactive gallery view with image preview, metadata, and navigation
- 🌐 Language switching with dynamic translation support (English / Hindi)
- 🧑‍💼 Admin mode for adding new museum entries
- 🎨 Built with React, React Router, Vite, and iconography via `lucide-react`

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

Open the required localhost in your browser.

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
