'use client';

interface ImagePlaceholderProps {
  label: string;
  hint: string;
  accent: string;
  aspectClassName?: string;
}

export function ImagePlaceholder({ label, hint, accent, aspectClassName = 'aspect-[4/3]' }: ImagePlaceholderProps) {
  return (
    <div
      className={`relative ${aspectClassName} rounded-lg overflow-hidden flex items-center justify-center`}
      style={{ border: `2px solid ${accent}`, backgroundColor: `${accent}08` }}
    >
      <div className="text-center p-4">
        <div className="text-sm font-black uppercase mb-1" style={{ color: accent }}>
          {label}
        </div>
        <div className="text-xs" style={{ color: '#64748b' }}>
          {hint}
        </div>
      </div>
    </div>
  );
}
