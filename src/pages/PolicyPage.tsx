import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Truck, RefreshCw, Shield, FileText, MessageSquare } from 'lucide-react';
import { WHATSAPP_INT_NUMBER } from '../data/products';

interface PolicyPageProps {
  initialTab?: 'shipping' | 'returns' | 'privacy' | 'terms';
}

export const PolicyPage: React.FC<PolicyPageProps> = ({ initialTab = 'shipping' }) => {
  const [activeTab, setActiveTab] = useState<'shipping' | 'returns' | 'privacy' | 'terms'>(initialTab);

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [initialTab]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-[#EAE2D8] pb-6">
        <div className="text-xs uppercase tracking-widest text-[#A35836] font-semibold mb-1">
          Dastoor Home Policies
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917]">
          Customer Policies & Guarantees
        </h1>
        <p className="text-xs sm:text-sm text-[#78716C] mt-1">
          Transparent guidelines protecting your orders, privacy, and satisfaction across Pakistan.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#EAE2D8] gap-2 sm:gap-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('shipping')}
          className={`flex items-center gap-2 pb-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
            activeTab === 'shipping'
              ? 'border-[#1C1917] text-[#1C1917]'
              : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
          }`}
        >
          <Truck className="w-4 h-4 text-[#A35836]" />
          <span>Shipping & Delivery</span>
        </button>

        <button
          onClick={() => setActiveTab('returns')}
          className={`flex items-center gap-2 pb-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
            activeTab === 'returns'
              ? 'border-[#1C1917] text-[#1C1917]'
              : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
          }`}
        >
          <RefreshCw className="w-4 h-4 text-[#A35836]" />
          <span>Returns & Refunds</span>
        </button>

        <button
          onClick={() => setActiveTab('privacy')}
          className={`flex items-center gap-2 pb-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
            activeTab === 'privacy'
              ? 'border-[#1C1917] text-[#1C1917]'
              : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
          }`}
        >
          <Shield className="w-4 h-4 text-[#A35836]" />
          <span>Privacy Policy</span>
        </button>

        <button
          onClick={() => setActiveTab('terms')}
          className={`flex items-center gap-2 pb-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
            activeTab === 'terms'
              ? 'border-[#1C1917] text-[#1C1917]'
              : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
          }`}
        >
          <FileText className="w-4 h-4 text-[#A35836]" />
          <span>Terms & Conditions</span>
        </button>
      </div>

      {/* Content Body */}
      <div className="bg-white border border-[#EAE2D8] p-6 sm:p-10 space-y-6 text-xs sm:text-sm text-[#44403C] leading-relaxed">
        {/* SHIPPING TAB */}
        {activeTab === 'shipping' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-[#1C1917]">
                Shipping and Delivery Policy
              </h2>
              <p className="text-xs text-[#78716C] mt-1">Last revised: October 2026</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-[#1C1917]">1. Courier Partners & Coverage</h3>
              <p>
                Dastoor Home partners with Pakistan’s leading logistics couriers including <strong>TCS Express, Trax Logistics, Leopards Courier, and PostEx</strong>. We ship to over 150+ urban and rural destinations across Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan, and Azad Kashmir.
              </p>

              <h3 className="font-semibold text-sm text-[#1C1917]">2. Delivery Timelines</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Lahore, Karachi & Islamabad / Rawalpindi:</strong> 2 to 3 business days.</li>
                <li><strong>Major Provincial Cities (Faisalabad, Multan, Peshawar, Sialkot, Gujranwala, Hyderabad):</strong> 3 to 4 business days.</li>
                <li><strong>Remote & Interior Districts:</strong> 4 to 6 business days.</li>
              </ul>

              <h3 className="font-semibold text-sm text-[#1C1917]">3. Shipping Rates & Free Shipping</h3>
              <p>
                All orders amounting to <strong>Rs. 4,999 or above receive complimentary Free Shipping</strong>. For orders below this threshold, a standardized nationwide courier and protective packaging fee of <strong>Rs. 250</strong> applies.
              </p>

              <h3 className="font-semibold text-sm text-[#1C1917]">4. Fragile Packaging Guarantee</h3>
              <p>
                Every fragile ceramic urn, terracotta vase, brass lamp fixture, and marble tier is enclosed in heavy-duty 5-ply corrugated cardboard boxes, lined with thick expanded polyethylene foam and multiple shock-absorbing air layers. If your parcel shows physical exterior compromise upon courier handover, please document with photos prior to opening.
              </p>
            </div>
          </div>
        )}

        {/* RETURNS & REFUNDS TAB */}
        {activeTab === 'returns' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-[#1C1917]">
                Returns and Refunds Policy
              </h2>
              <p className="text-xs text-[#78716C] mt-1">Last revised: October 2026</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-[#1C1917]">1. 7-Day Hassle-Free Transit Claim Guarantee</h3>
              <p>
                We inspect every handcrafted item before sealing the package. In the unlikely circumstance that an item arrives broken, defective, or chipped during transit, Dastoor Home guarantees an immediate, no-cost replacement or full reimbursement.
              </p>

              <h3 className="font-semibold text-sm text-[#1C1917]">2. How to File a Claim</h3>
              <ol className="list-decimal pl-5 space-y-1.5">
                <li>Notify our WhatsApp concierge at <strong>0312-6687237</strong> within 7 days of receiving the delivery.</li>
                <li>Provide your Order ID (e.g. <code>#DH-8291</code>) and clear photos or a short video showing the damaged piece and shipping label.</li>
                <li>Our team will arrange a replacement parcel dispatch within 24 to 48 hours without requiring you to return shattered glass/ceramics.</li>
              </ol>

              <h3 className="font-semibold text-sm text-[#1C1917]">3. Change of Mind Exchanges</h3>
              <p>
                If you wish to exchange an item for a different color, size, or category, you may return the unused item in its original box within 7 days. Return courier costs are borne by the customer for change of mind exchanges.
              </p>

              <h3 className="font-semibold text-sm text-[#1C1917]">4. Refund Disbursement</h3>
              <p>
                Approved cash refunds are processed within 2-3 business days via instant <strong>Raast ID transfer, Direct Bank Transfer, or JazzCash / EasyPaisa</strong> wallet credit.
              </p>
            </div>
          </div>
        )}

        {/* PRIVACY POLICY TAB */}
        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-[#1C1917]">
                Privacy & Data Security Policy
              </h2>
              <p className="text-xs text-[#78716C] mt-1">Last revised: October 2026</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-[#1C1917]">1. Information We Collect</h3>
              <p>
                Dastoor Home collects only essential information required to fulfill and deliver your home essentials order: customer name, shipping address, mobile contact number, city, and optional email address.
              </p>

              <h3 className="font-semibold text-sm text-[#1C1917]">2. Zero Card Data Storage</h3>
              <p>
                <strong>We never request, handle, or store credit or debit card numbers on our servers or client local storage.</strong> All payments are settled via Cash on Delivery at your doorstep or via bank/mobile wallet transfers directly handled by your banking app.
              </p>

              <h3 className="font-semibold text-sm text-[#1C1917]">3. Local Storage Usage</h3>
              <p>
                Our website utilizes your browser’s Local Storage strictly to preserve your active shopping bag items and wishlist selections between browsing sessions so you do not lose your curated items when refreshing the page.
              </p>

              <h3 className="font-semibold text-sm text-[#1C1917]">4. No Third-Party Data Selling</h3>
              <p>
                Your phone number and physical address are shared exclusively with our designated courier partners (TCS / Trax / Leopards) solely for dispatch purposes. We will never sell, rent, or lease your private information to telemarketers.
              </p>
            </div>
          </div>
        )}

        {/* TERMS & CONDITIONS TAB */}
        {activeTab === 'terms' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-[#1C1917]">
                Terms and Conditions
              </h2>
              <p className="text-xs text-[#78716C] mt-1">Last revised: October 2026</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-[#1C1917]">1. Acceptance of Terms</h3>
              <p>
                By accessing and placing an order on Dastoor Home Essentials & Décor, you agree to comply with our store policies, ordering procedures, and delivery guidelines.
              </p>

              <h3 className="font-semibold text-sm text-[#1C1917]">2. Artisanal Variance & Handcrafted Nature</h3>
              <p>
                Because our terracotta vases, brass lamps, marble trays, and raw silk cushions are shaped by skilled human artisans rather than high-speed assembly lines, slight natural variations in clay glaze tone, block-print alignment, and marble veining are distinctive marks of genuine handmade authenticity.
              </p>

              <h3 className="font-semibold text-sm text-[#1C1917]">3. Order Verification & Cash on Delivery Protocol</h3>
              <p>
                To prevent fraudulent courier dispatches, our team may contact customers via SMS, phone call, or WhatsApp to verify recipient availability prior to handing over the parcel to the courier company. Orders that cannot be verified within 48 hours may be cancelled.
              </p>

              <h3 className="font-semibold text-sm text-[#1C1917]">4. Pricing and Currency</h3>
              <p>
                All prices on this website are listed and billed in Pakistani Rupees (PKR / Rs.) and include all applicable workshop manufacturing duties.
              </p>
            </div>
          </div>
        )}

        {/* Contact help footnote */}
        <div className="pt-6 border-t border-[#EAE2D8] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FAF8F5] -mx-6 sm:-mx-10 -mb-6 sm:-mb-10 p-6">
          <div className="text-xs text-[#44403C]">
            Have a policy question or need clarification on courier transit?
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_INT_NUMBER}?text=Assalam-o-Alaikum%20Dastoor%20Home!%20I%20have%20a%20question%20regarding%20policies.`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-semibold flex items-center gap-2 transition-colors shrink-0"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp Support (0312-6687237)</span>
          </a>
        </div>
      </div>
    </div>
  );
};
