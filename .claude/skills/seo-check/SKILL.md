---
name: seo-check
description: Audit what search engines see on harmonygold.am — titles, descriptions, canonicals, hreflang, Open Graph, h1, JSON-LD, image alt text, robots.txt and sitemap.xml — on every route in en, hy and ru, against a local production build or the live site. Use after SEO-related changes, before a release, or when the user asks for an SEO audit.
argument-hint: "[live]"
context: fork
agent: seo-specialist
---

# SEO check

Target: `$ARGUMENTS` — `live` audits `https://harmonygold.am`; empty audits a local
production build.

## 1. Serve the site

**Live**: skip to step 2 with `https://harmonygold.am`.

**Local**: a production build, because dev mode renders differently.

```bash
pgrep -fl "next dev"   # if anything prints: stop and ask — build and dev both write .next
pnpm build
pnpm start -p 3100     # run in the background; wait until http://localhost:3100 answers
```

## 2. Inspect

```bash
node .claude/skills/seo-check/scripts/inspect-site.mjs <base-url>
```

It prints JSON for every route × locale (including a 404 URL) plus `robots.txt`
and `sitemap.xml`. Routes come from `CATEGORIES`, so new categories are included.

## 3. Judge

Rules are in `seo-nextjs` and `seo-local-business`. Per page:

| Check            | Pass                                                              |
| ---------------- | ----------------------------------------------------------------- |
| status           | 200; the 404 URL returns 404 with `robots` noindex                |
| lang             | matches the locale                                                |
| title            | unique across pages, ≤ 60 chars, in the page language             |
| description      | unique, 120–160 chars                                             |
| canonical        | absolute, `https://harmonygold.am`, equals the page's own URL     |
| hreflang         | HTML has en, hy, ru, x-default; header count is 4                 |
| og               | absolute url and image; locale matches                            |
| h1Count          | exactly 1                                                         |
| jsonLd           | layout: `JewelryStore`; listings: `BreadcrumbList`; no INVALID    |
| imagesWithoutAlt | 0 (product photos need names; empty alt only for decoration)       |
| robots.txt       | 200, lists the sitemap                                            |
| sitemap.xml      | 200, 3 × (routes − 404) URLs                                      |

## 4. Report and clean up

Stop the `pnpm start` server you started. Report failures first, grouped by check,
ranked by impact (missing sitemap/canonical > titles > alt text), each with the
file to fix. Then a one-line pass count. Add dated notes to agent memory only for
decisions or recurring problems.
