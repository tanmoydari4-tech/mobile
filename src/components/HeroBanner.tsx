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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-wider uppercase animate-fade-in">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{hero.tag || 'FLAGSHIP SMARTPHONE SPECIALS'}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {hero.headline}
            </h1>

            {/* Subheadline */}
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {hero.subheadline}
            </p>

            {/* Pricing highlight callout */}
            <div className="inline-flex items-center gap-3 p-3 bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-700/60 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-blue-600/30 flex items-center justify-center border border-blue-500/40 text-blue-400">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                  Featured: {hero.featuredProductModel}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-300">Starting from</span>
                  <span className="text-lg font-black text-white">{hero.startingPrice}</span>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    Instant Bank Offer
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onShopNow}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#1688FF] hover:bg-blue-600 active:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Shop Smartphones</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreLatest}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 active:bg-slate-700 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
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

              <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 bg-slate-900/90 shadow-2xl p-4 sm:p-5">
                <img
                  src={hero.imageUrl}
                  alt={hero.featuredProductModel}
                  className="w-full h-72 sm:h-84 object-cover rounded-2xl shadow-inner group-hover:scale-102 transition-transform duration-500"
                />

                {/* Floating warranty & delivery badges */}
                <div className="absolute bottom-7 left-7 right-7 bg-slate-950/80 backdrop-blur-md p-3.5 rounded-xl border border-slate-700/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <div>
                      <p className="font-bold text-white text-[11px] leading-tight">100% Original Sealed</p>
                      <p className="text-[10px] text-slate-400">Official Brand Warranty</p>
                    </div>
                  </div>
                  <div className="h-6 w-px bg-slate-800" />
                  <div className="flex items-center gap-2 text-right">
                    <Truck className="w-4 h-4 text-blue-400" />
                    <div>
                      <p className="font-bold text-white text-[11px] leading-tight">Same Day Delivery</p>
                      <p className="text-[10px] text-slate-400">Within 2-4 Hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Value Proposition Highlights Banner */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
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
              <p className="text-[11px] text-slate-400">Transparent & genuine billing</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
