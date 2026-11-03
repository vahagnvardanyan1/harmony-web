import type messages from "../../messages/en.json";
import type { routing } from "./routing";

/* Typed keys and locales for every next-intl call */
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
