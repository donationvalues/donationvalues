# Schemas

Frictionless Table Schemas for the three tables that make up an edition. `datapackage.json` at the repository root binds them to the CSV files in `data/`, and CI validates every push.

- `items.schema.json`: the taxonomy. One row per item specification with a stable `dv_id`.
- `observations.schema.json`: the facts. One row per observed price with provenance, certificate record and review status.
- `values.schema.json`: the derived statistics. Produced by the pipeline only, keyed by edition, item, region and tier.

Schema versions are tracked in `datapackage.json` (`version`). Breaking changes bump the major version and are announced with the methodology comment period.
