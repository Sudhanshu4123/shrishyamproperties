import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://shrishyamassociate.com';

export const metadata: Metadata = {
  title: 'Properties for Rent in Dwarka Delhi | Flats & Builder Floors | Shri Shyam Associate',
  description:
    'Verified properties for rent in Dwarka, New Delhi. Rent furnished & semi-furnished 2, 3, 4 BHK builder floors and society apartments near metro stations with zero brokerage hassle.',
  keywords: [
    'properties for rent in Dwarka',
    'flats for rent in Dwarka',
    'house for rent in Dwarka Sector 7',
    '2 BHK for rent Dwarka',
    '3 BHK for rent Dwarka',
    'builder floor for rent Dwarka',
    'Shri Shyam Associate rental property',
  ],
  alternates: {
    canonical: `${BASE_URL}/properties/for-rent`,
  },
  openGraph: {
    title: 'Properties for Rent in Dwarka Delhi | Shri Shyam Associate',
    description: 'Verified builder floors and apartments for rent across prime Dwarka sectors.',
    url: `${BASE_URL}/properties/for-rent`,
    siteName: 'Shri Shyam Associate',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: `${BASE_URL}/logo.png`, width: 1200, height: 630, alt: 'Properties for Rent in Dwarka' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Properties for Rent in Dwarka | Shri Shyam Associate',
    description: 'Verified residential rentals in Dwarka Sector 6, 7, 21, 23 & more.',
    images: [`${BASE_URL}/logo.png`],
  },
};

const categoryJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${BASE_URL}/properties/for-rent#webpage`,
      url: `${BASE_URL}/properties/for-rent`,
      name: 'Properties for Rent in Dwarka | Shri Shyam Associate',
      description: 'Directory of verified rental builder floors, flats and society apartments in Dwarka, Delhi.',
      isPartOf: { '@id': `${BASE_URL}/#website` },
      breadcrumb: { '@id': `${BASE_URL}/properties/for-rent#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${BASE_URL}/properties/for-rent#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Properties', item: `${BASE_URL}/properties` },
        { '@type': 'ListItem', position: 3, name: 'For Rent', item: `${BASE_URL}/properties/for-rent` },
      ],
    },
  ],
};

export default function ForRentLayout({ children }: { children: React.ReactNode }) {
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
