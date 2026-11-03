# harmony — gold jewelry, Yerevan

The website of **harmony**, a gold jewelry boutique at Tashir Trade Center, corner 243, Yerevan.

- **Home** — film hero, new arrivals, shop by type, one section per category, boutique details
- **Jewelry** — all pieces, plus a page per category: rings, earrings, bangles, pendants, sets
- **Product pop-up** — clicking a piece opens all its photos in a swipeable carousel
- **Three languages** — English (default, no URL prefix), Armenian (`/hy`), Russian (`/ru`)

Built with Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS 4 and next-intl. Every page is statically prerendered.

## Getting started

Requires Node 22.12+ and pnpm.

```bash
nvm use
pnpm install
pnpm dev          # http://localhost:3000
```

| Command          | Purpose                                   |
| ---------------- | ----------------------------------------- |
| `pnpm dev`       | Dev server                                |
| `pnpm build`     | Production build                          |
| `pnpm start`     | Serve the production build                |
| `pnpm lint`      | ESLint (`pnpm lint:fix` to auto-fix)      |
| `pnpm typecheck` | Generate route types, then `tsc --noEmit` |

## Common changes

- **Edit copy** — `messages/en.json`, `hy.json`, `ru.json` (same keys in all three).
- **Add a product** — add an entry to `src/lib/catalog/products.ts` and its photos to `public/images/<category>/<id>-1.jpg`, `-2.jpg`, … (1 is the studio shot, 2+ are styled).
- **Change a banner or category tile** — `src/lib/catalog/categories.ts`.
- **Contact details** — `src/constants/contact.ts`.

Conventions, structure and pitfalls for contributors and AI agents: [`AGENTS.md`](AGENTS.md).
