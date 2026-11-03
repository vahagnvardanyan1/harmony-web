<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# harmony-web

Website of **harmony**, a gold jewelry boutique at Tashir Trade Center, Yerevan: home page, all jewelry, one page per category (rings, earrings, bangles, pendants, sets) and a product photo pop-up. Copy in English, Armenian and Russian.

Next.js 16 (App Router, Turbopack, Cache Components) + React 19 + TypeScript 5 (strict) + Tailwind CSS 4 + next-intl 4. Package manager: **pnpm**. Node **22.12+** (`.nvmrc`; run `nvm use`) — Tailwind 4's toolchain needs `require()` of ESM, which Node 20.18 lacks.

## Commands

| Command          | Purpose                                     |
| ---------------- | ------------------------------------------- |
| `pnpm install`   | Install dependencies from `pnpm-lock.yaml`  |
| `pnpm dev`       | Dev server on http://localhost:3000         |
| `pnpm build`     | Production build                            |
| `pnpm start`     | Serve the production build                  |
| `pnpm lint`      | ESLint (`pnpm lint:fix` to auto-fix)        |
| `pnpm typecheck` | Generate route types, then `tsc --noEmit`   |

Before calling work done: `pnpm lint` and `pnpm typecheck` pass with zero errors and zero warnings.

## Project structure

```
messages/{en,hy,ru}.json   # All UI copy, one file per locale (en is the source of keys)
src/app/[locale]/          # Routes: / · /jewelry · /jewelry/[category] · not-found · [...rest] catch-all
src/app/globals.css        # Tailwind 4 theme: brand tokens, band palettes, custom utilities
src/components/            # UI, one component per directory
src/hooks/                 # Client hooks (use* prefix)
src/i18n/                  # next-intl: routing, request config, navigation, typed AppConfig
src/lib/catalog/           # Products, categories, banners and photo helpers (static data)
src/lib/opening-hours.ts   # Open / closed in Yerevan time
src/constants/contact.ts   # Phone, WhatsApp, Instagram, directions
src/proxy.ts               # next-intl middleware (locale detection and prefixes)
public/brand/              # Logos (SVG) and og-image.png, the share image set in the [locale] layout metadata
public/images/<category>/  # Product photos: <product-id>-<n>.jpg, 1 = studio shot, 2+ = styled
public/images/sets/        # Group shots of whole sets
public/video/              # Home hero films and their posters
```

`@/*` resolves to `./src/*`.

## Localization (next-intl)

- Locales `en` (default), `hy`, `ru`; `localePrefix: "as-needed"` — English has no prefix (`/jewelry`), others do (`/hy/jewelry`). The middleware picks a locale from the `NEXT_LOCALE` cookie, then `Accept-Language`.
- `src/i18n/request.ts` reads the locale from `next/root-params`, so pages stay statically prerendered — don't add `setRequestLocale`.
- Server components: `getTranslations()` / `getLocale()` from `next-intl/server`. Client components: `useTranslations()` (the layout's `NextIntlClientProvider` passes messages down).
- Internal links use `Link` / `usePathname` from `@/i18n/navigation` with locale-less paths (`/jewelry/rings`); `Anchor` picks `Link` or `<a>` for you.
- Add a key to all three `messages/*.json` files. Keys are typed from `en.json` (`src/i18n/global.d.ts`).
- Product names live in the catalog (`name: { en, hy, ru }`), not in messages.

## Catalog and images

- `src/lib/catalog/products.ts` is the catalog, in display order. A piece has `photoCount` numbered photos in `public/images/<category>/`; a set lists its `photos` explicitly, a photo of the whole set first.
- Home category sections show styled photos only (`styledPhoto`); listing cards show the studio shot and swap to a styled one on hover.
- Every file in `public/` must be referenced — delete images you stop using.

## Styling

- Tailwind utilities only. Brand colours, fonts and easing are `@theme` tokens in `globals.css` (`text-gold`, `bg-charcoal`, `font-serif`, `ease-soft`, `rounded-arch`).
- Sections are bands: `band` (charcoal), `band-light` (ivory), `band-light-2` (darker ivory). Inside a band use the surface tokens `text-fg`, `text-muted`, `text-accent`, `border-line`, `bg-tile`, which follow the band.
- `wrap` is the page-width column; `reveal` fades content in on scroll (CSS only); `hy:` / `ru:` variants tune type per language.

## Conventions

- **Server components by default.** Add `"use client"` only for hooks, event handlers or browser APIs, and push it as far down the tree as possible.
- **Arrow functions** — `const fn = () => {}`. Exception: Next.js route files (`page.tsx`, `layout.tsx`, `route.ts`, …) use `export default function`.
- **Object arguments** for functions with 2+ parameters: `getUser({ id, locale })`.
- **`import type`** for type-only imports.
- **`as const` objects** over `enum`.
- **Naming** — PascalCase components, `use`-prefixed camelCase hooks, UPPER_SNAKE_CASE constants.
- **No business logic in components** — move it to hooks or `src/lib`.
- **Styling** — Tailwind utility classes and the tokens above. No CSS-in-JS, no new CSS files.
- **Comments explain why**, never what.
- No `any`, no `eslint-disable` without a reason on the same line.

## Pitfalls

- **Never run `pnpm build` while `pnpm dev` is running** — both write `.next` and break each other.
- Next 16 renamed `middleware.ts` to `proxy.ts`.
- `params` and `searchParams` are Promises in pages and layouts — `await` them.
- `.env*` files are gitignored; never commit secrets.
- With Cache Components, `dynamicParams` is not allowed: unknown params call `notFound()` in the page.
- `next start` keeps serving the old build until restarted — kill it before checking a new build.

## MCP servers (`.mcp.json`)

- **next-devtools** — use `nextjs_docs` before writing Next.js code; with `pnpm dev` running, `nextjs_call` reads live build/runtime errors and routes.
- **react** — `search_guidelines` / `get_guidelines` for the team's React patterns before writing components or hooks.
