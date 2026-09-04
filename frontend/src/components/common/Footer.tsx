'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Building2, Phone, Mail, MapPin, ArrowUpRight, Clock, Hammer } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Image 
                src="/logo.png" 
                alt="Shri Shyam Associate" 
                width={200}
                height={56}
                className="h-14 w-auto object-contain bg-white/95 p-2 rounded-2xl shadow-md border border-white/20" 
              />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Dwarka's premier Home Builder & real estate consultancy offering turnkey home construction, verified 2–5 BHK luxury builder floors, society flats, commercial shops, and plots.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400 font-semibold bg-slate-800 px-3 py-2 rounded-xl border border-slate-700">
              <span>✓</span>
              <span>100% Verified Properties & Construction</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-sm font-bold text-white mb-4 border-l-2 border-teal-500 pl-3">Quick Links</p>
            <ul className="space-y-2 text-xs">
              {[
                { name: 'Home Builder & Construction', href: '/home-builder', highlight: true },
                { name: 'Featured Properties', href: '/properties' },
                { name: 'Properties for Sale', href: '/properties?purpose=Buy' },
                { name: 'Properties for Rent', href: '/properties?purpose=Rent' },
                { name: 'Commercial Spaces', href: '/properties?type=Commercial' },
                { name: 'About Us', href: '/about' },
                { name: 'Contact', href: '/contact' },
                { name: 'HTML Sitemap', href: '/sitemap' },
              ].map(item => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`hover:text-teal-400 transition-colors flex items-center gap-1 ${
                      item.highlight ? 'text-teal-400 font-bold' : ''
                    }`}
                  >
                    <ArrowUpRight className="w-3 h-3 text-slate-600" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <p className="text-sm font-bold text-white mb-4 border-l-2 border-teal-500 pl-3">Property Types & Services</p>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'Turnkey Home Construction', href: '/home-builder' },
                { label: '2 BHK Builder Floors', href: '/properties?bhk=2' },
                { label: '3 BHK Luxury Floors', href: '/properties?bhk=3' },
                { label: '4 BHK & 5 BHK Floors', href: '/properties?bhk=4' },
                { label: 'CGHS Society Flats', href: '/properties?type=Apartment' },
                { label: 'DDA Apartments', href: '/properties?type=Apartment' },
                { label: 'Commercial Shops', href: '/properties?type=Commercial' },
                { label: 'Dwarka Expressway Projects', href: '/properties?sector=Dwarka+Expressway' },
              ].map(t => (
                <li key={t.label}>
                  <Link href={t.href} className="flex items-center gap-1.5 hover:text-teal-400 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500/60" />
                    <span>{t.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & NAP */}
          <div>
            <p className="text-sm font-bold text-white mb-4 border-l-2 border-teal-500 pl-3">Contact & Visit Us</p>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Shop No. 247, 2nd Floor, Vardhaman City Mall, Vaishali, Sector 7, Dwarka, Delhi - 110077
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="text-slate-300 font-medium">Open 24 Hours (Mon – Sun)</span>
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
                href="https://wa.me/919911956274?text=Hello%20Shri%20Shyam%20Associate,%20I%20am%20inquiring%20about%20Home%20Builder%20and%20Property%20services."
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold mt-3 transition-colors shadow-sm"
              >
                <span>WhatsApp 24/7 Helpline</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Shri Shyam Associate. All rights reserved.</p>
          <p>Home Builder & Real Estate Advisors | Dwarka Sector 7, Delhi</p>
        </div>
      </div>
    </footer>
  );
}
