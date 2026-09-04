'use client';

import React, { useState } from 'react';
import { INITIAL_TESTIMONIALS } from '@/data/mockData';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  if (!INITIAL_TESTIMONIALS || INITIAL_TESTIMONIALS.length === 0) {
    return null;
  }

  const current = INITIAL_TESTIMONIALS[currentIndex];

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="section-label mb-2">Client Reviews</p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
            What Our <span className="gold-gradient-text">Buyers Say</span>
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-md relative">
          <Quote className="w-12 h-12 text-teal-100 absolute top-6 left-6" />

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            {/* Stars */}
            <div className="flex items-center justify-center gap-1 mb-5">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Review */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed italic mb-8">
              "{current.review}"
            </p>

            {/* Client */}
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-black text-sm">
                {current.name.charAt(0)}
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-slate-800">{current.name}</p>
                <span className="text-xs text-teal-600 font-semibold">{current.propertyBought}</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
            <div className="flex gap-1.5">
              {INITIAL_TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`rounded-full transition-all ${
                    i === currentIndex ? 'w-6 h-2.5 bg-teal-500' : 'w-2.5 h-2.5 bg-slate-200 hover:bg-slate-300'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentIndex(p => p === 0 ? INITIAL_TESTIMONIALS.length - 1 : p - 1)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-teal-50 hover:text-teal-600 text-slate-600 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentIndex(p => p === INITIAL_TESTIMONIALS.length - 1 ? 0 : p + 1)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-teal-50 hover:text-teal-600 text-slate-600 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
