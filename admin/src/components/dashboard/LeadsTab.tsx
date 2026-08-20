'use client';

import React from 'react';
import { 
  Layers, 
  Trash2, 
  Phone, 
  Mail, 
  MessageSquare, 
  Calendar, 
  CheckCircle2, 
  UserCheck, 
  Clock,
  Sparkles
} from 'lucide-react';
import { AdminLead, LeadStatus } from '../../types/admin';

interface LeadsTabProps {
  leads: AdminLead[];
  onUpdateLeadStatus: (id: string, status: LeadStatus, notes?: string) => void;
  onDeleteLead: (id: string) => void;
  searchTerm: string;
}

export default function LeadsTab({
  leads,
  onUpdateLeadStatus,
  onDeleteLead,
  searchTerm
}: LeadsTabProps) {
  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.phone.includes(searchTerm) ||
    l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.preferredLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            <Layers className="w-5 h-5 text-teal-600" />
            <span>Customer Leads & Enquiry Pipeline ({filteredLeads.length})</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage client enquiries, update CRM pipeline status & contact buyers via WhatsApp / Phone.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200">
            {leads.filter(l => l.status === 'New').length} New Enquiries
          </span>
        </div>
      </div>

      {/* Leads CRM Table */}
      <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-teal-700 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">Client Information</th>
                <th className="p-4">Requirement & Budget</th>
                <th className="p-4">Target Location</th>
                <th className="p-4">Enquiry Date</th>
                <th className="p-4">Pipeline Status</th>
                <th className="p-4 text-right">Quick Contact & Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.map(lead => (
                <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4">
                    <div className="space-y-0.5">
                      <span className="font-bold text-slate-800 text-sm block">{lead.name}</span>
                      <a href={`tel:${lead.phone}`} className="text-teal-600 font-semibold block hover:underline">
                        {lead.phone}
                      </a>
                      <span className="text-[10px] text-slate-500 block">{lead.email}</span>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="font-semibold text-slate-800 block">{lead.lookingFor} {lead.propertyType}</span>
                    <span className="text-teal-700 font-bold block">{lead.budget}</span>
                    {lead.propertyTitle && (
                      <span className="text-[10px] text-slate-500 truncate max-w-xs block mt-0.5" title={lead.propertyTitle}>
                        Ref: {lead.propertyTitle}
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-slate-600 font-medium">
                    {lead.preferredLocation}
                  </td>

                  <td className="p-4 text-slate-500">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <select
                      value={lead.status}
                      onChange={e => onUpdateLeadStatus(lead.id, e.target.value as LeadStatus)}
                      className="bg-slate-50 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none"
                    >
                      <option value="New">🟢 New</option>
                      <option value="Contacted">🟡 Contacted</option>
                      <option value="Site Visit Scheduled">🔵 Site Visit Scheduled</option>
                      <option value="Negotiation">🟣 Negotiation</option>
                      <option value="Closed">⭐ Closed Deal</option>
                      <option value="Not Interested">🔴 Not Interested</option>
                    </select>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
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
                        Call
                      </a>

                      <button
                        onClick={() => {
                          if (confirm(`Delete lead enquiry for "${lead.name}"?`)) {
                            onDeleteLead(lead.id);
                          }
                        }}
                        className="p-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white border border-rose-200 transition-colors"
                        title="Delete Lead"
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
    </div>
  );
}
