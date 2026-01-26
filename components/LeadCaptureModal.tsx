'use client';

import { useState } from 'react';
import { X, Phone, Star } from 'lucide-react';

interface LeadCaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accent: string;
  businessName: string;
  serviceLabel: string;
  ctaLabel: string;
  email?: string;
}

export function LeadCaptureModal({
  open,
  onOpenChange,
  accent,
  businessName,
  serviceLabel,
  ctaLabel,
  email,
}: LeadCaptureModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: serviceLabel,
  });
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Prepare email data
    const emailBody = `New Quote Request from ${businessName} Website\n\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `Service: ${formData.service}\n`;

    // Create mailto link or use form submission endpoint
    if (email) {
      const mailtoLink = `mailto:${email}?subject=New Quote Request - ${formData.name}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoLink;
    }

    // Simulate form submission delay
    setTimeout(() => {
      alert('Thank you! We\'ll contact you within 2 hours.');
      setSubmitting(false);
      onOpenChange(false);
      setFormData({ name: '', phone: '', service: serviceLabel });
    }, 500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)' }}
      onClick={() => onOpenChange(false)}
    >
      <div
        className="relative w-full max-w-md rounded-lg shadow-2xl border-4"
        style={{ backgroundColor: '#ffffff', borderColor: accent }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded p-1.5 transition-all hover:bg-gray-100 border-2"
          style={{ borderColor: '#e2e8f0' }}
        >
          <X className="h-4 w-4" style={{ color: '#64748b' }} />
        </button>

        <div className="p-7">
          {/* Form header - Matches inline form */}
          <div className="mb-6">
            <h3 className="text-2xl font-black text-slate-900 mb-1 tracking-tight leading-none">
              Get Your<br />Free Quote
            </h3>
            <div className="flex items-center gap-1 mt-2">
              <Star className="h-3.5 w-3.5" style={{ color: '#FFA500', fill: '#FFA500' }} />
              <Star className="h-3.5 w-3.5" style={{ color: '#FFA500', fill: '#FFA500' }} />
              <Star className="h-3.5 w-3.5" style={{ color: '#FFA500', fill: '#FFA500' }} />
              <Star className="h-3.5 w-3.5" style={{ color: '#FFA500', fill: '#FFA500' }} />
              <Star className="h-3.5 w-3.5" style={{ color: '#FFA500', fill: '#FFA500' }} />
              <span className="text-xs font-black text-slate-900 ml-1">5.0</span>
            </div>
            <div className="h-px w-full mt-4" style={{ backgroundColor: `${accent}30` }} />
          </div>

          {/* Form fields - Visual Unlocking Style */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Step 1 - Name */}
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ backgroundColor: accent }}>
                  1
                </div>
                <label className="text-sm font-black uppercase tracking-wide text-slate-900">
                  Your Name
                </label>
              </div>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border-2 px-4 py-3 text-base font-semibold focus:outline-none focus:border-blue-600 transition-all"
                style={{
                  borderColor: formData.name ? accent : '#cbd5e1',
                  color: '#0f172a',
                  backgroundColor: formData.name ? `${accent}05` : '#ffffff'
                }}
                placeholder="John Smith"
              />
            </div>

            {/* Step 2 - Phone */}
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ backgroundColor: accent }}>
                  2
                </div>
                <label className="text-sm font-black uppercase tracking-wide text-slate-900">
                  Phone Number
                </label>
              </div>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-lg border-2 px-4 py-3 text-base font-semibold focus:outline-none focus:border-blue-600 transition-all"
                style={{
                  borderColor: formData.phone ? accent : '#cbd5e1',
                  color: '#0f172a',
                  backgroundColor: formData.phone ? `${accent}05` : '#ffffff'
                }}
                placeholder="(555) 123-4567"
              />
            </div>

            {/* Step 3 - Service */}
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ backgroundColor: accent }}>
                  3
                </div>
                <label className="text-sm font-black uppercase tracking-wide text-slate-900">
                  Service Needed
                </label>
              </div>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full rounded-lg border-2 px-4 py-3 text-base font-semibold focus:outline-none focus:border-blue-600 transition-all"
                style={{
                  borderColor: accent,
                  color: '#0f172a',
                  backgroundColor: `${accent}05`
                }}
              >
                <option>Pressure Washing</option>
                <option>Soft Washing</option>
                <option>House Wash</option>
                <option>Roof Wash</option>
                <option>Not Sure</option>
              </select>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg px-6 py-4 text-base font-black text-white uppercase tracking-wide transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed mt-3 relative overflow-hidden"
              style={{ backgroundColor: accent }}
            >
              <span className="relative z-10">
                {submitting ? 'Sending...' : '→ Get Free Estimate'}
              </span>
            </button>
          </form>

          {/* Social Proof */}
          <div className="mt-5 pt-5 border-t-2" style={{ borderColor: `${accent}15` }}>
            <div className="flex items-center justify-center gap-3 text-center">
              <div className="flex flex-col">
                <div className="flex items-center gap-1 justify-center mb-1">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-3" />
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3" style={{ color: '#FFA500', fill: '#FFA500' }} />
                  <Star className="h-3 w-3" style={{ color: '#FFA500', fill: '#FFA500' }} />
                  <Star className="h-3 w-3" style={{ color: '#FFA500', fill: '#FFA500' }} />
                  <Star className="h-3 w-3" style={{ color: '#FFA500', fill: '#FFA500' }} />
                  <Star className="h-3 w-3" style={{ color: '#FFA500', fill: '#FFA500' }} />
                </div>
                <p className="text-[10px] font-bold text-slate-600 mt-1">50+ Reviews</p>
              </div>
              <div className="h-10 w-px bg-slate-300"></div>
              <div className="flex flex-col">
                <p className="text-lg font-black" style={{ color: accent }}>2hr</p>
                <p className="text-[10px] font-bold text-slate-600">Avg Response</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
