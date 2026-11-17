# DV-2026 independent assessment and release plan (Claude)

Author: Claude (Opus 5.5), independent round. Written 2026-11-17 (system clock: Tue 2026-11-17 11:41 PST).
Worktree: `/Users/neil/code/github/donationvalues-assessment`, branch `assessment/release-2026`, at `c17fb47` (same commit as `main` in `/Users/neil/code/github/donationvalues`).

I did not open `docs/assessment/codex-assessment.md` or any `RELEASE-PLAN-2026.md`. Nothing here is legal or tax advice. Every dollar and hour figure is an estimate.

## 0. What I could and could not verify in this session

This session was sandboxed more tightly than the brief assumed, so some planned checks did not run. Where a finding below rests on one of these gaps, it says so.

| Check | Result |
|---|---|
| Local git state, every file in this repo | **Done.** Read directly. |
| `dig` / `whois` for donationvalues.org | **Not run.** The command needed approval this session couldn't get. "No DNS / no live site" is still **unverified, as reported to me**. |
| `gh` (repo visibility, Actions runs, releases, Pages, issues) | **Not run.** Same reason. Local `git tag -l` is empty, so there are no local release tags. |
| `/Users/neil/code/github/deductit` and `/Users/neil/code/github/donationvalues.org` | **Not readable.** The sandbox only allows this worktree. My DeductIt facts come from `docs/design/founding-research-report.md`, which is dated early November 2026. They are second-hand and need checking against the live code. |
| Web (eBay, IRS, ToS pages, BLS, Zenodo, hosting docs) | **Denied** for me and for a research subagent. Source and terms claims below are cited from the repo's research notes (`docs/design/research_notes/data_rights_and_licensing.md`, dated 2026-11-02) or marked "from memory, verify". **None was re-fetched today.** |
| Linear (team FOO) and the `foothill-ai/docs` vault | **Not available** (Linear permission denied; vault outside sandbox). I cite no Linear context. |

**Before anyone relies on this plan, a session with web, `gh` and DNS access must re-check every row marked "verify" in §2 and §5.** That is about an hour of agent work.

---

## 1. Honest status (facts vs. assumptions)

### Facts (verified from the repo at `c17fb47`)

- **Three commits, all on 2026-11-03**, by Neil: the scaffold, the org URL change and the Astro site. No tags and no releases locally.
- **Data: none.** `data/items.csv`, `data/observations.csv` and `data/values.csv` contain only a header row. There is no taxonomy, no observation and no value.
- **Pipeline: none.** `pipeline/README.md` describes four stages (validate, classify, aggregate, release); there is no code.
- **Schemas:** three Frictionless table schemas plus `datapackage.json`, all reasonable. `validate.yml` CI validates them. Gaps:
  - No pricing-authority or operator field. Section 4 explains why this blocks honest cluster rules.
  - `items.schema.json` describes `subcategory` as "the text before the colon in DeductIt's Browse convention". That puts a sponsor-product dependency into the neutral public schema; see §3.
- **Methodology:** `methodology/METHODOLOGY-2027.0.md` is a draft and says "Not yet approved for building an edition". It assumes:
  - an observation window "in the twelve months ending September 30 of the prior year";
  - a first edition "published mid-2027" and labelled as covering donations from its publication date.

  It therefore **cannot build a DV-2026 as written**. Its bootstrap resamples observations, not stores, so it would understate uncertainty for clustered thrift prices.
- **Governance:** `GOVERNANCE.md` v0.1 requires a ≥30-day public comment period and **advisory-council approval** before any methodology builds an edition. The council "is empty at version 0.1". **As written, governance blocks any 2026 edition.**
- **Contributor terms:**
  - `CONTRIBUTING.md` has a Data Contributor Certificate marked "DRAFT, pending counsel review".
  - The DMCA agent is "to be named".
  - Bulk contributors are pointed at `data@donationvalues.org`, which cannot work without DNS/MX if the domain really has no DNS.
