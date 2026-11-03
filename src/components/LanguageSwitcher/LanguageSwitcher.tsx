"use client";

import { useLocale, useTranslations, type Locale } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";

/* Shown in the order Armenian visitors expect: their language first */
const LANGUAGES: readonly { locale: Locale; label: string }[] = [
  { locale: "hy", label: "ՀԱՅ" },
  { locale: "ru", label: "РУС" },
  { locale: "en", label: "EN" },
];

/* Same page, other language */
export const LanguageSwitcher = () => {
  const t = useTranslations("chrome");
  const current = useLocale();
  const pathname = usePathname();

  return (
    <div role="group" aria-label={t("language")} className="flex">
      {LANGUAGES.map(({ locale, label }) => (
        <Link
          key={locale}
          href={pathname}
          locale={locale}
          lang={locale}
          aria-current={locale === current ? "true" : undefined}
          className="inline-flex min-h-10 min-w-9 items-center justify-center px-1 text-[11px] font-medium tracking-[.12em] text-on-dark-muted no-underline hover:text-ivory aria-[current=true]:text-gold"
        >
          {label}
        </Link>
      ))}
    </div>
  );
};
