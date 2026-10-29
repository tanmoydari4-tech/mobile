import React, { useState, useMemo, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { BrandBar } from './components/BrandBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CompareModal } from './components/CompareModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { CustomerProfileModal } from './components/CustomerProfileModal';
import { LocationSelectorModal } from './components/LocationSelectorModal';
import { ContactAndLocatorModal } from './components/ContactAndLocatorModal';
import { PolicyModal } from './components/PolicyModal';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import {
  Filter,
  SlidersHorizontal,
  ArrowUpDown,
  Zap,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Store,
  Star,
  MessageCircle,
  Clock,
  Phone,
  CheckCircle2,
  ChevronRight,
  X,
  Smartphone,
  Headphones
} from 'lucide-react';
import { Product, ProductCategory, Order } from './types';

const StoreFront: React.FC = () => {
  const { products, selectedPincode, siteSettings, orders } = useStore();

  // Navigation and Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedRam, setSelectedRam] = useState<string>('all');
  const [selectedStorage, setSelectedStorage] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(160000);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [only5G, setOnly5G] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(null);
  const [activePolicy, setActivePolicy] = useState<
    'shipping' | 'return' | 'warranty' | 'privacy' | 'terms' | 'about' | null
  >(null);

  // Mobile filters drawer toggle
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Deal countdown timer simulation
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 24, seconds: 48 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter products logic
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => p.enabled)
      .filter(p => {
        // Category filter
        if (selectedCategory !== 'all') {
          if (selectedCategory === 'flagship' && p.category !== 'flagship') return false;
          if (selectedCategory === 'mid-range' && p.category !== 'mid-range') return false;
          if (selectedCategory === 'budget' && p.category !== 'budget') return false;
          if (selectedCategory === 'gaming' && p.category !== 'gaming') return false;
          if (selectedCategory === 'accessory' && p.category !== 'accessory') return false;
        }

        // Brand filter
        if (selectedBrand !== 'all' && p.brand !== selectedBrand) {
          return false;
        }

        // Price filter
        if (p.basePrice > maxPrice) {
          return false;
        }

        // In-stock only
        if (onlyInStock) {
          const hasStock = p.variants.some(v => v.stock > 0);
          if (!hasStock) return false;
        }

        // 5G only
        if (only5G && !p.specifications.network5G.toLowerCase().includes('5g')) {
          return false;
        }

        // RAM filter
        if (selectedRam !== 'all') {
          const hasRam = p.variants.some(v => v.ram.includes(selectedRam));
          if (!hasRam) return false;
        }

        // Storage filter
        if (selectedStorage !== 'all') {
          const hasStorage = p.variants.some(v => v.storage.includes(selectedStorage));
          if (!hasStorage) return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price_asc':
            return a.basePrice - b.basePrice;
          case 'price_desc':
            return b.basePrice - a.basePrice;
          case 'newest':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case 'rating':
            return b.rating - a.rating;
          case 'discount':
            return b.discountPercent - a.discountPercent;
          case 'featured':
          default:
            return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
        }
      });
  }, [
    products,
    selectedCategory,
    selectedBrand,
    selectedRam,
    selectedStorage,
    maxPrice,
    onlyInStock,
    only5G,
    sortBy
  ]);

  // Today's special deals
  const todayDeals = useMemo(() => {
    return products.filter(p => p.isTodayDeal && p.enabled);
  }, [products]);

  // Accessories section items
  const accessoryProducts = useMemo(() => {
    return products.filter(p => p.category === 'accessory' && p.enabled);
  }, [products]);

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOrderSuccess = (order: Order) => {
    setActiveTrackingOrder(order);
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedRam('all');
    setSelectedStorage('all');
    setMaxPrice(160000);
    setOnlyInStock(false);
    setOnly5G(false);
    setSortBy('featured');
  };

  const activeFilterCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedBrand !== 'all' ? 1 : 0) +
    (selectedRam !== 'all' ? 1 : 0) +
    (selectedStorage !== 'all' ? 1 : 0) +
    (maxPrice < 160000 ? 1 : 0) +
    (onlyInStock ? 1 : 0) +
    (only5G ? 1 : 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* 1. Header Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Main Navigation Bar */}
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsProfileOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenLocation={() => setIsLocationOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onSelectProduct={prod => setSelectedProduct(prod)}
        onNavigateCategory={cat => {
          setSelectedCategory(cat);
          scrollToCatalog();
        }}
        onNavigateBrand={brand => {
          setSelectedBrand(brand);
          scrollToCatalog();
        }}
        activeSection={selectedCategory}
      />

      {/* 3. Hero Promotional Banner */}
      <HeroBanner
        onShopNow={scrollToCatalog}
        onExploreLatest={() => {
          setSortBy('newest');
          scrollToCatalog();
        }}
      />

      {/* 4. Brand Bar */}
      <BrandBar
        selectedBrand={selectedBrand}
        onSelectBrand={brand => {
          setSelectedBrand(brand);
          scrollToCatalog();
        }}
      />

      {/* 5. Today's Deals Section with Live Countdown */}
      {todayDeals.length > 0 && selectedCategory === 'all' && selectedBrand === 'all' && (
        <section className="py-10 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25">
                  <Zap className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      Today&apos;s Smartphone Deals
                    </h2>
                    <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-extrabold text-[10px] animate-pulse">
                      LIMITED TIME
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Exclusive discounted local inventory available for immediate dispatch
                  </p>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-900 text-white px-4 py-2 rounded-2xl shadow-md text-xs font-mono font-bold">
                <Clock className="w-4 h-4 text-blue-400 mr-1" />
                <span>Offer Ends:</span>
                <span className="bg-slate-800 px-2 py-1 rounded-lg text-blue-400">
                  {String(timeLeft.hours).padStart(2, '0')}h
                </span>
                <span>:</span>
                <span className="bg-slate-800 px-2 py-1 rounded-lg text-blue-400">
                  {String(timeLeft.minutes).padStart(2, '0')}m
                </span>
                <span>:</span>
                <span className="bg-slate-800 px-2 py-1 rounded-lg text-blue-400">
                  {String(timeLeft.seconds).padStart(2, '0')}s
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {todayDeals.slice(0, 4).map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={p => setSelectedProduct(p)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Featured Categories Grid */}
      {selectedCategory === 'all' && selectedBrand === 'all' && (
        <section className="py-10 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Explore Smartphone Categories
              </h2>
              <p className="text-xs text-slate-500">Find the ideal handset tailored to your lifestyle &amp; budget</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { title: 'Flagships', sub: 'iPhone, S24 Ultra', id: 'flagship', img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=400&q=80' },
                { title: 'Mid-Range', sub: 'Under ₹35,000', id: 'mid-range', img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=400&q=80' },
                { title: 'Budget 5G', sub: 'Starting ₹12,999', id: 'budget', img: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=400&q=80' },
                { title: 'Gaming', sub: 'Ultra-cooling 144Hz', id: 'gaming', img: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=400&q=80' },
                { title: 'Camera Pro', sub: 'ZEISS & Hasselblad', id: 'camera', img: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=400&q=80' },
                { title: 'Accessories', sub: 'Chargers, TWS, Glass', id: 'accessory', img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    scrollToCatalog();
                  }}
                  className="p-3 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all text-left bg-slate-50/50 hover:bg-white group cursor-pointer"
                >
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="w-full h-24 object-cover rounded-xl mb-2.5 group-hover:scale-104 transition-transform"
                  />
                  <h4 className="font-extrabold text-xs text-slate-900 group-hover:text-blue-600 transition-colors">
                    {cat.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 truncate">{cat.sub}</p>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. Main Catalog & Products Grid */}
      <section id="catalog-section" className="py-10 max-w-7xl mx-auto px-4 sm:px-6 flex-1 w-full">
        {/* Top Filter and Sort Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {selectedCategory === 'all'
                  ? 'All Mobile Devices & Gear'
                  : selectedCategory === 'flagship'
                  ? 'Flagship Smartphones'
                  : selectedCategory === 'mid-range'
                  ? 'Mid-Range Smartphones'
                  : selectedCategory === 'budget'
                  ? 'Budget-Friendly Phones'
                  : selectedCategory === 'gaming'
                  ? 'Gaming Performance Phones'
                  : selectedCategory === 'accessory'
                  ? 'Mobile Accessories Store'
                  : 'Smartphones'}
              </h2>
              {selectedBrand !== 'all' && (
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-extrabold text-xs">
                  {selectedBrand}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing <strong>{filteredProducts.length}</strong> verified models available for delivery to PIN{' '}
              <strong>{selectedPincode}</strong>
            </p>
          </div>

          {/* Controls: Mobile Filter Button & Sort Dropdown */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5 shadow-2xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
              <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
            </button>

            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-2xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[11px] font-bold text-slate-500 uppercase">Sort by:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="newest">Newest Releases</option>
                <option value="rating">Highest Rated</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Catalog Layout: Desktop Sidebar Filters + Product Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 bg-white p-5 rounded-2xl border border-slate-200 sticky top-24 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                <span>Filters</span>
              </span>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] font-bold text-blue-600 hover:underline"
                >
                  Reset ({activeFilterCount})
                </button>
              )}
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-700">Max Budget</label>
                <span className="text-xs font-black text-blue-600">
                  ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min={2000}
                max={160000}
                step={5000}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>₹2,000</span>
                <span>₹1,60,000</span>
              </div>
            </div>

            {/* RAM Filter */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">RAM Capacity</label>
              <div className="grid grid-cols-3 gap-1.5">
                {['all', '4GB', '6GB', '8GB', '12GB', '16GB'].map(ram => (
                  <button
                    key={ram}
                    onClick={() => setSelectedRam(ram)}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedRam === ram
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {ram === 'all' ? 'All' : ram}
                  </button>
                ))}
              </div>
            </div>

            {/* Storage Filter */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">Storage Capacity</label>
              <div className="grid grid-cols-2 gap-1.5">
                {['all', '128GB', '256GB', '512GB', '1TB'].map(st => (
                  <button
                    key={st}
                    onClick={() => setSelectedStorage(st)}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedStorage === st
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st === 'all' ? 'All Storage' : st}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles: In-Stock only & 5G */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-800">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={e => setOnlyInStock(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <span>In-Stock Items Only</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-800">
                <input
                  type="checkbox"
                  checked={only5G}
                  onChange={e => setOnly5G(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <span>5G Compatible Only</span>
              </label>
            </div>
          </aside>

          {/* Product Cards Grid */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <Smartphone className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    No products match your selected filters
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                    Try loosening your budget slider or clearing the RAM and Brand filters to see more available phones.
                  </p>
                </div>
                <button
                  onClick={clearAllFilters}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-md"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={p => setSelectedProduct(p)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </section>

      {/* 8. Trade-In Exchange & Festive Offer Promo Banner */}
      <section className="py-12 bg-slate-900 text-white border-y border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
                INSTANT STORE EXCHANGE BONUS
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Upgrade to Latest 5G: Get Up to ₹5,000 Extra Exchange Bonus
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                Bring your current Android or iPhone device to our Salt Lake showroom. We provide instant digital evaluation and transfer all your photos, contacts, and WhatsApp chats to your new phone for free.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <button
                onClick={() => setIsContactOpen(true)}
                className="px-6 py-3.5 bg-[#1688FF] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/25 transition-all text-center"
              >
                Inquire Exchange Value
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  scrollToCatalog();
                }}
                className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-all text-center"
              >
                View Eligible 5G Handsets
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Dedicated Accessories Store Highlight */}
      {selectedCategory === 'all' && accessoryProducts.length > 0 && (
        <section className="py-12 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-600">
                  SMARTZONE POWER &amp; AUDIO
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Premium Mobile Accessories
                </h2>
                <p className="text-xs text-slate-500">100W GaN fast chargers, 50dB Hybrid ANC earbuds, 20000mAh banks, and Japanese 9H glass</p>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory('accessory');
                  scrollToCatalog();
                }}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 self-start sm:self-auto"
              >
                <span>View Full Gear Catalog</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {accessoryProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={p => setSelectedProduct(p)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10. Why Shop With SmartZone */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              TRUST &amp; EXCELLENCE
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-2">
              Why Customers Love SmartZone Mobile Store
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Combining rapid local e-commerce with dependable physical store accountability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">
                ⚡ 2-Hour Express Local Delivery
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Why wait 3-5 days for generic online courier shipments? We dispatch from our local Salt Lake showroom straight to your home or office within hours.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 flex items-center justify-center text-emerald-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">
                🛡️ 100% Genuine Sealed Units
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every smartphone comes with manufacturer box seal intact and official GST invoice detailing your IMEI number, guaranteeing full pan-India warranty coverage.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/10 flex items-center justify-center text-purple-600">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">
                🏬 Physical Shop Support &amp; Setup
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Need phone setup, SIM cutting, or safe data migration? Our showroom specialists assist you free of charge. You always have a physical address to walk into.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Customer Reviews Spotlight */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Verified Customer Reviews
              </h2>
              <p className="text-xs text-slate-500">Real feedback from genuine mobile buyers across Kolkata</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-amber-600 font-bold self-start sm:self-auto bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>4.8 / 5 Average Rating from 450+ Shoppers</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900">Rahul Sharma</span>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
              <h4 className="font-bold text-xs text-slate-800">
                &ldquo;Delivered in 90 minutes with sealed warranty!&rdquo;
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ordered the Samsung Galaxy S24 Ultra with coupon SMART10. Received the device in Salt Lake within 90 mins! The delivery rider waited patiently while I checked the seal.
              </p>
              <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Verified Local Delivery Buyer
              </span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900">Priya Mukherjee</span>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
              <h4 className="font-bold text-xs text-slate-800">
                &ldquo;Click &amp; Collect made pickup effortless&rdquo;
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Selected store pickup for my iPhone 16 Pro. When I reached their Galaxy Tech Mall shop, my phone and accessories were packed and ready. They helped transfer all my data for free.
              </p>
              <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Verified Store Pickup Buyer
              </span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900">Subhashis Roy</span>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
              <h4 className="font-bold text-xs text-slate-800">
                &ldquo;Best local price on Redmi Note 13 Pro+&rdquo;
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Beats online sale prices and includes genuine warranty. Highly recommended for anyone buying phones in Kolkata.
              </p>
              <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Verified Cash on Delivery Buyer
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Complete Footer */}
      <Footer
        onOpenPolicy={p => setActivePolicy(p)}
        onOpenContact={() => setIsContactOpen(true)}
        onNavigateCategory={cat => {
          setSelectedCategory(cat);
          scrollToCatalog();
        }}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href={`https://wa.me/${siteSettings.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
          'Hello SmartZone! I am looking for smartphone recommendations and today\'s offers.'
        )}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-30 p-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-xl shadow-emerald-600/30 flex items-center gap-2 group transition-all hover:scale-105"
        title="Chat with SmartZone Store on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-xs font-bold">
          WhatsApp Store
        </span>
      </a>

      {/* Modals & Dialogs */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onOpenCart={() => setIsCartOpen(true)}
          onSelectRelated={prod => setSelectedProduct(prod)}
        />
      )}

      {isCartOpen && (
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onProceedCheckout={() => setIsCheckoutOpen(true)}
        />
      )}

      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          onOrderSuccess={handleOrderSuccess}
        />
      )}

      {activeTrackingOrder && (
        <OrderTrackingModal
          order={activeTrackingOrder}
          isOpen={!!activeTrackingOrder}
          onClose={() => setActiveTrackingOrder(null)}
        />
      )}

      {isCompareOpen && (
        <CompareModal
          isOpen={isCompareOpen}
          onClose={() => setIsCompareOpen(false)}
          onSelectProduct={p => setSelectedProduct(p)}
        />
      )}

      {isLocationOpen && (
        <LocationSelectorModal
          isOpen={isLocationOpen}
          onClose={() => setIsLocationOpen(false)}
        />
      )}

      {isContactOpen && (
        <ContactAndLocatorModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />
      )}

      {isProfileOpen && (
        <CustomerProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          onTrackOrder={ord => setActiveTrackingOrder(ord)}
          onSelectProduct={p => setSelectedProduct(p)}
        />
      )}

      {isAdminOpen && (
        <AdminPanel
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          onViewOrderDetails={ord => setActiveTrackingOrder(ord)}
        />
      )}

      {activePolicy && (
        <PolicyModal
          policyType={activePolicy}
          onClose={() => setActivePolicy(null)}
        />
      )}

      {/* Mobile Filters Slide-Over Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-right p-5 overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                <span>Filters</span>
              </span>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-700">Max Budget</label>
                <span className="text-xs font-black text-blue-600">
                  ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min={2000}
                max={160000}
                step={5000}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">RAM</label>
              <div className="grid grid-cols-3 gap-1.5">
                {['all', '4GB', '6GB', '8GB', '12GB', '16GB'].map(ram => (
                  <button
                    key={ram}
                    onClick={() => setSelectedRam(ram)}
                    className={`py-1.5 rounded-lg text-xs font-bold ${
                      selectedRam === ram ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {ram === 'all' ? 'All' : ram}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">Storage</label>
              <div className="grid grid-cols-2 gap-1.5">
                {['all', '128GB', '256GB', '512GB', '1TB'].map(st => (
                  <button
                    key={st}
                    onClick={() => setSelectedStorage(st)}
                    className={`py-1.5 rounded-lg text-xs font-bold ${
                      selectedStorage === st ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {st === 'all' ? 'All' : st}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={e => setOnlyInStock(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600"
                />
                <span>In-Stock Only</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <input
                  type="checkbox"
                  checked={only5G}
                  onChange={e => setOnly5G(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600"
                />
                <span>5G Handsets Only</span>
              </label>
            </div>

            <div className="pt-4 flex gap-2">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs"
              >
                Apply Filters
              </button>
              <button
                onClick={clearAllFilters}
                className="px-4 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <StoreFront />
    </StoreProvider>
  );
}
