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

// 1. GET SINGLE PROPERTY
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const list = await getStoredProperties();
    const property = list.find((p: any) => String(p.id) === String(id) || p.slug === id);

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json(property);
  } catch (error) {
    console.error('GET /api/properties/[id] error:', error);
    return NextResponse.json({ error: 'Failed to fetch property' }, { status: 500 });
  }
}

// 2. UPDATE PROPERTY
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const body = await request.json();
    const currentList = await getStoredProperties();
    const index = currentList.findIndex((p: any) => String(p.id) === String(id) || p.slug === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    const existing = currentList[index];
    const heroImage = body.heroImage || existing.heroImage;
    const images = Array.isArray(body.images) && body.images.length > 0 ? body.images : (existing.images || [heroImage]);

    const updated = {
      ...existing,
      ...body,
      id: existing.id,
      heroImage,
      images,
      priceValue: body.priceValue !== undefined ? Number(body.priceValue) : existing.priceValue,
      bhk: body.bhk !== undefined ? Number(body.bhk) : existing.bhk,
      bathrooms: body.bathrooms !== undefined ? Number(body.bathrooms) : existing.bathrooms,
      areaSqFt: body.areaSqFt !== undefined ? Number(body.areaSqFt) : existing.areaSqFt,
      carpetAreaSqFt: body.carpetAreaSqFt !== undefined ? Number(body.carpetAreaSqFt) : existing.carpetAreaSqFt,
      totalFloors: body.totalFloors !== undefined ? Number(body.totalFloors) : existing.totalFloors
    };

    currentList[index] = updated;
    await persistProperties(currentList);

    return NextResponse.json(updated);
  } catch (error) {
    console.error('PUT /api/properties/[id] error:', error);
    return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
  }
}

// 3. DELETE PROPERTY
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const currentList = await getStoredProperties();
    const filtered = currentList.filter((p: any) => String(p.id) !== String(id) && p.slug !== id);

    await persistProperties(filtered);
    return NextResponse.json({ success: true, message: 'Property deleted' });
  } catch (error) {
    console.error('DELETE /api/properties/[id] error:', error);
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 });
  }
}
