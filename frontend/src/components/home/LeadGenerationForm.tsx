'use client';

import React, { useState } from 'react';
import { PropertyService } from '@/services/propertyService';
import { Send, CheckCircle2, Phone, User, Mail } from 'lucide-react';

interface LeadGenerationFormProps {
  propertyTitle?: string;
  onSuccessClose?: () => void;
}

export default function LeadGenerationForm({ propertyTitle, onSuccessClose }: LeadGenerationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;
    setIsSubmitting(true);

    setTimeout(() => {
      PropertyService.submitLead({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || 'N/A',
        lookingFor: 'Buy',
        propertyType: '3 BHK',
        budget: 'Flexible',
        preferredLocation: 'Dwarka',
        message: 'Enquiry submitted via clean web form.',
        propertyTitle: propertyTitle || 'General Enquiry'
      });
      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-md">
      {submitted ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-black text-slate-800 mb-2">Enquiry Submitted!</h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
            Thank you, {formData.name}! Our property expert will contact you shortly on <strong>{formData.phone}</strong>{formData.email ? <> or at <strong>{formData.email}</strong></> : ''}.
          </p>
          <div className="flex justify-center gap-3">
            <a href="tel:9911956274" className="btn-teal text-sm px-5 py-2.5 inline-flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Call: 9911956274
            </a>
            {onSuccessClose && (
              <button onClick={onSuccessClose} className="btn-outline text-sm px-5 py-2.5">
                Close
              </button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <p className="section-label mb-1">Get Expert Advice</p>
            <h3 className="text-2xl font-black text-slate-800">
              {propertyTitle ? 'Schedule a Visit' : 'Send Your Enquiry'}
            </h3>
            {propertyTitle && (
              <p className="text-xs text-teal-600 font-semibold mt-1">For: {propertyTitle}</p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                  style={{ paddingLeft: '42px' }}
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Phone Number *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="form-input"
                  style={{ paddingLeft: '42px' }}
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="form-input"
                  style={{ paddingLeft: '42px' }}
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-teal w-full flex items-center justify-center gap-2 text-sm py-3 mt-2"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Submitting...' : 'Submit Enquiry'}</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

