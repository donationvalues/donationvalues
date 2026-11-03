# donationvalues.org

Not yet implemented. Planned as a static site (Astro, Pagefind search) deployed on Cloudflare, with one pre-rendered page per item and per edition value and static JSON under `/api/v1/`.

Planned information architecture:

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
