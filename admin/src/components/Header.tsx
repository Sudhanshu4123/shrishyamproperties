'use client';

import React from 'react';
import { Search, Plus, Bell, ShieldCheck, ExternalLink, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenAddProperty: () => void;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
}

export default function Header({ onOpenAddProperty, searchTerm, setSearchTerm }: HeaderProps) {
  return (
    <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      {/* Search Input Bar */}
      <div className="relative max-w-md w-full">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          spellCheck={true}
          placeholder="Search properties by sector, title, lead name or client phone..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full bg-slate-50 text-slate-800 text-xs pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none transition-colors"
        />
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        {/* View Main Website Button */}
        <a
          href={process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-teal-600" />
          <span>Open Main Website</span>
        </a>

        {/* Add Property Button */}
        <button
          onClick={onOpenAddProperty}
          className="flex items-center gap-2 px-4 py-2 rounded-xl btn-teal font-extrabold text-xs shadow-md hover:scale-105 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Property</span>
        </button>

        {/* Notifications Icon */}
        <button className="relative p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900">
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-teal-500 absolute top-1.5 right-1.5 animate-ping" />
          <span className="w-2 h-2 rounded-full bg-teal-500 absolute top-1.5 right-1.5" />
        </button>
      </div>
    </header>
  );
}
