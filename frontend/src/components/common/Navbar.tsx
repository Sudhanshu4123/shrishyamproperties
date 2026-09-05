'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X, ChevronRight, ChevronDown, MapPin, BookOpen, Building2 } from 'lucide-react';

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
    { name: 'Home Builder', href: '/home-builder' },
    { name: 'For Sale', href: '/properties/for-sale' },
    { name: 'Builder Floors', href: '/builder-floors' },
    { name: 'Rent', href: '/properties/for-rent' },
    { name: 'Commercial', href: '/commercial-property' },
    { name: 'Dwarka Sectors', href: '/locations/dwarka' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? 'navbar-light py-3 shadow-sm bg-white/95 backdrop-blur-md'
          : 'bg-white/80 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center group shrink-0">
          <Image 
            src="/logo.png" 
            alt="Shri Shyam Associate" 
            width={180}
            height={48}
            priority
            className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform" 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-0.5">
          {navLinks.map(link => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href.split('?')[0]));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  isActive
                    ? 'text-teal-700 bg-teal-50 font-bold'
                    : 'text-slate-700 hover:text-teal-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="tel:9911956274"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-sm"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>+91 9911956274</span>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="xl:hidden flex items-center gap-2">
          <a href="tel:9911956274" className="p-2 rounded-xl bg-teal-600 text-white">
            <Phone className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-100 px-4 py-4 shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-2.5 text-xs font-semibold rounded-xl text-slate-700 hover:text-teal-600 hover:bg-teal-50"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <a
                href="https://wa.me/919911956274?text=Hello%20Shri%20Shyam%20Associate"
                target="_blank"
                rel="noreferrer"
                className="block w-full py-2.5 text-center text-xs font-bold text-white bg-teal-600 rounded-xl shadow-sm"
              >
                WhatsApp 24/7 Desk
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
