# Open-data project design and adoption pathways for DonationValues.org

Research snapshot: 2026-11-02. Scope: how trusted open-data projects are structured, governed and presented; what a static-first FMV lookup site needs; contribution tooling; governance/trust; and concrete adoption pathways with the IRS, tax pros and tax-software vendors. Sources are mostly primary (project legal/data/FAQ pages, IRS pages, vendor help pages); where only secondary or vendor-marketing sources were available this is flagged.

---

## Key Question 1 — Reference open-data projects: license, governance, contribution, releases, API, provenance, funding

### Takeaway
The trusted projects split into three durable models: (a) nonprofit/association + copyleft database license + volunteer contribution with automated QA (OpenStreetMap, Open Food Facts, Wikidata, Open Library); (b) company-run "open core" data with a non-commercial/share-alike public license and paid commercial licenses funding operations (OpenSanctions, OpenCorporates); (c) proprietary crowdsourced price services that are *not* open but show the UX/incentive patterns (Numbeo, GasBuddy, PriceStats). Nearly all publish nightly/monthly bulk dumps in plain formats (CSV/JSONL/Parquet) with checksums, expose a rate-limited JSON API with an explicit "bulk, don't scrape" rule, and show per-record provenance.

### Cited Findings

**OpenStreetMap / OSM Foundation**
- OSMF "supports, but does not control" OpenStreetMap; board has seven volunteer seats serving two-year terms; members who joined ≥90 days before the AGM vote; membership is not required to contribute — [OSM wiki: OSMF](https://wiki.openstreetmap.org/wiki/OSMF)
- OSMF is funded by membership fees and donations and runs the State of the Map conference; corporate membership tiers listed in its funding manifest are 6,000 EUR (silver), 15,000 EUR (gold), 30,000 EUR (platinum) per year — [openstreetmap.org/funding.json](https://www.openstreetmap.org/funding.json); corporate-membership guidelines announced 2023 — [OSM blog](https://blog.openstreetmap.org/2023/09/08/osm-foundation-announces-new-membership-guidelines-for-corporate-sponsorship/)
- OSMF is the publisher/licensor under the ODbL (board minutes 2009); relicensing to ODbL completed 2012 — [OSMF board minutes 2009-07-09](https://foundation.openstreetmap.org/w/images/e/eb/Osmf_board_minutes_20090709.pdf)
- ODbL is share-alike for the *database* but not for "produced works" (maps, reports) — [OSM legal-talk](https://lists.openstreetmap.org/pipermail/legal-talk/2010-September/004447.html); [CASRAI ODbL entry](https://www.casrai.org/dictionary/term/open-database-license-odbl)

**Open Food Facts**
- Published by a French "Loi 1901" non-profit association — [OFF legal page](https://ad.openfoodfacts.org/legal); data under ODbL, individual contents under DbCL, images CC-BY-SA — [OFF data page](https://world.openfoodfacts.org/data)
- Funding: mostly project-specific grants (Ford Foundation, Mozilla, NLnet, EU, Santé publique France) while infrastructure relies on unrestricted individual donations; strictly refuses money from food companies/brands — [OFF donors page](https://world.openfoodfacts.org/donors); [OFF blog: independence](https://blog.openfoodfacts.org/?p=6910)
- Scale: >100,000 contributors, >3 million products from 150+ countries, used by >200 apps — [OFF blog: independence](https://blog.openfoodfacts.org/?p=6910)
- Exports: nightly MongoDB dump with sha256/md5 checksums; nightly JSONL (gzipped); daily *delta* JSON files covering the previous 14 days (deletions only via full dump); nightly TSV CSV (food CSV ≈0.9 GB gz / ≈9 GB raw); simplified Parquet on Hugging Face; RDF export no longer maintained — [OFF data page](https://world.openfoodfacts.org/data)
- API rule of thumb: production use OK if "1 API call = 1 real scan by a user"; scraping via API likely blocked; send an identifying HTTP header; apps that let users edit must send contributions back via API/SDK — [OFF data page](https://world.openfoodfacts.org/data)
- Attribution example required under ODbL: "Contains data from Open Food Facts, available under the Open Database License"; visible UI credit with clickable links to OFF and the license — [OFF data page](https://world.openfoodfacts.org/data)
- Data quality rests on "4 pillars": community review, ~50 automated logic checks (e.g., ingredient weights exceeding product weight), machine learning extraction from photos, and producer uploads — [OFF support: data quality](https://support.openfoodfacts.org/help/en-gb/21-gestire-i-miei-prodotti/2-come-possiamo-essere-sicuri-che-i-prodotti-presentati-su-open-food-facts-presentino-dati-originali-e-corretti); app contributions carry app version + anonymized user id so repeat offenders can be blocked; code of conduct allows temporary/permanent bans — [OFF code of conduct](https://is.pro.openfoodfacts.org/code-of-conduct)
- Internal debate: a forum thread argues "nothing contributed survives without a working moderation system," while others caution that locking products is a big decision — [OFF forum](https://forum.openfoodfacts.org/t/a-working-moderation-system-is-the-priority/599)

**Wikidata**
- Structured data in main/property/lexeme namespaces is CC0; other text CC BY-SA 4.0; no other license is compatible — [Wikidata:Licensing](https://www.wikidata.org/wiki/Wikidata:Licensing); dumps in JSON and RDF (N-Triples, Turtle) — [DCMI Wikidata profile](https://msi.dublincore.org/standards/wikidata)
- Governed by volunteer consensus (property proposal process, requests for permissions); Wikimedia Deutschland led initial development on Wikibase and continues development — [Meta-Wiki WMDE 2015](https://meta.wikimedia.org/wiki/User:Tjane_Hartenstein_(WMDE)/Sandbox2015); a dissenting essay argues CC0 is poor for multi-sourced crowd content — [Meta: On CC0](https://meta.wikipedia.com/wiki/User:Amgine/On_CC0)

**OpenCorporates**
- API keys issued two ways: free "share-alike" keys for Permitted Users who show evidence of use and of contributing data back under an open license, and paid non-share-alike keys — [OpenCorporates terms](https://opencorporates.com/terms-of-use-2/)
- Paid API tiers (GBP, as indexed): Essentials £2,250/yr (500 calls/mo), Starter £6,600/yr, Basic £12,000/yr; Enterprise bulk delivery bespoke — [OpenCorporates pricing](https://opencorporates.com/pricing/)
- ODbL only covers the IP OpenCorporates itself holds, since most data is scraped from registries — [datahub.io summary](https://datahub.io/awesome/opencorporates)

**OpenSanctions**
- OpenSanctions Datenbanken GmbH (Berlin), formally established 2023, no outside investors; received a German BMBF Prototype Fund grant in 2021; revenue from commercial data licenses paid by compliance platforms, fintechs, investigators, governments, research institutions — [OpenSanctions about](https://www.opensanctions.org/docs/about.md)
- Full database CC BY-NC 4.0, bulk download without sign-up or API key; any for-profit use (including compliance screening that earns no revenue) needs a commercial license; exemptions for journalists/activists, discounts for startups — [OpenSanctions commercial FAQ](https://www.opensanctions.org/docs/commercial/faq.md); [exemption page](https://www.opensanctions.org/docs/commercial/exemption/)
- Entities "published with full provenance so that every data point can be traced back to where it came from"; thousands of hand-crafted data patches; updates from major sanctions authorities within hours; pipeline open source; ISO 27001:2022, 99.8% uptime SLA, self-hostable matching API — [OpenSanctions about](https://www.opensanctions.org/docs/about.md)
- Exports: FollowTheMoney JSON, CSV, plain text; outside contributors "improve our crawlers, report data issues, or propose new sources" — [OpenSanctions contributing FAQ](https://www.opensanctions.org/faq/basics/contributing/)
- Sustainability rationale published as an article (2021) — [OpenSanctions sustainability](https://www.opensanctions.org/articles/2021-12-10-sustainability.md)

**Open Library (Internet Archive)**
- Monthly dumps; TSV with columns type/key/revision/last_modified/JSON; separate files for editions (~9.2 GB gz), works (~2.9 GB), authors, ratings, reading log, deletes, redirects, wikidata; dated archives kept (e.g., `ol_dump_authors_2024-07-31.txt.gz`); "an initiative of the Internet Archive, a 501(c)(3) non-profit" — [Open Library dumps](https://openlibrary.org/developers/dumps)
- License is ambiguous across sources: a Creative Commons case study says CC0 — [CC wiki](https://wiki.creativecommons.org/wiki/Case_Studies/Open_Library); Thoth wiki says CC-BY 4.0 — [Thoth wiki](https://github.com/thoth-pub/thoth/wiki/Open-Library); the dumps page itself states no license.

**Our World in Data (Global Change Data Lab)**
- Charts, articles and data are CC BY unless stated; third-party data keeps its own license — [OWID: how to use](https://ourworldindata.org/about/how-to-use-our-world-in-data); most support is unrestricted donations, grants only on topics already covered; >4,000 donors by 2023; board once declined a grant after due diligence — [OWID FAQ](https://ourworldindata.org/faq); [Wikipedia: OWID](https://en.wikipedia.org/wiki/Our_World_in_Data)
- Software license is unsettled across sources (MIT vs a later "custom license" note) — [OWID FAQ](https://ourworldindata.org/faq)

**Common Crawl**
- 501(c)(3); primary funding from the Elbaz Family Foundation; data on AWS under the Open Data Sponsorship Program, accessed via S3 or the index server — [Common Crawl about](https://blog.commoncrawl.org/about); started receiving AI-industry donations in 2023 — [Wikipedia: Common Crawl](https://en.wikipedia.org/wiki/Common_Crawl)

**Billion Prices Project / PriceStats**
- Started at MIT in 2008; by 2010 collecting 5 million prices/day from 300+ retailers in 50 countries; in 2011 founders created PriceStats because grant funding could not sustain the project; micro data available only to researchers working with BPP; public datasets on bpp.mit.edu; replication archive DOI 10.3886/E113968V1 — [NBER w22111](https://www.nber.org/papers/w22111); [openICPSR](https://www.openicpsr.org/openicpsr/project/113968/version/V1/view)

**Open Exchange Rates (commercial reference-rate API)**
- Monthly quotas rather than per-minute caps: Free 1,000 req/mo (USD base only), Developer 10,000/mo, Enterprise 100,000/mo, Unlimited no cap; time-series calls count one request per day returned; `currencies.json`/`usage.json` free — [api-evangelist rate limits](https://raw.githubusercontent.com/api-evangelist/openexchangerates/refs/heads/main/rate-limits/openexchangerates-rate-limits.yml); [OXR plans guide](https://support.openexchangerates.org/article/69-plans-pricing-guide); third-party price listings ($12/$47/$97 per month) conflict — [AllRatesToday](https://allratestoday.com/blog/openexchangerates-pricing-vs-allratestoday/)

**Numbeo (proprietary crowdsourced prices)**
- User inputs plus manually gathered data entered twice a year and weighted 3× user input; >30 automatic/semi-automatic filters; spammer IPs/Tor blocked; data >12 months removed by default (3 months in popular cities; adaptive archiving at >153 contributors/3 months or >123/6 months); up to 18–24 months used for low-contributor items (page is internally inconsistent); filter methods proprietary — [Numbeo methodology](https://www.numbeo.com/common/motivation_and_methodology.jsp)
- Paid "Data Quality Reports" expose standard deviation, contributor counts per item, percentiles, 95% confidence intervals and scatter plots; Data API and bulk CSV are separate subscriptions; no open license — [Numbeo premium](https://www.numbeo.com/premium)

**GasBuddy (proprietary crowdsourced prices)**
- Prices come almost exclusively from user submissions; points-based rewards convertible to raffle entries — [Harvard D^3 case](https://d3.harvard.edu/platform-digit/submission/gasbuddy-a-platform-for-crowdsourced-gas-price-data/); prices must be confirmed by other users before update (secondary source) — [C-Store Australia](https://www.c-store.com.au/?p=36595)

**Open Data Commons licenses**
- PDDL = no conditions (CC0-like); ODC-By = attribution only; ODbL = attribution + share-alike on publicly used adapted databases, commercial use allowed; ODC licenses are drafted around database rights, CC around creative works — [CASRAI guide](https://www.casrai.org/guides/creative-commons-licenses-for-research-data); [FAIR Cookbook](https://faircookbook.elixir-europe.org/content/recipes/reusability/ATI_licensing_data.html); [Open Data Commons licenses](https://opendatacommons.org/licenses/)

### Inferences
- The projects that tax professionals would recognise as "reference-grade" (OSM, Wikidata, OFF, OWID) all pair a *non-commercial legal home* with a *permissive or copyleft open license*; the company-run ones (OpenSanctions, OpenCorporates) stay credible by publishing the pipeline as open source and the data under an open-but-restricted license while selling warranties/SLAs. For DonationValues, the OpenSanctions pattern (open data + open pipeline + optional paid support/SLA for vendors) is the closest fit for a small-LLC sponsor.
- For a valuation dataset meant to be *embedded by tax-software vendors*, share-alike (ODbL) would deter embedding; CC BY 4.0 or ODC-By (attribution-only) matches the OWID precedent and the vendor need. CC0/PDDL maximises reuse but drops the attribution that drives discoverability and credit.
- Nightly full dump + daily delta + checksums (OFF) and dated monthly archives (Open Library) are the two proven release cadences; a tax dataset only needs annual "established values" (ItsDeductible precedent, see KQ6) plus interim snapshots.

### Gaps
- No single page documents Open Library's current data license; needs direct inquiry.
- OpenCorporates' current pricing and whether paid tiers waive share-alike could not be confirmed from a current page.
- Numbeo's API pricing and GasBuddy's data-licensing terms were not found.
- PriceStats' current public-data status is unknown (bpp.mit.edu not fetched).

---

## Key Question 2 — Website patterns for reference-value lookup sites and what makes a per-item page credible (ranges vs point estimates)

### Takeaway
Credible value pages show how the number was made (data source, sample size, date window, method/version) and give an explicit range while still offering a usable headline figure; the IRS's own guidance for used goods is "what buyers actually pay in thrift/consignment shops," with no fixed formula, which maps directly onto a sample-based page with visible evidence. Lay users read ranges inconsistently, so range displays need labelling of what the interval means.

### Cited Findings
- IRS Pub 561 (rev. December 2025): used clothing "usually worth far less than the price you paid"; valuation "does not lend itself to fixed formulas or methods"; "the price that buyers of used items actually pay in used clothing stores, such as consignment or thrift shops, is an indication of the value"; items must be in "good used condition or better" (exception: single item >$500 with qualified appraisal); Pub 561 names *no* third-party guide for clothing/household goods — [IRS Pub 561](https://www.irs.gov/publications/p561)
- Pub 561 for vehicles: FMV is "an amount not in excess of the price listed in a used vehicle pricing guide for a private party sale"; "certain commercial firms and trade organizations publish monthly or seasonal guides"; these guides "are not 'official'" and are not an appraisal of the specific property; private-party price (not dealer retail) applies — [IRS Pub 561](https://www.irs.gov/publications/p561)
- Pub 561 valuation-credibility elements (for appraisals): description, physical condition, effective valuation date, method (sales comparison/cost/income), specific comparable-sales basis, appraiser qualifications; penalty thresholds: 20% if claimed value ≥150% of correct and underpayment >$5,000; 40% if ≥200% — [IRS Pub 561](https://www.irs.gov/publications/p561)
- Pub 526 states "the use of such formulas is not acceptable" for percentage-of-cost methods (as quoted by AICPA's Tax Adviser) — [The Tax Adviser, 2016](https://www.thetaxadviser.com/issues/2016/jul/valuing-and-substantiating-charitable-contributions.html)
- ItsDeductible (Intuit) methodology, per its help page as quoted in search: values produced "by blending data gathered from various thrift and consignment stores," collected through the year with year-end "established values" feeding TurboTax; High/Medium/Low tiers, Medium and High treated as comparable to IRS "good used condition or better" — [ItsDeductible help (search snippet; page now 404)](https://itsdeductibleonline.intuit.com/help/addoreditothertrackerhuid.html); a 2006 FAQ quote said pricing came from resale outlets plus daily eBay closed-auction feeds under a licensing program — [rklau.com 2006](https://tins.rklau.com/2006/02/i-want-my-money-back/)
- TaxAct Donation Assistant "uses an IRS-compliant method" and lets users "Enter myself"; the current page does not name the data source — [TaxAct support 45424](https://support.taxact.com/support/45424/); an earlier search snippet attributed TaxAct's values to "CUCV, Inc (Certified Used Clothing Values)… annual surveys of consignment and thrift stores" (not on the live page; treat as historical)
- Consumer Reports' test found TaxAct gave the most generous valuations for 10 of 18 items and that ItsDeductible was the only free online tool at the time — [Consumer Reports](https://www.consumerreports.org/taxes/tax-deduction-on-donations/)
- Goodwill Industries publishes low/high price ranges for items commonly sold in its stores, labelled "estimated values"; Salvation Army's guide lives at satruck.org; the SEO ecosystem around "donation value guide" is dominated by scraped/duplicate pages — [H&R Block tax center](https://www.hrblock.com/tax-center/filing/adjustments-and-deductions/goodwill-donation-values/)
- Zillow frames its "estimated range" as capturing uncertainty ("the span of prices the home could reasonably sell for given the information available"), with the Zestimate as the headline median; its median error is under 6% but off by >20% in ~15% of sales — [Zillow blog](https://www.zillow.com/blog/zestimate-updates-230614/); [court opinion citing Zillow's statements](https://cite.case.law/f3d/915/446/)
- Numbeo's paid quality reports expose per-item contributor count, standard deviation, percentiles and 95% CIs — [Numbeo premium](https://www.numbeo.com/premium)
- OpenSanctions entity pages promise traceability of "every data point… back to where it came from" — [OpenSanctions about](https://www.opensanctions.org/docs/about.md)
- Lay interpretation of ranges varies: Dieckmann, Peters & Gregory (2015) found people perceive the distribution underlying numerical ranges in varied ways and that display features shape that perception — [Risk Analysis 35(7)](https://ideas.repec.org/a/wly/riskan/v35y2015i7p1281-1295.html); a follow-up (2017, "Seeing What You Want to See") shows imprecise ranges enable motivated reasoning — [scinapse](https://scinapse.io/papers/2130869123)
- Padilla, Powell, Kay & Hullman (2021) show qualitative confidence statements alter decisions made with quantile-dotplot uncertainty visualizations; uncertainty is hard for both lay audiences and experts — [Frontiers in Computer Science](https://www.frontiersin.org/journals/computer-science/articles/10.3389/fcomp.2020.590232/pdf)
- A 2022 arXiv paper on prediction vs confidence intervals notes lay readers tend to misread intervals as simple ranges — [arXiv 2208.04440](https://arxiv.org/pdf/2208.04440)
- Cloud/data discoverability: only ~11% of datasets in Google Dataset Search have DOIs and only 34% specify a license; machine-readable license metadata recommended — [Google Dataset Search by the Numbers](https://arxiv.org/pdf/2006.06894)

### Inferences
- A per-item page that mirrors Pub 561's own credibility elements for appraisals (condition tiers, valuation date, sales-comparison method, comparable observations, who produced it) will read as "IRS-shaped" to CPAs/EAs. Concretely: item name + category; condition tiers labelled with the IRS phrase "good used condition or better"; headline median plus an explicit interquartile/low–high range; n observations; observation date window; geographic coverage; methodology version; link to raw observations with source/retailer/photo evidence; changelog of value revisions.
- Because Pub 561 cites "used vehicle pricing guides" as acceptable *non-official* references, the realistic target for DonationValues is the same status: a widely used, non-official guide that Pub 561/526 could one day reference generically ("guides published by commercial firms and trade organizations") — not an IRS endorsement.
- Given Dieckmann's findings that wide ranges invite motivated reasoning (donors picking the top), the page should default to a conservative headline (e.g., median or "good" condition value) and show the range with an explanation of what it is (e.g., "middle 50% of observed thrift prices"), rather than Goodwill-style bare low/high bands.
- ItsDeductible's "established values at year end" plus High/Medium/Low tiers is the UX tax filers already know; replicating those semantics lowers switching cost after its Oct 2025 shutdown (see KQ6).

### Gaps
- No controlled study was found that directly compares ranges vs point estimates for *consumer tax-valuation* decisions; the evidence is from risk/forecast communication.
- The verbatim Pub 526 "formulas not acceptable" sentence could not be pulled from the live Pub 526 page (truncated fetch); it is cited via the AICPA Tax Adviser.
- Numbeo's actual public page UI for ranges was not inspected.

---

## Key Question 3 — Technical architecture for a static-first lookup site (10k–100k items) and dataset publishing channels

### Takeaway
For 10k–100k items, a static site (Astro/Hugo/Eleventy) with one pre-rendered page per item, Pagefind for search, Cloudflare Pages/Workers Static Assets for hosting (static requests free and unlimited) and a small Worker or pre-built JSON files for the API is effectively free at this scale; SQLite-over-HTTP (sql.js-httpvfs) is a proven option for ad-hoc querying of larger files, and Datasette Lite is a zero-infra explorer for published CSV/SQLite/Parquet. Publish releases to Zenodo (versioned DOIs via GitHub releases) and mirror to Hugging Face for discoverability.

### Cited Findings
- Pagefind: fully static, indexes after build into chunked static bundle; a 10,000-page site searchable with <300 kB total payload (typically ~100 kB); works with any SSG; drop-in web components (v1.5.0 Component UI); multilingual; filters/faceting, custom metadata and sorting; Node/Python indexing libraries can index JSON/PDF records, not just HTML pages; runs post-build so not in dev server — [pagefind.app](https://pagefind.app/); [flaviocopes.com](https://flaviocopes.com/static-site-search-pagefind.md)
- FlexSearch: client-side full-text library focused on speed/memory; documentation gaps noted; MiniSearch good for exact/prefix matches; none of the surveyed sources compared all three head-to-head — [wmtips comparison](https://www.wmtips.com/technologies/compare/flexsearch-vs-pagefind/); [StaticForge notes](https://calevans.com/staticforge/features/search.html)
- sql.js-httpvfs: SQLite compiled to WASM with a virtual filesystem fetching pages via HTTP Range requests; demo of a 670 MiB / 8M-row database where a row lookup fetched ~1 kB, a complex query 130–270 KiB in 10–20 GETs, FTS ~70 KiB; author set page size to 1 KiB; indexes must match query patterns; read-only; requires Range support; whole-file download impractical beyond ~10 MB — [phiresky blog](https://phiresky.github.io/blog/2021/hosting-sqlite-databases-on-github-pages/)
- Datasette Lite: full Datasette in-browser via Pyodide/WASM; loads SQLite/CSV/JSON/Parquet from `?url=`, `?csv=`, `?json=`, `?parquet=`; downloads whole files (no range support, per open issue); files need `access-control-allow-origin: *` (GitHub Pages/Gists provide this); hosted on GitHub Pages — [simonw/datasette-lite](https://github.com/simonw/datasette-lite); [datasette-lite issue #28](https://github.com/simonw/datasette-lite/issues/28)
- Cloudflare Workers Free: 100,000 requests/day, 10 ms CPU per request, 20,000 static-asset files per Worker version, 25 MiB per file; Paid: unlimited requests, 100,000 static files — [Cloudflare Workers limits](https://developers.cloudflare.com/workers/platform/limits/); Pages: "requests to static assets are free and unlimited" on free and paid plans; only Function invocations count — [Cloudflare Pages Functions pricing](https://developers.cloudflare.com/pages/functions/pricing); D1 free-plan queries will hard-fail over daily row limits from 2026-09-01 — [Cloudflare changelog](https://developers.cloudflare.com/changelog/post/2025-10-28-raising-limits/)
- Git scraping (Simon Willison): scheduled GitHub Actions workflow fetches a resource, pretty-prints with `jq`, commits only if changed, so commit history becomes a change log; `git-history` tool turns that history into SQLite; `simonw/git-scraper-template` exists — [simonwillison.net 2020](https://simonwillison.net/2020/Oct/9/git-scraping/); [git-history weeknotes](https://simonwillison.net/2021/Nov/15/weeknotes-git-history/)
- Zenodo: each new version is "a completely new record with separate metadata, files and persistent identifier," linked to all previous and future versions; "Import files" avoids duplicating storage — [Zenodo docs](https://help.zenodo.org/docs/deposit/manage-versions/); version DOIs plus a concept DOI covering all versions — [OpenAIRE](https://www.openaire.eu/community/blogs/blogger/lnielsen); [HKUST Library](https://library.hkust.edu.hk/sc/?p=2780); version DOI is issued only after archiving so CITATION.cff cannot contain it in advance — [arXiv software-citation primer](https://arxiv.org/pdf/2609.28622)
- Hugging Face Hub: "Generate DOI" in dataset settings (via DataCite); new versions get a new DOI and the old one is "outdated"; DOI-locked repos cannot be deleted/renamed without support — [HF docs: DOI](https://huggingface.co/docs/hub/doi); a user report says two HF DOIs both resolved to the current dataset state, not the minted commit — [HF forum](https://discuss.huggingface.co/t/doi-metadata-and-findability/170350)
- Open Food Facts already distributes a simplified Parquet on Hugging Face alongside its own dumps — [OFF data page](https://world.openfoodfacts.org/data)
- Google Dataset Search ingests schema.org metadata on crawlable pages; popular portals (Figshare, Zenodo, Dryad, Kaggle) recommended for persistence — [Google Research blog](https://research.google/blog/an-analysis-of-online-datasets-using-dataset-search-published-in-part-as-a-dataset/)
- Frictionless Repository GitHub Action (`frictionlessdata/repository@v2`) validates data on every push/tag/PR, reports as commit statuses with linked validation reports — [Frictionless Repository docs](https://repository.frictionlessdata.io/docs/getting-started); example: datasets/publicbodies runs it on PRs to `main` with a `data-validation.yaml` inquiry — [publicbodies workflow](https://github.com/datasets/publicbodies/actions/runs/5172776510/workflow); the 2016 precursor used GoodTables + Travis to fail the build on bad data — [OKFN Labs 2016](https://okfnlabs.org/blog/2016/05/17/automated-data-validation.html); mySociety case study — [Frictionless blog 2022](https://frictionlessdata.io/blog/2022/09/20/mysociety-workflow/)

### Inferences
- Recommended stack for DonationValues at 10k–100k items: canonical data in a Git repo (CSV/JSON per category + JSON Schema/Frictionless Table Schema); build step emits (1) one HTML page per item (Astro or Eleventy), (2) static JSON files `/api/v1/items/{slug}.json` and `/api/v1/index.json` served as static assets (free, cacheable, no Worker needed), (3) a Pagefind index, (4) release artifacts (CSV, JSONL, Parquet, SQLite). A Cloudflare Worker is only needed if you want query parameters (fuzzy search, filters) server-side; at 100k requests/day free that still costs nothing initially.
- 100k items × one HTML page is within Cloudflare's 100,000 static-file cap only on the paid plan (free = 20,000 files); either stay under 20k pages (category + item pages) or use the paid Workers plan (~$5/mo) or GitHub Pages/Firebase Hosting for the page tree.
- Ship the SQLite file with a 1 KiB page size and query-matched indexes so sql.js-httpvfs and Datasette Lite both work against the same artifact on the same static host (Range + CORS headers).
- Mint Zenodo DOIs per annual release through the GitHub-release integration and keep a concept DOI in CITATION.cff; mirror Parquet to Hugging Face for ML/LLM discoverability but treat HF DOIs as non-version-stable.

### Gaps
- Kaggle's and data.world's DOI/citation/licensing behaviour was not found in search results.
- Firebase Hosting and GitHub Pages limits were not fetched (GitHub Pages' documented 1 GB site / 100 GB-month bandwidth soft limits were not verified in this pass).
- No benchmark comparing Pagefind, MiniSearch and FlexSearch on structured record search (as opposed to page search).

---

## Key Question 4 — Contribution tooling: data PRs with schema validation, web/mobile forms that open PRs, photo evidence, moderation, recognition

### Takeaway
The proven pattern is "Git is the database": contributions become pull requests validated by CI (Frictionless/JSON Schema), with a web form or CMS "open authoring" layer that opens PRs on behalf of non-technical contributors; Open Food Facts shows how photo evidence, automated logic checks and anonymised contributor identifiers support moderation at scale, and GasBuddy/OFF show lightweight recognition incentives.

### Cited Findings
- Decap CMS "Open Authoring": accepts contributions from GitHub users without repo access; "each submission triggers a pull request to your repository, which you can merge using the GitHub UI"; enabled by `open_authoring: true` on the GitHub backend; not supported with Git Gateway — [Decap docs](https://decapcms.org/docs/open-authoring/)
- Sveltia CMS (Netlify CMS successor) had not implemented open authoring at the time of the linked discussion — [Sveltia discussion #789](https://github.com/sveltia/sveltia-cms/discussions/789)
- Custom form → bot PR: hackerinnen-form validates server-side and "submits a pull request on behalf of the user" via a bot account/token — [hackerinnen/hackerinnen-form](https://www.github.com/hackerinnen/hackerinnen-form); no-code variant via Pipedream (form submission → GitHub create-PR) — [Pipedream](https://pipedream.com/integrations/create-pull-request-with-github-api-on-new-form-submission-from-formcarry-api-int_Ads2Bo9a); GitHub pre-filled PR URLs work but require a GitHub account — [CSS-Tricks](https://css-tricks.com/?p=356491)
- CI validation: Frictionless Repository action on PRs with commit-status reporting — [Frictionless docs](https://repository.frictionlessdata.io/docs/getting-started); [publicbodies example](https://github.com/datasets/publicbodies/actions/runs/5172776510/workflow)
- Open Food Facts contributor paths: scan/add products via app, improve data on web, API submissions including photos; apps must send user edits back via API — [OFF blog](https://blog.openfoodfacts.org/?p=6910); [OFF data page](https://world.openfoodfacts.org/data)
- OFF moderation: community review + ~50 automated logic checks + ML extraction from photos + producer uploads; per-contribution app version and anonymised user id enable blocking repeat offenders; code of conduct with temporary/permanent bans — [OFF support](https://support.openfoodfacts.org/help/en-gb/21-gestire-i-miei-prodotti/2-come-possiamo-essere-sicuri-che-i-prodotti-presentati-su-open-food-facts-presentino-dati-originali-e-corretti); [OFF code of conduct](https://is.pro.openfoodfacts.org/code-of-conduct)
- OpenSanctions accepts crawler improvements, issue reports and new-source proposals, and maintains "thousands of hand-crafted data patches" — [OpenSanctions contributing](https://www.opensanctions.org/faq/basics/contributing/); [about](https://www.opensanctions.org/docs/about.md)
- Numbeo filters: >30 filters, spam IP/Tor blocking, manual data weighted 3×, adaptive archiving thresholds (153 contributors/3 mo; 123/6 mo) — [Numbeo methodology](https://www.numbeo.com/common/motivation_and_methodology.jsp)
- GasBuddy recognition: points convertible to raffle tickets; crowd confirmation before price updates — [Harvard D^3](https://d3.harvard.edu/platform-digit/submission/gasbuddy-a-platform-for-crowdsourced-gas-price-data/); [C-Store](https://www.c-store.com.au/?p=36595)
- Git scraping produces an auditable change history in commits; `git-history` converts it to SQLite for analysis — [simonwillison.net](https://simonwillison.net/2020/Oct/9/git-scraping/)
- OSM board-level answer to corporate influence: tiered corporate membership with published recognition levels rather than data control — [OSM funding.json](https://www.openstreetmap.org/funding.json)

### Inferences
- Minimum viable contribution pipeline for DonationValues: (1) `observations/` directory of CSV/JSON rows (item, condition, price, store type, city/state, date, evidence URL, contributor id); (2) JSON Schema + Frictionless validation in CI; (3) a web form (DeductIt app can be one client) that posts to a small Worker which uploads the photo to object storage and opens a PR via a bot account, so contributors never need GitHub; (4) a review queue = open PRs with a label, reviewed by maintainers/advisors; (5) a nightly rebuild that recomputes aggregates and regenerates pages/API/dumps; (6) contributor credit on item pages and a leaderboard (OFF-style), with anonymised ids.
- Photo-of-price-tag evidence maps to OFF's photo → ML extraction pattern; even without ML, requiring a photo per observation gives reviewers something to check and gives item pages visible provenance (KQ2).
- Automated logic checks to copy from OFF/Numbeo: price outliers vs category distribution, duplicate submissions from one id/IP, impossible dates, store-type mismatches; publish the check list so reviewers and auditors can see it.

### Gaps
- No example was found of an open *price* dataset that accepts photo evidence via PR bots; this is a synthesis of OFF (photos) and git-based data (PRs).
- Whether DeductIt's existing receipt/photo pipeline can be reused was not examined (outside this research scope).

---

## Key Question 5 — Governance and trust: advisory boards, methodology RFC/comment periods, changelogs, code of conduct, neutral brand, nonprofit vs fiscal sponsor

### Takeaway
Trusted projects separate the data commons from any sponsor's product (OFF refuses industry money; OSMF "supports but does not control"; OpenSanctions open-sources its pipeline), run versioned, publicly commented methodology (NIST's IPD → FPD → final model with adjudicated comments is the government analogue), and sit in a legal home that can take donations. For a small LLC sponsor, a fiscal sponsor is the practical route, but the obvious hosts are either software-only (OSC, Conservancy), closed (Open Collective Foundation dissolved 2024), or expect $25k+/yr revenue (CS&S).

### Cited Findings
- OSMF: "supports, but does not control" OSM; 7-seat volunteer board, elections by members — [OSM wiki OSMF](https://wiki.openstreetmap.org/wiki/OSMF)
- OFF: refuses funding from food companies/brands; non-profit association with membership; no advertising — [OFF blog](https://blog.openfoodfacts.org/?p=6910); [OFF donors](https://world.openfoodfacts.org/donors)
- OWID board once declined a grant after due diligence; funding mostly unrestricted donations — [Wikipedia OWID](https://en.wikipedia.org/wiki/Our_World_in_Data); [OWID FAQ](https://ourworldindata.org/faq)
- OpenSanctions: pipeline open source; no outside investors; published sustainability rationale — [OpenSanctions about](https://www.opensanctions.org/docs/about.md); [sustainability article](https://www.opensanctions.org/articles/2021-12-10-sustainability.md)
- Wikidata: community consensus processes (property proposals, requests for permissions) — [Meta-Wiki](https://meta.wikimedia.org/wiki/User:Tjane_Hartenstein_(WMDE)/Sandbox2015)
- ODI guidance on governance for open-data organisations exists as a peer-learning resource — [ODI](https://theodi.org/news-and-events/blog/what-does-effective-organisational-governance-look-like-for-open-data-organisations/)
- NIST comment model: initial public draft → final public draft → final, with comments "adjudicated"; SP 800-171 Rev. 3 refined after 1,600+ comments; drafts receive DOIs; comment periods often extended — [NIST SP 800-171 r3 FPD](https://csrc.nist.gov/pubs/sp/800/171/r3/fpd); [NIST SP 800-53 comments FAQ](https://csrc.nist.gov/Projects/risk-management/sp800-53-controls/public-comments-home/FAQ); [NIST multiple versions guidance](https://www.nist.gov/document/publishing-multiple-versions-nist-technical-series-publications)
- Open Collective Foundation (the US 501(c)(3) host) announced on 2024-02-28 it would close effective 2024-12-31; Open Collective Inc. (platform) continues; alternatives named: Open Collective Europe, Open Source Collective (open-source software only), Software in the Public Interest, New Stories, MAGIC Grants — [Social Change Nest](https://thesocialchangenest.org/the-social-change-nest-response-to-the-dissolution-of-open-collective-foundation); [RWF2 update](https://opencollective.com/rwf2/updates/fiscal-host-transition)
- Open Collective fees vary by host: OC Europe lists 8% admin fee + card fees; the platform is free for collectives when the host charges no fee; one comparison cites 10% of incoming funds plus processor fees — [OC Europe FAQ](https://docs.opencollective.com/oceurope/faq/general-faqs); [codenote comparison](https://www.codenote.net/en/posts/github-sponsors-vs-open-collective-fees-comparison/)
- Software Freedom Conservancy: projects must be devoted to FOSS development/documentation under OSI/DFSG licenses (docs may be CC-BY-SA/CC-BY/CC0); projects under a year old generally ineligible; fee 10% of revenue processed; documents the project's existing leadership structure in the agreement; data-only projects not addressed — [SFC apply](https://sfconservancy.org/projects/apply/)
- Code for Science & Society: fiscal sponsorship for "mission-aligned projects in research, data, and technology"; directory lists 15% admin charge on non-governmental funds, 20% governmental (may be dated); projects expected to generate ≥$25,000/yr (OpenRefine, March 2026); 15 sponsored projects in 2023 with budgets $100k–$1M+ — [CS&S FSP](https://codeforsociety.org/fsp); [Fiscal Sponsor Directory](https://fiscalsponsordirectory.org/code-for-science-and-society/); [OpenRefine advisory committee 2026-03-12](https://forum.openrefine.org/t/march-12-2026-advisory-committee/2751); [CS&S 2023 annual report](https://files.codeforsociety.org/production/resources/CSS-Annual-Report-2023.pdf)
- OFF code of conduct with graduated enforcement — [OFF code of conduct](https://is.pro.openfoodfacts.org/code-of-conduct)
- IRS Tax Forum exhibitor brochure states the IRS does not endorse any company or product — [irstaxforum.com exhibitor document](https://www.irstaxforum.com/document/16/open)

### Inferences
- A workable governance stack for a Foothill-sponsored commons: (1) separate brand/domain and a public GOVERNANCE.md stating Foothill AI's role as sponsor/maintainer with no veto over methodology; (2) an advisory council of 3–5 tax practitioners (EA/CPA) plus one data/statistics reviewer, recruited via NATP/NAEA chapter contacts and the IRS Tax Forum circuit (KQ6), with published names and conflict-of-interest statements; (3) methodology published as versioned documents (e.g., `METHODOLOGY-2026.1`) with a 30-day public comment window in GitHub Discussions and an adjudication table (NIST pattern), then a tagged release and Zenodo DOI; (4) CHANGELOG per data release with per-item value diffs (git-history pattern); (5) Contributor Covenant-style code of conduct.
- Legal home: because SFC/OSC are software-focused and CS&S expects $25k+/yr, the near-term path is to run as an LLC-sponsored open project with a clearly separate brand and a published commitment (license irrevocability, trademark/domain held in a way that allows transfer), then approach CS&S or Software in the Public Interest once there is real external funding or vendor revenue. Forming a standalone 501(c)(3) is premature until there is a board of independent practitioners.
- Refusing money from any single tax-software vendor (OFF's "no industry money" rule, adapted) would be a cheap, visible neutrality signal; vendor support can instead be structured as OSM-style tiered corporate membership with published tiers.

### Gaps
- Current Open Source Collective fee and whether it hosts open *data* projects could not be confirmed from the fetched page.
- CS&S's current official fee schedule was not found on its own site.
- No documented example of how OFF/OSM/OpenSanctions recruit *domain* advisory boards was found; the inference above is a synthesis.

---

## Key Question 6 — Adoption pathways: how tax software and tax-pro software value noncash donations today, which professional bodies and IRS channels to approach, and precedent for private guides in IRS publications

### Takeaway
The market has an open gap: Intuit shut ItsDeductible on 2025-10-21 and TurboTax users report no in-product valuation tool; FreeTaxUSA has none and points to Goodwill/Salvation Army; TaxAct and H&R Block still ship proprietary tools; professional suites (Drake, ProSeries, Lacerte, UltraTax) only generate Form 8283 from preparer-entered values and offer no valuation database at all. IRS publications already cite non-official "used vehicle pricing guides" as acceptable FMV references, which is the realistic precedent for a widely used clothing/household guide; the IRS channels are Stakeholder Liaison, the Nationwide Tax Forums, TAP and IRSAC, none of which endorse products.

### Cited Findings

**DIY tax software**
- Intuit discontinued ItsDeductible on 2025-10-21 mid-tax-year (website, app and login all stopped); Intuit had tried to end it on 2022-10-17 and reversed after complaints — [Deductible Duck (competitor; marketing source)](https://deductibleduck.com/what-happened-to-itsdeductible/); TurboTax community users confirm the valuation tool is absent from TurboTax 2025 Home & Business and listed as "coming soon," and request reconsideration — [TurboTax community: valuation tool gone](https://ttlc.intuit.com/community/deductions-credits-9/valuation-tool-for-charitable-contributions-is-gone-805578); [reconsideration thread](https://ttlc.intuit.com/community/get-your-taxes-done-using-turbotax-6/request-to-reconsider-discontinuation-of-itsdeductible-117547)
- A forum post notes TurboTax does not allow third-party apps to embed or inject data into a return, so outside valuations must be entered manually — [early-retirement.org thread](https://www.early-retirement.org/goto/post?id=3320272); SpireTech published a free spreadsheet based on the Salvation Army guide as a replacement — [SpireTech 2026](https://www.spiretech.com/blog/2026/03/itsdeductible-replacement/)
- ItsDeductible methodology: thrift/consignment data blended, year-end "established values," High/Medium/Low tiers — [ItsDeductible help (snippet; page now 404)](https://itsdeductibleonline.intuit.com/help/addoreditothertrackerhuid.html)
- H&R Block DeductionPro provides FMVs for household items and helps complete forms for noncash deductions >$500 (bundled with Deluxe/Premium per older Consumer Reports) — [H&R Block support: DeductionPro](https://www.hrblock.com/tax-center/support/online/while-filing-online-return/using-deductionpro/); [H&R Block press release](https://investors.hrblock.com/node/11741)
- TaxAct Donation Assistant: "IRS-compliant method," manual "Enter myself" option — [TaxAct support](https://support.taxact.com/support/45424/); historical attribution to CUCV Inc. surveys of consignment/thrift stores (search snippet, not on live page)
- FreeTaxUSA: staff reply says the service does not provide a valuation tool and points users to Goodwill/Salvation Army guides — [FreeTaxUSA community](https://community.freetaxusa.com/discussion/comment/5894); FreeTaxUSA help page on valuing clothing exists — [FreeTaxUSA answer 57](https://www.freetaxusa.com/answer/57/How-do-I-value-my-clothing-donations/)
- TaxSlayer's "Deduction Finder" was mentioned in an older Consumer Reports piece; current status unconfirmed — [Consumer Reports](https://www.consumerreports.org/taxes/tax-deduction-on-donations/)
- Consumer Reports' valuation comparison (undated, pre-shutdown) found TaxAct most generous on 10/18 items — [Consumer Reports](https://www.consumerreports.org/taxes/tax-deduction-on-donations/)

**Professional tax software**
- Drake Tax: noncash contributions keyed on the 8283 screen (may also flow from A/K1P/K1S screens); no valuation database described — [Drake KB 12813](https://kb.drakesoftware.com/KB/Drake-Tax/12813.htm)
- ProSeries: Noncash Contributions Smart Worksheet above Schedule A line 12; auto-generates Form 8283 per transaction; preparer enters values — [Intuit ProSeries help](https://accountants.intuit.com/support/en-us/help-article/federal-taxes/generating-form-8283-proseries/L4O9xzYYt_US_en_US)
- UltraTax CS: Screens 8283P1 (<$5,000; defaults to 50% property) and 8283P2 (>$5,000; one Form 8283 page 2 per screen) — [Thomson Reuters 8283P1](https://www.thomsonreuters.com/en-us/help/ultratax-cs/1040/screens/ius41); [8283P2](https://www.thomsonreuters.com/en-us/help/ultratax-cs/1040/screens/ius40)
- Lacerte: an Intuit article "Generating Form 8283 Noncash Contributions in Lacerte" exists; contents not reviewed.

**Law/regulation context affecting demand**
- From 2026 (OBBBA), non-itemizers may deduct up to $1,000 ($2,000 MFJ) of *cash* gifts above the line; noncash property does not count; itemizers face a 0.5%-of-AGI floor; amounts not indexed — [Taft Law](https://www.taftlaw.com/news-events/law-bulletins/charitable-giving-after-the-obbba-the-2026-outlook/); [Bank of Oklahoma](https://www.bankofoklahoma.com/insights/articles/obbba-tax-reform-reshapes-charitable-giving); NATP's 2026 "You Make the Call" confirms a $250 used-clothing donation does not qualify for §170(p) — [NATP](https://www.natptax.com/news-insights/blog/you-make-the-call-sept-24-2026/)
- 2018 final regulations: no deduction for clothing/household items unless in good used condition or better — [Federal Register 2018-15734](https://www.govinfo.gov/content/pkg/FR-2018-07-30/pdf/2018-15734.pdf)
- Form 8283 required for noncash >$500; qualified appraisal generally >$5,000 — [Blue J summary](https://www.bluej.com/answer/how-should-non-cash-charitable-contributions-be-valued-for-tax-deduction-purposes); Pub 561 penalty thresholds 150%/200% — [IRS Pub 561](https://www.irs.gov/publications/p561)

**Precedent for non-official guides in IRS publications**
- Pub 561 (Dec 2025) accepts "a used vehicle pricing guide" for private-party sale value and notes commercial firms and trade organizations "publish monthly or seasonal guides," which "are not 'official'"; for clothing/household goods it cites only thrift/consignment prices and names no guide — [IRS Pub 561](https://www.irs.gov/publications/p561); Pub 526 (2025) uses "a used car guide shows the FMV" in its worked example — [IRS Pub 526](https://www.irs.gov/publications/p526)

**Professional bodies**
- AICPA Tax Adviser (2016) summarises valuation rules (thrift prices; formulas not acceptable per Pub 526) — [The Tax Adviser](https://www.thetaxadviser.com/issues/2016/jul/valuing-and-substantiating-charitable-contributions.html); CGMA competency resource mirrors it — [CGMA](https://competency.cgma.org/media_resources/209855-valuing-and-substantiating-charitable-contributions)
- NATP publishes practitioner scenario content on noncash gifts (2026) — [NATP blog](https://www.natptax.com/news-insights/blog/you-make-the-call-sept-24-2026/)
- No NAEA, NSA or Latino Tax Pros guidance on clothing valuation surfaced in search.

**IRS channels**
- Stakeholder Liaison: builds relationships with practitioner and industry organizations, explains IRS procedures, elevates issues through the Issue Management Resolution System (IMRS); reach via your professional organization or regional contacts (cl.sl.area.2@irs.gov … area.6, 202-317-4015); not for tax-law questions — [IRS Stakeholder Liaison local contacts](https://www.irs.gov/businesses/small-businesses-self-employed/stakeholder-liaison-local-contacts)
- IRS Nationwide Tax Forums 2026: ~13,000 attendees across Chicago, New Orleans, New York, Orlando, San Diego; Expo Hall with IRS engagement tables and a Stakeholder Liaison table; exhibitor directory and info@irstaxforum.com; exhibitor brochure states the IRS does not endorse any company or product — [IRS newsroom wrap-up](https://www.irs.gov/newsroom/irs-wraps-up-successful-nationwide-tax-forums-with-nearly-13000-attendees); [irstaxforum.com](https://www.irstaxforum.com/); [exhibitor brochure](https://www.irstaxforum.com/document/16/open); [CPA Practice Advisor](https://www.cpapracticeadvisor.com/2026/09/23/irs-nationwide-tax-forums-wrap-up-for-2026-serving-13000-attendees/190373/)
- IRSAC: FACA advisory council; applicants submit Form 12339, resume, 1–2 page statement; tax-compliance and FBI checks; three-year unpaid terms; 2027-term applications closed 2026-06-05; contact publicliaison@irs.gov — [IRS newsroom IRSAC 2027](https://www.irs.gov/newsroom/irs-requests-applications-for-2027-irsac-membership)
- Taxpayer Advocacy Panel: ~75 volunteers from all states, DC and PR; 200–300 hours/yr; recruiting as of 2026-02-18; lobbyists and current Treasury/IRS staff ineligible; tap.recruitment@irs.gov / 888-912-1227 (historical) — [Taxpayer Advocate TAP page](https://www.taxpayeradvocate.irs.gov/?p=10228); [Federal Register 2024 notice](https://frtracker.app/fr/2024-25245)

### Inferences
- Vendor embedding: the realistic first integrations are vendors with *no* tool (FreeTaxUSA, Cash App Taxes, TaxSlayer if its finder is gone) and the pro-suite ecosystem (Drake/ProSeries/UltraTax) where values are typed in; an attribution-only license, a stable item-ID scheme, an annual frozen "established values" release and a signed/hashed CSV are what a vendor's compliance team would need. TurboTax integration is not possible via third-party injection, so the DIY path is a copy/paste-friendly "worksheet export" plus a Form 8283-shaped PDF.
- The IRS will not endorse a guide; the achievable goal is (a) being the guide practitioners cite in workpapers, (b) having Stakeholder Liaison aware of it as an industry resource, and (c) eventually being referenced generically in Pub 561 the way vehicle guides are. Submitting a dated comment on Pub 561 (via Stakeholder Liaison/IMRS or publicliaison@irs.gov) asking that clothing/household valuation reference "published guides based on surveyed thrift prices" is the specific ask.
- Timing: the loss of ItsDeductible (Oct 2025) plus the cash-only §170(p) deduction means noncash valuation now matters only to itemizers above the 0.5% floor — a smaller but more professional-advised population, which favours a CPA/EA-facing credibility strategy over a mass-consumer one.
- Professional-body entry points: NATP (practitioner blog/webinars), AICPA Tax Section (Tax Adviser articles), NAEA chapters and state societies; offer a free, citable methodology white paper and a one-page "how to document a noncash donation with DonationValues" for inclusion in CE material.

### Gaps
- Current state of TaxSlayer and Cash App Taxes valuation features not found.
- No evidence was found on how vendors license third-party valuation data (e.g., whether TaxAct still licenses CUCV); vendor contacts needed.
- No example found of a private open dataset ever being named in an IRS publication; the vehicle-guide language is generic.
- IRS Tax Forum exhibitor pricing for 2027 was not published on the fetched pages.

---

## Key Question 7 — Domain and branding: what exists at donationvalues.org and name collisions

### Takeaway
donationvalues.org was registered on 2026-10-22 through Cloudflare Registrar and currently has Cloudflare nameservers but no A record or website; the search ecosystem around "donation value guide" is crowded with Goodwill/Salvation Army guides and SEO spam, so the brand needs a distinct, methodology-led positioning rather than "yet another value guide."

### Cited Findings
- Live WHOIS/DNS check (2026-11-02): `donationvalues.org` Creation Date 2026-10-22T20:10:39Z, Registrar Cloudflare, Inc., expiry 2027-10-22, status clientTransferProhibited; NS otto/zoe.ns.cloudflare.com; no A record returned; HTTPS request returned nothing — local `whois`/`dig`/`curl` run in this session (not a web source)
- Web search for "donationvalues.org" returns no results from the domain itself, only generic valuation pages and duplicated "Donation Value Guide And Calculator" PDFs on unrelated hosts — [search result summary; e.g., H&R Block page](https://www.hrblock.com/tax-center/filing/adjustments-and-deductions/goodwill-donation-values/)
- Goodwill Industries International publishes a valuation guide of price ranges; Salvation Army's guide is referenced at satruck.org; many "Salvation Army donation value calculator" pages are SEO scrapes — [H&R Block](https://www.hrblock.com/tax-center/filing/adjustments-and-deductions/goodwill-donation-values/)
- Competitors positioning as ItsDeductible replacements: Deductible Duck (paid/free tracker, marketing content) — [deductibleduck.com](https://deductibleduck.com/what-happened-to-itsdeductible/); SpireTech free spreadsheet — [SpireTech](https://www.spiretech.com/blog/2026/03/itsdeductible-replacement/)
- Local DNS/WHOIS checks for `donationvalueguide.com`, `donationvalueguide.org`, `donationvalues.com`, `donationvalue.org` returned no A record and no creation date in this session (whois lookup returned empty; treat as inconclusive, not as "available").

### Inferences
- The registration date (10 days before this snapshot) and Cloudflare registrar suggest the domain was recently registered by the sponsor; nothing is published yet, so there is no legacy content to reconcile.
- Avoid "guide"/"calculator" in the brand; lead with "open dataset" and "methodology," publish the sponsor relationship in the footer and governance page, and keep DeductIt branding off the data site to preserve neutrality (KQ5).

### Gaps
- Trademark search (USPTO) for "Donation Values" / "DonationValues" was not performed.
- The whois lookups for the similar domains returned empty from this host; availability must be re-checked with an RDAP-capable tool.
