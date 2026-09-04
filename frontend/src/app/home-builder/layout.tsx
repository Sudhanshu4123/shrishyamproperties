import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Builder & Turnkey Construction in Dwarka Sector 7 Delhi | Shri Shyam Associate",
  description:
    "Top-rated Home Builder in Dwarka, Delhi. Shri Shyam Associate provides turnkey house construction, luxury builder floors development, structural additions, architectural design, and approvals at Shop No. 247, 2nd Floor, Vardhaman City Mall, Sector 7, Dwarka, Delhi 110077. Call: +91 9911956274.",
  keywords: [
    "Home builder in Dwarka",
    "Home builder Dwarka Sector 7",
    "Home builder Delhi",
    "Turnkey home construction Dwarka",
    "Luxury builder floor construction Dwarka",
    "Shri Shyam associate",
    "Shri Shyam Associate",
    "Shop no 247 2nd floor vardhaman city Mall",
    "House contractors Dwarka New Delhi",
    "Builder floor developer Dwarka Sector 7"
  ],
  alternates: {
    canonical: "https://shrishyamassociate.com/home-builder",
  },
  openGraph: {
    title: "Home Builder & Construction Services in Dwarka Sector 7 | Shri Shyam Associate",
    description:
      "Turnkey home construction, luxury builder floor execution, and structural additions in Dwarka, New Delhi. Office at Shop No. 247, 2nd Floor, Vardhaman City Mall, Sector 7. Call +91 9911956274.",
    url: "https://shrishyamassociate.com/home-builder",
    siteName: "Shri Shyam Associate",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://shrishyamassociate.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Home Builder Dwarka - Shri Shyam Associate",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Builder & Construction Services in Dwarka | Shri Shyam Associate",
    description: "Expert turnkey home construction and luxury builder floor development in Dwarka Sector 7, Delhi.",
    images: ["https://shrishyamassociate.com/logo.png"],
  },
  other: {
    "geo.region": "IN-DL",
    "geo.placename": "Dwarka Sector 7, New Delhi, Delhi, India",
    "geo.position": "28.5823;77.0700",
    "ICBM": "28.5823, 77.0700",
    "DC.title": "Shri Shyam Associate Home Builder & Construction Services",
    "DC.coverage": "Dwarka, New Delhi, Delhi NCR, India",
    "DC.creator": "Shri Shyam Associate",
    "ai-content-declaration": "human-verified-builder-profile"
  }
};

const homeBuilderJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["HomeAndConstructionBusiness", "GeneralContractor", "LocalBusiness"],
      "@id": "https://shrishyamassociate.com/home-builder#service",
      "url": "https://shrishyamassociate.com/home-builder",
      "name": "Shri Shyam associate — Home Builder",
      "legalName": "Shri Shyam Associate",
      "telephone": "+91 9911956274",
      "email": "shrishyamproperties001@gmail.com",
      "priceRange": "₹₹₹₹",
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
      ],
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "Dwarka Sector 7, New Delhi" },
        { "@type": "AdministrativeArea", "name": "Dwarka Sector 6, New Delhi" },
        { "@type": "AdministrativeArea", "name": "Dwarka Sector 8, New Delhi" },
        { "@type": "AdministrativeArea", "name": "Dwarka Sector 10, New Delhi" },
        { "@type": "AdministrativeArea", "name": "Dwarka Sector 11, New Delhi" },
        { "@type": "AdministrativeArea", "name": "Dwarka Sector 12, New Delhi" },
        { "@type": "AdministrativeArea", "name": "Dwarka Sector 14, New Delhi" },
        { "@type": "AdministrativeArea", "name": "Dwarka Sector 19, New Delhi" },
        { "@type": "AdministrativeArea", "name": "Dwarka Sector 21, New Delhi" },
        { "@type": "AdministrativeArea", "name": "Dwarka Sector 23, New Delhi" },
        { "@type": "AdministrativeArea", "name": "Delhi NCR" }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Home Builder & Construction Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Turnkey Luxury Builder Floor Construction" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Residential Plot Development & Elevation Design" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Structural Additions, Lift & Stilt Parking Integration" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Civil Construction, Approvals & Title Liaising" } }
        ]
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://shrishyamassociate.com/home-builder#breadcrumb",
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
          "name": "Home Builder",
          "item": "https://shrishyamassociate.com/home-builder"
        }
      ]
    }
  ]
};

export default function HomeBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeBuilderJsonLd) }}
      />
      {children}
    </>
  );
}
