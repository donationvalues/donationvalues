# DonationValues

**An open, independently maintained dataset of fair-market values for donated used clothing and household items, built from observed US thrift and consignment shelf prices and published as immutable tax-year editions.**

Status: **pre-release scaffold** (November 2026). No edition has been published yet. The methodology is an open draft; the data tables are empty and waiting for the first observations. Nothing here is tax advice.

## Why this exists

IRS Publication 561 says the value of used clothing and household items is indicated by "the price that buyers of used items actually pay in used clothing stores, such as consignment or thrift shops," and Form 8283 accepts "Thrift shop value" as a valuation method. Yet the guides donors rely on are undated, unsourced tables with no sample sizes and no change history, and Intuit's ItsDeductible was discontinued on October 21, 2025.

DonationValues replaces that with a reference that an examiner, a CPA or a donor can check:

- every value is a statistic over observations you can inspect (store chain, metro, date, brand tier, tag price, photo hash);
- the sampling frame, statistics and minimum sample rules are published and versioned;
- each tax-year edition is frozen with a SHA-256 hash and a DOI, so the value "in effect on the donation date" is always retrievable;
- AI agents classify and flag; they never produce a price.

## Repository layout

| Path | What lives there |
|---|---|
| `methodology/` | Versioned methodology (`METHODOLOGY-<year>.<n>.md`) and comment-period records |
| `schema/` | Frictionless Table Schemas for the three tables |
| `data/` | Working tables: `items.csv` (taxonomy), `observations.csv` (facts with provenance), `values.csv` (derived statistics) |
| `editions/` | Frozen tax-year editions (`DV-<taxyear>`), each with hash, datasheet and changelog |
| `pipeline/` | Deterministic build: validation, aggregation, LLM-assisted classification with a shipped response cache |
| `site/` | donationvalues.org (static site: lookup, per-item evidence pages, downloads, API, primer) |
| `docs/design/` | Founding research report and source notes |
| `datapackage.json` | Frictionless data package describing the working tables; CI validates it on every push |

## Licenses

| Layer | License | File |
|---|---|---|
| Code (`pipeline/`, `site/`, tooling) | Apache-2.0 | `LICENSE` |
| Methodology and documentation | CC BY 4.0 | `LICENSE-DOCS` |
| Taxonomy, observations, values (`data/`, `editions/`) | CC0 1.0 with an attribution request | `LICENSE-DATA` |

The data license will never become more restrictive. See `GOVERNANCE.md`.

## Contributing

Read `CONTRIBUTING.md`. Every price observation is submitted under the Data Contributor Certificate: you personally observed it, you did not copy it from a guide, app or website, and you obtained it lawfully. Observations copied from other valuation guides, from ItsDeductible exports, or scraped from marketplaces against their terms are rejected.

## Sponsor

DonationValues is sponsored and currently maintained by [Foothill AI LLC](https://foothill.ai), which also makes the DeductIt app. DeductIt is one consumer of this dataset and has no special standing in the methodology. The sponsor's role, the advisory council and the decision process are set out in `GOVERNANCE.md`.

## Disclaimer

DonationValues publishes estimates of typical resale prices derived from observed thrift prices using the published methodology. They are not appraisals and not tax advice. Under IRS rules the donor determines fair market value. Items worth more than $500 and groups of similar items worth more than $5,000 carry additional substantiation and appraisal requirements. The data is provided as-is, without warranty.
