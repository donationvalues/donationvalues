# DV-2026 release assessment (independent, Claude)

- **Author:** Claude Opus 5.5 (`claude-opus-5-5`), run as `claude -p --model opus --dangerously-skip-permissions` with additional directories `~/code/github/deductit` and `~/code/github/donationvalues.org`.
- **Original independent run:** 2026-11-17. In that run I did **not** read `codex-assessment.md`, `RELEASE-PLAN-2026.md`, the earlier `claude-assessment.md` or any other agent's results, and I did not use commit `a709273` as an input. That declaration applies to the original run only.
- **Reconciliation round 1:** 2026-11-17, reviewing base/head `a7092738f0ea15f9d7ba4c46b5fff015b5c3d490` plus the working diff. In this round I read both other documents and corrected this file only where my own re-retrieval or inspection showed an error. Corrections are marked **[R1]**. What I originally proposed, and what I rejected or conceded, is recorded in the addendum at the end.
- **Final review (round 2):** 2026-11-17, same head. I added my own hosting-limit retrievals, removed unreliable clock times (dates only), and paraphrased the remaining eBay quotation. Corrections are marked **[R2]**.
- **Scope:** assessment only. No scraping, price collection, sign-ups, keys, purchases, DNS, deploy, publication, DOI, email, Linear or secrets. Sibling repos were read only, with no mutating git. I did not open DeductIt's bundled value asset.
- **Exposure disclosure:** this session read `deductit/docs/fmv-database.md`, which contains two example legacy rows, and `docs/design/` research that quotes prior-guide figures. This session is therefore exposed and must not author DonationValues taxonomy.

## Bottom line (as corrected in R1)

1. **Not publishable yet.**
   - Data, taxonomy and pipeline code are empty or absent.
   - The governance approval route and counsel review are open.
   - Hosting and DOI are short tasks once Neil grants access, but they are not the blockers.
2. **Recommended source for 2026: first-party in-store thrift shelf observations.** Operator transaction feeds are the long-term goal.
   - eBay's licence does not permit category price statistics or redistribution without express written consent.
   - The resale sites whose terms I could read restrict automated extraction or reuse.
   - BLS supplies context, not item prices.
3. **DV-2026 should use only 2026 observations** and say so plainly: a late-2026, multi-location convenience sample published in January 2027. **[R1]** I withdrew my original proposal to include observations up to 10 Jan 2027.
4. **DeductIt is not a drop-in consumer.** Its model encodes physical-quality tiers. A DV price quantile is not a quality tier, so DeductIt needs model and UI changes, not a compat file. **[R1]**

---

## 1. Status

### Checks run (no sandbox or local permission denials; HTTP and command findings noted)

