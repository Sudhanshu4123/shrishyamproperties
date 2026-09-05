import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import FloatingWhatsApp from '@/components/common/FloatingWhatsApp';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { getBlogPostBySlug, BLOG_POSTS } from '@/data/blogData';
import { 
  Calendar, Clock, User, ArrowLeft, ArrowRight, 
  HelpCircle, CheckCircle, Phone, Share2, Tag, Building2 
} from 'lucide-react';

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f0f4f8] text-slate-800 flex flex-col font-sans">
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Blog & Guides', href: '/blog' },
            { label: post.title },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article Content (8 Cols) */}
          <article className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
            {/* Category & Date Header */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-4">
              <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-700 font-bold border border-teal-200">
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-teal-600" />
                {post.publishedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                {post.readTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-teal-600" />
                {post.author}
              </span>
            </div>

            {/* Primary H1 */}
            <h1
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {post.title}
            </h1>

            {/* Featured Image */}
            <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden mb-8 bg-slate-100 border border-slate-200">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Excerpt Lead */}
            <div className="p-4 sm:p-5 rounded-2xl bg-teal-50/70 border-l-4 border-teal-500 mb-8 text-sm text-slate-700 font-medium leading-relaxed">
              {post.excerpt}
            </div>

            {/* Body Content */}
            <div
              className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-headings:tracking-tight prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:text-slate-600 prose-p:leading-relaxed prose-p:text-sm sm:prose-p:text-base prose-li:text-slate-600 prose-li:text-sm sm:prose-li:text-base"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            {/* Verified FAQs Accordion */}
            {post.faqs && post.faqs.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-200">
                <div className="flex items-center gap-2 mb-6">
                  <HelpCircle className="w-5 h-5 text-teal-600" />
                  <h3 className="text-xl font-bold text-slate-900">Frequently Asked Questions</h3>
                </div>
                <div className="space-y-4">
                  {post.faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2"
                    >
                      <h4 className="text-sm font-bold text-slate-900 flex items-start gap-2">
                        <span className="text-teal-600 font-extrabold">Q:</span>
                        <span>{faq.question}</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 pl-5 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" />
                Tags:
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </article>

          {/* Sidebar Widgets (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Quick Contact & Site Visit Card */}
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl p-6 sm:p-7 border border-teal-200 shadow-sm text-center">
              <Building2 className="w-10 h-10 text-teal-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Buying in Dwarka?
              </h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Connect with our local sector specialists for 100% verified freehold builder floors and DDA apartments.
              </p>
              <div className="space-y-2.5">
                <a
                  href="tel:9911956274"
                  className="w-full py-3 rounded-xl btn-teal text-xs shadow-md flex items-center justify-center gap-2 font-bold"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call +91 9911956274</span>
                </a>
                <Link
                  href="/properties"
                  className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-bold flex items-center justify-center transition-colors"
                >
                  Browse Available Properties
                </Link>
              </div>
            </div>

            {/* Related Articles */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-4 border-l-4 border-teal-500 pl-3">
                Related Buying Guides
              </h3>
              <div className="space-y-4">
                {otherPosts.map((op) => (
                  <Link
                    key={op.slug}
                    href={`/blog/${op.slug}`}
                    className="group block p-3 rounded-2xl hover:bg-teal-50/60 transition-colors border border-transparent hover:border-teal-100"
                  >
                    <span className="text-[11px] text-teal-600 font-semibold uppercase block mb-1">
                      {op.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-teal-700 transition-colors line-clamp-2 leading-snug">
                      {op.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {op.readTime}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
