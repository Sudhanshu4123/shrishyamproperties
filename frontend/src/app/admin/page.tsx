'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';
import OverviewTab from '@/components/admin/dashboard/OverviewTab';
import PropertiesTab from '@/components/admin/dashboard/PropertiesTab';
import LeadsTab from '@/components/admin/dashboard/LeadsTab';
import VisitsTab from '@/components/admin/dashboard/VisitsTab';
import SettingsTab from '@/components/admin/dashboard/SettingsTab';
import { AdminService } from '@/services/adminService';
import { AdminProperty, AdminLead, SiteVisit, SystemSettings, ActivityLog } from '@/types/admin';
import { Building2, ArrowRight } from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Dashboard Tab
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // State Data
  const [stats, setStats] = useState<any>({});
  const [properties, setProperties] = useState<AdminProperty[]>([]);
  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [visits, setVisits] = useState<SiteVisit[]>([]);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [settings, setSettings] = useState<SystemSettings>({} as SystemSettings);

  useEffect(() => {
    // Check saved session
    const authSession = sessionStorage.getItem('ssp_standalone_admin_auth') || sessionStorage.getItem('ssp_admin_auth');
    if (authSession === 'true') {
      setIsAuthenticated(true);
    }
    refreshData();
  }, []);

  const refreshData = () => {
    setProperties(AdminService.getProperties());
    setLeads(AdminService.getLeads());
    setVisits(AdminService.getSiteVisits());
    setLogs(AdminService.getLogs());
    setSettings(AdminService.getSettings());
    setStats(AdminService.getDashboardStats());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = loginEmail.trim().toLowerCase();
    const pass = loginPassword.trim();
    if (
      (user === 'admin' || user === 'admin@shrishyamassociate.com' || user === 'admin@shrishyamproperties.com') &&
      (pass === 'Shrishyam@2026#' || pass === 'admin')
    ) {
      setIsAuthenticated(true);
      sessionStorage.setItem('ssp_standalone_admin_auth', 'true');
      sessionStorage.setItem('ssp_admin_auth', 'true');
      setLoginError('');
      refreshData();
    } else {
      setLoginError('Access Denied. Invalid admin credentials.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('ssp_standalone_admin_auth');
    sessionStorage.removeItem('ssp_admin_auth');
  };

  // Property Handlers
  const handleAddProperty = (propData: any) => {
    AdminService.addProperty(propData);
    refreshData();
  };

  const handleUpdateProperty = (id: string, updates: Partial<AdminProperty>) => {
    AdminService.updateProperty(id, updates);
    refreshData();
  };

  const handleDeleteProperty = (id: string) => {
    AdminService.deleteProperty(id);
    refreshData();
  };

  // Lead Handlers
  const handleUpdateLeadStatus = (id: string, status: any, notes?: string) => {
    AdminService.updateLeadStatus(id, status, notes);
    refreshData();
  };

  const handleDeleteLead = (id: string) => {
    AdminService.deleteLead(id);
    refreshData();
  };

  // Settings Handler
  const handleSaveSettings = (newSettings: Partial<SystemSettings>) => {
    AdminService.updateSettings(newSettings);
    refreshData();
  };

  // 1. LOGIN SCREEN IF NOT AUTHENTICATED
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f0f4f8] text-slate-800 flex flex-col justify-center items-center px-4 relative overflow-hidden font-sans">
        {/* Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-teal-500/10 via-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-md w-full p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl backdrop-blur-xl">
          <div className="flex justify-center mb-4">
            <img 
              src="/logo.png" 
              alt="Shri Shyam Associate" 
              className="h-16 w-auto object-contain" 
            />
          </div>

          <h1 className="text-2xl font-black text-slate-800 text-center tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Shri Shyam <span className="text-teal-600">Admin Control</span>
          </h1>
          <p className="text-xs text-slate-500 text-center font-semibold mt-1 mb-6">
            Executive Dashboard • Dwarka Real Estate
          </p>

          {loginError && (
            <div className="p-3 mb-4 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 text-xs text-center font-semibold">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Username / Email
              </label>
              <input
                type="text"
                required
                placeholder="Enter username or email"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                className="w-full bg-slate-50 text-slate-800 text-xs rounded-xl px-3.5 py-3 border border-slate-200 focus:border-teal-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                className="w-full bg-slate-50 text-slate-800 text-xs rounded-xl px-3.5 py-3 border border-slate-200 focus:border-teal-500 focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 text-xs font-extrabold text-white bg-gradient-to-r from-teal-600 via-teal-500 to-teal-700 rounded-xl shadow-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
              <span>Login</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. MAIN DASHBOARD LAYOUT
  return (
    <div className="min-h-screen bg-[#f0f4f8] text-slate-800 flex font-sans">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onOpenAddProperty={() => setActiveTab('properties')}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <main className="p-6 md:p-8 flex-1 overflow-y-auto">
          {activeTab === 'overview' && (
            <OverviewTab
              stats={stats}
              properties={properties}
              leads={leads}
              logs={logs}
              onNavigateToTab={setActiveTab}
            />
          )}

          {activeTab === 'properties' && (
            <PropertiesTab
              properties={properties}
              onAddProperty={handleAddProperty}
              onUpdateProperty={handleUpdateProperty}
              onDeleteProperty={handleDeleteProperty}
              searchTerm={searchTerm}
            />
          )}

          {activeTab === 'leads' && (
            <LeadsTab
              leads={leads}
              onUpdateLeadStatus={handleUpdateLeadStatus}
              onDeleteLead={handleDeleteLead}
              searchTerm={searchTerm}
            />
          )}

          {activeTab === 'visits' && (
            <VisitsTab visits={visits} />
          )}

          {activeTab === 'settings' && (
            <SettingsTab
              settings={settings}
              onSaveSettings={handleSaveSettings}
            />
          )}
        </main>
      </div>
    </div>
  );
}