- **Site:** an Astro 5.18 static scaffold. Pages: `/`, `/download`, `/irs-primer`, `/legal`, 404, plus synced README/governance/contributing/methodology/conduct.
  - `site/README.md` and `public/_headers` assume **Cloudflare Pages**. CI builds but never deploys.
  - `sync-content.mjs` hard-codes `methodology/METHODOLOGY-2027.0.md` (line 44).
  - There are no lookup, item, edition or contribute-form pages.
- **Licensing:** Apache-2.0 for code, CC BY 4.0 for docs, CC0 for data. `CITATION.cff` has no DOI.
- **Clean-room hygiene problem already in the public repo:**
  - `docs/design/research_notes/survey_methodology_and_estimation.md` line 78 quotes example ItsDeductible high/medium dollar figures.
  - `existing_guides_and_itsdeductible.md` has a "Cross-guide comparison for the same items" section (KQ7). I did not read it, to limit my own exposure.
  - The founding report quotes charity-guide ranges.
  - Anyone drafting the taxonomy or reviewing values from inside this repo is therefore exposed to third-party estimates. (I saw the two line-78 figures in grep output. I author no values here.)

### Reported to me, not verified

- donationvalues.org is registered but has no DNS and no live site.
- The repo `donationvalues/donationvalues` is public.
- Older repo `foothill-ai/donationvalues.org` took a Goodwill-permission approach.
- DeductIt's frontend services, TurboTax guide service and backend all use ItsDeductible-derived values. Foothill AI has no right to them.

### Release blockers for DV-2026, in order of lead time

1. **No observations exist, and the only genuine 2026 observations still possible are those collected 2026-11-18 → 2026-12-31.** That is about 6 weeks, spanning Thanksgiving and Christmas. This is the binding constraint. Everything else can be built in parallel.
2. Collectors: none recruited, no protocol pilot, no collection tool.
3. Taxonomy: empty, and its clean-room provenance must be set up before anyone drafts it (§3).
4. Methodology: needs a `METHODOLOGY-2026.0` with a concurrent-year window and cluster-aware rules.
5. Governance: needs a bootstrap amendment, because the council is empty.
6. Counsel review of the contributor certificate, the clean-room policy, the disclaimer and DeductIt's interim use. These are Neil's decisions and money.
7. Pipeline: aggregate and release stages, deterministic, with tests.
8. Hosting, DNS and email; Zenodo account and GitHub integration. All Neil-only signups.
9. DeductIt switch release and app-store review lead time.

---

## 2. Sourcing options for a legally clean 2026 edition

Scoring is mine. "Legality" means risk under terms of service, not legal certainty. Marked items rest on the 2026-11-02 repo notes or my memory and were not re-fetched today.

