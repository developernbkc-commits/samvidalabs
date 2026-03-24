# CohortAI Labs Netlify Drop-In Patch (Node 20 LTS)

This patch addresses Netlify install-stage failures like:
- `npm error Exit handler never called!`
- failure during **Install dependencies** (before Vite build starts)

## What this patch does
1. Pins **Node.js 20 LTS** (more stable on Netlify for many Vite/React projects).
2. Disables Husky hooks in CI (`HUSKY=0`) to avoid postinstall hook issues.
3. Adds npm flags (`--no-audit --no-fund`) to reduce install noise and CI friction.

## Files included
- `/.nvmrc`
- `/cohortai-labs/.nvmrc`
- `/cohortai-labs/netlify.toml`

## How to apply (drop-in)
Extract this ZIP at the **repo root** (the folder that contains `cohortai-labs/`) and overwrite files.

## After applying
1. Commit and push the changes.
2. Trigger a new Netlify deploy.

## If install still fails (next step)
Regenerate `package-lock.json` locally using Node 20:
```bash
cd cohortai-labs
rm -rf node_modules package-lock.json
npm cache clean --force
# use Node 20
npm install
npm run build
```
Then commit the new `package-lock.json` and redeploy.
