'use client';

import React, { useState } from 'react';
import { Settings, Save, Sparkles } from 'lucide-react';
import { SystemSettings } from '../../../types/admin';

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
            <span>Agency Profile & Contact Settings</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage agency branding, WhatsApp hotline, support email & office address.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold text-center">
          ✓ Agency settings updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-xs text-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-bold text-slate-500 uppercase tracking-wider mb-2">Agency Name</label>
            <input
              type="text"
              spellCheck={true}
              value={formData.agencyName}
              onChange={e => setFormData({ ...formData, agencyName: e.target.value })}
              className="w-full bg-slate-50 text-slate-800 rounded-xl p-3 border border-slate-200 focus:border-teal-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-500 uppercase tracking-wider mb-2">Tagline</label>
            <input
              type="text"
              spellCheck={true}
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
              spellCheck={true}
              value={formData.emailSupport}
              onChange={e => setFormData({ ...formData, emailSupport: e.target.value })}
              className="w-full bg-slate-50 text-slate-800 rounded-xl p-3 border border-slate-200 focus:border-teal-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-bold text-slate-500 uppercase tracking-wider mb-2">Dwarka Office Address</label>
            <input
              type="text"
              spellCheck={true}
              value={formData.dwarkaOfficeAddress}
              onChange={e => setFormData({ ...formData, dwarkaOfficeAddress: e.target.value })}
              className="w-full bg-slate-50 text-slate-800 rounded-xl p-3 border border-slate-200 focus:border-teal-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl btn-teal font-extrabold text-xs shadow-md flex items-center gap-2 hover:scale-105 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Agency Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
}
