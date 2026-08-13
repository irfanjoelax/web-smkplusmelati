import { CONTACT, SOCIALS } from "@/app/components/site";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://smkplusmelati.sch.id";

export const SITE_NAME = "SMK Plus Melati Samarinda";
export const SITE_TAGLINE = "Sekolah Kewirausahaan yang Bertakwa";

export const GOOGLE_SITE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION ?? "";

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: SITE_NAME,
  alternateName: "SMK Plus Melati",
  url: SITE_URL,
  logo: absoluteUrl("/icon.png"),
  image: absoluteUrl("/images/hero.jpg"),
  description:
    "Sekolah menengah kejuruan swasta keunggulan di Samarinda Seberang, Kalimantan Timur. Jurusan TKJ dan Tata Boga, program asrama dan keagamaan.",
  email: CONTACT.email,
  telephone: CONTACT.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. H.A.M. Rifaddin No 1 RT 25, Harapan Baru",
    addressLocality: "Samarinda",
    addressRegion: "Kalimantan Timur",
    postalCode: "75251",
    addressCountry: "ID",
  },
  sameAs: SOCIALS.map((s) => s.url),
};

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: `${SITE_NAME} — ${SITE_TAGLINE}.`,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  const crumbs = [{ name: "Beranda", path: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function programSchema({
  title,
  path,
  description,
}: {
  title: string;
  path: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    name: title,
    url: absoluteUrl(path),
    description,
    provider: {
      "@type": "EducationalOrganization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    educationalProgramMode: "onsite",
    offers: {
      "@type": "EducationalOccupationalCredential",
      name: "Ijazah SMK",
    },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}