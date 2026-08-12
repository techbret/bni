# Design System

Orange/amber automotive storefront with a catalog-first layout. Light theme is default; dark mode is supported.

## Brand

- **Product name:** BNI Torque Converter — treat as a hero-level signal on the home viewport (not only nav text).
- **Accent colors:** orange primary + amber secondary accents.
- **Existing tokens:** `--primary` and related oklch variables live in [`src/index.css`](../index.css). Extend or tune those tokens rather than inventing parallel color systems.
- **Base:** shadcn `base-mira` with olive base color; primary already leans orange — keep orange/amber as the brand accent.

## Theme

| Mode | Behavior |
|------|----------|
| Light | Default |
| Dark | Optional via existing `ThemeProvider` (class `.dark`) |
| System | Supported by provider; default app preference remains light |

Top bar should expose an obvious theme toggle.

## Typography

- Phase 1 uses **Inter Variable** (already wired in `index.css`).
- Prefer clear hierarchy: brand / page title → section heading → dense body and table text.
- Catalog density matters: avoid oversized marketing typography on list and detail screens.

## UI kit

- **shadcn/ui** + Tailwind CSS 4 + Lucide icons.
- Prefer existing shadcn patterns over custom chrome.
- Likely Phase 1 components: `Sidebar`, form controls (`Select`, `Input`, `Button`), `Table` and/or compact list rows for results, `Sheet`/`Drawer` for mobile nav, `Separator`, `Badge` for tags/stock.

Add components with:

```bash
npx shadcn@latest add <component>
```

## Layout (catalog-first)

Designed for a **heavy catalog of parts and information**, not a sparse marketing landing page.

1. **Top bar** — logo/brand, theme toggle, account link  
2. **Left sidebar** — sticky/collapsible; parts categories + automotive info links  
3. **Main content** — home MMY search, catalog results, product/article detail  

### Home (first viewport)

Keep the first viewport focused:

- Brand (BNI Torque Converter)
- One short supporting line (reman / custom converters, classic & 4WD)
- **MMY search form** as the primary CTA (make, model, year → catalog)
- Avoid cluttering the hero with stats, promo chips, or secondary marketing blocks

### Catalog results

- Scannable list or table: SKU, name, key specs, price, stock
- Filters that refine MMY or category results
- Cards only when they aid interaction; prefer dense rows for large result sets

### Product detail

- Name, SKU, price, stock
- Specs table
- Fitment list (vehicles this part covers)
- Description and images

### Account stubs

- Simple login placeholder and past-orders list using mock data
- Same shell (top bar + sidebar); no separate visual system

## Motion

Use light, purposeful motion (e.g. sidebar collapse, theme transition, result list fade-in). Avoid noisy decorative animation.

## Agent rules

- Do not switch to purple/indigo “AI default” themes or unrelated cream/serif looks.
- Do not replace the catalog shell with a generic e-commerce card grid as the primary browse pattern.
- When branding or layout conventions change after customer feedback, update this doc in the same PR.
