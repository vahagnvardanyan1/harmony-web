# seo-specialist memory

Index — keep under 200 lines. Detail goes in topic files, linked here.

- `keywords.md` — keyword map per page × locale (NOT yet researched — titles below were written without it)
- `competitors.md` — competitors and gaps (not yet researched)
- [seo-setup-2026-11-20.md](seo-setup-2026-11-20.md) — what the first seo-setup pass decided and why; before/after audit

## Decisions

- 2026-11-20 — Production domain is `https://harmonygold.am` (given by the owner;
  live on Vercel). Goal: best search visibility for gold jewelry in Yerevan, en/hy/ru.
- 2026-11-20 — SEO titles/descriptions live in `meta.*` keys, separate from UI headings
  (`categories.*`), so search copy can change without touching the design. Pattern:
  "Gold <Category> in Yerevan · harmony" and native equivalents. See [[seo-setup-2026-11-20]].
- 2026-11-20 — No `Product` JSON-LD (no prices, no product pages); listings use `ItemList`
  of name + studio photo. Revisit if prices or product pages arrive.

- 2026-11-20 — Sitemap lists pages only, no `images`. Owner questioned them; research:
  pages render photos via `/_next/image`, so original `/images/…` URLs were a second URL
  per photo (Google: "consistently reference the image with the same URL"); photos 3+
  open only in the JS pop-up with no landing page (Mueller 2018: Google Images needs the
  image *and* an indexed landing page). Revisit only if per-product pages are added.

- 2026-11-20 — Sitemap entries are plain `{ url }`: no hreflang alternates (HTML + Link
  header already declare them; Google: "no benefit" in using more than one method) and no
  lastmod/changefreq/priority (Google ignores the latter two; no accurate dates for lastmod).

## Status — local build, 2026-11-20 (after seo-setup, NOT yet deployed)

- All 21 pages × every seo-check row pass; robots.txt 200, sitemap 21 URLs (image entries removed later the same day, see Decisions).
- Live site still shows the old baseline until the owner deploys. Re-run `/seo-check live`
  after deploy, then submit the sitemap in Search Console / Yandex Webmaster.

## Open questions (ask the owner / research)

- Geo coordinates, price range, postal code, legal name — needed for richer `JewelryStore`. Unverified, never guess.
- Armenian: "ոսկյա" (current copy) vs "ոսկե" — which do people search? Needs `seo-keyword-research`.
- Is Google Business Profile claimed, and does its NAP match `contact.addressLines` exactly?
- Pendants has a single piece — thin page; more pieces or merge with sets? Owner's call.

## Known non-issues

- 404 HTML is an empty `__next_error__` shell (Cache Components resume) with no lang/title,
  but status 404 + `noindex` are correct, which is all crawlers use. Low priority.
- React writes `hrefLang` (camelCase); the inspect script now lower-cases attribute names.
