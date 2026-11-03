# Contributing

Thank you for helping build a verifiable public reference. There are four ways to contribute, and one rule that applies to all of them: **nothing in this repository may be copied from another valuation guide, from an ItsDeductible or other app export, or from a website in breach of its terms.** This is a clean-room dataset. If you are not sure whether a source is allowed, open an issue before submitting.

## 1. Price observations

An observation is one price you saw on one item in one store on one date. Follow the collector protocol in `methodology/` (fixed walk order, first five tags per assigned item spec, closest-match substitution when the spec is absent, cropped tag photo with no people or receipts).

Submit observations through the web form on donationvalues.org once it is live, or as a pull request adding rows to `data/observations.csv`. CI validates every row against `schema/observations.schema.json`. Every submission records the certificate version, a hash of your contributor id and a timestamp.

### Data Contributor Certificate v1 (DRAFT, pending counsel review)

By submitting an observation, I certify that:

1. I personally observed this price at the stated store or listing on the stated date, or I otherwise have the right to submit it.
2. I did not copy it from a price guide, an app, a website export or another person's submission.
3. I obtained it lawfully: I did not circumvent access controls, breach terms I agreed to, or ignore a posted store policy or a staff request.
4. The submission contains no personal information about anyone, and any photo was taken by me.
5. I dedicate my contribution to the public domain under CC0 1.0 and grant the fallback license in CC0 section 3.
6. I understand the submission is public and permanent, and that the project may correct, flag or remove it.

Bulk contributors (a thrift operator donating a price feed, a researcher donating a dataset) sign a separate data-contribution agreement with warranties of source and authority. Contact data@donationvalues.org.

## 2. Taxonomy

Propose new item specs or synonyms by pull request to `data/items.csv`. A spec needs a stable `dv_id` (never reused), a donor-facing label, its IRS similar-items group, and the checklist a collector must record. Specs are never deleted; retire them with `status=retired` and `superseded_by`.

## 3. Methodology comments

Each methodology draft has a comment period announced in `methodology/README.md`. Comment by opening a GitHub issue with the `methodology` label and the draft's version in the title. Every comment receives a written disposition in the adjudication table of the final version.

## 4. Code

Pipeline and site code is Apache-2.0. Sign off commits with the Developer Certificate of Origin (`git commit -s`). Keep the build deterministic: pinned dependencies, recorded seeds, and no network calls during an edition build other than the shipped LLM response cache.

## Review and quality checks

Automated checks run on every pull request: schema validation, duplicate detection (same store, same spec, same date, same price), price outliers against the spec's current distribution (flagged, never deleted), impossible dates, and store-format mismatches. A maintainer reviews flagged rows. Review status and reviewer are recorded on the row.

## Removal and takedown policy

- A designated DMCA agent (to be named in `GOVERNANCE.md`) handles notices. A facially valid notice leads to prompt removal, contributor notification and the opportunity to counter-notice.
- Personal data is removed on request, without debate.
- Store or platform objections are honored going forward; public facts already published are not purged unless counsel advises.
- Contributors may ask to be de-identified; facts they contributed remain.
- Accuracy disputes are handled by flagging and re-survey, not by editing published editions.
- All removals are logged publicly in `editions/REMOVALS.md`.

## Conduct

See `CODE_OF_CONDUCT.md`.
