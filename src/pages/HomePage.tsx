import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CATEGORIES_DATA, DEMO_REVIEWS, WHATSAPP_INT_NUMBER } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight, MessageSquare, Shield, Award, Sparkles, Send, Check } from 'lucide-react';
import { ProductCategory } from '../types';

import heroImg from '../assets/images/hero_dastoor_living_room_1792587450721.jpg';
import vasesImg from '../assets/images/category_vases_ceramics_1792587451999.jpg';
import lampImg from '../assets/images/category_brass_lighting_1792587451889.jpg';
import cushionsImg from '../assets/images/category_textiles_cushions_1792587452661.jpg';
import diningImg from '../assets/images/category_tabletop_dining_1792587452988.jpg';
import calligraphyImg from '../assets/images/decor_wall_art_calligraphy_1792588327298.jpg';
import basketImg from '../assets/images/decor_storage_basket_1792588326957.jpg';
import bathTravertineImg from '../assets/images/decor_bathroom_travertine_1792588328080.jpg';
import bedroomTextileImg from '../assets/images/decor_bedroom_textile_1792588327672.jpg';

export const HomePage: React.FC = () => {
  const { navigateTo, addToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival).slice(0, 4);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      addToast('Invalid Email', 'Please enter a valid email address.', 'warning');
      return;
    }
    setNewsletterSubmitted(true);
    addToast('Subscribed!', 'Welcome to Dastoor Circle! Use coupon WELCOME10 for 10% off.', 'success');
    setNewsletterEmail('');
  };

  const handleCategorySelect = (categoryName: ProductCategory) => {
    navigateTo({ type: 'shop', category: categoryName });
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#FAF8F5] pt-6 sm:pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#A35836]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Modern Living · Heritage Craft</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#1C1917] leading-[1.08] text-balance">
                Timeless Craft for the Contemporary Pakistani Home.
              </h1>

              <p className="text-sm sm:text-base text-[#44403C] leading-relaxed max-w-lg mx-auto lg:mx-0">
                Hand-thrown Multani terracotta, brushed solid brass lighting, pure block-printed raw silk, and artisanal Banswara marble — curated for mindful everyday elegance.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <button
                  onClick={() => navigateTo({ type: 'shop' })}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#1C1917] hover:bg-[#292524] text-white text-xs font-medium uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:gap-3"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/${WHATSAPP_INT_NUMBER}?text=Assalam-o-Alaikum%20Dastoor%20Home!%20I%20would%20like%20to%20inquire%20about%20your%20new%20collection.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-[#F4EFEB] text-[#1C1917] border border-[#D8CCC0] text-xs font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-[#2E7D32]" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Trust Micro-Metrics */}
              <div className="pt-4 border-t border-[#EAE2D8] flex items-center justify-center lg:justify-start gap-6 text-xs text-[#78716C]">
                <div>
                  <strong className="font-semibold text-[#1C1917] tabular-nums">150+</strong> Cities Delivered
                </div>
                <div>·</div>
                <div>
                  <strong className="font-semibold text-[#1C1917]">Cash on Delivery</strong>
                </div>
                <div>·</div>
                <div>
                  <strong className="font-semibold text-[#1C1917]">7-Day</strong> Fragile Guarantee
                </div>
              </div>
            </div>

            {/* Right Hero Lifestyle Media */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden shadow-xl border border-[#EAE2D8]">
                <img
                  src={heroImg}
                  alt="Dastoor Home Pakistani Living Room"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#FAF8F5]/90 backdrop-blur-xs p-3 border border-[#EAE2D8] text-xs max-w-sm">
                  <div className="text-[10px] uppercase tracking-wider text-[#A35836] font-semibold">
                    The Living Room Edit
                  </div>
                  <div className="font-serif text-sm font-semibold text-[#1C1917] mt-0.5">
                    Multani Vessels & Chinioti Brass Accents
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED CATEGORIES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-4 border-b border-[#EAE2D8] gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#A35836] font-semibold mb-1">
              Curated Spaces
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1C1917]">
              Explore by Category
            </h2>
          </div>
          <button
            onClick={() => navigateTo({ type: 'shop' })}
            className="text-xs font-semibold text-[#1C1917] hover:text-[#A35836] flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <span>View All 13 Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Category Jump Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none text-xs">
          {CATEGORIES_DATA.map((cat) => (
            <button
              key={cat.name}
              onClick={() => handleCategorySelect(cat.name)}
              className="px-3.5 py-1.5 bg-white hover:bg-[#F4EFEB] border border-[#EAE2D8] text-[#292524] whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>{cat.name}</span>
              <span className="text-[10px] text-[#887B6D]">({cat.itemCount})</span>
            </button>
          ))}
        </div>

        {/* 6 Category Image Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Category 1: Vases & Ceramics */}
          <div
            onClick={() => handleCategorySelect('Vases & Decorative Pots')}
            className="group cursor-pointer bg-white border border-[#EAE2D8] overflow-hidden hover:border-[#D8CCC0] transition-all"
          >
            <div className="aspect-[4/3] overflow-hidden bg-[#F4EFEB]">
              <img
                src={vasesImg}
                alt="Vases & Decorative Pots"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h3 className="font-serif text-lg font-semibold text-[#1C1917] group-hover:text-[#A35836] transition-colors">
                Vases & Ceramics
              </h3>
              <p className="text-xs text-[#78716C] mt-1 line-clamp-1">
                Multani red clay, Hala cobalt glazes & stone planters
              </p>
              <div className="mt-3 text-xs font-medium text-[#A35836] flex items-center gap-1">
                <span>Shop Vases ({CATEGORIES_DATA.find(c => c.name === 'Vases & Decorative Pots')?.itemCount})</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Category 2: Lamps & Lighting */}
          <div
            onClick={() => handleCategorySelect('Lamps & Lighting')}
            className="group cursor-pointer bg-white border border-[#EAE2D8] overflow-hidden hover:border-[#D8CCC0] transition-all"
          >
            <div className="aspect-[4/3] overflow-hidden bg-[#F4EFEB]">
              <img
                src={lampImg}
                alt="Lamps & Lighting"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h3 className="font-serif text-lg font-semibold text-[#1C1917] group-hover:text-[#A35836] transition-colors">
                Lamps & Lighting
              </h3>
              <p className="text-xs text-[#78716C] mt-1 line-clamp-1">
                Brushed brass consoles, woven rattan & fluted ceramic
              </p>
              <div className="mt-3 text-xs font-medium text-[#A35836] flex items-center gap-1">
                <span>Shop Lighting ({CATEGORIES_DATA.find(c => c.name === 'Lamps & Lighting')?.itemCount})</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Category 3: Wall Art & Calligraphy */}
          <div
            onClick={() => handleCategorySelect('Wall Art & Mirrors')}
            className="group cursor-pointer bg-white border border-[#EAE2D8] overflow-hidden hover:border-[#D8CCC0] transition-all"
          >
            <div className="aspect-[4/3] overflow-hidden bg-[#F4EFEB]">
              <img
                src={calligraphyImg}
                alt="Wall Art & Mirrors"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h3 className="font-serif text-lg font-semibold text-[#1C1917] group-hover:text-[#A35836] transition-colors">
                Wall Art & Mirrors
              </h3>
              <p className="text-xs text-[#78716C] mt-1 line-clamp-1">
                Qila arch brass mirrors & wasli paper calligraphy
              </p>
              <div className="mt-3 text-xs font-medium text-[#A35836] flex items-center gap-1">
                <span>Shop Wall Art ({CATEGORIES_DATA.find(c => c.name === 'Wall Art & Mirrors')?.itemCount})</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Category 4: Cushions & Textiles */}
          <div
            onClick={() => handleCategorySelect('Cushions & Throws')}
            className="group cursor-pointer bg-white border border-[#EAE2D8] overflow-hidden hover:border-[#D8CCC0] transition-all"
          >
            <div className="aspect-[4/3] overflow-hidden bg-[#F4EFEB]">
              <img
                src={cushionsImg}
                alt="Cushions & Throws"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h3 className="font-serif text-lg font-semibold text-[#1C1917] group-hover:text-[#A35836] transition-colors">
                Cushions & Textiles
              </h3>
              <p className="text-xs text-[#78716C] mt-1 line-clamp-1">
                Raw silk block prints, Chenab lumbars & pashmina
              </p>
              <div className="mt-3 text-xs font-medium text-[#A35836] flex items-center gap-1">
                <span>Shop Textiles ({CATEGORIES_DATA.find(c => c.name === 'Cushions & Throws')?.itemCount})</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Category 5: Tabletop & Dining */}
          <div
            onClick={() => handleCategorySelect('Table Décor & Centerpieces')}
            className="group cursor-pointer bg-white border border-[#EAE2D8] overflow-hidden hover:border-[#D8CCC0] transition-all"
          >
            <div className="aspect-[4/3] overflow-hidden bg-[#F4EFEB]">
              <img
                src={diningImg}
                alt="Table Décor & Centerpieces"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h3 className="font-serif text-lg font-semibold text-[#1C1917] group-hover:text-[#A35836] transition-colors">
                Tabletop & Dining
              </h3>
              <p className="text-xs text-[#78716C] mt-1 line-clamp-1">
                Banswara marble stands, brass urli bowls & sheesham
              </p>
              <div className="mt-3 text-xs font-medium text-[#A35836] flex items-center gap-1">
                <span>Shop Tabletop ({CATEGORIES_DATA.find(c => c.name === 'Table Décor & Centerpieces')?.itemCount})</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Category 6: Storage & Baskets */}
          <div
            onClick={() => handleCategorySelect('Storage & Baskets')}
            className="group cursor-pointer bg-white border border-[#EAE2D8] overflow-hidden hover:border-[#D8CCC0] transition-all"
          >
            <div className="aspect-[4/3] overflow-hidden bg-[#F4EFEB]">
              <img
                src={basketImg}
                alt="Storage & Baskets"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h3 className="font-serif text-lg font-semibold text-[#1C1917] group-hover:text-[#A35836] transition-colors">
                Storage & Baskets
              </h3>
              <p className="text-xs text-[#78716C] mt-1 line-clamp-1">
                Dera Ghazi Khan riverbed moonj & braided palm organizers
              </p>
              <div className="mt-3 text-xs font-medium text-[#A35836] flex items-center gap-1">
                <span>Shop Baskets ({CATEGORIES_DATA.find(c => c.name === 'Storage & Baskets')?.itemCount})</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BEST SELLERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#EAE2D8] gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#A35836] font-semibold mb-1">
              Customer Favorites
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1C1917]">
              Best Sellers
            </h2>
          </div>
          <button
            onClick={() => navigateTo({ type: 'shop' })}
            className="text-xs font-semibold text-[#1C1917] hover:text-[#A35836] flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <span>View All Best Sellers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. CURATED EDITORIAL BANNER */}
      <section className="bg-[#1C1917] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs uppercase tracking-widest text-[#C47D4C] font-semibold">
                Curated Collection
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-tight">
                The Festive Dastarkhwan & Drawing Room Edit
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-lg">
                Crafting warm, hospitable gatherings for families across Pakistan. Hand-carved marble tiers for dry fruits and sweets, crackling saffron oud candles, and embroidered cushions that embrace guests in effortless refinement.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => navigateTo({ type: 'shop', category: 'Table Décor & Centerpieces' })}
                  className="px-6 py-3 bg-[#C47D4C] hover:bg-[#A35836] text-white text-xs font-medium uppercase tracking-wider transition-colors"
                >
                  Explore Centerpieces
                </button>
                <button
                  onClick={() => navigateTo({ type: 'shop', category: 'Cushions & Throws' })}
                  className="px-6 py-3 bg-transparent hover:bg-stone-800 border border-stone-600 text-white text-xs font-medium uppercase tracking-wider transition-colors"
                >
                  Explore Textiles
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="aspect-[4/3] bg-stone-800 overflow-hidden">
                <img
                  src={diningImg}
                  alt="Marble Centerpiece"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[4/3] bg-stone-800 overflow-hidden">
                <img
                  src={cushionsImg}
                  alt="Raw Silk Cushions"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#EAE2D8] gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#A35836] font-semibold mb-1">
              Fresh Off the Potter's Wheel & Loom
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1C1917]">
              New Arrivals
            </h2>
          </div>
          <button
            onClick={() => navigateTo({ type: 'shop' })}
            className="text-xs font-semibold text-[#1C1917] hover:text-[#A35836] flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. WHY SHOP WITH US */}
      <section className="bg-[#F4EFEB] py-16 border-y border-[#EAE2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs uppercase tracking-widest text-[#A35836] font-semibold mb-2">
              The Dastoor Promise
            </div>
            <h2 className="font-serif text-3xl font-semibold text-[#1C1917]">
              Why Pakistani Homes Trust Dastoor
            </h2>
            <p className="text-xs sm:text-sm text-[#78716C] mt-2">
              Combining ancient indigenous craft with seamless modern customer care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 border border-[#EAE2D8] text-center">
              <Award className="w-7 h-7 text-[#A35836] mx-auto mb-3" />
              <h3 className="font-serif text-base font-semibold text-[#1C1917]">
                Authentic Craftsmanship
              </h3>
              <p className="text-xs text-[#78716C] mt-2 leading-relaxed">
                Directly collaborating with master potters in Multan, woodcarvers in Chiniot, and brass casters in Gujranwala.
              </p>
            </div>

            <div className="bg-white p-6 border border-[#EAE2D8] text-center">
              <Shield className="w-7 h-7 text-[#A35836] mx-auto mb-3" />
              <h3 className="font-serif text-base font-semibold text-[#1C1917]">
                Fragile-Safe Guarantee
              </h3>
              <p className="text-xs text-[#78716C] mt-2 leading-relaxed">
                Ceramics, glass, and mirrors protected with industrial 5-ply honeycomb boxes and bubble cushioning.
              </p>
            </div>

            <div className="bg-white p-6 border border-[#EAE2D8] text-center">
              <MessageSquare className="w-7 h-7 text-[#2E7D32] mx-auto mb-3" />
              <h3 className="font-serif text-base font-semibold text-[#1C1917]">
                Live WhatsApp Ordering
              </h3>
              <p className="text-xs text-[#78716C] mt-2 leading-relaxed">
                Chat directly with our studio at 03126687237 for custom dimensions, live video previews, and order status.
              </p>
            </div>

            <div className="bg-white p-6 border border-[#EAE2D8] text-center">
              <Sparkles className="w-7 h-7 text-[#A35836] mx-auto mb-3" />
              <h3 className="font-serif text-base font-semibold text-[#1C1917]">
                Cash on Delivery
              </h3>
              <p className="text-xs text-[#78716C] mt-2 leading-relaxed">
                Inspect your parcel at your doorstep in Karachi, Lahore, Islamabad, or anywhere across Pakistan before payment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="text-xs uppercase tracking-widest text-[#A35836] font-semibold mb-1">
            Voices of Our Patrons
          </div>
          <h2 className="font-serif text-3xl font-semibold text-[#1C1917]">
            Loved by Homes Across Pakistan
          </h2>
          <p className="text-xs text-[#78716C] mt-1">
            Real feedback from verified purchasers in Lahore, Karachi, and Islamabad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEMO_REVIEWS.map((rev) => (
            <div key={rev.id} className="bg-white p-6 border border-[#EAE2D8] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-[#C47D4C] mb-3">
                  {'★'.repeat(rev.rating)}
                </div>
                <p className="text-xs text-[#292524] italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F4EFEB]">
                <div className="font-semibold text-xs text-[#1C1917]">{rev.author}</div>
                <div className="text-[11px] text-[#78716C]">{rev.city}</div>
                <div className="text-[10px] text-[#A35836] mt-1 font-medium">{rev.productName}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. NEWSLETTER SUBSCRIPTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-6">
        <div className="bg-[#FAF8F5] border border-[#EAE2D8] p-8 sm:p-12 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#A35836] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Dastoor Journal</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1C1917]">
            Receive 10% Off Your First Order
          </h2>
          <p className="text-xs sm:text-sm text-[#78716C] mt-2 max-w-md mx-auto">
            Subscribe for seasonal artisan releases, interior styling notes, and exclusive discount codes directly to your inbox.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="mt-6 max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 bg-white border border-[#EAE2D8] px-4 py-2.5 text-xs text-[#1C1917] placeholder-[#78716C] focus:outline-none focus:border-[#A35836]"
              required
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#1C1917] hover:bg-[#292524] text-white text-xs font-medium uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <span>Subscribe</span>
              <Send className="w-3 h-3" />
            </button>
          </form>

          {newsletterSubmitted && (
            <p className="text-xs text-emerald-800 font-medium mt-3 flex items-center justify-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              Thank you! Use coupon code <strong>WELCOME10</strong> at checkout for 10% off.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};
