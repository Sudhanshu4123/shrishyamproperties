'use client';

import React, { useState } from 'react';
import { Settings, Save, Server, ShieldCheck, Phone, Mail, MapPin, Sparkles } from 'lucide-react';
import { SystemSettings } from '../../types/admin';

interface SettingsTabProps {
  settings: SystemSettings;
  onSaveSettings: (s: Partial<SystemSettings>) => void;
}

export default function SettingsTab({ settings, onSaveSettings }: SettingsTabProps) {
  const [formData, setFormData] = useState<SystemSettings>(settings);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            <Settings className="w-5 h-5 text-teal-600" />
            <span>Global System Settings & API Config</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure agency details, WhatsApp hotline, Spring Boot API endpoint & 3D model settings.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold text-center">
          ✓ System settings updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-xs text-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-bold text-slate-500 uppercase tracking-wider mb-2">Agency Name</label>
            <input
              type="text"
              value={formData.agencyName}
              onChange={e => setFormData({ ...formData, agencyName: e.target.value })}
              className="w-full bg-slate-50 text-slate-800 rounded-xl p-3 border border-slate-200 focus:border-teal-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-500 uppercase tracking-wider mb-2">Tagline</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={e => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full bg-slate-50 text-slate-800 rounded-xl p-3 border border-slate-200 focus:border-teal-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-500 uppercase tracking-wider mb-2">WhatsApp Hotline</label>
            <input
              type="text"
              value={formData.whatsappHotline}
              onChange={e => setFormData({ ...formData, whatsappHotline: e.target.value })}
              className="w-full bg-slate-50 text-slate-800 rounded-xl p-3 border border-slate-200 focus:border-teal-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-500 uppercase tracking-wider mb-2">Support Email</label>
            <input
              type="email"
              value={formData.emailSupport}
              onChange={e => setFormData({ ...formData, emailSupport: e.target.value })}
              className="w-full bg-slate-50 text-slate-800 rounded-xl p-3 border border-slate-200 focus:border-teal-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-bold text-slate-500 uppercase tracking-wider mb-2">Dwarka Office Address</label>
            <input
              type="text"
              value={formData.dwarkaOfficeAddress}
              onChange={e => setFormData({ ...formData, dwarkaOfficeAddress: e.target.value })}
              className="w-full bg-slate-50 text-slate-800 rounded-xl p-3 border border-slate-200 focus:border-teal-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-bold text-slate-500 uppercase tracking-wider mb-2">Backend Spring Boot API Endpoint URL</label>
            <input
              type="text"
              value={formData.backendApiUrl}
              onChange={e => setFormData({ ...formData, backendApiUrl: e.target.value })}
              className="w-full bg-slate-50 text-slate-800 rounded-xl p-3 border border-slate-200 focus:border-teal-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2 p-5 rounded-2xl bg-teal-50/50 border border-teal-100 space-y-4">
            <h3 className="font-extrabold text-teal-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Cloudinary Image Cloud API Configuration</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1">Cloud Name</label>
                <input
                  type="text"
                  placeholder="shrishyamproperties"
                  value={formData.cloudinaryCloudName || ''}
                  onChange={e => setFormData({ ...formData, cloudinaryCloudName: e.target.value })}
                  className="w-full bg-white text-slate-800 rounded-xl p-3 border border-slate-200 focus:border-teal-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1">API Key / Secret</label>
                <input
                  type="text"
                  placeholder="81UKRoZlSzOgkntxnN7Jdf9e4_A"
                  value={formData.cloudinaryApiKey || ''}
                  onChange={e => setFormData({ ...formData, cloudinaryApiKey: e.target.value })}
                  className="w-full bg-white text-slate-800 rounded-xl p-3 border border-slate-200 focus:border-teal-500 focus:outline-none font-mono"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-500 uppercase tracking-wider mb-1">Upload Preset</label>
                <input
                  type="text"
                  placeholder="dwarka_properties"
                  value={formData.cloudinaryUploadPreset || ''}
                  onChange={e => setFormData({ ...formData, cloudinaryUploadPreset: e.target.value })}
                  className="w-full bg-white text-slate-800 rounded-xl p-3 border border-slate-200 focus:border-teal-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl btn-teal font-extrabold text-xs shadow-md flex items-center gap-2 hover:scale-105 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save System Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
