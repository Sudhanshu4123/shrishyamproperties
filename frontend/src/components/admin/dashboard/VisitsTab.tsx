'use client';

import React from 'react';
import { Calendar, Clock, MapPin, User, Phone } from 'lucide-react';
import { SiteVisit } from '../../../types/admin';

interface VisitsTabProps {
  visits: SiteVisit[];
}

export default function VisitsTab({ visits }: VisitsTabProps) {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            <Calendar className="w-5 h-5 text-teal-600" />
            <span>Site Visits Calendar & Tour Pipeline ({visits.length})</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Physical property viewing appointments across Dwarka Sectors.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visits.map(visit => (
          <div
            key={visit.id}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-teal-400 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                {visit.status}
              </span>
              <span className="text-[10px] text-slate-500 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                {visit.visitDate} @ {visit.visitTime}
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-800 mb-2">{visit.propertyTitle}</h3>

            <div className="space-y-1.5 text-xs text-slate-600 mb-4">
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-teal-600" />
                <span>Client: <strong className="text-slate-800">{visit.clientName}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>Phone: {visit.clientPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Sector: {visit.sector}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Assigned Broker: <strong className="text-slate-700">{visit.agentAssigned}</strong></span>
              <a
                href={`tel:${visit.clientPhone}`}
                className="px-3 py-1 rounded-lg btn-teal text-xs font-bold shadow-sm"
              >
                Call Client
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
