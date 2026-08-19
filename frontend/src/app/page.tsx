'use client';

import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import FloatingWhatsApp from '@/components/common/FloatingWhatsApp';
import PropertySearch from '@/components/home/PropertySearch';
import FeaturedProperties from '@/components/home/FeaturedProperties';
import CategoriesSection from '@/components/home/CategoriesSection';
import MapExplorer from '@/components/home/MapExplorer';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import HowItWorks from '@/components/home/HowItWorks';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import LeadGenerationForm from '@/components/home/LeadGenerationForm';
import PropertyViewer3D from '@/components/3d/PropertyViewer3D';
import { PropertyService } from '@/services/propertyService';
import { Property } from '@/types/property';
import { ArrowRight, Phone, X, ShieldCheck, Star, Award } from 'lucide-react';

// Lazy load the heavy 3D Hero
const Hero3D = lazy(() => import('@/components/3d/Hero3D'));

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selected3DProp, setSelected3DProp] = useState<Property | null>(null);
  const [is3DOpen, setIs3DOpen] = useState(false);
  const [scheduleModalProp, setScheduleModalProp] = useState<Property | null>(null);
  const [isHomePopupOpen, setIsHomePopupOpen] = useState(false);

  useEffect(() => {
    // 1. Immediate initial load
    const initialProps = PropertyService.getProperties();
    setProperties(initialProps);

    // 2. Async backend API sync
    PropertyService.fetchPropertiesApi().then(data => {
      if (data && data.length > 0) {
        setProperties(data);
      }
    });

    // 3. Live storage listener for admin updates
    const handleStorage = () => {
      setProperties(PropertyService.getProperties());
    };
    window.addEventListener('storage', handleStorage);

    const timer = setTimeout(() => {
      setIsHomePopupOpen(true);
    }, 600);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const handleOpen3D = (prop: Property) => {
    setSelected3DProp(prop);
    setIs3DOpen(true);
  };

  const scrollToFeatured = () => {
    document.getElementById('featured-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] text-slate-800" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Navbar */}
      <Navbar />

      {/* ===================== HERO SECTION ===================== */}
      <section
        className="relative pt-24 pb-12 flex flex-col justify-between overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #26b5d9 0%, #24b0d4 50%, #20a6c9 100%)'
        }}
      >
        {/* Top Header Row (2 Columns matching reference image) */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Left: Heading */}
            <div className="md:max-w-xl">
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                We provide <span className="text-amber-300">the best house</span><br />
                to be your home
              </h1>
            </div>

            {/* Vertical Divider (Desktop) */}
            <div className="hidden md:block h-16 w-px bg-white/40 my-auto shrink-0" />

            {/* Right: Subtitle & Contact Us Button */}
            <div className="md:max-w-md flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center md:items-start lg:items-center justify-between gap-4">
              <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
                Verified luxury builder floors, society flats & commercial properties across prime locations in Dwarka.
              </p>
              <a
                href="tel:9911956274"
                className="rounded-full border border-white/80 bg-white text-slate-800 text-xs font-bold px-6 py-2.5 hover:bg-slate-100 shadow-sm whitespace-nowrap transition-all"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* Center: 3D Building (Dominant Center Stage) */}
        <div className="w-full flex-1 flex items-center justify-center my-2 relative z-10">
          <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex justify-center">
            <Hero3D />
          </div>
        </div>

        {/* Bottom: Search Bar (Overlapping Bottom Base of Building) */}
        <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-6 relative z-30 -mt-10 sm:-mt-14">
          <PropertySearch />
        </div>
      </section>

      {/* ===================== FEATURED PROPERTIES ===================== */}
      <div id="featured-section" className="section-bg-white">
        <FeaturedProperties
          properties={properties}
          onOpen3DViewer={handleOpen3D}
          onScheduleVisit={p => setScheduleModalProp(p)}
        />
      </div>

      {/* ===================== CATEGORIES ===================== */}
      <div className="section-bg-light">
        <CategoriesSection />
      </div>

      {/* ===================== DWARKA MAP ===================== */}
      <div className="section-bg-white">
        <MapExplorer />
      </div>

      {/* ===================== WHY CHOOSE US ===================== */}
      <div className="section-bg-light">
        <WhyChooseUs />
      </div>

      {/* ===================== HOW IT WORKS ===================== */}
      <div className="section-bg-white">
        <HowItWorks />
      </div>

      {/* ===================== TESTIMONIALS ===================== */}
      <div className="section-bg-light">
        <TestimonialsSection />
      </div>

      {/* ===================== LEAD FORM ===================== */}
      <section className="py-20 section-bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <LeadGenerationForm />
        </div>
      </section>

      {/* Footer */}
      <Footer />
      <FloatingWhatsApp />

      {/* Automatic Home Query Popup Modal */}
      {isHomePopupOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md transition-all duration-300">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-fadeIn">
            {/* Top Banner Accent */}
            <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">✨</span>
                <div>
                  <h4 className="text-base font-black tracking-wide">Quick Property Query</h4>
                  <p className="text-xs text-teal-100 font-medium">Get immediate details & assistance in Dwarka</p>
                </div>
              </div>
              <button
                onClick={() => setIsHomePopupOpen(false)}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                aria-label="Close query modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Lead Form Container */}
            <div className="p-2 sm:p-4">
              <LeadGenerationForm onSuccessClose={() => setIsHomePopupOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* 3D Viewer Modal */}
      <PropertyViewer3D
        isOpen={is3DOpen}
        onClose={() => setIs3DOpen(false)}
        propertyTitle={selected3DProp?.title}
      />

      {/* Schedule Visit Modal */}
      {scheduleModalProp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-xl">
            <button onClick={() => setScheduleModalProp(null)} className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white text-slate-600 shadow-md">
              <X className="w-5 h-5" />
            </button>
            <LeadGenerationForm propertyTitle={scheduleModalProp.title} onSuccessClose={() => setScheduleModalProp(null)} />
          </div>
        </div>
      )}
    </div>
  );
}
