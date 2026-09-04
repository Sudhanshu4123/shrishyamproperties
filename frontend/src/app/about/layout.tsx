import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Shri Shyam Associate — Home Builder & Real Estate Advisors in Dwarka Sector 7 Delhi",
  description:
    "Learn about Shri Shyam Associate — Dwarka's trusted Home Builder and premier real estate consultancy headquartered at Shop No. 247, 2nd Floor, Vardhaman City Mall, Sector 7, Dwarka, Delhi 110077. Turnkey construction, verified luxury builder floors, DDA flats & society apartments.",
  keywords: [
    "Shri Shyam associate",
    "Shri Shyam Associate",
    "Home builder Dwarka",
    "Home builder Sector 7 Dwarka",
    "Shop no 247 2nd floor vardhaman city Mall",
    "Shri Shyam About",
    "About Shri Shyam Associate",
    "Shri Shyam Property",
    "Shri Shyam Real Estate",
    "Real estate advisors Dwarka",
    "Property dealer Dwarka Sector 7",
    "Dwarka real estate agency"
  ],
  alternates: {
    canonical: "https://shrishyamassociate.com/about",
  },
  openGraph: {
    title: "About Shri Shyam Associate — Home Builder & Real Estate Advisors Dwarka",
    description:
      "Turnkey home construction, luxury builder floors, 100% legal verification, and transparent deals at Shop No. 247, 2nd Floor, Vardhaman City Mall, Sector 7, Dwarka, Delhi 110077. Call +91 9911956274.",
    url: "https://shrishyamassociate.com/about",
    siteName: "Shri Shyam Associate",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://shrishyamassociate.com/logo.png",
        width: 1200,
        height: 630,
        alt: "About Shri Shyam Associate - Home Builder & Real Estate Dwarka",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Shri Shyam Associate — Home Builder & Property Experts Dwarka",
    description: "Learn about Dwarka's premier Home Builder & real estate consultancy with 100% legal verification.",
    images: ["https://shrishyamassociate.com/logo.png"],
  },
  other: {
    "geo.region": "IN-DL",
    "geo.placename": "Dwarka Sector 7, New Delhi, Delhi, India",
    "geo.position": "28.5823;77.0700",
    "ICBM": "28.5823, 77.0700",
    "DC.title": "About Shri Shyam Associate Home Builder & Real Estate Agency",
    "DC.coverage": "Dwarka, New Delhi, Delhi NCR, India",
    "DC.creator": "Shri Shyam Associate",
    "ai-content-declaration": "human-verified-agency-profile"
  }
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://shrishyamassociate.com/about#webpage",
      "url": "https://shrishyamassociate.com/about",
      "name": "About Shri Shyam Associate — Real Estate Advisory in Dwarka",
      "description": "Information about Shri Shyam Associate (Shree Shyam Associates), verified real estate consultants based in Dwarka Sector 7, New Delhi.",
      "isPartOf": {
        "@id": "https://shrishyamassociate.com/#website"
      },
      "about": {
        "@id": "https://shrishyamassociate.com/#organization"
      },
      "breadcrumb": {
        "@id": "https://shrishyamassociate.com/about#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://shrishyamassociate.com/about#breadcrumb",
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
          "name": "About Us",
          "item": "https://shrishyamassociate.com/about"
        }
      ]
    }
  ]
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      {children}
    </>
  );
}
