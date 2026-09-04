import { MetadataRoute } from 'next';
import { INITIAL_PROPERTIES } from '@/data/mockData';
import { Property } from '@/types/property';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://shrishyamassociate.com';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

async function getAllProperties(): Promise<Property[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/properties`, {
      next: { revalidate: 3600 },
    }).catch(() => null);

    if (res && res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (error) {
    console.warn('Failed to fetch dynamic properties for sitemap, using fallback data:', error);
  }
  return INITIAL_PROPERTIES;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await getAllProperties();

  // Static core routes (Canonical URLs)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
      images: [`${BASE_URL}/logo.png`],
    },
    {
      url: `${BASE_URL}/properties`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
      images: [`${BASE_URL}/logo.png`],
    },
    {
      url: `${BASE_URL}/home-builder`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [`${BASE_URL}/logo.png`],
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      images: [`${BASE_URL}/logo.png`],
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
      images: [`${BASE_URL}/logo.png`],
    },
    {
      url: `${BASE_URL}/sitemap`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
      images: [`${BASE_URL}/logo.png`],
    },
  ];

  // Dynamic property detail routes (Canonical URLs for each verified listing)
  const propertyRoutes: MetadataRoute.Sitemap = properties
    .filter((prop) => prop.published !== false)
    .map((prop) => {
      const imageUrl = prop.heroImage && prop.heroImage.startsWith('http')
        ? prop.heroImage
        : prop.heroImage
        ? `${BASE_URL}${prop.heroImage.startsWith('/') ? '' : '/'}${prop.heroImage}`
        : `${BASE_URL}/logo.png`;

      return {
        url: `${BASE_URL}/properties/${prop.slug || prop.id}`,
        lastModified: prop.createdAt ? new Date(prop.createdAt) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: prop.featured ? 0.9 : 0.8,
        images: [imageUrl],
      };
    });

  return [...staticRoutes, ...propertyRoutes];
}

