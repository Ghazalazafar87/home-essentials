import React, { useEffect } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ToastContainer } from './components/ToastContainer';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { WishlistPage } from './pages/WishlistPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { PolicyPage } from './pages/PolicyPage';

const MainRouter: React.FC = () => {
  const { currentPage, navigateTo, lastOrder } = useShop();

  // Listen to browser hash changes for seamless client navigation and deep linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash || hash === '/' || hash === 'home') {
        navigateTo({ type: 'home' });
      } else if (hash.startsWith('/product/')) {
        const prodId = hash.replace('/product/', '');
        navigateTo({ type: 'product', productId: prodId });
      } else if (hash === '/shop') {
        navigateTo({ type: 'shop' });
      } else if (hash === '/cart') {
        navigateTo({ type: 'cart' });
      } else if (hash === '/checkout') {
        navigateTo({ type: 'checkout' });
      } else if (hash === '/wishlist') {
        navigateTo({ type: 'wishlist' });
      } else if (hash === '/about') {
        navigateTo({ type: 'about' });
      } else if (hash === '/contact') {
        navigateTo({ type: 'contact' });
      } else if (hash === '/faq') {
        navigateTo({ type: 'faq' });
      } else if (hash.startsWith('/policy/')) {
        const tab = hash.replace('/policy/', '') as 'shipping' | 'returns' | 'privacy' | 'terms';
        navigateTo({ type: 'policy', policyTab: tab || 'shipping' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [navigateTo]);

  // Sync hash when currentPage changes
  useEffect(() => {
    switch (currentPage.type) {
      case 'home':
        if (window.location.hash !== '') window.location.hash = '';
        break;
      case 'shop':
        window.location.hash = '/shop';
        break;
      case 'product':
        window.location.hash = `/product/${currentPage.productId}`;
        break;
      case 'cart':
        window.location.hash = '/cart';
        break;
      case 'checkout':
        window.location.hash = '/checkout';
        break;
      case 'wishlist':
        window.location.hash = '/wishlist';
        break;
      case 'about':
        window.location.hash = '/about';
        break;
      case 'contact':
        window.location.hash = '/contact';
        break;
      case 'faq':
        window.location.hash = '/faq';
        break;
      case 'policy':
        window.location.hash = `/policy/${currentPage.policyTab}`;
        break;
      default:
        break;
    }
  }, [currentPage]);

  const renderContent = () => {
    switch (currentPage.type) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return (
          <ShopPage
            initialCategory={currentPage.category}
            initialSearch={currentPage.search}
          />
        );
      case 'product':
        return <ProductDetailPage productId={currentPage.productId} />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-confirmation':
        return <OrderConfirmationPage order={currentPage.order || lastOrder!} />;
      case 'wishlist':
        return <WishlistPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'faq':
        return <FAQPage />;
      case 'policy':
        return <PolicyPage initialTab={currentPage.policyTab} />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1917] selection:bg-[#EAE2D8] selection:text-[#1C1917]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        {renderContent()}
      </main>

      <Footer />

      {/* Global Modals & Overlays */}
      <CartDrawer />
      <QuickViewModal />
      <FloatingWhatsApp />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainRouter />
    </ShopProvider>
  );
}
