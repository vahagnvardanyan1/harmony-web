# seo-specialist memory

Index — keep under 200 lines. Detail goes in topic files, linked here.

- `keywords.md` — keyword map per page × locale (not yet researched)
- `competitors.md` — competitors and gaps (not yet researched)

## Decisions

- 2026-11-20 — Production domain is `https://harmonygold.am` (given by the owner;
  live on Vercel). Goal: best search visibility for gold jewelry in Yerevan, en/hy/ru.

## Baseline audit — live site, 2026-11-20 (`/seo-check live`)

- `robots.txt` and `sitemap.xml` return 404.
- No `<link rel="canonical">` and no HTML hreflang on any page; hreflang only as the
  next-intl `Link` header (en, hy, ru, x-default).
- No `metadataBase`; no JSON-LD on any page.
- Descriptions too short everywhere (24–119 chars); category titles are just
  "Earrings · harmony" — no place or material terms.
- One `<h1>` per page. Product photos all have `alt=""` (name only on the button's
  `aria-label`).
- 404 pages return 404 with noindex, but the script saw no `lang` or `<title>` in
  their HTML — not yet investigated.
