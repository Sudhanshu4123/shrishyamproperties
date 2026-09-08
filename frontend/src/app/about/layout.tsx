import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Shri Shyam Associate Dwarka Real Estate",
  description:
    "About Shri Shyam Associate: Trusted home builder and premier real estate advisory in Dwarka Sector 7 Delhi. Verified luxury builder floors & DDA flats.",
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
    title: "About Us | Shri Shyam Associate Dwarka",
    description:
      "Discover Shri Shyam Associate: Trusted home builder and real estate consultancy in Sector 7, Dwarka, New Delhi. Call: +91 9911956274.",
    url: "https://shrishyamassociate.com/about",
    siteName: "Shri Shyam Associate",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://shrishyamassociate.com/images/hero_luxury_villa_3d.png",
        width: 1200,
        height: 630,
        alt: "About Shri Shyam Associate - Home Builder & Real Estate Dwarka",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Shri Shyam Associate Dwarka",
    description: "Learn about Dwarka's premier Home Builder & real estate consultancy with 100% legal verification.",
    images: ["https://shrishyamassociate.com/images/hero_luxury_villa_3d.png"],
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
