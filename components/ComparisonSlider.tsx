'use client';

import { useState, useRef, useEffect } from 'react';

interface ComparisonSliderProps {
  accent: string;
  beforeLabel: string;
  beforeHint: string;
  afterLabel: string;
  afterHint: string;
  beforeImage?: string;
  afterImage?: string;
}

export function ComparisonSlider({
  accent,
  beforeLabel,
  beforeHint,
  afterLabel,
  afterHint,
  beforeImage,
  afterImage,
}: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] rounded-lg overflow-hidden cursor-col-resize"
      style={{ border: `3px solid ${accent}` }}
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMouseMove(e.nativeEvent);
      }}
    >
      {/* Before Image */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        {beforeImage ? (
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center"
            style={{ backgroundColor: `${accent}15` }}
          >
            <div className="text-center p-4">
              <div className="text-sm font-black uppercase mb-1" style={{ color: accent }}>
                {beforeLabel}
              </div>
              <div className="text-xs" style={{ color: '#64748b' }}>
                {beforeHint}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* After Image */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          clipPath: `inset(0 0 0 ${sliderPosition}%)`,
        }}
      >
        {afterImage ? (
          <img
            src={afterImage}
            alt={afterLabel}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center"
            style={{ backgroundColor: `${accent}08` }}
          >
            <div className="text-center p-4">
              <div className="text-sm font-black uppercase mb-1" style={{ color: accent }}>
                {afterLabel}
              </div>
              <div className="text-xs" style={{ color: '#64748b' }}>
                {afterHint}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 cursor-col-resize z-10"
        style={{
          left: `${sliderPosition}%`,
          transform: 'translateX(-50%)',
        }}
      >
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
          style={{ backgroundColor: accent }}
        >
          <div className="w-1 h-6 rounded" style={{ backgroundColor: '#ffffff' }} />
        </div>
      </div>
    </div>
  );
}
