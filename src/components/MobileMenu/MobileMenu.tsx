"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef, type MouseEvent, type ReactNode } from "react";

import type { NavItem } from "@/components/Header/NavLinks";
import { Icon } from "@/components/Icon/Icon";
import { Link, usePathname } from "@/i18n/navigation";

type MobileMenuProps = { items: readonly NavItem[]; footer: ReactNode };

/* Full-height side sheet for small screens; any link inside navigates and closes it */
export const MobileMenu = ({ items, footer }: MobileMenuProps) => {
  const t = useTranslations("chrome");
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);

  /* showModal would focus the close button and draw its focus ring; focusing the sheet itself avoids that */
  const open = () => {
    dialogRef.current?.showModal();
    dialogRef.current?.focus();
  };

  const onClick = (event: MouseEvent<HTMLDialogElement>) => {
    const target = event.target as Element;
    if (target === event.currentTarget || target.closest("a")) event.currentTarget.close();
  };

  return (
    <>
      <button type="button" aria-label={t("menu")} onClick={open} className="grid size-11 place-items-center rounded-full lg:hidden">
        <Icon name="menu" />
      </button>
      {/* On phones the sheet fills the screen, so the backdrop is solid: iOS shows it under its floating toolbar */}
      <dialog
        ref={dialogRef}
        tabIndex={-1}
        aria-label={t("menu")}
        onClick={onClick}
        className="band fixed inset-y-0 left-0 m-0 h-dvh max-h-none w-[min(460px,100%)] max-w-none flex-col border-r border-gold-line p-0 outline-none open:flex open:animate-slide-in-left max-md:backdrop:bg-charcoal"
      >
        <div className="flex min-h-19 items-center justify-between border-b border-gold-faint pl-8 pr-5">
          <Image src="/brand/harmony-stacked-gold.svg" alt="harmony gold jewelry" width={105} height={40} loading="eager" className="h-9 w-auto" />
          <button
            type="button"
            aria-label={t("close")}
            onClick={() => dialogRef.current?.close()}
            className="grid size-11 place-items-center rounded-full border border-gold-line transition-colors hover:border-gold hover:text-gold"
          >
            <Icon name="close" />
          </button>
        </div>

        <nav aria-label={t("mainNav")} className="flex-1 overflow-y-auto px-8 py-6">
          {items.map(({ href, label }, index) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              style={{ animationDelay: `${120 + index * 60}ms` }}
              className="group flex animate-rise items-center justify-between border-b border-gold-faint py-4 font-serif text-[2rem] font-light leading-tight no-underline transition-colors hover:text-gold aria-[current=page]:text-gold"
            >
              {label}
              <span className="text-gold/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gold">
                <Icon name="next" />
              </span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-gold-faint px-8 pb-[max(28px,env(safe-area-inset-bottom))] pt-7">{footer}</div>
      </dialog>
    </>
  );
};
