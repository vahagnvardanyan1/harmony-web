import { getTranslations } from "next-intl/server";

import { ButtonLink } from "@/components/ButtonLink/ButtonLink";
import { Address } from "@/components/Address/Address";
import { IconLink } from "@/components/IconLink/IconLink";
import { OpenStatus } from "@/components/OpenStatus/OpenStatus";
import { Eyebrow, Title } from "@/components/Typography/Typography";
import { DIRECTIONS_URL, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_URL } from "@/constants/contact";

const CELL = "grid content-start justify-items-center gap-3 px-6 py-9 text-center";
const TERM = "text-[10px] font-semibold uppercase tracking-[.26em] text-accent";
const DETAIL = "font-serif text-[1.3rem] leading-normal";

/* Address, hours and phone, centred — the home page's last stop before the footer */
export const VisitSection = async () => {
  const t = await getTranslations();

  return (
    <section aria-labelledby="visit-title" className="band-light border-t border-line-faint py-[clamp(80px,11vw,160px)]">
      <div className="wrap reveal">
        <div className="text-center">
          <Eyebrow>{t("home.visitEyebrow")}</Eyebrow>
          <Title as="h2" id="visit-title">
            {t("home.visitTitle")}
          </Title>
          <OpenStatus />
        </div>
        <dl className="mt-14 grid divide-line-faint border-y border-line-faint max-md:divide-y md:grid-cols-3 md:divide-x">
          <div className={CELL}>
            <dt className={TERM}>{t("contact.addressLabel")}</dt>
            <dd className={DETAIL}>
              <Address />
            </dd>
          </div>
          <div className={CELL}>
            <dt className={TERM}>{t("contact.hoursLabel")}</dt>
            <dd className={DETAIL}>{t("contact.hours")}</dd>
          </div>
          <div className={CELL}>
            <dt className={TERM}>{t("contact.phoneLabel")}</dt>
            <dd className={DETAIL}>
              <a href={PHONE_HREF} className="no-underline hover:text-accent">
                {PHONE_DISPLAY}
              </a>
            </dd>
          </div>
        </dl>
        <div className="mt-12 flex items-center justify-center gap-2">
          <ButtonLink href={DIRECTIONS_URL} tone="charcoal" className="mr-4">
            {t("contact.directions")}
          </ButtonLink>
          <IconLink href={WHATSAPP_URL} label="WhatsApp" icon="whatsapp" variant="outlined" />
          <IconLink href={INSTAGRAM_URL} label="Instagram" icon="instagram" variant="outlined" />
        </div>
      </div>
    </section>
  );
};
