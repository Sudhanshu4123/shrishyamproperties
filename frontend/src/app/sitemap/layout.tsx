import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTML Sitemap — All Properties, Sectors & Directory | Shri Shyam Associate",
  description:
    "HTML sitemap of Shri Shyam Associate. Browse verified luxury builder floors, DDA flats, society apartments and commercial spaces in Dwarka & Delhi NCR.",
  alternates: {
    canonical: "https://shrishyamassociate.com/sitemap",
  },
  openGraph: {
    title: "HTML Sitemap | Shri Shyam Associate",
    description: "Browse all property listings, sectors, categories, and information pages across Dwarka & Delhi NCR.",
    url: "https://shrishyamassociate.com/sitemap",
    siteName: "Shri Shyam Associate",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const sitemapJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://shrishyamassociate.com/sitemap#webpage",
      "url": "https://shrishyamassociate.com/sitemap",
      "name": "HTML Sitemap | Shri Shyam Associate",
      "description": "Comprehensive HTML sitemap and directory of all real estate pages, sectors, and properties.",
      "isPartOf": {
        "@id": "https://shrishyamassociate.com/#website"
      },
      "breadcrumb": {
        "@id": "https://shrishyamassociate.com/sitemap#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://shrishyamassociate.com/sitemap#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://shrishyamassociate.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Sitemap",
          "item": "https://shrishyamassociate.com/sitemap"
        }
      ]
    }
  ]
};

export default function SitemapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sitemapJsonLd) }}
      />
      {children}
    </>
  );
}
