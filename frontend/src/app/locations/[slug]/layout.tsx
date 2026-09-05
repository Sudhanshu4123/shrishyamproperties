import type { Metadata } from 'next';
import { getLocationBySlug, LOCATION_DETAILS } from '@/data/locationData';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://shrishyamassociate.com';

export async function generateStaticParams() {
  return Object.keys(LOCATION_DETAILS).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const loc = getLocationBySlug(resolvedParams.slug);

  if (!loc) {
    return {
      title: 'Properties in Dwarka | Shri Shyam Associate',
      description: 'Verified real estate in Dwarka, New Delhi.',
    };
  }

  const canonicalUrl = `${BASE_URL}/locations/${loc.slug}`;

  return {
    title: loc.metaTitle,
    description: loc.metaDescription,
    keywords: [
      `property in ${loc.name}`,
      `flats in ${loc.name}`,
      `builder floor in ${loc.name}`,
      `property dealer in ${loc.name}`,
      'Shri Shyam Associate',
      'Dwarka Real Estate',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: loc.metaTitle,
      description: loc.metaDescription,
      url: canonicalUrl,
      siteName: 'Shri Shyam Associate',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/logo.png`,
          width: 1200,
          height: 630,
          alt: loc.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: loc.metaTitle,
      description: loc.metaDescription,
      images: [`${BASE_URL}/logo.png`],
    },
    other: {
      'geo.region': 'IN-DL',
      'geo.placename': `${loc.name}, New Delhi, India`,
      'geo.position': '28.5823;77.0700',
      'ICBM': '28.5823, 77.0700',
    },
  };
}

export default async function LocationLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const loc = getLocationBySlug(resolvedParams.slug);

  const locationSchema = loc
    ? {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebPage',
            '@id': `${BASE_URL}/locations/${loc.slug}#webpage`,
            url: `${BASE_URL}/locations/${loc.slug}`,
            name: loc.heading,
            description: loc.metaDescription,
            isPartOf: {
              '@id': `${BASE_URL}/#website`,
            },
            about: {
              '@type': 'Place',
              name: loc.name,
              address: {
                '@type': 'PostalAddress',
                addressLocality: loc.name,
                addressRegion: 'Delhi',
                addressCountry: 'IN',
              },
            },
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${BASE_URL}/locations/${loc.slug}#breadcrumb`,
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: BASE_URL,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Locations',
                item: `${BASE_URL}/locations/dwarka`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: loc.name,
                item: `${BASE_URL}/locations/${loc.slug}`,
              },
            ],
          },
          ...(loc.faqs && loc.faqs.length > 0
            ? [
                {
                  '@type': 'FAQPage',
                  '@id': `${BASE_URL}/locations/${loc.slug}#faq`,
                  mainEntity: loc.faqs.map((f) => ({
                    '@type': 'Question',
                    name: f.question,
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: f.answer,
                    },
                  })),
                },
              ]
            : []),
        ],
      }
    : null;

  return (
    <>
      {locationSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(locationSchema) }}
        />
      )}
      {children}
    </>
  );
}
