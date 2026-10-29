import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, Truck, ShieldCheck, ChevronRight, Store } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { siteSettings, setDeliveryMode } = useStore();
  const messages = siteSettings.announcementBarMessages;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (messages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % messages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="bg-slate-950 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left rotating message */}
        <div className="flex items-center gap-2 text-center sm:text-left overflow-hidden min-h-[20px]">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <p className="font-medium text-slate-100 transition-all duration-300">
            {messages[currentIndex] || messages[0]}
          </p>
        </div>

        {/* Right quick badges */}
        <div className="hidden md:flex items-center gap-4 text-[11px] text-slate-400 font-medium shrink-0">
          <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer" onClick={() => setDeliveryMode('store_pickup')}>
            <Store className="w-3.5 h-3.5 text-blue-400" />
            <span>Store Pickup Ready in 30 Mins</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Brand Sealed Warranty</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold cursor-pointer">
            <Truck className="w-3.5 h-3.5" />
            <span>Free Delivery &gt; ₹999</span>
          </div>
        </div>
      </div>
    </div>
  );
};
