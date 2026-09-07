'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import FloatingWhatsApp from '@/components/common/FloatingWhatsApp';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import PropertyViewer3D from '@/components/3d/PropertyViewer3D';
import LeadGenerationForm from '@/components/home/LeadGenerationForm';
import PropertyCard from '@/components/property/PropertyCard';
import { PropertyService } from '@/services/propertyService';
import { Property } from '@/types/property';
import { 
  MapPin, BedDouble, Bath, Maximize, Car, Compass, Layers, Calendar, 
  CheckCircle2, Box, Phone, MessageCircle, ArrowLeft, ShieldCheck, 
  Share2, ChevronRight, Calculator, Building, Home, Clock, Award, 
  Sparkles, Check, FileCheck, Eye, ArrowUpRight
} from 'lucide-react';

const DEFAULT_IMAGE = '/images/luxury_builder_floor_dwarka_1786010981126.png';

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [is3DOpen, setIs3DOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // EMI Calculator State
  const [loanTenure, setLoanTenure] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(8.5);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const loadData = async () => {
      const fetched = await PropertyService.fetchPropertiesApi();
      if (!isMounted) return;

      setAllProperties(fetched);

      const propId = params?.id as string;
      const found = fetched.find(p => String(p.id) === propId || p.slug === propId) 
        || PropertyService.getPropertyById(propId);

      if (found) {
        setProperty(found);
        setSelectedImage(found.heroImage || DEFAULT_IMAGE);
      } else {
        setProperty(null);
      }
      setLoading(false);
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [params]);

  // Calculate EMI
  const emiCalculation = useMemo(() => {
    if (!property || !property.priceValue) return { emi: 0, loanAmount: 0, totalInterest: 0, totalPayable: 0 };
    const loanAmount = Math.round(property.priceValue * 0.80); // 80% home loan
    const monthlyRate = (interestRate / 12) / 100;
    const totalMonths = loanTenure * 12;

    if (monthlyRate === 0) {
      const emi = Math.round(loanAmount / totalMonths);
      return { emi, loanAmount, totalInterest: 0, totalPayable: loanAmount };
    }

    const emi = Math.round(
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
    );
    const totalPayable = emi * totalMonths;
    const totalInterest = totalPayable - loanAmount;

    return { emi, loanAmount, totalInterest, totalPayable };
  }, [property, interestRate, loanTenure]);

  // Sector slug derivation
  const sectorSlug = useMemo(() => {
    if (!property) return 'dwarka';
    const s = property.sector.toLowerCase();
    if (s.includes('sector 6')) return 'dwarka-sector-6';
    if (s.includes('sector 7')) return 'dwarka-sector-7';
    if (s.includes('sector 8')) return 'dwarka-sector-8';
    if (s.includes('sector 10')) return 'dwarka-sector-10';
    if (s.includes('sector 11')) return 'dwarka-sector-11';
    if (s.includes('sector 12')) return 'dwarka-sector-12';
    if (s.includes('sector 19')) return 'dwarka-sector-19';
    if (s.includes('sector 21')) return 'dwarka-sector-21';
    if (s.includes('sector 22')) return 'dwarka-sector-22';
    if (s.includes('sector 23')) return 'dwarka-sector-23';
    return 'dwarka';
  }, [property]);

  // Similar properties
  const similarProperties = useMemo(() => {
    if (!property) return [];
    return allProperties
      .filter(p => String(p.id) !== String(property.id))
      .slice(0, 3);
  }, [allProperties, property]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.title || 'Dwarka Property',
        text: `Check out this verified property in Dwarka: ${property?.title} (${property?.priceDisplay})`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // 1. Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col justify-between font-sans">
        <Navbar />
        <main className="pt-36 pb-24 max-w-7xl mx-auto px-4 sm:px-6 w-full flex-1">
          <div className="animate-pulse space-y-6">
            <div className="h-6 bg-slate-200 rounded-full w-1/4" />
            <div className="h-10 bg-slate-200 rounded-2xl w-3/4" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 h-[450px] bg-slate-200 rounded-3xl" />
              <div className="lg:col-span-4 h-[450px] bg-slate-200 rounded-3xl" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // 2. Not Found / Fallback State
  if (!property) {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col justify-between font-sans">
        <Navbar />
        <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm text-center max-w-3xl mx-auto mb-16">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-4 text-amber-600">
              <Home className="w-8 h-8" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Property Listing Updated or Sold
            </h1>
            <p className="text-slate-600 text-sm max-w-lg mx-auto mb-6 leading-relaxed">
              The property you are looking for has either been updated, closed, or moved. Explore our latest verified builder floors and apartments in Dwarka below.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/properties"
                className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
              >
                <span>Browse All Available Properties</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:9911956274"
                className="px-6 py-3 rounded-full border border-teal-500 text-teal-700 bg-teal-50 hover:bg-teal-100 text-xs font-bold transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Desk: +91 9911956274</span>
              </a>
            </div>
          </div>

          {/* Fallback Active Properties Grid */}
          {allProperties.length > 0 && (
            <div>
              <div className="mb-6">
                <span className="section-label mb-1">Featured Real Estate</span>
                <h2 className="text-2xl font-black text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Verified Properties Available Now
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProperties.slice(0, 3).map(p => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    );
  }

  // 3. WhatsApp Message
  const whatsappMsg = `Hello Shri Shyam Associate, I am interested in: ${property.title} (${property.sector}, ${property.priceDisplay}). Please share available visit slots.`;
  const whatsappUrl = `https://wa.me/919911956274?text=${encodeURIComponent(whatsappMsg)}`;

  const imagesList = property.images && property.images.length > 0 
    ? property.images 
    : [property.heroImage || DEFAULT_IMAGE];

  // Price per sqft calculation
  const pricePerSqFt = property.priceValue && property.areaSqFt 
    ? Math.round(property.priceValue / property.areaSqFt) 
    : null;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans">
      <Navbar />

      <main className="pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        {/* Top Breadcrumb & Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <Breadcrumbs
            items={[
              { label: 'Properties', href: '/properties' },
              { label: property.sector, href: `/locations/${sectorSlug}` },
              { label: property.title },
            ]}
          />

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-slate-700 hover:text-teal-700 text-xs font-semibold border border-slate-200 shadow-sm transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-slate-700 hover:text-teal-700 text-xs font-semibold border border-slate-200 shadow-sm transition-all"
              aria-label="Share property link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* ===================== HERO TITLE & PRICE HEADER ===================== */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2.5 max-w-3xl">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className={property.purpose === 'Buy' ? 'badge-sale' : 'badge-rent'}>
                  For {property.purpose}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200">
                  {property.type}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Freehold Verified</span>
                </span>
                {property.featured && (
                  <span className="badge-featured">⭐ Featured Listing</span>
                )}
              </div>

              {/* Title */}
              <h1
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {property.title}
              </h1>

              {/* Location */}
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium">
                <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
                <span>{property.location}</span>
                <span>•</span>
                <Link href={`/locations/${sectorSlug}`} className="text-teal-700 font-semibold hover:underline">
                  {property.sector}
                </Link>
              </div>
            </div>

            {/* Price Box */}
            <div className="flex flex-col items-start lg:items-end gap-2 shrink-0 bg-slate-50 lg:bg-transparent p-4 lg:p-0 rounded-2xl border lg:border-none border-slate-200">
              <span className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Demand Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-[#0f2942] tracking-tight">
                  {property.priceDisplay}
                </span>
              </div>
              {pricePerSqFt && (
                <span className="text-xs text-slate-500 font-medium">
                  ≈ ₹{pricePerSqFt.toLocaleString('en-IN')}/sq.ft. • Est. EMI ₹{emiCalculation.emi.toLocaleString('en-IN')}/mo
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ===================== MAIN GRID (GALLERY & DETAILS vs SIDEBAR) ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (8 Columns) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Gallery Card */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
              {/* Main Active Image */}
              <div className="relative h-[360px] sm:h-[480px] w-full rounded-2xl overflow-hidden bg-slate-100 group">
                <Image
                  src={selectedImage || property.heroImage || DEFAULT_IMAGE}
                  alt={`${property.title} - Main View`}
                  fill
                  unoptimized={Boolean(selectedImage?.startsWith('data:') || property.heroImage?.startsWith('data:') || selectedImage?.startsWith('/uploads/') || property.heroImage?.startsWith('/uploads/'))}
                  onError={() => setSelectedImage(DEFAULT_IMAGE)}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                
                {/* Floating 3D Launcher on Image */}
                <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
                  <button
                    onClick={() => setIs3DOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white shadow-xl hover:scale-105 transition-all"
                    style={{ background: 'rgba(15, 41, 66, 0.85)', backdropFilter: 'blur(10px)' }}
                  >
                    <Box className="w-4 h-4 text-teal-400" />
                    <span>Launch 3D Virtual Tour</span>
                  </button>
                </div>

                {/* Photo Counter */}
                <div className="absolute top-4 right-4 z-10">
                  <span
                    className="text-[11px] font-bold px-3 py-1 rounded-full text-white shadow-md flex items-center gap-1.5"
                    style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)' }}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{imagesList.findIndex(img => img === selectedImage) + 1} / {imagesList.length} Photos</span>
                  </span>
                </div>
              </div>

              {/* Thumbnails Row */}
              {imagesList.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {imagesList.map((img, idx) => {
                    const isSelected = selectedImage === img;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        aria-label={`Select photo ${idx + 1} of ${property.title}`}
                        className={`relative w-24 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                          isSelected ? 'border-teal-500 scale-105 shadow-md' : 'border-slate-200 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <Image
                          src={img || DEFAULT_IMAGE}
                          alt={`${property.title} - Thumbnail ${idx + 1}`}
                          fill
                          unoptimized={Boolean(img?.startsWith('data:') || img?.startsWith('/uploads/'))}
                          className="object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Key Specifications Grid */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-5 border-l-4 border-teal-500 pl-3">
                Key Property Specifications
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs">
                {property.bhk > 0 && (
                  <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 hover:bg-slate-50 transition-colors">
                    <BedDouble className="w-5 h-5 text-teal-600 mb-2" />
                    <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Bedrooms</span>
                    <span className="text-slate-900 font-extrabold text-sm">{property.bhk} BHK</span>
                  </div>
                )}

                <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 hover:bg-slate-50 transition-colors">
                  <Bath className="w-5 h-5 text-teal-600 mb-2" />
                  <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Bathrooms</span>
                  <span className="text-slate-900 font-extrabold text-sm">{property.bathrooms || 2} Baths</span>
                </div>

                <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 hover:bg-slate-50 transition-colors">
                  <Maximize className="w-5 h-5 text-teal-600 mb-2" />
                  <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Super Built-up Area</span>
                  <span className="text-slate-900 font-extrabold text-sm">{property.areaSqFt} sq.ft.</span>
                </div>

                <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 hover:bg-slate-50 transition-colors">
                  <Layers className="w-5 h-5 text-teal-600 mb-2" />
                  <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Floor Level</span>
                  <span className="text-slate-900 font-extrabold text-sm">{property.floor || '1st Floor'}</span>
                </div>
              </div>

              {/* Extended Specs Table */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 mt-6 pt-6 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-slate-500 block font-medium">Carpet Area:</span>
                  <span className="text-slate-900 font-bold">{property.carpetAreaSqFt ? `${property.carpetAreaSqFt} sq.ft.` : 'As per layout'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-medium">Parking Availability:</span>
                  <span className="text-slate-900 font-bold">{property.parking || 'Dedicated Reserved Parking'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-medium">Furnishing Status:</span>
                  <span className="text-slate-900 font-bold">{property.furnishing || 'Semi-Furnished (Modular Kitchen & Wardrobes)'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-medium">Main Facing / Vastu:</span>
                  <span className="text-slate-900 font-bold">{property.facing || 'North-East (Vastu Compliant)'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-medium">Property Age:</span>
                  <span className="text-slate-900 font-bold">{property.propertyAge ? `${property.propertyAge} Years` : 'Brand New Construction'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-medium">Possession Status:</span>
                  <span className="text-teal-700 font-bold">{property.availability || 'Ready to Move'}</span>
                </div>
              </div>
            </div>

            {/* Description & Overview */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-l-4 border-teal-500 pl-3">
                Property Description & Features
              </h2>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                {property.description || `Luxury ${property.bhk} BHK property located in prime ${property.sector}, Dwarka. Designed with modern architecture, premium Italian flooring, modular fittings, and 100% legal title clearance approved by leading banks.`}
              </p>

              {property.highlights && property.highlights.length > 0 && (
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-3">
                    Key Location & Builder Highlights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {property.highlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Verified Building Amenities */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-5 border-l-4 border-teal-500 pl-3">
                Building & Society Amenities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {(property.amenities && property.amenities.length > 0 ? property.amenities : [
                  '24/7 Security & CCTV', 'High Speed Lift', 'Reserved Stilt Parking',
                  'Modular Italian Kitchen', '24 Hours Water Supply', 'Freehold Registry Ready'
                ]).map((am, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium">
                    <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>{am}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Home Loan & EMI Calculator */}
            <div className="bg-gradient-to-br from-slate-900 to-[#0f2942] text-white p-6 sm:p-8 rounded-3xl shadow-lg space-y-6">
              <div className="flex items-center gap-2">
                <Calculator className="w-6 h-6 text-teal-400" />
                <h2 className="text-xl font-bold tracking-tight">Home Loan & Monthly EMI Calculator</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                  <span className="text-[11px] uppercase font-bold text-teal-200 block mb-1">Loan Amount (80%)</span>
                  <span className="text-xl font-black">₹{emiCalculation.loanAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                  <span className="text-[11px] uppercase font-bold text-teal-200 block mb-1">Monthly EMI</span>
                  <span className="text-xl font-black text-amber-300">₹{emiCalculation.emi.toLocaleString('en-IN')}/mo</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                  <span className="text-[11px] uppercase font-bold text-teal-200 block mb-1">Total Payable</span>
                  <span className="text-xl font-black">₹{emiCalculation.totalPayable.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span>Loan Tenure:</span>
                    <span className="text-teal-300">{loanTenure} Years</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={loanTenure}
                    onChange={e => setLoanTenure(Number(e.target.value))}
                    className="w-full accent-teal-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span>Interest Rate:</span>
                    <span className="text-teal-300">{interestRate}% p.a.</span>
                  </div>
                  <input
                    type="range"
                    min="7"
                    max="12"
                    step="0.1"
                    value={interestRate}
                    onChange={e => setInterestRate(Number(e.target.value))}
                    className="w-full accent-teal-400 cursor-pointer"
                  />
                </div>
              </div>

              <p className="text-[11px] text-slate-300">
                *Pre-approved home loans available from SBI, HDFC, ICICI, and Axis Bank with 100% legal document support.
              </p>
            </div>

          </div>

          {/* Right Column / Sticky Contact Sidebar (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Agent Direct Call Desk Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 font-extrabold text-lg">
                  SS
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Shri Shyam Associate</h3>
                  <p className="text-[11px] text-teal-700 font-semibold">Dwarka Property Advisory Desk</p>
                  <p className="text-[10px] text-slate-400">Shop 247, Vardhaman City Mall, Sector 7</p>
                </div>
              </div>

              {/* Direct Actions */}
              <div className="space-y-3">
                <a
                  href="tel:9911956274"
                  className="w-full py-3.5 rounded-2xl bg-[#0f2942] hover:bg-slate-800 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-teal-400" />
                  <span>Call Direct (+91 9911956274)</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>

                <button
                  onClick={() => setIs3DOpen(true)}
                  className="w-full py-3 rounded-2xl border-2 border-teal-500 text-teal-700 bg-teal-50/50 hover:bg-teal-100/60 font-bold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Box className="w-4 h-4" />
                  <span>Explore Interactive 3D Model</span>
                </button>
              </div>

              {/* Legal Verification Guarantee Note */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-[11px] text-emerald-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <FileCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>100% Freehold Title Guarantee</span>
                </div>
                <p className="text-[10px] text-emerald-800 leading-relaxed">
                  Clear ownership title, MCD/DDA compliance check, and on-spot loan assistance.
                </p>
              </div>
            </div>

            {/* Schedule Site Visit Lead Form */}
            <LeadGenerationForm propertyTitle={property.title} />

          </div>
        </div>

        {/* ===================== SIMILAR PROPERTIES ===================== */}
        {similarProperties.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="section-label mb-1">Recommended Homes</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Similar Verified Properties in Dwarka
                </h2>
              </div>
              <Link
                href="/properties"
                className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1 self-start sm:self-auto"
              >
                <span>View all listings</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map(p => (
                <PropertyCard key={p.id} property={p} onOpen3DViewer={() => { setProperty(p); setIs3DOpen(true); }} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Sticky Mobile Conversion Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden bg-white/95 backdrop-blur-md p-3 border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] flex items-center gap-2">
        <a
          href="tel:9911956274"
          className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
        >
          <Phone className="w-3.5 h-3.5 text-teal-400" />
          <span>Call Agent</span>
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>
        <button
          onClick={() => setIs3DOpen(true)}
          className="py-2.5 px-3.5 rounded-xl border border-teal-500 text-teal-700 bg-teal-50 font-bold text-xs flex items-center justify-center gap-1 active:scale-95 transition-transform"
        >
          <Box className="w-3.5 h-3.5" />
          <span>3D</span>
        </button>
      </div>

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
