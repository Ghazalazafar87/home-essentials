import React, { useState } from 'react';
import { Truck, Sparkles, X } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#1C1917] text-[#FAF8F5] text-xs py-2 px-4 border-b border-[#292524] relative z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 flex items-center justify-center gap-2 text-center overflow-hidden">
          <Truck className="w-3.5 h-3.5 text-[#C47D4C] shrink-0" />
          <span className="truncate">
            Nationwide Delivery across Pakistan · Free shipping on orders over <strong className="font-semibold text-white">Rs. 4,999</strong> · Use code <span className="font-mono text-[#EAE2D8] font-bold">WELCOME10</span> for 10% off
          </span>
          <span className="hidden md:inline-block text-[#887B6D]">•</span>
          <span className="hidden md:inline-flex items-center gap-1 text-[#EAE2D8]">
            <Sparkles className="w-3 h-3 text-[#C47D4C]" />
            Cash on Delivery Available
          </span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 hover:text-[#C47D4C] transition-colors ml-2 shrink-0 text-stone-400"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
