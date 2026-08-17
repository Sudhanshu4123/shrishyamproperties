'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, Phone, Menu, X, ChevronRight, Plus, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Buy', href: '/properties?purpose=Buy' },
    { name: 'Projects', href: '/properties?purpose=Projects' },
    { name: 'Rent', href: '/properties?purpose=Rent' },
    { name: 'Commercial', href: '/properties?type=Commercial' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? 'navbar-light py-3 shadow-sm'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-black text-slate-800 tracking-tight leading-none block">
              Shri Shyam
            </span>
            <span className="text-[9px] font-bold text-teal-600 uppercase tracking-widest">
              Properties
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href.split('?')[0]));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all ${
                  isActive
                    ? 'text-teal-600 bg-teal-50'
                    : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:9911956274"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-sm"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call 9911956274</span>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <a href="tel:9911956274" className="p-2 rounded-xl bg-teal-600 text-white">
            <Phone className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 py-4 shadow-xl">
          <div className="flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-xl text-slate-700 hover:text-teal-600 hover:bg-teal-50"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <a
                href="https://wa.me/919911956274?text=Hello%20Shri%20Shyam%20Properties"
                target="_blank"
                rel="noreferrer"
                className="block w-full py-3 text-center text-sm font-bold text-white bg-teal-600 rounded-xl"
              >
                WhatsApp Now
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
