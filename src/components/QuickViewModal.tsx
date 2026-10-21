import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, ShoppingBag, MessageSquare, ArrowRight, Check } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    isInWishlist,
    toggleWishlist,
    navigateTo,
    getWhatsAppProductInquiryUrl,
  } = useShop();

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  if (!quickViewProduct) return null;

  const activeImage = selectedImage || quickViewProduct.image;
  const inWish = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, selectedColor, selectedSize);
    closeQuickView();
  };

  const handleViewFullPage = () => {
    closeQuickView();
    navigateTo({ type: 'product', productId: quickViewProduct.id });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={closeQuickView} />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-[#FAF8F5] max-w-3xl w-full border border-[#EAE2D8] shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
          {/* Close button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 p-2 text-[#887B6D] hover:text-[#1C1917] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Gallery Left */}
            <div>
              <div className="aspect-[4/3] bg-[#F4EFEB] overflow-hidden border border-[#EAE2D8] mb-3">
                <img
                  src={activeImage}
                  alt={quickViewProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              {quickViewProduct.gallery && quickViewProduct.gallery.length > 1 && (
                <div className="flex gap-2">
                  {quickViewProduct.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-14 h-14 border overflow-hidden ${
                        activeImage === img ? 'border-[#A35836] ring-1 ring-[#A35836]' : 'border-[#EAE2D8]'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Right */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-[#887B6D] mb-1">
                  <span className="uppercase tracking-wider">{quickViewProduct.category}</span>
                  <span className="font-mono">SKU: {quickViewProduct.sku}</span>
                </div>

                <h2 className="font-serif text-2xl font-semibold text-[#1C1917] leading-tight">
                  {quickViewProduct.name}
                </h2>

                <div className="mt-2.5 flex items-baseline gap-3">
                  <span className="text-xl font-bold text-[#1C1917] tabular-nums">
                    Rs. {quickViewProduct.price.toLocaleString()}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-sm text-[#887B6D] line-through tabular-nums">
                      Rs. {quickViewProduct.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {quickViewProduct.inStock ? (
                    <span className="text-xs text-emerald-800 font-medium">In Stock ({quickViewProduct.stockCount} left)</span>
                  ) : (
                    <span className="text-xs text-stone-500 font-medium">Out of Stock</span>
                  )}
                </div>

                <p className="mt-3 text-xs text-[#292524] leading-relaxed line-clamp-3">
                  {quickViewProduct.description}
                </p>

                {/* Color Selector */}
                {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
                  <div className="mt-4">
                    <label className="block text-xs font-medium text-[#292524] mb-1.5">
                      Finish / Color:{' '}
                      <span className="text-[#887B6D]">
                        {selectedColor || quickViewProduct.colors[0]}
                      </span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {quickViewProduct.colors.map((color) => {
                        const isSelected = (selectedColor || quickViewProduct.colors![0]) === color;
                        return (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`px-3 py-1 text-xs border transition-colors ${
                              isSelected
                                ? 'bg-[#1C1917] text-white border-[#1C1917]'
                                : 'bg-white text-[#292524] border-[#EAE2D8] hover:border-[#887B6D]'
                            }`}
                          >
                            {color}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
                  <div className="mt-4">
                    <label className="block text-xs font-medium text-[#292524] mb-1.5">
                      Size:{' '}
                      <span className="text-[#887B6D]">{selectedSize || quickViewProduct.sizes[0]}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {quickViewProduct.sizes.map((sz) => {
                        const isSelected = (selectedSize || quickViewProduct.sizes![0]) === sz;
                        return (
                          <button
                            key={sz}
                            onClick={() => setSelectedSize(sz)}
                            className={`px-3 py-1 text-xs border transition-colors ${
                              isSelected
                                ? 'bg-[#1C1917] text-white border-[#1C1917]'
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

              {/* Actions Area */}
              <div className="mt-6 pt-4 border-t border-[#EAE2D8] space-y-2.5">
                <div className="flex items-center gap-3">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-[#EAE2D8] bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2.5 py-2 text-xs font-bold hover:bg-[#F4EFEB]"
                    >
                      -
                    </button>
                    <span className="px-3 py-2 text-xs font-semibold tabular-nums">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2.5 py-2 text-xs font-bold hover:bg-[#F4EFEB]"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={!quickViewProduct.inStock}
                    className="flex-1 py-2.5 px-4 bg-[#1C1917] hover:bg-[#292524] text-white text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className="p-2.5 border border-[#EAE2D8] hover:border-[#887B6D] transition-colors"
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${inWish ? 'fill-[#A35836] text-[#A35836]' : 'text-[#1C1917]'}`} />
                  </button>
                </div>

                {/* WhatsApp button */}
                <a
                  href={getWhatsAppProductInquiryUrl(quickViewProduct)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-[#2E7D32]/10 hover:bg-[#2E7D32]/20 text-[#2E7D32] border border-[#2E7D32]/30 text-xs font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Inquire on WhatsApp (0312-6687237)</span>
                </a>

                {/* View Full Page link */}
                <button
                  onClick={handleViewFullPage}
                  className="w-full text-center text-xs text-[#887B6D] hover:text-[#1C1917] flex items-center justify-center gap-1 pt-1"
                >
                  <span>View full product specifications & dimensions</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
