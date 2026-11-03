import type { ReactNode } from "react";

import { Anchor } from "@/components/Anchor/Anchor";

/* Gold sits on charcoal surfaces, charcoal on ivory ones */
const TONES = {
  gold: "border-gold bg-gold text-charcoal before:bg-ivory hover:border-ivory",
  charcoal: "border-charcoal bg-charcoal text-ivory before:bg-deepgold hover:border-deepgold",
} as const;

type ButtonLinkProps = { href: string; tone: keyof typeof TONES; className?: string; children: ReactNode };

/* The one filled action per view; its fill sweeps up from the bottom on hover */
export const ButtonLink = ({ href, tone, className, children }: ButtonLinkProps) => (
  <Anchor
    href={href}
    className={`relative isolate inline-flex min-h-13 items-center justify-center overflow-hidden border px-8.5 text-[11px] font-semibold uppercase tracking-[.26em] no-underline before:absolute before:inset-0 before:-z-10 before:translate-y-[101%] before:transition-transform before:duration-450 before:ease-soft hover:before:translate-y-0 ${TONES[tone]} ${className ?? ""}`}
  >
    {children}
  </Anchor>
);
