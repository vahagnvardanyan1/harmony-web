import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { ButtonLink } from "@/components/ButtonLink/ButtonLink";
import { Eyebrow, Lead, Title } from "@/components/Typography/Typography";

export default async function NotFound() {
  const t = await getTranslations();

  return (
    <section aria-labelledby="not-found-title" className="band relative overflow-hidden">
      <div className="wrap grid min-h-[calc(100svh-120px)] items-center gap-[clamp(48px,7vw,112px)] py-[clamp(64px,9vw,128px)] md:grid-cols-[1.1fr_.9fr]">
        <div className="animate-rise">
          <Eyebrow>{t("notFound.eyebrow")}</Eyebrow>
          <Title as="h1" size="xl" id="not-found-title">
            {t("notFound.title")}
          </Title>
          <Lead>{t("notFound.lead")}</Lead>
          <ButtonLink href="/" tone="gold" className="mt-10">
            {t("notFound.home")}
          </ButtonLink>
        </div>

        {/* The arch photo with an offset gold frame; a faint "404" sits behind it */}
        <div className="relative mx-auto w-[min(100%,420px)] animate-rise [animation-delay:200ms] max-md:w-[min(80%,320px)]">
          <span aria-hidden="true" className="absolute -top-[.42em] left-1/2 -translate-x-1/2 font-serif text-[clamp(7rem,16vw,15rem)] font-light leading-none text-gold/15">
            404
          </span>
          <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 rounded-arch border border-gold-line" />
          <div className="relative aspect-3/4 overflow-hidden rounded-arch bg-tile">
            <Image src="/images/rings/blue-halo-ring-3.jpg" alt="" fill sizes="(max-width: 768px) 80vw, 420px" className="object-cover" />
          </div>
          <Image src="/brand/harmony-icon-gold.svg" alt="" width={56} height={56} className="absolute -bottom-7 left-1/2 size-14 -translate-x-1/2 rounded-full bg-charcoal p-2" />
        </div>
      </div>
    </section>
  );
}
