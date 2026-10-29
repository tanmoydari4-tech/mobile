import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Coupon,
  DeliveryArea,
  Order,
  OrderStatus,
  PaymentStatus,
  User,
  SavedAddress,
  Review,
  InventoryLog,
  SiteSettings,
  SupportInquiry,
  ProductVariant
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_COUPONS,
  INITIAL_DELIVERY_AREAS,
  INITIAL_SITE_SETTINGS,
  INITIAL_USERS,
  INITIAL_REVIEWS,
  INITIAL_ORDERS
} from '../data/initialData';

interface StoreContextType {
  // Products
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  toggleProductStatus: (productId: string) => void;
  getProductById: (id: string) => Product | undefined;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, variant: ProductVariant, quantity?: number) => { success: boolean; message: string };
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;

  // Coupons
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  couponDiscountAmount: number;
  addCoupon: (coupon: Coupon) => void;
  updateCoupon: (coupon: Coupon) => void;

  // Delivery
  deliveryAreas: DeliveryArea[];
  selectedPincode: string;
  setSelectedPincode: (pincode: string) => void;
  checkPincode: (pincode: string) => { serviceable: boolean; area?: DeliveryArea; message: string };
  deliveryMode: 'local_delivery' | 'store_pickup';
  setDeliveryMode: (mode: 'local_delivery' | 'store_pickup') => void;
  calculatedDeliveryFee: number;
  finalOrderTotal: number;
  addDeliveryArea: (area: DeliveryArea) => void;
  updateDeliveryArea: (area: DeliveryArea) => void;

  // Wishlist & Compare
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  compareList: string[];
  addToCompare: (productId: string) => { success: boolean; message: string };
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;

  // Orders
  orders: Order[];
  createOrder: (orderData: Partial<Order>) => { success: boolean; order?: Order; message: string };
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  updatePaymentStatus: (orderId: string, status: PaymentStatus, transactionId?: string) => void;
  cancelOrder: (orderId: string, reason?: string) => { success: boolean; message: string };
  getOrderById: (orderId: string) => Order | undefined;

  // Auth & Profile
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  loginAs: (role: 'customer' | 'admin') => void;
  loginCustomer: (identifier: string, password: string) => { success: boolean; message: string; user?: User };
  registerCustomer: (name: string, email: string, phone: string, password: string) => { success: boolean; message: string; user?: User };
  logoutCustomer: () => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (email: string, password: string) => { success: boolean; message: string };
  logoutAdmin: () => void;
  registerUser: (name: string, email: string, phone: string) => User;
  addSavedAddress: (address: Omit<SavedAddress, 'id'>) => void;
  deleteSavedAddress: (addressId: string) => void;
  updateUserProfile: (data: Partial<User>) => void;

  // Reviews
  reviews: Review[];
  addReview: (productId: string, rating: number, title: string, comment: string) => void;
  getProductReviews: (productId: string) => Review[];

  // Inventory & Audits
  inventoryLogs: InventoryLog[];
  adjustVariantStock: (productId: string, variantId: string, delta: number, reason: string) => void;

  // Site Settings
  siteSettings: SiteSettings;
  updateSiteSettings: (settings: SiteSettings) => void;

  // Support
  supportInquiries: SupportInquiry[];
  submitSupportInquiry: (data: Omit<SupportInquiry, 'id' | 'status' | 'createdAt'>) => void;
  updateInquiryStatus: (id: string, status: 'pending' | 'resolved') => void;

  // System
  resetAllData: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_PREFIX = 'smartzone_store_';

function getStoredItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error(`Error loading ${key} from storage:`, e);
    return defaultValue;
  }
}

function setStoredItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
}

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products
  const [products, setProducts] = useState<Product[]>(() =>
    getStoredItem<Product[]>('products', INITIAL_PRODUCTS)
  );

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() =>
    getStoredItem<CartItem[]>('cart', [])
  );

  // Coupons
  const [coupons, setCoupons] = useState<Coupon[]>(() =>
    getStoredItem<Coupon[]>('coupons', INITIAL_COUPONS)
  );
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() =>
    getStoredItem<Coupon | null>('applied_coupon', null)
  );

  // Delivery
  const [deliveryAreas, setDeliveryAreas] = useState<DeliveryArea[]>(() =>
    getStoredItem<DeliveryArea[]>('delivery_areas', INITIAL_DELIVERY_AREAS)
  );
  const [selectedPincode, setSelectedPincode] = useState<string>(() =>
    getStoredItem<string>('selected_pincode', '700064')
  );
  const [deliveryMode, setDeliveryMode] = useState<'local_delivery' | 'store_pickup'>('local_delivery');

  // Wishlist & Compare
  const [wishlist, setWishlist] = useState<string[]>(() =>
    getStoredItem<string[]>('wishlist', ['prod-samsung-s24-ultra', 'prod-acc-tws-pro-anc'])
  );
  const [compareList, setCompareList] = useState<string[]>(() =>
    getStoredItem<string[]>('compare_list', [])
  );

  // Orders
  const [orders, setOrders] = useState<Order[]>(() =>
    getStoredItem<Order[]>('orders', INITIAL_ORDERS)
  );

  // Users & Auth
  const [users, setUsers] = useState<User[]>(() =>
    getStoredItem<User[]>('users_list', INITIAL_USERS)
  );
  const [currentUser, setCurrentUser] = useState<User | null>(() =>
    getStoredItem<User | null>('auth_customer_user', null)
  );
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() =>
    getStoredItem<boolean>('auth_admin_session', false)
  );

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() =>
    getStoredItem<Review[]>('reviews', INITIAL_REVIEWS)
  );

  // Inventory logs
  const [inventoryLogs, setInventoryLogs] = useState<InventoryLog[]>(() =>
    getStoredItem<InventoryLog[]>('inventory_logs', [
      {
        id: 'log-1',
        timestamp: '2026-02-24T12:35:00.000Z',
        productId: 'prod-redmi-note-13-pro-plus',
        variantId: 'var-rn13p-8-256-purple',
        productTitle: 'Redmi Note 13 Pro+ 5G',
        variantDesc: '8GB / 256GB / Fusion Purple',
        changeAmount: -1,
        resultingStock: 12,
        reason: 'Order SZ-2026-8921 placed',
        adminName: 'System Automatic'
      }
    ])
  );

  // Site Settings
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() =>
    getStoredItem<SiteSettings>('site_settings', INITIAL_SITE_SETTINGS)
  );

  // Support inquiries
  const [supportInquiries, setSupportInquiries] = useState<SupportInquiry[]>(() =>
    getStoredItem<SupportInquiry[]>('support_inquiries', [
      {
        id: 'inq-1',
        name: 'Amit Patel',
        phone: '+91 98311 22334',
        email: 'amit.patel@example.com',
        subject: 'Exchange offer inquiry for iPhone 16 Pro',
        message: 'Do you offer instant evaluation for iPhone 13 128GB trade-in at your Salt Lake store counter?',
        status: 'pending',
        createdAt: '2026-02-26T09:15:00.000Z'
      }
    ])
  );

  // Persist state updates
  useEffect(() => { setStoredItem('products', products); }, [products]);
  useEffect(() => { setStoredItem('cart', cart); }, [cart]);
  useEffect(() => { setStoredItem('coupons', coupons); }, [coupons]);
  useEffect(() => { setStoredItem('applied_coupon', appliedCoupon); }, [appliedCoupon]);
  useEffect(() => { setStoredItem('delivery_areas', deliveryAreas); }, [deliveryAreas]);
  useEffect(() => { setStoredItem('selected_pincode', selectedPincode); }, [selectedPincode]);
  useEffect(() => { setStoredItem('wishlist', wishlist); }, [wishlist]);
  useEffect(() => { setStoredItem('compare_list', compareList); }, [compareList]);
  useEffect(() => { setStoredItem('orders', orders); }, [orders]);
  useEffect(() => { setStoredItem('users_list', users); }, [users]);
  useEffect(() => { setStoredItem('auth_customer_user', currentUser); }, [currentUser]);
  useEffect(() => { setStoredItem('auth_admin_session', isAdminAuthenticated); }, [isAdminAuthenticated]);
  useEffect(() => { setStoredItem('reviews', reviews); }, [reviews]);
  useEffect(() => { setStoredItem('inventory_logs', inventoryLogs); }, [inventoryLogs]);
  useEffect(() => { setStoredItem('site_settings', siteSettings); }, [siteSettings]);
  useEffect(() => { setStoredItem('support_inquiries', supportInquiries); }, [supportInquiries]);

  // Product actions
  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const toggleProductStatus = (productId: string) => {
    setProducts(prev =>
      prev.map(p => (p.id === productId ? { ...p, enabled: !p.enabled } : p))
    );
  };

  const getProductById = (id: string) => {
    return products.find(p => p.id === id);
  };

  // Cart actions
  const addToCart = (product: Product, variant: ProductVariant, quantity = 1) => {
    if (variant.stock <= 0) {
      return { success: false, message: 'This variant is currently out of stock.' };
    }

    const cartItemId = `${product.id}_${variant.id}`;
    const existing = cart.find(item => item.id === cartItemId);
    const currentQty = existing ? existing.quantity : 0;
    const requestedTotal = currentQty + quantity;

    if (requestedTotal > variant.stock) {
      return {
        success: false,
        message: `Only ${variant.stock} units available in stock. Cannot add more.`
      };
    }

    if (existing) {
      setCart(prev =>
        prev.map(item =>
          item.id === cartItemId ? { ...item, quantity: requestedTotal } : item
        )
      );
    } else {
      const newItem: CartItem = {
        id: cartItemId,
        productId: product.id,
        variantId: variant.id,
        quantity,
        productTitle: product.title,
        brand: product.brand,
        model: product.model,
        image: product.mainImage,
        ram: variant.ram,
        storage: variant.storage,
        color: variant.color,
        price: variant.price,
        originalPrice: variant.originalPrice,
        stockAvailable: variant.stock
      };
      setCart(prev => [...prev, newItem]);
    }

    return { success: true, message: `Added "${product.title} (${variant.storage})" to cart!` };
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCart(prev =>
      prev.map(item => {
        if (item.id === cartItemId) {
          if (quantity > item.stockAvailable) {
            return { ...item, quantity: item.stockAvailable };
          }
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const cartDiscount = cart.reduce(
    (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
    0
  );

  // Delivery check
  const checkPincode = (pincode: string) => {
    const area = deliveryAreas.find(a => a.pincode === pincode.trim());
    if (area && area.isLocalDeliveryAvailable) {
      return {
        serviceable: true,
        area,
        message: `Express Local Delivery available for ${area.locality}, ${area.city}! (${area.estimatedHours})`
      };
    }
    return {
      serviceable: false,
      message: `Local delivery is currently not serviceable to PIN ${pincode}. Store pickup is available at our Salt Lake showroom.`
    };
  };

  // Coupons
  const applyCoupon = (code: string) => {
    const cleaned = code.trim().toUpperCase();
    const found = coupons.find(c => c.code.toUpperCase() === cleaned && c.isActive);

    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code.' };
    }

    if (cartSubtotal < found.minOrderValue) {
      return {
        success: false,
        message: `Minimum order value of ₹${found.minOrderValue.toLocaleString('en-IN')} required for ${found.code}.`
      };
    }

    setAppliedCoupon(found);
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons(prev => [coupon, ...prev]);
  };

  const updateCoupon = (coupon: Coupon) => {
    setCoupons(prev => prev.map(c => (c.id === coupon.id ? coupon : c)));
  };

  // Calculate coupon discount
  let couponDiscountAmount = 0;
  if (appliedCoupon && cartSubtotal >= appliedCoupon.minOrderValue) {
    if (appliedCoupon.discountType === 'percentage') {
      const calculated = Math.round((cartSubtotal * appliedCoupon.discountValue) / 100);
      couponDiscountAmount = appliedCoupon.maxDiscount
        ? Math.min(calculated, appliedCoupon.maxDiscount)
        : calculated;
    } else {
      couponDiscountAmount = appliedCoupon.discountValue;
    }
  }

  // Calculate delivery fee
  const areaMatch = deliveryAreas.find(a => a.pincode === selectedPincode);
  let calculatedDeliveryFee = 0;
  if (cart.length > 0) {
    if (deliveryMode === 'store_pickup') {
      calculatedDeliveryFee = 0;
    } else if (cartSubtotal >= siteSettings.deliverySettings.freeDeliveryThreshold) {
      calculatedDeliveryFee = 0;
    } else {
      calculatedDeliveryFee = areaMatch ? areaMatch.deliveryCharge : siteSettings.deliverySettings.standardFee;
    }
  }

  const finalOrderTotal = Math.max(0, cartSubtotal - couponDiscountAmount + calculatedDeliveryFee);

  const addDeliveryArea = (area: DeliveryArea) => {
    setDeliveryAreas(prev => [area, ...prev]);
  };

  const updateDeliveryArea = (area: DeliveryArea) => {
    setDeliveryAreas(prev => prev.map(a => (a.id === area.id ? area : a)));
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter(id => id !== productId) : [...prev, productId];
      if (currentUser) {
        setCurrentUser({ ...currentUser, wishlist: next });
      }
      return next;
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Compare
  const addToCompare = (productId: string) => {
    if (compareList.includes(productId)) {
      return { success: false, message: 'Phone already added to comparison.' };
    }
    if (compareList.length >= 4) {
      return { success: false, message: 'You can compare a maximum of 4 phones side-by-side.' };
    }
    setCompareList(prev => [...prev, productId]);
    return { success: true, message: 'Added to comparison list!' };
  };

  const removeFromCompare = (productId: string) => {
    setCompareList(prev => prev.filter(id => id !== productId));
  };

  const clearCompare = () => setCompareList([]);

  const isInCompare = (productId: string) => compareList.includes(productId);

  // Inventory adjustment helper
  const adjustVariantStock = (
    productId: string,
    variantId: string,
    delta: number,
    reason: string
  ) => {
    let resulting = 0;
    let prodTitle = '';
    let variantDesc = '';

    setProducts(prev =>
      prev.map(prod => {
        if (prod.id !== productId) return prod;
        prodTitle = prod.title;
        const updatedVariants = prod.variants.map(v => {
          if (v.id !== variantId) return v;
          const newStock = Math.max(0, v.stock + delta);
          resulting = newStock;
          variantDesc = `${v.ram} / ${v.storage} / ${v.color}`;
          return { ...v, stock: newStock };
        });
        const total = updatedVariants.reduce((sum, v) => sum + v.stock, 0);
        return {
          ...prod,
          variants: updatedVariants,
          basePrice: updatedVariants[0]?.price ?? prod.basePrice
        };
      })
    );

    // Record audit log
    const log: InventoryLog = {
      id: `inv-${Date.now()}`,
      timestamp: new Date().toISOString(),
      productId,
      variantId,
      productTitle: prodTitle || 'Product',
      variantDesc: variantDesc || 'Variant',
      changeAmount: delta,
      resultingStock: resulting,
      reason,
      adminName: currentUser?.name || 'Administrator'
    };
    setInventoryLogs(prev => [log, ...prev]);
  };

  // Orders
  const createOrder = (orderData: Partial<Order>) => {
    if (cart.length === 0) {
      return { success: false, message: 'Cart is empty. Cannot place order.' };
    }

    // Verify stock availability
    for (const item of cart) {
      const prod = products.find(p => p.id === item.productId);
      const variant = prod?.variants.find(v => v.id === item.variantId);
      if (!variant || variant.stock < item.quantity) {
        return {
          success: false,
          message: `Stock changed! Variant for ${item.productTitle} is no longer available in the requested quantity.`
        };
      }
    }

    // Deduct stock for all items
    cart.forEach(item => {
      adjustVariantStock(
        item.productId,
        item.variantId,
        -item.quantity,
        `Order placement reservation`
      );
    });

    const newOrderId = `SZ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();

    const newOrder: Order = {
      id: newOrderId,
      createdAt: now,
      customerId: currentUser?.id || `usr-guest-${Date.now()}`,
      customerName: orderData.customerName || currentUser?.name || 'SmartZone Customer',
      customerPhone: orderData.customerPhone || currentUser?.phone || '+91 99999 99999',
      customerEmail: orderData.customerEmail || currentUser?.email,
      deliveryMode: orderData.deliveryMode || deliveryMode,
      deliveryAddress: orderData.deliveryAddress,
      pickupTimeSlot: orderData.pickupTimeSlot,
      items: [...cart],
      subtotal: cartSubtotal,
      discountTotal: cartDiscount,
      couponCode: appliedCoupon?.code,
      couponDiscount: couponDiscountAmount,
      deliveryFee: calculatedDeliveryFee,
      totalAmount: finalOrderTotal,
      paymentMethod: orderData.paymentMethod || 'cod',
      paymentStatus: orderData.paymentStatus || (orderData.paymentMethod === 'online' ? 'paid' : 'pending'),
      paymentDetails: orderData.paymentDetails,
      orderStatus: 'pending_confirmation',
      statusTimeline: [
        {
          status: 'pending_confirmation',
          timestamp: now,
          note: orderData.paymentMethod === 'online'
            ? 'Order placed with online payment verification'
            : 'Order placed via Cash on Delivery'
        }
      ],
      orderNotes: orderData.orderNotes
    };

    setOrders(prev => [newOrder, ...prev]);

    // If coupon was used, increment usedCount
    if (appliedCoupon) {
      setCoupons(prev =>
        prev.map(c =>
          c.id === appliedCoupon.id ? { ...c, usedCount: c.usedCount + 1 } : c
        )
      );
    }

    clearCart();
    return { success: true, order: newOrder, message: 'Order created successfully!' };
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, note?: string) => {
    setOrders(prev =>
      prev.map(order => {
        if (order.id !== orderId) return order;

        // If transitioning to cancelled from active, restore stock
        if (status === 'cancelled' && order.orderStatus !== 'cancelled') {
          order.items.forEach(item => {
            adjustVariantStock(
              item.productId,
              item.variantId,
              item.quantity,
              `Stock restored: Order ${order.id} cancelled`
            );
          });
        }

        const newTimeline = [
          ...order.statusTimeline,
          {
            status,
            timestamp: new Date().toISOString(),
            note: note || `Order updated to ${status.replace(/_/g, ' ')}`
          }
        ];

        return {
          ...order,
          orderStatus: status,
          statusTimeline: newTimeline
        };
      })
    );
  };

  const updatePaymentStatus = (orderId: string, status: PaymentStatus, transactionId?: string) => {
    setOrders(prev =>
      prev.map(order => {
        if (order.id !== orderId) return order;
        return {
          ...order,
          paymentStatus: status,
          paymentDetails: transactionId
            ? { ...order.paymentDetails, transactionId, paidAt: new Date().toISOString() }
            : order.paymentDetails
        };
      })
    );
  };

  const cancelOrder = (orderId: string, reason?: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return { success: false, message: 'Order not found.' };

    if (['out_for_delivery', 'delivered'].includes(order.orderStatus)) {
      return {
        success: false,
        message: 'Order is already out for delivery or delivered. Cannot cancel directly. Please contact store support.'
      };
    }

    updateOrderStatus(orderId, 'cancelled', reason || 'Cancelled by customer');
    return { success: true, message: `Order ${orderId} has been successfully cancelled.` };
  };

  const getOrderById = (orderId: string) => {
    return orders.find(o => o.id === orderId);
  };

  // Auth & Profile
  const loginAs = (role: 'customer' | 'admin') => {
    if (role === 'admin') {
      setIsAdminAuthenticated(true);
    } else {
      setCurrentUser(INITIAL_USERS[0]);
    }
  };

  const loginCustomer = (identifier: string, password: string) => {
    const cleanId = identifier.trim().toLowerCase();
    const digitsOnly = identifier.replace(/\D/g, '');
    const found = users.find(u => {
      if (u.role !== 'customer') return false;
      const emailMatch = u.email.toLowerCase() === cleanId;
      const phoneDigits = u.phone.replace(/\D/g, '');
      const phoneMatch = digitsOnly.length >= 10 && phoneDigits.endsWith(digitsOnly.slice(-10));
      return emailMatch || phoneMatch;
    });

    if (!found) {
      return { success: false, message: 'No customer account found with that email or mobile number. Please Sign Up first.' };
    }

    if ((found.password || '123456') !== password) {
      return { success: false, message: 'Incorrect password. Please try again.' };
    }

    setCurrentUser(found);
    if (found.wishlist && found.wishlist.length > 0) {
      setWishlist(found.wishlist);
    }
    return { success: true, message: `Welcome back, ${found.name}!`, user: found };
  };

  const registerCustomer = (name: string, email: string, phone: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const existing = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return { success: false, message: 'An account with this email already exists. Please Sign In instead.' };
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      phone: phone.trim(),
      password,
      role: 'customer',
      addresses: [],
      wishlist: [...wishlist]
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true, message: `Account created! Welcome, ${newUser.name}!`, user: newUser };
  };

  const logoutCustomer = () => {
    setCurrentUser(null);
  };

  const loginAdmin = (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const isValidAdminId =
      cleanEmail === 'admin@smartzone.com' ||
      cleanEmail === 'admin' ||
      cleanEmail === 'tanmoydari4@gmail.com' ||
      cleanEmail === 'tanmoy';

    if (isValidAdminId && password.trim() === 'Tanmoy') {
      setIsAdminAuthenticated(true);
      return { success: true, message: 'Admin login successful!' };
    }
    return {
      success: false,
      message: 'Invalid Admin ID or Password. Please try again.'
    };
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
  };

  const registerUser = (name: string, email: string, phone: string) => {
    const res = registerCustomer(name, email, phone, '123456');
    return res.user || INITIAL_USERS[0];
  };

  const addSavedAddress = (addressData: Omit<SavedAddress, 'id'>) => {
    if (!currentUser) return;
    const newAddress: SavedAddress = {
      ...addressData,
      id: `addr-${Date.now()}`
    };
    const updated = {
      ...currentUser,
      addresses: [...currentUser.addresses, newAddress]
    };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => (u.id === updated.id ? updated : u)));
  };

  const deleteSavedAddress = (addressId: string) => {
    if (!currentUser) return;
    const updated = {
      ...currentUser,
      addresses: currentUser.addresses.filter(a => a.id !== addressId)
    };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => (u.id === updated.id ? updated : u)));
  };

  const updateUserProfile = (data: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => (u.id === updated.id ? updated : u)));
  };

  // Reviews
  const addReview = (productId: string, rating: number, title: string, comment: string) => {
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      productId,
      userId: currentUser?.id || `usr-${Date.now()}`,
      userName: currentUser?.name || 'Verified Customer',
      rating,
      title,
      comment,
      verifiedPurchase: true,
      createdAt: new Date().toISOString()
    };
    setReviews(prev => [newRev, ...prev]);

    // Recalculate product rating
    const prodReviews = [...reviews.filter(r => r.productId === productId), newRev];
    const avg = prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length;
    setProducts(prev =>
      prev.map(p =>
        p.id === productId
          ? { ...p, rating: parseFloat(avg.toFixed(1)), reviewCount: prodReviews.length }
          : p
      )
    );
  };

  const getProductReviews = (productId: string) => {
    return reviews.filter(r => r.productId === productId);
  };

  // Site Settings
  const updateSiteSettings = (settings: SiteSettings) => {
    setSiteSettings(settings);
  };

  // Support
  const submitSupportInquiry = (data: Omit<SupportInquiry, 'id' | 'status' | 'createdAt'>) => {
    const newInquiry: SupportInquiry = {
      ...data,
      id: `inq-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setSupportInquiries(prev => [newInquiry, ...prev]);
  };

  const updateInquiryStatus = (id: string, status: 'pending' | 'resolved') => {
    setSupportInquiries(prev =>
      prev.map(inq => (inq.id === id ? { ...inq, status } : inq))
    );
  };

  // Reset
  const resetAllData = () => {
    localStorage.clear();
    setProducts(INITIAL_PRODUCTS);
    setCart([]);
    setCoupons(INITIAL_COUPONS);
    setAppliedCoupon(null);
    setDeliveryAreas(INITIAL_DELIVERY_AREAS);
    setSelectedPincode('700064');
    setDeliveryMode('local_delivery');
    setWishlist(['prod-samsung-s24-ultra']);
    setCompareList([]);
    setOrders(INITIAL_ORDERS);
    setCurrentUser(INITIAL_USERS[0]);
    setReviews(INITIAL_REVIEWS);
    setSiteSettings(INITIAL_SITE_SETTINGS);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductStatus,
        getProductById,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        cartDiscount,
        coupons,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        couponDiscountAmount,
        addCoupon,
        updateCoupon,
        deliveryAreas,
        selectedPincode,
        setSelectedPincode,
        checkPincode,
        deliveryMode,
        setDeliveryMode,
        calculatedDeliveryFee,
        finalOrderTotal,
        addDeliveryArea,
        updateDeliveryArea,
        wishlist,
        toggleWishlist,
        isInWishlist,
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        orders,
        createOrder,
        updateOrderStatus,
        updatePaymentStatus,
        cancelOrder,
        getOrderById,
        currentUser,
        setCurrentUser,
        loginAs,
        loginCustomer,
        registerCustomer,
        logoutCustomer,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        registerUser,
        addSavedAddress,
        deleteSavedAddress,
        updateUserProfile,
        reviews,
        addReview,
        getProductReviews,
        inventoryLogs,
        adjustVariantStock,
        siteSettings,
        updateSiteSettings,
        supportInquiries,
        submitSupportInquiry,
        updateInquiryStatus,
        resetAllData
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
