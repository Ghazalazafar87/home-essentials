export type ProductCategory =
  | 'Home Décor'
  | 'Artificial Flowers & Plants'
  | 'Vases & Decorative Pots'
  | 'Wall Art & Mirrors'
  | 'Table Décor & Centerpieces'
  | 'Lamps & Lighting'
  | 'Cushions & Throws'
  | 'Storage & Baskets'
  | 'Kitchen & Dining'
  | 'Bedroom Accessories'
  | 'Bathroom Essentials'
  | 'Trays & Candles'
  | 'Gifts & Seasonal';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  description: string;
  inStock: boolean;
  stockCount: number;
  sku: string;
  dimensions?: string;
  material?: string;
  origin?: string;
  care?: string;
  colors?: string[];
  sizes?: string[];
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
}

export interface CartItem {
  id: string; // unique item id including variant
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  selectedColor?: string;
  selectedSize?: string;
}

export interface CustomerInfo {
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  postalCode?: string;
  orderNotes?: string;
  paymentMethod: 'cod' | 'bank_transfer' | 'easypaisa_jazzcash';
}

export interface Order {
  orderId: string;
  date: string;
  items: CartItem[];
  customer: CustomerInfo;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: 'Pending Confirmation' | 'Confirmed' | 'Shipped' | 'Delivered';
  promoCode?: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message?: string;
}

export type PageView =
  | { type: 'home' }
  | { type: 'shop'; category?: ProductCategory; search?: string }
  | { type: 'product'; productId: string }
  | { type: 'cart' }
  | { type: 'checkout' }
  | { type: 'order-confirmation'; order: Order }
  | { type: 'wishlist' }
  | { type: 'about' }
  | { type: 'contact' }
  | { type: 'faq' }
  | { type: 'policy'; policyTab: 'shipping' | 'returns' | 'privacy' | 'terms' };
