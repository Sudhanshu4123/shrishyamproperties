import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Shri Shyam Associate — Real Estate Dwarka & Delhi',
    short_name: 'Shri Shyam',
    description: 'Premier real estate consultancy in Dwarka, New Delhi. Verified 2, 3, 4, 5 BHK luxury builder floors, DDA flats, society apartments & commercial shops.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f0f4f8',
    theme_color: '#0f766e',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
