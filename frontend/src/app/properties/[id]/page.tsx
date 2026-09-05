'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import FloatingWhatsApp from '@/components/common/FloatingWhatsApp';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import PropertyViewer3D from '@/components/3d/PropertyViewer3D';
import LeadGenerationForm from '@/components/home/LeadGenerationForm';
import { PropertyService } from '@/services/propertyService';
import { Property } from '@/types/property';
import { 
  MapPin, BedDouble, Bath, Maximize, Car, Compass, Layers, Calendar, 
  CheckCircle, Box, Phone, MessageCircle, ArrowLeft, ShieldCheck, Share2, ChevronRight 
} from 'lucide-react';

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [is3DOpen, setIs3DOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  useEffect(() => {
    if (params?.id) {
      const p = PropertyService.getPropertyById(params.id as string);
      if (p) {
        setProperty(p);
        setSelectedImage(p.heroImage);
      } else {
        PropertyService.fetchPropertiesApi().then(() => {
          const fresh = PropertyService.getPropertyById(params.id as string);
          if (fresh) {
            setProperty(fresh);
            setSelectedImage(fresh.heroImage);
          }
        });
      }
    }
  }, [params]);

  if (!property) {
    return (
      <div className="min-h-screen bg-[#f0f4f8] text-slate-800 flex flex-col justify-between font-sans">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <h2 className="text-2xl font-bold text-teal-600">Loading Property Details...</h2>
        </div>
        <Footer />
      </div>
    );
  }

  const whatsappMsg = `Hello Shri Shyam Associate, I am interested in: ${property.title} (${property.sector}, ${property.priceDisplay}). Please share available visit slots.`;
  const whatsappUrl = `https://wa.me/919911956274?text=${encodeURIComponent(whatsappMsg)}`;

  // Determine matching sector slug
  const sectorSlug = property.sector.toLowerCase().includes('sector 6')
    ? 'dwarka-sector-6'
    : property.sector.toLowerCase().includes('sector 7')
    ? 'dwarka-sector-7'
    : property.sector.toLowerCase().includes('sector 21')
    ? 'dwarka-sector-21'
    : property.sector.toLowerCase().includes('sector 23')
    ? 'dwarka-sector-23'
    : 'dwarka';

  return (
    <div className="min-h-screen bg-[#f0f4f8] text-slate-800 flex flex-col font-sans">
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Properties', href: '/properties' },
            { label: property.sector, href: `/locations/${sectorSlug}` },
            { label: property.title },
          ]}
        />

        {/* Back Button & Sector Link */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-700 hover:text-teal-600 hover:border-teal-500 text-xs font-bold border border-slate-200 shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Listings</span>
          </button>

          <Link
            href={`/locations/${sectorSlug}`}
            className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-200/80"
          >
            <span>Explore {property.sector} Guide & Price Trends</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Top Header & Title */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={property.purpose === 'Buy' ? 'badge-sale' : 'badge-rent'}
              >
                For {property.purpose}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-slate-700 border border-slate-200 shadow-sm">
                {property.type}
              </span>
              <Link
                href={`/locations/${sectorSlug}`}
                className="px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100 transition-colors"
              >
                {property.sector}
              </Link>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              {property.title}
            </h1>

            <div className="flex items-center gap-2 text-sm text-teal-600 font-semibold mt-2">
              <MapPin className="w-4 h-4" />
              <span>{property.location}</span>
            </div>
          </div>

          {/* Price Tag & 3D Launcher */}
          <div className="flex flex-col items-start lg:items-end gap-3">
            <div>
              <span className="text-xs uppercase font-bold text-slate-500 block">Property Price</span>
              <span className="text-3xl sm:text-4xl font-black text-teal-700 tracking-tight">
                {property.priceDisplay}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIs3DOpen(true)}
                className="btn-teal flex items-center gap-2 text-xs py-2.5 px-5"
              >
                <Box className="w-4 h-4" />
                <span>Launch Interactive 3D Model</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-300 transition-colors shadow-sm"
                title="Share on WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Main Content Layout (Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Gallery & Details (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Gallery Image Display */}
            <div className="space-y-4">
              <div className="relative h-[380px] sm:h-[480px] w-full rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-md">
                <Image
                  src={selectedImage || property.heroImage || '/images/luxury_builder_floor_dwarka_1786010981126.png'}
                  alt={property.title}
                  fill
                  unoptimized={Boolean(selectedImage?.startsWith('data:') || property.heroImage?.startsWith('data:') || selectedImage?.startsWith('/uploads/') || property.heroImage?.startsWith('/uploads/'))}
                  onError={() => setSelectedImage('/images/luxury_builder_floor_dwarka_1786010981126.png')}
                  className="object-cover"
                  priority
                />
              </div>

              {/* Gallery Thumbnails */}
              {property.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {property.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-24 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        selectedImage === img ? 'border-teal-500 scale-105 shadow-md' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image 
                        src={img || '/images/luxury_builder_floor_dwarka_1786010981126.png'} 
                        alt={`Gallery ${idx}`} 
                        fill 
                        unoptimized={Boolean(img?.startsWith('data:') || img?.startsWith('/uploads/'))}
                        className="object-cover" 
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Overview Key Metrics Grid */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h2 className="text-base font-bold text-slate-800 mb-4 border-l-4 border-teal-500 pl-3">
                Key Property Specifications
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <BedDouble className="w-5 h-5 text-teal-600 mb-1" />
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Bedrooms</span>
                  <span className="text-slate-800 font-extrabold text-sm">{property.bhk} BHK</span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <Bath className="w-5 h-5 text-teal-600 mb-1" />
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Bathrooms</span>
                  <span className="text-slate-800 font-extrabold text-sm">{property.bathrooms} Baths</span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <Maximize className="w-5 h-5 text-teal-600 mb-1" />
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Super Built-up Area</span>
                  <span className="text-slate-800 font-extrabold text-sm">{property.areaSqFt} sq.ft.</span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <Layers className="w-5 h-5 text-teal-600 mb-1" />
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Floor Position</span>
                  <span className="text-slate-800 font-extrabold text-sm">{property.floor}</span>
                </div>
              </div>

              {/* Secondary Details Table */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 mt-6 pt-6 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-slate-500 block font-medium">Carpet Area:</span>
                  <span className="text-slate-800 font-bold">{property.carpetAreaSqFt} sq.ft.</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-medium">Parking Availability:</span>
                  <span className="text-slate-800 font-bold">{property.parking}</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-medium">Furnishing Status:</span>
                  <span className="text-slate-800 font-bold">{property.furnishing}</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-medium">Main Facing:</span>
                  <span className="text-slate-800 font-bold">{property.facing}</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-medium">Property Age:</span>
                  <span className="text-slate-800 font-bold">{property.propertyAge}</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-medium">Possession Status:</span>
                  <span className="text-teal-600 font-bold">{property.availability}</span>
                </div>
              </div>
            </div>

            {/* Description & Highlights */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-800 border-l-4 border-teal-500 pl-3">
                Property Description
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {property.description}
              </p>

              {property.highlights && property.highlights.length > 0 && (
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-2">
                    Key Location Highlights
                  </h3>
                  <ul className="space-y-2">
                    {property.highlights.map((hl, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle className="w-4 h-4 text-teal-500 shrink-0" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Verified Amenities */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h2 className="text-base font-bold text-slate-800 mb-4 border-l-4 border-teal-500 pl-3">
                Verified Building Amenities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((am, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium">
                    <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>{am}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form & Direct Call Box (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Contact Box */}
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-6 rounded-3xl border border-teal-200 text-center shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-1">Direct Agent Assistance</h3>
              <p className="text-xs text-slate-600 mb-4">Shri Shyam Associate Dwarka Desk</p>

              <div className="flex flex-col gap-3">
                <a
                  href="tel:9911956274"
                  className="w-full py-3 rounded-xl btn-primary text-xs flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Direct (+91 9911956274)</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Lead Enquiry Form */}
            <LeadGenerationForm propertyTitle={property.title} />
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />

      {/* 3D Property Viewer Modal */}
      <PropertyViewer3D
        isOpen={is3DOpen}
        onClose={() => setIs3DOpen(false)}
        propertyTitle={property.title}
      />
    </div>
  );
}
