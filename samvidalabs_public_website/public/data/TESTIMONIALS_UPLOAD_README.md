# Testimonials Upload File (Rigid Format)

Upload path used by the website:
- `public/data/testimonials.json`

## Rules (to avoid breakage)
1. Keep the top-level keys exactly as-is: `version`, `updatedAt`, `schema`, `items`
2. Keep `schema` value exactly as: `cohortai.testimonials.v1`
3. `rating` must be an integer from `1` to `5`
4. `track` must be one of:
   - `Everyday AI`
   - `Business AI`
   - `Tech & Data AI`
   - `Enterprise`
   - `General`
5. Avoid very long quotes (target < 250 chars; max 420)
6. Use unique `id` values (`t001`, `t002`, ...)

## Optional helper files
- `public/data/testimonials.schema.json` (validation schema)
- `public/data/testimonials_template.csv` (copy-paste/import helper)

## Deployment flow
1. Update `public/data/testimonials.json`
2. Commit and deploy
3. Website automatically loads testimonials from this file
4. If file is invalid, the site falls back to built-in testimonials safely
