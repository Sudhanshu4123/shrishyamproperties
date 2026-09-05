import { MetadataRoute } from 'next';
import { INITIAL_PROPERTIES } from '@/data/mockData';
import { BLOG_POSTS } from '@/data/blogData';
import { LOCATION_DETAILS } from '@/data/locationData';
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

  // 1. Static core & category routes (Canonical URLs)
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
      url: `${BASE_URL}/properties/for-sale`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
      images: [`${BASE_URL}/logo.png`],
    },
    {
      url: `${BASE_URL}/properties/for-rent`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [`${BASE_URL}/logo.png`],
    },
    {
      url: `${BASE_URL}/builder-floors`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [`${BASE_URL}/logo.png`],
    },
    {
      url: `${BASE_URL}/commercial-property`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
      images: [`${BASE_URL}/logo.png`],
    },
    {
      url: `${BASE_URL}/dda-flats`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
      images: [`${BASE_URL}/logo.png`],
    },
    {
      url: `${BASE_URL}/home-builder`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
      images: [`${BASE_URL}/logo.png`],
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
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
      priority: 0.8,
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

  // 2. Sector location landing routes
  const locationRoutes: MetadataRoute.Sitemap = Object.keys(LOCATION_DETAILS).map((slug) => ({
    url: `${BASE_URL}/locations/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: slug === 'dwarka' ? 0.9 : 0.85,
    images: [`${BASE_URL}/logo.png`],
  }));

  // 3. Blog articles routes
  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedDate),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
    images: [`${BASE_URL}${post.image.startsWith('/') ? '' : '/'}${post.image}`],
  }));

  // 4. Dynamic property detail routes
  const propertyRoutes: MetadataRoute.Sitemap = properties
    .filter((prop) => prop.published !== false)
    .map((prop) => {
      const imageUrl =
        prop.heroImage && prop.heroImage.startsWith('http')
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

  return [...staticRoutes, ...locationRoutes, ...blogRoutes, ...propertyRoutes];
}
