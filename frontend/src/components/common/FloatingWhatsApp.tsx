'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const whatsappUrl = "https://wa.me/919911956274?text=Hello%20Shri%20Shyam%20Properties,%20I%20am%20interested%20in%20Dwarka%20property%20listings.%20Please%20share%20available%20options.";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-emerald-300/40"
      style={{ boxShadow: '0 8px 32px rgba(16,185,129,0.4)' }}
    >
      <div className="relative">
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping" />
      </div>
      <div className="hidden sm:flex flex-col text-left">
        <span className="text-[10px] uppercase font-black tracking-wider opacity-80">Instant Chat</span>
        <span className="text-xs font-bold">WhatsApp (9911956274)</span>
      </div>
    </a>
  );
}
