'use client';

import React from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import FloatingWhatsApp from '@/components/common/FloatingWhatsApp';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import { Building2, ShieldCheck, Award, Users, CheckCircle, Phone } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f0f4f8] text-slate-800 flex flex-col font-sans">
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="section-label block mb-2">
            About Shri Shyam Associate
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-800 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Dwarka’s Premier <span className="gold-gradient-text">Home Builder</span> & Real Estate Advisors
          </h1>
          <p className="text-slate-600 text-base mt-4 leading-relaxed">
            Shri Shyam Associate is an established Home Builder and premier real estate consultancy located at Shop No. 247, 2nd Floor, Vardhaman City Mall, Vaishali, Sector 7, Dwarka, Delhi 110077.
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">Home Construction & Real Estate Verification Excellence</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We specialize in custom turnkey home building, luxury builder floors development, DDA flats, CGHS society apartments, commercial spaces, and land plots in Dwarka, New Delhi. Our experienced team provides complete guidance on architectural planning, structural approvals, legal conveyance deeds, home loans, and clear title verifications.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2 text-teal-600 font-semibold">
                <CheckCircle className="w-4 h-4 shrink-0 text-teal-500" />
                <span>Turnkey Home Builder Services</span>
              </div>
              <div className="flex items-center gap-2 text-teal-600 font-semibold">
                <CheckCircle className="w-4 h-4 shrink-0 text-teal-500" />
                <span>100% Legal Document Check</span>
              </div>
              <div className="flex items-center gap-2 text-teal-600 font-semibold">
                <CheckCircle className="w-4 h-4 shrink-0 text-teal-500" />
                <span>Dwarka Sector 7 Headquarters</span>
              </div>
              <div className="flex items-center gap-2 text-teal-600 font-semibold">
                <CheckCircle className="w-4 h-4 shrink-0 text-teal-500" />
                <span>Open 24 Hours Assistance</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-teal-50 to-emerald-50 p-8 rounded-3xl border border-teal-200 text-center shadow-sm">
            <Building2 className="w-12 h-12 text-teal-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Speak to Our Master Builder</h3>
            <p className="text-xs text-slate-600 mb-2">Shop No. 247, 2nd Floor, Vardhaman City Mall, Sector 7, Dwarka, Delhi - 110077</p>
            <p className="text-xs text-teal-700 font-semibold mb-6">Open 24 Hours / 7 Days a Week</p>
            <a
              href="tel:9911956274"
              className="w-full py-3 rounded-xl btn-teal text-xs shadow-md flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call +91 9911956274</span>
            </a>
          </div>
        </div>

        <WhyChooseUs />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
