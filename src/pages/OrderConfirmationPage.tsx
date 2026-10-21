import React from 'react';
import { useShop } from '../context/ShopContext';
import { Order } from '../types';
import { CheckCircle2, MessageSquare, ArrowRight, Truck, Phone, Copy, Check } from 'lucide-react';
import { WHATSAPP_INT_NUMBER } from '../data/products';

interface OrderConfirmationPageProps {
  order: Order;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ order }) => {
  const { navigateTo, getWhatsAppOrderUrl, addToast } = useShop();
  const [copied, setCopied] = React.useState(false);

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopied(true);
    addToast('Copied', `Order ID #${order.orderId} copied to clipboard.`, 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  const waUrl = getWhatsAppOrderUrl(order);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-white border border-[#EAE2D8] p-6 sm:p-10 shadow-sm space-y-8">
        {/* Success Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="text-xs font-semibold uppercase tracking-widest text-[#A35836]">
            Order Received
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917]">
            Shukriya, {order.customer.fullName}!
          </h1>
          <p className="text-xs sm:text-sm text-[#78716C] max-w-md mx-auto">
            Your home essentials order has been placed with Dastoor Home. Our team in Lahore will verify your contact details before parcel dispatch.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAF8F5] border border-[#EAE2D8] rounded-xs text-xs font-mono">
            <span className="text-[#78716C]">Order Reference:</span>
            <strong className="text-[#1C1917] font-bold">#{order.orderId}</strong>
            <button
              onClick={handleCopyOrderId}
              className="p-1 text-[#78716C] hover:text-[#1C1917] transition-colors"
              title="Copy Order ID"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* WhatsApp Immediate Sync Box */}
        <div className="bg-[#2E7D32]/10 border border-[#2E7D32]/30 p-5 rounded-xs space-y-3">
          <div className="flex items-start gap-3">
            <MessageSquare className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-[#1C1917]">
                Send Order Receipt Directly via WhatsApp
              </h3>
              <p className="text-xs text-[#44403C] mt-1 leading-relaxed">
                Click below to send your item breakdown, delivery address, and order ID to our verified WhatsApp representative at <strong>0312-6687237</strong> for priority confirmation.
              </p>
            </div>
          </div>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Open WhatsApp with Order #{order.orderId}</span>
          </a>
        </div>

        {/* Itemized Order Details */}
        <div className="space-y-4 pt-4 border-t border-[#EAE2D8]">
          <h2 className="font-serif text-lg font-semibold text-[#1C1917]">
            Ordered Items
          </h2>

          <div className="divide-y divide-[#F4EFEB]">
            {order.items.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 object-cover bg-[#F4EFEB] border border-[#EAE2D8]"
                  />
                  <div>
                    <div className="font-semibold text-[#1C1917]">{item.name}</div>
                    <div className="text-[11px] text-[#78716C]">
                      Qty: {item.quantity} {item.selectedColor ? `· Finish: ${item.selectedColor}` : ''}
                    </div>
                  </div>
                </div>
                <div className="font-semibold text-[#1C1917] tabular-nums">
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing breakdown */}
          <div className="pt-3 border-t border-[#EAE2D8] space-y-1.5 text-xs text-[#44403C]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold tabular-nums text-[#1C1917]">Rs. {order.subtotal.toLocaleString()}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-800">
                <span>Discount ({order.promoCode || 'Promo'})</span>
                <span className="tabular-nums font-semibold">-Rs. {order.discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Nationwide Shipping</span>
              <span className="font-semibold tabular-nums">
                {order.shipping === 0 ? <span className="text-emerald-800">FREE</span> : `Rs. ${order.shipping.toLocaleString()}`}
              </span>
            </div>
            <div className="pt-2 border-t border-[#EAE2D8] flex justify-between text-base font-bold text-[#1C1917]">
              <span>Total Payable</span>
              <span className="tabular-nums">Rs. {order.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Customer & Shipping Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#EAE2D8] text-xs">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#78716C] font-semibold mb-1">
              Delivery Address
            </div>
            <div className="font-medium text-[#1C1917]">{order.customer.fullName}</div>
            <div className="text-[#44403C] mt-0.5">{order.customer.address}</div>
            <div className="text-[#44403C] font-semibold">{order.customer.city}, Pakistan</div>
            <div className="text-[#78716C] mt-1">Phone: {order.customer.phone}</div>
          </div>

          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#78716C] font-semibold mb-1">
              Payment & Status
            </div>
            <div className="font-medium text-[#1C1917]">
              {order.customer.paymentMethod === 'cod'
                ? 'Cash on Delivery (Doorstep)'
                : order.customer.paymentMethod === 'bank_transfer'
                ? 'Direct Bank / Raast Transfer'
                : 'Mobile Wallet (JazzCash / EasyPaisa)'}
            </div>
            <div className="text-amber-800 font-semibold mt-1">
              Status: {order.status}
            </div>
            <div className="text-[#78716C] text-[11px] mt-1">
              Estimated Delivery: 2-4 Business Days
            </div>
          </div>
        </div>

        {/* Back to Shop */}
        <div className="pt-6 border-t border-[#EAE2D8] flex justify-center">
          <button
            onClick={() => navigateTo({ type: 'shop' })}
            className="px-8 py-3 bg-[#1C1917] hover:bg-[#292524] text-white text-xs font-semibold uppercase tracking-widest flex items-center gap-2 transition-colors"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
