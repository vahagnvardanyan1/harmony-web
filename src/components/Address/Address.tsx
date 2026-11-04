import { getTranslations } from "next-intl/server";
import { Fragment } from "react";

/*
 * The boutique's address on two lines. Plain-text readers (link previews, copy-paste) ignore <br>,
 * so each line but the last ends with ", " — otherwise "corner 243" and "33 Movses Khorenatsi" read as "24333".
 */
export const Address = async () => {
  const t = await getTranslations("contact");
  const lines: string[] = t.raw("addressLines");

  return lines.map((line, index) => (
    <Fragment key={line}>
      {index > 0 ? <br /> : null}
      {index < lines.length - 1 ? `${line}, ` : line}
    </Fragment>
  ));
};
