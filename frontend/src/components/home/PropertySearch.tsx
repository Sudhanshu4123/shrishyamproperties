'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Home, SlidersHorizontal } from 'lucide-react';
import { DwarkaSector, PropertyType, PropertyPurpose } from '@/types/property';

export default function PropertySearch({ onSearch }: { onSearch?: (filters: any) => void }) {
  const router = useRouter();
  const [purpose, setPurpose] = useState<PropertyPurpose>('Buy');
  const [propertyType, setPropertyType] = useState<string>('All');
  const [sector, setSector] = useState<string>('All Locations');

  const propertyTypes: string[] = [
    '2 BHK', '3 BHK', '4 BHK', '5 BHK',
    'Builder Floor', 'DDA Flat', 'Society Flat',
    'Projects', 'New Launch',
    'Commercial', 'Shop', 'Plot', 'Land'
  ];

  const dwarkaLocations: DwarkaSector[] = [
    'Dwarka Sector 6', 'Dwarka Sector 7', 'Dwarka Sector 8',
    'Dwarka Sector 10', 'Dwarka Sector 11', 'Dwarka Sector 12',
    'Dwarka Sector 14', 'Dwarka Sector 17', 'Dwarka Sector 19',
    'Dwarka Sector 21', 'Dwarka Sector 22', 'Dwarka Sector 23', 'MBR Enclave'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ purpose, propertyType, sector });
    } else {
      const p = new URLSearchParams();
      if (purpose) p.set('purpose', purpose);
      if (propertyType !== 'All') p.set('type', propertyType);
      if (sector !== 'All Locations') p.set('sector', sector);
      router.push(`/properties?${p.toString()}`);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/80 shadow-[0_20px_50px_rgba(15,41,66,0.08)] p-5 sm:p-7">
      {/* Purpose Tabs - Centered Pill Container */}
      <div className="flex items-center justify-center mb-4">
        <div className="flex items-center gap-1 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/60 shadow-inner">
          {(['Buy', 'Projects', 'Commercial', 'Rent'] as const).map(p => {
            const isSelected = purpose === p;
            return (
              <button
                key={p}
                type="button"
                onClick={() => setPurpose(p)}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-200 border-none cursor-pointer ${
                  isSelected
                    ? 'bg-[#0f2942] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>
      </div>

      {/* Horizontal Divider Line */}
      <div className="border-b border-slate-100 mb-5" />

      {/* Filter Inputs Row */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4">
        {/* Property Type */}
        <div className="flex-1">
          <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1.5 px-1">Type</label>
          <div className="relative">
            <select
              value={propertyType}
              onChange={e => setPropertyType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/90 rounded-full px-5 py-3 pr-10 text-xs font-semibold text-slate-700 focus:outline-none focus:border-teal-500 focus:bg-white appearance-none transition-all shadow-sm"
            >
              <option value="All">Houses / All Types</option>
              {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <Home className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Location */}
        <div className="flex-1">
          <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1.5 px-1">Location</label>
          <div className="relative">
            <select
              value={sector}
              onChange={e => setSector(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/90 rounded-full px-5 py-3 pr-10 text-xs font-semibold text-slate-700 focus:outline-none focus:border-teal-500 focus:bg-white appearance-none transition-all shadow-sm"
            >
              <option value="All Locations">Dwarka Sectors</option>
              {dwarkaLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
            <MapPin className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Advanced Search Button */}
        <div className="hidden sm:flex items-center gap-2 px-5 py-3 rounded-full border border-slate-200/90 bg-white text-slate-600 text-xs font-semibold cursor-pointer hover:border-teal-500 hover:text-teal-600 transition-all whitespace-nowrap self-end shadow-sm">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Advanced Search</span>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="bg-[#0f2942] hover:bg-[#1a3c5e] text-white font-extrabold text-xs rounded-full px-8 py-3.5 shadow-lg shadow-[#0f2942]/20 flex items-center justify-center gap-2 transition-all self-end"
        >
          <Search className="w-4 h-4" />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
}
