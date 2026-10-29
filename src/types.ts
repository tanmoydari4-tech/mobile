export type ProductCategory = 
  | 'all'
  | 'flagship'
  | 'mid-range'
  | 'budget'
  | 'gaming'
  | 'camera'
  | '5g'
  | 'accessory';

export interface ProductVariant {
  id: string;
  ram: string; // e.g. "12GB"
  storage: string; // e.g. "256GB"
  color: string; // e.g. "Titanium Black"
  colorHex: string; // e.g. "#1e1e24"
  price: number; // Current selling price in INR
  originalPrice: number; // MRP in INR
  stock: number;
  sku: string;
}

export interface ProductSpecification {
  processor: string;
  displaySize: string;
  displayType: string;
  refreshRate: string;
  rearCamera: string;
  frontCamera: string;
  battery: string;
  chargingSpeed: string;
  network5G: string;
  os: string;
  simType: string;
  connectivity: string;
  inBoxContents: string;
  warranty: string;
}

export interface Product {
  id: string;
  brand: string;
  model: string;
  title: string;
  category: ProductCategory;
  shortSpecs: string; // e.g. "Snapdragon 8 Gen 3 | 200MP Quad Cam | 5000mAh 45W"
  description: string;
  basePrice: number;
  originalPrice: number;
  discountPercent: number;
  mainImage: string;
  images: string[];
  variants: ProductVariant[];
  specifications: ProductSpecification;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isTodayDeal?: boolean;
  isNewArrival?: boolean;
  enabled: boolean;
  createdAt: string;
}

export interface CartItem {
  id: string; // combination of productId and variantId
  productId: string;
  variantId: string;
  quantity: number;
  productTitle: string;
  brand: string;
  model: string;
  image: string;
  ram: string;
  storage: string;
  color: string;
  price: number;
  originalPrice: number;
  stockAvailable: number;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // percentage (e.g. 10) or fixed amount in INR (e.g. 500)
  minOrderValue: number;
  maxDiscount?: number; // max discount cap for percentage
  validUntil: string;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
}

export interface DeliveryArea {
  id: string;
  pincode: string;
  locality: string;
  city: string;
  state: string;
  estimatedHours: string; // e.g. "Same Day (2-4 hrs)" or "Within 24 Hours"
  isLocalDeliveryAvailable: boolean;
  deliveryCharge: number;
}

export type OrderStatus = 
  | 'pending_confirmation'
  | 'confirmed'
  | 'processing'
  | 'ready_for_pickup'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export type PaymentStatus = 
  | 'pending'
  | 'paid'
  | 'failed'
  | 'refunded';

export interface OrderStatusEvent {
  status: OrderStatus;
  timestamp: string;
  note?: string;
}

export interface Order {
  id: string; // e.g. SZ-2026-9281
  createdAt: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryMode: 'local_delivery' | 'store_pickup';
  deliveryAddress?: {
    street: string;
    locality: string;
    pincode: string;
    city: string;
    landmark?: string;
    instructions?: string;
  };
  pickupTimeSlot?: string;
  items: CartItem[];
  subtotal: number;
  discountTotal: number;
  couponCode?: string;
  couponDiscount: number;
  deliveryFee: number;
  totalAmount: number;
  paymentMethod: 'cod' | 'online';
  paymentStatus: PaymentStatus;
  paymentDetails?: {
    transactionId?: string;
    gateway?: string;
    paidAt?: string;
  };
  orderStatus: OrderStatus;
  statusTimeline: OrderStatusEvent[];
  orderNotes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  addresses: SavedAddress[];
  wishlist: string[]; // product IDs
}

export interface SavedAddress {
  id: string;
  name: string;
  phone: string;
  street: string;
  locality: string;
  pincode: string;
  city: string;
  state: string;
  isDefault: boolean;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number; // 1-5
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  createdAt: string;
}

export interface InventoryLog {
  id: string;
  timestamp: string;
  productId: string;
  variantId: string;
  productTitle: string;
  variantDesc: string;
  changeAmount: number;
  resultingStock: number;
  reason: string;
  adminName: string;
}

export interface SiteSettings {
  storeName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  openingHours: string;
  announcementBarMessages: string[];
  heroBanner: {
    headline: string;
    subheadline: string;
    tag: string;
    featuredProductModel: string;
    startingPrice: string;
    imageUrl: string;
  };
  deliverySettings: {
    freeDeliveryThreshold: number;
    standardFee: number;
    storePickupAddress: string;
  };
}

export interface SupportInquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  orderId?: string;
  subject: string;
  message: string;
  status: 'pending' | 'resolved';
  createdAt: string;
}
