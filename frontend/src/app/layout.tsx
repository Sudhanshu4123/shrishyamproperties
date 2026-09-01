import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const SEO_KEYWORDS = [
  // Brand Searches & User Intent Variants
  "Shri Shyam Associate",
  "Shri Shyam Associates",
  "Shree Shyam Associates",
  "Shree Shyam Associates Delhi",
  "Shri Shyam Associates New Delhi",
  "Shri Shyam Associates reviews",
  "Shri Shyam Associates new delhi reviews",
  "Shri Shyam Associates contact number",
  "Shri Shyam Associates number",
  "Shri Shyam Associates logo",
  "Shri Shyam Associates Dwarka Sector 12",
  "Shri Shyam Associates Dwarka Sector 7",
  "Shri Shyam Properties",
  "Shri Shyam Properties Dwarka",
  "Shri Shyam Properties Delhi",

  // Delhi-Wide Searches (High Volume)
  "real estate agent in Delhi",
  "property dealer in Delhi",
  "best property dealer in Delhi",
  "top real estate consultants in Delhi",
  "properties for sale in Delhi",
  "buy flat in Delhi",
  "builder floors in Delhi",
  "luxury builder floor in Delhi",
  "luxury apartments in Delhi",
  "buy 2 BHK flat in Delhi",
  "buy 3 BHK flat in Delhi",
  "buy 4 BHK flat in Delhi",
  "buy 5 BHK flat in Delhi",
  "ready to move flats in Delhi",
  "freehold property in Delhi",
  "commercial property for sale in Delhi",
  "shops for sale in Delhi",
  "real estate company Delhi NCR",
  "property for sale in West Delhi",
  "property dealer in West Delhi",
  "real estate agent in South West Delhi",

  // Dwarka & Micro-Market Specific
  "real estate agent in Dwarka",
  "property dealer in Dwarka New Delhi",
  "best property dealer near me Dwarka",
  "property consultant in Dwarka",
  "real estate consultants Dwarka Delhi",
  "properties for sale in Dwarka",
  "buy flat in Dwarka",
  "builder floors in Dwarka",
  "luxury builder floor in Dwarka",
  "luxury builder floor Dwarka Sector 7",
  "Dwarka Sector 6 builder floors",
  "Dwarka Sector 8 builder floor",
  "Dwarka Sector 10 builder floors",
  "Dwarka Sector 11 real estate",
  "Dwarka Sector 12 apartments",
  "Dwarka Sector 14 property dealer",
  "Dwarka Sector 19 builder floors",
  "Dwarka Sector 21 apartments",
  "Dwarka Sector 22 apartments",
  "Dwarka Sector 23 flats",
  "Ramphal Chowk property dealer",
  "DDA flats in Dwarka Sector 6",
  "DDA flats in Dwarka for sale",
  "buy 2 BHK in Dwarka",
  "buy 3 BHK in Dwarka",
  "buy 4 BHK in Dwarka",
  "buy 5 BHK luxury floor Dwarka",
  "society flats in Dwarka",
  "CGHS society apartments Dwarka",
  "commercial shops for sale in Dwarka",
  "commercial property in Dwarka",
  "property for rent in Dwarka",
  "Dwarka Expressway properties",
  "Dwarka Expressway luxury flats",
  "ready to move flats in Dwarka",
  "freehold property in Dwarka",
  "penthouse in Dwarka Delhi",
  "verified properties Dwarka",
  "3D property tour Dwarka",
  "freehold plots in Dwarka",
  "MBR Enclave Dwarka properties"
];

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://shrishyamassociate.com'),
  title: {
    default: "Shri Shyam Associate (Shree Shyam Associates) — Best Property Dealer & Real Estate in Delhi & Dwarka",
    template: "%s | Shri Shyam Associate Delhi"
  },
  description:
    "Official Shri Shyam Associate (also known as Shree Shyam Associates) — Top-rated real estate consultancy in Delhi & Dwarka. Find 100% verified 2, 3, 4 & 5 BHK luxury builder floors, DDA flats, CGHS society apartments, and commercial shops. Verified reviews & direct contact: +91 9911956274.",
  keywords: SEO_KEYWORDS,
  authors: [{ name: "Shri Shyam Associate", url: "https://shrishyamassociate.com" }],
  creator: "Shri Shyam Associate",
  publisher: "Shri Shyam Associate",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: 'https://shrishyamassociate.com',
  },
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: "Shri Shyam Associate (Shree Shyam Associates) — Real Estate & Property Dealer in Dwarka",
    description:
      "Looking to buy, sell, or rent in Dwarka? Explore verified 2, 3, 4 & 5 BHK luxury builder floors, DDA flats & society apartments with 3D virtual tours. Call: +91 9911956274.",
    url: "https://shrishyamassociate.com",
    siteName: "Shri Shyam Associate",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://shrishyamassociate.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Shri Shyam Associate - Leading Property Dealer in Dwarka New Delhi",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shri Shyam Associate — Dwarka Real Estate Experts",
    description: "Verified luxury builder floors, DDA flats, and CGHS society apartments across Dwarka, New Delhi. Call: +91 9911956274.",
    images: ["https://shrishyamassociate.com/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    "geo.region": "IN-DL",
    "geo.placename": "Dwarka, New Delhi, Delhi NCR, India",
    "geo.position": "28.5823;77.0700",
    "ICBM": "28.5823, 77.0700",
    "DC.title": "Shri Shyam Associate (Shree Shyam Associates) — Real Estate Dwarka",
    "DC.creator": "Shri Shyam Associate",
    "DC.subject": "Real Estate Agency, Luxury Builder Floors, Flats for Sale, Dwarka Delhi",
    "DC.description": "Top-rated property dealer and real estate consultant in Dwarka Sector 7, New Delhi and Dwarka Expressway.",
    "DC.coverage": "Dwarka, New Delhi, Delhi NCR, Gurugram, India",
    "DC.language": "en-IN",
    "ai-content-declaration": "human-verified-real-estate"
  }
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["RealEstateAgent", "LocalBusiness", "ProfessionalService"],
      "@id": "https://shrishyamassociate.com/#organization",
      "name": "Shri Shyam Associate",
      "alternateName": [
        "Shree Shyam Associates",
        "Shri Shyam Associates",
        "Shri Shyam Properties",
        "Shri Shyam Properties Dwarka",
        "Shri Shyam Associate Delhi",
        "Shri Shyam Real Estate"
      ],
      "url": "https://shrishyamassociate.com",
      "logo": "https://shrishyamassociate.com/logo.png",
      "image": "https://shrishyamassociate.com/logo.png",
      "description": "Premier real estate consultancy & property advisory in Dwarka, New Delhi offering verified 2, 3, 4, 5 BHK luxury builder floors, DDA flats, CGHS society apartments, and commercial properties with 100% legal title verification.",
      "telephone": "+91 9911956274",
      "email": "shrishyamproperties001@gmail.com",
      "priceRange": "₹40 Lakhs - ₹10 Crore",
      "currenciesAccepted": "INR",
      "paymentAccepted": "Cash, Cheque, Bank Transfer, Home Loan",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "142",
        "bestRating": "5",
        "worstRating": "1"
      },
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
      ],
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "Dwarka Sector 1, New Delhi" },
        { "@type": "AdministrativeArea", "name": "Dwarka Sector 2, New Delhi" },
        { "@type": "AdministrativeArea", "name": "Dwarka Sector 3, New Delhi" },
        { "@type": "AdministrativeArea", "name": "Dwarka Sector 4, New Delhi" },
        { "@type": "AdministrativeArea", "name": "Dwarka Sector 5, New Delhi" },
        { "@type": "AdministrativeArea", "name": "Dwarka Sector 6, New Delhi" },
        { "@type": "AdministrativeArea", "name": "Dwarka Sector 7, New Delhi" },
        { "@type": "AdministrativeArea", "name": "Dwarka Sector 8, New Delhi" },
        { "@type": "AdministrativeArea", "name": "Dwarka Sector 9, New Delhi" },
        { "@type": "AdministrativeArea", "name": "Dwarka Sector 10, New Delhi" },
        { "@type": "AdministrativeArea", "name": "Dwarka Sector 11, New Delhi" },
        { "@type": "AdministrativeArea", "name": "Dwarka Sector 12, New Delhi" },
        { "@type": "AdministrativeArea", "name": "Dwarka Sector 13, New Delhi" },
        { "@type": "AdministrativeArea", "name": "Dwarka Sector 14, New Delhi" },
        { "@type": "AdministrativeArea", "name": "Dwarka Sector 16, New Delhi" },
        { "@type": "AdministrativeArea", "name": "Dwarka Sector 17, New Delhi" },
        { "@type": "AdministrativeArea", "name": "Dwarka Sector 18, New Delhi" },
        { "@type": "AdministrativeArea", "name": "Dwarka Sector 19, New Delhi" },
        { "@type": "AdministrativeArea", "name": "Dwarka Sector 21, New Delhi" },
        { "@type": "AdministrativeArea", "name": "Dwarka Sector 22, New Delhi" },
        { "@type": "AdministrativeArea", "name": "Dwarka Sector 23, New Delhi" },
        { "@type": "AdministrativeArea", "name": "Dwarka Sector 24, New Delhi" },
        { "@type": "AdministrativeArea", "name": "Ramphal Chowk, Dwarka" },
        { "@type": "AdministrativeArea", "name": "Dwarka Expressway, Gurugram" },
        { "@type": "AdministrativeArea", "name": "Sector 102, Dwarka Expressway" },
        { "@type": "AdministrativeArea", "name": "West Delhi" },
        { "@type": "AdministrativeArea", "name": "South West Delhi" },
        { "@type": "AdministrativeArea", "name": "Delhi NCR" }
      ],
      "knowsAbout": [
        "Luxury Builder Floors in Dwarka",
        "2 BHK, 3 BHK, 4 BHK Flats in Dwarka",
        "DDA SFS Flats Dwarka",
        "CGHS Society Flats Dwarka",
        "Commercial Retail Shops Dwarka",
        "Dwarka Expressway Residential Projects",
        "Property Freehold Title Verification",
        "Home Loan Assistance"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Dwarka Real Estate Catalog",
        "itemListElement": [
          {
            "@type": "OfferCatalog",
            "name": "Builder Floors in Dwarka",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "2 BHK Luxury Builder Floor Dwarka" } },
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "3 BHK Luxury Builder Floor Dwarka" } },
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "4 BHK Luxury Builder Floor Dwarka" } },
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "5 BHK Duplex Penthouse Dwarka" } }
            ]
          },
          {
            "@type": "OfferCatalog",
            "name": "CGHS Societies & DDA Apartments",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Ready to Move Society Flats Dwarka" } },
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "DDA MIG & HIG Apartments Dwarka" } }
            ]
          },
          {
            "@type": "OfferCatalog",
            "name": "Dwarka Expressway Luxury Projects",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "3 BHK & 4 BHK High-Rise Apartments Dwarka Expressway" } }
            ]
          }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://shrishyamassociate.com/#website",
      "url": "https://shrishyamassociate.com",
      "name": "Shri Shyam Associate",
      "publisher": {
        "@id": "https://shrishyamassociate.com/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://shrishyamassociate.com/properties?query={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://shrishyamassociate.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who is the best property dealer in Dwarka, New Delhi?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Shri Shyam Associate (also known as Shree Shyam Associates) is regarded as one of the most trusted and top-rated property consultants in Dwarka, New Delhi. Located in Sector 7 near Ramphal Chowk, they specialize in 100% verified luxury builder floors, DDA flats, CGHS society apartments, and Dwarka Expressway properties. Contact: +91 9911956274."
          }
        },
        {
          "@type": "Question",
          "name": "What is the starting price for 2 BHK, 3 BHK, and 4 BHK builder floors in Dwarka?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In Dwarka, 2 BHK builder floors typically start from ₹55 Lakhs to ₹95 Lakhs, 3 BHK luxury builder floors range from ₹1.25 Crore to ₹2.60 Crore, and spacious 4 BHK luxury floors range from ₹2.20 Crore to ₹4.50 Crore depending on the sector, floor, lift, and parking availability."
          }
        },
        {
          "@type": "Question",
          "name": "Which sectors in Dwarka are best for buying residential builder floors?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Dwarka Sector 6, Sector 7, Sector 8, Sector 10, Sector 11, Sector 12, Sector 19, and Sector 23 are among the most sought-after sectors for builder floors with dedicated lift, stilt parking, wide roads, and walking distance to metro stations."
          }
        },
        {
          "@type": "Question",
          "name": "Are the properties listed with Shri Shyam Associate verified and bank loan approved?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, 100% of properties listed with Shri Shyam Associate undergo strict document verification, freehold title checks, and physical inspections. All properties are eligible for home loans from leading banks including SBI, HDFC, and ICICI."
          }
        },
        {
          "@type": "Question",
          "name": "How can I schedule a site visit with Shri Shyam Associate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can schedule a free in-person site visit directly by calling or sending a WhatsApp message to +91 9911956274 or visiting the office in Dwarka Sector 7, Ramphal Chowk area."
          }
        }
      ]
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#f0f4f8]">
        {/* Google Tag Manager - Non blocking */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NKVPDWC6');`
          }}
        />
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NKVPDWC6"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
