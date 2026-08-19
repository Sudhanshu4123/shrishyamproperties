'use client';

import React from 'react';
import { 
  Building2, 
  Layers, 
  Calendar, 
  TrendingUp, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles,
  Phone,
  MapPin
} from 'lucide-react';
import { AdminProperty, AdminLead, ActivityLog } from '../../../types/admin';

interface OverviewTabProps {
  stats: any;
  properties: AdminProperty[];
  leads: AdminLead[];
  logs: ActivityLog[];
  onNavigateToTab: (tab: string) => void;
}

export default function OverviewTab({ stats, properties, leads, logs, onNavigateToTab }: OverviewTabProps) {
  const sectorCounts = React.useMemo(() => {
    const sectors = ['Dwarka Sector 7', 'Dwarka Sector 6', 'Dwarka Sector 10', 'Dwarka Sector 12', 'Dwarka Sector 21'];
    return sectors.map(sec => {
      const count = properties.filter(p => p.sector === sec || p.location.includes(sec)).length;
      const total = properties.length || 1;
      const calcPct = Math.round((count / total) * 100);
      const displayPct = count > 0 ? Math.max(calcPct, 25) : 12;
      return { sector: sec, count, percent: `${displayPct}%` };
    });
  }, [properties]);

  return (
    <div className="space-y-6">
      {/* Top Banner Hero */}
      <div className="relative p-6 rounded-3xl bg-gradient-to-r from-teal-700 via-teal-800 to-slate-900 border border-teal-600/30 overflow-hidden shadow-md text-white">
        <div className="absolute right-0 top-0 w-96 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-200 uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Real Estate Operations Console</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shri Shyam Associate <span className="text-teal-300">Executive Control</span>
            </h2>
            <p className="text-xs text-teal-100 mt-1 max-w-xl">
              Full administrative authority for Dwarka builder floors, society flats, penthouses & customer enquiry pipelines.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateToTab('properties')}
              className="px-4 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-teal-50 text-xs font-extrabold shadow-md transition-all flex items-center gap-1.5"
            >
              <span>Manage Properties ({stats.totalProperties})</span>
              <ArrowUpRight className="w-4 h-4 text-teal-600" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stat Widgets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Widget 1 */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-teal-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Portfolio Value</span>
            <div className="p-2 rounded-xl bg-teal-50 text-teal-600 border border-teal-200">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-slate-800 block">{stats.totalPortfolioValueDisplay}</span>
          <div className="flex items-center gap-1.5 text-[10px] text-teal-600 font-semibold mt-2">
            <span>{stats.totalProperties} Active Dwarka Listings</span>
          </div>
        </div>

        {/* Widget 2 */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-teal-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Enquiries</span>
            <div className="p-2 rounded-xl bg-teal-50 text-teal-600 border border-teal-200">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-slate-800 block">{stats.totalLeads}</span>
          <div className="flex items-center gap-1.5 text-[10px] text-teal-600 font-semibold mt-2">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
            <span>{stats.newLeads} New Enquiries Requiring Action</span>
          </div>
        </div>

        {/* Widget 3 */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-teal-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Scheduled Site Visits</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-teal-600 block">{stats.activeVisits}</span>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-2">
            <span>Upcoming Dwarka Property Tours</span>
          </div>
        </div>

        {/* Widget 4 */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-teal-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Featured Properties</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-slate-800 block">{stats.featuredCount}</span>
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-semibold mt-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Homepage Priority Spotlight</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Leads + Dwarka Sector Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Recent Leads Pipeline */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-800">Recent Buyer & Seller Enquiries</h3>
              <p className="text-xs text-slate-500">Incoming customer inquiries from website forms & WhatsApp</p>
            </div>
            <button
              onClick={() => onNavigateToTab('leads')}
              className="text-xs font-bold text-teal-600 hover:underline flex items-center gap-1"
            >
              <span>View All CRM ({leads.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {leads.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-xs text-slate-500 font-semibold mb-1">No buyer or seller enquiries received yet.</p>
                <p className="text-[11px] text-slate-400">Enquiries submitted via website forms will appear here automatically.</p>
              </div>
            ) : (
              leads.slice(0, 4).map(lead => (
                <div
                  key={lead.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-teal-400 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-800">{lead.name}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                        {lead.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1 text-slate-700 font-medium">
                        <Phone className="w-3 h-3 text-teal-600" />
                        {lead.phone}
                      </span>
                      <span>•</span>
                      <span className="text-teal-700 font-semibold">{lead.budget}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {lead.preferredLocation}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/91${lead.phone}?text=Hello%20${encodeURIComponent(lead.name)},%20this%20is%20Shri%20Shyam%20Associate%20Dwarka.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 text-xs font-bold transition-all"
                    >
                      WhatsApp
                    </a>
                    <a
                      href={`tel:${lead.phone}`}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 text-white hover:bg-slate-700 text-xs font-bold transition-all"
                    >
                      Call Client
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Dwarka Sector Portfolio Breakdown */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800 mb-1">Dwarka Sector Coverage</h3>
            <p className="text-xs text-slate-500 mb-6">Property listing concentration by location</p>

            <div className="space-y-3">
              {sectorCounts.map((s, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700">{s.sector}</span>
                    <span className="text-teal-600 font-bold">{s.count} {s.count === 1 ? 'Property' : 'Properties'}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                    <div
                      className="bg-gradient-to-r from-teal-500 to-teal-700 h-full rounded-full transition-all duration-500"
                      style={{ width: s.percent }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-teal-50 border border-teal-200 text-xs text-teal-800">
            <span className="font-bold block mb-0.5">Top Demanded Sector:</span>
            <span>Dwarka Sector 7 Builder Floors & Sector 6 CGHS Society Flats.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
