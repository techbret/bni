# Infrastructure

Current toolchain and boundaries for Phase 1 vs later backend work.

## Current stack

| Layer | Choice |
|-------|--------|
| Bundler | Vite 8 |
| UI | React 19 + TypeScript |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Components | shadcn/ui v4, style `base-mira`, `rsc: false` |
| Primitives | `@base-ui/react` |
| Icons | lucide-react |
| Fonts | `@fontsource-variable/inter` |
| Theme | `ThemeProvider` in `src/components/theme-provider.tsx` |
| Path alias | `@/` → `./src` (see `vite.config.ts`, `components.json`) |

Config references:

- [`package.json`](../../package.json)
- [`components.json`](../../components.json)
- [`vite.config.ts`](../../vite.config.ts)
- [`src/index.css`](../index.css)

## Scripts

| Script | Command |
|--------|---------|
| Dev | `npm run dev` |
| Build | `npm run build` |
| Lint | `npm run lint` |
| Format | `npm run format` |
| Typecheck | `npm run typecheck` |
| Preview | `npm run preview` |

## Adding shadcn components

```bash
npx shadcn@latest add button
```

Components land in `src/components/ui/`. Aliases are defined in `components.json`.

## Phase 1 non-goals

Do **not** introduce in Phase 1:

- Real database (Prisma, Drizzle, SQL, etc.)
- Auth provider (Clerk, Auth.js, Supabase Auth, etc.)
- Payments or checkout processing
- CMS or headless content platform
- Server-side rendering / Next.js migration

Phase 1 is a client SPA with mock data for UI/UX approval. See [phases.md](./phases.md).

## Future placeholders (Phase 2+)

Documented so agents do not invent conflicting backends:

| Concern | Direction (placeholder) |
|---------|-------------------------|
| API | REST or similar; keep `src/data/` as the swap point for fetch clients |
| Auth | Real login for account/orders; guests still browse without login |
| Orders | Persist order history per user; guest checkout/inquiry TBD with customer |
| Catalog | Replace mock vehicles/products/fitments with DB-backed queries |
| Images | Hosted assets / CDN instead of `/public` placeholders |

Exact vendors are undecided until after Phase 1 approval. Prefer updating this section when a vendor is chosen rather than hardcoding assumptions in UI code.

## Agent rules

- Prefer extending the Vite SPA over rewriting the stack unless explicitly requested.
- Keep secrets out of the repo (no `.env` with real credentials in Phase 1 mocks).
- Update this doc when toolchain or deployment assumptions change.
