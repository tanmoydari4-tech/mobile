import React from 'react';
import { X, ShieldCheck, Truck, RotateCcw, FileText, Info } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface Props {
  policyType: 'shipping' | 'return' | 'warranty' | 'privacy' | 'terms' | 'about' | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<Props> = ({ policyType, onClose }) => {
  const { siteSettings } = useStore();

  if (!policyType) return null;

  const contentMap: Record<
    string,
    { title: string; subtitle: string; icon: any; content: React.ReactNode }
  > = {
    shipping: {
      title: 'Shipping & Local Delivery Policy',
      subtitle: 'Fast, secure doorstep delivery and same-day express options',
      icon: Truck,
      content: (
        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
          <p>
            <strong>SmartZone Mobile Store</strong> prioritizes rapid, safe delivery for high-value mobile devices.
          </p>
          <h4 className="font-bold text-slate-900 text-sm">1. Same-Day Local Delivery</h4>
          <p>
            For PIN codes located within our primary service boundary (including Salt Lake, Sector 5, Park Street, BBD Bagh, and New Alipore), orders placed before 5:00 PM are delivered the same day within 2 to 4 hours by our trained store delivery staff.
          </p>
          <h4 className="font-bold text-slate-900 text-sm">2. Free Delivery Eligibility</h4>
          <p>
            All orders with a final net cart value of <strong>₹{siteSettings.deliverySettings.freeDeliveryThreshold} or higher</strong> receive 100% Free Delivery. Standard orders below this threshold incur a nominal handling fee.
          </p>
          <h4 className="font-bold text-slate-900 text-sm">3. Store Pickup (Click &amp; Collect)</h4>
          <p>
            Customers may choose to collect their orders directly from our retail counter at {siteSettings.address}. Pickup orders are processed and ready within 30 minutes with zero delivery fee.
          </p>
          <h4 className="font-bold text-slate-900 text-sm">4. Secure Transit &amp; Open-Box Verification</h4>
          <p>
            All phone parcels are transported in tamper-evident sealed security packaging. In the case of Cash on Delivery, customers can verify package integrity in front of our delivery executive.
          </p>
        </div>
      )
    },
    return: {
      title: 'Return, Replacement & Refund Policy',
      subtitle: 'Transparent replacement guidelines for genuine peace of mind',
      icon: RotateCcw,
      content: (
        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
          <h4 className="font-bold text-slate-900 text-sm">1. 7-Day Replacement for Hardware Defects</h4>
          <p>
            In the rare event that a brand-new smartphone exhibits a dead-on-arrival (DOA) condition or hardware defect within 7 days of delivery, SmartZone facilitates an instant replacement or authorized brand DOA certificate support.
          </p>
          <h4 className="font-bold text-slate-900 text-sm">2. Return Conditions</h4>
          <p>
            The smartphone must be returned in its original condition with the brand packaging, warranty card, IMEI sticker intact, manual, and all bundled accessories (charger, cable, SIM ejector).
          </p>
          <h4 className="font-bold text-slate-900 text-sm">3. Refund Processing</h4>
          <p>
            In scenarios where a replacement unit is unavailable, verified online payments will be refunded back to the original source method within 3-5 business days. For Cash on Delivery orders, refunds are issued via direct bank IMPS or UPI transfer.
          </p>
        </div>
      )
    },
    warranty: {
      title: 'Manufacturer Warranty Information',
      subtitle: '100% Brand Sealed Official Warranty Details',
      icon: ShieldCheck,
      content: (
        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
          <h4 className="font-bold text-slate-900 text-sm">1. 100% Authorized Pan-India Coverage</h4>
          <p>
            All smartphones retailed at SmartZone Mobile Store are sourced directly through official manufacturer distribution channels. Every device includes 1 Year comprehensive manufacturer warranty valid across all authorized brand service centers in India.
          </p>
          <h4 className="font-bold text-slate-900 text-sm">2. Accessories Warranty</h4>
          <p>
            In-box accessories such as adapters, cables, and bundled earphones carry 6 months official warranty. SmartZone brand fast chargers and power banks carry 1 Year replacement warranty.
          </p>
          <h4 className="font-bold text-slate-900 text-sm">3. In-Store Assistance</h4>
          <p>
            If you ever need guidance in booking a brand service appointment or claiming warranty, our store staff is readily available to guide and inspect your device at no extra charge.
          </p>
        </div>
      )
    },
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'How SmartZone safeguards customer and transaction data',
      icon: FileText,
      content: (
        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
          <p>
            SmartZone Mobile Store is committed to upholding the privacy of every shopper.
          </p>
          <h4 className="font-bold text-slate-900 text-sm">1. Information Collection</h4>
          <p>
            We collect customer names, phone numbers, delivery addresses, and email addresses solely to deliver orders, generate official GST invoices, and send dispatch notifications.
          </p>
          <h4 className="font-bold text-slate-900 text-sm">2. Payment Security</h4>
          <p>
            SmartZone never stores sensitive credit card, debit card, or CVV data. All online transactions are processed through RBI-authorized payment gateways complying with PCI-DSS standards.
          </p>
          <h4 className="font-bold text-slate-900 text-sm">3. Zero Third-Party Data Selling</h4>
          <p>
            Your private details will never be sold, rented, or distributed to third-party telemarketers.
          </p>
        </div>
      )
    },
    terms: {
      title: 'Terms & Conditions',
      subtitle: 'Terms governing store purchases and website usage',
      icon: FileText,
      content: (
        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
          <h4 className="font-bold text-slate-900 text-sm">1. Product Pricing &amp; Stock Availability</h4>
          <p>
            Prices listed in Indian Rupees (₹) are inclusive of all applicable taxes. In rare instances where an item runs out of stock simultaneously, SmartZone reserves the right to notify the customer and promptly issue an exchange or refund.
          </p>
          <h4 className="font-bold text-slate-900 text-sm">2. Order Acceptance</h4>
          <p>
            An order is considered confirmed upon system validation of stock and payment authorization (or COD address verification).
          </p>
        </div>
      )
    },
    about: {
      title: 'About SmartZone Mobile Store',
      subtitle: 'Your trusted neighborhood destination for premium mobile tech',
      icon: Info,
      content: (
        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
          <p>
            Founded in 2018, <strong>SmartZone Mobile Store</strong> has grown to become the premier smartphone retail destination in Kolkata. Located in the bustling tech corridor of Salt Lake, we bridge the convenience of modern e-commerce with the warmth, trust, and personal touch of a physical retail showroom.
          </p>
          <p>
            Whether you are looking for the latest flagship Apple or Samsung device, an ultra-fast gaming phone, or an affordable 5G upgrade, our team provides authentic advice, unboxing experiences, free data migrations, and same-day doorstep deliveries.
          </p>
          <p className="font-bold text-slate-900">
            Showroom: {siteSettings.address}
          </p>
        </div>
      )
    }
  };

  const item = contentMap[policyType];
  if (!item) return null;
  const Icon = item.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full my-auto overflow-hidden border border-slate-200 relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 px-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/30 flex items-center justify-center border border-blue-500/30">
              <Icon className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-white">{item.title}</h2>
              <p className="text-xs text-slate-400">{item.subtitle}</p>
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
        <div className="p-6 overflow-y-auto flex-1">{item.content}</div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
