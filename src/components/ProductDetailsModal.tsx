import React, { useState } from 'react';
import { Product, ProductVariant } from '../types';
import { useStore } from '../context/StoreContext';
import {
  X,
  Star,
  ShieldCheck,
  Truck,
  Store,
  RotateCcw,
  Tag,
  Check,
  Heart,
  Scale,
  ShoppingCart,
  CreditCard,
  MapPin,
  ChevronRight,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  Send,
  Plus
} from 'lucide-react';

interface Props {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenCart: () => void;
  onSelectRelated: (product: Product) => void;
}

export const ProductDetailsModal: React.FC<Props> = ({
  product,
  isOpen,
  onClose,
  onOpenCart,
  onSelectRelated
}) => {
  const {
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    addToCompare,
    isInCompare,
    selectedPincode,
    checkPincode,
    addReview,
    getProductReviews,
    siteSettings
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [testPin, setTestPin] = useState(selectedPincode);
  const [pinFeedback, setPinFeedback] = useState<string | null>(null);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews' | 'warranty'>('specs');

  // Review form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!isOpen || !product) return null;

  const currentVariant: ProductVariant = product.variants[selectedVariantIndex] || product.variants[0];
  const inWish = isInWishlist(product.id);
  const inComp = isInCompare(product.id);
  const isOutOfStock = currentVariant.stock <= 0;
  const isLowStock = currentVariant.stock > 0 && currentVariant.stock <= 3;

  const discountAmount = Math.max(0, currentVariant.originalPrice - currentVariant.price);
  const discountPercent =
    currentVariant.originalPrice > 0
      ? Math.round((discountAmount / currentVariant.originalPrice) * 100)
      : 0;

  const productReviews = getProductReviews(product.id);
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.brand === product.brand || p.category === product.category))
    .slice(0, 3);

  const accessoryItems = products.filter(p => p.category === 'accessory').slice(0, 2);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    const res = addToCart(product, currentVariant, 1);
    if (res.success) {
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 2500);
    }
  };

  const handleTestPincode = () => {
    const res = checkPincode(testPin);
    setPinFeedback(res.message);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewTitle.trim() || !reviewComment.trim()) return;
    addReview(product.id, reviewRating, reviewTitle, reviewComment);
    setReviewSubmitted(true);
    setReviewTitle('');
    setReviewComment('');
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full my-auto overflow-hidden border border-slate-200 relative max-h-[92vh] flex flex-col">
        {/* Sticky Header with breadcrumb and close button */}
        <div className="p-4 px-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-300 truncate">
            <span>Smartphones</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-semibold text-blue-400">{product.brand}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-bold text-white truncate max-w-[200px] sm:max-w-xs">{product.model}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => addToCompare(product.id)}
              className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                inComp ? 'bg-blue-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span className="hidden sm:inline">{inComp ? 'In Comparison' : 'Compare'}</span>
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-2 rounded-xl transition-colors ${
                inWish ? 'bg-rose-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              <Heart className={`w-4 h-4 ${inWish ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-8 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Image Gallery */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex items-center justify-center min-h-[300px] sm:min-h-[360px] relative overflow-hidden group">
                <img
                  src={product.images[activeImageIndex] || product.mainImage}
                  alt={product.title}
                  className="max-h-72 w-auto object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-lg"
                />
                {discountPercent > 0 && (
                  <span className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-black px-2.5 py-1 rounded-lg">
                    {discountPercent}% SAVING
                  </span>
                )}
              </div>

              {/* Thumbnail selector */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-3 justify-center">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl border-2 p-1 bg-slate-50 transition-all ${
                        activeImageIndex === idx
                          ? 'border-blue-600 shadow-md ring-2 ring-blue-500/20'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Badges */}
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold">100% Genuine Sealed Indian Unit</span>
                </div>
                <div className="flex items-center gap-2 text-slate-800">
                  <RotateCcw className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>7 Days Replacement for Hardware Defects</span>
                </div>
                <div className="flex items-center gap-2 text-slate-800">
                  <Store className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Free Data Transfer & Setup at our Salt Lake Store</span>
                </div>
              </div>
            </div>

            {/* Right Details & Variant Selection */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                  {product.brand} Official
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 leading-tight">
                  {product.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                  {product.shortSpecs}
                </p>

                {/* Ratings & Verified Reviews */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1 bg-amber-500 text-slate-950 font-black text-xs px-2 py-0.5 rounded-md">
                    <span>{product.rating}</span>
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    {product.reviewCount} Ratings &amp; {productReviews.length} Verified Buyer Reviews
                  </span>
                </div>
              </div>

              {/* Price and Instant Discount Box */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-white">
                    ₹{currentVariant.price.toLocaleString('en-IN')}
                  </span>
                  {currentVariant.originalPrice > currentVariant.price && (
                    <span className="text-sm text-slate-400 line-through">
                      ₹{currentVariant.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {discountAmount > 0 && (
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                      Save ₹{discountAmount.toLocaleString('en-IN')} ({discountPercent}% off)
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400">
                  Inclusive of all taxes. GST invoice provided with official IMEI documentation.
                </p>
              </div>

              {/* Variants Selector: RAM & Storage */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Select Variant (RAM &amp; Storage)
                  </label>
                  <span className="text-xs font-medium text-slate-500">
                    SKU: {currentVariant.sku}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {product.variants.map((v, idx) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantIndex(idx)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedVariantIndex === idx
                          ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/30'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">
                          {v.ram !== 'N/A' ? `${v.ram} + ${v.storage}` : v.storage}
                        </span>
                        {selectedVariantIndex === idx && (
                          <Check className="w-3.5 h-3.5 text-blue-600" />
                        )}
                      </div>
                      <span className="text-xs font-extrabold text-blue-700 block mt-1">
                        ₹{v.price.toLocaleString('en-IN')}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Swatch Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Color: <span className="text-blue-600">{currentVariant.color}</span>
                  </label>
                  {/* Live Stock Status */}
                  {isOutOfStock ? (
                    <span className="text-xs font-bold text-rose-600 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Out of Stock
                    </span>
                  ) : isLowStock ? (
                    <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Only {currentVariant.stock} left in stock
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> In Stock ({currentVariant.stock} available)
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full border-2 border-slate-900 shadow-sm flex items-center justify-center ring-2 ring-blue-500"
                    style={{ backgroundColor: currentVariant.colorHex }}
                  >
                    <Check className="w-4 h-4 text-white drop-shadow-md" />
                  </div>
                  <span className="text-xs text-slate-600 font-medium">{currentVariant.color}</span>
                </div>
              </div>

              {/* Local Delivery Checker */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-slate-800">Check Local Delivery Availability</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={testPin}
                    onChange={e => setTestPin(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit PIN"
                    className="w-40 px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <button
                    onClick={handleTestPincode}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    Check
                  </button>
                </div>

                {pinFeedback && (
                  <p className="text-xs font-semibold text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200">
                    {pinFeedback}
                  </p>
                )}
              </div>

              {/* Action Buttons: Add to Cart & Buy Now */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  disabled={isOutOfStock}
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                    isOutOfStock
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : addedSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#1688FF] hover:bg-blue-600 active:bg-blue-700 text-white shadow-blue-500/30'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Added to Shopping Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      <span>{isOutOfStock ? 'Currently Out of Stock' : 'Add to Cart'}</span>
                    </>
                  )}
                </button>

                <button
                  disabled={isOutOfStock}
                  onClick={() => {
                    handleAddToCart();
                    onClose();
                    onOpenCart();
                  }}
                  className={`py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    isOutOfStock
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed border'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Instant Checkout</span>
                </button>
              </div>

              {/* Available Bank Offers Box */}
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-amber-900">
                  <Tag className="w-3.5 h-3.5 text-amber-600" />
                  <span>Available Store &amp; Bank Offers</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-amber-900/90 text-[11px]">
                  <li>Instant ₹2,000 discount with coupon <strong>SMART10</strong> on min order ₹2,000</li>
                  <li>No-Cost EMI starting at ₹3,899/month on major bank credit cards</li>
                  <li>In-Store Exchange Bonus up to ₹5,000 on trading your old smartphone</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tabbed Specifications, Reviews, and Warranty */}
          <div className="pt-6 border-t border-slate-200 space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <button
                onClick={() => setActiveTab('specs')}
                className={`px-4 py-2 font-bold text-xs sm:text-sm rounded-xl transition-colors ${
                  activeTab === 'specs'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Technical Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-4 py-2 font-bold text-xs sm:text-sm rounded-xl transition-colors ${
                  activeTab === 'reviews'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Customer Reviews ({productReviews.length})
              </button>
              <button
                onClick={() => setActiveTab('warranty')}
                className={`px-4 py-2 font-bold text-xs sm:text-sm rounded-xl transition-colors ${
                  activeTab === 'warranty'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Warranty &amp; Policies
              </button>
            </div>

            {/* TAB 1: Specifications Table */}
            {activeTab === 'specs' && (
              <div className="space-y-4">
                <h3 className="font-extrabold text-base text-slate-900">Official Product Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {[
                    { label: 'Processor', value: product.specifications.processor },
                    { label: 'Display Size', value: product.specifications.displaySize },
                    { label: 'Display Type', value: product.specifications.displayType },
                    { label: 'Refresh Rate', value: product.specifications.refreshRate },
                    { label: 'Rear Camera', value: product.specifications.rearCamera },
                    { label: 'Front Camera', value: product.specifications.frontCamera },
                    { label: 'Battery Capacity', value: product.specifications.battery },
                    { label: 'Charging Speed', value: product.specifications.chargingSpeed },
                    { label: '5G Compatibility', value: product.specifications.network5G },
                    { label: 'Operating System', value: product.specifications.os },
                    { label: 'SIM Configuration', value: product.specifications.simType },
                    { label: 'Connectivity', value: product.specifications.connectivity },
                    { label: 'In-Box Contents', value: product.specifications.inBoxContents },
                    { label: 'Manufacturer Warranty', value: product.specifications.warranty }
                  ].map((spec, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {spec.label}
                      </span>
                      <span className="font-semibold text-slate-800 mt-0.5">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: Customer Reviews & Submission */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div>
                    <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                      <span>{product.rating}</span>
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs text-slate-500 font-normal">Based on genuine verified purchases</span>
                    </h3>
                  </div>
                </div>

                {/* Review list */}
                <div className="space-y-3">
                  {productReviews.length > 0 ? (
                    productReviews.map(rev => (
                      <div key={rev.id} className="p-4 rounded-xl border border-slate-200 space-y-1.5 bg-white">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-slate-900">{rev.userName}</span>
                            {rev.verifiedPurchase && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Verified Buyer</span>
                              </span>
                            )}
                          </div>
                          <div className="flex text-amber-500">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" />
                            ))}
                          </div>
                        </div>
                        <h4 className="font-bold text-xs text-slate-800">{rev.title}</h4>
                        <p className="text-xs text-slate-600">{rev.comment}</p>
                        <span className="text-[10px] text-slate-400 block">
                          Reviewed on {new Date(rev.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-xs text-slate-500 border rounded-2xl">
                      No reviews written yet. Be the first to review this smartphone!
                    </div>
                  )}
                </div>

                {/* Write a Review Form */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="font-bold text-sm text-slate-900">Write a Customer Review</h4>
                  {reviewSubmitted ? (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                      Thank you! Your verified review has been posted successfully.
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitReview} className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Rating</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map(star => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setReviewRating(star)}
                              className={`p-1.5 rounded-lg border transition-all ${
                                reviewRating >= star
                                  ? 'bg-amber-100 border-amber-300 text-amber-700'
                                  : 'bg-white border-slate-200 text-slate-400'
                              }`}
                            >
                              <Star className={`w-4 h-4 ${reviewRating >= star ? 'fill-current' : ''}`} />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <input
                          type="text"
                          required
                          value={reviewTitle}
                          onChange={e => setReviewTitle(e.target.value)}
                          placeholder="Headline or summary (e.g., Amazing display & battery!)"
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <textarea
                          rows={3}
                          required
                          value={reviewComment}
                          onChange={e => setReviewComment(e.target.value)}
                          placeholder="Share your experience with this phone..."
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Review</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: Warranty & Policies */}
            {activeTab === 'warranty' && (
              <div className="space-y-4 text-xs text-slate-700">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Manufacturer Official Warranty Coverage</span>
                  </h4>
                  <p>
                    Every smartphone sold through SmartZone is 100% brand new, authentic, sealed, and backed by the respective brand&apos;s pan-India manufacturer warranty. You can claim service at any authorized brand service center nationwide using the official tax invoice provided with your purchase.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-blue-600" />
                    <span>7-Day Replacement Policy</span>
                  </h4>
                  <p>
                    In the rare event of a dead-on-arrival (DOA) or inherent manufacturing defect, SmartZone provides immediate replacement or service support within 7 days of delivery upon verification.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Frequently Bought Accessories Bundle */}
          {accessoryItems.length > 0 && (
            <div className="pt-6 border-t border-slate-200 space-y-3">
              <h4 className="font-extrabold text-sm text-slate-900">
                Frequently Bought Accessories
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {accessoryItems.map(acc => (
                  <div key={acc.id} className="p-3 rounded-2xl border border-slate-200 flex items-center gap-3 bg-slate-50/50">
                    <img src={acc.mainImage} alt={acc.title} className="w-14 h-14 object-cover rounded-xl border border-slate-200" />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold text-xs text-slate-900 truncate">{acc.title}</h5>
                      <span className="text-xs font-black text-slate-900">₹{acc.basePrice.toLocaleString('en-IN')}</span>
                      <button
                        onClick={() => addToCart(acc, acc.variants[0], 1)}
                        className="mt-1 px-3 py-1 bg-slate-900 hover:bg-blue-600 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add to Order</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="pt-6 border-t border-slate-200 space-y-3">
              <h4 className="font-extrabold text-sm text-slate-900">
                Similar Smartphones You Might Like
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedProducts.map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="p-3 rounded-2xl border border-slate-200 hover:border-blue-400 bg-white cursor-pointer transition-all flex items-center gap-3 group"
                  >
                    <img src={rel.mainImage} alt={rel.model} className="w-12 h-12 object-contain group-hover:scale-105 transition-transform" />
                    <div className="min-w-0">
                      <p className="font-bold text-xs text-slate-900 truncate group-hover:text-blue-600">{rel.model}</p>
                      <p className="text-xs font-black text-slate-800">₹{rel.basePrice.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
