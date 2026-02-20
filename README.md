# Music.io

Educational web application for analyzing musical scales from selected notes. Designed for guitar players and music theory students.

## Features

- Chromatic note selection (12 toggle buttons)
- Top 3 probable scales with match % and coverage
- Scale detail: degree/note/name table, harmonic functions
- Interactive circle of fifths (click to set tonic)
- Learning panel per scale
- History (LocalStorage, last 20 analyses)
- Export: summary, degree table, JSON, TXT, full report

## Tech Stack

**Frontend:** React, TypeScript, Vite, TailwindCSS
**Storage:** LocalStorage (no backend)

## Setup

```bash
npm install
npm run dev
```

Runs at `http://localhost:5173`

## Build

```bash
npm run build
```

Static output in `dist/` — deploy to Vercel or Netlify.

## License

Open source — available for personal and educational use.
