import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://shrishyamassociate.com';

export const metadata: Metadata = {
  title: 'Real Estate Blog & Buying Guides in Dwarka Delhi | Shri Shyam Associate',
  description:
    'Expert real estate guides, property price trends, legal checklists, sector comparisons, and home buying tips for Dwarka, New Delhi by Shri Shyam Associate.',
  keywords: [
    'Dwarka real estate blog',
    'property guide Dwarka',
    'buy flat in Dwarka tips',
    'builder floors in Dwarka guide',
    'DDA flats vs builder floors',
    'best sectors in Dwarka',
    'property legal documents Delhi',
    'Shri Shyam Associate blog',
  ],
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
  openGraph: {
    title: 'Dwarka Real Estate Blog & Property Guides | Shri Shyam Associate',
    description:
      'In-depth real estate buying guides, legal checklists, sector comparisons, and property market insights for Dwarka, New Delhi.',
    url: `${BASE_URL}/blog`,
    siteName: 'Shri Shyam Associate',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: 'Shri Shyam Associate Real Estate Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dwarka Real Estate Insights & Guides | Shri Shyam Associate',
    description: 'Expert property buying guides, legal checklists & price trends in Dwarka.',
    images: [`${BASE_URL}/logo.png`],
  },
};

const blogJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${BASE_URL}/blog#webpage`,
      url: `${BASE_URL}/blog`,
      name: 'Real Estate Blog & Buying Guides | Shri Shyam Associate',
      description: 'Expert guides, price trends, and legal checklists for buying property in Dwarka, Delhi.',
      isPartOf: {
        '@id': `${BASE_URL}/#website`,
      },
      breadcrumb: {
        '@id': `${BASE_URL}/blog#breadcrumb`,
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${BASE_URL}/blog#breadcrumb`,
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
          name: 'Real Estate Blog',
          item: `${BASE_URL}/blog`,
        },
      ],
    },
  ],
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      {children}
    </>
  );
}
