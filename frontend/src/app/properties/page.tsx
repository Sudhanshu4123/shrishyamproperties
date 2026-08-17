'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import FloatingWhatsApp from '@/components/common/FloatingWhatsApp';
import PropertyCard from '@/components/property/PropertyCard';
import PropertySearch from '@/components/home/PropertySearch';
import PropertyViewer3D from '@/components/3d/PropertyViewer3D';
import LeadGenerationForm from '@/components/home/LeadGenerationForm';
import { PropertyService } from '@/services/propertyService';
import { Property } from '@/types/property';
import { SlidersHorizontal, ArrowUpDown, X, Box } from 'lucide-react';

function PropertyListingsingsContent() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');
  
  const [selected3DProp, setSelected3DProp] = useState<Property | null>(null);
  const [scheduleProp, setScheduleProp] = useState<Property | null>(null);

  const currentPurpose = searchParams.get('purpose') || undefined;
  const currentType = searchParams.get('type') || undefined;

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const purpose = searchParams.get('purpose') || undefined;
    const type = searchParams.get('type') || undefined;
    const sector = searchParams.get('sector') || undefined;
    const bhk = searchParams.get('bhk') ? Number(searchParams.get('bhk')) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;

    PropertyService.fetchPropertiesApi({
      purpose,
      type,
      sector,
      bhk,
      maxPrice
    }).then(results => {
      if (isMounted) {
        setProperties(results);
        setFilteredProperties(results);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [searchParams]);

  useEffect(() => {
    let sorted = [...filteredProperties];
    if (sortBy === 'price-asc') {
      sorted.sort((a, b) => a.priceValue - b.priceValue);
    } else if (sortBy === 'price-desc') {
      sorted.sort((a, b) => b.priceValue - a.priceValue);
    } else {
      sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    setFilteredProperties(sorted);
  }, [sortBy]);

  const handleFilterSearch = async (filters: any) => {
    setLoading(true);
    const results = await PropertyService.fetchPropertiesApi({
      purpose: filters.purpose,
      type: filters.propertyType,
      sector: filters.sector,
      bhk: filters.bhk !== 'All' ? Number(filters.bhk) : undefined,
      maxPrice: filters.maxBudget
    });
    setFilteredProperties(results);
    setLoading(false);
  };

  const getPageHeading = () => {
    if (currentPurpose === 'Buy') return 'Properties for Sale in Dwarka';
    if (currentPurpose === 'Rent') return 'Properties for Rent in Dwarka';
    if (currentPurpose === 'Projects') return 'Upcoming & New Projects in Dwarka';
    if (currentType === 'Commercial') return 'Commercial Spaces & Shops';
    return 'Explore Dwarka Properties';
  };

  return (
    <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="mb-8">
        <span className="section-label block mb-1">
          Verified Real Estate API
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          {getPageHeading()}
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          {loading
            ? 'Fetching latest verified properties via API...'
            : `Showing ${filteredProperties.length} properties matching your criteria.`}
        </p>
      </div>

      {/* Filter Component */}
      <div className="mb-10">
        <PropertySearch onSearch={handleFilterSearch} />
      </div>

      {/* Sorting Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="text-xs font-semibold text-slate-600 flex items-center gap-2">
          {loading && <div className="w-3 h-3 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />}
          <span>
            Showing <strong className="text-teal-600 font-bold">{filteredProperties.length}</strong> {currentPurpose ? `${currentPurpose} ` : ''}properties
          </span>
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-teal-600 shrink-0" />
          <span className="text-xs font-bold text-slate-500 uppercase">Sort By:</span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="bg-slate-50 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Property Cards Grid or API Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm animate-pulse space-y-4">
              <div className="w-full h-48 bg-slate-200 rounded-2xl" />
              <div className="h-4 bg-slate-200 rounded w-3/4" />
              <div className="h-3 bg-slate-200 rounded w-1/2" />
              <div className="h-8 bg-slate-200 rounded-xl w-full" />
            </div>
          ))}
        </div>
      ) : filteredProperties.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm">
          <Box className="w-12 h-12 text-teal-500/40 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No properties found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search filters or budget range to see available listings in Dwarka.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map(prop => (
            <PropertyCard
              key={prop.id}
              property={prop}
              onOpen3DViewer={p => setSelected3DProp(p)}
              onScheduleVisit={p => setScheduleProp(p)}
            />
          ))}
        </div>
      )}

      {/* 3D Property Viewer Modal */}
      <PropertyViewer3D
        isOpen={!!selected3DProp}
        onClose={() => setSelected3DProp(null)}
        propertyTitle={selected3DProp?.title}
      />

      {/* Schedule Visit Modal */}
      {scheduleProp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-xl">
            <button
              onClick={() => setScheduleProp(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white text-slate-600 shadow-md hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
            <LeadGenerationForm
              propertyTitle={scheduleProp.title}
              onSuccessClose={() => setScheduleProp(null)}
            />
          </div>
        </div>
      )}
    </main>
  );
}

export default function PropertiesingsPage() {
  return (
    <div className="min-h-screen bg-[#f0f4f8] text-slate-800 flex flex-col font-sans">
      <Navbar />
      <Suspense fallback={<div className="pt-32 text-center text-teal-600 font-bold">Loading listings...</div>}>
        <PropertyListingsingsContent />
      </Suspense>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
