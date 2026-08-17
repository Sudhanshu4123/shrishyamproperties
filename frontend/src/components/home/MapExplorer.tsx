'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DWARKA_SECTORS } from '@/data/mockData';
import { SectorMetric } from '@/types/property';
import { MapPin, Navigation, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

export default function MapExplorer() {
  const router = useRouter();
  const [selectedSector, setSelectedSector] = useState<SectorMetric>(DWARKA_SECTORS[0]);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="section-label mb-2">Interactive Location Guide</p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
            Explore <span className="gold-gradient-text">Dwarka, New Delhi</span>
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Click any sector to see property availability, rates, and infrastructure highlights.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Sector Grid */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm font-bold text-slate-600">Dwarka Sector Grid</span>
                </div>
                <span className="text-xs text-teal-600 font-semibold">Blue Line Metro Coverage</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {DWARKA_SECTORS.map(sec => {
                  const isSelected = selectedSector.id === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => setSelectedSector(sec)}
                      className={`p-3 rounded-2xl text-left flex flex-col justify-between h-28 border-2 transition-all ${
                        isSelected
                          ? 'bg-teal-500 text-white border-teal-500 shadow-lg shadow-teal-200 scale-105'
                          : 'bg-slate-50 text-slate-700 border-slate-100 hover:border-teal-200 hover:bg-teal-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-black uppercase tracking-wider ${isSelected ? 'text-teal-100' : 'text-teal-600'}`}>
                          {sec.shortCode}
                        </span>
                        <MapPin className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                      </div>
                      <div>
                        <h4 className={`text-[11px] font-bold truncate ${isSelected ? 'text-white' : 'text-slate-700'}`}>
                          {sec.sectorName}
                        </h4>
                        <span className={`text-[10px] ${isSelected ? 'text-teal-100' : 'text-slate-400'} font-medium`}>
                          {sec.totalProperties} Units
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400">
                <span>Click any sector to view analytics</span>
                <button
                  onClick={() => router.push(`/properties?sector=${encodeURIComponent(selectedSector.sectorName)}`)}
                  className="text-teal-600 font-bold hover:underline flex items-center gap-1"
                >
                  View {selectedSector.shortCode} Properties
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Sector Analytics */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
                  {selectedSector.shortCode}
                </span>
                <span className="text-xs text-slate-400">Dwarka Sub-City</span>
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-3">{selectedSector.sectorName}</h3>

              {/* Market Rate */}
              <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Avg Market Rate</span>
                  <span className="text-lg font-black text-teal-600">{selectedSector.avgRateSqFt}</span>
                </div>
                <div className="p-2 rounded-xl bg-teal-100 text-teal-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-2 mb-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase">Infrastructure</h4>
                {selectedSector.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Popular Types */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {selectedSector.popularTypes.map((t, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg text-[11px] bg-slate-100 text-slate-600 font-medium">
                    {t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => router.push(`/properties?sector=${encodeURIComponent(selectedSector.sectorName)}`)}
                className="btn-teal w-full flex items-center justify-center gap-2 text-sm"
              >
                <span>View All Listings</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
