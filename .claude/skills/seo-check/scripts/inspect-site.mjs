#!/usr/bin/env node
// Prints what a crawler sees on every route × locale of a running harmony-web, as JSON.
// Usage: node inspect-site.mjs <base-url>   e.g. http://localhost:3100 or https://harmonygold.am
import { readFile } from "node:fs/promises";

const base = process.argv[2]?.replace(/\/$/, "");
if (!base) throw new Error("inspect-site: pass the base URL, e.g. http://localhost:3100");

// Routes follow the catalog, so a new category is audited without editing this script
const typesSource = await readFile(new URL("../../../../src/lib/catalog/types.ts", import.meta.url), "utf8");
const categoryList = typesSource.match(/CATEGORIES = \[([^\]]+)\]/)?.[1];
if (!categoryList) throw new Error("inspect-site: CATEGORIES not found in src/lib/catalog/types.ts");
const categories = [...categoryList.matchAll(/"([^"]+)"/g)].map(([, name]) => name);

const LOCALE_PREFIXES = ["", "/hy", "/ru"];
const ROUTES = ["/", "/jewelry", ...categories.map((category) => `/jewelry/${category}`), "/no-such-page"];

const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, value]));
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "g"))].map(([tag]) => attributes(tag));
const decode = (text) => text.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

const jsonLdTypes = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(([, body]) => {
    try {
      const data = JSON.parse(body);
      return [data].flat().map((item) => item["@type"]).join(",");
    } catch (error) {
      return `INVALID JSON: ${error.message}`;
    }
  });

const inspectPage = async (path) => {
  const response = await fetch(base + path, { redirect: "manual" });
  const html = await response.text();
  const head = html.split("</head>")[0];
  const meta = (key) => tags(head, "meta").find((m) => m.name === key || m.property === key)?.content;
  const title = decode(head.match(/<title[^>]*>([^<]*)<\/title>/)?.[1] ?? "");
  const description = decode(meta("description") ?? "");
  const links = tags(head, "link");

  return {
    path,
    status: response.status,
    lang: html.match(/<html[^>]*\blang="([^"]*)"/)?.[1],
    title: { text: title, length: title.length },
    description: { text: description, length: description.length },
    robots: meta("robots"),
    canonical: links.find((l) => l.rel === "canonical")?.href,
    hreflangHtml: links.filter((l) => l.rel === "alternate" && l.hreflang).map((l) => `${l.hreflang} ${l.href}`),
    hreflangHeader: (response.headers.get("link") ?? "").match(/hreflang="[^"]+"/g)?.length ?? 0,
    og: { url: meta("og:url"), locale: meta("og:locale"), image: meta("og:image") },
    h1Count: (html.match(/<h1\b/g) ?? []).length,
    jsonLd: jsonLdTypes(html),
    imagesWithoutAlt: tags(html, "img").filter((img) => !("alt" in img)).length,
    imagesWithEmptyAlt: tags(html, "img").filter((img) => img.alt === "").length,
  };
};

const inspectFile = async (path) => {
  const response = await fetch(base + path);
  const body = await response.text();
  return { path, status: response.status, urls: (body.match(/<loc>/g) ?? []).length, body: path === "/robots.txt" ? body : undefined };
};

const pages = [];
for (const prefix of LOCALE_PREFIXES) for (const route of ROUTES) pages.push(await inspectPage(prefix + (route === "/" && prefix ? "" : route)));

console.log(JSON.stringify({ base, pages, files: [await inspectFile("/robots.txt"), await inspectFile("/sitemap.xml")] }, null, 2));
