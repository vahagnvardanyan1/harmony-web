import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { IconLink } from "@/components/IconLink/IconLink";
import { DIRECTIONS_URL, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_URL } from "@/constants/contact";
import { Link } from "@/i18n/navigation";
import { categoryHref } from "@/lib/catalog/categories";
import { CATEGORIES } from "@/lib/catalog/types";

const HEADING = "mb-4.5 text-[10px] font-semibold uppercase tracking-[.28em] text-gold";
const BODY = "text-sm not-italic leading-[1.85] text-on-dark-muted";

export const Footer = async () => {
  const t = await getTranslations();

  return (
    <footer className="band pb-9">
      <div className="wrap">
        {/* The boutique column is sized to its longest line so the address and hours never wrap */}
        <div className="grid grid-cols-1 gap-12 border-t border-gold-faint pt-18 md:grid-cols-2 lg:grid-cols-[2fr_1fr_auto]">
          <div className="col-span-full justify-self-center lg:col-span-1 lg:justify-self-start">
            <Image src="/brand/harmony-stacked-gold.svg" alt="harmony gold jewelry" width={240} height={92} loading="eager" className="w-60" />
          </div>
          <div className="text-center md:text-left">
            <h2 className={HEADING}>{t("chrome.jewelry")}</h2>
            <ul className="grid gap-0.5">
              {CATEGORIES.map((category) => (
                <li key={category} className={BODY}>
                  <Link href={categoryHref(category)} className="inline-flex min-h-8.5 items-center no-underline hover:text-ivory">
                    {t(`categories.${category}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h2 className={HEADING}>{t("chrome.footerBoutique")}</h2>
            <address className={`${BODY} whitespace-nowrap`}>
              {t.raw("contact.addressLines").map((line: string) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="block">{t("contact.hours")}</span>
              <a href={PHONE_HREF} className="hover:text-ivory">
                {PHONE_DISPLAY}
              </a>
            </address>
            <div className="mt-4 flex justify-center gap-1 text-ivory md:-ml-3 md:justify-start">
              <IconLink href={DIRECTIONS_URL} label={t("contact.directions")} icon="pin" />
              <IconLink href={WHATSAPP_URL} label="WhatsApp" icon="whatsapp" />
              <IconLink href={INSTAGRAM_URL} label="Instagram" icon="instagram" />
            </div>
          </div>
        </div>
        <p className="mt-16 border-t border-gold-faint pt-6 text-center text-[11px] tracking-[.06em] text-on-dark-muted">{t("chrome.copyright")}</p>
      </div>
    </footer>
  );
};
