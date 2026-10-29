import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Order, OrderStatus } from '../types';
import {
  X,
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  Store,
  PhoneCall,
  MessageCircle,
  Printer,
  ChevronRight,
  ShieldCheck,
  Calendar,
  XCircle
} from 'lucide-react';

interface Props {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderTrackingModal: React.FC<Props> = ({ order, isOpen, onClose }) => {
  const { cancelOrder, siteSettings } = useStore();
  const [cancelReason, setCancelReason] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelFeedback, setCancelFeedback] = useState<string | null>(null);

  if (!isOpen || !order) return null;

  const steps: { key: OrderStatus; label: string; icon: any }[] = [
    { key: 'pending_confirmation', label: 'Order Placed', icon: Clock },
    { key: 'confirmed', label: 'Confirmed', icon: CheckCircle2 },
    { key: 'processing', label: 'Processing', icon: Package },
    {
      key: order.deliveryMode === 'store_pickup' ? 'ready_for_pickup' : 'out_for_delivery',
      label: order.deliveryMode === 'store_pickup' ? 'Ready for Pickup' : 'Out for Delivery',
      icon: order.deliveryMode === 'store_pickup' ? Store : Truck
    },
    { key: 'delivered', label: 'Delivered / Completed', icon: ShieldCheck }
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'pending_confirmation': return 0;
      case 'confirmed': return 1;
      case 'processing': return 2;
      case 'ready_for_pickup':
      case 'out_for_delivery': return 3;
      case 'delivered': return 4;
      case 'cancelled': return -1;
      default: return 0;
    }
  };

  const currentIndex = getStepIndex(order.orderStatus);
  const isCancellable = ['pending_confirmation', 'confirmed'].includes(order.orderStatus);

  const handleCancel = () => {
    const res = cancelOrder(order.id, cancelReason || 'Cancelled by customer');
    setCancelFeedback(res.message);
    setIsCancelling(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello SmartZone Team, I am inquiring regarding my Order ID: ${order.id} (${order.items.map(i => i.model).join(', ')}). Could you please provide an update?`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in print:p-0 print:bg-white">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full my-auto overflow-hidden border border-slate-200 relative max-h-[92vh] flex flex-col print:shadow-none print:border-none print:max-h-none">
        {/* Header */}
        <div className="p-4 px-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0 print:bg-white print:text-black print:border-b-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/30 flex items-center justify-center border border-blue-500/30 print:hidden">
              <Package className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-lg text-white print:text-black">
                  Order Details #{order.id}
                </h2>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                  order.orderStatus === 'delivered'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : order.orderStatus === 'cancelled'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                }`}>
                  {order.orderStatus.replace(/_/g, ' ')}
                </span>
              </div>
              <p className="text-xs text-slate-400 print:text-slate-600">
                Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handlePrint}
              title="Print Invoice"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Status Tracker Bar (hidden if cancelled) */}
          {order.orderStatus !== 'cancelled' ? (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-[11px]">
                Live Fulfillment Progress
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 relative">
                {steps.map((st, idx) => {
                  const Icon = st.icon;
                  const isDone = idx <= currentIndex;
                  const isCurrent = idx === currentIndex;
                  return (
                    <div key={st.key} className="flex flex-col items-center text-center p-2 rounded-xl transition-all">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center mb-1.5 transition-all ${
                          isDone
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                            : 'bg-slate-200 text-slate-400'
                        } ${isCurrent ? 'ring-4 ring-blue-500/20 scale-105' : ''}`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className={`text-[11px] font-bold ${isDone ? 'text-slate-900' : 'text-slate-400'}`}>
                        {st.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-3">
              <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <div>
                <p className="font-bold">This order has been cancelled.</p>
                <p className="text-[11px] text-rose-700">Any inventory reserved for this order was automatically returned to shop stock.</p>
              </div>
            </div>
          )}

          {/* Ordered Products Table */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Purchased Items
            </h3>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white">
              {order.items.map(item => (
                <div key={item.id} className="p-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.productTitle}
                      className="w-12 h-12 object-contain rounded-lg border border-slate-200 bg-slate-50 p-1 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold text-blue-600 uppercase">
                        {item.brand}
                      </span>
                      <h4 className="font-bold text-xs text-slate-900">{item.model}</h4>
                      <p className="text-[11px] text-slate-500">
                        {item.storage} • {item.color} • Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-xs text-slate-900">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price & Payment Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Fulfillment Details
              </h4>
              <p className="font-bold text-slate-800">
                Mode: {order.deliveryMode === 'store_pickup' ? '🏬 Store Pickup' : '🛵 Local Home Delivery'}
              </p>
              {order.deliveryAddress ? (
                <p className="text-slate-600">
                  {order.deliveryAddress.street}, {order.deliveryAddress.locality}, {order.deliveryAddress.city} - {order.deliveryAddress.pincode}
                </p>
              ) : (
                <p className="text-slate-600">
                  Pickup Slot: <strong>{order.pickupTimeSlot}</strong> at SmartZone Store, Galaxy Tech Mall, Salt Lake.
                </p>
              )}
              <p className="text-slate-600">Customer Phone: <strong>{order.customerPhone}</strong></p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Payment Breakdown
              </h4>
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
              </div>
              {order.couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Discount ({order.couponCode})</span>
                  <span>-₹{order.couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Delivery Charge</span>
                <span>{order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-slate-900 font-extrabold pt-1 border-t border-slate-200 text-sm">
                <span>Total Amount</span>
                <span>₹{order.totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-1">
                Payment: <strong className="uppercase">{order.paymentMethod}</strong> (Status: <strong className="uppercase">{order.paymentStatus}</strong>)
              </p>
            </div>
          </div>

          {/* Status Timeline History */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Status Timeline Log
            </h4>
            <div className="space-y-1.5 pl-2 border-l-2 border-slate-200">
              {order.statusTimeline.map((ev, i) => (
                <div key={i} className="pl-3 relative">
                  <div className="absolute -left-[19px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-600 ring-2 ring-white" />
                  <p className="font-bold text-slate-800 capitalize">
                    {ev.status.replace(/_/g, ' ')}
                  </p>
                  <p className="text-[11px] text-slate-500">{ev.note}</p>
                  <span className="text-[10px] text-slate-400">
                    {new Date(ev.timestamp).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Cancel Order Section */}
          {isCancellable && (
            <div className="pt-3 border-t border-slate-100">
              {isCancelling ? (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-300 space-y-3">
                  <p className="font-bold text-slate-900">Are you sure you want to cancel this order?</p>
                  <input
                    type="text"
                    value={cancelReason}
                    onChange={e => setCancelReason(e.target.value)}
                    placeholder="Reason for cancellation (optional)"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold"
                    >
                      Confirm Cancel Order
                    </button>
                    <button
                      onClick={() => setIsCancelling(false)}
                      className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl font-bold"
                    >
                      Keep Order
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsCancelling(true)}
                  className="text-rose-600 font-bold hover:underline"
                >
                  Cancel this order
                </button>
              )}
            </div>
          )}

          {cancelFeedback && (
            <p className="text-xs font-bold text-rose-600">{cancelFeedback}</p>
          )}

          {/* Store Support Action Buttons */}
          <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 print:hidden">
            <span className="text-slate-500 text-[11px]">
              Need help regarding this order?
            </span>
            <div className="flex gap-2">
              <a
                href={`https://wa.me/919830045678?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href={`tel:${siteSettings.phone.replace(/\s+/g, '')}`}
                className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Store</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
