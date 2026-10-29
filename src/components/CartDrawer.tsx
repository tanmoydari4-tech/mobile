import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  ArrowRight,
  Tag,
  ShieldCheck,
  Truck,
  Store,
  Check,
  AlertCircle
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onProceedCheckout: () => void;
}

export const CartDrawer: React.FC<Props> = ({ isOpen, onClose, onProceedCheckout }) => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartDiscount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    couponDiscountAmount,
    deliveryMode,
    setDeliveryMode,
    calculatedDeliveryFee,
    finalOrderTotal,
    siteSettings,
    coupons
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ success: boolean; text: string } | null>(null);

  if (!isOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponMessage({ success: res.success, text: res.message });
    if (res.success) {
      setCouponInput('');
    }
  };

  const handleQuickCoupon = (code: string) => {
    const res = applyCoupon(code);
    setCouponMessage({ success: res.success, text: res.message });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-left">
        {/* Drawer Header */}
        <div className="p-4 px-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-white">Your Shopping Cart</h2>
              <p className="text-[11px] text-slate-400">
                {cart.length} {cart.length === 1 ? 'item' : 'items'} in cart
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-[11px] font-bold text-slate-400 hover:text-rose-400 p-1 transition-colors"
                title="Empty Cart"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <h3 className="text-base font-extrabold text-slate-800">Your cart is empty</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Discover the latest flagship smartphones, 5G powerhouses, and genuine accessories.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors shadow-md"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map(item => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/40 hover:bg-white transition-all space-y-2.5"
                >
                  <div className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.productTitle}
                      className="w-16 h-16 object-contain rounded-xl border border-slate-200 bg-white p-1 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <span className="text-[10px] font-extrabold text-blue-600 uppercase">
                            {item.brand}
                          </span>
                          <h4 className="font-bold text-xs text-slate-900 truncate">
                            {item.model}
                          </h4>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant Specs */}
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {item.storage !== 'N/A' && <span>{item.storage} • </span>}
                        <span>{item.color}</span>
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden shadow-2xs">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="p-1 px-2 text-slate-600 hover:bg-slate-100 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-bold text-xs text-slate-900 min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.stockAvailable}
                            className={`p-1 px-2 transition-colors ${
                              item.quantity >= item.stockAvailable
                                ? 'text-slate-300 cursor-not-allowed'
                                : 'text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="text-xs font-black text-slate-900">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                          {item.originalPrice > item.price && (
                            <span className="block text-[10px] text-slate-400 line-through">
                              ₹{(item.originalPrice * item.quantity).toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Delivery Mode Switcher */}
              <div className="p-3.5 rounded-2xl bg-slate-100/70 border border-slate-200/80 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Select Delivery / Collection Mode
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDeliveryMode('local_delivery')}
                    className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 ${
                      deliveryMode === 'local_delivery'
                        ? 'border-blue-600 bg-white shadow-xs ring-1 ring-blue-500'
                        : 'border-slate-200 bg-white/60 text-slate-600'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Local Delivery</p>
                      <p className="text-[10px] text-slate-500">Same-Day / Courier</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setDeliveryMode('store_pickup')}
                    className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 ${
                      deliveryMode === 'store_pickup'
                        ? 'border-blue-600 bg-white shadow-xs ring-1 ring-blue-500'
                        : 'border-slate-200 bg-white/60 text-slate-600'
                    }`}
                  >
                    <Store className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Store Pickup</p>
                      <p className="text-[10px] text-emerald-600 font-bold">FREE (30 Mins)</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Coupon Code Section */}
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-blue-600" />
                    <span>Apply Discount Coupon</span>
                  </span>
                  {appliedCoupon && (
                    <button
                      onClick={removeCoupon}
                      className="text-[10px] font-bold text-rose-600 hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {appliedCoupon ? (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
                    <div>
                      <span className="font-extrabold uppercase">{appliedCoupon.code}</span>
                      <p className="text-[11px] text-emerald-700">{appliedCoupon.description}</p>
                    </div>
                    <span className="font-black text-emerald-900">
                      -₹{couponDiscountAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={e => {
                        setCouponInput(e.target.value.toUpperCase());
                        setCouponMessage(null);
                      }}
                      placeholder="e.g. SMART10, FLAT500"
                      className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs uppercase font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponMessage && (
                  <p
                    className={`text-[11px] font-semibold ${
                      couponMessage.success ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {couponMessage.text}
                  </p>
                )}

                {/* Popular coupon quick chips */}
                {!appliedCoupon && (
                  <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5">
                    <span className="text-[10px] text-slate-400 font-semibold shrink-0">Try:</span>
                    {coupons.filter(c => c.isActive).slice(0, 3).map(c => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => handleQuickCoupon(c.code)}
                        className="px-2 py-0.5 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-[10px] font-bold shrink-0 transition-colors"
                      >
                        {c.code}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer with Calculations and Checkout */}
        {cart.length > 0 && (
          <div className="p-4 px-5 bg-slate-50 border-t border-slate-200 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-bold text-slate-900">
                  ₹{cartSubtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Product MRP Savings</span>
                  <span>-₹{cartDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              {couponDiscountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span>-₹{couponDiscountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Fulfillment Fee ({deliveryMode === 'store_pickup' ? 'Store Pickup' : 'Local Delivery'})</span>
                <span className="font-bold text-slate-900">
                  {calculatedDeliveryFee === 0 ? (
                    <span className="text-emerald-600">FREE</span>
                  ) : (
                    `₹${calculatedDeliveryFee}`
                  )}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Final Payable Amount
                  </span>
                  <span className="text-xs text-slate-400">All Taxes & GST Included</span>
                </div>
                <span className="text-xl font-black text-slate-900">
                  ₹{finalOrderTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedCheckout();
              }}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#1688FF] hover:bg-blue-600 active:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
