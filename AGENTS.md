<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# harmony-web

Next.js 16 (App Router, Turbopack) + React 19 + TypeScript 5 (strict) + Tailwind CSS 4. Package manager: **pnpm**. Node **22.12+** (`.nvmrc`; run `nvm use`) — Tailwind 4's toolchain needs `require()` of ESM, which Node 20.18 lacks.

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
src/app/          # App Router routes, layouts, route handlers
src/components/   # Reusable UI, one component per directory
src/hooks/        # Custom React hooks (use* prefix)
src/lib/          # Pure logic, API clients, helpers
src/constants/    # App-wide constants
public/           # Static assets
```

`@/*` resolves to `./src/*`.

## Conventions

- **Server components by default.** Add `"use client"` only for hooks, event handlers or browser APIs, and push it as far down the tree as possible.
- **Arrow functions** — `const fn = () => {}`. Exception: Next.js route files (`page.tsx`, `layout.tsx`, `route.ts`, …) use `export default function`.
- **Object arguments** for functions with 2+ parameters: `getUser({ id, locale })`.
- **`import type`** for type-only imports.
- **`as const` objects** over `enum`.
- **Naming** — PascalCase components, `use`-prefixed camelCase hooks, UPPER_SNAKE_CASE constants.
- **No business logic in components** — move it to hooks or `src/lib`.
- **Styling** — Tailwind utility classes. No CSS-in-JS.
- **Comments explain why**, never what.
- No `any`, no `eslint-disable` without a reason on the same line.

## Pitfalls

- **Never run `pnpm build` while `pnpm dev` is running** — both write `.next` and break each other.
- Next 16 renamed `middleware.ts` to `proxy.ts`.
- `params` and `searchParams` are Promises in pages and layouts — `await` them.
- `.env*` files are gitignored; never commit secrets.

## MCP servers (`.mcp.json`)

- **next-devtools** — use `nextjs_docs` before writing Next.js code; with `pnpm dev` running, `nextjs_call` reads live build/runtime errors and routes.
- **react** — `search_guidelines` / `get_guidelines` for the team's React patterns before writing components or hooks.
