import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Shield,
  LayoutDashboard,
  Smartphone,
  Boxes,
  ShoppingBag,
  Tag,
  Settings,
  HelpCircle,
  FileDown,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Trash2,
  Edit,
  Eye,
  ArrowUpRight,
  TrendingUp,
  CreditCard,
  Banknote,
  Truck,
  RotateCcw,
  X,
  Save,
  MessageSquare,
  Users,
  Lock,
  LogOut,
  Mail
} from 'lucide-react';
import { Product, ProductVariant, Order, OrderStatus, PaymentStatus, Coupon, DeliveryArea, ProductCategory } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onViewOrderDetails: (order: Order) => void;
}

export const AdminPanel: React.FC<Props> = ({ isOpen, onClose, onViewOrderDetails }) => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductStatus,
    orders,
    updateOrderStatus,
    updatePaymentStatus,
    inventoryLogs,
    adjustVariantStock,
    coupons,
    addCoupon,
    updateCoupon,
    deliveryAreas,
    addDeliveryArea,
    updateDeliveryArea,
    siteSettings,
    updateSiteSettings,
    supportInquiries,
    updateInquiryStatus,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'products' | 'inventory' | 'orders' | 'coupons' | 'settings' | 'support' | 'reports'
  >('dashboard');

  // Product Add / Edit modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  // Filters for orders
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [orderPaymentFilter, setOrderPaymentFilter] = useState<string>('all');

  // Inventory adjustment modal state
  const [adjustingVariant, setAdjustingVariant] = useState<{
    productId: string;
    variantId: string;
    productTitle: string;
    currentStock: number;
  } | null>(null);
  const [stockDelta, setStockDelta] = useState<number>(0);
  const [stockReason, setStockReason] = useState<string>('Stock received from warehouse');

  // Coupon Add state
  const [isAddCouponOpen, setIsAddCouponOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponDesc, setCouponDesc] = useState('');
  const [couponType, setCouponType] = useState<'percentage' | 'fixed'>('percentage');
  const [couponVal, setCouponVal] = useState<number>(10);
  const [couponMinSpend, setCouponMinSpend] = useState<number>(2000);
  const [couponMaxDisc, setCouponMaxDisc] = useState<number>(2000);

  // Settings form
  const [settingsForm, setSettingsForm] = useState(siteSettings);
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  // Admin Login Form State
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminLoginError, setAdminLoginError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminLoginError(null);
    const res = loginAdmin(adminEmail, adminPassword);
    if (!res.success) {
      setAdminLoginError(res.message);
    } else {
      setAdminEmail('');
      setAdminPassword('');
    }
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
          <div className="p-5 px-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-black text-lg text-white">Admin Portal Login</h2>
                <p className="text-xs text-slate-400">Restricted to Authorized Store Managers</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleAdminLoginSubmit} className="p-6 space-y-4 text-xs">
            {adminLoginError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{adminLoginError}</span>
              </div>
            )}

            <div>
              <label className="block font-bold text-slate-700 mb-1">Admin Email / ID *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={adminEmail}
                  onChange={e => setAdminEmail(e.target.value)}
                  placeholder="admin@smartzone.com"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Admin Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={e => setAdminPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-slate-900 hover:bg-blue-600 text-white font-extrabold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Shield className="w-4 h-4" />
              <span>Sign In to Admin Portal</span>
            </button>

            <div className="pt-3 border-t border-slate-200 space-y-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
                <div>
                  <span className="block font-bold text-slate-800">Store Manager Credentials:</span>
                  <span>ID: <strong>admin@smartzone.com</strong> | Pass: <strong>admin123</strong></span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setAdminEmail('admin@smartzone.com');
                    setAdminPassword('admin123');
                    setAdminLoginError(null);
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shrink-0 cursor-pointer"
                >
                  Auto-Fill
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Calculate Dashboard Metrics
  const totalSales = orders.reduce((sum, o) => o.orderStatus !== 'cancelled' ? sum + o.totalAmount : sum, 0);
  const verifiedOnlinePaid = orders
    .filter(o => o.paymentMethod === 'online' && o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.totalAmount, 0);
  const codTotal = orders
    .filter(o => o.paymentMethod === 'cod' && o.orderStatus !== 'cancelled')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const pendingOrdersCount = orders.filter(o => o.orderStatus === 'pending_confirmation').length;
  const confirmedOrdersCount = orders.filter(o => o.orderStatus === 'confirmed').length;
  const deliveredOrdersCount = orders.filter(o => o.orderStatus === 'delivered').length;

  // Low stock products
  const lowStockVariants: { product: Product; variant: ProductVariant }[] = [];
  products.forEach(p => {
    p.variants.forEach(v => {
      if (v.stock <= 3) {
        lowStockVariants.push({ product: p, variant: v });
      }
    });
  });

  // Filtered Orders
  const filteredOrders = orders.filter(o => {
    const matchQuery =
      orderSearchQuery.trim() === '' ||
      o.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      o.customerPhone.includes(orderSearchQuery);
    const matchStatus = orderStatusFilter === 'all' || o.orderStatus === orderStatusFilter;
    const matchPayment = orderPaymentFilter === 'all' || o.paymentMethod === orderPaymentFilter;
    return matchQuery && matchStatus && matchPayment;
  });

  // Handle Export CSV
  const exportOrdersCSV = () => {
    const headers = 'Order ID,Date,Customer,Phone,Mode,Items,Total Amount,Payment Method,Payment Status,Order Status\n';
    const rows = orders.map(o => {
      const itemsStr = `"${o.items.map(i => `${i.quantity}x ${i.model}`).join('; ')}"`;
      return `${o.id},${o.createdAt},"${o.customerName}",${o.customerPhone},${o.deliveryMode},${itemsStr},${o.totalAmount},${o.paymentMethod},${o.paymentStatus},${o.orderStatus}`;
    }).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SmartZone_Orders_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const exportInventoryCSV = () => {
    const headers = 'Product ID,Brand,Model,Variant RAM,Storage,Color,Price,Stock,SKU\n';
    const rows: string[] = [];
    products.forEach(p => {
      p.variants.forEach(v => {
        rows.push(`${p.id},"${p.brand}","${p.model}",${v.ram},${v.storage},"${v.color}",${v.price},${v.stock},${v.sku}`);
      });
    });
    const blob = new Blob([headers + rows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SmartZone_Inventory_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const handleStockAdjustmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustingVariant) return;
    adjustVariantStock(
      adjustingVariant.productId,
      adjustingVariant.variantId,
      stockDelta,
      stockReason
    );
    setAdjustingVariant(null);
    setStockDelta(0);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const newCoup: Coupon = {
      id: `coup-${Date.now()}`,
      code: couponCode.trim().toUpperCase(),
      description: couponDesc || `${couponVal}${couponType === 'percentage' ? '%' : '₹'} discount`,
      discountType: couponType,
      discountValue: couponVal,
      minOrderValue: couponMinSpend,
      maxDiscount: couponType === 'percentage' ? couponMaxDisc : undefined,
      validUntil: '2026-12-31',
      usageLimit: 200,
      usedCount: 0,
      isActive: true
    };
    addCoupon(newCoup);
    setIsAddCouponOpen(false);
    setCouponCode('');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(settingsForm);
    setSettingsSavedToast(true);
    setTimeout(() => setSettingsSavedToast(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full my-auto overflow-hidden border border-slate-200 relative max-h-[94vh] flex flex-col">
        {/* Admin Header */}
        <div className="p-4 px-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-black text-lg text-white">SmartZone Admin Operations</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                  Live Database
                </span>
              </div>
              <p className="text-xs text-slate-400">Inventory Management, Order Dispatch, Local Delivery &amp; Store Analytics</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={logoutAdmin}
              className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Admin Logout</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-2 pt-3 shrink-0 overflow-x-auto text-xs font-bold">
          {[
            { id: 'dashboard', label: 'Overview Dashboard', icon: LayoutDashboard },
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'products', label: `Products (${products.length})`, icon: Smartphone },
            { id: 'inventory', label: `Inventory & Stock (${lowStockVariants.length} Low)`, icon: Boxes },
            { id: 'coupons', label: `Coupons (${coupons.length})`, icon: Tag },
            { id: 'settings', label: 'Store & Delivery Settings', icon: Settings },
            { id: 'support', label: `Customer Inquiries (${supportInquiries.length})`, icon: MessageSquare },
            { id: 'reports', label: 'Reports & Export', icon: FileDown }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 px-3 flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
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

        {/* Content View */}
        <div className="p-6 overflow-y-auto flex-1 text-xs">
          {/* TAB 1: Dashboard Overview */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Metric KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-1 shadow-md">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Store Sales</span>
                  <p className="text-2xl font-black text-white">₹{totalSales.toLocaleString('en-IN')}</p>
                  <p className="text-[10px] text-slate-400">All completed &amp; active orders</p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">Verified Online Payments</span>
                  <p className="text-2xl font-black text-blue-900">₹{verifiedOnlinePaid.toLocaleString('en-IN')}</p>
                  <p className="text-[10px] text-blue-600">Settled via Gateway</p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Pending Orders</span>
                  <p className="text-2xl font-black text-emerald-900">{pendingOrdersCount}</p>
                  <p className="text-[10px] text-emerald-600">Require dispatch confirmation</p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Low Stock Variants</span>
                  <p className="text-2xl font-black text-amber-900">{lowStockVariants.length}</p>
                  <p className="text-[10px] text-amber-600">Require stock replenishment</p>
                </div>
              </div>

              {/* Order Status Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900">Order Fulfillment Funnel</h4>
                  <div className="space-y-1 text-slate-700">
                    <div className="flex justify-between">
                      <span>Pending Confirmation:</span>
                      <span className="font-bold">{pendingOrdersCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Confirmed &amp; Packing:</span>
                      <span className="font-bold">{confirmedOrdersCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Successfully Delivered:</span>
                      <span className="font-bold text-emerald-600">{deliveredOrdersCount}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900">Payment Breakdown</h4>
                  <div className="space-y-1 text-slate-700">
                    <div className="flex justify-between">
                      <span>Online Paid Revenue:</span>
                      <span className="font-bold">₹{verifiedOnlinePaid.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cash on Delivery Total:</span>
                      <span className="font-bold">₹{codTotal.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900">Store Quick Actions</h4>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="px-3 py-1.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 text-left"
                    >
                      Process Pending Orders →
                    </button>
                    <button
                      onClick={() => setActiveTab('inventory')}
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 text-left"
                    >
                      Update Phone Inventory Stock →
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Orders List */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-sm">Recent Store Orders</h4>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl bg-white overflow-hidden">
                  {orders.slice(0, 5).map(ord => (
                    <div key={ord.id} className="p-3.5 flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{ord.id}</span>
                          <span className="text-slate-400">•</span>
                          <span className="font-medium text-slate-700">{ord.customerName}</span>
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-800">
                            {ord.orderStatus.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {ord.items.map(i => `${i.quantity}x ${i.model}`).join(', ')}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-black text-slate-900">₹{ord.totalAmount.toLocaleString('en-IN')}</span>
                        <button
                          onClick={() => onViewOrderDetails(ord)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-bold text-[11px]"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Orders Management */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {/* Search & Filters */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative flex-1 w-full sm:max-w-xs">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={orderSearchQuery}
                    onChange={e => setOrderSearchQuery(e.target.value)}
                    placeholder="Search Order ID, Name, Phone..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <select
                    value={orderStatusFilter}
                    onChange={e => setOrderStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending_confirmation">Pending Confirmation</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="ready_for_pickup">Ready for Pickup</option>
                    <option value="out_for_delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                  <select
                    value={orderPaymentFilter}
                    onChange={e => setOrderPaymentFilter(e.target.value)}
                    className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                  >
                    <option value="all">All Payments</option>
                    <option value="cod">Cash on Delivery</option>
                    <option value="online">Online Payment</option>
                  </select>
                </div>
              </div>

              {/* Orders Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Customer Details</th>
                      <th className="p-3">Mode</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Payment</th>
                      <th className="p-3">Order Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-6 text-center text-slate-400">
                          No orders found matching filters.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map(ord => (
                        <tr key={ord.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="p-3 font-bold text-slate-900">{ord.id}</td>
                          <td className="p-3 text-slate-500 whitespace-nowrap">
                            {new Date(ord.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </td>
                          <td className="p-3">
                            <span className="font-bold text-slate-900 block">{ord.customerName}</span>
                            <span className="text-[11px] text-slate-500">{ord.customerPhone}</span>
                          </td>
                          <td className="p-3">
                            <span className="font-semibold text-slate-700 capitalize">
                              {ord.deliveryMode.replace(/_/g, ' ')}
                            </span>
                          </td>
                          <td className="p-3 font-black text-slate-900">
                            ₹{ord.totalAmount.toLocaleString('en-IN')}
                          </td>
                          <td className="p-3">
                            <span className="font-bold uppercase text-[10px] block">
                              {ord.paymentMethod}
                            </span>
                            <span className={`text-[10px] font-extrabold ${
                              ord.paymentStatus === 'paid' ? 'text-emerald-600' : 'text-amber-600'
                            }`}>
                              {ord.paymentStatus}
                            </span>
                          </td>
                          <td className="p-3">
                            <select
                              value={ord.orderStatus}
                              onChange={e => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                              className="px-2 py-1 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold"
                            >
                              <option value="pending_confirmation">Pending Confirmation</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="processing">Processing</option>
                              <option value="ready_for_pickup">Ready for Pickup</option>
                              <option value="out_for_delivery">Out for Delivery</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {ord.paymentStatus !== 'paid' && (
                                <button
                                  onClick={() => updatePaymentStatus(ord.id, 'paid')}
                                  title="Mark Payment as Received"
                                  className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold"
                                >
                                  Mark Paid
                                </button>
                              )}
                              <button
                                onClick={() => onViewOrderDetails(ord)}
                                className="px-2 py-1 bg-slate-900 text-white rounded-lg text-[10px] font-bold hover:bg-slate-800"
                              >
                                View
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: Products Management */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-700 text-sm">
                  Total Active Inventory: {products.length} Products
                </span>
                <button
                  onClick={() => setIsAddProductModalOpen(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl bg-white overflow-hidden">
                {products.map(prod => (
                  <div key={prod.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <img src={prod.mainImage} alt={prod.title} className="w-14 h-14 object-contain rounded-xl border border-slate-200 p-1 shrink-0" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                            {prod.brand}
                          </span>
                          <span className="text-[10px] font-bold uppercase text-slate-500">
                            Category: {prod.category}
                          </span>
                        </div>
                        <h4 className="font-extrabold text-sm text-slate-900 mt-0.5">{prod.title}</h4>
                        <p className="text-[11px] text-slate-500">{prod.shortSpecs}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-black text-slate-900">
                            Base: ₹{prod.basePrice.toLocaleString('en-IN')}
                          </span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-600">
                            {prod.variants.length} Variants ({prod.variants.reduce((s, v) => s + v.stock, 0)} Units in Stock)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => toggleProductStatus(prod.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                          prod.enabled
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {prod.enabled ? 'Enabled' : 'Disabled'}
                      </button>

                      <button
                        onClick={() => deleteProduct(prod.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Inventory & Stock Management */}
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">Real-Time Variant Stock Tracker</h3>
                  <p className="text-slate-500 text-[11px]">Adjust stock levels and view automatic inventory deduction audit logs</p>
                </div>
              </div>

              {/* Variant Stock Grid */}
              <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="p-3">Model</th>
                      <th className="p-3">Variant (RAM/Storage)</th>
                      <th className="p-3">Color</th>
                      <th className="p-3">SKU</th>
                      <th className="p-3">Current Stock</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Quick Adjust</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products.flatMap(p =>
                      p.variants.map(v => (
                        <tr key={v.id} className="hover:bg-slate-50/50">
                          <td className="p-3 font-bold text-slate-900">{p.model}</td>
                          <td className="p-3 font-semibold text-slate-700">{v.ram} / {v.storage}</td>
                          <td className="p-3 text-slate-600">{v.color}</td>
                          <td className="p-3 font-mono text-[10px] text-slate-500">{v.sku}</td>
                          <td className="p-3 font-black text-slate-900 text-sm">{v.stock}</td>
                          <td className="p-3">
                            {v.stock <= 0 ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                                Out of Stock
                              </span>
                            ) : v.stock <= 3 ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                                Low Stock
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                Healthy
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => {
                                setAdjustingVariant({
                                  productId: p.id,
                                  variantId: v.id,
                                  productTitle: p.title,
                                  currentStock: v.stock
                                });
                              }}
                              className="px-2.5 py-1 bg-slate-900 hover:bg-blue-600 text-white rounded-lg font-bold text-[11px] transition-colors"
                            >
                              Adjust (+/-)
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Inventory Audit Logs Table */}
              <div className="space-y-2 pt-4">
                <h4 className="font-bold text-slate-900 text-sm">Recent Stock Adjustment Audit Trail</h4>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl bg-white overflow-hidden max-h-48 overflow-y-auto">
                  {inventoryLogs.map(log => (
                    <div key={log.id} className="p-3 flex items-center justify-between text-[11px]">
                      <div>
                        <span className="font-bold text-slate-800">{log.productTitle}</span>
                        <span className="text-slate-500"> ({log.variantDesc})</span>
                        <p className="text-slate-400 mt-0.5">Reason: {log.reason} • By: {log.adminName}</p>
                      </div>
                      <div className="text-right">
                        <span className={`font-black ${log.changeAmount < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                          {log.changeAmount > 0 ? `+${log.changeAmount}` : log.changeAmount} units
                        </span>
                        <span className="text-slate-400 block">Result: {log.resultingStock}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Coupons & Offers */}
          {activeTab === 'coupons' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-700 text-sm">Active Promotional Coupons</span>
                <button
                  onClick={() => setIsAddCouponOpen(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Coupon</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {coupons.map(c => (
                  <div key={c.id} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-black text-base text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                        {c.code}
                      </span>
                      <button
                        onClick={() => updateCoupon({ ...c, isActive: !c.isActive })}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          c.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {c.isActive ? 'Active' : 'Disabled'}
                      </button>
                    </div>
                    <p className="text-slate-700 font-semibold">{c.description}</p>
                    <div className="flex justify-between text-slate-500 text-[11px] pt-1 border-t border-slate-100">
                      <span>Min Order: ₹{c.minOrderValue.toLocaleString('en-IN')}</span>
                      <span>Used: {c.usedCount} times</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: Store & Delivery Settings */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-6 max-w-2xl">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-bold text-sm text-slate-900">Physical Store Details</h4>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Store Name</label>
                  <input
                    type="text"
                    value={settingsForm.storeName}
                    onChange={e => setSettingsForm({ ...settingsForm, storeName: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Physical Address</label>
                  <input
                    type="text"
                    value={settingsForm.address}
                    onChange={e => setSettingsForm({ ...settingsForm, address: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={settingsForm.phone}
                      onChange={e => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">WhatsApp Hotline</label>
                    <input
                      type="text"
                      value={settingsForm.whatsapp}
                      onChange={e => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-bold text-sm text-slate-900">Delivery Rules</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Free Delivery Min Cart Value (₹)</label>
                    <input
                      type="number"
                      value={settingsForm.deliverySettings.freeDeliveryThreshold}
                      onChange={e =>
                        setSettingsForm({
                          ...settingsForm,
                          deliverySettings: {
                            ...settingsForm.deliverySettings,
                            freeDeliveryThreshold: Number(e.target.value)
                          }
                        })
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Standard Delivery Fee (₹)</label>
                    <input
                      type="number"
                      value={settingsForm.deliverySettings.standardFee}
                      onChange={e =>
                        setSettingsForm({
                          ...settingsForm,
                          deliverySettings: {
                            ...settingsForm.deliverySettings,
                            standardFee: Number(e.target.value)
                          }
                        })
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Site Settings</span>
              </button>

              {settingsSavedToast && (
                <p className="text-emerald-600 font-bold">Settings updated across the website successfully!</p>
              )}
            </form>
          )}

          {/* TAB 7: Customer Support Inquiries */}
          {activeTab === 'support' && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-slate-900">Customer Inquiries &amp; Trade-In Requests</h3>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl bg-white overflow-hidden">
                {supportInquiries.map(inq => (
                  <div key={inq.id} className="p-4 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs">{inq.name}</span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-600">{inq.phone}</span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-500">{inq.email}</span>
                      </div>
                      <h5 className="font-bold text-xs text-blue-700">{inq.subject}</h5>
                      <p className="text-slate-700">{inq.message}</p>
                      <span className="text-[10px] text-slate-400 block">
                        Received on {new Date(inq.createdAt).toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        updateInquiryStatus(inq.id, inq.status === 'pending' ? 'resolved' : 'pending')
                      }
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                        inq.status === 'resolved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {inq.status === 'resolved' ? 'Resolved' : 'Pending Callback'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: Reports & CSV Export */}
          {activeTab === 'reports' && (
            <div className="space-y-4 max-w-xl">
              <h3 className="font-bold text-sm text-slate-900">Export Store Data (CSV)</h3>
              <p className="text-slate-500">Download formatted spreadsheets for accounting, inventory audits, and local tax filing.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <button
                  onClick={exportOrdersCSV}
                  className="p-5 rounded-2xl border border-slate-300 hover:border-blue-500 bg-white hover:bg-blue-50/50 transition-all text-left space-y-2 group"
                >
                  <FileDown className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold text-slate-900">Download Orders Export</h4>
                  <p className="text-[11px] text-slate-500">Complete historical records with transaction IDs, amounts, and customer contact</p>
                </button>

                <button
                  onClick={exportInventoryCSV}
                  className="p-5 rounded-2xl border border-slate-300 hover:border-blue-500 bg-white hover:bg-blue-50/50 transition-all text-left space-y-2 group"
                >
                  <FileDown className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold text-slate-900">Download Inventory Export</h4>
                  <p className="text-[11px] text-slate-500">All smartphone &amp; accessory variants, SKUs, and live warehouse stocks</p>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal: Adjust Variant Stock */}
        {adjustingVariant && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-5 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900">Stock Adjustment</h4>
                <button onClick={() => setAdjustingVariant(null)}>
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              <div>
                <p className="font-semibold text-slate-800">{adjustingVariant.productTitle}</p>
                <p className="text-slate-500 text-[11px]">Current Available: {adjustingVariant.currentStock} units</p>
              </div>

              <form onSubmit={handleStockAdjustmentSubmit} className="space-y-3">
                <div>
                  <label className="block font-bold text-slate-600 mb-1">Adjustment Delta (+/-)</label>
                  <input
                    type="number"
                    required
                    value={stockDelta}
                    onChange={e => setStockDelta(Number(e.target.value))}
                    placeholder="+5 or -2"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                  />
                  <span className="text-[10px] text-slate-400">
                    Resulting Stock: {Math.max(0, adjustingVariant.currentStock + stockDelta)}
                  </span>
                </div>

                <div>
                  <label className="block font-bold text-slate-600 mb-1">Audit Reason</label>
                  <input
                    type="text"
                    required
                    value={stockReason}
                    onChange={e => setStockReason(e.target.value)}
                    placeholder="e.g. Warehouse shipment arrived"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl"
                  >
                    Confirm Stock Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdjustingVariant(null)}
                    className="px-4 py-2 bg-slate-200 text-slate-700 font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Create Coupon */}
        {isAddCouponOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-5 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900">Create New Coupon</h4>
                <button onClick={() => setIsAddCouponOpen(false)}>
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleCreateCoupon} className="space-y-3">
                <div>
                  <label className="block font-bold text-slate-600 mb-1">Coupon Code (Uppercase)</label>
                  <input
                    type="text"
                    required
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="e.g. FESTIVE20"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold uppercase"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-600 mb-1">Discount Type</label>
                  <select
                    value={couponType}
                    onChange={e => setCouponType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed INR Amount (₹)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-600 mb-1">Value ({couponType === 'percentage' ? '%' : '₹'})</label>
                    <input
                      type="number"
                      required
                      value={couponVal}
                      onChange={e => setCouponVal(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-600 mb-1">Min Order (₹)</label>
                    <input
                      type="number"
                      required
                      value={couponMinSpend}
                      onChange={e => setCouponMinSpend(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl"
                  >
                    Save Coupon
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddCouponOpen(false)}
                    className="px-4 py-2 bg-slate-200 text-slate-700 font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
