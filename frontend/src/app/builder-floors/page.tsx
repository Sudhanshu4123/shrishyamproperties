'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import FloatingWhatsApp from '@/components/common/FloatingWhatsApp';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import PropertyCard from '@/components/property/PropertyCard';
import PropertyViewer3D from '@/components/3d/PropertyViewer3D';
import LeadGenerationForm from '@/components/home/LeadGenerationForm';
import { PropertyService } from '@/services/propertyService';
import { Property } from '@/types/property';
import { Building2, CheckCircle2, ShieldCheck, Box, X, Compass, Key, Sparkles } from 'lucide-react';

export default function BuilderFloorsPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected3DProp, setSelected3DProp] = useState<Property | null>(null);
  const [scheduleProp, setScheduleProp] = useState<Property | null>(null);

  useEffect(() => {
    PropertyService.fetchPropertiesApi({ type: 'Builder Floor' }).then((results) => {
      const floors = results.filter((p) => p.type === 'Builder Floor' || p.type.includes('BHK'));
      setProperties(floors);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f4f8] text-slate-800 flex flex-col font-sans">
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        <Breadcrumbs items={[{ label: 'Luxury Builder Floors in Dwarka' }]} />

        {/* Hero Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm mb-10">
          <span className="section-label block mb-2">Architectural Excellence</span>
          <h1
            className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Luxury Builder Floors in Dwarka, New Delhi
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed mb-6">
            Experience the pinnacle of independent luxury living. Shri Shyam Associate specializes in ultra-modern builder floors across Dwarka Sector 6, 7, 8, 11, 19, 21, and 23. Featuring branded automatic lifts with ARD rescue, designated stilt parking with EV charging, Italian marble interiors, modular kitchens with chimneys, and 100% legal title clearance.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-2 text-teal-700">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>Independent Floor Ownership</span>
            </div>
            <div className="flex items-center gap-2 text-teal-700">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>Stilt Parking & Private Lift</span>
            </div>
            <div className="flex items-center gap-2 text-teal-700">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>Vastu Compliant Layouts</span>
            </div>
            <div className="flex items-center gap-2 text-teal-700">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>Turnkey Home Builder Quality</span>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            Available Builder Floors ({properties.length})
          </h2>
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
            <h3 className="text-lg font-bold text-slate-800">Builder Floor Listings Updating</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Contact our Dwarka Sector 7 desk directly for immediate walk-in site visits to active builder floor projects.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onOpen3DViewer={(p) => setSelected3DProp(p)}
                onScheduleVisit={(p) => setScheduleProp(p)}
              />
            ))}
          </div>
        )}
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
