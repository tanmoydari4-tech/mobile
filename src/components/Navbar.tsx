import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Smartphone,
  Search,
  ShoppingCart,
  Heart,
  Scale,
  MapPin,
  User,
  Shield,
  Menu,
  X,
  PhoneCall,
  Clock,
  Sparkles,
  ChevronDown,
  Layers,
  ArrowRight,
  LogOut,
  ExternalLink,
  Tag
} from 'lucide-react';
import { Product } from '../types';

interface NavbarProps {
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenCompare: () => void;
  onOpenLocation: () => void;
  onOpenContact: () => void;
  onOpenProfile: () => void;
  onOpenAuth: () => void;
  onOpenAdmin: () => void;
  onSelectProduct: (product: Product) => void;
  onNavigateCategory: (category: string) => void;
  onNavigateBrand: (brand: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCart,
  onOpenWishlist,
  onOpenCompare,
  onOpenLocation,
  onOpenContact,
  onOpenProfile,
  onOpenAuth,
  onOpenAdmin,
  onSelectProduct,
  onNavigateCategory,
  onNavigateBrand,
  activeSection
}) => {
  const {
    products,
    cartCount,
    wishlist,
    compareList,
    selectedPincode,
    deliveryAreas,
    currentUser,
    logoutCustomer,
    isAdminAuthenticated,
    siteSettings
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products for live search
  const filteredSuggestions = searchQuery.trim()
    ? products
        .filter(p => p.enabled)
        .filter(p => {
          const q = searchQuery.toLowerCase();
          return (
            p.title.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.model.toLowerCase().includes(q) ||
            p.shortSpecs.toLowerCase().includes(q)
          );
        })
        .slice(0, 5)
    : [];

  const matchedArea = deliveryAreas.find(a => a.pincode === selectedPincode);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-xs w-full">
      {/* Top Bar with Brand, Search, Location, Actions */}
      <div ref={searchRef} className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-2 sm:gap-5">
          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-1.5 sm:p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
              aria-label="Open mobile navigation"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                onNavigateCategory('all');
              }}
              className="flex items-center gap-2 sm:gap-2.5 group min-w-0"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-[#0758C9] to-[#1688FF] flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform shrink-0">
                <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2.2]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-extrabold text-base sm:text-xl tracking-tight text-slate-900 leading-none truncate">
                  Smart<span className="text-[#1688FF]">Zone</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-semibold text-slate-600 tracking-wider uppercase mt-0.5 truncate">
                  Mobile Store
                </span>
              </div>
            </a>
          </div>

          {/* Location Delivery Selector (Desktop) */}
          <button
            onClick={onOpenLocation}
            className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 transition-all text-left text-xs text-slate-700 shrink-0"
          >
            <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-blue-600" />
            </div>
            <div className="truncate max-w-[140px]">
              <span className="block text-[10px] text-slate-600 font-medium leading-none">Deliver to</span>
              <span className="font-bold text-slate-900 truncate block">
                {matchedArea ? `${matchedArea.pincode} (${matchedArea.locality.split('/')[0].trim()})` : selectedPincode}
              </span>
            </div>
          </button>

          {/* Search Bar (Desktop) */}
          <div className="relative flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Search smartphone model, brand, processor, camera..."
                className="w-full pl-10 pr-9 py-2 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Action Icons: Compare, Wishlist, Cart, Profile, Admin Switch */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Compare (visible on sm and up, also in mobile quick bar) */}
            <button
              onClick={onOpenCompare}
              title="Compare Phones"
              className="hidden sm:flex relative p-2 sm:p-2.5 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors items-center justify-center"
            >
              <Scale className="w-4 h-4 sm:w-5 sm:h-5" />
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                  {compareList.length}
                </span>
              )}
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              title="Wishlist"
              className="relative p-2 sm:p-2.5 rounded-xl text-slate-700 hover:text-rose-600 hover:bg-slate-100 transition-colors flex items-center justify-center"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={onOpenCart}
              title="Shopping Cart"
              className="relative p-2 sm:p-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-all flex items-center justify-center shadow-sm"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#1688FF] text-white text-[10px] sm:text-[11px] font-black w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center ring-2 ring-white animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Account / Sign In button */}
            {!currentUser ? (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] sm:text-xs transition-colors shadow-xs cursor-pointer"
              >
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Sign In</span>
              </button>
            ) : (
              <div ref={userMenuRef} className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-1.5 p-1 sm:px-3 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 transition-colors text-xs font-semibold text-slate-800 cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[11px]">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:inline max-w-[90px] truncate">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden md:inline" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-60 sm:w-64 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-fade-in text-xs">
                    <div className="p-4 bg-slate-900 text-white">
                      <p className="font-bold text-sm truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-300 truncate">{currentUser.email}</p>
                      <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-semibold text-[10px]">
                        Signed In Customer
                      </div>
                    </div>

                    <div className="p-2 space-y-1">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onOpenProfile();
                        }}
                        className="w-full px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-700 flex items-center gap-2.5 transition-colors font-medium text-left cursor-pointer"
                      >
                        <User className="w-4 h-4 text-slate-500" />
                        <span>My Profile &amp; Addresses</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onOpenProfile();
                        }}
                        className="w-full px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-700 flex items-center gap-2.5 transition-colors font-medium text-left cursor-pointer"
                      >
                        <Layers className="w-4 h-4 text-slate-500" />
                        <span>My Orders History</span>
                      </button>

                      <div className="pt-1.5 border-t border-slate-100">
                        <button
                          onClick={() => {
                            logoutCustomer();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          <LogOut className="w-4 h-4 text-rose-600" />
                          <span>Customer Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Direct Admin Portal shortcut pill */}
            <button
              onClick={onOpenAdmin}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-[#1688FF]" />
              <span>Admin Portal</span>
              {isAdminAuthenticated && (
                <span className="w-2 h-2 rounded-full bg-emerald-400" title="Admin Logged In" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-2 md:hidden relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            placeholder="Search phones, brand, RAM, 5G..."
            className="w-full pl-9 pr-8 py-2 bg-slate-100 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Shared Live Search Suggestions Dropdown (Works on both Mobile & Desktop) */}
        {isSearchOpen && searchQuery.trim().length > 0 && (
          <div className="relative">
            <div className="absolute top-2 left-0 right-0 max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-fade-in">
              <div className="p-2 px-3 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>Product Suggestions</span>
                <span>{filteredSuggestions.length} items found</span>
              </div>
              {filteredSuggestions.length > 0 ? (
                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                  {filteredSuggestions.map(product => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product);
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="p-2.5 sm:p-3 hover:bg-blue-50/50 cursor-pointer flex items-center gap-3 transition-colors group"
                    >
                      <img
                        src={product.mainImage}
                        alt={product.title}
                        className="w-11 h-11 sm:w-12 sm:h-12 object-cover rounded-lg border border-slate-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded shrink-0">
                            {product.brand}
                          </span>
                          <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                            {product.model}
                          </h4>
                        </div>
                        <p className="text-[10px] sm:text-[11px] text-slate-500 truncate mt-0.5">{product.shortSpecs}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-bold text-slate-900">
                            ₹{product.basePrice.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] text-slate-400 line-through">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] text-emerald-600 font-bold">
                            {product.discountPercent}% OFF
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 shrink-0" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-5 text-center text-xs text-slate-500">
                  No phones found matching &quot;{searchQuery}&quot;. Try searching Apple, Samsung, 5G, or 120W.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Touch-Scrollable Quick Navigation Bar (Auto-adjusts on all mobile phones) */}
      <div className="lg:hidden bg-slate-900 text-white border-t border-slate-800 px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px] font-bold">
        {[
          { label: 'All Phones', id: 'all' },
          { label: 'Flagships', id: 'flagship' },
          { label: 'Mid-Range', id: 'mid-range' },
          { label: 'Budget 5G', id: 'budget' },
          { label: 'Gaming', id: 'gaming' },
          { label: 'Accessories', id: 'accessory' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => onNavigateCategory(item.id)}
            className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors shrink-0 ${
              activeSection === item.id
                ? 'bg-[#1688FF] text-white'
                : 'bg-slate-800/90 text-slate-300 hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}

        <button
          onClick={onOpenLocation}
          className="px-2.5 py-1 rounded-lg bg-slate-800/90 text-blue-300 whitespace-nowrap flex items-center gap-1 shrink-0"
        >
          <MapPin className="w-3 h-3" />
          <span>PIN: {selectedPincode}</span>
        </button>

        <button
          onClick={onOpenAdmin}
          className="px-2.5 py-1 rounded-lg bg-slate-800 text-white whitespace-nowrap flex items-center gap-1 shrink-0 border border-slate-700"
        >
          <Shield className="w-3 h-3 text-[#1688FF]" />
          <span>Admin</span>
        </button>
      </div>

      {/* Secondary Category & Brand Navigation Bar (Desktop) */}
      <nav className="hidden lg:block bg-slate-900 text-white text-xs font-semibold border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-1 overflow-x-auto py-1">
            <button
              onClick={() => onNavigateCategory('all')}
              className={`px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeSection === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              All Smartphones
            </button>

            <button
              onClick={() => onNavigateCategory('flagship')}
              className={`px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeSection === 'flagship'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Flagship Phones
            </button>

            <button
              onClick={() => onNavigateCategory('mid-range')}
              className={`px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeSection === 'mid-range'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Mid-Range (Under ₹35k)
            </button>

            <button
              onClick={() => onNavigateCategory('budget')}
              className={`px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeSection === 'budget'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Budget Friendly
            </button>

            <button
              onClick={() => onNavigateCategory('gaming')}
              className={`px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeSection === 'gaming'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Gaming Beasts
            </button>

            <button
              onClick={() => onNavigateCategory('accessory')}
              className={`px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeSection === 'accessory'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Accessories Store
            </button>

            <button
              onClick={onOpenCompare}
              className="px-3.5 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              <Scale className="w-3.5 h-3.5 text-blue-400" />
              <span>Compare Phones</span>
            </button>

            <button
              onClick={onOpenContact}
              className="px-3.5 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>Store &amp; Contact</span>
            </button>
          </div>

          <div className="flex items-center gap-3 text-slate-400 text-[11px] py-1 font-medium">
            <span className="flex items-center gap-1 text-slate-300">
              <Clock className="w-3 h-3 text-blue-400" />
              <span>Open 10 AM - 9:30 PM</span>
            </span>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-[85vw] max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-right overflow-y-auto">
            {/* Mobile Drawer Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Smartphone className="w-4 h-4 text-white" />
                </div>
                <span className="font-extrabold text-base">SmartZone Store</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Account Section in Mobile Drawer */}
            <div className="p-3 bg-slate-100 border-b border-slate-200">
              {!currentUser ? (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
                >
                  <User className="w-4 h-4" />
                  <span>Customer Sign In / Sign Up</span>
                </button>
              ) : (
                <div className="flex items-center justify-between gap-2 bg-white p-2.5 rounded-xl border border-slate-200">
                  <div
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenProfile();
                    }}
                    className="flex items-center gap-2 min-w-0 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-xs text-slate-900 truncate">{currentUser.name}</p>
                      <p className="text-[10px] text-blue-600 font-semibold">View Orders &amp; Profile</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logoutCustomer();
                      setIsMobileMenuOpen(false);
                    }}
                    className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 text-[11px] font-bold shrink-0"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Location Selector */}
            <div className="p-3 bg-slate-50 border-b border-slate-200">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenLocation();
                }}
                className="w-full p-2 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-800"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>Deliver to: {selectedPincode}</span>
                </div>
                <span className="text-[11px] text-blue-600 font-bold">Change</span>
              </button>
            </div>

            {/* Categories */}
            <div className="p-4 space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Shop Categories</p>
              {[
                { label: 'All Smartphones', id: 'all' },
                { label: 'Flagship Phones', id: 'flagship' },
                { label: 'Mid-Range (Under ₹35k)', id: 'mid-range' },
                { label: 'Budget Smartphones', id: 'budget' },
                { label: 'Gaming Beasts', id: 'gaming' },
                { label: 'Accessories Store', id: 'accessory' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onNavigateCategory(cat.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    activeSection === cat.id ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}

              <div className="pt-3 border-t border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Top Brands</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {['Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Realme', 'Vivo', 'Motorola', 'iQOO'].map(b => (
                    <button
                      key={b}
                      onClick={() => {
                        onNavigateBrand(b);
                        setIsMobileMenuOpen(false);
                      }}
                      className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:border-blue-500 hover:bg-blue-50/50 text-left"
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-1">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenCompare();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                >
                  <Scale className="w-4 h-4 text-blue-600" />
                  <span>Compare Phones ({compareList.length})</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenContact();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-600" />
                  <span>Store Address &amp; Contact</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 flex items-center gap-2"
                >
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span>Admin Panel</span>
                </button>
              </div>
            </div>

            {/* Mobile Footer */}
            <div className="mt-auto p-4 border-t border-slate-200 bg-slate-50 text-xs text-slate-500">
              <p className="font-semibold text-slate-800">{siteSettings.phone}</p>
              <p className="text-[11px] mt-0.5">{siteSettings.address}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
