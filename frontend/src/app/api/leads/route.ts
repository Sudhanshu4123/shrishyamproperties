import { NextResponse } from 'next/server';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

function getLeadsFilePath(): string {
  const cwd = process.cwd();
  const directPath = path.join(cwd, 'data', 'leads.json');
  if (existsSync(directPath)) return directPath;

  const parentPath = path.join(cwd, '..', 'data', 'leads.json');
  if (existsSync(parentPath)) return parentPath;

  return directPath;
}

async function getStoredLeads(): Promise<any[]> {
  const filePath = getLeadsFilePath();
  try {
    if (existsSync(filePath)) {
      const data = await readFile(filePath, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error reading leads.json:', error);
  }
  return [];
}

async function persistLeads(leads: any[]): Promise<boolean> {
  const filePath = getLeadsFilePath();
  try {
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, JSON.stringify(leads, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing leads.json:', error);
    return false;
  }
}

// 1. GET ALL LEADS
export async function GET() {
  try {
    const list = await getStoredLeads();
    return NextResponse.json(list);
  } catch (error) {
    console.error('GET /api/leads error:', error);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

// 2. CREATE NEW LEAD
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.phone && !body.name) {
      return NextResponse.json({ error: 'Phone or Name is required' }, { status: 400 });
    }

    const currentLeads = await getStoredLeads();
    const newLead = {
      id: String(body.id || `lead-${Date.now()}`),
      name: body.name || 'Anonymous Inquiry',
      phone: body.phone || '',
      email: body.email || '',
      lookingFor: body.lookingFor || 'Buy',
      propertyType: body.propertyType || 'Builder Floor',
      budget: body.budget || '',
      preferredLocation: body.preferredLocation || 'Dwarka',
      message: body.message || '',
      status: body.status || 'New',
      notes: body.notes || '',
      source: body.source || 'Website Form',
      propertyTitle: body.propertyTitle || '',
      createdAt: body.createdAt || new Date().toISOString()
    };

    const updatedList = [newLead, ...currentLeads];
    await persistLeads(updatedList);

    return NextResponse.json(newLead, { status: 201 });
  } catch (error) {
    console.error('POST /api/leads error:', error);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}
