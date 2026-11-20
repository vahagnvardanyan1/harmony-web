import type { Locale } from "next-intl";
import type { DayOfWeek, JewelryStore, WithContext } from "schema-dts";

import { INSTAGRAM_URL, PHONE_DISPLAY } from "@/constants/contact";
import { SITE_URL } from "@/constants/site";
import { CLOSES_AT_MINUTE, OPENS_AT_MINUTE } from "@/lib/opening-hours";

import { SHARE_IMAGE } from "./page-metadata";
import { absoluteUrl, localizedUrl } from "./urls";

const EVERY_DAY: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const clockTime = (minuteOfDay: number) => `${String(Math.floor(minuteOfDay / 60)).padStart(2, "0")}:${String(minuteOfDay % 60).padStart(2, "0")}`;

/* The boutique as a map listing sees it; the name, address, phone and hours must match Google Business Profile word for word */
export const storeJsonLd = ({ locale, addressLines }: { locale: Locale; addressLines: readonly string[] }): WithContext<JewelryStore> => ({
  "@context": "https://schema.org",
  "@type": "JewelryStore",
  "@id": `${SITE_URL}/#store`,
  name: "harmony",
  url: localizedUrl({ path: "/", locale }),
  logo: absoluteUrl("/brand/harmony-icon-gold.svg"),
  image: absoluteUrl(SHARE_IMAGE.url),
  telephone: PHONE_DISPLAY,
  address: { "@type": "PostalAddress", streetAddress: addressLines.join(", "), addressLocality: "Yerevan", addressCountry: "AM" },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: EVERY_DAY,
    opens: clockTime(OPENS_AT_MINUTE),
    closes: clockTime(CLOSES_AT_MINUTE),
  },
  sameAs: [INSTAGRAM_URL],
});
