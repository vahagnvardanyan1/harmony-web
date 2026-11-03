import type { ReactNode } from "react";

import { Anchor } from "@/components/Anchor/Anchor";

/* The quiet secondary action: small caps with an underline that draws away on hover */
export const TextLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <Anchor
    href={href}
    className="relative inline-flex min-h-11 items-center text-[11px] font-semibold uppercase tracking-[.26em] text-fg no-underline after:absolute after:inset-x-0 after:bottom-2.5 after:h-px after:origin-right after:bg-accent after:transition-transform after:duration-500 after:ease-soft hover:after:scale-x-0"
  >
    {children}
  </Anchor>
);
