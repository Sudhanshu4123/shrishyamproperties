import type { Metadata } from 'next';
import { getBlogPostBySlug, BLOG_POSTS } from '@/data/blogData';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://shrishyamassociate.com';

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: 'Real Estate Article | Shri Shyam Associate',
      description: 'Real estate buying guides and property advice in Dwarka, Delhi.',
    };
  }

  const canonicalUrl = `${BASE_URL}/blog/${post.slug}`;
  const imgUrl = `${BASE_URL}${post.image.startsWith('/') ? '' : '/'}${post.image}`;

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.tags,
    authors: [{ name: post.author, url: BASE_URL }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: canonicalUrl,
      siteName: 'Shri Shyam Associate',
      locale: 'en_IN',
      type: 'article',
      publishedTime: post.publishedDate,
      authors: [post.author],
      images: [
        {
          url: imgUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription,
      images: [imgUrl],
    },
  };
}

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);

  const articleSchema = post
    ? {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Article',
            '@id': `${BASE_URL}/blog/${post.slug}#article`,
            isPartOf: {
              '@id': `${BASE_URL}/blog#webpage`,
            },
            headline: post.title,
            description: post.metaDescription,
            image: `${BASE_URL}${post.image.startsWith('/') ? '' : '/'}${post.image}`,
            datePublished: `${post.publishedDate}T09:00:00+05:30`,
            dateModified: `${post.publishedDate}T09:00:00+05:30`,
            mainEntityOfPage: `${BASE_URL}/blog/${post.slug}`,
            author: {
              '@type': 'Organization',
              name: 'Shri Shyam Associate',
              url: BASE_URL,
            },
            publisher: {
              '@id': `${BASE_URL}/#organization`,
            },
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${BASE_URL}/blog/${post.slug}#breadcrumb`,
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: BASE_URL,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: `${BASE_URL}/blog`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: post.title,
                item: `${BASE_URL}/blog/${post.slug}`,
              },
            ],
          },
          ...(post.faqs && post.faqs.length > 0
            ? [
                {
                  '@type': 'FAQPage',
                  '@id': `${BASE_URL}/blog/${post.slug}#faq`,
                  mainEntity: post.faqs.map((f) => ({
                    '@type': 'Question',
                    name: f.question,
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: f.answer,
                    },
                  })),
                },
              ]
            : []),
        ],
      }
    : null;

  return (
    <>
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      {children}
    </>
  );
}
