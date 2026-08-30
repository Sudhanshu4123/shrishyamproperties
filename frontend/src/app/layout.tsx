import type { Metadata } from "next";
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
  "Shri Shyam Associate",
  "Shri Shyam Properties",
  "real estate agent in Dwarka",
  "property dealer in Dwarka New Delhi",
  "properties for sale in Dwarka",
  "builder floors in Dwarka",
  "luxury builder floor Dwarka Sector 7",
  "DDA flats in Dwarka Sector 6",
  "buy 2 BHK in Dwarka",
  "buy 3 BHK in Dwarka",
  "buy 4 BHK in Dwarka",
  "society flats in Dwarka",
  "CGHS society apartments Dwarka",
  "commercial shops for sale in Dwarka",
  "property for rent in Dwarka",
  "Dwarka Sector 7 properties",
  "Dwarka Sector 6 builder floor",
  "Dwarka Sector 10 flats",
  "Dwarka Sector 11 real estate",
  "Dwarka Sector 12 apartments",
  "Dwarka Sector 14 property dealer",
  "Dwarka Sector 19 builder floors",
  "Dwarka Sector 22 apartments",
  "Dwarka Sector 23 flats",
  "Dwarka Expressway properties",
  "ready to move flats in Dwarka",
  "freehold property in Dwarka",
  "penthouse in Dwarka Delhi",
  "property consultant Dwarka",
  "best property dealer near me Dwarka",
  "verified properties Dwarka",
  "3D property tour Dwarka"
];

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://shrishyamassociate.com'),
  title: {
    default: "Shri Shyam Associate — Premium Real Estate & Property Dealer in Dwarka, New Delhi",
    template: "%s | Shri Shyam Associate Dwarka"
  },
  description:
    "Shri Shyam Associate is the leading real estate agency in Dwarka, New Delhi. Explore verified 2, 3, 4 & 5 BHK luxury builder floors, DDA flats, CGHS society apartments, and commercial shops across Sector 6, 7, 10, 11, 12, 19, 22, 23 & Dwarka Expressway. Call +91 9911956274.",
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
    title: "Shri Shyam Associate — Premium Real Estate in Dwarka, New Delhi",
    description:
      "Buy, sell & rent verified 2, 3, 4 BHK luxury builder floors, DDA flats & society apartments in Dwarka. Direct transparent deals. Call: +91 9911956274.",
    url: "https://shrishyamassociate.com",
    siteName: "Shri Shyam Associate",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://shrishyamassociate.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Shri Shyam Associate - Dwarka Real Estate",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shri Shyam Associate — Dwarka Real Estate Experts",
    description: "Verified builder floors, DDA flats, and society apartments in Dwarka, New Delhi. Call: +91 9911956274.",
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
      "url": "https://shrishyamassociate.com",
      "logo": "https://shrishyamassociate.com/logo.png",
      "image": "https://shrishyamassociate.com/logo.png",
      "description": "Premier real estate agency specializing in luxury builder floors, DDA flats, society apartments, and commercial properties in Dwarka, New Delhi.",
      "telephone": "+91 9911956274",
      "email": "info@shrishyamassociate.com",
      "priceRange": "₹40 Lakhs - ₹10 Crore",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Shop No. 12, Main Market, Ramphal Chowk",
        "addressLocality": "Dwarka Sector 7",
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
          "opens": "09:00",
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
        }
      ]
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
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NKVPDWC6');`
          }}
        />
        {/* End Google Tag Manager */}
        <link rel="icon" href="/logo.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#f0f4f8]">
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