| # | Check | Result |
|---|---|---|
| P1 | `ls -la ~/code/github/deductit/frontend/lib/services/` (preflight) | Succeeded: 56 entries listed |
| P2 | `ls -la ~/code/github/donationvalues.org/` (preflight) | Succeeded: `.git`, `.gitignore`, `AGENTS.md`, `CLAUDE.md`, `CONTRIBUTING.md`, `LICENSE`, `README.md` |
| P3 | `dig donationvalues.org ANY +short` (preflight) | Succeeded with an **empty answer**. No conclusion drawn from it. |
| P3a | Supplemental typed `dig +short` for A, AAAA, CNAME (apex and www), NS, SOA, MX, TXT, CAA, DS, `_dmarc`, and A via `@otto.ns.cloudflare.com` | NS `otto`/`zoe.ns.cloudflare.com`. SOA serial 2419222266. MX Cloudflare routing (route1-3). TXT SPF. **No A, AAAA or CNAME for the apex or www**. No CAA, DS or DMARC. |
| P4 | `whois donationvalues.org \| head -20` (preflight) | Succeeded. The first 20 lines are only the IANA `.ORG` referral. |
| P4a | Supplemental `whois -h whois.publicinterestregistry.org donationvalues.org` | Registrar Cloudflare. Created 2026-10-22, expires 2027-10-22, clientTransferProhibited, DNSSEC unsigned |
| P5 | `gh repo view donationvalues/donationvalues --json visibility,url` | PUBLIC |
| G1 | `gh pr list`, `issue list`, `release list`, tags, `run list`, branch protection, Pages API, org | Draft PR #1. 0 issues, releases or tags. CI green on main on 2026-11-03 and on PR #1. `main` unprotected (API 404 "Branch not protected"). Pages API 404. Only default labels. |
| G2 | `git ls-remote` on the DeductIt origin | main = `ebb2dd9448820e5e50bba0f0e90f06e9efddcab2`, matching the local `origin/main`. Checkout HEAD `17db882…` is on another branch, so I cited `origin/main` via `git show`. |
| G3 | Legacy repo `git log`, `git show` | `main` 813e0f9 (README and policy only). Branch `setup/firebase-hosting` 9b5cca2 adds `firebase.json`, placeholder pages and `docs/HOSTING.md`, with no `.firebaserc` project binding. |
| H1 | `curl https://donationvalues.org` | Connection failed (000), consistent with no address records |
| H2 | Optional account inventory: `firebase projects:list`, `gcloud projects list` as the agent identity | Nothing donation-related is visible **to this identity**. This is not a sandbox denial. Cloudflare account, Firebase admin-identity and Zenodo inventories were **not available** to me, so the existence of hosting projects is unknown. **[R1]** "No hosting" here means only that the domain has no web records. |
| V1 (R1) | `git diff --check` | Exit 0 |
| V2 (R1) | Local Markdown link check over `docs/assessment/*.md` (script `/tmp/dv-scripts/mdlinks.py`) | 13 relative links, 0 broken |
| V3 (R1) | Site build in a temp copy of HEAD: Node 22.23.4, `npm ci`, `npm run build`, `npm run check-links` | 10 pages. 131 internal links, 0 broken |
| V4 (R1) | `npm audit` in the same temp copy | 13 advisories: 1 critical, 11 high, 1 low. Triage before hosting. |

### What exists and what blocks release

| Area | State | Blocker |
|---|---|---|
| Licences, governance docs, research | Present (`README.md:31-39`, `GOVERNANCE.md`, `docs/design/`) | Council empty (`GOVERNANCE.md:15`). Approval required before building an edition (`:22-23`). The comment period opens only once the council is seated (`methodology/README.md:7`). Governance changes need only a PR (`GOVERNANCE.md:3`). |
| Methodology | `METHODOLOGY-2027.0` draft; its cadence cannot produce DV-2026 (`:66-75`) | A new `METHODOLOGY-2026.0` with reduced scope and a revised estimator |
| Data | Three header-only CSVs | Taxonomy and observations |
| Pipeline | README only | validate, aggregate, release |
| Site | Astro scaffold; builds; download page still says DV-2027 and that patches cannot change values (`site/src/pages/download.astro:19`, `:40`) | Edition and item evidence pages, downloads, wording corrections, dependency triage |
| Hosting/DNS | Cloudflare-delegated zone with email routing; no web records; legacy Firebase setup branch exists but is unbound | Neil's account and DNS actions |
| DOI | `CITATION.cff` only | Manual Zenodo dataset deposit (see §4) |

---

## 2. Data sourcing (terms re-verified by me, paraphrased)

