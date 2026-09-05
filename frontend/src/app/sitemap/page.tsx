import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import FloatingWhatsApp from '@/components/common/FloatingWhatsApp';
import { INITIAL_PROPERTIES } from '@/data/mockData';
import { BLOG_POSTS } from '@/data/blogData';
import { LOCATION_DETAILS } from '@/data/locationData';
import { Property } from '@/types/property';
import { 
  Building2, MapPin, Compass, Layers, Phone, 
  ExternalLink, Home, FileText, CheckCircle2, ChevronRight, BookOpen 
} from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

async function getProperties(): Promise<Property[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/properties`, {
      next: { revalidate: 3600 },
    }).catch(() => null);

    if (res && res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (err) {
    console.warn('Error fetching sitemap properties, using default:', err);
  }
  return INITIAL_PROPERTIES;
}

export default async function SitemapPage() {
  const properties = await getProperties();

  const corePages = [
    { title: 'Homepage', url: '/', desc: 'Main real estate portal & 3D virtual building explorer' },
    { title: 'Properties Directory', url: '/properties', desc: 'Full property listings catalog with filters & 3D models' },
    { title: 'Home Builder & Turnkey Construction', url: '/home-builder', desc: 'Custom luxury home building and architectural services' },
    { title: 'Real Estate Blog & Guides', url: '/blog', desc: 'Property legal checklists, price trends & sector advice' },
    { title: 'About Shri Shyam Associate', url: '/about', desc: 'Agency background, 100% legal verification & leadership' },
    { title: 'Contact Us & Office Location', url: '/contact', desc: 'Direct phone, WhatsApp & Vardhaman City Mall office' },
  ];

  const categories = [
    { title: 'Properties for Sale in Dwarka', url: '/properties/for-sale', desc: 'Verified 2–5 BHK builder floors & flats for purchase' },
    { title: 'Properties for Rent in Dwarka', url: '/properties/for-rent', desc: 'Residential builder floors & society apartments for lease' },
    { title: 'Luxury Builder Floors', url: '/builder-floors', desc: 'Independent floors with private lift & stilt parking' },
    { title: 'Commercial Property & Shops', url: '/commercial-property', desc: 'Retail shops & SCO office spaces in Dwarka' },
    { title: 'DDA Flats & Apartments', url: '/dda-flats', desc: 'Freehold DDA MIG, HIG & SFS society apartments' },
  ];

  const locationHubs = Object.values(LOCATION_DETAILS);

  return (
    <div className="min-h-screen bg-[#f0f4f8] text-slate-800 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Breadcrumb Visual */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-slate-500">
            <li>
              <Link href="/" className="hover:text-teal-600 transition-colors flex items-center gap-1">
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-slate-800">HTML Sitemap & Directory</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3 border border-teal-200">
            <Layers className="w-3.5 h-3.5" />
            <span>Complete Website Directory</span>
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            HTML Sitemap & Property Index
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Easily discover every page, sector landing hub, category directory, blog guide, and verified property listing across Shri Shyam Associate.
          </p>
        </div>

        {/* 4-Silo Information Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Silo 1: Core Pages */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4 border-b border-slate-100 pb-3">
                <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
                  <FileText className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Main Pages</h2>
              </div>
              <ul className="space-y-3">
                {corePages.map((page) => (
                  <li key={page.url}>
                    <Link
                      href={page.url}
                      className="group block p-2.5 rounded-xl hover:bg-teal-50 transition-colors"
                    >
                      <div className="flex items-center justify-between text-sm font-bold text-slate-800 group-hover:text-teal-700">
                        <span>{page.title}</span>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-transform group-hover:translate-x-0.5" />
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{page.desc}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Silo 2: Categories */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4 border-b border-slate-100 pb-3">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
                  <Building2 className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Property Categories</h2>
              </div>
              <ul className="space-y-3">
                {categories.map((cat) => (
                  <li key={cat.title}>
                    <Link
                      href={cat.url}
                      className="group block p-2.5 rounded-xl hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex items-center justify-between text-sm font-bold text-slate-800 group-hover:text-blue-700">
                        <span>{cat.title}</span>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5" />
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{cat.desc}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Silo 3: Sector Location Hubs */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4 border-b border-slate-100 pb-3">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                <MapPin className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Dwarka Sector Hubs</h2>
            </div>
            <div className="space-y-2">
              {locationHubs.map((sec) => (
                <Link
                  key={sec.slug}
                  href={`/locations/${sec.slug}`}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50 text-xs font-semibold text-slate-700 hover:text-emerald-800 transition-colors"
                >
                  <div>
                    <span className="font-bold block text-slate-800">{sec.name}</span>
                    <span className="text-[11px] text-slate-500">Price trends & micro-market insights</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Silo 4: Real Estate Blog & Guides */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-16">
          <div className="flex items-center gap-2.5 mb-6 border-b border-slate-100 pb-4">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Dwarka Buying Guides & Legal Advice</h2>
              <p className="text-xs text-slate-500">Comprehensive research articles published by Shri Shyam Associate</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="p-4 rounded-2xl bg-slate-50 hover:bg-white hover:border-amber-400 border border-slate-200 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block mb-1">
                    {post.category}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-200/60 block">
                  {post.readTime}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Silo 5: All Live Property Listings */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-50 text-purple-700">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Verified Property Listings Directory</h2>
                <p className="text-xs text-slate-500">Every property page indexed with 3D models & pricing</p>
              </div>
            </div>
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-200 self-start sm:self-auto">
              Total {properties.length} Verified Properties
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.map((prop) => (
              <Link
                key={prop.id}
                href={`/properties/${prop.slug || prop.id}`}
                className="p-4 rounded-2xl bg-slate-50 hover:bg-white hover:border-teal-400 border border-slate-200 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-teal-100 text-teal-800">
                      {prop.type}
                    </span>
                    <span className="text-xs font-bold text-teal-700">
                      {prop.priceDisplay}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 group-hover:text-teal-700 transition-colors line-clamp-1">
                    {prop.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{prop.location}, {prop.sector}</span>
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{prop.bhk} BHK • {prop.areaSqFt} sq.ft</span>
                  <span className="font-semibold text-teal-600 group-hover:underline flex items-center gap-0.5">
                    View Details <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
