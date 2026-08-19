'use client';

import React from 'react';
import { 
  Building2, 
  LayoutDashboard, 
  Layers, 
  Users, 
  Calendar, 
  Settings, 
  LogOut
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, onLogout }: SidebarProps) {
  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard, badge: null },
    { id: 'properties', label: 'Properties Portfolio', icon: Building2, badge: 'Full CRUD' },
    { id: 'leads', label: 'Leads & Enquiries', icon: Layers, badge: 'CRM' },
    { id: 'visits', label: 'Site Visits Calendar', icon: Calendar, badge: 'Scheduled' },
    { id: 'agents', label: 'Agents & Staff', icon: Users, badge: null },
    { id: 'settings', label: 'System Settings', icon: Settings, badge: 'API' }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between h-screen sticky top-0 z-40 text-slate-700 shadow-sm">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-black shadow-md">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-black text-slate-800 tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shri Shyam <span className="text-teal-600">Admin</span>
            </h1>
            <span className="text-[10px] text-teal-600 font-bold uppercase tracking-wider block">
              Shri Shyam Associate
            </span>
          </div>
        </div>

        {/* System Health Status Indicator */}
        <div className="px-3.5 py-2.5 mx-4 my-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-[11px] font-semibold text-slate-700 truncate">System Live</span>
          </div>
          <span className="text-[9px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200 shrink-0">
            API Online
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
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'btn-teal font-bold shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                      isActive
                        ? 'bg-slate-900 text-teal-300'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
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
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