| Source | Terms as I retrieved them (paraphrase) | Pub 561 fit | Verdict |
|---|---|---|---|
| eBay Browse API | API Licence Agreement, page dated Sept 3, 2025, read in full from the official `edp.ebay.com` copy after `developer.ebay.com` returned 403 to curl and WebFetch. The original-host block is resolved by that mirror, so this is **not a licence evidence gap**. Without express written consent, the agreement does not permit uses that enable derivation of site-wide statistics or of average selling prices or sales volume for an eBay category. Its restricted-activities section lists, absent eBay's prior written consent, using content to model prices for eBay listings and ML training. It also sets staleness limits on displayed content. Production Buy-API access is partner-only, on application and contract. Browse searches live listings. | Weak: online asking prices | Exclude |
| eBay Marketplace Insights | A Restricted API under the agreement: no distribution of its data in "raw or aggregated form", no feeding it to non-eBay AI, and pricing tools only with consent. The public field-filter page says it is restricted and **not open to new users**. A buying-app guide describes it as a limited-release sold-history API. The private overview and method pages redirect to sign-in and were **not fetched**. **[R1]** I removed the 90-day and 10,000-item details, which came only from search snippets. | Sold prices, but a different venue | Exclude; future written agreement only |
| ShopGoodwill | Terms (last updated 01/22/2025): personal, non-commercial licence; automated access and robots.txt bypass prohibited; commercial republication needs written consent | Online auction of selected lots, not shelf prices | Exclude |
| Savers / Value Village (website) | **[R1]** Full terms recovered from the page's embedded `__NEXT_DATA__` (HTML SHA-256 `2b39e1cc…f857d`, retrieved independently by me): non-commercial licence, no public or commercial reuse, and no spiders, crawlers or robots for extraction | Stores are the core thrift market; the website is not | Survey stores in person; do not extract from the website |
| ThredUp | `/terms`, `/terms-of-use`, `/legal/tou`, `/legal/terms-of-use` and `/robots.txt` all returned **HTTP 403** to my browser-UA curl (and to WebFetch in the original run). **Not fetched; terms unverified.** **[R1]** Codex reports HTTP 200 loading shells from its environment; either way, no terms text was obtained. | Online consignment, mostly apparel | Exclude absent written permission |
| Poshmark | Terms (effective June 3, 2025): §§4 and 7 restrict scraping, harvesting and copying of service data and derivative works | Peer-to-peer, fees and shipping | Exclude |
| Mercari | **[R1]** The terms page at `/us/help_center/…/terms-of-service/` was now fetched: effective November 5, 2026, and it incorporates the Prohibited Conduct policy. That policy bars robots, crawlers and scrapers used to access the service or extract data. (My original `/us/tos/` attempt got 403.) | Peer-to-peer | Exclude |
| In-store shelf survey (paid) | Factual observations under the contributor certificate. Follow store and photo policies and stop on request. Counsel reviews the protocol. | Closest practical match to Pub 561's buyer-paid thrift prices, though shelf offers are a **proxy** for prices actually paid | **Primary for 2026** |
| Operator POS or price feeds | Need a signed agreement covering derivation, archiving and CC0 redistribution | Best long-term evidence (actual paid prices) | Pursue; not on the 2026 critical path |
| BLS / CPI | BLS publications are public domain, with citation requested. **[R1] Correction:** a BLS *Monthly Labor Review* article (May 2026) reports that BLS began pricing **secondhand apparel within the CPI in early 2025**; previously used cars and trucks were the only priced secondhand goods. My original statements that the only used-goods coverage was used cars, and that the apparel index tracks new apparel only, were wrong. No separately published secondhand-apparel series or item price-level table is established, and the absence of a separate series does not mean secondhand apparel is excluded from CPI. Apparel CPI-U NSA (CUUR0000SAA) is 135.424 (Sep 2025) and 140.043 (Sep 2026); Oct 2025 is missing in the API. | Price movement only | Context and sensitivity only. **No CPI-generated or CPI-adjusted prices in the MVP.** |
| Guides, ItsDeductible, DeductIt asset | Copyrightable estimates and selection, per the repo research | — | Never used as inputs, priors or benchmarks feeding the data |

