'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { PropertyService } from '@/services/propertyService';
import { Property, PropertyLead, LeadStatus, PropertyType, PropertyPurpose, DwarkaSector } from '@/types/property';
import { 
  Building2, Users, Layers, TrendingUp, Plus, Trash2, Edit3, Eye, EyeOff, 
  Star, Lock, LogOut, CheckCircle, Search, Filter, Phone, Mail, MapPin, Sparkles, X 
} from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'properties' | 'leads' | 'analytics'>('properties');
  const [properties, setProperties] = useState<Property[]>([]);
  const [leads, setLeads] = useState<PropertyLead[]>([]);
  const [stats, setStats] = useState<any>({});

  // Add Property Modal State
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);

  const [newProp, setNewProp] = useState({
    title: '',
    purpose: 'Buy' as PropertyPurpose,
    type: '3 BHK' as PropertyType,
    priceDisplay: '₹ 1.85 Cr',
    priceValue: 18500000,
    location: 'Dwarka Sector 7',
    sector: 'Dwarka Sector 7' as DwarkaSector,
    bhk: 3,
    bathrooms: 3,
    areaSqFt: 1800,
    carpetAreaSqFt: 1500,
    floor: '1st Floor',
    totalFloors: 4,
    parking: '2 Covered Parking Slots',
    furnishing: 'Semi-Furnished' as any,
    facing: 'North-East' as any,
    propertyAge: 'Brand New',
    availability: 'Ready to Move' as any,
    featured: true,
    published: true,
    heroImage: '/images/luxury_builder_floor_dwarka_1786010981126.png',
    description: 'Ultra luxury floor with modern amenities in Dwarka.',
    amenities: 'Private Lift, Stilt Parking, Italian Marble, PNG Gas Line',
    contactNumber: '9911956274'
  });

  useEffect(() => {
    // Check local admin session
    const authSession = sessionStorage.getItem('ssp_admin_auth');
    if (authSession === 'true') {
      setIsAuthenticated(true);
    }
    refreshData();
  }, []);

  const refreshData = () => {
    setProperties(PropertyService.getProperties());
    setLeads(PropertyService.getLeads());
    setStats(PropertyService.getAdminStats());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if ((loginEmail === 'admin@shrishyamproperties.com' || loginEmail === 'admin') && loginPassword === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('ssp_admin_auth', 'true');
      setLoginError('');
      refreshData();
    } else {
      setLoginError('Invalid email/username or password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('ssp_admin_auth');
  };

  const handleToggleFeatured = (id: string, current: boolean) => {
    PropertyService.updateProperty(id, { featured: !current });
    refreshData();
  };

  const handleTogglePublished = (id: string, current: boolean) => {
    PropertyService.updateProperty(id, { published: !current });
    refreshData();
  };

  const handleDeleteProperty = (id: string) => {
    if (confirm('Are you sure you want to delete this property listing?')) {
      PropertyService.deleteProperty(id);
      refreshData();
    }
  };

  const handleEditProperty = (prop: Property) => {
    setEditingPropertyId(prop.id);
    setNewProp({
      title: prop.title,
      purpose: prop.purpose,
      type: prop.type,
      priceDisplay: prop.priceDisplay,
      priceValue: prop.priceValue,
      location: prop.location,
      sector: prop.sector,
      bhk: prop.bhk,
      bathrooms: prop.bathrooms,
      areaSqFt: prop.areaSqFt,
      carpetAreaSqFt: prop.carpetAreaSqFt,
      floor: prop.floor,
      totalFloors: prop.totalFloors,
      parking: prop.parking,
      furnishing: prop.furnishing,
      facing: prop.facing,
      propertyAge: prop.propertyAge,
      availability: prop.availability,
      featured: prop.featured,
      published: prop.published,
      heroImage: prop.heroImage,
      description: prop.description,
      amenities: Array.isArray(prop.amenities) ? prop.amenities.join(', ') : prop.amenities || '',
      contactNumber: prop.contactNumber
    });
    setIsAddPropertyOpen(true);
  };

  const handleLeadStatusChange = (leadId: string, newStatus: LeadStatus) => {
    PropertyService.updateLeadStatus(leadId, newStatus);
    refreshData();
  };

  const handleDeleteLead = (leadId: string) => {
    if (confirm('Delete this lead enquiry record?')) {
      PropertyService.deleteLead(leadId);
      refreshData();
    }
  };

  const handleSavePropertyForm = (e: React.FormEvent) => {
    e.preventDefault();
    const amenitiesArr = newProp.amenities.split(',').map(s => s.trim()).filter(Boolean);

    if (editingPropertyId) {
      PropertyService.updateProperty(editingPropertyId, {
        ...newProp,
        amenities: amenitiesArr,
        highlights: ['Prime location in Dwarka', 'Verified title & loan assistance']
      });
    } else {
      PropertyService.addProperty({
        ...newProp,
        slug: newProp.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        images: [newProp.heroImage],
        amenities: amenitiesArr,
        highlights: ['Prime location in Dwarka', 'Verified title & loan assistance']
      });
    }

    setIsAddPropertyOpen(false);
    setEditingPropertyId(null);
    refreshData();
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f0f4f8] text-slate-800 flex flex-col justify-between font-sans">
        <Navbar />

        <div className="pt-32 pb-20 px-4 max-w-md mx-auto w-full my-auto">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center mx-auto mb-4 font-black shadow-md">
              <Lock className="w-6 h-6" />
            </div>

            <h2 className="text-2xl font-black text-slate-800 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>Admin Portal Login</h2>
            <p className="text-xs text-teal-600 text-center font-semibold mt-1 mb-6">
              Shri Shyam Associate Management
            </p>

            {loginError && (
              <div className="p-3 mb-4 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 text-xs text-center font-semibold">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Email / Username
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter username or email"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  className="w-full bg-slate-50 text-slate-800 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 focus:border-teal-500 focus:outline-none"
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
                  className="w-full bg-slate-50 text-slate-800 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 focus:border-teal-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-teal text-xs py-3 rounded-xl font-extrabold shadow-md hover:scale-[1.02] transition-transform"
              >
                Login
              </button>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f4f8] text-slate-800 flex flex-col font-sans">
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        {/* Dashboard Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-600 uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Real Estate Operations</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-800" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shri Shyam Associate <span className="gold-gradient-text">Admin Dashboard</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setEditingPropertyId(null);
                setIsAddPropertyOpen(true);
              }}
              className="px-4 py-2.5 btn-teal text-xs rounded-xl shadow-md flex items-center gap-1.5 hover:scale-105 transition-transform"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Property</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2.5 bg-white text-slate-600 hover:text-rose-600 font-bold text-xs rounded-xl border border-slate-200 shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Analytics KPI Stat Widgets Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold uppercase text-slate-500">Total Properties</span>
            <span className="text-2xl font-black text-slate-800 block mt-1">{stats.totalProperties}</span>
            <span className="text-[10px] text-teal-600 font-semibold">{stats.featuredProperties} Featured</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold uppercase text-slate-500">Properties For Sale</span>
            <span className="text-2xl font-black text-teal-600 block mt-1">{stats.propertiesForSale}</span>
            <span className="text-[10px] text-slate-500">{stats.propertiesForRent} For Rent</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold uppercase text-slate-500">Total Lead Enquiries</span>
            <span className="text-2xl font-black text-slate-800 block mt-1">{stats.totalLeads}</span>
            <span className="text-[10px] text-emerald-600 font-semibold">{stats.newLeadsCount} New Enquiries</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold uppercase text-slate-500">Site Visits Pipeline</span>
            <span className="text-2xl font-black text-teal-600 block mt-1">{stats.siteVisitsCount}</span>
            <span className="text-[10px] text-slate-500">Active Visits</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('properties')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'properties'
                ? 'btn-teal shadow-md'
                : 'text-slate-500 hover:text-slate-800 bg-white border border-slate-200'
            }`}
          >
            Properties Listing Manager ({properties.length})
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'leads'
                ? 'btn-teal shadow-md'
                : 'text-slate-500 hover:text-slate-800 bg-white border border-slate-200'
            }`}
          >
            Lead Enquiries & Site Visits ({leads.length})
          </button>
        </div>

        {/* TAB 1: PROPERTIES MANAGER */}
        {activeTab === 'properties' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-teal-700 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-4">Property Title</th>
                    <th className="p-4">Type & Purpose</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Dwarka Sector</th>
                    <th className="p-4">Featured</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {properties.map(prop => (
                    <tr key={prop.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-bold text-slate-800 max-w-xs truncate">{prop.title}</td>
                      <td className="p-4">
                        <span className="font-semibold text-slate-700">{prop.type}</span>
                        <span className="block text-[10px] text-teal-600 font-bold">{prop.purpose}</span>
                      </td>
                      <td className="p-4 font-black text-teal-700">{prop.priceDisplay}</td>
                      <td className="p-4 text-slate-600">{prop.sector}</td>
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleFeatured(prop.id, prop.featured)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            prop.featured
                              ? 'bg-amber-50 text-amber-600 border-amber-200'
                              : 'bg-slate-50 text-slate-400 border-slate-200'
                          }`}
                          title="Toggle Featured Status"
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleTogglePublished(prop.id, prop.published)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                            prop.published
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}
                        >
                          {prop.published ? 'Published' : 'Hidden'}
                        </button>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditProperty(prop)}
                            className="p-1.5 rounded-lg bg-teal-50 text-teal-600 hover:bg-teal-600 hover:text-white border border-teal-200 transition-colors"
                            title="Edit Listing"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProperty(prop.id)}
                            className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white border border-rose-200 transition-colors"
                            title="Delete Listing"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: LEAD PIPELINE MANAGER */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-teal-700 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-4">Client Contact</th>
                    <th className="p-4">Requirement</th>
                    <th className="p-4">Budget & Location</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Lead Pipeline Status</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leads.map(lead => (
                    <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4">
                        <span className="font-bold text-slate-800 block">{lead.name}</span>
                        <a href={`tel:${lead.phone}`} className="text-teal-600 font-semibold text-[11px] block">
                          {lead.phone}
                        </a>
                        <span className="text-slate-500 text-[10px]">{lead.email}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-slate-700">{lead.lookingFor} {lead.propertyType}</span>
                        {lead.propertyTitle && (
                          <span className="block text-[10px] text-slate-500 truncate max-w-xs">{lead.propertyTitle}</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className="text-teal-700 font-bold block">{lead.budget}</span>
                        <span className="text-slate-500 text-[10px]">{lead.preferredLocation}</span>
                      </td>
                      <td className="p-4 text-slate-500 text-[11px]">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <select
                          value={lead.status}
                          onChange={e => handleLeadStatusChange(lead.id, e.target.value as LeadStatus)}
                          className="bg-slate-50 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Site Visit">Site Visit</option>
                          <option value="Negotiation">Negotiation</option>
                          <option value="Closed">Closed</option>
                          <option value="Not Interested">Not Interested</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white border border-rose-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* ADD / EDIT PROPERTY MODAL */}
      {isAddPropertyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl my-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xl">
            <button
              onClick={() => setIsAddPropertyOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-800 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              {editingPropertyId ? 'Edit Dwarka Property Listing' : 'Add New Dwarka Property Listing'}
            </h3>

            <form onSubmit={handleSavePropertyForm} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-500 uppercase mb-1">Property Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 3 BHK Ultra Luxury Builder Floor with Private Lift"
                  value={newProp.title}
                  onChange={e => setNewProp({ ...newProp, title: e.target.value })}
                  className="w-full bg-slate-50 text-slate-800 rounded-xl p-3 border border-slate-200 focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-500 uppercase mb-1">Purpose</label>
                  <select
                    value={newProp.purpose}
                    onChange={e => setNewProp({ ...newProp, purpose: e.target.value as PropertyPurpose })}
                    className="w-full bg-slate-50 text-slate-800 rounded-xl p-3 border border-slate-200 focus:border-teal-500 focus:outline-none"
                  >
                    <option value="Buy">Buy</option>
                    <option value="Projects">Projects</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Rent">Rent</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-500 uppercase mb-1">Property Type</label>
                  <select
                    value={newProp.type}
                    onChange={e => setNewProp({ ...newProp, type: e.target.value as PropertyType })}
                    className="w-full bg-slate-50 text-slate-800 rounded-xl p-3 border border-slate-200 focus:border-teal-500 focus:outline-none"
                  >
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                    <option value="4 BHK">4 BHK</option>
                    <option value="5 BHK">5 BHK</option>
                    <option value="Builder Floor">Builder Floor</option>
                    <option value="DDA Flat">DDA Flat</option>
                    <option value="Society Flat">Society Flat</option>
                    <option value="Projects">Projects</option>
                    <option value="New Launch">New Launch</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Plot">Plot</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-500 uppercase mb-1">Display Price *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹ 1.85 Cr"
                    value={newProp.priceDisplay}
                    onChange={e => setNewProp({ ...newProp, priceDisplay: e.target.value })}
                    className="w-full bg-slate-50 text-slate-800 rounded-xl p-3 border border-slate-200 focus:border-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-500 uppercase mb-1">Dwarka Sector</label>
                  <select
                    value={newProp.sector}
                    onChange={e => setNewProp({ ...newProp, sector: e.target.value as DwarkaSector })}
                    className="w-full bg-slate-50 text-slate-800 rounded-xl p-3 border border-slate-200 focus:border-teal-500 focus:outline-none"
                  >
                    <option value="Dwarka Sector 6">Dwarka Sector 6</option>
                    <option value="Dwarka Sector 7">Dwarka Sector 7</option>
                    <option value="Dwarka Sector 8">Dwarka Sector 8</option>
                    <option value="Dwarka Sector 10">Dwarka Sector 10</option>
                    <option value="Dwarka Sector 21">Dwarka Sector 21</option>
                    <option value="Dwarka Sector 23">Dwarka Sector 23</option>
                    <option value="MBR Enclave">MBR Enclave</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-500 uppercase mb-1">Bedrooms (BHK)</label>
                  <input
                    type="number"
                    value={newProp.bhk}
                    onChange={e => setNewProp({ ...newProp, bhk: Number(e.target.value) })}
                    className="w-full bg-slate-50 text-slate-800 rounded-xl p-3 border border-slate-200 focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-500 uppercase mb-1">Area (sq.ft.)</label>
                  <input
                    type="number"
                    value={newProp.areaSqFt}
                    onChange={e => setNewProp({ ...newProp, areaSqFt: Number(e.target.value) })}
                    className="w-full bg-slate-50 text-slate-800 rounded-xl p-3 border border-slate-200 focus:border-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-500 uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newProp.description}
                  onChange={e => setNewProp({ ...newProp, description: e.target.value })}
                  className="w-full bg-slate-50 text-slate-800 rounded-xl p-3 border border-slate-200 focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-500 uppercase mb-1">Amenities (comma separated)</label>
                <input
                  type="text"
                  value={newProp.amenities}
                  onChange={e => setNewProp({ ...newProp, amenities: e.target.value })}
                  className="w-full bg-slate-50 text-slate-800 rounded-xl p-3 border border-slate-200 focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 font-extrabold btn-teal rounded-xl shadow-md hover:scale-[1.01] transition-transform"
                >
                  {editingPropertyId ? 'Update Dwarka Property Listing' : 'Publish Dwarka Property Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
