import type { Metadata } from 'next';
import { INITIAL_PROPERTIES } from '@/data/mockData';
import { Property } from '@/types/property';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://shrishyamassociate.com';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

async function getPropertyData(idOrSlug: string): Promise<Property | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/properties/${idOrSlug}`, {
      next: { revalidate: 60 },
    }).catch(() => null);

    if (res && res.ok) {
      const data = await res.json();
      if (data && data.id) return data;
    }
  } catch (err) {
    // fallback below
  }

  const fallback = INITIAL_PROPERTIES.find(
    (p) => p.id === idOrSlug || p.slug === idOrSlug
  );
  return fallback || null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const property = await getPropertyData(resolvedParams.id);

  if (!property) {
    return {
      title: 'Property Details | Shri Shyam Associate',
      description: 'Verified real estate properties, luxury builder floors and flats in Dwarka, New Delhi.',
      alternates: {
        canonical: `${BASE_URL}/properties/${resolvedParams.id}`,
      },
    };
  }

  const canonicalUrl = `${BASE_URL}/properties/${property.slug || property.id}`;
  const heroImg = property.heroImage && property.heroImage.startsWith('http')
    ? property.heroImage
    : property.heroImage
    ? `${BASE_URL}${property.heroImage.startsWith('/') ? '' : '/'}${property.heroImage}`
    : `${BASE_URL}/logo.png`;

  const metaTitle = `${property.title} in ${property.sector} — For ${property.purpose} | Shri Shyam Associate`;
  const metaDesc = `Buy/Rent: ${property.title} in ${property.location}, ${property.sector}. Features: ${property.bhk} BHK, ${property.bathrooms} Baths, ${property.areaSqFt} Sq.Ft at ${property.priceDisplay}. 100% verified freehold with 3D virtual tour. Call: +91 9911956274.`;

  return {
    title: metaTitle,
    description: metaDesc,
    keywords: [
      property.title,
      `${property.bhk} BHK in ${property.sector}`,
      `${property.type} in ${property.sector}`,
      `Properties in ${property.sector}`,
      'Shri Shyam Associate',
      'Shri Shyam Properties Dwarka',
      'Dwarka Real Estate',
      'Verified Builder Floor Dwarka',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: canonicalUrl,
      siteName: 'Shri Shyam Associate',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: heroImg,
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDesc,
      images: [heroImg],
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
  };
}

export default async function PropertyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const property = await getPropertyData(resolvedParams.id);

  const propertySchema = property
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": property.type === 'Builder Floor' ? 'SingleFamilyResidence' : 'Apartment',
            "@id": `${BASE_URL}/properties/${property.slug || property.id}#property`,
            "name": property.title,
            "description": property.description || `${property.title} in ${property.location}, ${property.sector}`,
            "image": property.images && property.images.length > 0 ? property.images : [property.heroImage],
            "url": `${BASE_URL}/properties/${property.slug || property.id}`,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": property.location,
              "addressLocality": property.sector,
              "addressRegion": "New Delhi",
              "postalCode": "110075",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 28.5823,
              "longitude": 77.0700
            },
            "numberOfRooms": property.bhk,
            "numberOfBedrooms": property.bhk,
            "numberOfBathroomsTotal": property.bathrooms,
            "floorSize": {
              "@type": "QuantitativeValue",
              "value": property.areaSqFt,
              "unitCode": "FTK"
            },
            "amenityFeature": (property.amenities || []).map((amenity: string) => ({
              "@type": "LocationFeatureSpecification",
              "name": amenity,
              "value": true
            })),
            "offers": {
              "@type": "Offer",
              "price": property.priceValue,
              "priceCurrency": "INR",
              "priceSpecification": {
                "@type": "UnitPriceSpecification",
                "price": property.priceValue,
                "priceCurrency": "INR",
                "name": property.priceDisplay
              },
              "availability": "https://schema.org/InStock",
              "seller": {
                "@type": "RealEstateAgent",
                "name": "Shri Shyam Associate",
                "telephone": "+91 9911956274",
                "url": BASE_URL
              }
            }
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${BASE_URL}/properties/${property.slug || property.id}#breadcrumb`,
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": BASE_URL
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Properties",
                "item": `${BASE_URL}/properties`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": property.title,
                "item": `${BASE_URL}/properties/${property.slug || property.id}`
              }
            ]
          }
        ]
      }
    : null;

  return (
    <>
      {propertySchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(propertySchema) }}
        />
      )}
      {children}
    </>
  );
}
