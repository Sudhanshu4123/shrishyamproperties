import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import FloatingWhatsApp from '@/components/common/FloatingWhatsApp';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { BLOG_POSTS } from '@/data/blogData';
import { BookOpen, Calendar, Clock, ArrowRight, Tag, ShieldCheck } from 'lucide-react';

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-[#f0f4f8] text-slate-800 flex flex-col font-sans">
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: 'Real Estate Blog & Guides' }]} />

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Dwarka Real Estate Knowledge Hub</span>
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Property Buying Guides & Market Insights
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Written by on-ground property consultants and construction engineers at Shri Shyam Associate. Explore clear, legal, and actionable guidance for buying homes and builder floors in Dwarka, New Delhi.
          </p>
        </div>

        {/* Featured Article Card */}
        {BLOG_POSTS.length > 0 && (
          <div className="mb-12">
            <Link
              href={`/blog/${BLOG_POSTS[0].slug}`}
              className="group block bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="lg:col-span-6 relative h-64 sm:h-80 lg:h-auto min-h-[260px] bg-slate-100">
                  <Image
                    src={BLOG_POSTS[0].image}
                    alt={BLOG_POSTS[0].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-600 text-white shadow-md">
                      Featured Guide
                    </span>
                  </div>
                </div>
                <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-teal-600" />
                        {BLOG_POSTS[0].publishedDate}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-teal-600" />
                        {BLOG_POSTS[0].readTime}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-3 leading-snug">
                      {BLOG_POSTS[0].title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                      {BLOG_POSTS[0].excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-xs font-semibold text-slate-500">By {BLOG_POSTS[0].author}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 group-hover:translate-x-1 transition-transform">
                      Read Full Guide <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Secondary Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {BLOG_POSTS.slice(1).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-sm text-slate-800 shadow-sm">
                  {post.category}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                    <Calendar className="w-3 h-3 text-teal-600" />
                    <span>{post.publishedDate}</span>
                    <span>•</span>
                    <Clock className="w-3 h-3 text-teal-600" />
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-2 mb-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">{post.author}</span>
                  <span className="font-bold text-teal-600 group-hover:underline flex items-center gap-1">
                    Read <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Link Banner to Properties */}
        <div className="bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-600 text-white rounded-3xl p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-teal-100 block mb-1">
              Ready to Explore Verified Homes?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black" style={{ fontFamily: "'Playfair Display', serif" }}>
              Explore Luxury Builder Floors in Dwarka
            </h2>
            <p className="text-xs sm:text-sm text-teal-50 mt-2 max-w-xl">
              100% verified freehold properties with 3D virtual tours and complete legal document checks.
            </p>
          </div>
          <Link
            href="/properties"
            className="rounded-full bg-white text-teal-800 hover:bg-slate-100 px-6 py-3 text-xs font-extrabold shadow-md transition-all shrink-0 whitespace-nowrap"
          >
            Browse Live Listings
          </Link>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
