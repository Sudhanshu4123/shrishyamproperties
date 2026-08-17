'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Building2, Layers, Building, Store, Trees, ArrowUpRight } from 'lucide-react';

export default function CategoriesSection() {
  const categories = [
    { title: 'Residential Homes', subtitle: '2, 3, 4 & 5 BHK Builder Floors', icon: Home, query: 'type=3+BHK', color: '#0d9488' },
    { title: 'Commercial Spaces', subtitle: 'Shops, Showrooms & Offices', icon: Store, query: 'type=Commercial', color: '#2563a8' },
    { title: 'Luxury Builder Floors', subtitle: 'Private Lift & Stilt Parking', icon: Layers, query: 'type=Builder+Floor', color: '#0d9488' },
    { title: 'DDA Apartments', subtitle: 'HIG/MIG Pockets near Metro', icon: Building, query: 'type=DDA+Flat', color: '#2563a8' },
    { title: 'CGHS Society Flats', subtitle: 'Gated Communities & Clubhouse', icon: Building2, query: 'type=Society+Flat', color: '#0d9488' },
    { title: 'Plots & Land', subtitle: 'Freehold Residential Plots', icon: Trees, query: 'type=Plot', color: '#2563a8' }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="section-label mb-2">Property Categories</p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
            Explore by <span className="gold-gradient-text">Category</span>
          </h2>
          <p className="text-slate-500 text-sm mt-2 max-w-xl mx-auto">
            Browse residential, commercial, and investment real estate across all Dwarka sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                href={`/properties?${cat.query}`}
                className="category-card flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="p-3.5 rounded-2xl shrink-0"
                    style={{ background: `${cat.color}18` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: cat.color }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 mb-0.5">{cat.title}</h3>
                    <p className="text-xs text-slate-500">{cat.subtitle}</p>
                    <span
                      className="inline-block mt-2 text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                      style={{ background: `${cat.color}15`, color: cat.color }}
                    >
                      Explore Category
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-300 shrink-0 mt-1 group-hover:text-teal-500 transition-colors" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
