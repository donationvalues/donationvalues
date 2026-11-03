# Price-survey and estimation methodology for a secondhand-goods FMV dataset (DonationValues.org)

Research snapshot: 2026-11-02. US-focused. Sources were fetched live where marked; a few canonical standards (W3C PROV, Frictionless Data, IRS mileage notices, ALFRED) are cited by URL from prior knowledge and flagged as **not fetched this session** so the report writer can treat them with appropriate caution.

Anchor text the whole design must satisfy (IRS Publication 561): FMV is "the price that property would sell for on the open market"; for used clothing, "the price that buyers of used items actually pay in used clothing stores" (thrift/consignment) indicates value; used household items are "usually much lower than the price paid when new"; comparable-sales weight depends on similarity, closeness in time, arm's-length status, **same market area**, and whether the market was unusually inflated/deflated — [IRS Pub 561](https://www.irs.gov/publications/p561).

---

## Q1. What does the BLS CPI do (outlet sampling, ELIs, checklists, substitution, quality adjustment, geometric means, lag), and what transfers to a thrift-price survey?

### Takeaway
The CPI is a probability sample of **outlets → unique items**, with each priced item locked down by an ELI checklist so the *same* item can be re-priced; replacements are handled by explicit substitution + quality-adjustment rules; lower-level indexes use weighted geometric means. The reusable parts for DonationValues are the checklist discipline, the outlet/item two-stage sampling, documented substitution rules, imputation rules for missing quotes, and the CE-style expenditure weighting — not the index arithmetic itself (we need levels, not changes).