| Source | Terms and legality | IRS fit | Cost | Time to 2026 data | Item coverage | Reproducibility | Verdict |
|---|---|---|---|---|---|---|---|
| **eBay Browse API** | Returns **active listings (asking prices), not sold prices**. The API License Agreement (per the repo note, citing https://www.edp.ebay.com/join/api-license-agreement) says: §8.1.4 needs "express prior written permission" for anything that "enables derivation of" average selling price for a category; §9.5 bans using content "to suggest or model prices"; §9.10 bans ML training; §3.1/§8.1.3 impose deletion and 6–24 h staleness. **Verify the current text.** | Weak: asking prices on an online venue, not the thrift market Pub 561 names. | API is free; legal risk is the cost. | Instant technically, but blocked by terms. | Broad. | Poor: you can't keep or republish the raw data. | **Reject**, even for internal calibration, without written permission. |
| **eBay Marketplace Insights API** (sold items) | Per the repo note, citing https://developer.ebay.com/api-docs/buy/marketplace-insights/overview.html: "Limited Release", "available only to select developers approved by business units", 90-day lookback. As a Restricted API it can't be distributed "in raw or aggregated form" (§8.5.2(4)). **Verify current status.** | Better (sold prices), but the wrong market and needs fee/shipping adjustments. | Unknown; application only. | Weeks to months for approval, if ever. A 90-day lookback from mid-Nov reaches only about mid-Aug 2026. | Broad. | Not redistributable. | **Reject for v2026.0.** Long-term: ask eBay in writing only for a labelled secondary series; expect "no". |
| **ShopGoodwill.com** (online auctions) | Repo note: terms pages returned 404 to automated fetch. Commercial scrapers exist, which is no evidence of permission. **Unverified; read the footer terms manually.** | Auction clearing prices for curated, higher-value lots. That is a different market from shelf stock. | — | — | Skewed to collectibles and electronics. | Poor. | **Reject** for the headline. Possible future partnership with Goodwill Industries International. |
| **Savers / Value Village** | As far as I know (from memory, verify) there is no national e-commerce price catalogue, so prices come from the shelf. In-store tag observation is the route. | In-store tags fit well. | — | — | — | — | **Use in-store** (below). Seek a written data agreement long-term. |
| **ThredUp** | Terms returned 403 to the earlier fetch. **Unverified.** ThredUp sets prices for curated online consignment. | Online "resale", not "thrift shop value". | — | — | Apparel only. | Poor. | **Reject.** |
| **Poshmark** | Terms §4(b) bar "copy, scrape, harvest, crawl…" (repo note, https://poshmark.com/terms, v4.6 of 2025-06-03). **Verify.** | Peer-to-peer listing and sold prices, top-skewed. | — | — | Apparel. | Poor. | **Reject.** |
| **Mercari** | Prohibited Conduct bars "any robot, spambot, spider, crawler, scraper" (repo note, https://www.mercari.com/us/help_center/topics/account/policies/prohibited-conduct/). **Verify.** | Same as Poshmark. | — | — | Broad. | Poor. | **Reject.** |
| **In-store shelf-price survey** (paid collectors, plus Neil and volunteers) | A posted tag price is a fact (*Feist*). The store's remedy is its premises rule, so comply with signs and staff and photograph no people. This is the repo's chosen path. | **Best fit:** Pub 561's "price that buyers of used items actually pay in used clothing stores, such as consignment or thrift shops" and Form 8283 "Thrift shop value" (as quoted in the founding report from irs.gov/publications/p561 and /instructions/i8283; re-verify the current revision text). | Est. $5k–9k for v2026.0 (§4). | Starts as soon as collectors and the form exist; about 5 effective weeks. | Only what's on the shelf. Clothing, kitchenware, books, toys and linens are dense; furniture and large electronics are sparse. | **High:** every row has store, date, photo hash and collector. | **Primary source for v2026.0 and for the long term.** |
| **Volunteer crowd-sourcing** | Same legal basis, plus the certificate. | Same. | Low cash, high review cost. | Too slow to recruit and train for 6 weeks. | Patchy. | Medium: quality varies. | Long-term supplement. Not a v2026.0 dependency. |
| **Operator data agreements** (regional Goodwill member orgs, SVdP councils, independents) | Clean if written, with warranties of source and authority. | Excellent, especially POS **transaction** prices, which beat tag prices. | Legal time; maybe a data-use fee. | Months. Not 2026. | Whatever the operator sells. | High if feeds are archived. | **Start outreach now; long-term backbone.** It fixes the markdown/transaction gap. |
| **BLS CPI for aging values** | Public domain. | Not a value source. | Free. | — | — | — | **Don't use for v2026.0.** As far as I know (verify at bls.gov/cpi) the only "used" CPI item is used cars and trucks; the apparel and household-furnishings indexes price **new** goods. Aging thrift prices with them assumes used and new prices move together, which is unproven. v2026.0 needs no aging, because all observations fall inside 2026. |
| **Charity guides, ItsDeductible, DeductIt table** | Editorial estimates likely protected under *CDN v. Kapes*; no rights. | — | — | — | — | — | **Never ingest, never benchmark into the pipeline.** |

**Recommendation.**
- **v2026.0:** in-store tag-price observations only, from paid collectors plus Neil, collected 2026-11-18 → 2026-12-31. No online series, no aging, no inheritance from outside sources.
- **Long term:** a continuous in-store panel, plus written operator feeds (aim for transaction prices), plus an optional online secondary series only under written permission.

---

## 3. Clean room: values, taxonomy, proof limits, and the DeductIt switch

### Who is exposed

- **Neil:** ran DeductIt with the ItsDeductible-derived table and almost certainly saw its items and values.
- **Any agent session that opened DeductIt's data assets.**
- **Anyone who reads `docs/design/`** in this repo (third-party figures, §1).
- **Every LLM:** pretraining likely includes web copies of charity guides and possibly ItsDeductible tables. This can't be removed. That's why the existing rule "agents never produce a price" matters most: every price must trace to a photographed tag.

### Values provenance

Values are clean by construction if every number in `values.csv` is a deterministic function of `observations.csv`, and every observation has a collector, store, date, certificate and private photo. No one picks numbers. Make that **checkable**:
- the pipeline refuses any price not traced to an `obs_id`;
- the release ships `observations_hash` and the lineage.

### Taxonomy provenance (the weaker point; act on it now)

1. Write `docs/clean-room/POLICY.md` and a `docs/clean-room/LOG.md` with dated entries recording who drafted what from which inputs.
2. **Allowed inputs:**
   - IRS similar-items groups (Pub 526, Pub 561, Form 8283 instructions);
   - the Google Product Taxonomy (verify its reuse terms; counsel question 9 in the founding report);
   - **empirical shelf counts** from the pilot visits, i.e. what is actually on thrift racks.

   **Forbidden inputs:** DeductIt code and data, ItsDeductible, charity guides, and `docs/design/` notes that quote figures.
3. **Drafter:**
   - a fresh agent session whose sandbox includes only this repo minus `docs/design/research_notes/` and the founding report, plus the IRS publications and Google taxonomy file;
   - prompt, inputs and output hashes recorded in the log.

   **Reviewer:** ideally an unexposed contractor or council candidate. Neil approves but does not draft or add items from memory. If Neil proposes an item, log it with "source: Neil, possibly exposed" so the exposure is visible rather than hidden.
4. **Naming:** use generic product names and the project's own `dv:` hierarchy. Don't use "Subcategory: Item" strings and don't mirror any legacy category count.
5. **Remove the DeductIt reference** from `items.schema.json`'s `subcategory` description. Change the pipeline's planned `deductit-compat` output to a **generic vendor JSON keyed by `dv_id`**. Any legacy-string crosswalk is built by DeductIt, in DeductIt's private repo, **after** the taxonomy is frozen, one-way only, and never fed back.
6. **Hygiene, Neil's decision:** move the third-party figures out of the public design notes, or at least add a warning banner that clean-room drafters must not read them. Note that a Zenodo GitHub release archives the whole repo, notes included, permanently.

### Limits of proof (say these publicly)

- A clean room is evidence of independent creation, not proof. You can't prove a negative.
- Common item names ("men's jeans", "coffee mug") will overlap with every guide. The defence is independent derivation plus empirical selection, not dissimilarity.
- LLM priors are contaminated. Agents only classify, and every price is a tag.
- Neil's exposure can't be undone. Logging and an unexposed reviewer reduce it; they don't erase it.
- Counsel, not this assessment, decides whether the process is sufficient.

### What DeductIt must change to switch

This is from the founding report's survey of DeductIt; I could not read the code this session. Re-inventory first: the brief says the backend and the TurboTax guide service also hold copies, which the report doesn't fully enumerate.

1. **Inventory every copy and path** of the legacy values: frontend asset, backend copy, TurboTax guide service, ETL script, docs, Firestore rules and seeders, tests and fixtures. A read-only agent produces the list. Neil approves the removal plan.
2. **Replace the source:** load a DV edition artifact keyed by `dv_id`, carrying `edition`, `tier`, `value_cents`, `n_obs` and `edition_sha256`. Map p50 to the default "good" and p75 to "high". Don't keep the 0.70 or 0.8/1.25 derived-tier multipliers for DV items; DV publishes each tier directly.
3. **Store on each new donation:** `dv_id`, `edition`, `tier`, `value_source` (`dv` / `user`).
4. **Coverage drop is real.** v2026.0 will cover about 100–150 specs, against roughly 1,757 legacy items. For an uncovered item, show "No DonationValues value; enter your own fair market value and note how you determined it." **Do not fall back to legacy values.** This is the main UX and product decision (Neil).
5. **Historical records:** leave values users already saved; they are the user's records. Stop re-resolving them from the legacy table. ItsDeductible user-export imports keep the imported numbers as user-entered values and don't match them into any table.
6. **Copy:**
   - fix the help text that claims "Salvation Army and Goodwill guidelines";
   - cite "DonationValues DV-2026 (DOI …)";
   - keep "Thrift shop value" as the Form 8283 method;
   - keep a human judgment step before any Form 8283 value.
7. **Delete the legacy table from the shipping build and backend** in the switch release. Whether git history matters depends on whether the DeductIt repo is private (verify); counsel question.
8. **Timing:** ship to app stores by about 2027-02-01, ahead of peak filing. Allow for store review lead time.

---

## 4. Minimum viable DV-2026 release

### Edition definition (proposed METHODOLOGY-2026.0)

- **Covers** donations dated 2026-01-01 → 2026-12-31.
- **Observation window** 2026-11-18 → 2026-12-31, **stated plainly**: "values reflect thrift shelf prices observed in November–December 2026; no adjustment to earlier months".
- **Published** about 2027-01-15. Openly retrospective. **It did not exist on most donation dates; say so.** Pub 561's "comparable sales close in time" supports same-year observation better than a forecast.
- **Never** relabel 2027 observations as 2026. Observations dated after 2026-12-31 are excluded by a hard pipeline check.
- **Recommend a long-term concurrent-year model:** `DV-YYYY` built from YYYY observations and published in January of YYYY+1. A provisional rolling preview during the year can be labelled "provisional" for apps.

  This departs from 2027.0's "published before the tax year" design. Flag it for reconciliation with Codex's assessment.
- **Version as `METHODOLOGY-2026.0`.** Keep `2027.0` as a superseded draft or fold it in. Update `sync-content.mjs` and `methodology/README.md`.

### Item list

**About 120 target specs** (range 100–150), chosen for donation frequency and shelf density:

| Area | Target specs |
|---|---|
| Adult and children's clothing basics | ~60 |
| Shoes and accessories | ~10 |
| Kitchenware and small appliances | ~20 |
| Books and media | ~8 |
| Toys and games | ~8 |
| Linens | ~8 |
| Small furniture and home décor | ~6 |

Expect perhaps **60–100** to meet the thresholds. Publish only those, with an explicit "not covered" list. **No parent inheritance in v2026.0.** It would publish numbers no tag supports, so keep the rule for later editions.

### Sample thresholds and cluster independence

Thrift pricing is set by a **pricing authority**: a Goodwill member organisation's price board, Savers corporate rules, a Salvation Army ARC or division, or an independent shop. Five stores of one Goodwill region are close to one observation of that region's price board. The independent unit is the pricing authority, then the store.

Schema change: add `pricing_authority` (pseudonymous) to observations.

A national value is published only if all of these hold:
- n ≥ 20 accepted full-tag observations;
- ≥ 5 distinct stores;
- ≥ 3 metros;
- **≥ 3 distinct pricing authorities, from at least 2 different chains or store types**;
- no single store > 30% of n;
- no pricing authority > 40% of n;
- ≤ 5 observations per spec per store-visit, which the protocol already sets;
- repeat visits to a store count only if ≥ 14 days apart.

Statistics:
- headline: median; band p25–p75;
- **cluster (store-level) bootstrap** CI, B = 2,000, seed recorded;
- also report the median of store medians, and flag the spec when it differs from the pooled median by > 20%;
- report `n_obs`, `n_stores`, `n_metros`, `n_authorities`.

**No regional values in v2026.0.**

Markdowns: record them; the headline stays the full tag price, with the markdown share published.

These thresholds are judgment calls. Label them as such.

### Field design that reaches those thresholds

**4 metros × 4 stores = 16 stores**, spread across at least 3 chains/types (Goodwill, Savers/Value Village, Salvation Army/SVdP, independents) and at least 6 pricing authorities.

- Specs split into 3 blocks of about 40.
- Each store gets 2 visits ≥14 days apart, about 4 h each: about 32 visits.
- Each visit yields about 120–200 observations.
- Gross: about 4,000–6,000 observations, comfortably above 120 × 20 = 2,400 even if half the specs are thin on the shelf.

Metros should be drivable by the hired collectors. Neil picks them (decision).

**Collection tool:** use the simplest thing that works. A Google Form or Sheet in the foothill.ai Workspace, with photo upload to a private Drive/GCS folder (KoboToolbox is an offline-capable alternative). Agents convert the exports to `observations.csv`, SHA-256 the photos, strip EXIF and open PRs. Don't build the Worker/R2/bot-PR stack for v2026.0.

### Site pages needed at release

- Home, showing the edition, hash and DOI.
- `/editions/DV-2026`: window, publish date, hash, DOI, datasheet, changelog ("first edition").
- `/items/{dv_id}`: tiers with p50 leading, band, n/stores/metros/authorities, window, CI, and the observation table without store addresses.
- Lookup: a static list or Pagefind.
- `/methodology` (2026.0).
- `/download`.
- `/irs-primer`.
- `/legal`: disclaimer, licenses, takedown, DMCA agent, collector privacy notice.
- `/governance`.
- `/contribute`, which can say "collection closed for 2026".

Defer `/api`, the pro and developer pages, `/status`, Parquet and SQLite. Ship CSV, JSON and `datapackage.json`.

### Hosting and DNS

Downloads should never be served primarily from the site. Downloads live on Zenodo (immutable) and GitHub Releases. The site is small, so any host works.

| | Cloudflare Pages | Firebase Hosting | GitHub Pages |
|---|---|---|---|
| Fit with current scaffold | Already targeted (`_headers`, `site/README.md`) | Needs `firebase.json` headers and a deploy action | `_headers` **ignored**: the CSP is lost |
| Custom apex domain | From memory, verify: apex needs the zone on Cloudflare (nameserver change) | A/TXT records at any registrar | A records at any registrar |
| Account | New Cloudflare account unless one exists | Existing GCP org (`foothill.ai`), but use a **separate project**, not DeductIt's, for neutrality | Existing GitHub org |
| Free-tier limits | Generous for static sites (verify current limits) | Spark free quota (verify) | Soft bandwidth and size limits (verify) |

**Recommendation:** Cloudflare Pages if Neil is comfortable moving the domain's nameservers to Cloudflare. It matches the scaffold and costs nothing. Otherwise use Firebase Hosting in a new `donationvalues-web` GCP project, which keeps everything inside Foothill's existing GCP and Secret Manager practice. **Avoid GitHub Pages** because of the headers.

DNS also needs MX for `data@` and `dmca@`, or remove those addresses. Neil makes all DNS changes.

### Immutable versioned downloads and DOI

- Tag `v2026.0` (edition `DV-2026`) with a protected-tag ruleset.
- The GitHub Release carries `SHA256SUMS` and canonical CSVs, plus the edition hash in `CITATION.cff` and on the site.
- GitHub release assets can be edited by maintainers, so **Zenodo is the immutability anchor**. Zenodo version records are frozen, with a concept DOI over all versions (per the Zenodo docs cited in the founding report; verify).
- **A Zenodo DOI and record are effectively permanent.** Mint only after counsel sign-off and the clean-room hygiene step, because the GitHub integration archives the whole repo.
- Neil creates the Zenodo account, links GitHub, and enables the repo.

### Governance bootstrap (needed to release at all)

Amend `GOVERNANCE.md` to v0.2 with a "pre-council edition" rule:
- until the council is seated, the maintainer may approve a methodology after a public comment period of ≥ 30 days;
- each comment gets a written disposition;
- the edition and site carry "approved by sponsor-maintainer before the advisory council was seated";
- the first council reviews it retroactively, and any changes flow into the next edition, never into DV-2026.

Run the 30-day comment period **during** collection: open about 2026-11-24, close about 2026-12-24. This is Neil's call and changes a public commitment, so do it openly.

### Week-by-week plan

Owners: **N** = Neil only; **A** = agents, with Neil reviewing PRs. Week 0 is 2026-11-17.

| Week | Dates | Owner | Work |
|---|---|---|---|
| 0 | Nov 17–22 | **N** | Go/no-go on DV-2026. Budget cap. Pick 4 metros and the collector approach (contractors via a local platform or personal network; worker classification and 1099s). Engage counsel (certificate, clean room, disclaimer, collector agreement, DeductIt interim use). Pick a host. Approve the clean-room policy. |
| 0 | Nov 17–22 | **A** | Clean-room policy and log. `METHODOLOGY-2026.0` draft. Governance v0.2 draft. Schema updates (`pricing_authority`, edition `DV-2026`, remove DeductIt reference). Clean taxonomy v0 (~150 candidates). Collector protocol, one-page field card and form. Pipeline validate/aggregate with tests on **synthetic fixtures that never enter `data/`**. |
| 1 | Nov 23–29 (Thanksgiving Nov 26) | **N** | Pilot 2 store visits yourself (about 8 h) to time the protocol and record shelf counts for taxonomy selection. Sign collector agreements. Set up the Cloudflare or Firebase account and DNS. Publish the pre-release site. Open the comment period about Nov 24. |
| 1 | Nov 23–29 | **A** | Revise the taxonomy from pilot shelf counts and freeze about 120 specs. Assign spec blocks per store. Build the ingest from form export to PR. Deploy workflow. Write the collector privacy notice. |
| 2 | Nov 30–Dec 6 | **N + collectors** | Visit round 1 begins. N handles collector questions (about 3 h). |
| 2 | Nov 30–Dec 6 | **A** | Daily ingest, QA flags, classification with logged runs, and a coverage dashboard (specs × stores × authorities). |
| 3 | Dec 7–13 | **N + collectors** | Round 1 completes. **Midpoint gate (N):** if fewer than 40 specs are on track, switch to fallback B. |
| 3 | Dec 7–13 | **A** | Coverage report and reassignment of thin specs. Draft item and edition page templates. |
| 4 | Dec 14–20 | **N + collectors** | Round 2, with visits ≥14 days after round 1. |
| 4 | Dec 14–20 | **A** | Same as week 3. Datasheet draft. |
| 5 | Dec 21–31 | **N + collectors** | Gap-fill only (stores close Dec 25). **Hard cutoff 2026-12-31.** Comment period closes about Dec 24. |
| 5 | Dec 21–31 | **A** | Final QA queue. Draft comment dispositions for N. |
| 6 | Jan 4–10, 2027 | **N** | Rule on flagged observations (agents never drop any). Approve dispositions and `METHODOLOGY-2026.0`. Counsel reviews the release pack. |
| 6 | Jan 4–10, 2027 | **A** | Deterministic build twice, with byte-identical output checked. Release candidate. Site pages. DeductIt switch PR in the DeductIt repo (read-only until N authorises). |
| 7 | Jan 11–17 | **N** | Approve, tag and publish the release. Zenodo DOI (about Jan 15). Merge. Announce. |
| 7 | Jan 11–17 | **A** | Verify hashes, DOI resolution and the live site. |
| 8 | Jan 18–31 | **N** | DeductIt switch release to stores (new version number), legacy table removed. User notice. |
| 8 | Jan 18–31 | **A** | DeductIt QA. Post-release errata process. |

### Decisions only Neil can make (money, legal, accounts, signups)

- Go/no-go and the budget cap.
- Counsel engagement and every legal sign-off.
- Collector hiring, pay, contracts and tax forms.
- Metro choice.
- Governance v0.2 and methodology approval.
- Cloudflare or Firebase account; DNS and nameserver changes; MX.
- Zenodo account and GitHub link; minting the DOI.
- Trademark filing (optional, not a blocker).
- Operator outreach letters.
- Whether to purge third-party figures from the public design notes.
- DeductIt coverage UX, interim use of the legacy table before the switch, the switch release and the user notice.
- Every merge and publication.

### Estimates (explicitly estimates)

| Item | Estimate |
|---|---|
| Collectors: about 32 visits × (4 h + 1 h travel) ≈ 160 h at $25–35/h, plus mileage and platform fees | $5k–7.5k |
| Counsel: about 5–10 h | $2k–6k |
| Hosting, DNS, Zenodo, GitHub | ~$0 (domain already held) |
| Trademark (optional; USPTO per-class fee, verify) | a few hundred dollars per class |
| **Total cash** | **≈ $7k–14k** |
| Neil's time over 9 weeks: decisions, about 16 h of own store visits, reviews, the DeductIt release | ≈ 40–60 h |
| Agent work: methodology, taxonomy, pipeline, site, DeductIt PR (meaningful, not on the cash line) | ≈ 60–100 agent-hours |

### Fallbacks if sampling falls short (midpoint gate, about Dec 11)

- **A, on track:** publish all specs that meet the thresholds; expect about 60–100.
- **B, thin (fewer than 40 on track):**
  - narrow to about 40–50 of the densest specs (clothing basics, kitchenware, books, toys, linens) and concentrate all remaining visits on them;
  - accept a *provisional* tier only if N approves it in writing before the build: n ≥ 12, ≥ 4 stores, ≥ 2 metros, ≥ 3 pricing authorities, published with `status=provisional`, a wide CI and a visible label.
  - Never lower thresholds silently.
- **C, failed:** publish **"DV-2026 observations"**: the accepted observation table and descriptive statistics, with no tiered values and no "values" labelling, Zenodo DOI optional.
  - DeductIt still removes the legacy table and asks users for their own values, showing the observed ranges as evidence.
  - DV-2027 becomes the first values edition, from the continuing 2027 panel.

---

## 5. Major conclusions

1. **Nothing publishable exists yet.** Data, taxonomy and pipeline are all empty, the methodology targets 2027, and governance blocks any edition until a council is seated. DNS, hosting, DOI and repo visibility are **unverified** in this session.
2. **The only clean 2026 source is in-store tag prices collected 2026-11-18 → 2026-12-31.**
   - Reject eBay Browse (asking prices; the license bars derived averages) and Marketplace Insights (restricted, non-redistributable).
   - Reject ShopGoodwill, ThredUp, Poshmark and Mercari (terms, wrong market).
   - Don't age values with BLS CPI; there is no used-goods index except vehicles (verify).
   - Start written operator agreements now as the long-term backbone.
3. **A modest DV-2026 is feasible but tight.** About 120 target specs, 16 stores in 4 metros, 2 visits each, and cluster-aware thresholds (≥3 pricing authorities, per-store caps, store-level bootstrap). Publish about 2027-01-15 under `METHODOLOGY-2026.0`, openly labelled as a retrospective same-year edition. Estimated cost $7k–14k and 40–60 Neil-hours.
4. **The clean room needs action this week, before anyone drafts the taxonomy:**
   - logged provenance and a drafter who is not exposed;
   - remove DeductIt references from the public schema and pipeline plan;
   - deal with the third-party figures in the public design notes before a permanent Zenodo archive.
5. **The DeductIt switch removes every copy of the legacy values** (frontend, backend, TurboTax guide service), with no fallback to legacy numbers. It stores `dv_id`, `edition` and `tier`, accepts a large coverage drop, and ships about 2027-02-01. The DeductIt code facts here are second-hand and need re-inventory.
6. **Re-verify before execution:** every source-terms row in §2, plus hosting limits, Zenodo behaviour and DNS state, with web, `gh` and DNS access, because none was re-fetched today.
