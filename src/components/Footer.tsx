import React from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES_DATA, WHATSAPP_INT_NUMBER } from '../data/products';
import { MessageSquare, Phone, Mail, MapPin, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { ProductCategory } from '../types';

export const Footer: React.FC = () => {
  const { navigateTo } = useShop();

  const handleCategoryClick = (cat: ProductCategory) => {
    navigateTo({ type: 'shop', category: cat });
  };

  return (
    <footer className="bg-[#1C1917] text-[#FAF8F5] pt-14 pb-10 border-t border-[#292524]">
      {/* Trust Highlights Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mb-12 border-b border-[#292524] grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
        <div className="flex items-start gap-4">
          <Truck className="w-6 h-6 text-[#C47D4C] shrink-0 mt-1 mx-auto sm:mx-0" />
          <div>
            <h4 className="text-sm font-semibold tracking-wide text-white">Nationwide Pakistan Delivery</h4>
            <p className="text-xs text-stone-400 mt-1 leading-relaxed">
              Fast, insured courier dispatch via TCS, Trax & Leopards to Karachi, Lahore, Islamabad, and 150+ cities.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-[#C47D4C] shrink-0 mt-1 mx-auto sm:mx-0" />
          <div>
            <h4 className="text-sm font-semibold tracking-wide text-white">Cash on Delivery & Secure Pay</h4>
            <p className="text-xs text-stone-400 mt-1 leading-relaxed">
              Pay upon doorstep inspection or use instant Raast / Bank transfer with zero hidden surcharges.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <RefreshCw className="w-6 h-6 text-[#C47D4C] shrink-0 mt-1 mx-auto sm:mx-0" />
          <div>
            <h4 className="text-sm font-semibold tracking-wide text-white">Fragile-Safe Packaging Guarantee</h4>
            <p className="text-xs text-stone-400 mt-1 leading-relaxed">
              Multi-layer honeycomb and shockproof casing for ceramics, marble, and lamps with 7-day hassle-free claims.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Column 1: Brand & Bio */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tight text-white">DASTOOR</span>
            <span className="text-[10px] tracking-[0.25em] text-[#C47D4C] font-semibold uppercase">
              Home Essentials & Décor · Pakistan
            </span>
          </div>

          <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
            Curating contemporary living spaces rooted in Pakistani heritage. From Multani clay vessels and Chinioti rosewood craft to Gujranwala hand-cast brass lighting and block-printed textiles.
          </p>

          <div className="space-y-2 text-xs text-stone-300 pt-2">
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#C47D4C] shrink-0" />
              <span>0312-6687237 / +92 312 6687237</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
              <a
                href={`https://wa.me/${WHATSAPP_INT_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors"
              >
                WhatsApp Concierge: 03126687237
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#C47D4C] shrink-0" />
              <span>orders@dastoorhome.pk</span>
            </div>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#C47D4C] shrink-0 mt-0.5" />
              <span>Design Studio: MM Alam Road, Gulberg III, Lahore, Pakistan</span>
            </div>
          </div>
        </div>

        {/* Column 2: Quick Shop Categories */}
        <div className="space-y-3">
          <h5 className="text-xs font-semibold uppercase tracking-wider text-white">Collections</h5>
          <ul className="space-y-2 text-xs text-stone-400">
            {CATEGORIES_DATA.slice(0, 6).map((cat) => (
              <li key={cat.name}>
                <button
                  onClick={() => handleCategoryClick(cat.name)}
                  className="hover:text-white transition-colors text-left"
                >
                  {cat.name}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => navigateTo({ type: 'shop' })}
                className="text-[#C47D4C] hover:text-white transition-colors font-medium"
              >
                View All Categories →
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Company & Information */}
        <div className="space-y-3">
          <h5 className="text-xs font-semibold uppercase tracking-wider text-white">Information</h5>
          <ul className="space-y-2 text-xs text-stone-400">
            <li>
              <button
                onClick={() => navigateTo({ type: 'about' })}
                className="hover:text-white transition-colors"
              >
                About Dastoor Home
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo({ type: 'contact' })}
                className="hover:text-white transition-colors"
              >
                Contact & Showrooms
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo({ type: 'faq' })}
                className="hover:text-white transition-colors"
              >
                Frequently Asked Questions
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo({ type: 'wishlist' })}
                className="hover:text-white transition-colors"
              >
                My Saved Wishlist
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo({ type: 'cart' })}
                className="hover:text-white transition-colors"
              >
                Shopping Bag & Checkout
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Policies & Consumer Trust */}
        <div className="space-y-3">
          <h5 className="text-xs font-semibold uppercase tracking-wider text-white">Customer Policies</h5>
          <ul className="space-y-2 text-xs text-stone-400">
            <li>
              <button
                onClick={() => navigateTo({ type: 'policy', policyTab: 'shipping' })}
                className="hover:text-white transition-colors"
              >
                Shipping & Delivery Policy
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo({ type: 'policy', policyTab: 'returns' })}
                className="hover:text-white transition-colors"
              >
                Returns & Damage Claims
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo({ type: 'policy', policyTab: 'privacy' })}
                className="hover:text-white transition-colors"
              >
                Privacy & Data Security
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo({ type: 'policy', policyTab: 'terms' })}
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </button>
            </li>
            <li className="pt-2 text-[11px] text-stone-400">
              Deliveries serviced by TCS, Leopards, Trax & PostEx.
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 mt-10 border-t border-[#292524] flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
        <div>
          © {new Date().getFullYear()} Dastoor Home Essentials & Décor. Handcrafted in Pakistan.
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span>Demonstration Store</span>
          <span>·</span>
          <span>Prices in PKR (Rs.)</span>
          <span>·</span>
          <a
            href={`https://wa.me/${WHATSAPP_INT_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:underline"
          >
            WhatsApp 03126687237
          </a>
        </div>
      </div>
    </footer>
  );
};
