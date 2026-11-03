---
paths:
  - "src/**/*.{ts,tsx}"
---

# Code conventions

The short list is in `AGENTS.md`; this file adds the reasoning and examples.

## Arrow functions, object arguments

```ts
// Correct
export const formatPrice = ({ amount, currency }: { amount: number; currency: string }) => …;

// Wrong — positional args make call sites unreadable and order-sensitive
export function formatPrice(amount: number, currency: string) { … }
```

Next.js route files (`page.tsx`, `layout.tsx`, `route.ts`, `not-found.tsx`, …)
keep `export default function` because the framework requires a default export.
Everything else uses named exports.

## Types

- `strict` is on. Use `unknown` over `any`, narrow instead of casting.
- `import type { X }` for type-only imports.
- `as const` objects instead of `enum`:

```ts
export const Status = { Idle: "idle", Loading: "loading", Failed: "failed" } as const;
export type Status = (typeof Status)[keyof typeof Status];
```

- Discriminated unions over optional-flag soup.

## Components

```
src/components/UserCard/
  UserCard.tsx       # UI only — props type + markup
```

Import from the file directly (`@/components/UserCard/UserCard`); no internal
barrel `index.ts` files.

- Server component unless it needs state, effects, handlers or browser APIs.
- Business logic goes into a hook (`src/hooks`) or a pure function (`src/lib`).
- Fetch data in server components; pass plain serializable props to client ones.

## Errors

- Validate data where it enters the system (route handlers, server actions,
  external API responses).
- Throw with context: name the operation that failed and include the cause.
- Never swallow an error in an empty `catch`.

## Logging

No `console.log` in committed code — `console.warn` / `console.error` only.
