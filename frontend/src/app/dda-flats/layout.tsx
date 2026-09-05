import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://shrishyamassociate.com';

export const metadata: Metadata = {
  title: 'DDA Flats in Dwarka Delhi | LIG, MIG, HIG & SFS Flats | Shri Shyam Associate',
  description:
    'Verified DDA flats for sale in Dwarka, New Delhi. Buy 1, 2, 3 BHK DDA LIG, MIG, HIG, and SFS apartments with clear freehold conveyance deeds, open parks & excellent metro connectivity.',
  keywords: [
    'DDA flats in Dwarka',
    'DDA flats for sale Dwarka',
    'DDA MIG flat Dwarka Sector 6',
    'DDA HIG flat Dwarka Sector 19',
    'DDA SFS flats Dwarka',
    'freehold DDA flats Delhi',
    'Shri Shyam Associate DDA flats',
  ],
  alternates: {
    canonical: `${BASE_URL}/dda-flats`,
  },
  openGraph: {
    title: 'DDA Flats in Dwarka Delhi | Shri Shyam Associate',
    description: 'Verified DDA flats with clear freehold conveyance deeds across prime Dwarka sectors.',
    url: `${BASE_URL}/dda-flats`,
    siteName: 'Shri Shyam Associate',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: `${BASE_URL}/logo.png`, width: 1200, height: 630, alt: 'DDA Flats in Dwarka' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DDA Flats in Dwarka | Shri Shyam Associate',
    description: 'Explore verified DDA MIG & HIG flats across Dwarka sectors.',
    images: [`${BASE_URL}/logo.png`],
  },
};

const ddaJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${BASE_URL}/dda-flats#webpage`,
      url: `${BASE_URL}/dda-flats`,
      name: 'DDA Flats in Dwarka | Shri Shyam Associate',
      description: 'Directory of verified DDA flats, MIG, HIG and SFS apartments in Dwarka, Delhi.',
      isPartOf: { '@id': `${BASE_URL}/#website` },
      breadcrumb: { '@id': `${BASE_URL}/dda-flats#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${BASE_URL}/dda-flats#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'DDA Flats', item: `${BASE_URL}/dda-flats` },
      ],
    },
  ],
};

export default function DdaFlatsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ddaJsonLd) }}
      />
      {children}
    </>
  );
}
