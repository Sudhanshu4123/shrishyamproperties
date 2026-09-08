export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  publishedDate: string;
  author: string;
  readTime: string;
  excerpt: string;
  category: string;
  image: string;
  contentHtml: string;
  faqs: { question: string; answer: string }[];
  tags: string[];
}

export const BLOG_STORAGE_KEY = 'ssp_blogs_v1';

// No hardcoded sample posts — all blogs are managed dynamically by the Admin
export const BLOG_POSTS: BlogPost[] = [];

export async function fetchBlogPostsApi(): Promise<BlogPost[]> {
  try {
    const res = await fetch('/api/blogs', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(data));
          window.dispatchEvent(new Event('storage'));
        }
        return data;
      }
    }
  } catch (error) {
    console.warn('Could not fetch blogs from /api/blogs, falling back to local storage:', error);
  }
  return getAllBlogPosts();
}

export async function createBlogPostApi(post: BlogPost): Promise<BlogPost[]> {
  try {
    const res = await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (res.ok) {
      const result = await res.json();
      if (result.blogs) {
        saveBlogPosts(result.blogs);
        return result.blogs;
      }
    }
  } catch (error) {
    console.error('Error in createBlogPostApi:', error);
  }
  const current = getAllBlogPosts();
  const updated = [post, ...current.filter(b => b.slug !== post.slug)];
  saveBlogPosts(updated);
  return updated;
}

export async function updateBlogPostApi(post: BlogPost): Promise<BlogPost[]> {
  try {
    const res = await fetch('/api/blogs', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (res.ok) {
      const result = await res.json();
      if (result.blogs) {
        saveBlogPosts(result.blogs);
        return result.blogs;
      }
    }
  } catch (error) {
    console.error('Error in updateBlogPostApi:', error);
  }
  const current = getAllBlogPosts();
  const updated = current.map(b => (b.slug === post.slug ? post : b));
  saveBlogPosts(updated);
  return updated;
}

export async function deleteBlogPostApi(slug: string): Promise<BlogPost[]> {
  try {
    const res = await fetch(`/api/blogs?slug=${encodeURIComponent(slug)}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      const result = await res.json();
      if (result.blogs) {
        saveBlogPosts(result.blogs);
        return result.blogs;
      }
    }
  } catch (error) {
    console.error('Error in deleteBlogPostApi:', error);
  }
  const current = getAllBlogPosts();
  const updated = current.filter(b => b.slug !== slug);
  saveBlogPosts(updated);
  return updated;
}

export function getAllBlogPosts(): BlogPost[] {
  if (typeof window === 'undefined') {
    try {
      // Server-side dynamic check for persistent blogs.json
      const fs = require('fs');
      const path = require('path');
      const blogsPath = path.join(process.cwd(), 'data', 'blogs.json');
      if (fs.existsSync(blogsPath)) {
        const raw = fs.readFileSync(blogsPath, 'utf-8');
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      // Fallback to static constant
    }
    return [];
  }

  try {
    const stored = localStorage.getItem(BLOG_STORAGE_KEY);
    if (stored !== null) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading blog posts from storage:', e);
  }
  return [];
}

export function saveBlogPosts(posts: BlogPost[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
    window.dispatchEvent(new Event('storage'));
  }
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllBlogPosts();
  return posts.find(p => p.slug === slug);
}
