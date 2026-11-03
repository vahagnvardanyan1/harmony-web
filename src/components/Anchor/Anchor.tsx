import type { ReactNode } from "react";

import { Link } from "@/i18n/navigation";

type AnchorProps = { href: string; className?: string; "aria-label"?: string; children: ReactNode };

/* Site pages go through the locale-aware Link; web links open in a new tab; tel: stays a plain link */
export const Anchor = ({ href, ...props }: AnchorProps) => {
  if (href.startsWith("http")) return <a href={href} target="_blank" rel="noopener" {...props} />;
  if (href.startsWith("tel:")) return <a href={href} {...props} />;
  return <Link href={href} {...props} />;
};
