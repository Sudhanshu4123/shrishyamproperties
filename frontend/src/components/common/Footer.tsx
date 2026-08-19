'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-base font-black text-white block">Shri Shyam Associate</span>
                <span className="text-[10px] text-teal-400 font-bold uppercase tracking-wider">Dwarka, New Delhi</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Dwarka's trusted real estate agency offering verified 2–5 BHK builder floors, society flats, DDA pockets, commercial shops and plots.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400 font-semibold bg-slate-800 px-3 py-2 rounded-xl border border-slate-700">
              <span>✓</span>
              <span>100% Verified Properties</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 border-l-2 border-teal-500 pl-3">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              {[
                { name: 'Featured Properties', href: '/properties' },
                { name: 'Properties for Sale', href: '/properties?purpose=Buy' },
                { name: 'Properties for Rent', href: '/properties?purpose=Rent' },
                { name: 'Commercial Spaces', href: '/properties?type=Commercial' },
                { name: 'About Us', href: '/about' },
                { name: 'Contact', href: '/contact' },
              ].map(item => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-teal-400 transition-colors flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3 text-slate-600" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 border-l-2 border-teal-500 pl-3">Property Types</h4>
            <ul className="space-y-2 text-xs">
              {['2 BHK Builder Floors', '3 BHK Luxury Floors', '4 BHK & 5 BHK Floors', 'CGHS Society Flats', 'DDA Apartments', 'Commercial Shops', 'Freehold Plots'].map(t => (
                <li key={t} className="flex items-center gap-1.5 hover:text-teal-400 transition-colors cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500/60" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 border-l-2 border-teal-500 pl-3">Contact Us</h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>Dwarka, New Delhi, India - 110075</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href="tel:9911956274" className="text-teal-400 font-bold hover:underline">+91 9911956274</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href="mailto:shrishyamproperties001@gmail.com" className="hover:text-teal-400 transition-colors">shrishyamproperties001@gmail.com</a>
              </div>
              <a
                href="https://wa.me/919911956274?text=Hello%20Shri%20Shyam%20Associate"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold mt-3 transition-colors"
              >
                <span>WhatsApp Now</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Shri Shyam Associate. All rights reserved.</p>
          <p>Made with ♥ for Dwarka, New Delhi</p>
        </div>
      </div>
    </footer>
  );
}
