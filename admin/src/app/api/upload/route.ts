import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let buffer: Buffer | null = null;
    let originalName = 'image.jpg';

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File | null;

      if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 });
      }

      originalName = file.name || 'image.jpg';
      const bytes = await file.arrayBuffer();
      buffer = Buffer.from(bytes);
    } else if (contentType.includes('application/json')) {
      const body = await request.json();
      if (!body.image) {
        return NextResponse.json({ error: 'No image data provided' }, { status: 400 });
      }
      originalName = body.name || 'image.jpg';
      const base64Data = body.image.replace(/^data:image\/\w+;base64,/, '');
      buffer = Buffer.from(base64Data, 'base64');
    }

    if (!buffer) {
      return NextResponse.json({ error: 'Failed to process image payload' }, { status: 400 });
    }

    const sanitizeFilename = originalName.toLowerCase().replace(/[^a-z0-9.]/g, '_');
    const filename = `prop_${Date.now()}_${Math.floor(Math.random() * 10000)}_${sanitizeFilename}`;

    const possibleUploadDirs = [
      path.join(process.cwd(), 'public', 'uploads'),
      path.join(process.cwd(), 'frontend', 'public', 'uploads'),
      path.join(process.cwd(), 'admin', 'public', 'uploads'),
      path.join(process.cwd(), '..', 'public', 'uploads'),
      path.join(process.cwd(), '..', 'frontend', 'public', 'uploads'),
      '/var/www/shrishyam_uploads'
    ];

    for (const dir of possibleUploadDirs) {
      try {
        await mkdir(dir, { recursive: true });
        await writeFile(path.join(dir, filename), buffer);
      } catch (_) {
        // Skip inaccessible directories
      }
    }

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
