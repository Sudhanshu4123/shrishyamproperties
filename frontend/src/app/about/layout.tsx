import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Shri Shyam (Shri Shyam Associate) — Real Estate in Dwarka & Delhi",
  description:
    "Learn about Shri Shyam (Shri Shyam Associate / Shree Shyam Associates), Dwarka's premier real estate consultancy. Over a decade of excellence in verified luxury builder floors, DDA flats, society apartments, and commercial shops across Sector 6, 7, 8, 10, 19 & Dwarka Expressway.",
  keywords: [
    "Shri Shyam",
    "Shree Shyam",
    "Shri Shyam About",
    "About Shri Shyam Associate",
    "About Shree Shyam Associates",
    "Shri Shyam Property",
    "Shri Shyam Real Estate",
    "Real estate advisors Dwarka",
    "Property dealer Dwarka Sector 7",
    "Trusted property consultants Dwarka",
    "Shri Shyam Properties history",
    "Dwarka real estate agency",
    "Ramphal Chowk property consultants"
  ],
  alternates: {
    canonical: "https://shrishyamassociate.com/about",
  },
  openGraph: {
    title: "About Shri Shyam Associate — Dwarka's Trusted Real Estate Advisors",
    description:
      "Expert property advisory, 100% legal verification, and transparent real estate deals across Dwarka, New Delhi. Call +91 9911956274.",
    url: "https://shrishyamassociate.com/about",
    siteName: "Shri Shyam Associate",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://shrishyamassociate.com/logo.png",
        width: 1200,
        height: 630,
        alt: "About Shri Shyam Associate - Dwarka Real Estate",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Shri Shyam Associate — Dwarka Property Experts",
    description: "Learn about Dwarka's premier real estate consultancy with 100% legal verification.",
    images: ["https://shrishyamassociate.com/logo.png"],
  },
  other: {
    "geo.region": "IN-DL",
    "geo.placename": "Dwarka, New Delhi, Delhi NCR, India",
    "geo.position": "28.5823;77.0700",
    "ICBM": "28.5823, 77.0700",
    "DC.title": "About Shri Shyam Associate Real Estate Agency",
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
