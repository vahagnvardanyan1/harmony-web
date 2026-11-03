import { Anchor } from "@/components/Anchor/Anchor";
import { Icon, type IconName } from "@/components/Icon/Icon";

const VARIANTS = {
  plain: "size-11 hover:bg-[rgb(127_110_80/.14)]",
  outlined: "size-13 border border-line hover:border-accent hover:text-accent",
} as const;

type IconLinkProps = { href: string; label: string; icon: IconName; variant?: keyof typeof VARIANTS; className?: string };

export const IconLink = ({ href, label, icon, variant = "plain", className }: IconLinkProps) => (
  <Anchor
    href={href}
    aria-label={label}
    className={`inline-grid shrink-0 place-items-center rounded-full text-inherit transition-colors duration-200 ${VARIANTS[variant]} ${className ?? ""}`}
  >
    <Icon name={icon} />
  </Anchor>
);
