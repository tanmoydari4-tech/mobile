import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { MapPin, X, CheckCircle2, AlertCircle, Clock, Truck, Store, ArrowRight } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationSelectorModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const {
    deliveryAreas,
    selectedPincode,
    setSelectedPincode,
    checkPincode,
    deliveryMode,
    setDeliveryMode,
    siteSettings
  } = useStore();

  const [inputPin, setInputPin] = useState(selectedPincode);
  const [feedback, setFeedback] = useState<{
    tested: boolean;
    serviceable: boolean;
    message: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleTestPincode = (pin: string) => {
    const result = checkPincode(pin);
    setFeedback({
      tested: true,
      serviceable: result.serviceable,
      message: result.message
    });
    if (result.serviceable) {
      setSelectedPincode(pin);
    }
  };

  const handleQuickSelect = (pincode: string) => {
    setInputPin(pincode);
    handleTestPincode(pincode);
  };

  const handleSaveAndClose = () => {
    if (inputPin.trim().length === 6) {
      handleTestPincode(inputPin.trim());
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 flex items-center justify-center border border-blue-500/30">
              <MapPin className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Choose Delivery Location</h3>
              <p className="text-xs text-slate-400">Check same-day local delivery and pickup availability</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Input & Check */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Enter 6-Digit PIN Code
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  maxLength={6}
                  value={inputPin}
                  onChange={e => {
                    const val = e.target.value.replace(/\D/g, '');
                    setInputPin(val);
                    setFeedback(null);
                  }}
                  placeholder="e.g. 700064"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none focus:bg-white transition-all text-sm"
                />
              </div>
              <button
                onClick={() => handleTestPincode(inputPin)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm shadow-blue-500/20"
              >
                Verify
              </button>
            </div>

            {/* Feedback message */}
            {feedback && (
              <div
                className={`mt-3 p-3.5 rounded-xl border text-xs flex items-start gap-2.5 transition-all ${
                  feedback.serviceable
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-800'
                    : 'bg-amber-50 border-amber-200 text-amber-800'
                }`}
              >
                {feedback.serviceable ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-semibold">{feedback.message}</p>
                  {feedback.serviceable && (
                    <p className="mt-1 text-emerald-700">
                      Standard local delivery rate applies or free on orders over ₹{siteSettings.deliverySettings.freeDeliveryThreshold}.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quick select from supported local hubs */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Popular Local Delivery Areas
              </label>
              <span className="text-[11px] text-blue-600 font-medium">Same-Day Eligible</span>
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-44 overflow-y-auto pr-1">
              {deliveryAreas.map(area => (
                <button
                  key={area.id}
                  onClick={() => handleQuickSelect(area.pincode)}
                  className={`p-2.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                    selectedPincode === area.pincode
                      ? 'border-blue-600 bg-blue-50/60 shadow-xs ring-1 ring-blue-500'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{area.pincode}</span>
                    {selectedPincode === area.pincode && (
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-600 truncate mt-0.5">{area.locality}</span>
                  <span className="text-[10px] text-emerald-700 font-medium mt-1">
                    {area.deliveryCharge === 0 ? 'FREE Delivery' : `₹${area.deliveryCharge} Delivery`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Delivery Mode Preference */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Default Fulfillment Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setDeliveryMode('local_delivery')}
                className={`p-3 rounded-xl border flex items-center gap-2.5 text-left transition-all ${
                  deliveryMode === 'local_delivery'
                    ? 'border-blue-600 bg-blue-50/60 text-blue-900 ring-1 ring-blue-500'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold leading-tight">Local Delivery</p>
                  <p className="text-[10px] text-slate-500">Delivered to door</p>
                </div>
              </button>

              <button
                onClick={() => setDeliveryMode('store_pickup')}
                className={`p-3 rounded-xl border flex items-center gap-2.5 text-left transition-all ${
                  deliveryMode === 'store_pickup'
                    ? 'border-blue-600 bg-blue-50/60 text-blue-900 ring-1 ring-blue-500'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Store className="w-4 h-4 text-blue-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold leading-tight">Store Pickup</p>
                  <p className="text-[10px] text-slate-500">Pick from shop (Free)</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-between items-center">
          <span className="text-xs text-slate-500">
            Current PIN: <strong className="text-slate-800">{selectedPincode}</strong>
          </span>
          <button
            onClick={handleSaveAndClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
          >
            <span>Confirm & Continue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
