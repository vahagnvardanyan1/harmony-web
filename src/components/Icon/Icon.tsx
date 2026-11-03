import type { ReactNode } from "react";

const PATHS = {
  menu: <path d="M3 8h18M3 16h18" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  previous: <path d="M15 5l-7 7 7 7" />,
  next: <path d="M9 5l7 7-7 7" />,
  pause: <path d="M9 6v12M15 6v12" />,
  play: <path d="M8 5l11 7-11 7Z" />,
  pin: (
    <>
      <path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  phone: <path d="M6.6 3.5h2.6l1.4 4-2 1.3a11 11 0 0 0 6.6 6.6l1.3-2 4 1.4v2.6a2 2 0 0 1-2.1 2A16.5 16.5 0 0 1 4.6 5.6a2 2 0 0 1 2-2.1Z" />,
  whatsapp: (
    <>
      <path d="M4.5 19.5l1.2-3.6A8 8 0 1 1 8.6 18.4Z" />
      <path d="M9.2 8.6c.2-.4.6-.5.9-.4l.6.2.7 1.6-.6.8a6 6 0 0 0 2.4 2.4l.8-.6 1.6.7.2.6c.1.3 0 .7-.4.9-1.6.9-4-.3-5.3-1.6S8.3 10.2 9.2 8.6Z" />
    </>
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.8" cy="7.2" r=".6" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof PATHS;

/* Decorative only — the control around it carries the accessible name */
export const Icon = ({ name }: { name: IconName }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-none stroke-current stroke-[1.15]">
    {PATHS[name]}
  </svg>
);
