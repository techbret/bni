# Phases

## Phase 1 — Mock storefront (current)

Goal: ship a look-and-feel storefront with mock data so the customer can approve UI/UX **before** backend work.

### Must deliver

- [x] React Router and page shell (top bar + left sidebar + main)
- [x] Home page with brand presence and **make / model / year** search form
- [x] Sidebar navigation for parts categories and automotive info
- [x] Catalog results driven by MMY search and/or category
- [ ] Product detail page (SKU, specs, fitment, price, description)
- [ ] At least one info/article page pattern
- [x] Typed mock data in `src/data/` + `src/types/` matching [schema.md](./schema.md)
- [x] Light default theme + dark mode toggle
- [ ] Account stub (login placeholder) and mock past orders list
- [x] Orange/amber branding aligned with [design-system.md](./design-system.md)

### Explicitly out of scope

- Real authentication
- Real orders, payments, or inventory APIs
- Production database
- Full content CMS

### Acceptance

Customer can click through home → search/browse → product detail → account/orders stubs on light and dark themes and approve the overall storefront/catalog feel.

## Phase 2+ — Backend and accounts (later)

High level only until Phase 1 is approved:

- Persist catalog, vehicles, and fitment in a real database
- Auth for account access and order history
- Real order pipeline (guest browse remains available; ordering requirements TBD with customer)
- Replace mock `src/data/` modules with API clients without rewriting page structure

See [infrastructure.md](./infrastructure.md) for placeholder backend boundaries.

## Agent rules

- Default new work to Phase 1 constraints unless the user explicitly asks for Phase 2+.
- When Phase 1 checklist items complete, mark them here (or note completion in the PR) so agents do not re-scaffold the same foundations.
