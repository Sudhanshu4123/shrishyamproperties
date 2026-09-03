import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import FloatingWhatsApp from '@/components/common/FloatingWhatsApp';
import { Home, Search, Phone, ArrowRight, Building2, MapPin } from 'lucide-react';

export const metadata = {
  title: '404 - Page Not Found | Shri Shyam Associate',
  description: 'The property or page you are looking for may have been moved, sold, or updated. Browse verified luxury builder floors and flats in Dwarka & Delhi.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  const popularSectors = [
    'Sector 6',
    'Sector 7',
    'Sector 8',
    'Sector 10',
    'Sector 11',
    'Sector 12',
    'Sector 19',
    'Sector 23',
    'Dwarka Expressway',
  ];

  return (
    <div className="min-h-screen bg-[#f0f4f8] text-slate-800 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-4 border border-teal-200 shadow-sm">
          <span>Error 404</span>
          <span>•</span>
          <span>Page Not Found</span>
        </div>

        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-4 tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Property or Page Not Found
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed mb-8">
          The property listing or URL you requested might have been sold, renamed, or temporarily relocated. Explore our verified listings across Dwarka, Delhi:
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-md transition-all duration-200"
          >
            <Search className="w-4 h-4" />
            <span>Browse All Properties</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-sm transition-all duration-200"
          >
            <Home className="w-4 h-4" />
            <span>Back to Homepage</span>
          </Link>
          <a
            href="https://wa.me/919911956274?text=Hi%20Shri%20Shyam%20Associate,%20I%20am%20looking%20for%20a%20property%20in%20Dwarka"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all duration-200"
          >
            <Phone className="w-4 h-4" />
            <span>Consult on WhatsApp</span>
          </a>
        </div>

        {/* Popular Sectors Silo Navigation */}
        <div className="w-full bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md text-left">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-teal-600" />
            <span>Explore Properties by Popular Dwarka Sectors:</span>
          </h2>
          <p className="text-xs text-slate-500 mb-5">
            Quickly navigate to verified builder floors, DDA flats & society apartments in key localities:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3">
            {popularSectors.map((sector) => (
              <Link
                key={sector}
                href={`/properties?sector=${encodeURIComponent(sector)}`}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-teal-50 text-slate-700 hover:text-teal-800 text-xs font-semibold border border-slate-200 hover:border-teal-300 transition-all group"
              >
                <span>{sector}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 transition-colors" />
              </Link>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <Link href="/about" className="hover:text-teal-600 font-medium">About Us</Link>
              <span>•</span>
              <Link href="/contact" className="hover:text-teal-600 font-medium">Contact Office</Link>
              <span>•</span>
              <Link href="/sitemap" className="hover:text-teal-600 font-medium">HTML Sitemap</Link>
            </div>
            <div className="text-slate-400">
              Need immediate help? Call: <a href="tel:9911956274" className="text-teal-600 font-bold hover:underline">+91 9911956274</a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
