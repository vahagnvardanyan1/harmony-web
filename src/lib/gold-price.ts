import { cacheLife } from "next/cache";

const TROY_OUNCE_GRAMS = 31.1034768;

/* Free, key-less sources: live gold in USD per troy ounce, and the Central Bank of Armenia's official USD rate */
const GOLD_USD_URL = "https://api.gold-api.com/price/XAU";
const CBA_RATES_URL = "https://api.cba.am/exchangerates.asmx";
const CBA_USD_REQUEST = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>
<ExchangeRatesLatestByISO xmlns="http://www.cba.am/"><ISO>USD</ISO></ExchangeRatesLatestByISO>
</soap:Body></soap:Envelope>`;

const fetchUsdPerOunce = async () => {
  const response = await fetch(GOLD_USD_URL);
  if (!response.ok) throw new Error(`Gold price request failed with HTTP ${response.status}`);
  const { price }: { price?: unknown } = await response.json();
  if (typeof price !== "number" || price <= 0) throw new Error(`Gold price response has no usable price: ${JSON.stringify(price)}`);
  return price;
};

const fetchAmdPerUsd = async () => {
  const response = await fetch(CBA_RATES_URL, {
    method: "POST",
    headers: { "Content-Type": "text/xml; charset=utf-8", SOAPAction: '"http://www.cba.am/ExchangeRatesLatestByISO"' },
    body: CBA_USD_REQUEST,
  });
  if (!response.ok) throw new Error(`Central Bank of Armenia rate request failed with HTTP ${response.status}`);
  const rate = Number((await response.text()).match(/<Rate>([\d.]+)<\/Rate>/)?.[1]);
  if (!(rate > 0)) throw new Error("Central Bank of Armenia response has no USD rate");
  return rate;
};

/* Market value of the gold in 585 and 750 alloys, in ֏ per gram — not the shop's selling price */
export const getGoldPricesPerGram = async () => {
  "use cache";
  cacheLife("hours");

  const [usdPerOunce, amdPerUsd] = await Promise.all([fetchUsdPerOunce(), fetchAmdPerUsd()]);
  const pureGoldPerGram = (usdPerOunce / TROY_OUNCE_GRAMS) * amdPerUsd;
  return { 585: Math.round(pureGoldPerGram * 0.585), 750: Math.round(pureGoldPerGram * 0.75) };
};