IRS fit (re-verified; Pub 561 and the Form 8283 instructions both revised December 2025):
- Pub 561 says clothing value has no fixed formula, and that prices buyers actually pay in thrift or consignment stores indicate value.
- Pub 526 rejects replacement-cost formulas for household goods.
- The Form 8283 instructions list "Thrift shop value" as a method.
- Background only, not relied on by the plan: 26 CFR 1.170A-17 sets timing rules for qualified appraisals. A values dataset is not an appraisal. Retrospective edition labelling remains a question for counsel.

---

## 3. Clean room and DeductIt

### Clean room (unchanged in substance, tightened in R1)
- Dated policy, source allowlist and exposure log.
- An **unexposed** taxonomy drafter and reviewer, assisted by a fresh agent context without DeductIt access. Exposed parties (Neil, Codex, this session) do not author spec labels.
- Freeze and hash the taxonomy and protocol before any legacy mapping.
- Any legacy mapping lives only in the consumer repo and never flows back.
- **[R1]** The Google Product Taxonomy is optional and deferred until its reuse rights are checked; it is not needed for 50 specs.
- Historical `docs/design` research quotes prior-guide figures (for example `founding-research-report.md:42`). It must be excluded from clean authoring contexts and from the dataset deposit.
- Process evidence supports an independent-creation claim; it cannot prove a negative. Counsel decides whether it is sufficient.

### DeductIt facts (origin/main `ebb2dd94`, read-only)
- **Quality-tier model:**
  - `frontend/lib/models/fmv_item.dart:8` stores `highQualityValue` in cents.
  - `:24` selects the value by `ItemQuality` (high or medium).
  - `:77-82` parses `c`, `d`, `h`, `m`.
  - The model encodes physical quality, and `donation.dart:170` saves `itemQuality` on donations.
- **Donation records:** `donation.dart:168-172` store category, description, quality and per-unit FMV. There are no fields for `dv_id`, edition, method or hash.
- **Asset:** declared at `frontend/pubspec.yaml:133` on origin/main (`:110` in the local working-tree branch) and loaded at `frontend/lib/services/fmv_service.dart:30`. Subcategories are derived from colon-delimited descriptions at `fmv_service.dart:174` (`:159` in the working tree).
- **Provenance:**
  - `docs/fmv-database.md:5` and `:284` describe ItsDeductible provenance, as does `scripts/import_fmv_data.dart:8`.
  - The help text at `frontend/lib/help/help_content.dart:386` and `:448` claims Salvation Army and Goodwill guidelines, which is inaccurate.
- **Firestore path:** `frontend/lib/services/firestore_service.dart:15` references an `fmv_data` collection, `firestore.rules:311-314` grants read access, and `scripts/dart/seed_fmv_data.dart:1` is a seeder. **Production contents are unverified.**
- **Custom items:** `frontend/lib/screens/add_custom_item_screen.dart:137` and `:149-154` generate a companion value for the other quality tier at ×1.25 or ×0.8 in create mode. Those generated values are **not donor input**.
- **TurboTax guide:** `tt_automation_guide_service.dart:854`, `:875` and `:1345` use saved descriptions, totals and values rather than the asset.
- **Quick Entry:** the backend keeps its instructions independent of the catalogue (`functions/src/quick-entry-instructions.js:3-4`, `functions/src/quick-entry.js:306`). This bounded search does not prove the repo is clean.

### Required DeductIt changes (separate, later-authorised PRs)
1. **Interim (authorise by 27 Nov):**
   - stop offering legacy guide values for new entries, with manual donor entry instead;
   - correct the help copy at `:386` and `:448`;
   - mark the import and seed scripts and `docs/fmv-database.md` as legacy;
   - preserve saved donor records and amounts without relabelling their provenance.
