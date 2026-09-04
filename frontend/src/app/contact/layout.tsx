import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Shri Shyam Associate — Home Builder & Property Dealer in Dwarka Sector 7 Delhi",
  description:
    "Get in touch with Shri Shyam Associate — Professional Home Builder & premier real estate agency located at Shop No. 247, 2nd Floor, Vardhaman City Mall, Vaishali, Sector 7, Dwarka, Delhi 110077. Open 24 Hours. Call/WhatsApp: +91 9911956274.",
  keywords: [
    "Shri Shyam associate",
    "Shri Shyam Associate",
    "Home builder Dwarka",
    "Home builder Dwarka Sector 7",
    "Shop no 247 2nd floor vardhaman city Mall",
    "Vardhaman City Mall Dwarka Sector 7",
    "Shri Shyam Contact",
    "Shri Shyam Phone Number",
    "Shri Shyam Office",
    "Contact Shri Shyam Associate",
    "Real estate agent contact Dwarka",
    "Dwarka Sector 7 property office",
    "Schedule property visit Dwarka",
    "Shri Shyam Properties phone number"
  ],
  alternates: {
    canonical: "https://shrishyamassociate.com/contact",
  },
  openGraph: {
    title: "Contact Shri Shyam Associate — Home Builder & Real Estate Office Dwarka Sector 7",
    description:
      "Visit us at Shop No. 247, 2nd Floor, Vardhaman City Mall, Sector 7, Dwarka, Delhi 110077. Turnkey Home Construction & Luxury Builder Floors. Open 24 Hours. Call +91 9911956274.",
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
    title: "Contact Shri Shyam Associate — Home Builder & Real Estate Office Dwarka",
    description: "Book property visits, consult on home building & luxury builder floors in Dwarka.",
    images: ["https://shrishyamassociate.com/logo.png"],
  },
  other: {
    "geo.region": "IN-DL",
    "geo.placename": "Dwarka Sector 7, New Delhi, Delhi, India",
    "geo.position": "28.5823;77.0700",
    "ICBM": "28.5823, 77.0700",
    "DC.title": "Contact Shri Shyam Associate Home Builder & Real Estate Agency",
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
      "name": "Contact Shri Shyam Associate — Home Builder & Real Estate Office in Dwarka",
      "description": "Contact details, office address, phone number, and location map for Shri Shyam Associate in Shop No. 247, 2nd Floor, Vardhaman City Mall, Vaishali, Sector 7, Dwarka, Delhi 110077.",
      "isPartOf": {
        "@id": "https://shrishyamassociate.com/#website"
      },
      "mainEntity": {
        "@type": ["HomeAndConstructionBusiness", "RealEstateAgent", "LocalBusiness"],
        "name": "Shri Shyam associate",
        "legalName": "Shri Shyam Associate",
        "telephone": "+91 9911956274",
        "email": "shrishyamproperties001@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Shop No. 247, 2nd Floor, Vardhaman City Mall, Vaishali, Sector 7",
          "addressLocality": "Dwarka",
          "addressRegion": "Delhi",
          "postalCode": "110077",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 28.5823,
          "longitude": 77.0700
        },
        "hasMap": "https://maps.google.com/?q=Shop+no+247+2nd+floor+vardhaman+city+Mall+sector+7+dwarka+Delhi+110077",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "00:00",
            "closes": "23:59"
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
