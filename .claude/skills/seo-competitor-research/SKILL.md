---
name: seo-competitor-research
description: Find who outranks harmonygold.am for gold jewelry searches in Yerevan (English, Armenian, Russian) and compare their sites, structured data, map listings and content with ours to find the gaps worth closing. Use when the user asks about competitors, why another store ranks higher, or what to build next for SEO.
argument-hint: "[competitor URL or search term]"
context: fork
agent: seo-specialist
---

# Competitor research

Goal: a short list of competitors and a ranked list of gaps, saved to agent memory
(`competitors.md`). Focus: $ARGUMENTS (the keyword map's primary terms if empty).

## Steps

1. **Read** agent memory: `keywords.md` (run `seo-keyword-research` first if it
   is missing) and the previous `competitors.md`.
2. **Find competitors**: WebSearch the primary terms in each language. A competitor
   is a site that ranks in the top results for **two or more** of our terms — local
   jewelry stores and brands, not marketplaces or news. Note which map and listing
   sites (Google Maps, Yandex, local directories) show up — those are where the
   owner must be listed too.
3. **Inspect up to 5 competitors**, a few pages each with WebFetch. Record only
   what you saw:
   - Languages served and whether hreflang is present.
   - Home and category `<title>` / meta description — which terms they target.
   - JSON-LD types (`<script type="application/ld+json">`).
   - `robots.txt` and `sitemap.xml` present?
   - Content we lack: prices, gold price, size guides, care guides, blog, reviews,
     engagement/wedding pages, product pages.
   - Review count on their map listing, if the search result shows it.
4. **Compare** with harmonygold.am (fetch it the same way, or use `/seo-check live`).

## Rules

- Fetch politely: a few pages per site, nothing behind a login, respect robots.txt.
- Every claim cites the URL it came from. No guessed traffic, rankings or reviews.
- Never copy a competitor's text or photos into our copy.

## Output

Write `competitors.md` in agent memory (dated), then report:

1. Competitors — URL, why they count, their strongest SEO asset.
2. Gaps ranked by expected impact — each with the fix and who does it (code here,
   or the owner off-site).
3. What harmony already does better — keep it.
