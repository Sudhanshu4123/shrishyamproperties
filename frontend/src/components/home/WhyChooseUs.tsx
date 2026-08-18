'use client';

import React from 'react';
import { ShieldCheck, UserCheck, Scale, Award, Compass, Headphones } from 'lucide-react';

export default function WhyChooseUs() {
  const pillars = [
    { icon: ShieldCheck, title: 'Verified Properties', desc: 'Every floor and plot vetted for legal titles, DDA approvals, and clear bank NOC paperwork.', color: '#0d9488' },
    { icon: UserCheck, title: 'Experienced Local Experts', desc: '15+ years of real estate presence in Dwarka with honest guidance and sector insights.', color: '#2563a8' },
    { icon: Scale, title: 'Transparent Dealings', desc: 'No hidden commissions. Direct negotiations with total price transparency.', color: '#0d9488' },
    { icon: Award, title: 'Best Market Prices', desc: 'We secure competitive prices for buyers and sellers based on current Dwarka trends.', color: '#2563a8' },
    { icon: Compass, title: 'Site Visit Assistance', desc: 'Complimentary guided site visits to shortlisted builder floors and society apartments.', color: '#0d9488' },
    { icon: Headphones, title: 'End-to-End Support', desc: 'From property selection to home loan processing and registry completion.', color: '#2563a8' }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="section-label mb-2">Why Shri Shyam Associate</p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
            Why Choose <span className="gold-gradient-text">Us?</span>
          </h2>
          <p className="text-slate-500 text-sm mt-2 max-w-xl mx-auto">
            Unmatched real estate advisory with integrity, speed, and professionalism in Dwarka.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="why-card group">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ background: `${p.color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: p.color }} />
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-2">{p.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
