import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES_DATA, WHATSAPP_INT_NUMBER } from '../data/products';
import { Search, Heart, ShoppingBag, Menu, X, MessageSquare, ChevronDown } from 'lucide-react';
import { ProductCategory } from '../types';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    cartCount,
    wishlist,
    openCart,
    searchQuery,
    setSearchQuery,
    executeSearch,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      executeSearch(searchInput);
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const handleCategoryClick = (cat: ProductCategory) => {
    navigateTo({ type: 'shop', category: cat });
    setCategoriesDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE2D8]">
        {/* Top Bar 3-Zone Contract */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-[#1C1917] hover:text-[#A35836] transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigateTo({ type: 'home' })}
              className="text-left group flex flex-col justify-center"
            >
              <span className="font-serif text-2xl sm:text-3xl tracking-tight text-[#1C1917] font-semibold group-hover:text-[#A35836] transition-colors whitespace-nowrap">
                DASTOOR
              </span>
              <span className="text-[9px] tracking-[0.28em] text-[#887B6D] font-medium uppercase -mt-1">
                Home Essentials · Pakistan
              </span>
            </button>
          </div>

          {/* Zone 2: 4-5 Clean Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#292524]">
            <button
              onClick={() => navigateTo({ type: 'home' })}
              className={`hover:text-[#A35836] transition-colors whitespace-nowrap shrink-0 py-1 ${
                currentPage.type === 'home' ? 'text-[#A35836] font-semibold border-b border-[#A35836]' : ''
              }`}
            >
              Home
            </button>

            <button
              onClick={() => navigateTo({ type: 'shop' })}
              className={`hover:text-[#A35836] transition-colors whitespace-nowrap shrink-0 py-1 ${
                currentPage.type === 'shop' && !('category' in currentPage && currentPage.category)
                  ? 'text-[#A35836] font-semibold border-b border-[#A35836]'
                  : ''
              }`}
            >
              Shop All
            </button>

            {/* Categories dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCategoriesDropdownOpen(true)}
              onMouseLeave={() => setCategoriesDropdownOpen(false)}
            >
              <button
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                className={`flex items-center gap-1 hover:text-[#A35836] transition-colors whitespace-nowrap shrink-0 py-1 ${
                  currentPage.type === 'shop' && 'category' in currentPage && currentPage.category
                    ? 'text-[#A35836] font-semibold border-b border-[#A35836]'
                    : ''
                }`}
              >
                <span>Categories</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {categoriesDropdownOpen && (
                <div className="absolute top-full left-0 w-72 bg-white border border-[#EAE2D8] shadow-lg py-3 px-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#887B6D] border-b border-[#F4EFEB] mb-2">
                    Browse Curated Collections
                  </div>
                  <div className="max-h-80 overflow-y-auto space-y-0.5">
                    {CATEGORIES_DATA.map((cat) => (
                      <button
                        key={cat.name}
                        onClick={() => handleCategoryClick(cat.name)}
                        className="w-full text-left px-3 py-2 text-xs text-[#292524] hover:bg-[#FAF8F5] hover:text-[#A35836] rounded transition-colors flex items-center justify-between"
                      >
                        <span className="truncate">{cat.name}</span>
                        <span className="text-[10px] text-[#887B6D]">{cat.itemCount}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => navigateTo({ type: 'about' })}
              className={`hover:text-[#A35836] transition-colors whitespace-nowrap shrink-0 py-1 ${
                currentPage.type === 'about' ? 'text-[#A35836] font-semibold border-b border-[#A35836]' : ''
              }`}
            >
              About Us
            </button>

            <button
              onClick={() => navigateTo({ type: 'contact' })}
              className={`hover:text-[#A35836] transition-colors whitespace-nowrap shrink-0 py-1 ${
                currentPage.type === 'contact' ? 'text-[#A35836] font-semibold border-b border-[#A35836]' : ''
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Interactive Affordances & Actions */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#292524] hover:text-[#A35836] transition-colors"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => navigateTo({ type: 'wishlist' })}
              className="p-2 text-[#292524] hover:text-[#A35836] transition-colors relative"
              aria-label="View wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#A35836] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={openCart}
              className="flex items-center gap-2 px-3.5 py-2 bg-[#1C1917] hover:bg-[#292524] text-white text-xs font-medium transition-colors"
              aria-label="Open shopping cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#EAE2D8]" />
              <span className="hidden sm:inline">Bag</span>
              <span className="bg-[#FAF8F5] text-[#1C1917] font-bold text-[11px] px-1.5 py-0.2 rounded-sm tabular-nums">
                {cartCount}
              </span>
            </button>

            {/* WhatsApp Quick Link */}
            <a
              href={`https://wa.me/${WHATSAPP_INT_NUMBER}?text=Assalam-o-Alaikum%20Dastoor%20Home!%20I%20have%20an%20order%20inquiry.`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-xs text-[#2E7D32] hover:text-[#1B5E20] font-medium px-2 py-1"
              title="Chat with Dastoor Home on WhatsApp"
            >
              <MessageSquare className="w-4 h-4 text-[#2E7D32]" />
              <span className="hidden lg:inline">0312-6687237</span>
            </a>
          </div>
        </div>

        {/* Expandable Search Input Row */}
        {searchOpen && (
          <div className="bg-[#F4EFEB] border-t border-[#EAE2D8] px-4 py-3 animate-in fade-in duration-200">
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#887B6D]" />
                <input
                  type="text"
                  placeholder="Search vases, brass lamps, raw silk cushions, marble trays..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full bg-white pl-10 pr-4 py-2 text-sm text-[#1C1917] placeholder-[#887B6D] border border-[#EAE2D8] focus:outline-none focus:border-[#A35836]"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#1C1917] text-white text-xs font-medium hover:bg-[#292524] transition-colors"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-2 text-[#887B6D] hover:text-[#1C1917]"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-[#FAF8F5] border-r border-[#EAE2D8] p-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#EAE2D8]">
                <div>
                  <span className="font-serif text-2xl font-bold tracking-tight text-[#1C1917]">DASTOOR</span>
                  <div className="text-[10px] tracking-widest text-[#887B6D] uppercase font-medium">Home Essentials</div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#887B6D] hover:text-[#1C1917]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="mt-5 mb-6">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#887B6D]" />
                  <input
                    type="text"
                    placeholder="Search home essentials..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full bg-white pl-9 pr-3 py-2 text-xs border border-[#EAE2D8] focus:outline-none focus:border-[#A35836]"
                  />
                </div>
              </form>

              {/* Nav links */}
              <div className="space-y-1 text-sm font-medium">
                <button
                  onClick={() => {
                    navigateTo({ type: 'home' });
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-[#F4EFEB] text-[#1C1917]"
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    navigateTo({ type: 'shop' });
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-[#F4EFEB] text-[#1C1917]"
                >
                  Shop All Products
                </button>
                <button
                  onClick={() => {
                    navigateTo({ type: 'wishlist' });
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-[#F4EFEB] text-[#1C1917] flex items-center justify-between"
                >
                  <span>Saved Wishlist</span>
                  <span className="text-xs text-[#887B6D]">{wishlist.length}</span>
                </button>
                <button
                  onClick={() => {
                    navigateTo({ type: 'about' });
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-[#F4EFEB] text-[#1C1917]"
                >
                  About Our Craft
                </button>
                <button
                  onClick={() => {
                    navigateTo({ type: 'contact' });
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-[#F4EFEB] text-[#1C1917]"
                >
                  Contact & Showroom
                </button>
                <button
                  onClick={() => {
                    navigateTo({ type: 'faq' });
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-[#F4EFEB] text-[#1C1917]"
                >
                  Frequently Asked Questions
                </button>
              </div>

              {/* Categories Accordion */}
              <div className="mt-6 pt-4 border-t border-[#EAE2D8]">
                <div className="text-[11px] font-semibold tracking-wider uppercase text-[#887B6D] mb-2 px-3">
                  All Categories
                </div>
                <div className="space-y-1 max-h-56 overflow-y-auto">
                  {CATEGORIES_DATA.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => handleCategoryClick(cat.name)}
                      className="w-full text-left px-3 py-1.5 text-xs text-[#292524] hover:bg-[#F4EFEB] flex items-center justify-between"
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="text-[10px] text-[#887B6D]">{cat.itemCount}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom info */}
            <div className="pt-6 border-t border-[#EAE2D8] mt-6">
              <a
                href={`https://wa.me/${WHATSAPP_INT_NUMBER}?text=Assalam-o-Alaikum%20Dastoor%20Home!`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-medium transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp: 0312-6687237</span>
              </a>
              <div className="text-[11px] text-center text-[#887B6D] mt-3">
                Nationwide Delivery across Pakistan
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
