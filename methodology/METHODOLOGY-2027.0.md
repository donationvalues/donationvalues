# METHODOLOGY-2027.0 (draft)

Status: draft for public comment. Not yet approved for building an edition. Every numeric threshold below is the project's own judgment call unless a citation says otherwise; the founding research report in `docs/design/` gives the reasoning and sources.

## 1. What is being estimated

The typical price a buyer actually pays for a used item of a given specification in a US thrift or consignment store. This is the market IRS Publication 561 names for used clothing and household items and the market the donee itself sells into. The estimate is not an appraisal of any specific item, and the donor remains responsible for determining fair market value.

Percentage-of-replacement-cost formulas are not used anywhere in this methodology, because Publication 526 says such formulas are not acceptable.

## 2. Market definition

- **Price observed:** the full tag price on the shelf. Markdown status (weekly color-tag discounts) is recorded as a field and the markdown share is published alongside each value; the headline statistic is the tag price. A transaction-weighted alternative is a candidate for comment.
- **Store universe:** Goodwill, Savers/Value Village, The Salvation Army, St. Vincent de Paul, independent thrift stores and consignment stores in the United States. Online resale platforms are a labelled secondary series only (section 8).
- **Inclusion threshold:** only saleable shelf stock is surveyed, so every observation is an item in "good used condition or better" by construction. Nothing below that threshold is recorded or published.

## 3. Taxonomy

Item specifications live in `data/items.csv` with stable `dv_id` values, an IRS similar-items group, a parent for inheritance and a collector checklist. The taxonomy is drafted clean-room from IRS groupings and the Google Product Taxonomy crosswalk. No specification, label or value is copied from another valuation guide or from any ItsDeductible export. The first edition targets roughly 300 to 600 surveyed specifications.

## 4. Sampling frame

- Stratified by Census division × store chain.
- At least three metros per division, two chains per metro and one store per chain-metro.
- A third of the store panel rotates each year; each store is visited quarterly.
- Store identities are pseudonymous in the public data (chain and metro only).

## 5. In-store protocol

For each assigned specification, the collector records the first five tags encountered in a fixed walk order through the store. If the specification is absent, the closest match under the checklist is recorded with `substitute_flag=true`. Each observation records brand as printed, brand tier, condition flag (good or excellent), size and material class, markdown status, and a cropped photo of the tag with no people and no receipts. The photo is held in private storage; its SHA-256 hash is public.

## 6. Brand tier and condition

Evidence from the largest revealed-price study of used garments indicates that brand and desirability, not physical condition, drive resale price once an item is rewearable. The primary axis for clothing is therefore brand tier (basic, mid, premium). Condition is recorded but is an inclusion threshold, not a price axis. For household goods and electronics a working/complete flag is recorded; a separate working value is published only when both groups have at least 10 observations and their medians differ by more than 25%.

## 7. Statistics and published tiers

Per specification, region and edition window:

| Published tier | Definition | Plain-language label |
|---|---|---|
| `good_basic` | 25th percentile of tag prices | Good, basic brand |
| `good` | 50th percentile (median) | Good, typical. The default a donor should use. |
| `excellent_premium` | 75th percentile | Excellent / premium brand |

Nothing is published below the 10th percentile. Alongside each tier: p10, p25, p50, p75, p90, the mode, sample counts (observations, stores, metros), the observation window, and a 95% bootstrap percentile confidence interval on the median (B = 2,000, seed recorded in the edition metadata).

Outliers beyond Tukey fences (1.5 × IQR) or 3 × the specification median are flagged for review and kept in the raw table; they are never deleted. Published values are rounded to the nearest $0.50 below $20 and the nearest $1 above; raw cents are retained.

**Minimum sample rules.** A national value needs at least 20 observations from at least 5 stores in at least 3 metros. A regional (Census division) value needs at least 10 observations from at least 3 stores. Below either threshold the specification inherits its parent's value with `inherited_from` set.

**Regional values** are published as an index to the national median and shown in the lookup interface only when the regional minimum is met and the index differs from 1 by more than 0.15. Otherwise the national value is the default.

## 8. Online secondary series

Sold prices from online resale platforms may be used only where a written data arrangement permits it, and only as a labelled secondary series: computed within brand tier, net of platform fees and shipping, scaled by a per-category venue factor calibrated on cells where both series exist, published with its confidence interval, and withheld where the factor cannot be estimated. The online series never replaces the in-store headline.

## 9. What AI agents may and may not do

Agents **may**: map descriptions and tag photos to the taxonomy; normalize brand strings and propose brand tier; detect duplicates; flag out-of-pattern prices; extract structured fields from photos and partner feeds; propose synonyms; draft release notes; triage methodology comments.

Agents **may not**: generate, estimate, impute or fill in any price; decide which observations to drop; edit any published statistic; merge pull requests; adjudicate methodology comments; write to an edition.

Run contract: a dated model snapshot at temperature 0; prompts and schemas under version control with content hashes; every call logged with request hash, served-version fingerprint and timestamp; responses cached by request hash and shipped with the edition so a rebuild without model access reproduces outputs exactly; a frozen audit set of about 500 labelled items re-scored on any model or prompt change, with a pre-registered agreement threshold and automatic rollback.

## 10. Editions and versioning

- Edition `DV-<taxyear>` covers donations dated January 1 through December 31 of that year.
- Built from observations in the twelve months ending September 30 of the prior year; published by December 1 of the prior year.
- Frozen with a SHA-256 over the canonicalized CSVs, a git tag, a GitHub release and a DOI. Never modified after publication.
- A patch edition `DV-<taxyear>.<n>` may add specifications or regions but never changes an existing value.
- Resolution rule: the value in effect for a donation is the edition whose range contains the donation date and, if patches exist, the newest patch published on or before that date.
- Each edition ships a datasheet (motivation, composition, collection, preprocessing, uses, distribution, maintenance) and lineage from every value to its observation ids.

The first edition will be a partial-window edition published mid-2027 and labelled as covering donations from its publication date.

## 11. Known limitations

No thrift-specific literature supplies the sample minimums, the bootstrap size, the regional trigger or the rounding rule; they are proposals. Regional price dispersion in US thrift stores is undocumented. Tag prices overstate transaction prices by the markdown share. The in-store protocol cannot observe consignment commissions or online clearance behaviour.

## 12. Adjudication table

Empty until the comment period closes.
