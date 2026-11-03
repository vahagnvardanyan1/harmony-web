import Image from "next/image";

import { Eyebrow, Lead, Title } from "@/components/Typography/Typography";
import { Link } from "@/i18n/navigation";
import type { Banner } from "@/lib/catalog/categories";

type Crumb = { href: string; label: string };

type ListingBannerProps = { eyebrow: string; title: string; lead: string; banner: Banner; crumbs: readonly Crumb[]; current?: string };

/* Phones: photo behind the copy. Desktop: copy left, photo right — portrait shots would over-zoom at full width */
export const ListingBanner = ({ eyebrow, title, lead, banner, crumbs, current }: ListingBannerProps) => {
  const frame = banner.framed
    ? "md:inset-auto md:left-[77.5%] md:top-1/2 md:aspect-[900/1612] md:h-[82%] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-arch"
    : "md:left-auto md:w-[45%]";

  return (
    <section aria-labelledby="listing-title" className="band relative grid min-h-[clamp(320px,46svh,480px)] grid-rows-[auto_1fr] overflow-hidden text-ivory md:h-[clamp(440px,58svh,600px)] md:min-h-0 md:grid-cols-[55%_45%]">
      <div className={`absolute inset-0 overflow-hidden ${frame}`}>
        <Image src={banner.src} alt="" fill preload sizes="(max-width: 768px) 100vw, 45vw" className="object-cover" style={{ objectPosition: banner.focus }} />
      </div>
      <div className="absolute inset-0 z-1 bg-linear-to-r from-[rgb(20_19_19/.72)] to-[rgb(20_19_19/.1)] md:hidden" />
      <div className="wrap relative z-2 md:col-start-1 md:mx-0 md:w-auto md:pl-[max(var(--gutter),calc((100vw-var(--max-content))/2))] md:pr-(--gutter)">
        <ol className="flex flex-wrap gap-2 pt-6 text-[11px] uppercase tracking-[.14em] text-ivory/75">
          {crumbs.map(({ href, label }) => (
            <li key={href} className="after:ml-2 after:opacity-50 after:content-['/'] last:after:content-none">
              <Link href={href} className="no-underline hover:text-ivory">
                {label}
              </Link>
            </li>
          ))}
          {current ? <li aria-current="page">{current}</li> : null}
        </ol>
      </div>
      <div className="wrap relative z-2 animate-rise self-end py-[clamp(40px,6vw,72px)] md:col-start-1 md:mx-0 md:w-auto md:self-center md:pb-12 md:pl-[max(var(--gutter),calc((100vw-var(--max-content))/2))] md:pr-(--gutter) md:pt-0">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Title as="h1" size="xl" id="listing-title">
          {title}
        </Title>
        <Lead>{lead}</Lead>
      </div>
    </section>
  );
};
