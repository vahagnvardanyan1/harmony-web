---
name: seo-setup
description: Analyze harmony-web for SEO mistakes and fix them end to end — audit the code and the rendered pages, rank the problems, fix them in the codebase following the repo's conventions, then verify with a fresh audit. Use when the user asks to set up SEO, fix SEO, find SEO mistakes, or bring the site up to standard.
argument-hint: "[focus, e.g. metadata or structured-data]"
context: fork
agent: seo-specialist
---

# SEO setup: analyze, fix, verify

Focus: $ARGUMENTS (everything if empty). The rules for what "correct" means are in
the preloaded `seo-nextjs` and `seo-local-business` skills.

## 1. Baseline

1. Read agent memory: past audits, decisions, `keywords.md`.
2. Audit the rendered site by following steps 1–2 of
   `.claude/skills/seo-check/SKILL.md` (local production build). Save the JSON to
   the scratchpad — it is the "before".

## 2. Analyze the code

Check each item and record mistakes as `file:line — problem — fix`:

| Area            | Look for                                                                 |
| --------------- | ------------------------------------------------------------------------ |
| Site URL        | `SITE_URL` constant and `metadataBase` exist                             |
| Every page      | `generateMetadata` with title, description, canonical, `alternates.languages`, `openGraph` (`locale`, `url`) |
| Crawl files     | `src/app/sitemap.ts` (all routes × locales, from `CATEGORIES`), `src/app/robots.ts` |
| Not found       | 404 renders `<html lang>`, a title and noindex                           |
| Structured data | `JewelryStore` in the layout; `BreadcrumbList` / `ItemList` on listings  |
| Copy            | `meta` and category keys in all three `messages/*.json`: length limits, place and material terms, native wording per language, matches `keywords.md` |
| Headings        | one `<h1>` per page, a logical `h2`/`h3` order                           |
| Images          | product photos have the product name as `alt`; LCP image is eager with correct `sizes` |
| Links           | internal links use `Link` / `Anchor` with real `href`s (crawlable, no JS-only navigation) |
| Rendering       | pages stay static — nothing SEO-related calls `headers()` or `cookies()` |

## 3. Plan

Rank the mistakes: **critical** (pages can't be found or indexed correctly —
sitemap, robots, canonical), **high** (hreflang, structured data, titles),
**medium** (descriptions, alt text), **low** (polish). Facts the repo lacks
(coordinates, price range) go on a "needs the owner" list — never guessed.

## 4. Fix

Work from critical down, one concern at a time:

- Follow `AGENTS.md`: arrow functions, object arguments, server components, logic in
  `src/lib/seo/`, copy in all three `messages/*.json`.
- Read the bundled Next.js doc before each API you use.
- No new dependency without asking.
- After each concern: `pnpm lint` and `pnpm typecheck`, zero errors and warnings.

## 5. Verify

Rebuild and run the inspect script again (the `seo-check` steps). Every table row in
`.claude/skills/seo-check/SKILL.md` step 3 should pass; anything still failing gets
a reason. Stop the server you started.

## 6. Report

1. Before / after per check (counts are enough).
2. What changed, as `file:line`, grouped by concern.
3. What is left and why — including the "needs the owner" list and off-site to-dos.

Save the after-audit summary and any decisions to agent memory, dated. Never commit,
push or deploy — the user reviews the diff.
