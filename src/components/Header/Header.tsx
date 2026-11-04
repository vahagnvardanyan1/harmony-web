import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { GoldPriceBar } from "@/components/GoldPriceBar/GoldPriceBar";
import { Address } from "@/components/Address/Address";
import { IconLink } from "@/components/IconLink/IconLink";
import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher";
import { MobileMenu } from "@/components/MobileMenu/MobileMenu";
import { DIRECTIONS_URL, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_URL } from "@/constants/contact";
import { Link } from "@/i18n/navigation";
import { categoryHref } from "@/lib/catalog/categories";
import { CATEGORIES } from "@/lib/catalog/types";

import { HeaderShell } from "./HeaderShell";
import { NavLinks } from "./NavLinks";

/* Centred stacked logo with the category nav beneath — the Cartier-style layout the brand chose */
export const Header = async () => {
  const t = await getTranslations();
  const navItems = CATEGORIES.map((category) => ({ href: categoryHref(category), label: t(`categories.${category}.title`) }));

  return (
    <>
      <a href="#main" className="fixed -top-15 left-4 z-100 bg-gold px-4 py-2.5 text-charcoal no-underline focus:top-4">
        {t("chrome.skip")}
      </a>
      <HeaderShell>
        <GoldPriceBar />
        <div className="wrap grid h-17 grid-cols-[1fr_auto_1fr] items-center lg:h-19">
          <div className="flex items-center gap-1.5">
            <MobileMenu
              items={navItems}
              footer={
                <>
                  <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-gold">{t("chrome.footerBoutique")}</p>
                  <p className="mt-3 text-[13px] leading-relaxed text-on-dark-muted">
                    <Address />
                    <br />
                    {t("contact.hours")}
                  </p>
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <LanguageSwitcher />
                    <div className="flex gap-2">
                      <IconLink href={PHONE_HREF} label={PHONE_DISPLAY} icon="phone" variant="outlined" className="text-ivory" />
                      <IconLink href={WHATSAPP_URL} label="WhatsApp" icon="whatsapp" variant="outlined" className="text-ivory" />
                      <IconLink href={INSTAGRAM_URL} label="Instagram" icon="instagram" variant="outlined" className="text-ivory" />
                    </div>
                  </div>
                </>
              }
            />
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>
          </div>
          <Link href="/" aria-label="harmony gold jewelry">
            <Image
              src="/brand/harmony-stacked-gold.svg"
              alt=""
              width={131}
              height={50}
              loading="eager"
              className="h-9.5 w-auto transition-[height] duration-500 ease-soft lg:h-12.5 lg:group-data-scrolled:h-10"
            />
          </Link>
          <div className="flex items-center justify-end lg:gap-1.5">
            <IconLink href={DIRECTIONS_URL} label={t("contact.directions")} icon="pin" className="max-lg:w-9" />
            <IconLink href={WHATSAPP_URL} label="WhatsApp" icon="whatsapp" className="max-lg:w-9" />
            <IconLink href={INSTAGRAM_URL} label="Instagram" icon="instagram" className="max-lg:w-9" />
          </div>
        </div>
        <nav aria-label={t("chrome.mainNav")} className="hidden justify-center lg:flex">
          <NavLinks items={navItems} />
        </nav>
      </HeaderShell>
    </>
  );
};
