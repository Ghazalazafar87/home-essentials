import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShoppingBag, Truck, Tag, MessageSquare } from 'lucide-react';
import { FREE_SHIPPING_THRESHOLD, WHATSAPP_INT_NUMBER } from '../data/products';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    total,
    appliedPromo,
    applyPromo,
    removePromo,
    navigateTo,
    clearCart,
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const amountNeeded = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput('');
    }
  };

  const handleWhatsAppCartOrder = () => {
    if (cart.length === 0) return;
    const itemsList = cart
      .map(
        (i, idx) =>
          `${idx + 1}. *${i.name}* (${i.quantity}x) - Rs. ${(i.price * i.quantity).toLocaleString()}${
            i.selectedColor ? ` [Color: ${i.selectedColor}]` : ''
          }`
      )
      .join('\n');

    const msg = `Assalam-o-Alaikum Dastoor Home!\n\nI want to place an order for items in my cart:\n\n${itemsList}\n\n*Subtotal:* Rs. ${subtotal.toLocaleString()}${discountAmount > 0 ? `\n*Discount:* -Rs. ${discountAmount.toLocaleString()}` : ''}\n*Shipping:* ${shippingFee === 0 ? 'FREE' : `Rs. ${shippingFee}`}\n*Total:* Rs. ${total.toLocaleString()}\n\nPlease confirm availability and delivery to my address.`;
    window.open(`https://wa.me/${WHATSAPP_INT_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-[#F4EFEB] rounded-full flex items-center justify-center mx-auto mb-6 text-[#78716C]">
          <ShoppingBag className="w-10 h-10 opacity-70" />
        </div>
        <h1 className="font-serif text-3xl font-semibold text-[#1C1917]">Your Shopping Bag is Empty</h1>
        <p className="text-xs sm:text-sm text-[#78716C] mt-2 max-w-md mx-auto">
          Explore our handcrafted Pakistani home essentials — from Multani terracotta vases and brushed brass lighting to embroidered silk cushions.
        </p>
        <button
          onClick={() => navigateTo({ type: 'shop' })}
          className="mt-6 px-8 py-3.5 bg-[#1C1917] hover:bg-[#292524] text-white text-xs font-semibold uppercase tracking-widest transition-colors"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="border-b border-[#EAE2D8] pb-4 mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-[#1C1917]">Shopping Bag</h1>
          <p className="text-xs text-[#78716C] mt-0.5">
            Review your selected Pakistani handcrafted essentials ({cart.reduce((sum, i) => sum + i.quantity, 0)} items)
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-[#78716C] hover:text-[#A35836] transition-colors"
        >
          Clear Bag
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Items Table */}
        <div className="lg:col-span-8 space-y-4">
          {/* Free Shipping Alert */}
          <div className="bg-[#F4EFEB] p-4 border border-[#EAE2D8]">
            <div className="flex items-center gap-2 text-xs text-[#292524] mb-2">
              <Truck className="w-4 h-4 text-[#A35836] shrink-0" />
              {amountNeeded === 0 ? (
                <span>
                  🎉 You qualify for <strong>Free Express Delivery</strong> anywhere in Pakistan!
                </span>
              ) : (
                <span>
                  Add <strong>Rs. {amountNeeded.toLocaleString()}</strong> more to your cart for{' '}
                  <strong>Free Delivery</strong> (Threshold: Rs. {FREE_SHIPPING_THRESHOLD.toLocaleString()})
                </span>
              )}
            </div>
            <div className="w-full bg-[#EAE2D8] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#A35836] h-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items */}
          <div className="divide-y divide-[#EAE2D8] border-y border-[#EAE2D8]">
            {cart.map((item) => (
              <div key={item.id} className="py-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 object-cover bg-[#F4EFEB] shrink-0 border border-[#EAE2D8]"
                />

                <div className="flex-1">
                  <div className="text-[11px] uppercase tracking-wider text-[#78716C]">
                    {item.category}
                  </div>
                  <h3 className="text-sm font-semibold text-[#1C1917] mt-0.5">{item.name}</h3>

                  {(item.selectedColor || item.selectedSize) && (
                    <div className="text-xs text-[#78716C] mt-1 flex gap-2">
                      {item.selectedColor && <span>Finish: {item.selectedColor}</span>}
                      {item.selectedSize && <span>· Size: {item.selectedSize}</span>}
                    </div>
                  )}

                  <div className="text-xs font-semibold text-[#1C1917] mt-2 sm:hidden tabular-nums">
                    Rs. {item.price.toLocaleString()} each
                  </div>
                </div>

                {/* Quantity and subtotal */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  {/* Stepper */}
                  <div className="flex items-center border border-[#EAE2D8] bg-white">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 hover:bg-[#F4EFEB] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 py-1 text-xs font-semibold tabular-nums text-[#1C1917]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 hover:bg-[#F4EFEB] transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-sm font-bold text-[#1C1917] tabular-nums text-right min-w-[90px]">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[#78716C] hover:text-[#A35836] p-1 transition-colors"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigateTo({ type: 'shop' })}
              className="text-xs font-semibold text-[#1C1917] hover:text-[#A35836] flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-[#EAE2D8] p-6 space-y-5 sticky top-28">
            <h2 className="font-serif text-xl font-semibold text-[#1C1917] pb-3 border-b border-[#EAE2D8]">
              Order Summary
            </h2>

            {/* Promo Code Input */}
            <div>
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716C]">
                  Promo Voucher
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C]" />
                    <input
                      type="text"
                      placeholder="e.g. WELCOME10"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#EAE2D8] pl-8 pr-3 py-2 text-xs uppercase tracking-wider text-[#1C1917] focus:outline-none focus:border-[#A35836]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1C1917] hover:bg-[#292524] text-white text-xs font-semibold transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </form>

              {promoError && <p className="text-[11px] text-rose-600 mt-1">{promoError}</p>}

              {appliedPromo && (
                <div className="mt-2 p-2 bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-800">
                  <span>
                    Code <strong>{appliedPromo.code}</strong> applied ({appliedPromo.discountPercent}% off)
                  </span>
                  <button onClick={removePromo} className="text-emerald-700 hover:text-rose-600 font-bold ml-2">
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 pt-3 border-t border-[#EAE2D8] text-xs text-[#44403C]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold tabular-nums text-[#1C1917]">
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-800 font-medium">
                  <span>Discount ({appliedPromo?.code})</span>
                  <span className="tabular-nums">-Rs. {discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Nationwide Shipping</span>
                <span className="font-semibold tabular-nums">
                  {shippingFee === 0 ? <span className="text-emerald-800">FREE</span> : `Rs. ${shippingFee}`}
                </span>
              </div>

              <div className="pt-3 border-t border-[#EAE2D8] flex justify-between text-base font-bold text-[#1C1917]">
                <span>Total Amount</span>
                <span className="tabular-nums">Rs. {total.toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-[#78716C]">
                Includes all applicable courier insurance and packaging.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => navigateTo({ type: 'checkout' })}
                className="w-full py-3.5 px-4 bg-[#1C1917] hover:bg-[#292524] text-white text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsAppCartOrder}
                className="w-full py-3 px-4 bg-[#F4EFEB] hover:bg-[#EAE2D8] text-[#1C1917] border border-[#D8CCC0] text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#2E7D32]" />
                <span>Confirm Order via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
