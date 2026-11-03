"use client";

import { Link, usePathname } from "@/i18n/navigation";

export type NavItem = { href: string; label: string };

export const NavLinks = ({ items }: { items: readonly NavItem[] }) => {
  const pathname = usePathname();

  return (
    <div className="flex h-11 gap-[clamp(20px,3vw,48px)]">
      {items.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          aria-current={pathname === href ? "page" : undefined}
          className="relative inline-flex items-center text-[11px] font-medium uppercase tracking-[.24em] text-on-dark-muted no-underline transition-colors after:absolute after:inset-x-0 after:bottom-2 after:h-px after:scale-x-0 after:bg-gold after:transition-transform after:duration-400 after:ease-soft hover:text-ivory hover:after:scale-x-100 aria-[current=page]:text-ivory aria-[current=page]:after:scale-x-100"
        >
          {label}
        </Link>
      ))}
    </div>
  );
};
