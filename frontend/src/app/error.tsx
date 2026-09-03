'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App runtime error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#f0f4f8] text-slate-800 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-xl mx-auto text-center">
        <div className="w-16 h-16 rounded-3xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-600 mb-6 shadow-sm">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <h1
          className="text-3xl sm:text-4xl font-black text-slate-900 mb-3 tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Something Went Wrong
        </h1>

        <p className="text-sm text-slate-600 leading-relaxed mb-8">
          We encountered an unexpected technical issue loading this page. Our team has been notified. Please try reloading or return to the homepage.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-md transition-all duration-200"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-sm transition-all duration-200"
          >
            <Home className="w-4 h-4" />
            <span>Go to Homepage</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
