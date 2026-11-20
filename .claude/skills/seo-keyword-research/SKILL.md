---
name: seo-keyword-research
description: Research what people search for when looking for gold jewelry in Yerevan — in English, Armenian and Russian — and map each search term to one page of harmonygold.am. Use when choosing titles, descriptions or headings, planning new pages, or when the user asks which keywords to target.
argument-hint: "[focus, e.g. rings or ru]"
context: fork
agent: seo-specialist
---

# Keyword research

Goal: a keyword map in agent memory (`keywords.md`) that tells every page which
search terms it targets, in each language. Focus: $ARGUMENTS (all pages if empty).

## Limits — state them in the report

No keyword tool (Ahrefs, Semrush, Google Search Console) is connected, so there are
**no search volumes**. Rank terms by evidence you saw: autocomplete, "People also
ask", related searches, what ranking pages use in their titles. Label each term
high / medium / low evidence. Never write a number you didn't fetch.

## Steps

1. **Read** agent memory (`keywords.md`) and the current titles, descriptions and
   `<h1>`s in `messages/*.json` — refresh the map, don't start over.
2. **Seed terms per language** from the catalog: category (rings, earrings, bangles,
   pendants, sets), material (gold, 585 / 750, diamonds, topaz, quartz), occasion
   (engagement, wedding, gift), place (Yerevan, Tashir). Collect each language's
   real variants:
   - **hy**: spelling variants and Latin-script Armenian, which many people type.
   - **ru**: case forms people actually type ("в Ереване", "купить").
   - **en**: tourists and the diaspora — "gold jewelry Armenia", "Yerevan jewelry store".
3. **Search** each seed with WebSearch in its language. Note autocomplete-style
   suggestions, related searches and which sites rank.
4. **Classify** intent: local-transactional ("купить золотое кольцо Ереван") beats
   informational ("what is 585 gold") for a boutique. Informational terms are
   content ideas, not page titles.
5. **Map** one primary term and 2–4 secondary terms to each page × locale. No two
   pages target the same primary term.

## Output

Write `keywords.md` in agent memory (dated), then report:

| Page | Locale | Primary term | Secondary terms | Evidence | Current title covers it? |
| ---- | ------ | ------------ | --------------- | -------- | ------------------------ |

Then: terms with no page yet (new page or content ideas), and the copy changes in
`messages/*.json` you recommend — written natively, within the length limits in
`seo-nextjs`.
