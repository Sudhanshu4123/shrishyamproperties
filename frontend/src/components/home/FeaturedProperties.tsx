'use client';

import React from 'react';
import Link from 'next/link';
import { Property } from '@/types/property';
import PropertyCard from '@/components/property/PropertyCard';
import { Sparkles, ArrowRight } from 'lucide-react';

interface FeaturedPropertiesProps {
  properties: Property[];
  onOpen3DViewer: (property: Property) => void;
  onScheduleVisit: (property: Property) => void;
}

export default function FeaturedProperties({ properties, onOpen3DViewer, onScheduleVisit }: FeaturedPropertiesProps) {
  const featuredList = properties.filter(p => p.featured && p.published).slice(0, 6);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="section-label mb-2">Handpicked Collection</p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
              Featured Properties in <span className="gold-gradient-text">Dwarka</span>
            </h2>
            <p className="text-slate-500 text-sm mt-2 max-w-xl">
              Verified 2–5 BHK builder floors, DDA flats, society apartments & commercial shops with clear titles.
            </p>
          </div>
          <Link
            href="/properties"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-teal-500 text-teal-600 hover:bg-teal-500 hover:text-white text-sm font-bold transition-all self-start md:self-auto"
          >
            <span>All {properties.length} Listings</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Property Grid or Empty State */}
        {featuredList.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <Sparkles className="w-12 h-12 text-teal-500/40 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No properties available right now</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              New property listings added through the admin panel will be displayed here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredList.map(prop => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onOpen3DViewer={onOpen3DViewer}
                onScheduleVisit={onScheduleVisit}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
