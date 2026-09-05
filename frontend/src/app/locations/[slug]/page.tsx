'use client';

import React, { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import FloatingWhatsApp from '@/components/common/FloatingWhatsApp';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import PropertyCard from '@/components/property/PropertyCard';
import PropertyViewer3D from '@/components/3d/PropertyViewer3D';
import LeadGenerationForm from '@/components/home/LeadGenerationForm';
import { PropertyService } from '@/services/propertyService';
import { getLocationBySlug, LOCATION_DETAILS } from '@/data/locationData';
import { Property } from '@/types/property';
import { 
  MapPin, Train, Landmark, Building2, HelpCircle, 
  ArrowRight, Phone, CheckCircle2, ChevronRight, X, Box 
} from 'lucide-react';

export default function LocationSectorPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'dwarka';
  const loc = getLocationBySlug(slug);

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected3DProp, setSelected3DProp] = useState<Property | null>(null);
  const [scheduleProp, setScheduleProp] = useState<Property | null>(null);

  useEffect(() => {
    if (!loc) return;
    PropertyService.fetchPropertiesApi().then((results) => {
      if (loc.slug === 'dwarka') {
        setProperties(results);
      } else {
        // Extract sector number/identifier e.g. "sector-19" -> "19", "sector-2" -> "2"
        const slugClean = loc.slug.replace('dwarka-', '').replace('dwarka-expressway-', '').toLowerCase();
        const sectorNumMatch = slugClean.match(/\d+[a-z]?/i);
        const sectorNum = sectorNumMatch ? sectorNumMatch[0] : slugClean;

        const matched = results.filter((p) => {
          const locStr = (p.location || '').toLowerCase();
          const sectorStr = (p.sector || '').toLowerCase();
          const titleStr = (p.title || '').toLowerCase();

          return (
            locStr.includes(`sector -${sectorNum}`) ||
            locStr.includes(`sector - ${sectorNum}`) ||
            locStr.includes(`sector-${sectorNum}`) ||
            locStr.includes(`sector ${sectorNum}`) ||
            sectorStr.toLowerCase().includes(sectorNum) ||
            titleStr.includes(`sector ${sectorNum}`) ||
            titleStr.includes(`sector-${sectorNum}`)
          );
        });

        // If matched properties exist, show them; otherwise fallback to top featured
        setProperties(matched.length > 0 ? matched : results.slice(0, 6));
      }
      setLoading(false);
    });
  }, [loc]);

  if (!loc) {
    return (
      <div className="min-h-screen bg-[#f0f4f8] text-slate-800 flex flex-col justify-between font-sans">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <h2 className="text-2xl font-bold text-teal-600">Location Not Found</h2>
          <Link href="/" className="text-xs text-teal-700 underline mt-2 block">
            Return to Homepage
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const otherLocations = Object.values(LOCATION_DETAILS).filter((l) => l.slug !== loc.slug);

  return (
    <div className="min-h-screen bg-[#f0f4f8] text-slate-800 flex flex-col font-sans">
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Dwarka Locations', href: '/locations/dwarka' },
            { label: loc.name },
          ]}
        />

        {/* Hero Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3 border border-teal-200">
            <MapPin className="w-3.5 h-3.5 text-teal-600" />
            <span>Dwarka Micro-Market Profile</span>
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {loc.heading}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed mb-8">
            {loc.intro}
          </p>

          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
            {/* Connectivity */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
              <div className="flex items-center gap-2 text-teal-700 font-bold text-sm mb-3">
                <Train className="w-4 h-4" />
                <span>Metro & Road Connectivity</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {loc.connectivity.slice(0, 3).map((c, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-teal-500 font-bold">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Landmarks */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
              <div className="flex items-center gap-2 text-teal-700 font-bold text-sm mb-3">
                <Landmark className="w-4 h-4" />
                <span>Prominent Landmarks</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {loc.landmarks.slice(0, 3).map((lm, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-teal-500 font-bold">•</span>
                    <span>{lm}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Property Types */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
              <div className="flex items-center gap-2 text-teal-700 font-bold text-sm mb-3">
                <Building2 className="w-4 h-4" />
                <span>Available Property Types</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {loc.propertyTypes.slice(0, 3).map((pt, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-teal-500 font-bold">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Pricing Guide Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Average Real Estate Prices in {loc.name} (2026 Trend)
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Estimated market rate benchmarks for ready-to-move freehold builder floors and society apartments.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-teal-50/70 border-b border-teal-200 text-teal-900 font-bold">
                  <th className="p-3.5 rounded-l-xl">Configuration</th>
                  <th className="p-3.5">Approx Carpet Area</th>
                  <th className="p-3.5 rounded-r-xl">Current Market Price Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loc.avgPriceBhk.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3.5 font-bold text-slate-800">{row.bhk}</td>
                    <td className="p-3.5 text-slate-600">{row.area}</td>
                    <td className="p-3.5 font-extrabold text-teal-700">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Verified Property Listings in This Sector */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Verified Properties in {loc.name}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Explore builder floors & flats with 3D virtual walkthroughs and clear titles
              </p>
            </div>
            <Link
              href="/properties"
              className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View All Dwarka Properties</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm animate-pulse space-y-4">
                  <div className="w-full h-48 bg-slate-200 rounded-2xl" />
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                  <div className="h-8 bg-slate-200 rounded-xl w-full" />
                </div>
              ))}
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <Box className="w-12 h-12 text-teal-500/40 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800">Fresh listings updating for {loc.name}</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Call our local area desk directly at +91 9911956274 for off-market inventory.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.slice(0, 6).map((prop) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  onOpen3DViewer={(p) => setSelected3DProp(p)}
                  onScheduleVisit={(p) => setScheduleProp(p)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Sector FAQs */}
        {loc.faqs && loc.faqs.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm mb-12">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-5 h-5 text-teal-600" />
              <h3 className="text-xl font-bold text-slate-900">
                Frequently Asked Questions about {loc.name}
              </h3>
            </div>
            <div className="space-y-4">
              {loc.faqs.map((faq, index) => (
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

        {/* Other Sector Hubs Internal Links */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 shadow-xl">
          <h3 className="text-lg sm:text-xl font-bold mb-3">Explore Other Key Sectors in Dwarka</h3>
          <p className="text-xs text-slate-400 mb-6">
            Compare infrastructure, metro connectivity and builder floor prices across other prime sectors.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {otherLocations.map((ol) => (
              <Link
                key={ol.slug}
                href={`/locations/${ol.slug}`}
                className="p-3.5 rounded-2xl bg-white/10 hover:bg-teal-600/30 border border-white/10 hover:border-teal-400 text-xs font-semibold flex items-center justify-between transition-all"
              >
                <span>{ol.name}</span>
                <ChevronRight className="w-4 h-4 text-teal-400" />
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />

      {/* 3D Property Viewer Modal */}
      <PropertyViewer3D
        isOpen={!!selected3DProp}
        onClose={() => setSelected3DProp(null)}
        propertyTitle={selected3DProp?.title}
      />

      {/* Schedule Visit Modal */}
      {scheduleProp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-xl">
            <button
              onClick={() => setScheduleProp(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white text-slate-600 shadow-md hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
            <LeadGenerationForm
              propertyTitle={scheduleProp.title}
              onSuccessClose={() => setScheduleProp(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
