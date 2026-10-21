import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, Eye, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateTo, addToCart, isInWishlist, toggleWishlist, openQuickView } = useShop();
  const [imageError, setImageError] = useState(false);
  const inWish = isInWishlist(product.id);

  const handleCardClick = () => {
    navigateTo({ type: 'product', productId: product.id });
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group cursor-pointer flex flex-col bg-white border border-[#EAE2D8] hover:border-[#D8CCC0] transition-all duration-200 hover:-translate-y-0.5"
    >
      {/* Image container: 4:3 or 1:1 aspect ratio with neutral warm backdrop */}
      <div className="relative aspect-[4/3] w-full bg-[#F4EFEB] overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-[#F4EFEB] text-[#887B6D]">
            <span className="font-serif text-lg font-semibold">{product.name}</span>
            <span className="text-xs text-[#887B6D] mt-1">{product.category}</span>
          </div>
        )}

        {/* Quiet single-tag (No pill badges, clean subtle indicator) */}
        <div className="absolute top-2.5 left-2.5">
          {product.isBestSeller ? (
            <span className="bg-[#1C1917]/90 text-white text-[11px] font-medium px-2 py-0.5 tracking-wider uppercase">
              Best Seller
            </span>
          ) : product.isNewArrival ? (
            <span className="bg-[#FAF8F5]/90 text-[#1C1917] border border-[#EAE2D8] text-[11px] font-medium px-2 py-0.5 tracking-wider uppercase">
              New Arrival
            </span>
          ) : !product.inStock ? (
            <span className="bg-stone-200 text-stone-700 text-[11px] font-medium px-2 py-0.5 tracking-wider uppercase">
              Out of Stock
            </span>
          ) : null}
        </div>

        {/* Top Right Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#1C1917] hover:text-[#A35836] shadow-xs transition-colors"
          aria-label={inWish ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${inWish ? 'fill-[#A35836] text-[#A35836]' : 'text-[#1C1917]'}`} />
        </button>

        {/* Hover Quick Actions Bar */}
        <div className="absolute inset-x-2 bottom-2 hidden sm:flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className="flex-1 py-2 px-3 bg-[#1C1917]/95 hover:bg-[#1C1917] text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{product.inStock ? 'Quick Add' : 'Out of Stock'}</span>
          </button>
          <button
            onClick={handleQuickView}
            className="py-2 px-2.5 bg-white/95 hover:bg-white text-[#1C1917] text-xs font-medium flex items-center justify-center transition-colors"
            title="Quick View"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category - clean unboxed metadata */}
          <div className="text-[11px] uppercase tracking-wider text-[#887B6D] mb-1 truncate">
            {product.category}
          </div>

          {/* Product Name */}
          <h3 className="text-sm font-semibold text-[#1C1917] group-hover:text-[#A35836] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Quiet subtitle / origin */}
          {product.origin && (
            <p className="text-xs text-[#887B6D] mt-0.5 line-clamp-1">{product.origin}</p>
          )}
        </div>

        {/* Pricing and mobile add */}
        <div className="mt-3 pt-2.5 border-t border-[#F4EFEB] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold text-[#1C1917] tabular-nums">
              Rs. {product.price.toLocaleString()}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-[#887B6D] line-through tabular-nums">
                Rs. {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Mobile quick add button */}
          <button
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className="sm:hidden p-1.5 text-[#1C1917] hover:text-[#A35836] disabled:opacity-40"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