2. **Custom companion values:** review the 0.8/1.25 generated values explicitly under the new manual-entry semantics. Distinguish donor-entered amounts from generated ones; do not treat all custom data as independent donor input. **[R1]**
3. **Firestore `fmv_data`:** audit first, then retain or remove only under later authorisation and counsel advice. No unconditional deletion. **[R1]**
4. **DV integration:**
   - replace the quality-tier model with stable `dv_id` and nullable values;
   - store edition, method, hash, window and quantile labels;
   - add a donor confirmation and override trail.
   **No mapping of p75 to "high" or p50 to "medium"**: a quantile is not a physical-quality grade, and extra JSON keys do not put provenance on donation records. **[R1]** Uncovered items get manual entry and never a legacy fallback. Never reprice old donations.

---

## 4. Release design (my position after R1)

I now **agree with the shared plan's core design**. My original 150-spec, n≥20 design and $8-12k estimate are withdrawn in favour of:
- **Scope:** target 50 specs, with **≥25 qualifying** at **n≥30, ≥6 stores, ≥3 metros, ≥3 independent pricing authorities**.
- **Caps:** at most 20% of a cell from one store, 40% from one pricing authority, and 50% from one metro, applied to both counts and weights.
- **Panel:** 18 stores in six metros across at least three Census divisions, with at least six pricing authorities overall.
- **Statistics:**
  - no parent inheritance, imputation, regional values or weak provisional tier;
  - p25, p50 and p75 labelled lower, typical and upper **observed sample prices**;
  - a fixed-seed cluster bootstrap reviewed by an independent statistician.
- **Window:** 2026 observations only (collection closes Dec 31). No 2027 data in the 2026 headline; any 2027 work is separate research.
- **Dates:** comment period Nov 23-Dec 23 (later if it opens later); target publication Jan 15, 2027.
- **Budget:** a provisional $5.5-10k total. Reduce scope or delay rather than weaken the floors.

Governance, versioning and DOI, as corrected:
- **Governance:** either the currently required full council, or an explicit bootstrap charter adopted by PR (permitted by `GOVERNANCE.md:3`). The charter requires independent tax and statistics approval, keeps the full 30-day comment period, and records approval **before** the final edition build. **[R1]** My original sponsor/maintainer-only "provisional edition" fallback is withdrawn.
- **Versioning:** the method version (`METHODOLOGY-2026.0`) is numbered separately from data editions. A correction is a **new** edition (DV-2026.1) with its own hash and DOI that may fix values. Originals are never mutated. **[R1]** My original "additive-only patch" rule is withdrawn; it would block corrections.
- **DOI: manual Zenodo dataset deposit** of the exact sanitised payload. Reserve the DOI in the draft, embed the DOI and hashes, and publish later only after approval. **[R1]** My original GitHub-integration proposal is withdrawn: a full-repository snapshot would include the historical research that quotes proprietary-guide figures, and it is not the intended data package.
  - The Zenodo docs say a reserved DOI is lost if the draft is deleted. The upload page says files can be changed by the owner for 45 days after publication. The manage-files page mentions 30 days for minor corrections, and that an edit draft must be published within 45 days. Either way, immutability is **project policy enforced by hashes and versioning**, not a host guarantee.
  - Per-edition evidence URLs (`/editions/DV-2026/items/{dv_id}`) are required.
- **Hosting:** Cloudflare Pages, given the delegated zone and the `_headers` scaffold. Triage the dependency advisories first. **[R2]** I retrieved the comparison limits myself on 2026-11-17:
  - **Cloudflare Pages Free:** 500 builds a month, 20,000 files per site, 25 MiB per file.
  - **Firebase Hosting no-cost tier:** 10 GB storage and 10 GB a month data transfer. On Spark, sites are disabled after a short grace period once transfer is exhausted, until the next month. Blaze bills overage. Firebase is a viable alternative, and the legacy setup branch exists.
  - **GitHub Pages:** published sites up to 1 GB; recommended source repo up to 1 GB; soft 100 GB a month bandwidth; soft 10 builds an hour for non-Actions builds; 10-minute deployment timeout; not intended as free hosting for primarily commercial sites.
  - I did not verify from these pages whether GitHub Pages applies custom `_headers`. That point should not be stated as verified by me.

