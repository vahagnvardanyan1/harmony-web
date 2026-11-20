---
name: seo-local-business
description: Local search for the harmony boutique in Yerevan — schema.org JSON-LD (JewelryStore, BreadcrumbList, ItemList) built from the repo's own contact data, consistent name/address/phone, and the owner's off-site checklist (Google Business Profile, maps, reviews). Use when adding structured data, changing contact details or opening hours, or planning local ranking work.
user-invocable: false
---

# Local search for harmony

A single boutique ranks locally on three things: a complete map listing, the same
name / address / phone everywhere (NAP), and a site that confirms both. The site's
part is structured data and consistent copy.

## Source of truth — never retype these

| Data          | Source                                                        |
| ------------- | ------------------------------------------------------------- |
| Phone, links  | `src/constants/contact.ts` (`PHONE_DISPLAY`, `INSTAGRAM_URL`) |
| Address       | `contact.addressLines` in `messages/<locale>.json`            |
| Opening hours | `src/lib/opening-hours.ts` — export the open/close constants if JSON-LD needs them |
| Site URL      | `SITE_URL` in `src/constants/site.ts`                         |
| Name          | `harmony` (lower case is the brand)                           |

Not in the repo, so ask the owner before using them: geo coordinates, price range,
founding date, legal name. Never estimate them.

## JSON-LD

Render as a native `<script type="application/ld+json">` in a server component,
escaping `<` (`JSON.stringify(data).replace(/</g, "\\u003c")`) — see
`node_modules/next/dist/docs/01-app/02-guides/json-ld.md`. Build the objects in
`src/lib/seo/`, not in components, and render them with `src/components/JsonLd/JsonLd.tsx`.
Text is in the page's locale.

Type every builder with **`schema-dts`** (dev dependency, types only):
`(): WithContext<JewelryStore> => ({ … })`. Enum-like values use its types
(`DayOfWeek[]`, not `string[]`) — a typo then fails `pnpm typecheck` instead of
silently dropping the rich result. Never cast (`as`) to get past a schema-dts error;
fix the data.

| Page                    | Types                                                                 |
| ----------------------- | --------------------------------------------------------------------- |
| `[locale]` layout       | `JewelryStore`: `name`, `url`, `logo`, `image`, `telephone`, `address` (`PostalAddress`, `addressLocality: "Yerevan"`, `addressCountry: "AM"`), `openingHoursSpecification`, `sameAs: [INSTAGRAM_URL]`, `@id: SITE_URL + "/#store"` |
| `/jewelry`, categories  | `BreadcrumbList` from the page's `crumbs`; `ItemList` of product names and photo URLs |

No `Product` rich results: Google needs a price, review or rating for them, and the
site shows no prices. Revisit if prices are published.

Validate with the Rich Results Test (`https://search.google.com/test/rich-results`)
on the deployed URL; `/seo-check` confirms the JSON parses locally.

## Owner's off-site checklist

The agent can't do these — hand them over as to-dos, checked against what research
actually found:

- **Google Business Profile**: category "Jewelry store", the exact address lines
  above, phone, hours, website `https://harmonygold.am`, fresh product photos, reply
  to every review.
- **Other maps** used in Armenia (confirm which with `seo-competitor-research`
  before recommending): same NAP and hours.
- **Instagram bio**: link to the site; same address wording.
- **Tashir Trade Center**: ask for a listing and link on the mall's store directory.
- **Reviews**: ask happy customers in person; never buy or script reviews.
