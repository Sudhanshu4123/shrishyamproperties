'use client';

import React from 'react';
import { Search, CheckSquare, Calendar, Key } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    { num: '01', title: 'Search Property', desc: 'Filter verified 2-5 BHK floors, DDA flats & commercial shops in your preferred Dwarka sector.', icon: Search, color: '#0d9488' },
    { num: '02', title: 'Shortlist Property', desc: 'Review 3D interior plans, pricing details, amenities, and floor specs online.', icon: CheckSquare, color: '#2563a8' },
    { num: '03', title: 'Schedule Site Visit', desc: 'Book a free guided site tour with our Dwarka real estate experts.', icon: Calendar, color: '#0d9488' },
    { num: '04', title: 'Complete Your Deal', desc: 'Finalize price, registry paperwork, and get immediate keys to your dream home.', icon: Key, color: '#2563a8' }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="section-label mb-2">Simple & Transparent</p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
            How It <span className="gold-gradient-text">Works</span>
          </h2>
          <p className="text-slate-500 text-sm mt-2 max-w-lg mx-auto">
            Four easy steps to finding and owning your dream property in Dwarka.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:border-teal-200 hover:shadow-md transition-all hover:-translate-y-1">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-4xl font-black" style={{ color: `${step.color}25` }}>{step.num}</span>
                  <div className="p-2.5 rounded-2xl" style={{ background: `${step.color}15` }}>
                    <Icon className="w-5 h-5" style={{ color: step.color }} />
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-2">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
