import { TextLink } from "@/components/TextLink/TextLink";
import { Eyebrow, Title } from "@/components/Typography/Typography";

type SectionHeadProps = { id: string; eyebrow: string; title: string; link: { href: string; label: string } };

export const SectionHead = ({ id, eyebrow, title, link }: SectionHeadProps) => (
  <div className="mb-[clamp(40px,5vw,72px)] flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
    <div>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Title as="h2" id={id}>
        {title}
      </Title>
    </div>
    <TextLink href={link.href}>{link.label}</TextLink>
  </div>
);
