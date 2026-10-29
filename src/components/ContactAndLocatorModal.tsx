import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Send,
  HelpCircle,
  ChevronDown,
  CheckCircle2,
  Store,
  Navigation
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactAndLocatorModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { siteSettings, submitSupportInquiry } = useStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Product Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // FAQ accordion
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  if (!isOpen) return null;

  const faqs = [
    {
      q: 'Do you sell 100% genuine sealed phones with official manufacturer warranty?',
      a: 'Yes, absolutely. Every phone and accessory at SmartZone is brand-sealed with official manufacturer pan-India warranty. You receive a proper GST invoice containing the IMEI number for hassle-free warranty claims at any authorized service center.'
    },
    {
      q: 'How fast is your local delivery service?',
      a: 'For orders within our primary service zones (Salt Lake, Sector 5, BBD Bagh, Park Street), our dedicated store delivery riders deliver within 2 to 3 hours of order confirmation. For other areas, same-day or next-day delivery applies.'
    },
    {
      q: 'Can I order online and pick up from the physical shop counter?',
      a: 'Yes! Select "Store Pickup" at checkout. Your phone and accessories will be reserved immediately and kept ready at our pickup counter within 30 minutes with zero pickup fee. Our store team will also provide free data transfer and glass installation upon request.'
    },
    {
      q: 'What is your exchange policy for old mobile phones?',
      a: 'You can bring any working smartphone to our Salt Lake showroom for instant digital diagnostics and evaluation. We offer competitive exchange value plus up to ₹5,000 extra exchange bonus on selected flagship models.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    submitSupportInquiry({
      name,
      phone,
      email: email || 'customer@smartzone.in',
      subject,
      message
    });

    setSubmitted(true);
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 3500);
  };

  const whatsappUrl = `https://wa.me/${siteSettings.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
    'Hi SmartZone Mobile Store! I have a question regarding phone availability and today\'s offers.'
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full my-auto overflow-hidden border border-slate-200 relative max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 px-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/30 flex items-center justify-center border border-blue-500/30">
              <Store className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-white">Store Locator &amp; Customer Support</h2>
              <p className="text-xs text-slate-400">Visit our physical showroom or contact our retail specialists</p>
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
        <div className="p-6 overflow-y-auto space-y-8 flex-1 text-xs">
          {/* Top Shop Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Location */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>Showroom Location</span>
              </div>
              <p className="text-slate-600 leading-relaxed font-medium">{siteSettings.address}</p>
              <div className="pt-2">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-bold"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Driving Directions</span>
                </a>
              </div>
            </div>

            {/* Timings */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Opening Hours</span>
              </div>
              <p className="text-slate-700 font-semibold">{siteSettings.openingHours}</p>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                Open Today • Walk-ins Welcome
              </span>
            </div>

            {/* Quick Contact & WhatsApp */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>Direct Support Lines</span>
              </div>
              <div className="space-y-1.5">
                <a
                  href={`tel:${siteSettings.phone.replace(/\D/g, '')}`}
                  className="block font-bold text-slate-900 hover:text-blue-600"
                >
                  📞 {siteSettings.phone}
                </a>
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="block text-slate-600 hover:text-blue-600"
                >
                  ✉️ {siteSettings.email}
                </a>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Contact Inquiry Form & FAQs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Contact Form */}
            <div className="lg:col-span-6 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900">
                Send Us a Message or Price Inquiry
              </h3>
              <p className="text-slate-500">
                Inquire about bulk purchases, phone availability, trade-in value, or corporate quotes.
              </p>

              {submitted ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 space-y-1">
                  <div className="flex items-center gap-2 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Inquiry Sent Successfully!</span>
                  </div>
                  <p className="text-[11px] text-emerald-700">
                    Our team has received your message and logged it into our support dashboard. We will call you back shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Rahul Sharma"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Email (Optional)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="rahul@example.com"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Inquiry Subject</label>
                    <select
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option>Product Stock &amp; Best Price Inquiry</option>
                      <option>Old Phone Exchange Value Evaluation</option>
                      <option>Local Delivery Status Assistance</option>
                      <option>Corporate / Bulk Purchase Query</option>
                      <option>Other Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Your Message *</label>
                    <textarea
                      rows={3}
                      required
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Please specify which smartphone model or accessories you are inquiring about..."
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              )}
            </div>

            {/* FAQs Accordion */}
            <div className="lg:col-span-6 space-y-3">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span>Frequently Asked Questions</span>
              </h3>

              <div className="space-y-2">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="border border-slate-200 rounded-2xl overflow-hidden bg-white"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                      className="w-full p-3.5 text-left font-bold text-slate-900 flex items-center justify-between gap-2 hover:bg-slate-50 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                          expandedFaq === i ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {expandedFaq === i && (
                      <div className="p-3.5 pt-0 text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
