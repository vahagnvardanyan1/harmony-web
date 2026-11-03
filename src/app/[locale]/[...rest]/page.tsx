import { notFound } from "next/navigation";

/* Any URL no route claims still renders inside the localized layout, as the not-found page */
export default function CatchAllPage() {
  notFound();
}
