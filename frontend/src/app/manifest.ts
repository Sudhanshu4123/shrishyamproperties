import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Shri Shyam Associate — Home Builder & Real Estate Dwarka Sector 7 Delhi',
    short_name: 'Shri Shyam',
    description: 'Premier Home Builder & real estate consultancy located at Shop No. 247, 2nd Floor, Vardhaman City Mall, Sector 7, Dwarka, Delhi 110077. Turnkey house construction, verified luxury builder floors & DDA flats.',
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
