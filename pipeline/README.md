# Pipeline

Not yet implemented. This directory will hold the deterministic build that turns accepted observations into an edition:

1. `validate`: Frictionless validation plus the logic checks listed in `CONTRIBUTING.md` (duplicates, outliers, impossible dates, store-format mismatches).
2. `classify`: LLM-assisted taxonomy mapping, brand normalization and brand-tier proposal, with the run contract in `methodology/` section 9. Responses are cached by request hash in `pipeline/cache/` and shipped with the edition.
3. `aggregate`: percentiles, mode, bootstrap CI (seeded), minimum-sample and inheritance rules, regional indexes.
4. `release`: canonical CSVs, `SHA256SUMS`, datasheet, changelog, SQLite (1 KiB page size), Parquet, JSONL, static JSON for the site API, and vendor compatibility builds (including `deductit-compat-<edition>.json.gz`).

Requirements: Python 3.12, pinned dependencies, no network access during `aggregate` and `release`. The build must reproduce an edition byte-for-byte from the same inputs and cache.
