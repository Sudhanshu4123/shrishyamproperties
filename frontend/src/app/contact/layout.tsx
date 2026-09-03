import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Shri Shyam Associate — Property Dealer in Dwarka, New Delhi",
  description:
    "Get in touch with Shri Shyam Associate (Shree Shyam Associates) for property buying, selling, renting, or site visits in Dwarka, New Delhi & Dwarka Expressway. Call/WhatsApp +91 9911956274 or email shrishyamproperties001@gmail.com. Office at Dwarka Sector 7.",
  keywords: [
    "Shri Shyam",
    "Shree Shyam",
    "Shri Shyam Contact",
    "Shri Shyam Phone Number",
    "Shri Shyam Office",
    "Contact Shri Shyam Associate",
    "Contact Shree Shyam Associates",
    "Real estate agent contact Dwarka",
    "Dwarka Sector 7 property office",
    "Schedule property visit Dwarka",
    "Shri Shyam Properties phone number",
    "Property dealer near me Dwarka",
    "Ramphal Chowk property dealer contact"
  ],
  alternates: {
    canonical: "https://shrishyamassociate.com/contact",
  },
  openGraph: {
    title: "Contact Shri Shyam Associate — Dwarka Real Estate Office",
    description:
      "Schedule your site visit today. Direct assistance for luxury builder floors & flats in Dwarka. Call +91 9911956274.",
    url: "https://shrishyamassociate.com/contact",
    siteName: "Shri Shyam Associate",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://shrishyamassociate.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Contact Shri Shyam Associate",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Shri Shyam Associate — Real Estate Office Dwarka",
    description: "Book property visits, consult on luxury builder floors & society flats in Dwarka.",
    images: ["https://shrishyamassociate.com/logo.png"],
  },
  other: {
    "geo.region": "IN-DL",
    "geo.placename": "Dwarka, New Delhi, Delhi NCR, India",
    "geo.position": "28.5823;77.0700",
    "ICBM": "28.5823, 77.0700",
    "DC.title": "Contact Shri Shyam Associate Real Estate Agency",
    "DC.coverage": "Dwarka, New Delhi, Delhi NCR, India",
    "DC.creator": "Shri Shyam Associate",
    "ai-content-declaration": "human-verified-contact-details"
  }
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://shrishyamassociate.com/contact#webpage",
      "url": "https://shrishyamassociate.com/contact",
      "name": "Contact Shri Shyam Associate — Real Estate Office in Dwarka",
      "description": "Contact details, office address, phone number, and location map for Shri Shyam Associate in Dwarka Sector 7, New Delhi.",
      "isPartOf": {
        "@id": "https://shrishyamassociate.com/#website"
      },
      "mainEntity": {
        "@type": "RealEstateAgent",
        "name": "Shri Shyam Associate",
        "telephone": "+91 9911956274",
        "email": "shrishyamproperties001@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Dwarka Sector 7, Ramphal Chowk Area",
          "addressLocality": "Dwarka",
          "addressRegion": "New Delhi",
          "postalCode": "110075",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 28.5823,
          "longitude": 77.0700
        },
        "hasMap": "https://maps.google.com/?q=28.5823,77.0700",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "09:30",
            "closes": "20:30"
          }
        ]
      },
      "breadcrumb": {
        "@id": "https://shrishyamassociate.com/contact#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://shrishyamassociate.com/contact#breadcrumb",
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
          "name": "Contact Us",
          "item": "https://shrishyamassociate.com/contact"
        }
      ]
    }
  ]
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      {children}
    </>
  );
}
