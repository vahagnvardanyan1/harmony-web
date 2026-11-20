import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Noto_Sans_Armenian, Noto_Serif_Armenian, Raleway } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";

import { Footer } from "@/components/Footer/Footer";
import { GalleryProvider } from "@/components/Gallery/GalleryProvider";
import { Header } from "@/components/Header/Header";
import { JsonLd } from "@/components/JsonLd/JsonLd";
import { GOOGLE_SITE_VERIFICATION, SITE_URL } from "@/constants/site";
import { routing } from "@/i18n/routing";
import { SHARE_IMAGE } from "@/lib/seo/page-metadata";
import { storeJsonLd } from "@/lib/seo/store-json-ld";

import "../globals.css";

const cormorant = Cormorant_Garamond({ subsets: ["latin", "cyrillic"], weight: ["300", "400", "500"], style: ["normal", "italic"], variable: "--font-cormorant" });
const raleway = Raleway({ subsets: ["latin", "cyrillic"], weight: ["300", "400", "500", "600"], variable: "--font-raleway" });
const notoSansArmenian = Noto_Sans_Armenian({ subsets: ["armenian"], weight: ["300", "400", "500", "600"], variable: "--font-noto-sans-armenian" });
const notoSerifArmenian = Noto_Serif_Armenian({ subsets: ["armenian"], weight: ["300", "400"], variable: "--font-noto-serif-armenian" });

const FONT_VARIABLES = [cormorant, raleway, notoSansArmenian, notoSerifArmenian].map((font) => font.variable).join(" ");

export const generateStaticParams = () => routing.locales.map((locale) => ({ locale }));

export const viewport: Viewport = { themeColor: "#1e1d1d" };

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");

  return {
    metadataBase: new URL(SITE_URL),
    verification: { google: GOOGLE_SITE_VERIFICATION },
    title: { default: t("title"), template: "%s · harmony" },
    description: t("description"),
    openGraph: { type: "website", siteName: "harmony", title: t("title"), description: t("description"), images: [SHARE_IMAGE] },
    /* No title or description here: X falls back to each page's og: tags, so cards never show the home copy */
    twitter: { card: "summary_large_image" },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations("contact");
  const addressLines: string[] = t.raw("addressLines");

  return (
    <html lang={locale} className={FONT_VARIABLES}>
      <body>
        <JsonLd data={storeJsonLd({ locale, addressLines })} />
        <NextIntlClientProvider>
          <GalleryProvider>
            <Header />
            <main id="main">{children}</main>
            <Footer />
          </GalleryProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
