import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck, MessageSquare } from 'lucide-react';
import { FREE_SHIPPING_THRESHOLD, WHATSAPP_INT_NUMBER } from '../data/products';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    closeCart,
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    total,
    shippingFee,
    navigateTo,
  } = useShop();

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleCheckoutClick = () => {
    closeCart();
    navigateTo({ type: 'checkout' });
  };

  const handleViewCartClick = () => {
    closeCart();
    navigateTo({ type: 'cart' });
  };

  const handleWhatsAppInquiry = () => {
    if (cart.length === 0) return;
    const itemsText = cart
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.name} (${item.quantity}x) - Rs. ${(item.price * item.quantity).toLocaleString()}`
      )
      .join('\n');
    const msg = `Assalam-o-Alaikum Dastoor Home!\n\nI have the following items in my cart:\n${itemsText}\n\nEstimated Subtotal: Rs. ${subtotal.toLocaleString()}\nCould you please help me place this order?`;
    window.open(`https://wa.me/${WHATSAPP_INT_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#EAE2D8] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#EAE2D8] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#A35836]" />
              <h2 className="text-base font-semibold text-[#1C1917]">Your Shopping Bag</h2>
              <span className="text-xs text-[#887B6D] tabular-nums">
                ({cart.reduce((sum, i) => sum + i.quantity, 0)} items)
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-[#887B6D] hover:text-[#1C1917] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-[#F4EFEB] px-4 py-3 border-b border-[#EAE2D8]">
            <div className="flex items-center gap-2 text-xs text-[#292524] mb-1.5">
              <Truck className="w-4 h-4 text-[#A35836] shrink-0" />
              {amountNeededForFreeShipping === 0 ? (
                <span>
                  🎉 You have unlocked <strong>Free Delivery</strong> across Pakistan!
                </span>
              ) : (
                <span>
                  Add <strong>Rs. {amountNeededForFreeShipping.toLocaleString()}</strong> more for{' '}
                  <strong>Free Delivery</strong>
                </span>
              )}
            </div>
            <div className="w-full bg-[#EAE2D8] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#A35836] h-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 bg-[#F4EFEB] flex items-center justify-center rounded-full mb-4 text-[#887B6D]">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#1C1917]">Your bag is empty</h3>
                <p className="text-xs text-[#887B6D] mt-1 max-w-xs">
                  Discover our artisanal collection of Pakistani handcrafted vases, lamps, and cushions.
                </p>
                <button
                  onClick={() => {
                    closeCart();
                    navigateTo({ type: 'shop' });
                  }}
                  className="mt-5 px-6 py-2.5 bg-[#1C1917] hover:bg-[#292524] text-white text-xs font-medium tracking-wide uppercase transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 bg-white p-3 border border-[#EAE2D8] transition-colors"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 object-cover bg-[#F4EFEB] shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-[#1C1917] line-clamp-2">{item.name}</h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#887B6D] hover:text-[#A35836] p-0.5 shrink-0"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {(item.selectedColor || item.selectedSize) && (
                        <div className="text-[11px] text-[#887B6D] mt-0.5 flex gap-2">
                          {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                          {item.selectedSize && <span>· Size: {item.selectedSize}</span>}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#F4EFEB]">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#EAE2D8]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-[#F4EFEB] text-[#1C1917] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-semibold tabular-nums text-[#1C1917]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-[#F4EFEB] text-[#1C1917] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price subtotal */}
                      <div className="text-xs font-bold text-[#1C1917] tabular-nums">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Calculations & CTAs */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 bg-white border-t border-[#EAE2D8] space-y-3">
              <div className="space-y-1.5 text-xs text-[#292524]">
                <div className="flex justify-between">
                  <span className="text-[#887B6D]">Subtotal</span>
                  <span className="font-semibold tabular-nums">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#887B6D]">Delivery (Pakistan)</span>
                  <span className="font-semibold tabular-nums">
                    {shippingFee === 0 ? <span className="text-emerald-700">FREE</span> : `Rs. ${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#F4EFEB] text-sm font-bold text-[#1C1917]">
                  <span>Estimated Total</span>
                  <span className="tabular-nums">Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-3 px-4 bg-[#1C1917] hover:bg-[#292524] text-white text-xs font-medium tracking-wider uppercase flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleWhatsAppInquiry}
                  className="w-full py-2.5 px-4 bg-[#F4EFEB] hover:bg-[#EAE2D8] text-[#1C1917] border border-[#D8CCC0] text-xs font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>Order Directly via WhatsApp</span>
                </button>

                <button
                  onClick={handleViewCartClick}
                  className="w-full py-1 text-center text-[11px] text-[#887B6D] hover:text-[#1C1917] underline decoration-[#D8CCC0]"
                >
                  View full cart with coupon discounts
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
