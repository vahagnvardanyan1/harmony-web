import type { ReactNode } from "react";

export const Eyebrow = ({ children }: { children: ReactNode }) => (
  <p className="mb-5 text-[11px] font-medium uppercase tracking-[.34em] text-accent">{children}</p>
);

const TITLE_SIZES = {
  lg: "text-[clamp(2.5rem,4.8vw,4.4rem)] leading-[1.04] hy:leading-[1.15]",
  xl: "text-[clamp(3.2rem,7.4vw,7.2rem)] leading-[.98] hy:text-[clamp(2.4rem,5vw,4.6rem)] hy:leading-[1.15] ru:text-[clamp(2.8rem,6vw,5.6rem)]",
} as const;

/* Copy is stored lowercase (the brand voice); serif titles read as sentences */
export const Title = ({ as: Tag, size = "lg", id, children }: { as: "h1" | "h2"; size?: keyof typeof TITLE_SIZES; id?: string; children: ReactNode }) => (
  <Tag id={id} className={`font-serif font-light tracking-[-.012em] first-letter:uppercase hy:tracking-normal ${TITLE_SIZES[size]}`}>
    {children}
  </Tag>
);

export const Lead = ({ children }: { children: ReactNode }) => (
  <p className="mt-6 max-w-[46ch] text-[clamp(1rem,1.2vw,1.1rem)] leading-[1.8] text-muted">{children}</p>
);
