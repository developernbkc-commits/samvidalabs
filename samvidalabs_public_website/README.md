# CohortAI Labs — Premium Netlify Website (Drop-in Repo)

This is a modern, animated, conversion-focused website for **CohortAI Labs** built with:
**React + TypeScript + Vite + Tailwind + Framer Motion**.

> **Important:** This is a SPA app and **will look blank if you double-click `index.html`** (file://).
> Run it with the dev server or build + preview (steps below).

## Local run
```bash
npm install
npm run dev
```
Then open the URL shown in terminal (usually `http://localhost:5173`).

## Build & preview (like production)
```bash
npm run build
npm run preview
```

## Deploy to Netlify
- Build command: `npm run build`
- Publish directory: `dist`
- SPA routing is already configured via `netlify.toml`.

## Logo / Images
- Put your logo in `public/` (recommended) and set `site.logoUrl` in `src/lib/site.ts`.
  - Example: `logoUrl: "/logo.svg"` or `"/logo.png"`
- If you insist on hosting assets outside the repo, use a **direct raw file URL** (e.g., GitHub raw URL), not a ChatGPT conversation link.

## Netlify Forms
Contact form uses Netlify Forms:
- No backend needed.
- Submissions appear in Netlify dashboard under **Forms**.

## Edit business info
`src/lib/site.ts`

© CohortAI Labs
