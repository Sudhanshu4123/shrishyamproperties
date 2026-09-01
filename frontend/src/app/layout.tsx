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
  // Brand Searches
  "Shri Shyam Associate",
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
    default: "Shri Shyam Associate — Best Property Dealer & Real Estate in Delhi & Dwarka",
    template: "%s | Shri Shyam Associate Delhi"
  },
  description:
    "Shri Shyam Associate is the top-rated property dealer & real estate consultancy in Delhi & Dwarka. Find 100% verified 2, 3, 4 & 5 BHK luxury builder floors, DDA flats, CGHS society apartments, and commercial shops across Delhi, West Delhi, Dwarka & Dwarka Expressway with 3D tours. Call +91 9911956274.",
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
    title: "Shri Shyam Associate — Premium Real Estate & Property Dealer in Dwarka",
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
    "geo.placename": "Dwarka, New Delhi",
    "geo.position": "28.5823;77.0700",
    "ICBM": "28.5823, 77.0700"
  }
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["RealEstateAgent", "LocalBusiness", "ProfessionalService"],
      "@id": "https://shrishyamassociate.com/#organization",
      "name": "Shri Shyam Associate",
      "alternateName": "Shri Shyam Properties Dwarka",
      "url": "https://shrishyamassociate.com",
      "logo": "https://shrishyamassociate.com/logo.png",
      "image": "https://shrishyamassociate.com/logo.png",
      "description": "Premier real estate consultant in Dwarka, New Delhi offering verified luxury builder floors, DDA flats, CGHS society apartments, and commercial shops.",
      "telephone": "+91 9911956274",
      "email": "shrishyamproperties001@gmail.com",
      "priceRange": "₹40 Lakhs - ₹10 Crore",
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
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "09:30",
          "closes": "20:30"
        }
      ],
      "areaServed": [
        {
          "@type": "AdministrativeArea",
          "name": "Dwarka, New Delhi"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Dwarka Expressway"
        },
        {
          "@type": "AdministrativeArea",
          "name": "West Delhi"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Dwarka Real Estate Catalog",
        "itemListElement": [
          {
            "@type": "OfferCatalog",
            "name": "Builder Floors in Dwarka"
          },
          {
            "@type": "OfferCatalog",
            "name": "DDA & Society Apartments"
          },
          {
            "@type": "OfferCatalog",
            "name": "Commercial Properties in Dwarka"
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
          "name": "Which sectors in Dwarka are best for buying residential builder floors?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Dwarka Sector 6, Sector 7, Sector 8, Sector 10, Sector 19, and Sector 23 are among the most sought-after sectors for luxury builder floors with lift, car parking, and metro connectivity."
          }
        },
        {
          "@type": "Question",
          "name": "Are the properties listed with Shri Shyam Associate verified?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, 100% of properties listed with Shri Shyam Associate undergo strict document verification, title checks, and physical inspections."
          }
        },
        {
          "@type": "Question",
          "name": "How can I schedule a site visit with Shri Shyam Associate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can schedule a site visit directly by calling +91 9911956274 or clicking on the WhatsApp button on the website for instant assistance."
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
