import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://shrishyamassociate.com';

export const metadata: Metadata = {
  title: 'Properties for Sale in Dwarka Delhi | Verified Flats & Builder Floors | Shri Shyam Associate',
  description:
    'Browse verified properties for sale in Dwarka, New Delhi. 2, 3, 4, 5 BHK luxury builder floors, DDA flats & society apartments with clear freehold titles, bank loan approvals & 3D virtual tours.',
  keywords: [
    'properties for sale in Dwarka',
    'buy flat in Dwarka',
    'builder floors for sale Dwarka',
    'DDA flats for sale Dwarka',
    '3 BHK flat for sale Dwarka',
    '4 BHK builder floor Dwarka',
    'real estate for sale Dwarka Delhi',
    'Shri Shyam Associate properties for sale',
  ],
  alternates: {
    canonical: `${BASE_URL}/properties/for-sale`,
  },
  openGraph: {
    title: 'Properties for Sale in Dwarka Delhi | Shri Shyam Associate',
    description: 'Verified residential & luxury builder floors for sale across prime sectors in Dwarka.',
    url: `${BASE_URL}/properties/for-sale`,
    siteName: 'Shri Shyam Associate',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: `${BASE_URL}/logo.png`, width: 1200, height: 630, alt: 'Properties for Sale in Dwarka' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Properties for Sale in Dwarka | Shri Shyam Associate',
    description: 'Explore verified luxury builder floors and flats for sale in Dwarka with 3D tours.',
    images: [`${BASE_URL}/logo.png`],
  },
};

const categoryJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${BASE_URL}/properties/for-sale#webpage`,
      url: `${BASE_URL}/properties/for-sale`,
      name: 'Properties for Sale in Dwarka | Shri Shyam Associate',
      description: 'Directory of verified residential properties, builder floors and apartments for sale in Dwarka, Delhi.',
      isPartOf: { '@id': `${BASE_URL}/#website` },
      breadcrumb: { '@id': `${BASE_URL}/properties/for-sale#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${BASE_URL}/properties/for-sale#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Properties', item: `${BASE_URL}/properties` },
        { '@type': 'ListItem', position: 3, name: 'For Sale', item: `${BASE_URL}/properties/for-sale` },
      ],
    },
  ],
};

export default function ForSaleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryJsonLd) }}
      />
      {children}
    </>
  );
}
