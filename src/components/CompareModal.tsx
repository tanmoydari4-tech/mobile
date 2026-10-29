import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, Scale, Plus, Check, Star } from 'lucide-react';
import { Product } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const CompareModal: React.FC<Props> = ({ isOpen, onClose, onSelectProduct }) => {
  const { compareList, removeFromCompare, clearCompare, products, addToCart } = useStore();

  if (!isOpen) return null;

  const comparedProducts = products.filter(p => compareList.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full my-auto overflow-hidden border border-slate-200 relative max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 px-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/30 flex items-center justify-center border border-blue-500/30">
              <Scale className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-white">Compare Smartphones</h2>
              <p className="text-xs text-slate-400">Side-by-side technical specification comparison (up to 4 models)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {comparedProducts.length > 0 && (
              <button
                onClick={clearCompare}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-slate-300 hover:text-rose-300 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {comparedProducts.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Scale className="w-8 h-8" />
              </div>
              <h3 className="text-base font-extrabold text-slate-800">No phones selected for comparison</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Click the compare icon on any smartphone card or product details page to view detailed side-by-side specifications.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors"
              >
                Browse Smartphones
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[650px]">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="p-3 bg-slate-50 w-44 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
                      Features
                    </th>
                    {comparedProducts.map(p => (
                      <th key={p.id} className="p-3 w-56 align-top">
                        <div className="relative group p-2 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all text-center">
                          <button
                            onClick={() => removeFromCompare(p.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-900 text-white hover:bg-rose-600 flex items-center justify-center shadow-md transition-colors"
                            title="Remove"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <img
                            src={p.mainImage}
                            alt={p.model}
                            className="w-24 h-24 object-contain mx-auto mb-2 cursor-pointer"
                            onClick={() => {
                              onSelectProduct(p);
                              onClose();
                            }}
                          />
                          <span className="text-[10px] font-extrabold text-blue-600 uppercase block">
                            {p.brand}
                          </span>
                          <h4 className="font-extrabold text-xs text-slate-900 truncate">
                            {p.model}
                          </h4>
                          <span className="text-sm font-black text-slate-900 block mt-1">
                            ₹{p.basePrice.toLocaleString('en-IN')}
                          </span>
                          <button
                            onClick={() => addToCart(p, p.variants[0], 1)}
                            className="w-full mt-2 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-[11px] transition-colors"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { label: 'Rating', getter: (p: Product) => `${p.rating} / 5 (${p.reviewCount} reviews)` },
                    { label: 'Processor', getter: (p: Product) => p.specifications.processor },
                    { label: 'Display Size & Type', getter: (p: Product) => `${p.specifications.displaySize} (${p.specifications.displayType})` },
                    { label: 'Refresh Rate', getter: (p: Product) => p.specifications.refreshRate },
                    { label: 'Rear Camera System', getter: (p: Product) => p.specifications.rearCamera },
                    { label: 'Front Camera', getter: (p: Product) => p.specifications.frontCamera },
                    { label: 'Battery Capacity', getter: (p: Product) => p.specifications.battery },
                    { label: 'Charging Speed', getter: (p: Product) => p.specifications.chargingSpeed },
                    { label: 'RAM Options', getter: (p: Product) => [...new Set(p.variants.map(v => v.ram))].join(', ') },
                    { label: 'Storage Options', getter: (p: Product) => [...new Set(p.variants.map(v => v.storage))].join(', ') },
                    { label: 'Operating System', getter: (p: Product) => p.specifications.os },
                    { label: '5G Connectivity', getter: (p: Product) => p.specifications.network5G },
                    { label: 'SIM Support', getter: (p: Product) => p.specifications.simType },
                    { label: 'Warranty', getter: (p: Product) => p.specifications.warranty },
                    { label: 'In-Box Contents', getter: (p: Product) => p.specifications.inBoxContents }
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50/40' : 'bg-white'}>
                      <td className="p-3 font-bold text-slate-500 text-[11px] uppercase tracking-wider">
                        {row.label}
                      </td>
                      {comparedProducts.map(p => (
                        <td key={p.id} className="p-3 text-slate-800 font-semibold align-top leading-relaxed">
                          {row.getter(p)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
