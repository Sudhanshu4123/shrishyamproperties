'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/types/property';
import { MapPin, BedDouble, Bath, Maximize, Car, MessageCircle, ArrowUpRight, Box } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onOpen3DViewer?: (property: Property) => void;
  onScheduleVisit?: (property: Property) => void;
}

export default function PropertyCard({ property, onOpen3DViewer, onScheduleVisit }: PropertyCardProps) {
  const whatsappMsg = `Hello Shri Shyam Associate, I am interested in: ${property.title} (${property.sector}, ${property.priceDisplay}).`;
  const whatsappUrl = `https://wa.me/919911956274?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="property-card overflow-hidden flex flex-col h-full group">
      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
        <Image
          src={property.heroImage}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <div className="flex gap-1.5">
            <span className={property.purpose === 'Buy' ? 'badge-sale' : 'badge-rent'}>
              {property.purpose === 'Buy' ? 'For Sale' : 'For Rent'}
            </span>
            {property.featured && <span className="badge-featured">⭐ Featured</span>}
          </div>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
            style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)' }}
          >
            {property.type}
          </span>
        </div>

        {/* Bottom: Price + 3D button */}
        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-end justify-between">
          <div>
            <span className="text-[10px] uppercase font-semibold text-teal-300 block">Price</span>
            <span className="text-xl font-black text-white drop-shadow-md">{property.priceDisplay}</span>
          </div>
          <button
            onClick={() => onOpen3DViewer && onOpen3DViewer(property)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white border border-white/30 hover:bg-white hover:text-slate-800 transition-all"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
          >
            <Box className="w-3.5 h-3.5" />
            <span>3D View</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-1.5 text-xs text-teal-600 font-semibold mb-1.5">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{property.location}</span>
        </div>

        <Link href={`/properties/${property.id}`}>
          <h3 className="text-sm font-bold text-slate-800 hover:text-teal-600 transition-colors line-clamp-2 leading-snug mb-3">
            {property.title}
          </h3>
        </Link>

        {/* Key Specs */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-xs text-slate-500 mb-4">
          {property.bhk > 0 && (
            <div className="flex items-center gap-1">
              <BedDouble className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="font-semibold text-slate-700">{property.bhk} BHK</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Maximize className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-700">{property.areaSqFt} ft²</span>
          </div>
          <div className="flex items-center gap-1">
            <Car className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-700 truncate">Parking</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-auto">
          <Link
            href={`/properties/${property.id}`}
            className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-1"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => onScheduleVisit && onScheduleVisit(property)}
            className="py-2 px-3 rounded-xl border-2 border-teal-500 text-teal-600 hover:bg-teal-50 text-xs font-bold transition-colors"
          >
            Visit
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white border border-emerald-200 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
