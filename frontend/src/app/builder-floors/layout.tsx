import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://shrishyamassociate.com';

export const metadata: Metadata = {
  title: 'Luxury Builder Floors in Dwarka Delhi | 2, 3, 4, 5 BHK Floors | Shri Shyam Associate',
  description:
    'Explore luxury builder floors in Dwarka, New Delhi. Featuring dedicated stilt parking, private OTIS lift, Italian marble, modular kitchen & 100% freehold titles across Sector 6, 7, 8, 19, 21, and 23.',
  keywords: [
    'builder floor in Dwarka',
    'luxury builder floors Dwarka',
    '3 BHK builder floor Dwarka Sector 7',
    '4 BHK builder floor Dwarka Sector 6',
    '5 BHK builder floor Dwarka Sector 23',
    'freehold builder floor Delhi',
    'Shri Shyam Associate builder floors',
  ],
  alternates: {
    canonical: `${BASE_URL}/builder-floors`,
  },
  openGraph: {
    title: 'Luxury Builder Floors in Dwarka Delhi | Shri Shyam Associate',
    description: 'Verified luxury builder floors with private lifts, stilt parking & 3D virtual tours in Dwarka.',
    url: `${BASE_URL}/builder-floors`,
    siteName: 'Shri Shyam Associate',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: `${BASE_URL}/logo.png`, width: 1200, height: 630, alt: 'Luxury Builder Floors in Dwarka' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Builder Floors in Dwarka | Shri Shyam Associate',
    description: 'Explore 2, 3, 4, and 5 BHK luxury builder floors with verified freehold registry.',
    images: [`${BASE_URL}/logo.png`],
  },
};

const builderFloorJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${BASE_URL}/builder-floors#webpage`,
      url: `${BASE_URL}/builder-floors`,
      name: 'Luxury Builder Floors in Dwarka | Shri Shyam Associate',
      description: 'Exclusive collection of luxury builder floors with stilt parking and private lifts in Dwarka, Delhi.',
      isPartOf: { '@id': `${BASE_URL}/#website` },
      breadcrumb: { '@id': `${BASE_URL}/builder-floors#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${BASE_URL}/builder-floors#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Builder Floors', item: `${BASE_URL}/builder-floors` },
      ],
    },
  ],
};

export default function BuilderFloorsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(builderFloorJsonLd) }}
      />
      {children}
    </>
  );
}
