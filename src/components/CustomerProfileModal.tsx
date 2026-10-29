import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  User,
  MapPin,
  Package,
  Heart,
  Plus,
  Trash2,
  Check,
  ShieldCheck,
  Phone,
  Mail,
  ChevronRight,
  LogOut,
  ExternalLink
} from 'lucide-react';
import { Order, Product } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onTrackOrder: (order: Order) => void;
  onSelectProduct: (product: Product) => void;
}

export const CustomerProfileModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onTrackOrder,
  onSelectProduct
}) => {
  const {
    currentUser,
    orders,
    products,
    wishlist,
    toggleWishlist,
    addSavedAddress,
    deleteSavedAddress,
    updateUserProfile,
    loginAs
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'wishlist' | 'profile'>('orders');

  // Address add form
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddrName, setNewAddrName] = useState('');
  const [newAddrPhone, setNewAddrPhone] = useState('');
  const [newAddrStreet, setNewAddrStreet] = useState('');
  const [newAddrLocality, setNewAddrLocality] = useState('');
  const [newAddrPincode, setNewAddrPincode] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('Kolkata');

  // Profile edit form
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '');
  const [editSaved, setEditSaved] = useState(false);

  if (!isOpen || !currentUser) return null;

  // Filter orders for current user
  const userOrders = orders.filter(o => o.customerId === currentUser.id);
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrStreet || !newAddrLocality || !newAddrPincode) return;

    addSavedAddress({
      name: newAddrName || currentUser.name,
      phone: newAddrPhone || currentUser.phone,
      street: newAddrStreet,
      locality: newAddrLocality,
      pincode: newAddrPincode,
      city: newAddrCity,
      state: 'West Bengal',
      isDefault: currentUser.addresses.length === 0
    });

    setShowAddAddress(false);
    setNewAddrStreet('');
    setNewAddrLocality('');
    setNewAddrPincode('');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name: editName, phone: editPhone });
    setEditSaved(true);
    setTimeout(() => setEditSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full my-auto overflow-hidden border border-slate-200 relative max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 px-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-white">{currentUser.name}</h2>
              <p className="text-xs text-slate-400">{currentUser.email} • {currentUser.phone}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-2 pt-3 shrink-0 overflow-x-auto">
          {[
            { id: 'orders', label: `My Orders (${userOrders.length})`, icon: Package },
            { id: 'addresses', label: `Saved Addresses (${currentUser.addresses.length})`, icon: MapPin },
            { id: 'wishlist', label: `Wishlist (${wishlistProducts.length})`, icon: Heart },
            { id: 'profile', label: 'Profile Details', icon: User }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 px-3 font-bold text-xs flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
                  active
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 text-xs">
          {/* TAB: Orders */}
          {activeTab === 'orders' && (
            <div className="space-y-3">
              {userOrders.length === 0 ? (
                <div className="py-16 text-center text-slate-500">
                  <Package className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                  <p className="font-bold text-sm text-slate-700">No orders placed yet</p>
                  <p className="text-xs text-slate-400 mt-1">Your smartphone and accessory orders will show here.</p>
                </div>
              ) : (
                userOrders.map(ord => (
                  <div
                    key={ord.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="font-extrabold text-sm text-slate-900">
                          Order #{ord.id}
                        </span>
                        <span className="text-slate-400 text-[11px] block">
                          {new Date(ord.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-blue-100 text-blue-800">
                          {ord.orderStatus.replace(/_/g, ' ')}
                        </span>
                        <span className="font-black text-sm text-slate-900">
                          ₹{ord.totalAmount.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <div className="divide-y divide-slate-100 pt-1">
                      {ord.items.map(item => (
                        <div key={item.id} className="py-1.5 flex items-center justify-between">
                          <span className="text-slate-800 font-semibold truncate max-w-sm">
                            {item.quantity}x {item.model} ({item.storage})
                          </span>
                          <span className="text-slate-500">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                      <span className="text-slate-500 text-[11px]">
                        Payment: <strong className="uppercase">{ord.paymentMethod}</strong> ({ord.paymentStatus})
                      </span>
                      <button
                        onClick={() => {
                          onClose();
                          onTrackOrder(ord);
                        }}
                        className="px-3.5 py-1.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl font-bold text-xs transition-colors flex items-center gap-1"
                      >
                        <span>Track Order Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB: Saved Addresses */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">Delivery Addresses</span>
                <button
                  onClick={() => setShowAddAddress(!showAddAddress)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Address</span>
                </button>
              </div>

              {showAddAddress && (
                <form onSubmit={handleCreateAddress} className="p-4 rounded-2xl bg-slate-50 border border-slate-300 space-y-3">
                  <h4 className="font-bold text-slate-900">New Address Details</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Receiver Name"
                      value={newAddrName}
                      onChange={e => setNewAddrName(e.target.value)}
                      className="px-3 py-2 bg-white border border-slate-300 rounded-xl"
                    />
                    <input
                      type="text"
                      placeholder="Phone Number"
                      value={newAddrPhone}
                      onChange={e => setNewAddrPhone(e.target.value)}
                      className="px-3 py-2 bg-white border border-slate-300 rounded-xl"
                    />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Street Address / Flat / Building"
                    value={newAddrStreet}
                    onChange={e => setNewAddrStreet(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Locality / Area"
                      value={newAddrLocality}
                      onChange={e => setNewAddrLocality(e.target.value)}
                      className="px-3 py-2 bg-white border border-slate-300 rounded-xl"
                    />
                    <input
                      type="text"
                      required
                      placeholder="6-digit PIN code"
                      maxLength={6}
                      value={newAddrPincode}
                      onChange={e => setNewAddrPincode(e.target.value.replace(/\D/g, ''))}
                      className="px-3 py-2 bg-white border border-slate-300 rounded-xl"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl">
                      Save Address
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddAddress(false)}
                      className="px-4 py-2 bg-slate-200 text-slate-700 font-bold rounded-xl"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentUser.addresses.map(addr => (
                  <div key={addr.id} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-1 relative group">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{addr.name}</span>
                      <button
                        onClick={() => deleteSavedAddress(addr.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-slate-600">{addr.street}, {addr.locality}</p>
                    <p className="text-slate-600">{addr.city} - {addr.pincode}</p>
                    <p className="text-slate-500 font-medium">📞 {addr.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Wishlist */}
          {activeTab === 'wishlist' && (
            <div className="space-y-3">
              {wishlistProducts.length === 0 ? (
                <div className="py-16 text-center text-slate-500">
                  <Heart className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                  <p className="font-bold text-sm text-slate-700">Your wishlist is empty</p>
                  <p className="text-xs text-slate-400 mt-1">Tap the heart icon on any smartphone to save it here.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {wishlistProducts.map(prod => (
                    <div
                      key={prod.id}
                      className="p-3.5 rounded-2xl border border-slate-200 bg-white flex items-center justify-between gap-3 hover:border-blue-400 transition-all cursor-pointer"
                      onClick={() => {
                        onClose();
                        onSelectProduct(prod);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <img src={prod.mainImage} alt={prod.title} className="w-12 h-12 object-contain" />
                        <div>
                          <span className="text-[10px] font-bold text-blue-600 uppercase">{prod.brand}</span>
                          <h4 className="font-bold text-xs text-slate-900">{prod.model}</h4>
                          <span className="font-black text-xs text-slate-900">
                            ₹{prod.basePrice.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          toggleWishlist(prod.id);
                        }}
                        className="text-rose-500 hover:text-rose-700 p-1.5"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: Profile Settings */}
          {activeTab === 'profile' && (
            <div className="max-w-md space-y-4">
              <form onSubmit={handleSaveProfile} className="space-y-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Mobile Phone Number</label>
                  <input
                    type="text"
                    value={editPhone}
                    onChange={e => setEditPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Email Address</label>
                  <input
                    type="email"
                    disabled
                    value={currentUser.email}
                    className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-xl font-semibold text-slate-500 cursor-not-allowed"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Update Profile</span>
                </button>
                {editSaved && (
                  <p className="text-emerald-600 font-bold">Profile details updated successfully!</p>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
