'use client';

import React from 'react';
import { Users, Phone } from 'lucide-react';
import { AgentStaff } from '../../../types/admin';

interface AgentsTabProps {
  agents: AgentStaff[];
}

export default function AgentsTab({ agents }: AgentsTabProps) {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            <Users className="w-5 h-5 text-teal-600" />
            <span>Sales Agents & Real Estate Staff ({agents.length})</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Dwarka territory brokers, legal advisors & site managers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map(agent => (
          <div
            key={agent.id}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-5 hover:border-teal-400 transition-all"
          >
            <img
              src={agent.avatar}
              alt={agent.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-teal-200 shadow-md"
            />
            <div className="space-y-1.5 text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="text-base font-black text-slate-800">{agent.name}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                  {agent.role}
                </span>
              </div>

              <div className="text-xs text-slate-600 space-y-0.5">
                <p className="text-slate-500 text-[11px]">Specialization: <strong className="text-slate-800">{agent.sectorSpecialization}</strong></p>
                <p className="text-teal-700 font-bold">{agent.activeDeals} Active Deals Pipeline</p>
              </div>

              <div className="pt-2 flex items-center justify-center sm:justify-start gap-3">
                <a
                  href={`tel:${agent.phone}`}
                  className="px-3 py-1.5 rounded-xl btn-teal text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {agent.phone}</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
