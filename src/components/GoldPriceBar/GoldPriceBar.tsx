import { getLocale, getTranslations } from "next-intl/server";

import { getGoldPricesPerGram } from "@/lib/gold-price";

/* Slim strip above the header with today's market price of gold per gram */
export const GoldPriceBar = async () => {
  const [t, locale] = await Promise.all([getTranslations("goldPrice"), getLocale()]);
  // An outage of either price source hides the strip; the rest of the page must still render
  const prices = await getGoldPricesPerGram().catch((error: unknown) => {
    console.error("Gold price strip hidden: price lookup failed", error);
    return null;
  });
  if (!prices) return null;

  const amount = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });

  return (
    <p className="flex h-8 items-center justify-center gap-x-3 border-b border-gold-faint px-(--gutter) text-[11px] tracking-[.08em] text-on-dark-muted tabular-nums">
      <span className="max-sm:hidden">{t("label")}</span>
      <span aria-hidden="true" className="text-gold/50 max-sm:hidden">
        ·
      </span>
      {([585, 750] as const).map((purity) => (
        <span key={purity}>
          <span className="text-gold">{purity}</span> — {amount.format(prices[purity])} {t("unit")}
        </span>
      ))}
    </p>
  );
};
