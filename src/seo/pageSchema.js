import { SITE } from "./seo";

export function createPageSchema(
  title,
  description,
  path = "/"
) {

  return {

    "@context": "https://schema.org",

    "@type": "WebPage",

    name: title,

    url: SITE.url + path,

    description

  };

}