import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Truck, Store, Award } from 'lucide-react';

interface HeroBannerProps {
  onShopNow: () => void;
  onExploreLatest: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onShopNow, onExploreLatest }) => {
  const { siteSettings } = useStore();
  const hero = siteSettings.heroBanner;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white border-b border-slate-800">
      {/* Background ambient lighting glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#1688FF]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0758C9]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-7 sm:py-10 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] sm:text-xs font-bold tracking-wider uppercase animate-fade-in">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>{hero.tag || 'FLAGSHIP SMARTPHONE SPECIALS'}</span>
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {hero.headline}
            </h1>

            {/* Subheadline */}
            <p className="text-slate-300 text-xs sm:text-base lg:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {hero.subheadline}
            </p>

            {/* Pricing highlight callout */}
            <div className="inline-flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-700/60 shadow-lg max-w-full">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-600/30 flex items-center justify-center border border-blue-500/40 text-blue-400 shrink-0">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="text-left min-w-0">
                <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-semibold truncate">
                  Featured: {hero.featuredProductModel}
                </span>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="text-[11px] sm:text-xs text-slate-300">Starting from</span>
                  <span className="text-base sm:text-lg font-black text-white">{hero.startingPrice}</span>
                  <span className="text-[9px] sm:text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    Instant Bank Offer
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 pt-1 sm:pt-2">
              <button
                onClick={onShopNow}
                className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-[#1688FF] hover:bg-blue-600 active:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Shop Smartphones</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreLatest}
                className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 active:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Latest Launches</span>
              </button>
            </div>
          </div>

          {/* Right Smartphone Imagery Showcase */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-md">
              {/* Decorative background circle */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-cyan-500/20 rounded-3xl blur-2xl transform rotate-3" />

              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-700/80 bg-slate-900/90 shadow-2xl p-3 sm:p-5">
                <img
                  src={hero.imageUrl}
                  alt={hero.featuredProductModel}
                  className="w-full h-56 sm:h-80 object-cover rounded-xl sm:rounded-2xl shadow-inner group-hover:scale-102 transition-transform duration-500"
                />

                {/* Floating warranty & delivery badges */}
                <div className="mt-2.5 sm:mt-0 sm:absolute sm:bottom-7 sm:left-7 sm:right-7 bg-slate-950/90 backdrop-blur-md p-2.5 sm:p-3.5 rounded-xl border border-slate-700/80 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-bold text-white text-[10px] sm:text-[11px] leading-tight truncate">100% Original Sealed</p>
                      <p className="text-[9px] sm:text-[10px] text-slate-400 truncate">Official Brand Warranty</p>
                    </div>
                  </div>
                  <div className="h-6 w-px bg-slate-800 shrink-0" />
                  <div className="flex items-center gap-1.5 sm:gap-2 text-right min-w-0">
                    <Truck className="w-4 h-4 text-blue-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-bold text-white text-[10px] sm:text-[11px] leading-tight truncate">Same Day Delivery</p>
                      <p className="text-[9px] sm:text-[10px] text-slate-400 truncate">Within 2-4 Hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Value Proposition Highlights Banner */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs">Local Same-Day Delivery</h4>
              <p className="text-[11px] text-slate-400">Directly from our local store</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs">Official Manufacturer Warranty</h4>
              <p className="text-[11px] text-slate-400">1 Year pan-India coverage</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800">
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs">Physical Shop Pickup</h4>
              <p className="text-[11px] text-slate-400">Ready in 30 mins with demo</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs">Best Local Price Guarantee</h4>
              <p className="text-[11px] text-slate-400">Transparent &amp; genuine billing</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
