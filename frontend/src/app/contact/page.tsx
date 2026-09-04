'use client';

import React from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import FloatingWhatsApp from '@/components/common/FloatingWhatsApp';
import LeadGenerationForm from '@/components/home/LeadGenerationForm';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const whatsappUrl = "https://wa.me/919911956274?text=Hello%20Shri%20Shyam%20Associate,%20I%20want%20to%20schedule%20a%20site%20visit%20in%20Dwarka.";

  return (
    <div className="min-h-screen bg-[#f0f4f8] text-slate-800 flex flex-col font-sans">
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        <div className="max-w-3xl mb-12">
          <span className="section-label block mb-2">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-800 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Contact <span className="gold-gradient-text">Shri Shyam Associate</span>
          </h1>
          <p className="text-slate-600 text-base mt-3">
            Have questions about buying, selling, or renting properties in Dwarka, New Delhi? Reach out to us directly or visit our office.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Contact Info Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-teal-50 text-teal-600 border border-teal-200 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Office Location</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Shop No. 247, 2nd Floor, Vardhaman City Mall, Vaishali, Sector 7, Dwarka, Delhi - 110077
                  </p>
                  <span className="text-[10px] text-teal-600 font-semibold block mt-1">
                    Primary Category: Home Builder & Real Estate Advisory
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
                <div className="p-3 rounded-2xl bg-teal-50 text-teal-600 border border-teal-200 shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Phone & WhatsApp</h3>
                  <a href="tel:9911956274" className="text-xs text-teal-600 font-bold hover:underline block mt-1">
                    +91 9911956274 / 09911956274
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
                <div className="p-3 rounded-2xl bg-teal-50 text-teal-600 border border-teal-200 shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Email Address</h3>
                  <a href="mailto:shrishyamproperties001@gmail.com" className="text-xs text-slate-600 hover:text-teal-600 transition-colors block mt-1">
                    shrishyamproperties001@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
                <div className="p-3 rounded-2xl bg-teal-50 text-teal-600 border border-teal-200 shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Operating Hours</h3>
                  <p className="text-xs text-slate-600 mt-1">Monday - Sunday: Open 24 Hours</p>
                </div>
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Connect Immediately on WhatsApp</span>
            </a>
          </div>

          {/* Right Lead Generation Form (7 Cols) */}
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
