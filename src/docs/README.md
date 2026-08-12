# BNI Torque Converter — Agent Docs

Source of truth for humans and AI agents building the BNI Torque Converter storefront. Read these before implementing features or changing architecture.

## Read order

1. [product.md](./product.md) — business domain and customer goals
2. [phases.md](./phases.md) — what Phase 1 must deliver
3. [architecture.md](./architecture.md) — SPA layout, routing, mock data layer
4. [schema.md](./schema.md) — entities for mock data and future DB
5. [design-system.md](./design-system.md) — brand, theme, catalog UX
6. [infrastructure.md](./infrastructure.md) — toolchain and Phase 2+ boundaries

## Maintenance rule

When you change app structure, schema, routes, branding, or phase scope, **update the matching doc in the same change**. Stale docs cause agents to invent conflicting patterns.

## Scope of this folder

Documentation only. Implementation lives under `src/` (pages, components, data, types). Do not treat these markdown files as runtime assets.
