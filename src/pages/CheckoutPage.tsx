import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PAKISTAN_CITIES, WHATSAPP_INT_NUMBER } from '../data/products';
import { CustomerInfo } from '../types';
import { ArrowLeft, ShieldCheck, Truck, MessageSquare, AlertCircle } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    subtotal,
    discountAmount,
    shippingFee,
    total,
    appliedPromo,
    createOrder,
    navigateTo,
    getWhatsAppOrderUrl,
  } = useShop();

  const [formData, setFormData] = useState<CustomerInfo>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Lahore',
    postalCode: '',
    orderNotes: '',
    paymentMethod: 'cod',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <h2 className="font-serif text-2xl font-semibold text-[#1C1917]">Your bag is empty</h2>
        <p className="text-xs text-[#78716C] mt-2">
          Please add items to your cart before proceeding to checkout.
        </p>
        <button
          onClick={() => navigateTo({ type: 'shop' })}
          className="mt-4 px-6 py-2.5 bg-[#1C1917] text-white text-xs font-semibold uppercase tracking-wider"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!formData.phone.trim()) {
      errs.phone = 'Please enter your mobile phone number';
    } else if (!/^(\+92|0)?3[0-9]{9}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      errs.phone = 'Please enter a valid Pakistani mobile number (e.g. 03001234567)';
    }
    if (!formData.address.trim()) errs.address = 'Please enter your delivery street address';
    if (!formData.city) errs.city = 'Please select your delivery city';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent, viaWhatsApp = false) => {
    e.preventDefault();
    if (!validate()) return;

    const order = createOrder(formData);

    if (viaWhatsApp) {
      const waUrl = getWhatsAppOrderUrl(order);
      window.open(waUrl, '_blank');
    }

    navigateTo({ type: 'order-confirmation', order });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-[#EAE2D8] flex items-center justify-between">
        <button
          onClick={() => navigateTo({ type: 'cart' })}
          className="text-xs text-[#78716C] hover:text-[#1C1917] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Shopping Bag</span>
        </button>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#A35836]">
          Step 2 of 2: Shipping & Payment
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Form */}
        <div className="lg:col-span-7">
          <form onSubmit={(e) => handlePlaceOrder(e, false)} className="space-y-8">
            {/* Contact & Delivery Section */}
            <div className="bg-white border border-[#EAE2D8] p-6 space-y-4">
              <h2 className="font-serif text-xl font-semibold text-[#1C1917] pb-2 border-b border-[#EAE2D8]">
                Delivery Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#292524] mb-1">
                    Full Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ayesha Khan"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full bg-[#FAF8F5] border px-3 py-2 text-xs focus:outline-none focus:border-[#A35836] ${
                      errors.fullName ? 'border-rose-400' : 'border-[#EAE2D8]'
                    }`}
                  />
                  {errors.fullName && <p className="text-[11px] text-rose-600 mt-0.5">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#292524] mb-1">
                    Phone / Mobile <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="03001234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full bg-[#FAF8F5] border px-3 py-2 text-xs focus:outline-none focus:border-[#A35836] ${
                      errors.phone ? 'border-rose-400' : 'border-[#EAE2D8]'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-rose-600 mt-0.5">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#292524] mb-1">
                  Email Address <span className="text-[#78716C] font-normal">(Optional, for receipt)</span>
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#EAE2D8] px-3 py-2 text-xs focus:outline-none focus:border-[#A35836]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#292524] mb-1">
                    Street Address & House / Flat # <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="House 12-B, Sector G, DHA Phase 5..."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className={`w-full bg-[#FAF8F5] border px-3 py-2 text-xs focus:outline-none focus:border-[#A35836] ${
                      errors.address ? 'border-rose-400' : 'border-[#EAE2D8]'
                    }`}
                  />
                  {errors.address && <p className="text-[11px] text-rose-600 mt-0.5">{errors.address}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#292524] mb-1">
                    City <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#EAE2D8] px-3 py-2 text-xs focus:outline-none focus:border-[#A35836]"
                  >
                    {PAKISTAN_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#292524] mb-1">
                  Order Notes / Delivery Instructions <span className="text-[#78716C] font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Call before delivery, handle ceramic parcel with extra care..."
                  value={formData.orderNotes}
                  onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#EAE2D8] px-3 py-2 text-xs focus:outline-none focus:border-[#A35836]"
                />
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-white border border-[#EAE2D8] p-6 space-y-4">
              <h2 className="font-serif text-xl font-semibold text-[#1C1917] pb-2 border-b border-[#EAE2D8]">
                Payment Method
              </h2>

              <div className="space-y-3">
                {/* Cash on Delivery */}
                <label
                  className={`flex items-start gap-3 p-4 border cursor-pointer transition-colors ${
                    formData.paymentMethod === 'cod'
                      ? 'border-[#1C1917] bg-[#FAF8F5]'
                      : 'border-[#EAE2D8] hover:border-[#887B6D]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className="mt-0.5 accent-[#1C1917]"
                  />
                  <div className="text-xs">
                    <div className="font-semibold text-[#1C1917] flex items-center gap-2">
                      <span>Cash on Delivery (COD)</span>
                      <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5 border border-emerald-200">
                        Most Popular in Pakistan
                      </span>
                    </div>
                    <p className="text-[#78716C] mt-1 leading-relaxed">
                      Pay cash directly to the courier rider upon delivery at your doorstep anywhere in Pakistan.
                    </p>
                  </div>
                </label>

                {/* Direct Bank / Raast Transfer */}
                <label
                  className={`flex items-start gap-3 p-4 border cursor-pointer transition-colors ${
                    formData.paymentMethod === 'bank_transfer'
                      ? 'border-[#1C1917] bg-[#FAF8F5]'
                      : 'border-[#EAE2D8] hover:border-[#887B6D]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="bank_transfer"
                    checked={formData.paymentMethod === 'bank_transfer'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'bank_transfer' })}
                    className="mt-0.5 accent-[#1C1917]"
                  />
                  <div className="text-xs">
                    <div className="font-semibold text-[#1C1917]">
                      Direct Bank / Raast Transfer
                    </div>
                    <p className="text-[#78716C] mt-1 leading-relaxed">
                      Instant transfer via Raast ID or Bank Account (Meezan Bank). Transfer details provided immediately after placing order.
                    </p>
                  </div>
                </label>

                {/* EasyPaisa / JazzCash */}
                <label
                  className={`flex items-start gap-3 p-4 border cursor-pointer transition-colors ${
                    formData.paymentMethod === 'easypaisa_jazzcash'
                      ? 'border-[#1C1917] bg-[#FAF8F5]'
                      : 'border-[#EAE2D8] hover:border-[#887B6D]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="easypaisa_jazzcash"
                    checked={formData.paymentMethod === 'easypaisa_jazzcash'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'easypaisa_jazzcash' })}
                    className="mt-0.5 accent-[#1C1917]"
                  />
                  <div className="text-xs">
                    <div className="font-semibold text-[#1C1917]">
                      JazzCash / EasyPaisa Mobile Wallet
                    </div>
                    <p className="text-[#78716C] mt-1 leading-relaxed">
                      Pay through mobile wallet transfer directly to our registered business number (03126687237).
                    </p>
                  </div>
                </label>
              </div>

              {/* Security notice */}
              <div className="p-3 bg-[#F4EFEB] border border-[#EAE2D8] flex items-start gap-2.5 text-xs text-[#78716C]">
                <AlertCircle className="w-4 h-4 text-[#A35836] shrink-0 mt-0.5" />
                <span>
                  <strong>Prototype Security Assurance:</strong> This checkout processes demonstration orders. We do not solicit or store credit card numbers. Your contact details are strictly used to coordinate parcel delivery via TCS/Leopards.
                </span>
              </div>
            </div>

            {/* Submit Action Buttons */}
            <div className="space-y-3">
              <button
                type="submit"
                className="w-full py-4 px-6 bg-[#1C1917] hover:bg-[#292524] text-white text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                <span>Confirm Order · Rs. {total.toLocaleString()}</span>
              </button>

              <button
                type="button"
                onClick={(e) => handlePlaceOrder(e, true)}
                className="w-full py-3.5 px-6 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Place Order & Send Summary via WhatsApp (0312-6687237)</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Summary */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-[#EAE2D8] p-6 space-y-4 sticky top-28">
            <h3 className="font-serif text-lg font-semibold text-[#1C1917] pb-3 border-b border-[#EAE2D8]">
              Your Order ({cart.length} unique items)
            </h3>

            <div className="divide-y divide-[#F4EFEB] max-h-72 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="py-3 flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 object-cover bg-[#F4EFEB] border border-[#EAE2D8] shrink-0"
                  />
                  <div className="flex-1 text-xs">
                    <div className="font-semibold text-[#1C1917] line-clamp-1">{item.name}</div>
                    <div className="text-[#78716C] text-[11px]">Qty: {item.quantity}</div>
                  </div>
                  <div className="text-xs font-bold text-[#1C1917] tabular-nums">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#EAE2D8] space-y-2 text-xs text-[#44403C]">
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
                <span>Delivery (Pakistan)</span>
                <span className="font-semibold tabular-nums">
                  {shippingFee === 0 ? <span className="text-emerald-800">FREE</span> : `Rs. ${shippingFee}`}
                </span>
              </div>

              <div className="pt-3 border-t border-[#EAE2D8] flex justify-between text-base font-bold text-[#1C1917]">
                <span>Total Amount</span>
                <span className="tabular-nums">Rs. {total.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-3 bg-[#FAF8F5] border border-[#EAE2D8] text-[11px] text-[#78716C] space-y-1.5">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-[#C47D4C]" />
                <span>Dispatches from Lahore within 24 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C47D4C]" />
                <span>Verified phone confirmation before dispatch</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
