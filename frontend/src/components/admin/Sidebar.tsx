'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Building2, 
  LayoutDashboard, 
  Layers, 
  Calendar, 
  LogOut,
  BookOpen,
  X
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, onLogout, isOpen = false, onClose }: SidebarProps) {
  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'properties', label: 'Properties Portfolio', icon: Building2 },
    { id: 'blogs', label: 'Blogs & Guides', icon: BookOpen },
    { id: 'leads', label: 'Leads & Enquiries', icon: Layers },
    { id: 'visits', label: 'Site Visits Calendar', icon: Calendar }
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (onClose) onClose();
  };

  const sidebarContent = (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between h-full text-slate-700 shadow-xl md:shadow-none">
      <div>
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <Image 
            src="/logo.png" 
            alt="Shri Shyam Associate Admin" 
            width={160}
            height={48}
            className="h-10 sm:h-12 w-auto object-contain" 
          />
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-1.5 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 cursor-pointer"
              aria-label="Close sidebar menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* System Health Status Indicator */}
        <div className="px-3.5 py-2.5 mx-4 my-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-[11px] font-bold text-emerald-800 truncate">System Active</span>
          </div>
          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300/60 shrink-0">
            Online
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="px-3 space-y-1.5 mt-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center justify-start px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'btn-teal font-bold shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Footer Profile & Logout */}
      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 gap-2">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="w-8 h-8 rounded-full bg-teal-100 border border-teal-300 flex items-center justify-center font-bold text-teal-700 text-xs shrink-0">
              SA
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-bold text-slate-800 block leading-tight truncate">Super Admin</span>
              <span className="text-[10px] text-slate-500 block truncate" title="admin@shrishyamassociate.com">admin@shrishyam.com</span>
            </div>
          </div>
          <button
            onClick={onLogout}
            title="Logout"
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors shrink-0 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden md:flex h-screen sticky top-0 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-Over Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-2xl z-10 animate-slideRight">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
