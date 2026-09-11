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

// 1. UPDATE LEAD STATUS OR NOTES
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const { searchParams } = new URL(request.url);
    const statusQuery = searchParams.get('status');
    const body = await request.json().catch(() => ({}));

    const currentLeads = await getStoredLeads();
    const index = currentLeads.findIndex((l: any) => String(l.id) === String(id));

    if (index === -1) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    const existing = currentLeads[index];
    const updated = {
      ...existing,
      ...body,
      status: statusQuery || body.status || existing.status,
      notes: body.notes !== undefined ? body.notes : existing.notes
    };

    currentLeads[index] = updated;
    await persistLeads(currentLeads);

    return NextResponse.json(updated);
  } catch (error) {
    console.error('PATCH /api/leads/[id] error:', error);
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}

// 2. DELETE LEAD
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const currentLeads = await getStoredLeads();
    const filtered = currentLeads.filter((l: any) => String(l.id) !== String(id));

    await persistLeads(filtered);
    return NextResponse.json({ success: true, message: 'Lead deleted' });
  } catch (error) {
    console.error('DELETE /api/leads/[id] error:', error);
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
  }
}