### Neil-only decisions (unchanged in substance from the plan)
- scope and coverage reduction;
- budget ceiling after quotes;
- counsel;
- governance route and named reviewers;
- clean-room personnel;
- collectors and store permissions;
- the interim DeductIt change;
- host, DNS and contact routing;
- the Zenodo account, DOI reservation and publication;
- outreach to operators;
- the legacy repo's pointer or archiving.

---

## Fetched URLs and dates

| URL | Date and method | Result |
|---|---|---|
| developer.ebay.com/join/api-license-agreement; go.developer.ebay.com/api-license-agreement | 2026-11-17, curl with browser UA (×3), WebFetch | 403; superseded by the official mirror |
| www.edp.ebay.com/join/api-license-agreement | 2026-11-17, curl and WebFetch | 200, full text, dated Sept 3, 2025 |
| developer.ebay.com/api-docs/buy/static/buy-requirements.html | 2026-11-17, curl | 200 |
| developer.ebay.com/api-docs/buy/marketplace-insights/… (overview, item_sales/search) on both hosts | 2026-11-17, curl | Redirect to sign-in; **not fetched** |
| developer.ebay.com/api-docs/buy/browse/overview.html; edp.ebay.com/develop/api/buy/browse_api | 11-17, WebFetch 403; edp curl 200 | Browse is listing search |
| www.developer.ebay.com/api-docs/buy/static/ref-buy-browse-filters.html | 2026-11-17, curl | 200: Insights "not open to new users" |
| developer.ebay.com/develop/get-started/get-started-on-a-buying-application | 2026-11-17, curl | 200: Insights is a limited release |
| shopgoodwill.com/about/terms-of-use; /robots.txt | 2026-11-17, WebFetch and curl | 200 |
| www.savers.com/terms-of-use | 2026-11-17, curl (original run), parsed again in R1 | 200; terms in `__NEXT_DATA__` |
| www.thredup.com/terms, /terms-of-use, /legal/tou, /legal/terms-of-use, /robots.txt | 2026-11-17 (original run and R1), browser-UA curl, WebFetch and WebSearch | **403; not fetched** |
| poshmark.com/terms | 2026-11-17, WebFetch (first 100k chars) | 200 |
| mercari.com/us/help_center/topics/account/policies/prohibited-conduct/ | 2026-11-17, curl | 200 |
| mercari.com/us/tos/ | 2026-11-17, curl | 403 |
| mercari.com/us/help_center/topics/account/policies/terms-of-service/ | 2026-11-17, curl | 200, effective Nov 5, 2026 |
| irs.gov/publications/p561, /p526, /instructions/i8283 | 2026-11-17, curl | 200 |
| law.cornell.edu/cfr/text/26/1.170A-17 | 2026-11-17, curl | 200 |
| api.bls.gov … CUUR0000SAA, CUUR0000SETA02 | 2026-11-17, curl | 200 |
| bls.gov/cpi/additional-resources/cpi-item-aggregation.htm; bls.gov/opub/copyright-information.htm | 2026-11-17, WebFetch (curl 403) | 200 |
| bls.gov/opub/mlr/2026/article/turning-thrifty-incorporating-secondhand-apparel-into-the-consumer-price-index.htm | 2026-11-17 (R1), curl 403, then WebFetch 200 | Article dated 05/08/2026 |
| help.zenodo.org/docs/deposit/manage-versions/; about.zenodo.org/policies/; help.zenodo.org/docs/github/ (plus the enable and upload pages) | 2026-11-17, curl and WebFetch | 200 |
| help.zenodo.org/docs/deposit/describe-records/reserve-doi/; /create-new-upload/; /manage-files/ | 2026-11-17, curl | 200 |
| developers.cloudflare.com/pages/platform/limits/ | 2026-11-17, WebFetch | 200 |
| firebase.google.com/docs/hosting/usage-quotas-pricing | 2026-11-17 (R2), WebFetch plus browser-UA curl | 200; 10 GB storage and 10 GB a month transfer confirmed in the raw HTML; no last-updated date found |
| docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits | 2026-11-17 (R2), WebFetch plus browser-UA curl | 200; 1 GB site, 100 GB a month soft bandwidth, 10 builds an hour, 10-minute timeout |

