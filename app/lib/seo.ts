import { CONTACT, SOCIALS } from "@/app/components/site";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://smkplusmelati.sch.id";

export const SITE_NAME = "SMK Plus Melati Samarinda";
export const SITE_TAGLINE = "SMK Wirausaha Muda";

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
    "Sekolah menengah kejuruan swasta keunggulan di Samarinda Seberang, Kalimantan Timur. Jurusan TJKT dan Kuliner, program asrama dan keagamaan.",
  email: CONTACT.email,
  telephone: CONTACT.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. H. A. M. M. Rifaddin No.1, RT.25, Harapan Baru, Loa Janan Ilir",
    addressLocality: "Samarinda",
    addressRegion: "Kalimantan Timur",
    postalCode: "75132",
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
  };
}

export function newsArticleSchema({
  title,
  description,
  path,
  image,
  publishedAt,
  modifiedAt,
}: {
  title: string;
  description: string;
  path: string;
  image: string;
  publishedAt: string;
  modifiedAt?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description,
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    image: [absoluteUrl(image)],
    datePublished: publishedAt,
    dateModified: modifiedAt ?? publishedAt,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "EducationalOrganization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/icon.png"),
      },
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
