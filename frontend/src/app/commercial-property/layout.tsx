import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://shrishyamassociate.com';

export const metadata: Metadata = {
  title: 'Commercial Property & Retail Shops for Sale in Dwarka Delhi | Shri Shyam Associate',
  description:
    'Buy and lease verified commercial property, retail shops, SCO plots, and office spaces in Dwarka, New Delhi. Prime commercial hubs including Sector 7 Ramphal Chowk, Sector 6, Sector 12, and Vardhaman Malls.',
  keywords: [
    'commercial property in Dwarka',
    'shops for sale in Dwarka',
    'office space for sale Dwarka',
    'retail shop in Ramphal Chowk',
    'Vardhaman City Mall shops',
    'commercial space Dwarka Sector 7',
    'SCO plots Dwarka',
    'Shri Shyam Associate commercial property',
  ],
  alternates: {
    canonical: `${BASE_URL}/commercial-property`,
  },
  openGraph: {
    title: 'Commercial Property in Dwarka Delhi | Shri Shyam Associate',
    description: 'Verified commercial shops, office spaces and retail showrooms in Dwarka.',
    url: `${BASE_URL}/commercial-property`,
    siteName: 'Shri Shyam Associate',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: `${BASE_URL}/logo.png`, width: 1200, height: 630, alt: 'Commercial Property in Dwarka' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Commercial Property in Dwarka | Shri Shyam Associate',
    description: 'Retail shops & office spaces with high footfall across Dwarka, Delhi.',
    images: [`${BASE_URL}/logo.png`],
  },
};

const commercialJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${BASE_URL}/commercial-property#webpage`,
      url: `${BASE_URL}/commercial-property`,
      name: 'Commercial Property & Retail Shops in Dwarka | Shri Shyam Associate',
      description: 'Directory of commercial properties, retail shops and office spaces in Dwarka, Delhi.',
      isPartOf: { '@id': `${BASE_URL}/#website` },
      breadcrumb: { '@id': `${BASE_URL}/commercial-property#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${BASE_URL}/commercial-property#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Commercial Property', item: `${BASE_URL}/commercial-property` },
      ],
    },
  ],
};

export default function CommercialLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(commercialJsonLd) }}
      />
      {children}
    </>
  );
}
