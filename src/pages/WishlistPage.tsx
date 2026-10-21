import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, clearWishlist, addToCart, navigateTo } = useShop();

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleMoveAllToBag = () => {
    wishlistProducts.forEach((p) => {
      if (p.inStock) {
        addToCart(p, 1);
      }
    });
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-[#F4EFEB] rounded-full flex items-center justify-center mx-auto mb-6 text-[#78716C]">
          <Heart className="w-10 h-10 opacity-60" />
        </div>
        <h1 className="font-serif text-3xl font-semibold text-[#1C1917]">Your Wishlist is Empty</h1>
        <p className="text-xs sm:text-sm text-[#78716C] mt-2 max-w-md mx-auto">
          Save your favourite Pakistani handcrafted vases, lamps, and decorative centerpieces to review them later.
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
      <div className="border-b border-[#EAE2D8] pb-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-[#1C1917]">Saved Items</h1>
          <p className="text-xs text-[#78716C] mt-0.5">
            You have {wishlistProducts.length} handcrafted essentials in your wishlist.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleMoveAllToBag}
            className="px-4 py-2 bg-[#1C1917] hover:bg-[#292524] text-white text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Move All to Bag</span>
          </button>
          <button
            onClick={clearWishlist}
            className="px-3 py-2 text-xs text-[#78716C] hover:text-[#A35836] transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistProducts.map((product) => (
          <div
            key={product.id}
            className="group bg-white border border-[#EAE2D8] flex flex-col justify-between overflow-hidden"
          >
            <div
              onClick={() => navigateTo({ type: 'product', productId: product.id })}
              className="cursor-pointer"
            >
              <div className="aspect-[4/3] bg-[#F4EFEB] overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-[#A35836] shadow-xs"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4">
                <div className="text-[11px] uppercase tracking-wider text-[#78716C] truncate">
                  {product.category}
                </div>
                <h3 className="text-sm font-semibold text-[#1C1917] mt-0.5 line-clamp-1 group-hover:text-[#A35836]">
                  {product.name}
                </h3>
                <div className="mt-2 text-sm font-bold text-[#1C1917] tabular-nums">
                  Rs. {product.price.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <button
                onClick={() => addToCart(product, 1)}
                disabled={!product.inStock}
                className="w-full py-2.5 bg-[#1C1917] hover:bg-[#292524] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{product.inStock ? 'Move to Bag' : 'Out of Stock'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
