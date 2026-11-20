import type { Thing, WithContext } from "schema-dts";

/* Structured data is not code to run, so a plain script tag; "<" is escaped so catalog text can never close the tag */
export const JsonLd = ({ data }: { data: WithContext<Thing> | readonly WithContext<Thing>[] }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
);
