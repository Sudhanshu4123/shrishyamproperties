import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Shri Shyam Associate — Home Builder & Real Estate Dwarka Sector 7 Delhi',
    short_name: 'Shri Shyam',
    description: 'Home Builder & real estate consultancy in Sector 7, Dwarka Delhi. Turnkey house construction, verified builder floors & DDA flats.',
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
