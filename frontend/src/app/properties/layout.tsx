import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Properties for Sale & Rent in Delhi & Dwarka | Shri Shyam Associate",
  description:
    "Explore verified 2 BHK, 3 BHK, 4 BHK, 5 BHK luxury builder floors, DDA flats, CGHS societies, penthouses & commercial shops for sale and rent in Delhi, West Delhi, Dwarka & Dwarka Expressway with interactive 3D tours.",
  keywords: [
    "Properties in Delhi",
    "Flats for sale in Delhi",
    "Builder floors in Delhi",
    "Properties in Dwarka",
    "Flats for sale in Dwarka",
    "Builder floors Dwarka",
    "2 BHK flats Dwarka",
    "3 BHK builder floor Dwarka",
    "4 BHK luxury floor Dwarka",
    "5 BHK duplex penthouse Dwarka",
    "Rent flat in Dwarka",
    "Commercial shop in Dwarka",
    "Dwarka Sector 7 builder floor",
    "Dwarka Sector 6 builder floor",
    "Dwarka Sector 10 flats",
    "Dwarka Sector 19 luxury floor",
    "Dwarka Expressway properties",
    "Joyville Sector 102 Gurgaon"
  ],
  alternates: {
    canonical: "https://shrishyamassociate.com/properties",
  },
  openGraph: {
    title: "Properties for Sale & Rent in Delhi & Dwarka | Shri Shyam Associate",
    description:
      "Browse our full catalog of verified builder floors, society apartments, and commercial shops across Delhi and Dwarka. Call +91 9911956274.",
    url: "https://shrishyamassociate.com/properties",
    siteName: "Shri Shyam Associate",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://shrishyamassociate.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Properties in Dwarka - Shri Shyam Associate",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Properties in Dwarka Delhi | Shri Shyam Associate",
    description: "Browse verified 2, 3, 4, 5 BHK builder floors & flats for sale in Dwarka Delhi.",
    images: ["https://shrishyamassociate.com/logo.png"],
  },
  other: {
    "geo.region": "IN-DL",
    "geo.placename": "Dwarka, New Delhi, Delhi NCR, India",
    "geo.position": "28.5823;77.0700",
    "ICBM": "28.5823, 77.0700",
    "DC.title": "Properties for Sale & Rent in Dwarka & Delhi NCR",
    "DC.coverage": "Dwarka, New Delhi, Dwarka Expressway, Gurugram, India",
    "DC.creator": "Shri Shyam Associate",
    "ai-content-declaration": "human-verified-real-estate-listings"
  }
};

const propertiesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://shrishyamassociate.com/properties#webpage",
      "url": "https://shrishyamassociate.com/properties",
      "name": "Properties for Sale & Rent in Dwarka & Delhi NCR",
      "description": "Comprehensive portfolio of verified builder floors, apartments, penthouses and commercial spaces in Dwarka, New Delhi.",
      "isPartOf": {
        "@id": "https://shrishyamassociate.com/#website"
      },
      "breadcrumb": {
        "@id": "https://shrishyamassociate.com/properties#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://shrishyamassociate.com/properties#breadcrumb",
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
          "name": "Properties",
          "item": "https://shrishyamassociate.com/properties"
        }
      ]
    }
  ]
};

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(propertiesJsonLd) }}
      />
      {children}
    </>
  );
}
