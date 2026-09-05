'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Building2, Phone, Mail, MapPin, ArrowUpRight, Clock, Map } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand & NAP Summary (Col 1) */}
          <div className="lg:col-span-2">
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
              Dwarka’s premier Home Builder & real estate advisory headquartered at Shop No. 247, 2nd Floor, Vardhaman City Mall, Sector 7, Dwarka, Delhi 110077. Specializing in verified luxury builder floors, DDA flats, society apartments, and retail commercial properties with 100% legal title clearance.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400 font-semibold bg-slate-800/80 px-3.5 py-2.5 rounded-xl border border-slate-700/80 mb-4">
              <span>✓</span>
              <span>100% Freehold Verified Properties & Bank Loan Approved</span>
            </div>
            <div className="text-xs text-slate-400 space-y-1">
              <p><strong className="text-slate-200">Agency Name:</strong> Shri Shyam Associate</p>
              <p><strong className="text-slate-200">Address:</strong> Shop No. 247, 2nd Floor, Vardhaman City Mall, Sector 7, Dwarka, New Delhi - 110077</p>
              <p><strong className="text-slate-200">Direct Phone:</strong> <a href="tel:9911956274" className="text-teal-400 hover:underline">+91 9911956274</a></p>
            </div>
          </div>

          {/* Quick Links & Categories (Col 2) */}
          <div>
            <p className="text-sm font-bold text-white mb-4 border-l-2 border-teal-500 pl-3">Property Categories</p>
            <ul className="space-y-2 text-xs">
              {[
                { name: 'Properties for Sale', href: '/properties/for-sale' },
                { name: 'Properties for Rent', href: '/properties/for-rent' },
                { name: 'Luxury Builder Floors', href: '/builder-floors', highlight: true },
                { name: 'Commercial Property & Shops', href: '/commercial-property' },
                { name: 'DDA Flats & Apartments', href: '/dda-flats' },
                { name: 'Turnkey Home Builder', href: '/home-builder', highlight: true },
                { name: 'All Properties Directory', href: '/properties' },
                { name: 'HTML Sitemap', href: '/sitemap' },
              ].map(item => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`hover:text-teal-400 transition-colors flex items-center gap-1 ${
                      item.highlight ? 'text-teal-400 font-semibold' : ''
                    }`}
                  >
                    <ArrowUpRight className="w-3 h-3 text-slate-600" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Dwarka Sector Hubs (Col 3) */}
          <div>
            <p className="text-sm font-bold text-white mb-4 border-l-2 border-teal-500 pl-3">Dwarka Sector Hubs</p>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'Dwarka City Overview', href: '/locations/dwarka' },
                { label: 'Dwarka Sector 6 (Central Market)', href: '/locations/dwarka-sector-6' },
                { label: 'Dwarka Sector 7 (Ramphal Chowk)', href: '/locations/dwarka-sector-7' },
                { label: 'Dwarka Sector 21 (Interchange)', href: '/locations/dwarka-sector-21' },
                { label: 'Dwarka Sector 23 (Yashobhoomi)', href: '/locations/dwarka-sector-23' },
                { label: 'Dwarka Expressway Link', href: '/properties?sector=Dwarka+Expressway' },
                { label: 'About Shri Shyam Associate', href: '/about' },
                { label: 'Contact Us & Site Visits', href: '/contact' },
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

          {/* Real Estate Guides & Help Desk (Col 4) */}
          <div>
            <p className="text-sm font-bold text-white mb-4 border-l-2 border-teal-500 pl-3">Buying Guides & Help</p>
            <ul className="space-y-2 text-xs mb-6">
              {[
                { label: 'Best Sectors in Dwarka', href: '/blog/best-sectors-to-buy-property-in-dwarka' },
                { label: 'Documents Required in Delhi', href: '/blog/documents-required-for-buying-property-in-delhi' },
                { label: 'Builder Floors vs DDA Flats', href: '/blog/builder-floors-vs-dda-flats-in-dwarka' },
                { label: '2 BHK vs 3 BHK in Dwarka', href: '/blog/2-bhk-vs-3-bhk-in-dwarka' },
                { label: '10 Things to Check', href: '/blog/things-to-check-before-buying-property-in-dwarka' },
              ].map(g => (
                <li key={g.label}>
                  <Link href={g.href} className="hover:text-teal-400 transition-colors block line-clamp-1">
                    • {g.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="space-y-2.5 text-xs pt-3 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span className="text-slate-300 font-medium">Open 24 Hours / 7 Days</span>
              </div>
              <a
                href="https://wa.me/919911956274?text=Hello%20Shri%20Shyam%20Associate"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
              >
                <span>WhatsApp 24/7 Helpline</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Shri Shyam Associate. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Home Builder & Premier Real Estate Agency</span>
            <span>•</span>
            <span>Dwarka Sector 7, New Delhi 110077</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
