'use client';

import React from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import FloatingWhatsApp from '@/components/common/FloatingWhatsApp';
import LeadGenerationForm from '@/components/home/LeadGenerationForm';
import { 
  Hammer, 
  Building2, 
  ShieldCheck, 
  Ruler, 
  HardHat, 
  CheckCircle, 
  Clock, 
  Phone, 
  MapPin, 
  Sparkles, 
  Layers, 
  ArrowRight 
} from 'lucide-react';
import Link from 'next/link';

export default function HomeBuilderPage() {
  const constructionServices = [
    {
      icon: Layers,
      title: 'Luxury Builder Floors Construction',
      desc: 'Complete turnkey construction of 2, 3, 4, and 5 BHK ultra-luxury floors with high-speed private elevators, stilt parking, and designer false ceiling layouts in Dwarka.',
      points: ['Earthquake-Resistant RCC Framing', 'Premium Italian Marble & Teak Wood Finish', 'Smart Home & Modular Kitchen Setup']
    },
    {
      icon: Ruler,
      title: 'Architectural & Elevation Design',
      desc: 'Modern 3D architectural floor plans, exterior facade elevations, Vastu-compliant layouts, and structural load calculations by senior civil engineers.',
      points: ['Vastu Compliant Orientations', 'Optimized Floor-to-Ceiling Height', '3D Architectural Renderings']
    },
    {
      icon: Building2,
      title: 'Plot & Residential Development',
      desc: 'End-to-end development on freehold residential plots across Sector 6, 7, 8, 10, 19, 23 & nearby Dwarka localities from foundation to registry-ready handover.',
      points: ['Clear Title & Freehold Liaising', 'Municipal & DDA Compliance', 'Timely Milestone-Based Delivery']
    },
    {
      icon: HardHat,
      title: 'Structural Additions & Remodeling',
      desc: 'Professional floor addition, terrace garden construction, elevator shaft installation, and structural strengthening with certified materials.',
      points: ['Structural Safety Audits', 'Private Elevator Retrofitting', 'Complete Plumbing & Electrical Overhaul']
    }
  ];

  const buildWorkflow = [
    {
      step: '01',
      title: 'Consultation & Site Inspection',
      desc: 'Initial visit to your plot or existing structure in Dwarka, understanding your vision, budget, and space requirements.'
    },
    {
      step: '02',
      title: 'Architectural Blueprint & 3D Plan',
      desc: 'Drafting 3D floor maps, exterior elevation aesthetics, electrical schemes, and material specifications.'
    },
    {
      step: '03',
      title: 'Municipal Approvals & Civil Work',
      desc: 'Procuring necessary NOCs, followed by heavy RCC foundation casting, brickwork, and waterproofing.'
    },
    {
      step: '04',
      title: 'Finishing, Interiors & Handover',
      desc: 'Installing designer modular kitchens, branded sanitary fittings, lighting, painting, and legal completion certification.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f0f4f8] text-slate-800 flex flex-col font-sans">
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 mb-16 shadow-xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-400/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-teal-300 mb-6">
              <Hammer className="w-3.5 h-3.5 text-amber-400" />
              <span>Certified Home Builder in Dwarka Sector 7 Delhi</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Turnkey <span className="text-amber-300">Home Builder</span> & Construction in Dwarka Sector 7
            </h1>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              Shri Shyam Associate provides master-grade home construction, luxury builder floors development, and architectural design. Headquartered at Shop No. 247, 2nd Floor, Vardhaman City Mall, Vaishali, Sector 7, Dwarka, Delhi 110077 with 24/7 client consultation.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="tel:9911956274"
                className="btn-teal px-6 py-3 rounded-xl text-xs font-bold shadow-lg flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Builder Hotline: +91 9911956274</span>
              </a>
              <a
                href="https://wa.me/919911956274?text=Hello%20Shri%20Shyam%20Associate,%20I%20want%20to%20consult%20about%20Home%20Construction%20in%20Dwarka."
                target="_blank"
                rel="noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-xl text-xs font-bold transition-all"
              >
                WhatsApp Consultation
              </a>
            </div>
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Quality Materials</p>
              <p className="text-sm font-bold text-slate-800">100% Tested Grade</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Availability</p>
              <p className="text-sm font-bold text-slate-800">Open 24 Hours</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Headquarters</p>
              <p className="text-sm font-bold text-slate-800">Dwarka Sector 7</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Experience</p>
              <p className="text-sm font-bold text-slate-800">15+ Years Mastery</p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <p className="section-label mb-2">Our Construction Capabilities</p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
              Home Building & <span className="gold-gradient-text">Development Services</span>
            </h2>
            <p className="text-slate-500 text-sm mt-2 max-w-xl mx-auto">
              From vacant plots to bespoke ultra-luxury builder floors in Dwarka, New Delhi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {constructionServices.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{srv.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">{srv.desc}</p>
                  <div className="space-y-2 border-t border-slate-100 pt-4">
                    {srv.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Workflow Section */}
        <section className="mb-20 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
          <div className="text-center mb-12">
            <p className="section-label mb-2">Systematic Process</p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
              How We Build Your <span className="gold-gradient-text">Dream Home</span>
            </h2>
            <p className="text-slate-500 text-sm mt-2 max-w-xl mx-auto">
              Transparent, milestone-driven construction execution with zero compromises.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {buildWorkflow.map((step, idx) => (
              <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 relative">
                <span className="text-3xl font-black text-teal-600/30 block mb-2">{step.step}</span>
                <h3 className="text-base font-bold text-slate-800 mb-2">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* NAP Location & Lead Capture Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left NAP Info */}
          <div className="lg:col-span-5 bg-slate-900 text-white p-8 rounded-3xl shadow-lg space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-2">Registered Office & Builder Lounge</p>
              <h3 className="text-2xl font-black text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Shri Shyam associate
              </h3>
              <p className="text-xs text-slate-400 mt-1">Official Home Builder & Real Estate Consultant</p>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-800 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Full Office Address:</p>
                  <p className="text-slate-300 mt-0.5 leading-relaxed">
                    Shop no 247, 2nd floor, vardhaman city Mall, Vaishali, sector 7, dwarka, Delhi, 110077
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Operating Hours:</p>
                  <p className="text-slate-300 mt-0.5">Monday – Sunday: Open 24 Hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Direct Contacts:</p>
                  <p className="text-teal-300 font-bold mt-0.5">+91 9911956274 / 09911956274</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <Link
                href="/properties"
                className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>Browse Ready-to-Move Builder Floors</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Lead Capture Form */}
          <div className="lg:col-span-7">
            <LeadGenerationForm />
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
