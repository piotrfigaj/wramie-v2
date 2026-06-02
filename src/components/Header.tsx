import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Rocket, ChevronDown, Sparkles } from 'lucide-react';
import { CartItem } from '../types';
import { AppView } from '../App';

interface HeaderProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  cart: CartItem[];
  onOpenCart: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  cart,
  onOpenCart,
  onScrollToSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = cart.reduce((acc, item) => acc + (item.customization.quantity || 1), 0);

  return (
    <>
      <nav
        id="main-nav"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 md:py-4 px-4 sm:px-6 md:px-12 flex items-center justify-between h-16 md:h-20 ${
          isScrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-[12px] shadow-[0_2px_20px_rgba(44,36,22,0.06)]'
            : 'bg-[#FAF7F2]/90 backdrop-blur-[12px]'
        }`}
      >
        {/* Logo "wramie." with premium terracotta dot (reduced on mobile) */}
        <div
          onClick={() => onNavigate('home')}
          className="font-serif italic font-bold text-[21px] sm:text-[24px] md:text-[28px] tracking-normal text-[#2C2416] cursor-pointer selection:bg-transparent"
        >
          wramie<span className="text-[#C8765A]">.</span>
        </div>

        {/* Center menu desktop navigation links */}
        <div className="hidden md:flex gap-6 lg:gap-8 items-center text-[13px] lg:text-[14px] font-semibold text-[#2C2416]/95 selection:bg-transparent uppercase tracking-[1px]">
          
          <button
            onClick={() => onNavigate('katalog')}
            className={`hover:text-[#C8765A] transition-colors cursor-pointer ${
              currentView === 'katalog' ? 'text-[#C8765A]' : ''
            }`}
          >
            Katalog
          </button>

          {/* Desktop Categories Dropdown (With Hover Interaction State) */}
          <div
            className="h-full flex items-center py-2"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              onClick={() => onNavigate('katalog')}
              className={`hover:text-[#C8765A] transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentView === 'kategoria-gwiazdy' ? 'text-[#C8765A]' : ''
              }`}
            >
              <span>Kategorie</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-250 ${dropdownOpen ? 'rotate-180 text-[#C8765A]' : ''}`} />
            </button>

            {/* Premium Full-Width Mega Menu panel dropdown: fixed viewport location */}
            {dropdownOpen && (
              <div 
                className="fixed top-[60px] md:top-[76px] left-0 right-0 w-screen bg-[#FAF7F2] border-b border-[#2C2416]/10 shadow-[0_25px_50px_rgba(44,36,22,0.12)] p-10 z-40 cursor-default text-left selection:bg-amber-100"
                style={{
                  animation: 'fadeInDown 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                }}
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <div className="max-w-7xl mx-auto flex flex-col gap-8">
                  {/* 4 columns content grid */}
                  <div className="grid grid-cols-4 gap-8">
                    
                    {/* Column 1: Mapa Gwiazd */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🌌</span>
                        <h4 className="font-serif text-[15px] font-bold text-[#2C2416] tracking-tight">Mapa Gwiazd</h4>
                      </div>
                      <p className="text-[11px] text-[#2C2416]/65 leading-relaxed font-sans font-normal">
                        Sentymentalny układ konstelacji z najważniejszego momentu w życiu.
                      </p>
                      <div className="flex flex-col gap-2 font-sans">
                        <button
                          onClick={() => {
                            onNavigate('kategoria-gwiazdy');
                            setDropdownOpen(false);
                          }}
                          className="text-left text-xs font-medium text-[#2C2416]/80 hover:text-[#C8765A] transition-colors flex items-center gap-1.5"
                        >
                          <span className="text-[#C8765A]">✦</span> Niebo nad Nami (Ślub)
                        </button>
                        <button
                          onClick={() => {
                            onNavigate('product');
                            setDropdownOpen(false);
                          }}
                          className="text-left text-xs font-medium text-[#2C2416]/80 hover:text-[#C8765A] transition-colors flex items-center gap-1.5"
                        >
                          <span className="text-[#C8765A]">✦</span> Rocznice i Zaręczyny
                        </button>
                        <button
                          onClick={() => {
                            onNavigate('product');
                            setDropdownOpen(false);
                          }}
                          className="text-left text-xs font-medium text-[#2C2416]/80 hover:text-[#C8765A] transition-colors flex items-center gap-1.5"
                        >
                          <span className="text-[#C8765A]">✦</span> Dzień Narodzin
                        </button>
                      </div>
                      <div className="inline-block bg-orange-100/60 text-[#C8765A] font-mono text-[9px] font-bold py-0.5 px-2 rounded-full uppercase w-fit">
                        Bestseller Ślubny ★
                      </div>
                    </div>

                    {/* Column 2: Mapa Miasta */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🗺️</span>
                        <h4 className="font-serif text-[15px] font-bold text-[#2C2416] tracking-tight">Mapa Miasta</h4>
                      </div>
                      <p className="text-[11px] text-[#2C2416]/65 leading-relaxed font-sans font-normal">
                        Minimalistyczna, precyzyjna siatka ulic Twoich ukochanych miejsc na ziemi.
                      </p>
                      <div className="flex flex-col gap-2 font-sans">
                        <button
                          onClick={() => {
                            onNavigate('katalog');
                            setDropdownOpen(false);
                          }}
                          className="text-left text-xs font-medium text-[#2C2416]/80 hover:text-[#C8765A] transition-colors flex items-center gap-1.5"
                        >
                          <span className="text-[#C8765A]">✦</span> Siatka Ulic (Nasze drogi)
                        </button>
                        <button
                          onClick={() => {
                            onNavigate('katalog');
                            setDropdownOpen(false);
                          }}
                          className="text-left text-xs font-medium text-[#2C2416]/80 hover:text-[#C8765A] transition-colors flex items-center gap-1.5"
                        >
                          <span className="text-[#C8765A]">✦</span> Współrzędne Serca
                        </button>
                        <button
                          onClick={() => {
                            onNavigate('katalog');
                            setDropdownOpen(false);
                          }}
                          className="text-left text-xs font-medium text-[#2C2416]/80 hover:text-[#C8765A] transition-colors flex items-center gap-1.5"
                        >
                          <span className="text-[#C8765A]">✦</span> Mapy Metropolii
                        </button>
                      </div>
                      <div className="inline-block bg-emerald-100/60 text-emerald-800 font-mono text-[9px] font-bold py-0.5 px-2 rounded-full uppercase w-fit">
                        Szlachetna Loft 🗺️
                      </div>
                    </div>

                    {/* Column 3: Portret Pupila */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">👑</span>
                        <h4 className="font-serif text-[15px] font-bold text-[#2C2416] tracking-tight">Portrety Pupili</h4>
                      </div>
                      <p className="text-[11px] text-[#2C2416]/65 leading-relaxed font-sans font-normal">
                        Królewska oraz pop-artowa oprawa dla Twojego psa, kota i zwierzątka.
                      </p>
                      <div className="flex flex-col gap-2 font-sans">
                        <button
                          onClick={() => {
                            onNavigate('katalog');
                            setDropdownOpen(false);
                          }}
                          className="text-left text-xs font-medium text-[#2C2416]/80 hover:text-[#C8765A] transition-colors flex items-center gap-1.5"
                        >
                          <span className="text-[#C8765A]">✦</span> Lord Baron (Renesans)
                        </button>
                        <button
                          onClick={() => {
                            onNavigate('katalog');
                            setDropdownOpen(false);
                          }}
                          className="text-left text-xs font-medium text-[#2C2416]/80 hover:text-[#C8765A] transition-colors flex items-center gap-1.5"
                        >
                          <span className="text-[#C8765A]">✦</span> Neon Pop-Art (Koty)
                        </button>
                        <button
                          onClick={() => {
                            onNavigate('katalog');
                            setDropdownOpen(false);
                          }}
                          className="text-left text-xs font-medium text-[#2C2416]/80 hover:text-[#C8765A] transition-colors flex items-center gap-1.5"
                        >
                          <span className="text-[#C8765A]">✦</span> Nowoczesna i pusta rycina
                        </button>
                      </div>
                      <div className="inline-block bg-amber-100/60 text-amber-800 font-mono text-[9px] font-bold py-0.5 px-2 rounded-full uppercase w-fit">
                        Ręczny Retusz w 24h ✍️
                      </div>
                    </div>

                    {/* Column 4: Pasje i Hobby */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">⚡</span>
                        <h4 className="font-serif text-[15px] font-bold text-[#2C2416] tracking-tight">Plakaty Pasji</h4>
                      </div>
                      <p className="text-[11px] text-[#2C2416]/65 leading-relaxed font-sans font-normal">
                        Okładki albumów, legendarne auta porsche oraz schematy techniczne zainteresowań.
                      </p>
                      <div className="flex flex-col gap-2 font-sans">
                        <button
                          onClick={() => {
                            onNavigate('katalog');
                            setDropdownOpen(false);
                          }}
                          className="text-left text-xs font-medium text-[#2C2416]/80 hover:text-[#C8765A] transition-colors flex items-center gap-1.5"
                        >
                          <span className="text-[#C8765A]">✦</span> Płytowy Vinyl Muzyczny
                        </button>
                        <button
                          onClick={() => {
                            onNavigate('katalog');
                            setDropdownOpen(false);
                          }}
                          className="text-left text-xs font-medium text-[#2C2416]/80 hover:text-[#C8765A] transition-colors flex items-center gap-1.5"
                        >
                          <span className="text-[#C8765A]">✦</span> Schematy Porsche 911
                        </button>
                        <button
                          onClick={() => {
                            onNavigate('katalog');
                            setDropdownOpen(false);
                          }}
                          className="text-left text-xs font-medium text-[#2C2416]/80 hover:text-[#C8765A] transition-colors flex items-center gap-1.5"
                        >
                          <span className="text-[#C8765A]">✦</span> Retro Plakaty Sportowe
                        </button>
                      </div>
                      <div className="inline-block bg-teal-100/60 text-teal-800 font-mono text-[9px] font-bold py-0.5 px-2 rounded-full uppercase w-fit">
                        Kolekcjonerskie 🎧
                      </div>
                    </div>

                  </div>

                  {/* Bottom Trust Row Promo Banner inside Mega Menu */}
                  <div className="pt-5 border-t border-[#2C2416]/10 flex flex-col sm:flex-row sm:items-center sm:justify-between text-[11px] font-sans font-bold text-[#2C2416]/50 uppercase tracking-wider gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-700">🚚</span>
                      <span>Bezpłatna wysyłka kurierska od 150 zł</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-indigo-600">✍️</span>
                      <span>E-mailowy podgląd grafika przed drukiem w 24h</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-600">✨</span>
                      <span>Tłoczone, butikowe wykonanie i ramy</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => onNavigate('jak-dziala')}
            className={`hover:text-[#C8765A] transition-colors cursor-pointer ${
              currentView === 'jak-dziala' ? 'text-[#C8765A]' : ''
            }`}
          >
            Jak to działa
          </button>

          <button
            onClick={() => onNavigate('o-nas')}
            className={`hover:text-[#C8765A] transition-colors cursor-pointer ${
              currentView === 'o-nas' ? 'text-[#C8765A]' : ''
            }`}
          >
            O nas
          </button>

          <button
            onClick={() => onNavigate('faq')}
            className={`hover:text-[#C8765A] transition-colors cursor-pointer ${
              currentView === 'faq' ? 'text-[#C8765A]' : ''
            }`}
          >
            FAQ
          </button>
        </div>

        {/* Right Nav buttons (reduced gap and sizes on mobile) */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
          {/* Cart Icon with count badge */}
          <button
            onClick={onOpenCart}
            id="btn-cart-trigger"
            aria-label="Koszyk"
            className="relative p-1.5 sm:p-2.5 hover:bg-[#2C2416]/5 rounded-full transition-colors duration-250 cursor-pointer shrink-0"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] text-[#2C2416]"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#C8765A] text-white font-sans text-[8.5px] sm:text-[10px] font-semibold w-4 sm:w-4.5 h-4 sm:h-4.5 rounded-full flex items-center justify-center shadow-xs">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 sm:p-2 hover:bg-[#2C2416]/5 rounded-full transition-colors cursor-pointer shrink-0"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#2C2416]" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-[#2C2416]" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile drop-down view drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[64px] bg-[#FAF7F2] border-b border-[#2C2416]/10 z-40 p-6 flex flex-col gap-4 shadow-2xl animate-fade-in-down">
          <button
            onClick={() => {
              onNavigate('katalog');
              setIsMobileMenuOpen(false);
            }}
            className="text-left font-serif text-lg py-2.5 text-[#2C2416] hover:text-[#C8765A] border-b border-[#2C2416]/5 font-bold"
          >
            Katalog Produktów
          </button>
          
          <button
            onClick={() => {
              onNavigate('kategoria-gwiazdy');
              setIsMobileMenuOpen(false);
            }}
            className="text-left font-serif text-lg py-2.5 text-[#2C2416] hover:text-[#C8765A] border-b border-[#2C2416]/5 font-bold"
          >
            Kolekcja: Mapa Gwiazd
          </button>

          <button
            onClick={() => {
              onNavigate('jak-dziala');
              setIsMobileMenuOpen(false);
            }}
            className="text-left font-serif text-lg py-2.5 text-[#2C2416] hover:text-[#C8765A] border-b border-[#2C2416]/5"
          >
            Jak to działa?
          </button>

          <button
            onClick={() => {
              onNavigate('o-nas');
              setIsMobileMenuOpen(false);
            }}
            className="text-left font-serif text-lg py-2.5 text-[#2C2416] hover:text-[#C8765A] border-b border-[#2C2416]/5"
          >
            O nas / Historia
          </button>

          <button
            onClick={() => {
              onNavigate('faq');
              setIsMobileMenuOpen(false);
            }}
            className="text-left font-serif text-lg py-2.5 text-[#2C2416] hover:text-[#C8765A] border-b border-[#2C2416]/5"
          >
            Pomoc / FAQ
          </button>

          <button
            onClick={() => {
              onNavigate('product');
              setIsMobileMenuOpen(false);
            }}
            className="w-full bg-[#C8765A] hover:bg-[#A0522D] text-white py-3.5 rounded-full text-center font-bold text-xs uppercase tracking-widest mt-4"
          >
            Twój Własny Plakat &rarr;
          </button>
        </div>
      )}
    </>
  );
};
