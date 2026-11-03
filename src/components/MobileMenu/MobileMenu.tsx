"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef, type MouseEvent, type ReactNode } from "react";

import type { NavItem } from "@/components/Header/NavLinks";
import { Icon } from "@/components/Icon/Icon";
import { Link } from "@/i18n/navigation";

type MobileMenuProps = { items: readonly NavItem[]; extra: ReactNode };

/* Side sheet for small screens; any link inside navigates and closes it */
export const MobileMenu = ({ items, extra }: MobileMenuProps) => {
  const t = useTranslations("chrome");
  const dialogRef = useRef<HTMLDialogElement>(null);

  const onClick = (event: MouseEvent<HTMLDialogElement>) => {
    const target = event.target as Element;
    if (target === event.currentTarget || target.closest("a")) event.currentTarget.close();
  };

  return (
    <>
      <button type="button" aria-label={t("menu")} onClick={() => dialogRef.current?.showModal()} className="grid size-11 place-items-center rounded-full lg:hidden">
        <Icon name="menu" />
      </button>
      <dialog
        ref={dialogRef}
        aria-label={t("menu")}
        onClick={onClick}
        className="band fixed inset-y-0 left-0 m-0 h-full max-h-none w-[min(460px,100%)] max-w-none border-r border-gold-line p-0 open:animate-slide-in-left"
      >
        <div className="flex min-h-19 items-center justify-between border-b border-gold-line pl-8 pr-4">
          <Image src="/brand/harmony-stacked-gold.svg" alt="harmony gold jewelry" width={105} height={40} loading="eager" className="h-10 w-auto" />
          <button type="button" aria-label={t("close")} onClick={() => dialogRef.current?.close()} className="grid size-11 place-items-center rounded-full">
            <Icon name="close" />
          </button>
        </div>
        <nav aria-label={t("mainNav")} className="grid px-8 py-4">
          {items.map(({ href, label }) => (
            <Link key={href} href={href} className="border-b border-gold-faint py-3.5 font-serif text-[2.1rem] font-light no-underline">
              {label}
            </Link>
          ))}
        </nav>
        <div className="grid gap-4 px-8 pb-8 pt-6 text-sm text-on-dark-muted">{extra}</div>
      </dialog>
    </>
  );
};
