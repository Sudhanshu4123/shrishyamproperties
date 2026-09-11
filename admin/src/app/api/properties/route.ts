import { NextResponse } from 'next/server';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

function getPropertiesFilePath(): string {
  const cwd = process.cwd();
  const directPath = path.join(cwd, 'data', 'properties.json');
  if (existsSync(directPath)) return directPath;

  const parentPath = path.join(cwd, '..', 'data', 'properties.json');
  if (existsSync(parentPath)) return parentPath;

  return directPath;
}

async function getStoredProperties(): Promise<any[]> {
  const filePath = getPropertiesFilePath();
  try {
    if (existsSync(filePath)) {
      const data = await readFile(filePath, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error reading properties.json:', error);
  }
  return [];
}

async function persistProperties(properties: any[]): Promise<boolean> {
  const filePath = getPropertiesFilePath();
  try {
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, JSON.stringify(properties, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing properties.json:', error);
    return false;
  }
}

// 1. GET ALL OR FILTERED PROPERTIES
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all') === 'true';

    let list = await getStoredProperties();

    if (!all) {
      list = list.filter((p: any) => p.published !== false);
    }

    return NextResponse.json(list);
  } catch (error) {
    console.error('GET /api/properties error:', error);
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
  }
}

// 2. CREATE NEW PROPERTY
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title) {
      return NextResponse.json({ error: 'Property title is required' }, { status: 400 });
    }

    const currentProperties = await getStoredProperties();
    const id = body.id || `prop-${Date.now()}`;
    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now();

    const heroImage = body.heroImage || (Array.isArray(body.images) && body.images.length > 0 ? body.images[0] : '/images/luxury_builder_floor_dwarka_1786010981126.png');
    const images = Array.isArray(body.images) && body.images.length > 0 ? body.images : [heroImage];

    const newProperty = {
      id: String(id),
      title: body.title,
      slug: slug,
      purpose: body.purpose || 'Buy',
      type: body.propertyType || body.type || 'Builder Floor',
      priceDisplay: body.priceDisplay || '₹ Price on Request',
      priceValue: Number(body.priceValue) || 0,
      location: body.location || '',
      sector: body.sector || 'Dwarka Sector 7',
      bhk: Number(body.bhk) || 0,
      bathrooms: Number(body.bathrooms) || 0,
      areaSqFt: Number(body.areaSqFt) || 0,
      carpetAreaSqFt: Number(body.carpetAreaSqFt) || 0,
      floor: body.floor || '',
      totalFloors: Number(body.totalFloors) || 4,
      parking: body.parking || 'Reserved Parking',
      furnishing: body.furnishing || 'Semi-Furnished',
      facing: body.facing || 'North-East',
      propertyAge: body.propertyAge || 'Brand New',
      availability: body.availability || 'Ready to Move',
      featured: Boolean(body.featured),
      published: body.published !== false,
      heroImage: heroImage,
      images: images,
      description: body.description || '',
      amenities: Array.isArray(body.amenities) ? body.amenities : (body.amenities ? String(body.amenities).split(',').map(s => s.trim()) : ['24/7 Security', 'Power Backup', 'Stilt Parking']),
      highlights: Array.isArray(body.highlights) ? body.highlights : (body.highlights ? String(body.highlights).split(',').map(s => s.trim()) : ['Freehold Clear Title', 'Prime Location']),
      contactNumber: body.contactNumber || '+91 9911956274',
      model3dType: body.model3dType || 'luxury-villa',
      floorPlanUrl: body.floorPlanUrl || '',
      viewsCount: 0,
      createdAt: body.createdAt || new Date().toISOString()
    };

    const updatedList = [newProperty, ...currentProperties.filter((p: any) => String(p.id) !== String(id))];
    await persistProperties(updatedList);

    return NextResponse.json(newProperty, { status: 201 });
  } catch (error) {
    console.error('POST /api/properties error:', error);
    return NextResponse.json({ error: 'Failed to create property' }, { status: 500 });
  }
}
