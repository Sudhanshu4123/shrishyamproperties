import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to public/uploads directory
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    const sanitizeFilename = file.name.toLowerCase().replace(/[^a-z0-9.]/g, '_');
    const filename = `prop_${Date.now()}_${sanitizeFilename}`;
    const filePath = path.join(uploadsDir, filename);

    await writeFile(filePath, buffer);

    return NextResponse.json({
      url: `/uploads/${filename}`,
      filename,
      success: true
    });
  } catch (error) {
    console.error('File upload route error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
