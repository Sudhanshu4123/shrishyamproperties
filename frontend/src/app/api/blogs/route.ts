import { NextResponse } from 'next/server';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { BLOG_POSTS, BlogPost } from '@/data/blogData';

const DATA_DIR = path.join(process.cwd(), 'data');
const BLOGS_FILE = path.join(DATA_DIR, 'blogs.json');

async function getStoredBlogs(): Promise<BlogPost[]> {
  try {
    if (existsSync(BLOGS_FILE)) {
      const data = await readFile(BLOGS_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error reading blogs.json:', error);
  }

  // Initialize with default BLOG_POSTS if file does not exist
  try {
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(BLOGS_FILE, JSON.stringify(BLOG_POSTS, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not initialize blogs.json:', err);
  }
  return BLOG_POSTS;
}

async function persistBlogs(blogs: BlogPost[]): Promise<boolean> {
  try {
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(BLOGS_FILE, JSON.stringify(blogs, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing blogs.json:', error);
    return false;
  }
}

// 1. GET ALL BLOGS
export async function GET() {
  const blogs = await getStoredBlogs();
  return NextResponse.json(blogs);
}

// 2. CREATE NEW BLOG
export async function POST(request: Request) {
  try {
    const body: BlogPost = await request.json();

    if (!body.title || !body.slug) {
      return NextResponse.json({ error: 'Title and Slug are required' }, { status: 400 });
    }

    const currentBlogs = await getStoredBlogs();
    const existingIndex = currentBlogs.findIndex(b => b.slug === body.slug);

    let updatedList: BlogPost[];
    if (existingIndex >= 0) {
      // If already exists, update it
      updatedList = currentBlogs.map((b, i) => (i === existingIndex ? body : b));
    } else {
      updatedList = [body, ...currentBlogs];
    }

    await persistBlogs(updatedList);
    return NextResponse.json({ success: true, blogs: updatedList, post: body });
  } catch (error) {
    console.error('Error in POST /api/blogs:', error);
    return NextResponse.json({ error: 'Failed to save blog post' }, { status: 500 });
  }
}

// 3. UPDATE EXISTING BLOG
export async function PUT(request: Request) {
  try {
    const body: BlogPost = await request.json();

    if (!body.slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const currentBlogs = await getStoredBlogs();
    const updatedList = currentBlogs.map(b => (b.slug === body.slug ? body : b));

    await persistBlogs(updatedList);
    return NextResponse.json({ success: true, blogs: updatedList, post: body });
  } catch (error) {
    console.error('Error in PUT /api/blogs:', error);
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
  }
}

// 4. DELETE BLOG
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Slug parameter is required' }, { status: 400 });
    }

    const currentBlogs = await getStoredBlogs();
    const updatedList = currentBlogs.filter(b => b.slug !== slug);

    await persistBlogs(updatedList);
    return NextResponse.json({ success: true, blogs: updatedList, deletedSlug: slug });
  } catch (error) {
    console.error('Error in DELETE /api/blogs:', error);
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
}