### Cited Findings
- Sample structure: 75 PSUs (23 self-representing, 52 non-self-representing) consolidated into 32 index areas; 243 basic items × 32 areas = 7,776 basic indexes; geographic sample refreshed once every 10 years from the decennial census — [BLS Handbook of Methods, CPI: Design](https://www.bls.gov/opub/hom/cpi/design.htm)
- Volume: roughly 80,000 goods and services, ~23,000 retail establishments, ~6,000 housing units; "about 100,000 prices per month" for commodities and services; ~8,000 rent quotes/month — [BLS HOM CPI: Design](https://www.bls.gov/opub/hom/cpi/design.htm); [BLS HOM CPI: Data sources](https://www.bls.gov/opub/hom/cpi/data.htm)
- Outlet selection: "The outlet sample for most items in the CPI is developed with data from the CE Survey"; multistage probability sampling; outlets grouped into sampling categories by entry-level item; outlets may be brick-and-mortar or websites/apps — [BLS HOM CPI: Design](https://www.bls.gov/opub/hom/cpi/design.htm); [Data sources](https://www.bls.gov/opub/hom/cpi/data.htm)
- Item selection inside an outlet ("disaggregation"): probabilities proportional to the sales of items in each group; collectors can estimate sales shares by percents, ranks, dollar-volume seller, ranked selling space, or equal probability; they randomly pick a group at each stage until one unique item remains — [BLS HOM CPI: Design](https://www.bls.gov/opub/hom/cpi/design.htm)
- ELI checklists: each priced item stratum contains one or more ELIs; commodity analysts build checklists that subdivide the ELI and define item specifications; "Checklists contain the descriptive characteristics necessary to identify the item" so it can be found on later visits — [BLS HOM CPI: Calculation](https://www.bls.gov/opub/hom/cpi/calculation.htm); [Design](https://www.bls.gov/opub/hom/cpi/design.htm)
- Collection frequency and mode: ~two-thirds of commodity/service prices by personal visit, remainder by phone or outlet websites/apps; "about 8 percent of CPI quotes are collected from outlet websites"; food/energy priced monthly; other items monthly in NYC/LA/Chicago and bimonthly elsewhere — [BLS HOM CPI: Data sources](https://www.bls.gov/opub/hom/cpi/data.htm)
- Alternative data precedents: for apparel and household goods "one firm supplies a large volume of price data"; all used-car-and-truck prices come from J.D. Power Valuation Services; new-vehicle BLS collection replaced by J.D. Power transaction data from April 2022; secondary gasoline dataset since June 2021 — [BLS HOM CPI: Data sources](https://www.bls.gov/opub/hom/cpi/data.htm)
- Substitution: if an item is unavailable or changed, the collector uses the ELI checklist to pick the closest available item at the outlet and records its specs — [BLS HOM CPI: Calculation](https://www.bls.gov/opub/hom/cpi/calculation.htm)
- Quality adjustment choices for a replacement: direct comparison (items "essentially the same"), direct quality adjustment (observable factors like size/weight, manufacturer cost data, hedonic regression), or imputation (cell-relative, class-mean, carry-forward) — [BLS HOM CPI: Calculation](https://www.bls.gov/opub/hom/cpi/calculation.htm)
- Aggregation: most item strata use a weighted geometric mean of price ratios (weights from sampling-period expenditures); a few strata (electricity, prescription drugs, physicians' services) use modified Laspeyres; aggregation weights updated annually from CE data collected two years earlier (t–2) — [BLS HOM CPI: Calculation](https://www.bls.gov/opub/hom/cpi/calculation.htm)
- Revision/lag precedent: the chained C-CPI-U is first released with the CPI-U, then finalized "approximately 10–12 months later" with three quarterly interim updates — [BLS HOM CPI: Calculation](https://www.bls.gov/opub/hom/cpi/calculation.htm)

### Inferences
- **Transfers directly:** (a) two-stage outlet → item sampling with a documented frame; (b) a per-item *checklist* (DonationValues "item specification") listing the attributes a collector must record so observations are comparable (category, sub-type, gender/age, brand tier, condition, material, size class, store chain, store format, date); (c) explicit rules for substitution ("if no men's dress shirt is on the rack, record the closest ELI-checklist match and flag as substitute"); (d) explicit imputation rules for empty cells (carry-forward with a staleness flag; class-mean from sibling items); (e) a stated collection cadence and modes (in-store visits plus online outlet pages, like BLS's ~8% web quotes).
- **Does not transfer:** geometric-mean *index* arithmetic (CPI measures change; a valuation guide needs levels). Hedonic quality adjustment is overkill for $3–$15 items; use a coarse brand-tier/condition grid instead (see Q4).
- The BLS precedent of buying "a large volume of price data" from a single vendor for apparel is a direct analogue for using an online-resale feed (thredUP/eBay) as a *supplementary* source, provided it is documented and adjusted (see Q7).
- Collection density: CPI prices each unique item once per month or two; DonationValues can price each *item spec × store* quarterly and still beat the annual cadence of existing donation guides.

### Gaps
- The HOM page did not state the current CPI publication lag or whether the Telephone Point of Purchase Survey is still used (the design page attributes outlet sampling to the CE survey; the TPOPS→CE transition is not described on the fetched pages).
- The exact ELI checklist for "used clothing" (CPI has no used-clothing ELI that I could confirm) was not found.

---

## Q2. How do KBB / J.D. Power (NADA) / Edmunds / Black Book describe their used-car valuation, why are they accepted by lenders and the IRS, and what can be copied?

### Takeaway
The guides are accepted not because of a published statistical method (they publish very little), but because they (1) are built on very large transaction datasets, (2) publish *multiple value types* for distinct transaction contexts (trade-in, private party, retail, loan), (3) use a small number of named condition tiers, (4) adjust for region (ZIP/100+ regions) and (5) refresh on a stated cadence with an "as-of" date. Pub 561 points donors to the **private-party** figure, not retail — the analogue for DonationValues is "thrift shelf price," not online-resale asking price.

### Cited Findings
- IRS: for cars, use "the price listed in a used vehicle pricing guide for a private party sale," not dealer retail; value is lower for vehicles with mechanical/body problems, high mileage, or excessive wear — [IRS Pub 561](https://www.irs.gov/publications/p561)
- KBB: values "reflect local conditions in over 100 different geographic regions and are updated weekly" — [kbb.com What's My Car Worth](https://www.kbb.com/whats-my-car-worth/); KBB site: values "based in part on transactions in your area" (ZIP-code prompt); Fair Purchase Price is based on what others have paid; "Since 1926"; a Cox Automotive company — [kbb.com About Us](https://www.kbb.com/company/about-us/)
- KBB (trade press): collects >100 data points per vehicle from >250 sources; introduced regional weekly used-car values — [Automotive Fleet](https://www.automotive-fleet.com/79546/kelley-blue-book-to-provide-regional-weekly-used-car-values); glossary: estimates draw on >250 data sources, actual sales transactions and local market conditions — [SavingsGrove glossary](https://savingsgrove.com/en-gb/financial-dictionary/b/bluebook) (secondary)
- KBB condition tiers: secondary sources conflict (four tiers Fair/Good/Very Good/Excellent vs. five) — unverified; see Gaps.
- J.D. Power (NADA rebranded 2021): trade-in values come "from retail transaction data, not auction prices"; >12 million retail vehicle transactions annually; Power Information Network processes real-time transaction data from >16,000 dealerships; J.D. Power states KBB and Black Book extrapolate trade-in values from wholesale auction prices; J.D. Power publishes a distinct **loan value** for lenders — [J.D. Power Black Book Values page](https://www.jdpower.com/black-book-values); [J.D. Power trade-in](https://www.jdpower.com/trade-in-value); [Autoblog comparison](https://www.autoblog.com/news/car-value-blue-books-kelley-blue-book-vs-jd-power-nada-guide-vs-black-book)
- J.D. Power condition grading is coarse: "Excellent," "Good," or "Fair" — [SellCarAdvisor](https://sellcaradvisor.com/how-accurate-are-j-d-power-values-for-selling-a-car/) (secondary)
- Lender practice: dealerships first set a loan value from J.D. Power guides, then often use Black Book for the offer; Black Book is dealer/wholesale/lender oriented — [Southeast Financial](https://www.sefinancial.com/rv-loans/what-is-a-nada-value-and-why-is-it-important-for-my-loan/); [Wikipedia: Black Book](https://en.wikipedia.org/wiki/Black_Book_(National_Auto_Research)); [LaserAppraiser](https://laserappraiser.com/partners/black-book-vs-kelley-blue-book-vs-jdpower)
- BLS itself sources all CPI used-vehicle prices from J.D. Power Valuation Services — [BLS HOM CPI: Data sources](https://www.bls.gov/opub/hom/cpi/data.htm) (strong evidence a government statistical agency treats the guide as authoritative)

### Inferences
- What to copy conceptually: **(1) multiple value types** keyed to transaction context — DonationValues should publish "thrift shelf price" as the headline (the Pub 561 market) and may show "online resale sold price" as a clearly separated secondary series, never blended; **(2) few condition tiers** (3–4) with plain-English definitions; **(3) explicit as-of date** and update cadence; **(4) regional modifiers** expressed as an index to a national base; **(5) a short public methodology page** describing data sources and volumes in round numbers (the guides' credibility rests on "12 million transactions from 16,000 dealers," not on statistical detail).
- What not to copy: opacity. None of the guides publish an algorithm; an open dataset can be *more* defensible by publishing the raw observations.
- Acceptance by lenders/IRS came from longevity (KBB since 1926), standardized value definitions, and institutional adoption (BLS, lenders). DonationValues should pursue the equivalent: stable definitions, versioned editions, and early adoption by tax-software vendors.

### Gaps
- No primary KBB or Edmunds methodology document was found; the KBB condition-tier count (4 vs 5) is unverified from kbb.com.
- Edmunds "True Market Value" methodology page was not fetched.
- Black Book's own methodology statement (auction vs. retail mix, regional granularity, daily update claims) was not verified from blackbook.com.

---

## Q3. How do thrift chains and resale platforms actually price?

### Takeaway
Goodwill (≈150 independent regional nonprofits) uses store-level category pricing with weekly color-tag markdowns and a separate "boutique" tier ($3.99–$24.99) for branded goods; Salvation Army and Goodwill regions publish low/high donation-value ranges that are themselves described as "what items generally sell for"; thredUP sets reference prices via a merchant team (seller-set for Direct Listings). No chain publishes a formal pricing algorithm, so a survey of observed shelf prices is the only reproducible route.

### Cited Findings
- Goodwill is ~150 independent local nonprofits; pricing and retail decisions differ by region — [MoneyTalksNews](https://www.moneytalksnews.com/the-best-american-cities-for-thrift-shopping-in/)
- Color-tag markdowns: a set of colored tags, one color discounted each week (one source: six colors, 50% off); discounted color is usually the oldest stock, pulled after the sale; start-day varies (Sunday vs. Tuesday across sources); Goodwill of North Georgia publishes its "Color of the Week" — [Goodwill of North Georgia](https://goodwillng.org/color-of-the-week/); [Daily Dot](https://dailydot.com/news/goodwill-color-tag-sale/); [Underpriced color-tag calendar](https://www.underpriced.app/tools/thrift-store-color-tag-calendar) (vendor)
- Goodwill boutique tier: prices "generally range from $3.99 to $24.99," determined by current trends and designer/brand names (Charlotte boutique); standard-store dress "for $5 bucks" per a Goodwill spokesperson — [ABC15 / Scripps syndicated story](https://www.abc15.com/the-now/goodwill-boutiques-offer-high-end-items-for-a-fraction-of-the-cost); [Goodwill SP](https://goodwillsp.org/?p=934)
- Brand-driven outliers at Goodwill: a $29.99 used Athleta/Lululemon tank top drew public complaint — [The Mary Sue](https://www.themarysue.com/goodwill-pricing-controversy/)
- Goodwill Northern New England donation guide, explicitly "what items generally sell for at Goodwill locations": men's shirt $4–$9; pants/jeans $4–$23; women's dress $6–$28; shoes $3–$30; women's sweater $4–$13; men's jacket $10–$45; table lamp $3–$20; floor lamp $8–$34; coffee maker $5–$10; vacuum $5–$60; books $0.59–$2; sofa $40–$395; dresser $20–$80; kitchen set $35–$135; for unlisted items "use 30% of the item's original price"; clothing must be "gently-used and free of stains and holes" — [Goodwill NNE Donation Value Guide](https://www.goodwillnne.org/donate/donation-value-guide/)
- Salvation Army guide (low/high): men's shirt $3–$12; women's blouse $3–$12; women's dress $4–$20; women's sweater $4–$16; women's coat $10–$41; men's shoes $4–$26; women's shoes $2–$26; children's jeans $4–$12; mixer/blender $5–$21; lamp $5–$78; sofa $36–$207; kitchen set $36–$176; hardback book $1–$3; donors "choose a value within this range that reflects your item's relative age and quality"; "The Salvation Army does not set a valuation on your donation"; no derivation method stated — [Salvation Army Donation Value Guide](https://satruck.org/donation-value-guide)
- ItsDeductible (Intuit; help page): High and Medium values "comparable to IRS values of 'good used condition or better'"; High = top brands, condition that looks new, no noticeable wear; Medium = mid-level brands/features; values combine "high-quality data from different sources with conservative estimation algorithms" aggregating "various thrift and consignment stores"; it values "comparable items," not the donor's specific item — [ItsDeductible help](https://itsdeductibleonline.intuit.com/help/addoreditothertrackerhuid.html); example figures: jeans $13 high / $7 medium, polo $7 high / $4 medium; values "based on average thrift store prices" — [Tom Copeland blog](https://tomcopelandblog.com/blog/its-a-money-saver-itsdeductiblecom) (secondary); ItsDeductible reported discontinued by Intuit on Oct 21, 2025 — [Deductible Duck](https://deductibleduck.com/category/news) (third party; unconfirmed with Intuit)
- Intuit patents describing the ItsDeductible approach: "System and method for tracking charitable deductions" (US 7,395,230) and "Tax deduction revaluation system" (US 7,769,662) — [USPTO 7395230](https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/7395230); [USPTO 7769662](https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/7769662) (not read in full)
- thredUP: reference prices for thredUP-listed items "are set by a seasoned team of merchants who monitor market prices for the brands and styles that we sell"; pricing "is not an exact science"; for Direct Listings the seller sets price and est. retail and thredUP does not control it — [thredUP product page](https://www.thredup.com/product/women-cotton-twp-blue-jeans/1501712953); [terms.law summary of thredUP ToS](https://terms.law/ToS-Watchdog/resale-marketplaces/thredup/)
- thredUP condition tiers per third parties: Excellent / Good / Acceptable / Damaged (low-quality source, unverified) — [motogp mirror page](https://admin.store.motogp.com/unlocking-the-secrets-of-thredup-com-a-guide-for-savvy-secondhand-shoppers); consignment payout often 5–15% of resale price — [Closo](https://closo.co/blogs/blog/is-thredup-consignment-worth-it-the-honest-truth-about-selling-in-2026) (single review site)
- Platform fees relevant to online-resale adjustment: eBay ~13.25%; Poshmark flat 20% on sales over $15; labor 8–30 min per item — [Closo cost guide](https://closo.co/blogs/inventory-liquidation/thrifting-for-resale) (vendor); worked example: Lululemon leggings bought $6, listed $45 on Poshmark, net $28.03 after $9 fee and $7.97 shipping — [Underpriced blog](https://www.underpriced.app/blog/thrift-store-flipping-complete-guide)

### Inferences
- Thrift pricing is **category-flat with brand exceptions**: a plain men's shirt sits in a ~$3–$9 band nationally across two independent guides, while branded items are routed to a boutique tier at 2–5× that. A DonationValues item spec therefore needs a **brand-tier axis** (basic / mid / premium) more than a fine condition axis.
- Color-tag markdowns mean *observed shelf price* ≠ *price paid* for 1/6 of inventory on any given week. Pub 561's language is "price that buyers… actually pay." Recommended default: record the **full tag price** as the primary observation and record the markdown status as a field; publish the tag-price statistic, and footnote that a share of transactions clear at 50% off (this is a judgment call; the conservative alternative is to publish a transaction-weighted price ≈ tag × (1 − 0.5 × markdown share)).
- Both Goodwill NNE and Salvation Army ranges are consistent with "low = basic brand / worn-but-good, high = premium brand / like-new," i.e., the existing guides already encode brand × condition in a 2-point range. DonationValues can be strictly more defensible by publishing the observed distribution behind that range.
- Savers/Value Village, St. Vincent de Paul, Buffalo Exchange, Plato's Closet, Poshmark: no primary pricing-policy documents surfaced; treat as survey outlets, not as sources of published method.

### Gaps
- No official Goodwill Industries International or regional "how we price" policy page was found; the $4.99-style flat category prices are anecdotal only.
- Savers/Value Village, Salvation Army store pricing, St. Vincent de Paul, Buffalo Exchange and Plato's Closet buy/sell formulas were not researched to primary sources in this session.
- thredUP's "algorithm" (brand × condition × demand, optimized for sell-through) is described only by third-party blogs.

---

## Q4. Condition tiers and the empirical condition–price relationship; mapping "good used condition or better" to percentiles

### Takeaway
Existing scales are coarse (2–4 tiers) and the best large-sample evidence on garments (8,280 items, four EU countries) found **no statistically significant link between physical condition and resale value** once a garment passes the rewearable threshold — brand, trend and desirability dominate. For electronics (eBay iPods/laptops) condition tiers *do* produce significantly different mean prices. Recommendation: treat "good used condition or better" as the *inclusion threshold* for observations (survey only saleable thrift stock) and publish the **median as the "good" value**, a lower percentile (p25) for "fair/good-minus" and an upper percentile (p75) for "excellent / premium brand," rather than inventing condition multipliers.

### Cited Findings
- IRS: no deduction for clothing or household items unless in "good used condition or better"; exception for a single item not in good used condition if the deduction exceeds $500 and a qualified appraisal + Form 8283 are attached — [IRS Pub 561](https://www.irs.gov/publications/p561)
- ItsDeductible High/Medium both defined as comparable to IRS "good used condition or better"; High = top brands, looks new; Medium = mid-level brands — [ItsDeductible help](https://itsdeductibleonline.intuit.com/help/addoreditothertrackerhuid.html)
- Goodwill NNE: clothing "gently-used and free of stains and holes"; small appliances "in working condition"; furniture "non-broken," fabric free of stains/holes; "The quality of the item when new and its age must be considered" — [Goodwill NNE guide](https://www.goodwillnne.org/donate/donation-value-guide/)
- Salvation Army: pick within low–high "that reflects your item's relative age and quality" — [Salvation Army guide](https://satruck.org/donation-value-guide)
- J.D. Power car condition: Excellent / Good / Fair — [SellCarAdvisor](https://sellcaradvisor.com/how-accurate-are-j-d-power-values-for-selling-a-car/)
- Fashion for Good + Circle Economy "Sorting for Circularity: Project Rewear": 8,280 garments sorted in NL, ES, PL, LT; 37% had no identifiable damage, 41% only minor flaws; "no statistically significant link between physical condition and resale value"; "grade and price are determined by brand recognition, fashion trends and perceived desirability"; only ~5–10% of garments entering sorting are premium "cream" items; outerwear and denim performed best — [Fashion for Good case study](https://www.fashionforgood.com/case-study/sorting-for-circularity-rewear/); [Resource Media summary](https://www.resourcemedia.eco/article/brand-perception-not-condition-determines-resale-value-of-discarded-clothing); [EU Transition Pathways note](https://transition-pathways.europa.eu/textiles/news/sorting-circularity-project-rewear)
- eBay electronics: 1,716 eBay listings; average prices for used, remanufactured and new iPod Classics were $116.7, $167.7 and $220.9 (used ≈ 53% of new) — [Subramanian & Subramanyam, Int. J. Production Economics, 2015](https://www.sciencedirect.com/science/article/abs/pii/S0925527315000407)
- eBay laptops: condition categories had significantly different mean prices (linear regression) — [JDMDC laptop study](https://jdmdc.com/index.php/JDMDC/article/download/35/27)
- Used-car hedonics: odometer and condition are the strongest price factors (Craigslist data) — [Bent & Gutierrez, UNLV](https://oasis.library.unlv.edu/durep_podium/76/)
- University-student survey (n=126): condition rated most important, then price, brand moderate — [IJRISS](https://rsisinternational.org/journals/ijriss/articles/factors-influencing-purchase-intention-of-second-hand-clothing-among-university-students/) (stated preference, small sample; contrasts with the revealed-price Rewear finding)
- Online resellers of secondhand clothing face "uncertain quality due to differences in physical condition and disconnect from past owners" — [Settling secondhand sales (PMC)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11890435/)

### Inferences
- For **clothing**, do not model condition as a continuous multiplier; the revealed-price evidence says the thrift market already screens out sub-"good" stock and then prices on brand/desirability. Three published points per item spec are sufficient: **p25 ("good, basic brand"), p50 ("good, typical"), p75 ("excellent / premium brand")**. This also reproduces the ItsDeductible Medium/High and Salvation Army low/high structure, but with a published, reproducible definition.
- For **household goods and electronics**, condition (working, complete, cosmetic) does move price; collect a working/complete flag and publish separate values when the spread between flagged groups exceeds a threshold (judgment call: >25% difference in medians with n ≥ 10 in each group).
- Mapping the IRS minimum: because surveyed thrift stock is by construction "good used condition or better" (chains discard the rest), the *lowest defensible* published value for a good-condition item is the p25 of shelf prices, and p50 is the central estimate. Do not publish anything below p10; items worse than good are non-deductible (or need appraisal above $500) so no value is needed.
- Define tiers in observable terms collectors can apply in-aisle: Basic (store brand / fast fashion / unbranded), Mid (mall brands), Premium (designer / technical / boutique-routed). Record brand name verbatim so tier assignment can be re-run (and LLM-assisted; see Q8).

### Gaps
- No US study quantifying the condition–price elasticity for thrift clothing specifically was found; the Rewear study is European sorter-grade data, not US retail shelf data.
- The full Rewear report's statistics (test used, effect sizes) were not read; figures come from the case-study page and press summaries.
- thredUP's own condition-tier definitions and any published condition price deltas were not found on thredup.com.

---

## Q5. Robust estimators, sample-size rules, outlier handling, and plain-language uncertainty

### Takeaway
For small, right-skewed price samples use the **median** as the headline, report **p25/p75** (an interquartile band lay users understand), and compute a **bootstrap percentile CI on the median** for auditors; trimmed/winsorized means are acceptable alternates with the same robustness logic. Set a minimum n and publish the n with every value.

### Cited Findings
- Mean is optimal for normal data but "lacks robustness of validity"; "for data with extreme values in the tails, the median provides a better estimate of location than does the mean"; median has robustness of validity but not of efficiency — [NIST/SEMATECH e-Handbook §1.3.5.1](https://www.itl.nist.gov/div898/handbook/eda/section3/eda351.htm)
- Mid-mean = mean of data between the 25th and 75th percentiles; trimmed mean commonly trims 5% per tail; winsorized mean sets values below p5/above p95 to those cutoffs; these aim to balance robustness of validity and efficiency and stay close to the mean for near-normal data — [NIST/SEMATECH e-Handbook §1.3.5.1](https://www.itl.nist.gov/div898/handbook/eda/section3/eda351.htm)
- For skewed (exponential/lognormal) data, mean and median differ and "neither is obviously more meaningful" — [NIST/SEMATECH e-Handbook §1.3.5.1](https://www.itl.nist.gov/div898/handbook/eda/section3/eda351.htm)
- CPI precedent for excluding/imputing unusable quotes: observations that cannot be priced are excluded and imputed via cell-relative, class-mean, or carry-forward — [BLS HOM CPI: Calculation](https://www.bls.gov/opub/hom/cpi/calculation.htm)
- Existing donation guides publish a two-point range (low/high) rather than a point estimate and tell donors to place their item within it — [Salvation Army guide](https://satruck.org/donation-value-guide); [Goodwill NNE guide](https://www.goodwillnne.org/donate/donation-value-guide/)

### Inferences (recommended defaults; judgment calls flagged)
- **Headline statistic:** median of tag prices within an item spec × edition window. Rationale: thrift prices cluster at a few price points ($2.99, $4.99, $6.99…) with a long right tail of boutique/brand outliers; the median lands on the modal price point and is immune to a few $29.99 tags.
- **Published band:** p25–p75 of the same sample ("most stores price this between $X and $Y"). Lay-readable, matches the low/high convention users already know.
- **Auditor uncertainty:** 95% bootstrap percentile CI on the median, B = 2,000 resamples, fixed RNG seed recorded in the edition metadata (judgment call on B and seed; standard practice, not sourced to a thrift-specific study).
- **Minimum sample size:** n ≥ 20 observations from ≥ 5 distinct stores in ≥ 3 metros to publish a national value; n ≥ 10 from ≥ 3 stores for a regional value; below that, publish the parent-category value with a "borrowed from parent" flag (CPI "class-mean" analogue). These thresholds are a judgment call; the literature fetched gives no thrift-specific rule.
- **Outlier rule:** do not delete; flag observations beyond 3× the item-spec median (or outside Tukey fences 1.5×IQR) for human review, and keep them in the raw file. Because the headline is a median, flagged outliers rarely change the published value; the flag exists for provenance.
- **Price-point handling:** because prices are discrete, report the mode alongside the median and note when they differ.
- **Rounding:** round published values to the nearest $0.50 below $20 and nearest $1 above (judgment call) to avoid false precision while keeping cents-level raw data.
- Hodges–Lehmann (median of pairwise means) is a reasonable alternate central estimator for n < 20; it was not covered by the fetched sources and is listed as an option, not a default.

### Gaps
- No source fetched gives a minimum-sample rule for price-survey cells; the numbers above are proposals.
- Bootstrap-CI coverage for medians on discrete, multi-modal price data (few distinct price points) can be poor; this was not verified against literature in this session.

---

## Q6. Regional variation and national vs. regional values for tax purposes

### Takeaway
There is no rigorous published dataset of thrift prices by US region; the only quantitative hints are commercial Yelp-based rankings. Pub 561 lists "same market area" as one of five factors weighting a comparable sale, so a national value is defensible as a default if the dataset shows regional dispersion is small *or* publishes regional modifiers (BEA RPP-style) where dispersion is material.

### Cited Findings
- Pub 561 comparable-sale weighting includes "whether the sale came from the same market area" alongside similarity, timing, arm's-length status, and abnormal market conditions — [IRS Pub 561](https://www.irs.gov/publications/p561)
- Goodwill is ~150 independent nonprofits, so "pricing and retail decisions can differ substantially from one region to another" — [MoneyTalksNews](https://www.moneytalksnews.com/the-best-american-cities-for-thrift-shopping-in/)
- CouponFollow (Oct 2024 Yelp data; Yelp API capped at 240 establishments per city): NYC and Newark ranked top for thrifting; Long Beach and Irvine, CA had the most low-cost stores — [CouponFollow 2024](https://couponfollow.com/research/best-cities-for-thrift-shopping); earlier CouponFollow scrape of 1,526 thrift stores across the most populated city in each state named Los Angeles most affordable — [CouponFollow earlier study](https://couponfollow.com/research/top-cities-to-thrift)
- Joybird analysis of the 50 largest cities (store density, Yelp ratings, pricing) called St. Louis among the most affordable — [MoneyTalksNews](https://www.moneytalksnews.com/the-best-american-cities-for-thrift-shopping-in/)
- BEA Regional Price Parities exist at state-metro-portion level for all goods (2024: New York metro portion 107.7, Mississippi 96.2, US = 100) but apparel is not broken out in the FRED series — [FRED NYMPRPPGOOD](https://fred.stlouisfed.org/series/NYMPRPPGOOD); [FRED MSMPRPPGOOD](https://fred.stlouisfed.org/series/MSMPRPPGOOD)
- KBB uses >100 regions and ZIP-level adjustment for cars — [kbb.com](https://www.kbb.com/whats-my-car-worth/)

### Inferences
- Thrift prices are set at the regional-nonprofit level with heavy use of fixed price points, so the plausible dispersion is a *few price-point steps* (e.g., $4.99 vs $6.99 for the same shirt), i.e., roughly ±20–40% between the cheapest and dearest regions. This is an inference from the price-point structure, not a measured figure.
- Recommended design: (1) publish a **national median** as the default (most donors, including the IRS's own Pub 561 reading, treat thrift stores as a single market); (2) stratify the sample by the 4 Census regions and the 9 divisions and publish a **regional index** (region median ÷ national median) with its n; (3) only expose a regional value in the UI when the index differs from 1.00 by more than a threshold (judgment call: >15%) and n meets the regional minimum; (4) document that donors may use the national value unless a regional value exists for their state. This mirrors KBB's regional modifier structure and BEA's RPP index form.
- Sampling frame for regions: Goodwill territories map to regional nonprofits; sampling ≥1 store per Goodwill region plus Savers/Salvation Army stores in the same metros controls for the largest known source of regional variation.

### Gaps
- No peer-reviewed or government dataset of secondhand-store prices by region was found; the commercial rankings do not publish item-level prices.
- BEA RPP apparel-component tables were not fetched; only all-goods figures are cited.
- Whether the IRS has ever challenged a national (vs. local) thrift value for low-value clothing donations was not researched (case-law search out of scope).

---

## Q7. Hybrid sources: using eBay/Poshmark/thredUP sold data with documented adjustments

### Takeaway
Online sold prices are a different market (Pub 561's "same market area / conditions of sale" factors) with seller fees of ~13–20%, shipping, labor, and strong selection toward branded items; the only markup figures found are reseller rules-of-thumb (list at ~3× thrift cost; margins 30–200%). Use online data as a **secondary, separately labeled series** for brand-tier calibration and for sparse cells, never as the headline FMV, with an explicit, versioned conversion factor.

### Cited Findings
- BLS precedent: a single vendor's large apparel/household price feed is used in the CPI; used-vehicle prices come entirely from J.D. Power — [BLS HOM CPI: Data sources](https://www.bls.gov/opub/hom/cpi/data.htm)
- Reseller rule of thumb: price thrift finds at "3x your buy price as a baseline" to cover fees, shipping and margin — [ItemValueChecker](https://itemvaluechecker.com/blog/how-to-price-thrift-store-finds) (vendor)
- Margin claims: 50–200% and 30–200% "depending on the item" — [Closo thrift reselling](https://closo.co/blogs/dropshipping/thrift-store-reselling-2); [Underpriced](https://www.underpriced.app/blog/is-thrifting-profitable-2026) (vendor blogs, not measured averages)
- Fee structure: eBay ~13.25%; Poshmark 20% flat over $15; labor 8–30 min/item; fees eat 25–30% of apparent markup — [Closo cost guide](https://closo.co/blogs/inventory-liquidation/thrifting-for-resale)
- Worked example: $6 thrift → $45 Poshmark list, $28.03 net after $9 fee + $7.97 label — [Underpriced guide](https://www.underpriced.app/blog/thrift-store-flipping-complete-guide)
- thredUP payout to consignors often 5–15% of resale price — [Closo](https://closo.co/blogs/blog/is-thredup-consignment-worth-it-the-honest-truth-about-selling-in-2026) (single source)
- eBay used vs new price ratio for a durable (iPod Classic): $116.7 used vs $220.9 new (≈53%) — [IJPE 2015](https://www.sciencedirect.com/science/article/abs/pii/S0925527315000407)
- eBay vs in-person auction comparison exists for used tractors (hedonic) — [AAEA AETR 2022](https://www.aaea.org/UserFiles/file/AETR_2022_037ProofFinal_v1.pdf) (shows the venue effect is a studied phenomenon, not a thrift-specific figure)
- Only ~5–10% of sorted garments are premium "cream" items commanding high resale prices — [Fashion for Good Rewear](https://www.fashionforgood.com/case-study/sorting-for-circularity-rewear/)

### Inferences
- **Selection bias is the dominant issue, not fees:** resellers only list the top ~5–10% "cream" items, so an online sold-price median for "women's sweater" is a median of premium items, not of thrift shelf stock. Adjusting fees off an online price does not fix this; matching on **brand tier** does. Recommended use: compute online sold medians *within brand tier*, and use them only (a) to validate the thrift p75/premium tier and (b) as a capped fallback for sparse cells, with the conversion factor published and versioned.
- Documented conversion factor (judgment call, to be calibrated on paired cells where both sources exist): thrift-equivalent ≈ online sold price × (1 − platform fee 0.13–0.20) − shipping, then × a market-venue factor estimated from paired cells; publish the factor per category with its CI, and refuse to publish a cell where the factor cannot be estimated.
- Never show online sold prices in the donor-facing value without a label; Pub 561 names the used-clothing-store price as the indicator, and an auditor will discount an eBay figure.

### Gaps
- No academic or industry study quantifying the thrift-shelf-to-online-sold markup for clothing was found; figures are reseller anecdotes.
- eBay Terapeak / Marketplace Insights data-use terms for a public dataset were not checked.
- thredUP's Resale Report was not fetched (search did not surface pricing-relevant content from it).

---

## Q8. Reproducibility of an AI-assisted pipeline and the allowed role of LLM agents

### Takeaway
Treat LLM determinism as unattainable and design for **auditability instead**: pin provider/model/version/date, log every call, cache responses keyed by request hash, keep a frozen audit set re-run on every model change with a preregistered rollback rule, and publish a datasheet. LLMs classify, normalize, dedupe, map taxonomy and flag — they never originate a price.

### Cited Findings
- Even with the same seed, temperature and prompt, outputs varied across runs (attributed to parallel computation) — [PromptLayer](https://blog.promptlayer.com/why-llm-evaluation-results-arent-reproducible-and-what-to-do-about-it/)
- A seed is "a stabilizer rather than a guarantee" because providers update serving stacks behind fixed model names; log the served model version and request metadata for every call — [LLMR vignette, CRAN](https://ftp.fau.de/cran/web/packages/LLMR/vignettes/reproducibility-and-cost.html)
- Dated model snapshots lock a specific version, but a pinned deployment does not create a permanent archive — [Schmalbach](https://www.vincentschmalbach.com/model-updates-break-llm-reproducibility/)
- Log model version, sampling parameters, seed, system fingerprint, dataset version and evaluator version — [Future AGI](https://futureagi.com/blogs/non-deterministic-llm-prompts-2025)
- Variance-aware annotation protocol: pin provider, model, version and date for all runs; keep a frozen audit set re-run when versions change; preregister a rollback rule; compare agreement statistics before/after a change — [arXiv 2601.02370](https://arxiv.org/pdf/2601.02370)
- Hash the full request and store responses so repeats return the stored output — the only byte-identical approach — [Barking Iguana](https://barkingiguana.com/writing/making-an-llm-output-reproducible/)
- Datasheets for Datasets (Gebru et al., arXiv:1803.09010; CACM 64(12):86–92, 2021): questions grouped by lifecycle — motivation, composition, collection process, preprocessing/cleaning/labeling, uses, distribution, maintenance — [arXiv 1803.09010](https://arxiv.org/abs/1803.09010v7); [Microsoft Research](https://www.microsoft.com/en-us/research/publication/datasheets-for-datasets/)
- AI-assisted hedonic/quality-adjusted price indexes are an active statistical-agency research topic — [arXiv 2305.00044](https://arxiv.org/pdf/2305.00044)
- Standards cited from prior knowledge, **not fetched this session**: W3C PROV-O (provenance ontology: Entity/Activity/Agent) — [W3C PROV-O](https://www.w3.org/TR/prov-o/); Frictionless Data Package spec (`datapackage.json` with Table Schema) — [Frictionless Data](https://specs.frictionlessdata.io/data-package/).

### Inferences (recommended pipeline contract)
- **Allowed LLM tasks** (each with a human-reviewed evaluation set and reported accuracy per edition): map free-text/photo item descriptions to the DonationValues taxonomy; normalize brand strings and assign brand tier; detect duplicate observations (same store, same tag, same visit); flag out-of-pattern prices for review; extract structured fields from collector photos/receipts; draft release notes.
- **Forbidden LLM tasks:** generating, estimating, or "filling in" any price; choosing which observations to drop; editing published statistics. Prices enter only from a collector record or a sold-listing record with provenance.
- **Run contract:** model ID with dated snapshot; temperature 0; prompts and schemas under version control with a content hash; every call logged (request hash, model, served-version fingerprint, timestamp); responses cached and shipped with the edition so a re-run without model access reproduces outputs exactly; frozen audit set (≈500 labeled items, judgment call) re-scored on any model/prompt change, with a pre-stated agreement threshold (e.g., Cohen's κ not falling by more than 0.02 — judgment call) and automatic rollback.
- **Documentation:** one datasheet per edition following the Gebru section headings; a PROV-style lineage from each published value back to observation IDs, collector ID (pseudonymous), store, date, and the LLM-run IDs that touched it; Frictionless `datapackage.json` with Table Schema for each CSV.

### Gaps
- Anthropic/OpenAI official reproducibility documentation pages were not fetched this session; the claims above rest on practitioner and arXiv sources.
- No source was found that evaluates LLM accuracy specifically on secondhand-item taxonomy mapping; an internal evaluation set is required.

---

## Q9. Versioning for tax use: freezing an annual edition with a content hash

### Takeaway
Follow the pattern of regulatory tables: publish a **tax-year edition** with a stated effective-date range, immutable archive, content hash, and a change log; keep prior editions retrievable; label each value with "as of" and sample window, the way KBB stamps regional weekly values and BLS preserves vintages.

### Cited Findings
- KBB values are updated weekly across 100+ regions (implying each value is tied to a date and region) — [kbb.com](https://www.kbb.com/whats-my-car-worth/)
- BLS C-CPI-U precedent for explicit preliminary/interim/final vintages: final "approximately 10–12 months later," three interim updates — [BLS HOM CPI: Calculation](https://www.bls.gov/opub/hom/cpi/calculation.htm)
- Pub 561 weights comparables by closeness to the valuation date and by abnormal market conditions, so the value "in effect on the donation date" is the relevant one — [IRS Pub 561](https://www.irs.gov/publications/p561)
- Existing guides (Salvation Army, Goodwill NNE) publish undated ranges with no change history — [Salvation Army guide](https://satruck.org/donation-value-guide); [Goodwill NNE guide](https://www.goodwillnne.org/donate/donation-value-guide/)
- Cited from prior knowledge, **not fetched this session**: IRS standard mileage rates are issued per calendar year by notice with an explicit effective date and a public archive of prior years — [IRS standard mileage rates](https://www.irs.gov/tax-professionals/standard-mileage-rates); ALFRED archives every historical vintage of FRED series so users can retrieve data "as it was known" on a date — [ALFRED](https://alfred.stlouisfed.org/).

### Inferences (recommended defaults)
- **Edition = tax year**, e.g., `DV-2026`, covering donations dated Jan 1–Dec 31, 2026; built from observations collected in a stated window (recommended: the 12 months ending Sept 30 of the prior year, so the edition can be published before the tax year starts — a judgment call that trades freshness for predictability). Optionally a mid-year `DV-2026.1` patch only for additions, never for changing an existing value.
- **Immutability:** each edition is a Frictionless data package with a SHA-256 over the canonicalized CSVs, published as a git tag and a DOI-style permanent URL; the site serves `/edition/2026/<item-id>` forever; every donor receipt/export embeds edition ID, item ID, value, and the edition hash.
- **Donation-date resolution rule:** value in effect = the edition whose coverage range contains the donation date; if a patch exists, the newest patch published *on or before* the donation date applies (prevents retroactive changes).
- **Change log:** per-item diff between editions with reason codes (new sample, taxonomy change, method change); method changes are flagged and the prior method's value is retained in the archive.
- **Lag precedent:** BLS accepts a 10–12 month lag for final chained indexes; an annual thrift edition built from the prior 12 months is well within statistical-agency norms.

### Gaps
- Whether IRS examiners accept a *prior-year* guide value for a current-year donation was not researched; the design above avoids the question by publishing before the tax year begins.

---

## Q10. Taxonomies to anchor item definitions, and their licenses

### Takeaway
Google Product Taxonomy is freely downloadable (no explicit license beyond Google's ToS), GS1 GPC is an open GS1 standard updated twice a year, UNSPSC code sets are distributed via a store/subscription, Schema.org is CC BY-SA. Anchor DonationValues' *own* small taxonomy to Google Product Taxonomy IDs (and optionally GPC bricks) as crosswalks, rather than adopting any of them wholesale.

### Cited Findings
- Google product category taxonomy: "a categorization tree that automatically sorts your products for Google Shopping"; plain-text and .xls downloads at `https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.txt` / `.xls`; "continuously evolving"; no taxonomy-specific license statement on the page (links only to Google's general Terms of Service) — [Google Merchant Center help](https://support.google.com/merchants/answer/6324436)
- GS1 GPC: a new version published twice a year; integrated into GDSN — [GS1 Belgium & Luxembourg](https://gs1belu.org/en/gpc-productclassificatie); GPC development/implementation process — [GS1 GPC development PDF](https://www.gs1.org/sites/default/files/gpc_development_and_implementation_1.pdf)
- UNSPSC: distributed through a store (unspsc.org/store) — [UNSPSC store](https://www.unspsc.org/store-sub/index); GS1 US oversaw UNSPSC until Dec 31, 2024 (governance since then unconfirmed) — [Wikipedia mirror](https://wiki.krisyotam.com/content/wikipedia_en_all_nopic_2026-03/UNSPSC)
- Vendor comparison: GPC/UNSPSC are supply-chain/procurement classifications; Google's taxonomy exists to route ads and enforce Shopping policy; there is no clean crosswalk — [Anglera glossary](https://www.anglera.com/glossary/google-product-category) (secondary)
- Cited from prior knowledge, **not fetched this session**: Schema.org vocabulary (including `Product`, `Offer`, `itemCondition` with `UsedCondition`/`RefurbishedCondition`/`NewCondition`) is licensed CC BY-SA 3.0 — [Schema.org terms](https://schema.org/docs/terms.html); eBay condition IDs (1000 New, 3000 Used, 7000 For parts…) are defined in eBay developer docs — [eBay condition IDs](https://developer.ebay.com/devzone/finding/callref/enums/conditionIdList.html).

### Inferences
- Build a DonationValues taxonomy of roughly 300–600 item specs (judgment call sized to existing guides, which list ~100–200 items) with fields: `dv_id`, label, parent, gender/age, Google Product Taxonomy ID, optional GPC brick code, Schema.org `itemCondition` mapping, and synonyms. Publish it CC0 or CC BY 4.0 (judgment call; CC BY-SA would be forced only if Schema.org *text* is copied, which is unnecessary).
- Use Google Product Taxonomy IDs as the primary crosswalk because the file is public, ID-stable, consumer-oriented, and already used by resale platforms' feeds; keep GPC as a secondary crosswalk for retail-data partners.
- Do not depend on UNSPSC or Amazon browse nodes (licensing/access friction; not consumer-facing).

### Gaps
- No explicit license text for the Google Product Taxonomy file or for GS1 GPC was found on primary pages; a legal read of Google's ToS and GS1's IP policy is still needed.
- Amazon browse-node and eBay category-tree API license terms were not researched.

---

## Q11. Synthesis: concrete recommended defaults for DonationValues.org

### Takeaway
A defensible design is: a documented two-stage probability-ish sample of thrift outlets and item specs, checklist-driven in-aisle tag-price collection (plus a labeled online secondary series), median/p25/p75 with bootstrap CIs and published n, national values with regional indexes where material, annual hash-frozen tax-year editions, a public datasheet, and LLMs confined to classification/normalization/QA.

### Cited Findings
- The anchor requirements (Pub 561 market definition, condition threshold, comparable-sale factors) — [IRS Pub 561](https://www.irs.gov/publications/p561)
- The statistical-agency template (outlet/item sampling, checklists, substitution, imputation, alternative data) — [BLS HOM CPI: Design](https://www.bls.gov/opub/hom/cpi/design.htm); [Data sources](https://www.bls.gov/opub/hom/cpi/data.htm); [Calculation](https://www.bls.gov/opub/hom/cpi/calculation.htm)
- The valuation-guide template (value types, coarse tiers, regions, cadence) — [kbb.com](https://www.kbb.com/whats-my-car-worth/); [J.D. Power](https://www.jdpower.com/black-book-values)
- Existing donation-guide value structures and magnitudes — [Salvation Army](https://satruck.org/donation-value-guide); [Goodwill NNE](https://www.goodwillnne.org/donate/donation-value-guide/); [ItsDeductible help](https://itsdeductibleonline.intuit.com/help/addoreditothertrackerhuid.html)
- Brand-not-condition evidence — [Fashion for Good Rewear](https://www.fashionforgood.com/case-study/sorting-for-circularity-rewear/)
- Robust-estimator guidance — [NIST/SEMATECH e-Handbook](https://www.itl.nist.gov/div898/handbook/eda/section3/eda351.htm)
- AI reproducibility protocol — [arXiv 2601.02370](https://arxiv.org/pdf/2601.02370); [Datasheets for Datasets](https://arxiv.org/abs/1803.09010v7)

### Inferences (the recommended defaults; all numbers are judgment calls unless a source above gives them)
1. **Market definition:** headline value = full tag price observed in US thrift/consignment stores (Goodwill, Savers/Value Village, Salvation Army, St. Vincent de Paul, independents, consignment). Online sold prices are a separate labeled series.
2. **Outlet frame:** list of thrift outlets by metro (chain store locators + an open directory); stratify by Census division × chain; sample ≥ 3 metros per division, ≥ 2 chains per metro, ≥ 1 store per chain-metro; rotate one-third of stores annually (CPI rotates housing one-sixth per year; faster rotation suits a smaller panel).
3. **Item specification (checklist):** `dv_id`, sub-type, gender/age, brand (verbatim) → brand tier (basic/mid/premium), material class, size class, condition flag (good / excellent; sub-good not recorded), working/complete flag for household goods, tag price, markdown status (color-tag week), store, chain, format (standard/boutique/outlet), date, collector ID, photo hash.
4. **In-store protocol:** per visit, for each assigned item spec, record the first 5 items encountered on the rack in a fixed walk order (quasi-systematic sampling, avoids collector cherry-picking); record substitutes with the closest-match rule and a substitute flag; photos retained for audit.
5. **Cadence:** each store visited quarterly; edition built on 12 months of observations ending Sept 30; publish by Dec 1 for the following tax year.
6. **Statistics:** median (headline), p25/p75 (band), mode (price point), n, store count, metro count, 95% bootstrap percentile CI (B = 2,000, seed recorded). Minimum n = 20 / 5 stores / 3 metros national; 10 / 3 / 1 regional; else inherit parent with flag.
7. **Condition presentation:** "Good" = p50; "Excellent / premium brand" = p75; "Good, basic brand" = p25. No published value below p10. Household goods: separate working vs. non-working only if n ≥ 10 each and medians differ > 25%.
8. **Regions:** national default; regional index = division median ÷ national median; expose only where |index − 1| > 0.15 and n meets regional minimum.
9. **Online secondary series:** eBay/Poshmark/thredUP *sold* prices, within brand tier, net of platform fee (13–20%) and shipping, scaled by a per-category venue factor calibrated on paired cells; used for validation and sparse-cell fallback, always labeled.
10. **Editions:** `DV-<taxyear>`, immutable, SHA-256 over canonical CSVs, git tag + permanent URL, per-item change log with reason codes, patches additive only, donation-date resolution rule published.
11. **Reproducibility:** Frictionless data package + Table Schema; PROV-style lineage from value → observations → collector/store/date → LLM run IDs; datasheet per edition (Gebru headings); raw observations published (store names may be pseudonymized at chain+metro level).
12. **LLM scope:** classify, normalize brands, map taxonomy, dedupe, flag outliers, extract fields from photos; never produce a price; pinned dated model, temperature 0, prompts hashed, responses cached and shipped, frozen ≈500-item audit set with preregistered agreement threshold and rollback.

### Gaps
- Nothing found establishes how the IRS or Tax Court has treated a crowd-collected, open price survey; the design maximizes alignment with Pub 561 text and statistical-agency practice but has no litigation precedent.
- All numeric thresholds in this synthesis (sample minimums, bootstrap B, regional 15% trigger, 25% household split, rounding rules) are proposals to be stated as such in the public methodology, not literature-derived constants.
