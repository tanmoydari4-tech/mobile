import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  CreditCard,
  Banknote,
  Truck,
  Store,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  QrCode,
  Smartphone,
  ChevronRight,
  Printer
} from 'lucide-react';
import { Order } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<Props> = ({ isOpen, onClose, onOrderSuccess }) => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    couponDiscountAmount,
    appliedCoupon,
    deliveryMode,
    setDeliveryMode,
    calculatedDeliveryFee,
    finalOrderTotal,
    selectedPincode,
    deliveryAreas,
    currentUser,
    createOrder,
    siteSettings
  } = useStore();

  // Form states
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');
  const [streetAddress, setStreetAddress] = useState(
    currentUser?.addresses[0]?.street || ''
  );
  const [locality, setLocality] = useState(
    currentUser?.addresses[0]?.locality || ''
  );
  const [pincode, setPincode] = useState(selectedPincode);
  const [city, setCity] = useState('Kolkata');
  const [landmark, setLandmark] = useState('');
  const [instructions, setInstructions] = useState('');
  const [pickupSlot, setPickupSlot] = useState('Today between 4:00 PM – 7:00 PM');
  const [orderNotes, setOrderNotes] = useState('');

  // Payment method selection: 'cod' or 'online'
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');

  // Razorpay Gateway Simulation Modal state
  const [showRazorpayModal, setShowRazorpayModal] = useState(false);
  const [selectedOnlineMethod, setSelectedOnlineMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Placed Order Result
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const handleSubmitCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please provide your name and contact phone number.');
      return;
    }

    if (deliveryMode === 'local_delivery' && (!streetAddress.trim() || !locality.trim())) {
      alert('Please fill in your delivery street address and locality.');
      return;
    }

    if (paymentMethod === 'online') {
      // Trigger Razorpay payment gateway simulation
      setShowRazorpayModal(true);
    } else {
      // Direct Cash on Delivery
      processOrderPlacement('cod', 'pending');
    }
  };

  const processOrderPlacement = (
    method: 'cod' | 'online',
    payStatus: 'pending' | 'paid',
    transactionId?: string
  ) => {
    const orderPayload: Partial<Order> = {
      customerName,
      customerPhone,
      customerEmail,
      deliveryMode,
      deliveryAddress:
        deliveryMode === 'local_delivery'
          ? {
              street: streetAddress,
              locality,
              pincode,
              city,
              landmark,
              instructions
            }
          : undefined,
      pickupTimeSlot: deliveryMode === 'store_pickup' ? pickupSlot : undefined,
      paymentMethod: method,
      paymentStatus: payStatus,
      paymentDetails: transactionId
        ? {
            transactionId,
            gateway: 'Razorpay PG Secure (Test Environment)',
            paidAt: new Date().toISOString()
          }
        : undefined,
      orderNotes
    };

    const res = createOrder(orderPayload);
    if (res.success && res.order) {
      setPlacedOrder(res.order);
      setShowRazorpayModal(false);
      onOrderSuccess(res.order);
    } else {
      alert(res.message);
    }
  };

  // Simulate Razorpay Payment Success
  const handleSimulatePaymentSuccess = () => {
    setIsProcessingPayment(true);
    setPaymentError(null);

    setTimeout(() => {
      setIsProcessingPayment(false);
      const testTxnId = `pay_SZ_test_${Math.floor(100000 + Math.random() * 900000)}`;
      processOrderPlacement('online', 'paid', testTxnId);
    }, 1200);
  };

  // Simulate Razorpay Payment Failure
  const handleSimulatePaymentFailure = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentError('Bank payment simulation declined by user or test card. Please retry or choose Cash on Delivery.');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full my-auto overflow-hidden border border-slate-200 relative max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="p-4 px-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/30 flex items-center justify-center border border-blue-500/30">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-white">SmartZone Secure Checkout</h2>
              <p className="text-xs text-slate-400">Verified inventory allocation &amp; encrypted transaction</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1">
          {placedOrder ? (
            /* Order Placed Success View */
            <div className="py-8 text-center space-y-6 max-w-lg mx-auto">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                  Order Successfully Placed!
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  Thank You, {placedOrder.customerName}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Your order ID is <strong className="text-slate-900">{placedOrder.id}</strong>
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-3">
                <div className="flex justify-between pb-2 border-b border-slate-200 font-medium">
                  <span className="text-slate-500">Fulfillment Method</span>
                  <span className="font-bold text-slate-900">
                    {placedOrder.deliveryMode === 'store_pickup' ? 'Store Pickup' : 'Express Local Delivery'}
                  </span>
                </div>

                <div className="flex justify-between pb-2 border-b border-slate-200 font-medium">
                  <span className="text-slate-500">Payment Status</span>
                  <span className="font-bold uppercase text-slate-900">
                    {placedOrder.paymentMethod === 'online' ? 'Paid Online (Verified)' : 'Cash on Delivery (Pending)'}
                  </span>
                </div>

                <div className="flex justify-between pb-2 border-b border-slate-200 font-medium">
                  <span className="text-slate-500">Payable Total</span>
                  <span className="text-base font-black text-slate-900">
                    ₹{placedOrder.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                {placedOrder.deliveryMode === 'store_pickup' ? (
                  <p className="text-[11px] text-slate-600">
                    🏬 Ready for pickup at <strong>{siteSettings.address}</strong>. Please bring your Order ID.
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-600">
                    🛵 Delivery assigned to: <strong>{placedOrder.deliveryAddress?.street}, {placedOrder.deliveryAddress?.locality} ({placedOrder.deliveryAddress?.pincode})</strong>.
                  </p>
                )}
              </div>

              <div className="flex gap-3 justify-center pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors shadow-md"
                >
                  Close &amp; Track Order
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitCheckout} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Customer & Delivery Details */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Contact Information */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] flex items-center justify-center">1</span>
                    <span>Customer Contact Details</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={e => setCustomerName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Mobile Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={e => setCustomerPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Email Address (for GST Invoice)</label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={e => setCustomerEmail(e.target.value)}
                      placeholder="rahul@example.com"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* 2. Delivery or Store Pickup */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] flex items-center justify-center">2</span>
                      <span>Fulfillment Preference</span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDeliveryMode('local_delivery')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        deliveryMode === 'local_delivery'
                          ? 'border-blue-600 bg-white shadow-xs ring-1 ring-blue-500'
                          : 'border-slate-200 bg-white/70 text-slate-600'
                      }`}
                    >
                      <Truck className="w-4 h-4 text-blue-600 mb-1" />
                      <p className="text-xs font-bold text-slate-900">Local Delivery</p>
                      <p className="text-[10px] text-slate-500">Delivered directly to address</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryMode('store_pickup')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        deliveryMode === 'store_pickup'
                          ? 'border-blue-600 bg-white shadow-xs ring-1 ring-blue-500'
                          : 'border-slate-200 bg-white/70 text-slate-600'
                      }`}
                    >
                      <Store className="w-4 h-4 text-blue-600 mb-1" />
                      <p className="text-xs font-bold text-slate-900">Store Pickup</p>
                      <p className="text-[10px] text-emerald-600 font-bold">FREE at Salt Lake Store</p>
                    </button>
                  </div>

                  {deliveryMode === 'local_delivery' ? (
                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Street Address / Flat / Building *</label>
                        <input
                          type="text"
                          required
                          value={streetAddress}
                          onChange={e => setStreetAddress(e.target.value)}
                          placeholder="e.g. Flat 4B, Greenwood Heights, EC Block"
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">Locality / Area *</label>
                          <input
                            type="text"
                            required
                            value={locality}
                            onChange={e => setLocality(e.target.value)}
                            placeholder="e.g. Salt Lake Sector 1"
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">PIN Code *</label>
                          <input
                            type="text"
                            required
                            maxLength={6}
                            value={pincode}
                            onChange={e => setPincode(e.target.value.replace(/\D/g, ''))}
                            placeholder="700064"
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">City</label>
                          <input
                            type="text"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">Nearby Landmark (Optional)</label>
                          <input
                            type="text"
                            value={landmark}
                            onChange={e => setLandmark(e.target.value)}
                            placeholder="Near EC Market"
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Delivery Rider Instructions</label>
                        <input
                          type="text"
                          value={instructions}
                          onChange={e => setInstructions(e.target.value)}
                          placeholder="Please ring doorbell or call before coming."
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 text-xs">
                      <p className="font-bold text-slate-900">
                        📍 Store Pickup Location:
                      </p>
                      <p className="text-slate-600">{siteSettings.address}</p>
                      <div className="pt-2">
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Estimated Collection Time</label>
                        <select
                          value={pickupSlot}
                          onChange={e => setPickupSlot(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                          <option>Today between 1:00 PM – 4:00 PM</option>
                          <option>Today between 4:00 PM – 7:00 PM</option>
                          <option>Today between 7:00 PM – 9:30 PM</option>
                          <option>Tomorrow Morning (10:00 AM – 1:00 PM)</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Payment Method */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] flex items-center justify-center">3</span>
                    <span>Choose Payment Method</span>
                  </h3>

                  <div className="space-y-3">
                    <label
                      className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-blue-600 bg-white shadow-xs ring-1 ring-blue-500'
                          : 'border-slate-200 bg-white/70 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                            <Banknote className="w-4 h-4 text-emerald-600" />
                            <span>Cash on Delivery (COD)</span>
                          </p>
                          <p className="text-[10px] text-slate-500">Pay cash or UPI to delivery rider upon unboxing / at store counter</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-extrabold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        Available
                      </span>
                    </label>

                    <label
                      className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        paymentMethod === 'online'
                          ? 'border-blue-600 bg-white shadow-xs ring-1 ring-blue-500'
                          : 'border-slate-200 bg-white/70 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === 'online'}
                          onChange={() => setPaymentMethod('online')}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                            <CreditCard className="w-4 h-4 text-blue-600" />
                            <span>Online Payment (UPI, Credit/Debit Cards, NetBanking)</span>
                          </p>
                          <p className="text-[10px] text-slate-500">Powered by Razorpay PG with 256-bit SSL encryption</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        Instant Verification
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary & Place Button */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4 shadow-xl">
                  <h3 className="font-extrabold text-sm text-white">Order Summary</h3>

                  {/* Cart preview */}
                  <div className="divide-y divide-slate-800 max-h-48 overflow-y-auto pr-1">
                    {cart.map(item => (
                      <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                        <div className="min-w-0 pr-2">
                          <p className="font-bold text-white truncate">{item.model}</p>
                          <p className="text-[10px] text-slate-400">
                            {item.storage} • {item.color} • Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="font-black text-white shrink-0">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Subtotal</span>
                      <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                    </div>

                    {cartDiscount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Total MRP Savings</span>
                        <span>-₹{cartDiscount.toLocaleString('en-IN')}</span>
                      </div>
                    )}

                    {couponDiscountAmount > 0 && (
                      <div className="flex justify-between text-emerald-400 font-bold">
                        <span>Coupon ({appliedCoupon?.code})</span>
                        <span>-₹{couponDiscountAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-slate-400">
                      <span>Delivery Fee</span>
                      <span>{calculatedDeliveryFee === 0 ? 'FREE' : `₹${calculatedDeliveryFee}`}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                      <span className="text-sm font-bold text-white">Net Payable Total</span>
                      <span className="text-2xl font-black text-[#1688FF]">
                        ₹{finalOrderTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#1688FF] hover:bg-blue-600 active:bg-blue-700 text-white font-extrabold text-sm shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{paymentMethod === 'online' ? 'Proceed to Pay Online' : 'Confirm Order via COD'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Safety Guarantee */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-slate-800">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>SmartZone Buyer Protection</span>
                  </div>
                  <p className="text-[11px]">
                    Every purchase includes official GST invoice, valid for pan-India brand warranty claims. Open-box inspection supported before COD payment.
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Razorpay Interactive Simulator Modal */}
        {showRazorpayModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
              {/* Razorpay Header */}
              <div className="bg-blue-700 text-white p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center font-black text-sm">
                    RZP
                  </div>
                  <div>
                    <h3 className="font-black text-base">Razorpay Test Gateway</h3>
                    <p className="text-[11px] text-blue-100">SmartZone Mobile Store • Merchant Test Mode</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowRazorpayModal(false)}
                  className="p-1 rounded-lg text-white/80 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Amount bar */}
              <div className="bg-slate-900 text-white p-4 flex items-center justify-between text-xs">
                <span className="text-slate-400">Payable Amount:</span>
                <span className="text-lg font-black text-white">₹{finalOrderTotal.toLocaleString('en-IN')}</span>
              </div>

              {/* Payment Methods */}
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedOnlineMethod('upi')}
                    className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all ${
                      selectedOnlineMethod === 'upi'
                        ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-500'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                    <span>UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedOnlineMethod('card')}
                    className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all ${
                      selectedOnlineMethod === 'card'
                        ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-500'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                    <span>Cards</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedOnlineMethod('netbanking')}
                    className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all ${
                      selectedOnlineMethod === 'netbanking'
                        ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-500'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <QrCode className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                    <span>NetBanking</span>
                  </button>
                </div>

                {selectedOnlineMethod === 'upi' && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2">
                    <div className="w-28 h-28 bg-white border border-slate-300 rounded-xl mx-auto flex items-center justify-center p-2 shadow-xs">
                      <QrCode className="w-20 h-20 text-slate-800" />
                    </div>
                    <p className="text-xs font-bold text-slate-700">Scan QR or enter UPI ID</p>
                    <p className="text-[11px] text-slate-400">GPay, PhonePe, Paytm, BHIM</p>
                  </div>
                )}

                {paymentError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{paymentError}</span>
                  </div>
                )}

                {/* Gateway Test Action Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    disabled={isProcessingPayment}
                    onClick={handleSimulatePaymentSuccess}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isProcessingPayment ? (
                      <span>Verifying signature...</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Simulate Successful Payment (Test Mode)</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    disabled={isProcessingPayment}
                    onClick={handleSimulatePaymentFailure}
                    className="w-full py-2.5 bg-slate-100 hover:bg-rose-50 text-rose-600 hover:border-rose-200 border border-transparent font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Simulate Payment Decline / Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
