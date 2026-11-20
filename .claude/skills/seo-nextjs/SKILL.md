---
name: seo-nextjs
description: How technical SEO is built in harmony-web (Next.js 16 + next-intl, three locales) — site URL and metadataBase, canonical and hreflang alternates, sitemap.ts, robots.ts, Open Graph, titles and descriptions per language, image alt text. Use when adding or changing a route, page metadata, the sitemap or robots file, or anything a search engine reads.
user-invocable: false
---

# Technical SEO in harmony-web

Read the bundled Next.js doc for an API before using it (paths below) — this Next
version differs from training data.

## Facts about this site (verified 2026-11-20)

- Production: `https://harmonygold.am`. English has no prefix (`/jewelry`), the
  others do (`/hy/jewelry`, `/ru/jewelry`).
- The next-intl middleware already sends hreflang as an HTTP `Link` header for
  en / hy / ru / x-default (`alternateLinks`, on by default). Keep it; HTML
  `<link rel="alternate">` tags are added on top for crawlers that read only HTML.
- Pages are statically prerendered (`next/root-params`, Cache Components). Nothing
  SEO-related may make them dynamic — no `headers()`, no `setRequestLocale`.

## Site URL

One constant, `SITE_URL` in `src/constants/site.ts` (create it if missing). Never
read the host from the request. Set `metadataBase: new URL(SITE_URL)` in the
`[locale]` layout's `generateMetadata`, so `/brand/og-image.png` resolves to an
absolute URL.

## Canonical and alternates

Every page's `generateMetadata` returns `alternates` for its locale-less path:

```ts
alternates: {
  canonical: getPathname({ href: path, locale }),
  languages: {
    ...Object.fromEntries(routing.locales.map((l) => [l, getPathname({ href: path, locale: l })])),
    "x-default": getPathname({ href: path, locale: routing.defaultLocale }),
  },
}
```

`getPathname` comes from `@/i18n/navigation`; it applies the `as-needed` prefix
rule. Build this once in `src/lib/seo/` when the third page needs it — not before.
The 404 page gets `robots: { index: false }` and no canonical.

## sitemap.ts and robots.ts

- `src/app/sitemap.ts`: every route × every locale, each entry with
  `alternates.languages` for its siblings. Routes come from `CATEGORIES`, never a
  hand-typed list. **No `images` entries** (decided 2026-11-20): pages show photos
  via `/_next/image`, so original-file URLs would give each photo a second URL
  (Google: "consistently reference the image with the same URL"), and pop-up
  photos have no landing page of their own. Revisit only with per-product pages.
- `src/app/robots.ts`: allow all, `sitemap: \`${SITE_URL}/sitemap.xml\``.
- Both sit outside `[locale]`, so they have no locale root param.

## Titles and descriptions

- Copy lives in `messages/{en,hy,ru}.json`, never in code. Write each language as a
  native speaker would search — not a literal translation. Use the terms from the
  keyword map in agent memory.
- Title ≤ 60 characters including the ` · harmony` template suffix. Description
  120–160 characters, says what is on the page and where (Yerevan, Tashir).
- One `<h1>` per page, matching the page's main search intent.

## Open Graph

`openGraph.locale` per page (`en_US`, `hy_AM`, `ru_RU`) and `alternateLocale` for
the other two. `url` = the canonical. The share image is `public/brand/og-image.png`.

## Images

Product photos carry the product name as `alt` (from the catalog, in the page
locale). Decorative images keep `alt=""`. Never rename photo files for keywords —
the catalog derives paths from product ids.

## Docs (in `node_modules/next/dist/docs/01-app/`)

| Topic                    | File                                                                 |
| ------------------------ | -------------------------------------------------------------------- |
| `generateMetadata`       | `03-api-reference/04-functions/generate-metadata.md`                 |
| sitemap / robots         | `03-api-reference/03-file-conventions/01-metadata/{sitemap,robots}.md` |
| OG images, icons         | `03-api-reference/03-file-conventions/01-metadata/opengraph-image.md`  |
| JSON-LD                  | `02-guides/json-ld.md`                                                |
| Internationalization     | `02-guides/internationalization.md`                                   |

After any change: `pnpm lint`, `pnpm typecheck`, then `/seo-check`.
