# donationvalues.org

Static site for the project, built with [Astro](https://astro.build) and deployed on Cloudflare Pages. This is a pre-release scaffold: no edition exists yet, and the site says so.

## How content works

The Markdown at the repository root is the single source of truth. `npm run build` first runs `scripts/sync-content.mjs` (the `prebuild` script), which copies these files into `src/content/pages/` (gitignored) and rewrites relative links so nothing 404s:

| Repository file | Site route |
|---|---|
| `README.md` | `/about` |
| `GOVERNANCE.md` | `/governance` |
| `CONTRIBUTING.md` | `/contribute` |
| `methodology/METHODOLOGY-2027.0.md` | `/methodology` |
| `CODE_OF_CONDUCT.md` | `/conduct` |

Pages written in the site itself: `/` (home), `/download`, `/irs-primer`, `/legal` and the 404 page, under `src/pages/`.

## How to run

Requires Node 22 (see `.node-version`).

```bash
cd site
npm install
npm run dev          # local server with live reload
npm run build        # static output in dist/ (prebuild syncs content first)
npm run preview      # serve dist/ locally
npm run check-links  # verify no internal link in dist/ points at a missing file
```

## Cloudflare Pages settings

| Setting | Value |
|---|---|
| Root directory | `site` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `22` (read from `site/.node-version`) |

Security headers are set in `public/_headers`. CI (`.github/workflows/site.yml`) runs `npm ci` and `npm run build` on every push and pull request; it does not deploy.

## Planned information architecture

Implemented today: `/`, `/methodology`, `/irs-primer`, `/download`, `/contribute`, `/governance`, `/conduct`, `/about`, `/legal`. The rest waits for the first edition. Pagefind search and static JSON under `/api/v1/` are planned.

| Path | Purpose |
|---|---|
| `/` | What this is, sponsor sentence, search, current edition and hash |
| `/lookup`, `/categories/{irs_group}/{category}` | Search and browse |
| `/items/{dv_id}` | Three tiers with the median leading, band, n / stores / metros / window / CI, observation table, inheritance flag, change history, "how to document this donation" |
| `/editions/{id}`, `/editions/{id}/items/{dv_id}` | Edition landing and permanent value pages |
| `/download` | CSV, JSONL, Parquet, SQLite, data package, checksums, DOI, compatibility builds |
| `/api` | Static JSON endpoints and OpenAPI description; "download the dump for bulk" |
| `/methodology` | Current and prior versions, comment periods, adjudication tables |
| `/irs-primer` | FMV definition, "good used condition," substantiation tiers, similar-items aggregation, Form 8283 "Thrift shop value," penalties, 2026 changes |
| `/for-tax-professionals`, `/for-developers` | Citation guidance, appraiser packet format, integration guide, stable-ID contract |
| `/contribute` | Collector guide, certificate, submission form, review queue, recognition |
| `/governance`, `/legal`, `/about`, `/faq`, `/changelog`, `/status` | |
