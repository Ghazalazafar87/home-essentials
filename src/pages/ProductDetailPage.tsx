import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Heart, ShoppingBag, MessageSquare, Truck, ShieldCheck, ArrowLeft, RefreshCw, Sparkles, Check } from 'lucide-react';

interface ProductDetailPageProps {
  productId: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId }) => {
  const {
    navigateTo,
    addToCart,
    isInWishlist,
    toggleWishlist,
    getWhatsAppProductInquiryUrl,
  } = useShop();

  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors && product.colors.length > 0 ? product.colors[0] : ''
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : ''
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'care' | 'shipping'>('specs');

  const inWish = isInWishlist(product.id);
  const relatedProducts = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  // Sync state if product changes
  React.useEffect(() => {
    setActiveImage(product.image);
    setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0] : '');
    setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : '');
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId]);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button & Breadcrumb */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigateTo({ type: 'shop', category: product.category })}
          className="text-xs text-[#78716C] hover:text-[#1C1917] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to {product.category}</span>
        </button>

        <div className="text-[11px] text-[#78716C] hidden sm:block">
          SKU: <span className="font-mono text-[#1C1917]">{product.sku}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* LEFT COLUMN: Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] bg-[#F4EFEB] border border-[#EAE2D8] overflow-hidden">
            <img
              src={activeImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {product.isBestSeller && (
              <span className="absolute top-4 left-4 bg-[#1C1917]/90 text-white text-[11px] font-medium px-2.5 py-1 uppercase tracking-wider">
                Best Seller
              </span>
            )}
          </div>

          {/* Gallery Thumbnails */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 shrink-0 border overflow-hidden ${
                    activeImage === img
                      ? 'border-[#A35836] ring-1 ring-[#A35836]'
                      : 'border-[#EAE2D8] opacity-80 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Contiguous Purchase Module */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#A35836] font-semibold mb-1">
              {product.category}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917] leading-tight">
              {product.name}
            </h1>

            {product.origin && (
              <div className="text-xs text-[#78716C] mt-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C47D4C]" />
                <span>Origin: {product.origin}</span>
              </div>
            )}

            {/* Price block */}
            <div className="mt-4 pt-3 border-t border-[#EAE2D8] flex items-baseline gap-3">
              <span className="text-2xl font-bold text-[#1C1917] tabular-nums">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#78716C] line-through tabular-nums">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
              {product.inStock ? (
                <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                  In Stock ({product.stockCount} units available)
                </span>
              ) : (
                <span className="text-xs text-stone-500 font-semibold bg-stone-100 px-2 py-0.5">
                  Temporarily Sold Out
                </span>
              )}
            </div>

            <p className="mt-4 text-xs sm:text-sm text-[#44403C] leading-relaxed">
              {product.description}
            </p>

            {/* Color selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-2">
                  Finish / Shade: <span className="text-[#1C1917] font-bold">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => {
                    const isSelected = selectedColor === c;
                    return (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        className={`px-3.5 py-1.5 text-xs border transition-colors ${
                          isSelected
                            ? 'bg-[#1C1917] text-white border-[#1C1917] font-medium'
                            : 'bg-white text-[#292524] border-[#EAE2D8] hover:border-[#887B6D]'
                        }`}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-2">
                  Dimensions / Sizing: <span className="text-[#1C1917] font-bold">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => {
                    const isSelected = selectedSize === sz;
                    return (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3.5 py-1.5 text-xs border transition-colors ${
                          isSelected
                            ? 'bg-[#1C1917] text-white border-[#1C1917] font-medium'
                            : 'bg-white text-[#292524] border-[#EAE2D8] hover:border-[#887B6D]'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="mt-8 pt-6 border-t border-[#EAE2D8] space-y-3">
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-[#EAE2D8] bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-3 text-xs font-bold hover:bg-[#F4EFEB] transition-colors"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 py-3 text-xs font-semibold tabular-nums text-[#1C1917]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-3 text-xs font-bold hover:bg-[#F4EFEB] transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to bag button */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 py-3.5 px-6 bg-[#1C1917] hover:bg-[#292524] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{product.inStock ? `Add to Bag · Rs. ${(product.price * quantity).toLocaleString()}` : 'Out of Stock'}</span>
              </button>

              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="p-3.5 border border-[#EAE2D8] hover:border-[#887B6D] transition-colors bg-white"
                aria-label={inWish ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart className={`w-4 h-4 ${inWish ? 'fill-[#A35836] text-[#A35836]' : 'text-[#1C1917]'}`} />
              </button>
            </div>

            {/* Direct WhatsApp Order / Inquiry */}
            <a
              href={getWhatsAppProductInquiryUrl(product)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-[#2E7D32]/10 hover:bg-[#2E7D32]/20 text-[#2E7D32] border border-[#2E7D32]/30 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquire / Order on WhatsApp (0312-6687237)</span>
            </a>

            {/* Trust Highlights */}
            <div className="pt-3 grid grid-cols-2 gap-3 text-[11px] text-[#78716C]">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-[#C47D4C]" />
                <span>Nationwide Pakistan Courier</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C47D4C]" />
                <span>Cash on Delivery Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-[#C47D4C]" />
                <span>7-Day Fragile Claim Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#C47D4C]" />
                <span>Handcrafted Ethical Sourcing</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TABS: Specifications, Dimensions, Care */}
      <div className="mt-14 pt-8 border-t border-[#EAE2D8]">
        <div className="flex border-b border-[#EAE2D8] gap-6 text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 transition-colors ${
              activeTab === 'specs'
                ? 'border-b-2 border-[#1C1917] text-[#1C1917]'
                : 'text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            Material & Dimensions
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`pb-3 transition-colors ${
              activeTab === 'care'
                ? 'border-b-2 border-[#1C1917] text-[#1C1917]'
                : 'text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            Care Instructions
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`pb-3 transition-colors ${
              activeTab === 'shipping'
                ? 'border-b-2 border-[#1C1917] text-[#1C1917]'
                : 'text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            Delivery & COD Policy
          </button>
        </div>

        <div className="py-6 max-w-3xl text-xs sm:text-sm text-[#44403C] leading-relaxed">
          {activeTab === 'specs' && (
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <dt className="text-xs uppercase tracking-wider text-[#78716C] font-semibold">Dimensions</dt>
                <dd className="mt-0.5 text-sm font-medium text-[#1C1917]">{product.dimensions || 'Custom artisanal sizing'}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-[#78716C] font-semibold">Material</dt>
                <dd className="mt-0.5 text-sm font-medium text-[#1C1917]">{product.material || 'Authentic indigenous materials'}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-[#78716C] font-semibold">Artisan Origin</dt>
                <dd className="mt-0.5 text-sm font-medium text-[#1C1917]">{product.origin || 'Pakistan'}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-[#78716C] font-semibold">Packaging</dt>
                <dd className="mt-0.5 text-sm font-medium text-[#1C1917]">5-Ply Heavy duty corrugated box with air cushioning</dd>
              </div>
            </dl>
          )}

          {activeTab === 'care' && (
            <p>
              {product.care ||
                'Gently wipe down with a dry or lightly dampened microfiber cloth. Avoid harsh chemical cleaners or abrasive scouring pads to preserve natural patinas and artisanal glazes.'}
            </p>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-2">
              <p>
                <strong>Delivery Time:</strong> 2-3 business days in Lahore, Islamabad, and Karachi. 3-5 business days for other cities across Punjab, Sindh, KPK, and Balochistan.
              </p>
              <p>
                <strong>Cash on Delivery (COD):</strong> Fully supported across all Pakistani cities serviced by TCS, Trax, and Leopards Couriers.
              </p>
              <p>
                <strong>Fragility Protection:</strong> Every ceramic vessel, lamp, and stone accessory is insured in transit. In the rare event of transit damage, share an unboxing photo to our WhatsApp at <strong>03126687237</strong> within 7 days for an immediate replacement.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 pt-10 border-t border-[#EAE2D8]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl font-semibold text-[#1C1917]">
              Complete Your Space
            </h2>
            <button
              onClick={() => navigateTo({ type: 'shop', category: product.category })}
              className="text-xs font-semibold text-[#A35836] hover:underline"
            >
              View More in {product.category}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
