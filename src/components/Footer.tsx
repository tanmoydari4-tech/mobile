import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  Smartphone,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Truck,
  RotateCcw,
  Store,
  CreditCard,
  MessageCircle,
  ExternalLink
} from 'lucide-react';

interface FooterProps {
  onOpenPolicy: (policy: 'shipping' | 'return' | 'warranty' | 'privacy' | 'terms' | 'about') => void;
  onOpenContact: () => void;
  onNavigateCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPolicy,
  onOpenContact,
  onNavigateCategory
}) => {
  const { siteSettings } = useStore();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-xs">
      {/* Top Value Badges */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Express Local Delivery</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Delivered to your door in 2-4 hours</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Official Brand Warranty</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">100% Brand-Sealed Indian Units</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">7-Day Replacement</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Instant hardware defect support</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Store Pickup &amp; Setup</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Free data transfer &amp; tempered glass</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Info & Address */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0758C9] to-[#1688FF] flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Smartphone className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Smart<span className="text-[#1688FF]">Zone</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Your premier smartphone retail destination. Authorized retailer for Apple, Samsung, OnePlus, Xiaomi, Realme, Vivo, and Motorola. Physical showroom experience with same-day local convenience.
            </p>

            <div className="space-y-2 pt-1 text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{siteSettings.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{siteSettings.openingHours}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{siteSettings.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{siteSettings.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Smartphones
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigateCategory('all')} className="hover:text-white transition-colors">
                  All Smartphones
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateCategory('flagship')} className="hover:text-white transition-colors">
                  Premium Flagships
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateCategory('mid-range')} className="hover:text-white transition-colors">
                  Mid-Range Phones
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateCategory('budget')} className="hover:text-white transition-colors">
                  Budget Friendly
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateCategory('gaming')} className="hover:text-white transition-colors">
                  Gaming Smartphones
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateCategory('accessory')} className="hover:text-white transition-colors">
                  Mobile Accessories
                </button>
              </li>
            </ul>
          </div>

          {/* Policies & Assurance */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Policies &amp; Warranty
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onOpenPolicy('shipping')} className="hover:text-white transition-colors">
                  Shipping &amp; Local Delivery Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('return')} className="hover:text-white transition-colors">
                  7-Day Return &amp; Replacement
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('warranty')} className="hover:text-white transition-colors">
                  Official Manufacturer Warranty
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('privacy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('terms')} className="hover:text-white transition-colors">
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('about')} className="hover:text-white transition-colors">
                  About SmartZone Retail
                </button>
              </li>
            </ul>
          </div>

          {/* Connect & Local Support */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Showroom Assistance
            </h4>
            <p className="text-slate-400 text-xs">
              Need immediate stock verification or advice from our tech specialists?
            </p>

            <div className="pt-1 space-y-2">
              <a
                href={`https://wa.me/${siteSettings.whatsapp.replace(/\D/g, '')}?text=Hello%20SmartZone`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Store Chat</span>
              </a>

              <button
                onClick={onOpenContact}
                className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-colors"
              >
                Store Location &amp; Inquiries
              </button>
            </div>

            <div className="pt-2">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">
                Accepted Payment Methods
              </span>
              <div className="flex flex-wrap gap-1.5 text-[10px] text-slate-300 font-bold">
                <span className="px-2 py-0.5 bg-slate-900 rounded border border-slate-800">UPI / QR</span>
                <span className="px-2 py-0.5 bg-slate-900 rounded border border-slate-800">RuPay</span>
                <span className="px-2 py-0.5 bg-slate-900 rounded border border-slate-800">Visa / MC</span>
                <span className="px-2 py-0.5 bg-slate-900 rounded border border-slate-800">Cash on Delivery</span>
                <span className="px-2 py-0.5 bg-slate-900 rounded border border-slate-800">Store Counter</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} SmartZone Mobile Store. All rights reserved. GST Registered.</p>
          <p className="text-slate-600">
            Brand logos and trademarks are property of their respective manufacturers.
          </p>
        </div>
      </div>
    </footer>
  );
};
