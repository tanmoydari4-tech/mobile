import React, { useState } from 'react';
import { Product, ProductVariant } from '../types';
import { useStore } from '../context/StoreContext';
import {
  Heart,
  Scale,
  ShoppingCart,
  Star,
  Zap,
  Check,
  Eye,
  CheckCircle2,
  AlertTriangle,
  XCircle
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    addToCompare,
    removeFromCompare,
    isInCompare
  } = useStore();

  // Active selected variant on the card (default first variant)
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const selectedVariant: ProductVariant = product.variants[selectedVariantIndex] || product.variants[0];

  const inWish = isInWishlist(product.id);
  const inComp = isInCompare(product.id);
  const [addedToast, setAddedToast] = useState(false);

  // Variant price and discount
  const currentPrice = selectedVariant.price;
  const originalPrice = selectedVariant.originalPrice;
  const discountAmount = Math.max(0, originalPrice - currentPrice);
  const discountPercent = originalPrice > 0 ? Math.round((discountAmount / originalPrice) * 100) : 0;
  const isOutOfStock = selectedVariant.stock <= 0;
  const isLowStock = selectedVariant.stock > 0 && selectedVariant.stock <= 3;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    const res = addToCart(product, selectedVariant, 1);
    if (res.success) {
      setAddedToast(true);
      setTimeout(() => setAddedToast(false), 2000);
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inComp) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product.id);
    }
  };

  return (
    <div
      onClick={() => onViewDetails(product)}
      className="group relative bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col gap-1 items-start">
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-lg bg-emerald-600 text-white text-[10px] font-extrabold tracking-wide uppercase shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
          {product.isTodayDeal && (
            <span className="px-2 py-0.5 rounded-lg bg-blue-600 text-white text-[10px] font-extrabold flex items-center gap-1 shadow-xs">
              <Zap className="w-2.5 h-2.5 fill-current" />
              <span>DEAL</span>
            </span>
          )}
          {product.isBestSeller && !product.isTodayDeal && (
            <span className="px-2 py-0.5 rounded-lg bg-amber-500 text-slate-950 text-[10px] font-black uppercase shadow-xs">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Quick actions: Wishlist & Compare */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            onClick={handleToggleCompare}
            title={inComp ? 'Remove from comparison' : 'Compare with other phones'}
            className={`p-1.5 rounded-xl backdrop-blur-md transition-all shadow-xs ${
              inComp
                ? 'bg-blue-600 text-white'
                : 'bg-white/80 hover:bg-white text-slate-600 hover:text-blue-600 border border-slate-200'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleToggleWishlist}
            title={inWish ? 'Remove from wishlist' : 'Save to wishlist'}
            className={`p-1.5 rounded-xl backdrop-blur-md transition-all shadow-xs ${
              inWish
                ? 'bg-rose-500 text-white'
                : 'bg-white/80 hover:bg-white text-slate-600 hover:text-rose-500 border border-slate-200'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${inWish ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Product Image Section */}
      <div className="relative pt-10 pb-4 px-4 bg-gradient-to-b from-slate-50/70 to-white flex items-center justify-center min-h-[200px] overflow-hidden">
        <img
          src={product.mainImage}
          alt={product.title}
          className="w-40 h-40 sm:w-44 sm:h-44 object-contain group-hover:scale-106 transition-transform duration-400 drop-shadow-md"
        />

        {/* Quick View Button overlay on hover */}
        <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="px-3.5 py-1.5 rounded-xl bg-white/95 text-slate-900 font-bold text-xs shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-blue-600" />
            <span>View Full Specs</span>
          </span>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Brand & Stock Pill */}
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600">
              {product.brand}
            </span>

            {/* Stock indicator badge */}
            {isOutOfStock ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                <XCircle className="w-3 h-3" />
                <span>Out of Stock</span>
              </span>
            ) : isLowStock ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 animate-pulse-subtle">
                <AlertTriangle className="w-3 h-3" />
                <span>Only {selectedVariant.stock} Left</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" />
                <span>In Stock ({selectedVariant.stock})</span>
              </span>
            )}
          </div>

          {/* Model Title */}
          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {product.model}
          </h3>

          {/* Short specification summary */}
          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
            {product.shortSpecs}
          </p>

          {/* Variant Storage / RAM Selectors on Card */}
          {product.variants.length > 1 && (
            <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto pb-1" onClick={e => e.stopPropagation()}>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider shrink-0">
                Variant:
              </span>
              {product.variants.map((v, idx) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariantIndex(idx)}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold shrink-0 transition-all ${
                    selectedVariantIndex === idx
                      ? 'bg-slate-900 text-white ring-1 ring-slate-900'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {v.storage !== 'N/A' ? v.storage : v.color}
                </button>
              ))}
            </div>
          )}

          {/* Color preview swatches */}
          <div className="mt-2 flex items-center gap-1.5">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Color:
            </span>
            <span className="text-[11px] font-medium text-slate-700 truncate max-w-[130px]">
              {selectedVariant.color}
            </span>
            <div
              className="w-3 h-3 rounded-full border border-slate-300 shadow-2xs shrink-0 ml-auto"
              style={{ backgroundColor: selectedVariant.colorHex }}
              title={selectedVariant.color}
            />
          </div>

          {/* Ratings & Reviews */}
          <div className="mt-2.5 flex items-center gap-1.5 text-xs">
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200/80 text-amber-700 font-bold text-[11px]">
              <span>{product.rating}</span>
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              ({product.reviewCount} verified reviews)
            </span>
          </div>
        </div>

        {/* Price & Action Area */}
        <div className="pt-3 border-t border-slate-100 space-y-2.5">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-black text-slate-900">
                ₹{currentPrice.toLocaleString('en-IN')}
              </span>
              {originalPrice > currentPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ₹{originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            {discountAmount > 0 && (
              <span className="text-[11px] font-bold text-emerald-600">
                Save ₹{discountAmount.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Add to Cart button */}
          <button
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isOutOfStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                : addedToast
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 hover:bg-[#1688FF] text-white shadow-sm hover:shadow-blue-500/20 active:scale-98'
            }`}
          >
            {addedToast ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Cart!</span>
              </>
            ) : isOutOfStock ? (
              <span>Notify When Available</span>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
