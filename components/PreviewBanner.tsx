'use client';

import { X } from 'lucide-react';

interface PreviewBannerProps {
  accent: string;
  ctaHref: string;
  onClose: () => void;
}

export function PreviewBanner({ accent, ctaHref, onClose }: PreviewBannerProps) {
  return (
    <div
      className="relative z-50 py-2 px-4 text-center text-xs font-semibold"
      style={{ backgroundColor: accent, color: '#ffffff' }}
    >
      <div className="flex items-center justify-center gap-2">
        <span>This is a preview template - customize with your business details</span>
        <a
          href={ctaHref}
          className="underline hover:no-underline"
        >
          Get Started
        </a>
        <button
          type="button"
          onClick={onClose}
          className="ml-2 rounded p-0.5 hover:bg-white/20 transition"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
