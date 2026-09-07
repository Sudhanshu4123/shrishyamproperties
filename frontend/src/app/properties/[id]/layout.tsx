import type { Metadata } from 'next';
import { INITIAL_PROPERTIES } from '@/data/mockData';
import { Property } from '@/types/property';
import { getPropertySeo, extractSectorName } from '@/utils/propertySeo';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://shrishyamassociate.com';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export const dynamicParams = true;

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
      title: 'Verified Dwarka Property | Shri Shyam Associate',
      description: 'Explore verified builder floors, luxury apartments, and flats in Dwarka, Delhi. Call +91 9911956274.',
      alternates: {
        canonical: `${BASE_URL}/properties/${resolvedParams.id}`,
      },
    };
  }

  const seo = getPropertySeo(property);
  const canonicalUrl = `${BASE_URL}/properties/${property.slug || property.id}`;
  const heroImg = property.heroImage && property.heroImage.startsWith('http')
    ? property.heroImage
    : property.heroImage
    ? `${BASE_URL}${property.heroImage.startsWith('/') ? '' : '/'}${property.heroImage}`
    : `${BASE_URL}/images/hero_luxury_villa_3d.png`;

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    authors: [{ name: 'Shri Shyam Associate', url: BASE_URL }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      url: canonicalUrl,
      siteName: 'Shri Shyam Associate',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: heroImg,
          width: 1200,
          height: 630,
          alt: seo.cleanTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.metaTitle,
      description: seo.metaDescription,
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
  const seo = property ? getPropertySeo(property) : null;

  const propertySchema = property && seo
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": property.type === 'Builder Floor' ? 'SingleFamilyResidence' : 'Apartment',
            "@id": `${BASE_URL}/properties/${property.slug || property.id}#property`,
            "name": seo.cleanTitle,
            "description": seo.metaDescription,
            "image": property.images && property.images.length > 0 ? property.images : [property.heroImage],
            "url": `${BASE_URL}/properties/${property.slug || property.id}`,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": property.location || seo.societyName,
              "addressLocality": seo.sectorName,
              "addressRegion": "New Delhi",
              "postalCode": "110075",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 28.5823,
              "longitude": 77.0700
            },
            "numberOfRooms": property.bhk || 3,
            "numberOfBedrooms": property.bhk || 3,
            "numberOfBathroomsTotal": property.bathrooms || 2,
            "floorSize": {
              "@type": "QuantitativeValue",
              "value": property.areaSqFt || 1800,
              "unitCode": "FTK"
            },
            "amenityFeature": (property.amenities || ['24/7 Security', 'Lift Access', 'Reserved Parking']).map((amenity: string) => ({
              "@type": "LocationFeatureSpecification",
              "name": amenity,
              "value": true
            })),
            "offers": {
              "@type": "Offer",
              "price": property.priceValue || 0,
              "priceCurrency": "INR",
              "priceSpecification": {
                "@type": "UnitPriceSpecification",
                "price": property.priceValue || 0,
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
                "name": seo.cleanTitle,
                "item": `${BASE_URL}/properties/${property.slug || property.id}`
              }
            ]
          },
          {
            "@type": "FAQPage",
            "@id": `${BASE_URL}/properties/${property.slug || property.id}#faq`,
            "mainEntity": seo.faqs.map(f => ({
              "@type": "Question",
              "name": f.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer
              }
            }))
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
