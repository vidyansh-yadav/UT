import { SITE } from "./seo";

export const organizationSchema = {

  "@context": "https://schema.org",

  "@type": "Organization",

  name: SITE.name,

  url: SITE.url,

  logo: `${SITE.url}/favicon.svg`,

  description: SITE.description

};