import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Order, CustomerInfo, ToastMessage, PageView, ProductCategory } from '../types';
import { PRODUCTS, WHATSAPP_INT_NUMBER, FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE } from '../data/products';

interface ShopContextType {
  // Navigation & Page State
  currentPage: PageView;
  navigateTo: (page: PageView) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  total: number;
  cartCount: number;

  // Promo Code
  appliedPromo: { code: string; discountPercent: number } | null;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;

  // Quick View
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // Search query & helper
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  executeSearch: (q: string) => void;

  // Orders
  lastOrder: Order | null;
  createOrder: (customer: CustomerInfo) => Order;

  // Toast Notifications
  toasts: ToastMessage[];
  addToast: (title: string, message?: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;

  // WhatsApp Helpers
  getWhatsAppOrderUrl: (order: Order) => string;
  getWhatsAppProductInquiryUrl: (product: Product) => string;
  getWhatsAppDirectChatUrl: (customMsg?: string) => string;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'dastoor_cart_v2';
const WISHLIST_STORAGE_KEY = 'dastoor_wishlist_v2';

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Safe SSR/Client storage read
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currentPage, setCurrentPage] = useState<PageView>({ type: 'home' });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  // Toast system
  const addToast = (title: string, message?: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation
  const navigateTo = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Search
  const executeSearch = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setSearchQuery(trimmed);
    navigateTo({ type: 'shop', search: trimmed });
  };

  // Cart actions
  const addToCart = (product: Product, quantity = 1, color?: string, size?: string) => {
    const chosenColor = color || (product.colors && product.colors[0]) || '';
    const chosenSize = size || (product.sizes && product.sizes[0]) || '';
    const cartItemId = `${product.id}-${chosenColor}-${chosenSize}`.replace(/\s+/g, '-').toLowerCase();

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
          category: product.category,
          selectedColor: chosenColor,
          selectedSize: chosenSize,
        },
      ];
    });

    addToast('Added to Cart', `${quantity}x ${product.name} added to your shopping bag.`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    const item = cart.find((i) => i.id === cartItemId);
    setCart((prev) => prev.filter((i) => i.id !== cartItemId));
    if (item) {
      addToast('Removed from Cart', `${item.name} was removed.`, 'info');
    }
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Quick view
  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  // Wishlist actions
  const toggleWishlist = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    const prodName = product ? product.name : 'Item';

    if (wishlist.includes(productId)) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      addToast('Removed from Wishlist', `${prodName} removed from saved items.`, 'info');
    } else {
      setWishlist((prev) => [...prev, productId]);
      addToast('Saved to Wishlist', `${prodName} added to your wishlist.`, 'success');
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);
  const clearWishlist = () => setWishlist([]);

  // Promos
  const applyPromo = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'WELCOME10') {
      setAppliedPromo({ code: cleanCode, discountPercent: 10 });
      addToast('Promo Code Applied', '10% Welcome discount applied successfully!', 'success');
      return { success: true, message: '10% discount applied!' };
    }
    if (cleanCode === 'DASTOOR15') {
      setAppliedPromo({ code: cleanCode, discountPercent: 15 });
      addToast('Promo Code Applied', '15% Seasonal discount applied successfully!', 'success');
      return { success: true, message: '15% discount applied!' };
    }
    addToast('Invalid Code', 'Please enter a valid coupon code (Try: WELCOME10)', 'warning');
    return { success: false, message: 'Invalid promo code. Try WELCOME10' };
  };

  const removePromo = () => {
    setAppliedPromo(null);
    addToast('Promo Removed', 'Discount coupon removed from your cart.', 'info');
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = appliedPromo ? Math.round((subtotal * appliedPromo.discountPercent) / 100) : 0;
  const shippingFee = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Orders
  const createOrder = (customer: CustomerInfo): Order => {
    const orderNumber = Math.floor(1000 + Math.random() * 9000);
    const orderId = `DH-${orderNumber}`;
    const newOrder: Order = {
      orderId,
      date: new Date().toLocaleDateString('en-PK', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      items: [...cart],
      customer,
      subtotal,
      discount: discountAmount,
      shipping: shippingFee,
      total,
      status: 'Pending Confirmation',
      promoCode: appliedPromo?.code,
    };

    setLastOrder(newOrder);
    clearCart();
    setAppliedPromo(null);
    return newOrder;
  };

  // WhatsApp Helpers
  const getWhatsAppDirectChatUrl = (customMsg?: string) => {
    const text =
      customMsg ||
      'Assalam-o-Alaikum Dastoor Home! I would like to inquire about your handcrafted home essentials collection.';
    return `https://wa.me/${WHATSAPP_INT_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const getWhatsAppProductInquiryUrl = (product: Product) => {
    const text = `Assalam-o-Alaikum Dastoor Home!\n\nI am interested in this product:\n*${product.name}* (SKU: ${product.sku})\nPrice: Rs. ${product.price.toLocaleString()}\nCategory: ${product.category}\n\nCould you please let me know about current availability and delivery timeline?`;
    return `https://wa.me/${WHATSAPP_INT_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const getWhatsAppOrderUrl = (order: Order) => {
    const itemsList = order.items
      .map(
        (item, index) =>
          `${index + 1}. *${item.name}* (x${item.quantity}) - Rs. ${(item.price * item.quantity).toLocaleString()}${
            item.selectedColor ? ` [Color: ${item.selectedColor}]` : ''
          }`
      )
      .join('\n');

    const message = `*NEW ORDER INQUIRY - DASTOOR HOME*\n----------------------------------------\n*Order ID:* #${order.orderId}\n*Date:* ${order.date}\n\n*CUSTOMER DETAILS:*\n*Name:* ${order.customer.fullName}\n*Phone:* ${order.customer.phone}\n*City:* ${order.customer.city}\n*Address:* ${order.customer.address}${order.customer.email ? `\n*Email:* ${order.customer.email}` : ''}${order.customer.orderNotes ? `\n*Notes:* ${order.customer.orderNotes}` : ''}\n\n*ORDER ITEMS:*\n${itemsList}\n\n----------------------------------------\n*Subtotal:* Rs. ${order.subtotal.toLocaleString()}${order.discount > 0 ? `\n*Discount (${order.promoCode || 'Promo'}):* -Rs. ${order.discount.toLocaleString()}` : ''}\n*Delivery Fee:* ${order.shipping === 0 ? 'FREE' : `Rs. ${order.shipping.toLocaleString()}`}\n*TOTAL PAYABLE:* *Rs. ${order.total.toLocaleString()}*\n*Payment Method:* ${
      order.customer.paymentMethod === 'cod'
        ? 'Cash on Delivery (COD)'
        : order.customer.paymentMethod === 'bank_transfer'
        ? 'Direct Bank / Raast Transfer'
        : 'EasyPaisa / JazzCash'
    }\n----------------------------------------\nPlease confirm availability and dispatch schedule. Thank you!`;

    return `https://wa.me/${WHATSAPP_INT_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <ShopContext.Provider
      value={{
        currentPage,
        navigateTo,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        subtotal,
        discountAmount,
        shippingFee,
        total,
        cartCount,
        appliedPromo,
        applyPromo,
        removePromo,
        wishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        searchQuery,
        setSearchQuery,
        executeSearch,
        lastOrder,
        createOrder,
        toasts,
        addToast,
        removeToast,
        getWhatsAppOrderUrl,
        getWhatsAppProductInquiryUrl,
        getWhatsAppDirectChatUrl,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
