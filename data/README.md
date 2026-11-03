# Working tables

Header-only until the pilot collection begins (planned for 2027). Columns are defined in `schema/`.

- `items.csv`: taxonomy. Edited by pull request.
- `observations.csv`: price observations. Added by the submission form (bot pull requests) or by hand; never deleted.
- `values.csv`: derived statistics. Written only by `pipeline/`; hand edits are rejected in review.

All three files are CC0 (see `LICENSE-DATA`). Frozen editions are copied to `editions/DV-<taxyear>/` with a hash and are never modified.
