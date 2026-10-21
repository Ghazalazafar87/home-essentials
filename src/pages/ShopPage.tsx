import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CATEGORIES_DATA } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ProductCategory, Product } from '../types';
import { Filter, X, SlidersHorizontal, Search, RotateCcw } from 'lucide-react';

interface ShopPageProps {
  initialCategory?: ProductCategory;
  initialSearch?: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({ initialCategory, initialSearch }) => {
  const { navigateTo } = useShop();

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [searchFilter, setSearchFilter] = useState<string>(initialSearch || '');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'newest'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(15000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  // Sync if prop changes
  React.useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  React.useEffect(() => {
    if (initialSearch !== undefined) {
      setSearchFilter(initialSearch);
    }
  }, [initialSearch]);

  // Filtering logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product: Product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      // Price filter
      if (product.price > maxPrice) {
        return false;
      }
      // In stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }
      // Search term
      if (searchFilter.trim()) {
        const query = searchFilter.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchCategory = product.category.toLowerCase().includes(query);
        const matchDesc = product.description.toLowerCase().includes(query);
        const matchOrigin = product.origin?.toLowerCase().includes(query);
        const matchMaterial = product.material?.toLowerCase().includes(query);
        if (!matchName && !matchCategory && !matchDesc && !matchOrigin && !matchMaterial) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return 0; // featured default
    });
  }, [selectedCategory, searchFilter, maxPrice, inStockOnly, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchFilter('');
    setMaxPrice(15000);
    setInStockOnly(false);
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="border-b border-[#EAE2D8] pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-[#A35836] font-semibold mb-1">
            The Catalog
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917]">
            {selectedCategory === 'All' ? 'All Home Essentials' : selectedCategory}
          </h1>
          <p className="text-xs text-[#78716C] mt-1">
            Showing <span className="font-semibold text-[#1C1917] tabular-nums">{filteredProducts.length}</span> handcrafted pieces with nationwide Pakistan delivery.
          </p>
        </div>

        {/* Mobile Filter Button & Desktop Sort */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-[#EAE2D8] text-xs font-medium text-[#1C1917] hover:bg-[#F4EFEB]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#78716C] hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#EAE2D8] px-3 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#A35836]"
            >
              <option value="featured">Featured / Curated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* DESKTOP SIDEBAR FILTERS */}
        <div className="hidden lg:block space-y-6 pr-4 border-r border-[#EAE2D8]">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE2D8]">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1C1917] flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </span>
            {(selectedCategory !== 'All' || searchFilter || maxPrice < 15000 || inStockOnly) && (
              <button
                onClick={handleResetFilters}
                className="text-[11px] text-[#A35836] hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Search box within shop */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-2">
              Search Keywords
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C]" />
              <input
                type="text"
                placeholder="Vases, brass, silk..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full bg-white pl-8 pr-3 py-1.5 text-xs border border-[#EAE2D8] focus:outline-none focus:border-[#A35836]"
              />
              {searchFilter && (
                <button
                  onClick={() => setSearchFilter('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Categories List */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-2.5">
              Categories
            </label>
            <div className="space-y-1 max-h-72 overflow-y-auto">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`w-full text-left px-2.5 py-1.5 text-xs transition-colors rounded ${
                  selectedCategory === 'All'
                    ? 'bg-[#1C1917] text-white font-medium'
                    : 'text-[#292524] hover:bg-[#F4EFEB]'
                }`}
              >
                All Categories ({PRODUCTS.length})
              </button>
              {CATEGORIES_DATA.map((cat) => {
                const count = PRODUCTS.filter((p) => p.category === cat.name).length;
                return (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full text-left px-2.5 py-1.5 text-xs transition-colors flex items-center justify-between rounded ${
                      selectedCategory === cat.name
                        ? 'bg-[#1C1917] text-white font-medium'
                        : 'text-[#292524] hover:bg-[#F4EFEB]'
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className="text-[10px] opacity-70 ml-2">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-2">
              <span>Max Price</span>
              <span className="text-[#1C1917] font-bold tabular-nums">Rs. {maxPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="15000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#A35836] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#78716C] mt-1">
              <span>Rs. 1,000</span>
              <span>Rs. 15,000+</span>
            </div>
          </div>

          {/* In Stock Toggle */}
          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-[#292524]">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 accent-[#A35836] rounded"
              />
              <span>In-Stock Items Only</span>
            </label>
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-[#EAE2D8] p-12 text-center my-6">
              <h3 className="font-serif text-xl font-semibold text-[#1C1917]">No products found</h3>
              <p className="text-xs text-[#78716C] mt-1.5 max-w-sm mx-auto">
                No home items matched your active search or filter criteria. Try resetting the filters or searching for terms like "terracotta", "brass", or "cushion".
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-5 px-6 py-2.5 bg-[#1C1917] text-white text-xs font-medium uppercase tracking-wider hover:bg-[#292524]"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MOBILE FILTERS MODAL */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#FAF8F5] border-l border-[#EAE2D8] p-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE2D8]">
                <h3 className="font-serif text-lg font-semibold text-[#1C1917]">Filters</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 text-[#78716C] hover:text-[#1C1917]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-white border border-[#EAE2D8] p-2 text-xs"
                >
                  <option value="All">All Categories</option>
                  {CATEGORIES_DATA.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-[#78716C] mb-2">
                  <span>Max Price:</span>
                  <span className="text-[#1C1917]">Rs. {maxPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="15000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#A35836]"
                />
              </div>

              {/* In stock */}
              <label className="flex items-center gap-2 text-xs text-[#292524]">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-[#A35836]"
                />
                <span>In-Stock Only</span>
              </label>
            </div>

            <div className="pt-6 border-t border-[#EAE2D8] flex gap-2">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-2.5 border border-[#EAE2D8] text-xs font-medium text-[#1C1917]"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="flex-1 py-2.5 bg-[#1C1917] text-white text-xs font-medium uppercase tracking-wider"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