---

## Reconciliation addendum (2026-11-17, rounds 1 and 2): final accepted position

| Topic | My original proposal or claim | R1 outcome and evidence |
|---|---|---|
| BLS coverage | "Only used cars"; apparel CPI is new apparel only | **Rejected (my error).** The MLR May 2026 article, fetched by me, says secondhand apparel has been priced in CPI since early 2025. No CPI-generated prices. |
| Observation window | Nov 30-Jan 10, including 2027 | **Rejected.** 2026 observations only, cutoff Dec 31. |
| Scope and floors | 150 specs; n≥20, 5 stores, 3 metros; ~$8-12k | **Replaced** by the plan's 50/≥25 at n≥30, 6 stores, 3 metros, 3 authorities with caps; provisional $5.5-10k. |
| Inheritance | Allowed from qualifying parents | **Rejected**; none. |
| DeductIt compat | h = p75, m = p50 via a compat file; "no schema change" | **Rejected (my error).** `fmv_item.dart:8`, `:24` and `donation.dart:170` encode physical quality. Consumer model changes are required. |
| Firestore `fmv_data` | Delete at the switch | **Rejected**; audit first, then act under authorisation and counsel. |
| Custom items | Out of scope as donor data | **Rejected (my error).** `add_custom_item_screen.dart:149-154` generates companion values. |
| Governance fallback | Maintainer-approved provisional edition | **Rejected.** Full council or a bootstrap charter with independent reviewers and 30 days. |
| Corrections | Additive-only patches | **Rejected.** A new edition, hash and DOI may fix values; originals stay immutable. |
| DOI | GitHub-release integration | **Rejected.** Manual dataset deposit, reserve before publish. |
| Mercari terms | ToS not fetched | **Resolved**: fetched the help-centre terms page (effective Nov 5, 2026). |
| ThredUp terms | Not fetched | **Unchanged**: still 403 from my environment. |
| Marketplace Insights | Search-snippet details (90 days, 10k) | **Removed**; private pages not fetched. Public filter page: not open to new users. |
| Hosting | "No hosting" phrasing | **Narrowed**: no web DNS records; account inventories unknown; legacy Firebase branch exists. |
| Appraisal-timing analogy (§1.170A-17) | Suggested as a counsel question (C7) | **Accepted decline (R2).** The plan omits it: the 2026-only evidence policy needs no legal analogy, and a values dataset is not an appraisal. My retrieval of the regulation stands as background only. |
| Cap failures under equal-store weights | Asked for a predeclared rule (C5) | **Accepted (R2):** a cell that fails count or weight caps is withheld. No trimming, and no post-hoc reweighting. |
| Hosting limits (C6) | Firebase and GitHub Pages figures were not retrieved by me | **Resolved (R2):** both pages were fetched by me (rows above). The plan's 10 GB / 10 GB a month Firebase figures match. |
| Retained from my original run | Clean-room roles; source exclusions; Cloudflare Pages; interim help-text fix; unprotected `main`; download-page wording conflict | Consistent with the plan; carried into the shared recommendation |

**Final accepted position (2026-11-17):** I accept `RELEASE-PLAN-2026.md` as the agreed recommendation. Every source fact in this file rests on my own retrieval or inspection. Where a page could not be fetched (ThredUp main legal pages, Marketplace Insights private pages, the original eBay host), it is recorded as a gap and not verified by proxy.
