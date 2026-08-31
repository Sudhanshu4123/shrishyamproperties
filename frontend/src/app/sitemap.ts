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

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/properties`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Dynamic property detail routes
  const propertyRoutes: MetadataRoute.Sitemap = properties
    .filter((prop) => prop.published !== false)
    .map((prop) => ({
      url: `${BASE_URL}/properties/${prop.slug || prop.id}`,
      lastModified: prop.createdAt ? new Date(prop.createdAt) : new Date(),
      changeFrequency: 'weekly',
      priority: prop.featured ? 0.85 : 0.75,
    }));

  // Purpose / Category routes
  const categories = ['Buy', 'Rent', 'Projects', 'Commercial'];
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/properties?purpose=${encodeURIComponent(cat)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Sector-specific landing URLs for local SEO
  const sectors = ['Sector 6', 'Sector 7', 'Sector 8', 'Sector 10', 'Sector 11', 'Sector 12', 'Sector 19', 'Sector 21', 'Sector 22', 'Sector 23', 'Dwarka Expressway'];
  const sectorRoutes: MetadataRoute.Sitemap = sectors.map((sec) => ({
    url: `${BASE_URL}/properties?sector=${encodeURIComponent(sec)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  return [...staticRoutes, ...categoryRoutes, ...sectorRoutes, ...propertyRoutes];
}
