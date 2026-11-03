# Governance

Version 0.1, November 2026. This document will be revised when the advisory council is seated; changes are made by pull request and recorded in the changelog.

## Purpose

DonationValues exists to publish a neutral, verifiable reference for the fair-market value of donated used clothing and household items. Its users include donors, tax professionals, tax-software vendors and the IRS. Neutrality toward all of them is the project's main asset.

## Roles

**Sponsor.** Foothill AI LLC funds hosting, pays for initial data collection and maintains the code. The sponsor does not have a veto over the methodology. The sponsor's product (DeductIt) is one consumer of the data with the same access and the same stable-ID contract as any other vendor.

**Maintainers.** Named individuals with merge rights. They review observation and code pull requests, run releases and enforce the code of conduct. Maintainers are listed in `MAINTAINERS.md` once there is more than one.

**Advisory council.** Three to five enrolled agents, CPAs or tax attorneys plus one statistics reviewer. Members publish a conflict-of-interest statement. The council adjudicates methodology comments and must approve any methodology version before it is used to build an edition. Seats are being recruited; the council is empty at version 0.1.

**Contributors.** Anyone who submits observations, taxonomy proposals, code or methodology comments under `CONTRIBUTING.md`.

## Decisions

- Taxonomy additions, bug fixes and observation acceptance: maintainer review, merged on approval.
- Methodology changes: proposed as a draft `METHODOLOGY-<year>.<n>` in `methodology/`, open for public comment for at least 30 days, each comment recorded with its disposition in an adjudication table, then approved by the advisory council. The NIST public-draft model is the template.
- Edition publication: built only from an approved methodology version; frozen with a hash; never modified after publication. Corrections ship as a new patch edition.
- Anything that would make the data license more restrictive, move the data behind a login, or give one vendor preferential access: not permitted under this document. Changing this rule requires a new governance version with a 60-day comment period.

## Funding

Costs are public. No single tax-software vendor may provide more than one third of annual external funding. Vendor support is structured as tiered membership with published terms. When external funding exists, the project will seek a fiscal sponsor; a nonprofit entity will be evaluated once there is an independent community to govern it.

## Commitments

1. The data license (CC0 1.0) will never be tightened for any past or future edition.
2. Published editions are permanent. Removals follow the takedown policy in `CONTRIBUTING.md` and are logged publicly.
3. If the sponsor ceases to maintain the project, it will transfer the `donationvalues.org` domain, the trademark and the GitHub organization to a successor chosen by the advisory council.
4. AI agents in the pipeline never generate, estimate or edit a price. The agent contract is part of the methodology and is subject to the same comment process.
