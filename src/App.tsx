import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ProductView } from './components/ProductView';
import { CatalogView } from './components/CatalogView';
import { CategoryStarsView } from './components/CategoryStarsView';
import { AboutView } from './components/AboutView';
import { HowItWorksView } from './components/HowItWorksView';
import { FaqView } from './components/FaqView';
import { CartDrawer } from './components/CartDrawer';
import { PosterCustomization, CartItem } from './types';

export type AppView = 'home' | 'product' | 'katalog' | 'kategoria-gwiazdy' | 'o-nas' | 'jak-dziala' | 'faq';

export default function App() {
  // Routing views state
  const [currentView, setCurrentView] = useState<AppView>('home');
  
  // Active cart drawer panel visual state
  const [cartOpen, setCartOpen] = useState(false);
  
  // Shopping Cart contents
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'cart_default_1',
      productName: 'Artystyczna Mapa Miasta',
      price: 119,
      customization: {
        type: 'city',
        title: 'KRAKÓW',
        subtitle: 'NA NASZEJ PIERWSZEJ WSPÓLNEJ DRODZE',
        dateString: '23 LIPCA 2024',
        location: '50° 03\' N • 19° 56\' E',
        theme: 'cream',
        size: '40x50',
        hasFrame: true,
        quantity: 1,
      }
    },
    {
      id: 'cart_default_2',
      productName: 'Spersonalizowana Mapa Gwiazd',
      price: 119,
      customization: {
        type: 'stars',
        title: 'Zofia & Dawid',
        subtitle: 'Konstelacje ułożyły się dla nas',
        dateString: '1 Czerwca 2025',
        location: 'Wrocław, PL',
        theme: 'night',
        size: '30x40',
        hasFrame: false,
        quantity: 1,
      }
    }
  ]);

  // Current customization options inside the designer preview
  const [selectedProduct, setSelectedProduct] = useState<PosterCustomization>({
    type: 'stars',
    title: 'Natalia & Kacper',
    subtitle: 'Wśród gwiazd wszystko się zaczęło',
    dateString: '23 LIPCA 2025',
    location: 'Wrocław, PL',
    theme: 'night',
    size: '40x50',
    hasFrame: true,
    textScale: 1,
    starMapScale: 1,
    starCount: 24,
    quantity: 1,
  });

  // Action methods
  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: PosterCustomization) => {
    setSelectedProduct(product);
  };

  const handleUpdateCustomization = (updated: PosterCustomization) => {
    setSelectedProduct(updated);
  };

  const handleAddToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleScrollToSec = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans text-[#2C2416] flex flex-col justify-between">
      {/* Dynamic Header Navbar (Sticky) */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        cart={cart}
        onOpenCart={() => setCartOpen(true)}
        onScrollToSection={handleScrollToSec}
      />

      {/* Main Switch Routing Layout */}
      <main className="flex-1 w-full">
        {currentView === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
          />
        )}
        {currentView === 'product' && (
          <ProductView
            customization={selectedProduct}
            onUpdateCustomization={handleUpdateCustomization}
            onAddToCart={handleAddToCart}
            onOpenCart={() => setCartOpen(true)}
          />
        )}
        {currentView === 'katalog' && (
          <CatalogView
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
          />
        )}
        {currentView === 'kategoria-gwiazdy' && (
          <CategoryStarsView
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
          />
        )}
        {currentView === 'o-nas' && (
          <AboutView
            onNavigate={handleNavigate}
          />
        )}
        {currentView === 'jak-dziala' && (
          <HowItWorksView
            onNavigate={handleNavigate}
          />
        )}
        {currentView === 'faq' && (
          <FaqView
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Dynamic Cart manager Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Elegant Footer column list */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
