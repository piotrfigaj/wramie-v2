import React, { useState, useEffect } from 'react';
import { Sparkles, Eye, ShieldCheck, Heart, RefreshCw, ShoppingCart, Truck, History } from 'lucide-react';
import { PosterCustomization, CartItem } from '../types';
import { PosterMock } from './PosterMock';

interface ProductViewProps {
  customization: PosterCustomization;
  onUpdateCustomization: (updated: PosterCustomization) => void;
  onAddToCart: (item: CartItem) => void;
  onOpenCart: () => void;
}

// Days, Months, Years arrays for custom dropdown selectors
const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));
const MONTHS = [
  'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
  'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
];
const YEARS = Array.from({ length: 80 }, (_, i) => String(2027 - i));

export const ProductView: React.FC<ProductViewProps> = ({
  customization,
  onUpdateCustomization,
  onAddToCart,
  onOpenCart,
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'guide' | 'reviews'>('details');
  const [isPulsing, setIsPulsing] = useState(false);
  const [formCompleted, setFormCompleted] = useState(false);
  
  // Local select date bits
  const [day, setDay] = useState('23');
  const [month, setMonth] = useState('Lipiec');
  const [year, setYear] = useState('2025');

  // Mobile scroll preview tracker state
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowMobilePreview(true);
      } else {
        setShowMobilePreview(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trigger preview pulsing when any configuration option alters
  useEffect(() => {
    setIsPulsing(true);
    const timer = setTimeout(() => setIsPulsing(false), 500);
    return () => clearTimeout(timer);
  }, [
    customization.type,
    customization.title,
    customization.subtitle,
    customization.location,
    customization.theme,
    customization.size,
    customization.hasFrame,
    customization.petStyle,
    customization.passionTheme,
    customization.textScale,
    customization.starMapScale,
    customization.starCount,
  ]);

  // Sync date strings
  useEffect(() => {
    onUpdateCustomization({
      ...customization,
      dateString: `${day} ${month.toUpperCase()} ${year}`
    });
  }, [day, month, year]);

  // Handle baseline calculations
  const calculatePrice = () => {
    let price = 119; // baseline poster cost

    // Poster type adjustments
    if (customization.type === 'music') {
      price = 109; // music cheaper
    } else if (customization.type === 'pet') {
      price = 129; // animal manually retouched premium
    }

    // Size multiplier additions
    if (customization.size === '40x50') price += 30;
    if (customization.size === '50x70') price += 60;
    if (customization.size === 'A3') price += 20;

    return price;
  };

  const currentProductCost = calculatePrice();

  const handleFieldChange = (key: keyof PosterCustomization, value: any) => {
    onUpdateCustomization({
      ...customization,
      [key]: value,
    });
  };

  const handleOrderAdd = () => {
    const singlePrice = calculatePrice();
    const cartProduct: CartItem = {
      id: `cart_${Date.now()}`,
      productName: getPosterTypeLabel(customization.type),
      price: singlePrice,
      customization: { ...customization },
    };
    onAddToCart(cartProduct);
    setFormCompleted(true);
    setTimeout(() => {
      setFormCompleted(false);
      onOpenCart(); // Slide active cart Drawer open directly!
    }, 1000);
  };

  const getPosterTypeLabel = (t: string) => {
    switch (t) {
      case 'city': return 'Artystyczna Mapa Miasta';
      case 'pet': return 'Szlachecki Portret Pupila';
      case 'music': return 'Spersonalizowany Plakat Muzyczny';
      case 'car': return 'Kolekcja Samochodowa Premium';
      case 'stars':
      default: return 'Spersonalizowana Mapa Gwiazd';
    }
  };

  return (
    <div id="page-product" className="pt-24 pb-20 px-6 md:px-12 max-w-7xl mx-auto selection:bg-amber-100 font-sans text-left">
      
      {/* breadcrumb */}
      <nav className="text-xs text-[#2C2416]/50 mb-8 uppercase tracking-widest font-mono">
        <span className="hover:text-[#C8765A] transition-colors cursor-pointer">Sklep</span>
        <span className="mx-2">&bull;</span>
        <span className="hover:text-[#C8765A] transition-colors cursor-pointer capitalize">
          {customization.type === 'stars' && 'Mapa Gwiazd'}
          {customization.type === 'city' && 'Mapa Miasta'}
          {customization.type === 'pet' && 'Portret Pupila'}
          {customization.type === 'music' && 'Plakat Muzyczny'}
          {customization.type === 'car' && 'Plakat Samochodowy'}
        </span>
        <span className="mx-2">&bull;</span>
        <span className="text-[#2C2416] font-bold">Zaprojektuj Twój wydruk</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEWA STRONA — PODGLĄD PLAKATU W RAMIE (INTELIGENTNY PODGLĄD STICKY DOPASOWANY DO EKRANU) */}
        <div className="lg:col-span-6 space-y-3.5 lg:sticky lg:top-24 lg:self-start max-h-[calc(100vh-120px)] flex flex-col justify-start">
          
          {/* Main big display */}
          <div className="bg-[#FAF7F2] p-4 rounded-3xl border border-[#2C2416]/5 shadow-sm flex flex-col justify-center items-center overflow-hidden">
            <div 
              style={{ maxWidth: 'min(420px, calc(72vh - 190px))' }}
              className={`relative aspect-[3/4] w-full mx-auto transition-transform duration-300 ${isPulsing ? 'scale-[0.98] rotate-[0.5deg]' : ''}`}
            >
              <PosterMock customization={customization} />
            </div>
            
            {/* Miniature variant style preview circles */}
            <div className="mt-6 flex justify-center items-center gap-4">
              <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2C2416]/40">
                Szybka zmiana stylu:
              </label>
              <div className="flex gap-2">
                <button
                  aria-label="Nocny Błękit"
                  onClick={() => handleFieldChange('theme', 'night')}
                  className={`w-7 h-7 rounded-full bg-gradient-to-br from-indigo-900 to-slate-900 border-2 ${
                    customization.theme === 'night' ? 'border-[#C8765A] scale-125' : 'border-transparent'
                  }`}
                />
                <button
                  aria-label="Elegancka Czerń"
                  onClick={() => handleFieldChange('theme', 'black')}
                  className={`w-7 h-7 rounded-full bg-neutral-900 border-2 ${
                    customization.theme === 'black' ? 'border-[#C8765A] scale-125' : 'border-transparent'
                  }`}
                />
                <button
                  aria-label="Złoty Zachód"
                  onClick={() => handleFieldChange('theme', 'gold')}
                  className={`w-7 h-7 rounded-full bg-gradient-to-br from-yellow-700 to-[#120B04] border-2 ${
                    customization.theme === 'gold' ? 'border-[#C8765A] scale-125' : 'border-transparent'
                  }`}
                />
                <button
                  aria-label="Kremowy Minimalizm"
                  onClick={() => handleFieldChange('theme', 'cream')}
                  className={`w-7 h-7 rounded-full bg-[#FCF8F2] border border-neutral-300 border-2 ${
                    customization.theme === 'cream' ? 'border-[#C8765A] scale-125' : 'border-transparent'
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-[#F5F0E8] rounded-2xl flex items-center gap-2 justify-center text-xs text-[#2C2416]/70">
            <span>🔍</span>
            <span className="font-semibold text-[11px] uppercase tracking-wider">
              Podgląd będzie dokładnie taki jak Twój plakat
            </span>
          </div>
        </div>

        {/* PRAWA STRONA — FORMULARZ PERSONALIZACJI */}
        <div className="lg:col-span-6 space-y-8 text-[#2C2416]">
          
          <div className="space-y-2">
            <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight">
              {getPosterTypeLabel(customization.type)}
            </h1>
            <p className="text-xs text-[#2C2416]/50 uppercase tracking-widest font-mono">
              ★ ★ ★ ★ ★ <span className="text-[#C8765A] font-semibold">(1 247 Opinii Klientów)</span>
            </p>
          </div>

          {/* Pricing indicators */}
          {(() => {
            let total = currentProductCost;
            if (customization.hasFrame) total += 79;
            if (customization.hasPremiumSeal) total += 19;
            if (customization.hasInsurance) total += 9;
            if (customization.hasGiftWrap) total += 29;

            if (customization.selectedPackage === 'duo') {
              total = total * 1.7;
            } else if (customization.selectedPackage === 'trio') {
              total = total * 2.5;
            }
            const finalVal = Math.round(total);
            const originalVal = Math.round(finalVal * 1.25);
            return (
              <div className="p-4 bg-[#F5F0E8] rounded-2xl flex items-center justify-between border border-[#2C2416]/5">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3.5xl font-extrabold text-[#C8765A]">
                    {finalVal} zł
                  </span>
                  <span className="text-sm text-neutral-400/70 line-through font-medium">
                    {originalVal} zł
                  </span>
                </div>
                <div className="text-right text-xs text-[#2C2416]/70 space-y-0.5 font-sans">
                  <p className="text-emerald-700 font-bold block">✓ Bezpłatna wysyłka w 48h</p>
                  <p className="opacity-60 text-[10px]">Cena zawiera podgląd grafika przed drukiem</p>
                </div>
              </div>
            );
          })()}

          <div className="space-y-8">
            
            {/* CARD 1: EXPLICIT STEP 1 - DATA DETAILS */}
            <div className="bg-white p-6 rounded-3xl border border-[#2C2416]/5 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-[#2C2416]/10">
                <span className="w-7 h-7 rounded-sm bg-[#2C2416] text-[#FAF7F2] flex items-center justify-center text-xs font-bold font-mono">01</span>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#2C2416]">Krok 1: Wpisz swoje dane i dedykacje</h3>
                  <p className="text-[9px] text-neutral-400 font-mono uppercase tracking-wider">Teksty widoczne na gotowym projekcie</p>
                </div>
              </div>

              {/* Input 1: Title Names */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold uppercase tracking-widest text-[#2C2416] font-mono flex items-center gap-2">
                  <span className="inline-flex items-center justify-center bg-[#C8765A] text-white text-[10px] font-bold font-mono w-4.5 h-4.5 rounded-full shrink-0">1</span>
                  {customization.type === 'stars' && 'Nazwa / Tekst Główny (Napis na górze):'}
                  {customization.type === 'city' && 'Tytuł główny plakatowy (Napis na górze):'}
                  {customization.type === 'pet' && 'Imię twardziela / pupila (Główna nazwa):'}
                  {customization.type === 'music' && 'Nazwa albumu / Utworu:'}
                  {customization.type === 'car' && 'Nazwa modelu / Samochodu:'}
                </label>
                <input
                  type="text"
                  value={customization.title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  maxLength={40}
                  placeholder={
                    customization.type === 'stars' ? 'np. Marta & Jan' : 
                    customization.type === 'city' ? 'np. WROCŁAW' :
                    customization.type === 'pet' ? 'np. Baron Ludwik' :
                    customization.type === 'music' ? 'np. THE EMINEM SHOW' :
                    'np. 911 Turbo S'
                  }
                  className="w-full bg-[#FAF7F2]/65 hover:bg-[#FAF7F2]/90 focus:bg-white border border-[#2C2416]/12 focus:border-[#C8765A] py-3 px-4 rounded-xl text-sm font-sans font-bold text-[#2C2416] transition-all focus:ring-4 focus:ring-[#C8765A]/10 focus:outline-none placeholder:text-neutral-400"
                />
              </div>

              {/* Input 2: Subtitle Dedication */}
              <div className="space-y-1.5 text-left">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#2C2416] font-mono flex items-center gap-2">
                    <span className="inline-flex items-center justify-center bg-[#C8765A] text-white text-[10px] font-bold font-mono w-4.5 h-4.5 rounded-full shrink-0">2</span>
                    {customization.type === 'music' && 'Dedykacja / Podtytuł (Tekst pod spodem):'}
                    {customization.type === 'car' && 'Dedykacja / Podtytuł (Tekst pod spodem):'}
                    {customization.type !== 'music' && customization.type !== 'car' && 'Dedykacja / Podtytuł (Tekst pod spodem):'}
                  </label>
                  <div className="text-[10px] text-[#2C2416]/45 font-mono">
                    Pozostało {80 - customization.subtitle.length} znaków
                  </div>
                </div>
                <textarea
                  value={customization.subtitle}
                  onChange={(e) => handleFieldChange('subtitle', e.target.value.slice(0, 80))}
                  maxLength={80}
                  rows={2}
                  placeholder={
                    customization.type === 'music' ? 'np. FLAT 6 / 650 HORSEPOWER lub TRACK 04: WITHOUT ME' :
                    customization.type === 'car' ? 'np. FLAT 6 / 650 HORSEPOWER lub V8 SUPERCHARGED' :
                    'np. Noc, w której splątały się nasze przeznaczenia'
                  }
                  className="w-full bg-[#FAF7F2]/65 hover:bg-[#FAF7F2]/90 focus:bg-white border border-[#2C2416]/12 focus:border-[#C8765A] py-3 px-4 rounded-xl text-sm font-mono tracking-wide text-neutral-800 transition-all focus:ring-4 focus:ring-[#C8765A]/10 focus:outline-none resize-none placeholder:text-neutral-400"
                />
              </div>

              {/* Input 3: Location Coordinates / Extras */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold uppercase tracking-widest text-[#2C2416] font-mono flex items-center gap-2">
                  <span className="inline-flex items-center justify-center bg-[#C8765A] text-white text-[10px] font-bold font-mono w-4.5 h-4.5 rounded-full shrink-0">3</span>
                  {customization.type === 'stars' && 'Lokalizacja (Miejscowość do gwiazdozbioru):'}
                  {customization.type === 'city' && 'Miejscowość (do wyliczenia współrzędnych):'}
                  {customization.type === 'pet' && 'Szlachecka Ranga / Tytuł:'}
                  {customization.type === 'car' && 'Lokalizacja i podpis (np. legendary racing):'}
                  {customization.type === 'music' && 'Sentymentalny dopisek na dole (np. legendary song):'}
                </label>
                <input
                  type="text"
                  value={customization.location}
                  onChange={(e) => handleFieldChange('location', e.target.value)}
                  placeholder={
                    customization.type === 'music' ? 'np. LEGENDARY ALBUM' :
                    customization.type === 'car' ? 'np. LEGENDARY RACING' :
                    'np. Wrocław, Rynek'
                  }
                  className="w-full bg-[#FAF7F2]/65 hover:bg-[#FAF7F2]/90 focus:bg-white border border-[#2C2416]/12 focus:border-[#C8765A] py-3 px-4 rounded-xl text-sm font-sans font-medium text-[#2C2416] transition-all focus:ring-4 focus:ring-[#C8765A]/10 focus:outline-none placeholder:text-neutral-400"
                />
              </div>

              {/* Multi-Selectors: Date mapping (ONLY display or customize when relevant) */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold uppercase tracking-widest text-[#2C2416] font-mono flex items-center gap-2">
                  <span className="inline-flex items-center justify-center bg-[#C8765A] text-white text-[10px] font-bold font-mono w-4.5 h-4.5 rounded-full shrink-0">4</span>
                  {customization.type === 'music' && 'Data wydania / rocznicy utworu:'}
                  {customization.type === 'car' && 'Rocznik modelu samochodu / data:'}
                  {customization.type !== 'music' && customization.type !== 'car' && 'Data wydarzenia / pamiątki:'}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <select
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="bg-[#FAF7F2]/65 hover:bg-[#FAF7F2]/90 focus:bg-white border border-[#2C2416]/12 py-3 px-3 rounded-xl text-sm text-[#2C2416] focus:outline-none focus:border-[#C8765A] focus:ring-4 focus:ring-[#C8765A]/10 w-full font-sans font-medium transition-all cursor-pointer"
                  >
                    {DAYS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>

                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="bg-[#FAF7F2]/65 hover:bg-[#FAF7F2]/90 focus:bg-white border border-[#2C2416]/12 py-3 px-3 rounded-xl text-sm text-[#2C2416] focus:outline-none focus:border-[#C8765A] focus:ring-4 focus:ring-[#C8765A]/10 w-full font-sans font-medium transition-all cursor-pointer"
                  >
                    {MONTHS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>

                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="bg-[#FAF7F2]/65 hover:bg-[#FAF7F2]/90 focus:bg-white border border-[#2C2416]/12 py-3 px-3 rounded-xl text-sm text-[#2C2416] focus:outline-none focus:border-[#C8765A] focus:ring-4 focus:ring-[#C8765A]/10 w-full font-sans font-medium transition-all cursor-pointer"
                  >
                    {YEARS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* STARS ONLY: live appearance tuning (text size / map size / star count) */}
              {customization.type === 'stars' && (
                <div className="space-y-5 pt-5 border-t border-[#2C2416]/10 text-left">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center bg-[#C8765A] text-white text-[10px] font-bold font-mono w-4.5 h-4.5 rounded-full shrink-0">5</span>
                    <label className="text-xs font-bold uppercase tracking-widest text-[#2C2416] font-mono">
                      Dopasuj wygląd mapy gwiazd:
                    </label>
                  </div>

                  {/* Text size */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2C2416]/70">
                        Wielkość tekstów
                      </span>
                      <span className="text-[10px] font-mono text-[#C8765A] font-bold">
                        {Math.round((customization.textScale ?? 1) * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.8"
                      max="1.4"
                      step="0.05"
                      value={customization.textScale ?? 1}
                      onChange={(e) => handleFieldChange('textScale', parseFloat(e.target.value))}
                      className="w-full accent-[#C8765A] cursor-pointer"
                    />
                  </div>

                  {/* Constellation size */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2C2416]/70">
                        Wielkość mapy gwiazd
                      </span>
                      <span className="text-[10px] font-mono text-[#C8765A] font-bold">
                        {Math.round((customization.starMapScale ?? 1) * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.7"
                      max="1.15"
                      step="0.05"
                      value={customization.starMapScale ?? 1}
                      onChange={(e) => handleFieldChange('starMapScale', parseFloat(e.target.value))}
                      className="w-full accent-[#C8765A] cursor-pointer"
                    />
                  </div>

                  {/* Star count */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2C2416]/70">
                        Ilość gwiazd na niebie
                      </span>
                      <span className="text-[10px] font-mono text-[#C8765A] font-bold">
                        {customization.starCount ?? 24}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="6"
                      max="80"
                      step="1"
                      value={customization.starCount ?? 24}
                      onChange={(e) => handleFieldChange('starCount', parseInt(e.target.value, 10))}
                      className="w-full accent-[#C8765A] cursor-pointer"
                    />
                    <p className="text-[10px] text-[#2C2416]/45 font-sans">
                      Przeciągnij, aby zagęścić lub rozrzedzić rozgwieżdżone tło.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* CARD 2: EXPLICIT STEP 2 - PRODUCT SETUP FORMAT & STYLE */}
            <div className="bg-white p-6 rounded-3xl border border-[#2C2416]/5 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-[#2C2416]/10">
                <span className="w-7 h-7 rounded-sm bg-[#2C2416] text-[#FAF7F2] flex items-center justify-center text-xs font-bold font-mono">02</span>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#2C2416]">Krok 2: Format &amp; Ramy drewniane</h3>
                  <p className="text-[9px] text-neutral-400 font-mono uppercase tracking-wider">Rozmiar plakatu oraz luksusowa dębowa rama</p>
                </div>
              </div>

              {/* Pet sub choices conditionally */}
              {customization.type === 'pet' && (
                <div className="space-y-2 pt-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#2C2416]/60 font-mono block">
                    Wybierz styl cyfrowego ujęcia pupila:
                  </label>
                  <div className="grid grid-cols-2 gap-3 font-sans">
                    <button
                      type="button"
                      onClick={() => handleFieldChange('petStyle', 'royal')}
                      className={`py-3 px-4 rounded-xl border text-xs font-bold text-center uppercase tracking-wide cursor-pointer transition-all ${
                        customization.petStyle === 'royal'
                          ? 'border-[#C8765A] bg-[#C8765A]/5 text-[#C8765A]'
                          : 'border-[#2C2416]/10 bg-white hover:border-[#2C2416]/30'
                      }`}
                    >
                      👑 Renesansowy Król
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFieldChange('petStyle', 'popart')}
                      className={`py-3 px-4 rounded-xl border text-xs font-bold text-center uppercase tracking-wide cursor-pointer transition-all ${
                        customization.petStyle === 'popart'
                          ? 'border-[#C8765A] bg-[#C8765A]/5 text-[#C8765A]'
                          : 'border-[#2C2416]/10 bg-white hover:border-[#2C2416]/30'
                      }`}
                    >
                      🎨 Neon Pop-Art
                    </button>
                  </div>
                </div>
              )}


              {/* Poster size Radio Boxes */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#2C2416]/60 font-mono block">
                  Wybierz format plakatu:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  {[
                    { key: '30x40', label: '30×40 cm', addon: 'Standard' },
                    { key: '40x50', label: '40×50 cm', addon: '+30 zł' },
                    { key: '50x70', label: '50×70 cm', addon: '+60 zł' },
                    { key: 'A3', label: 'Format A3', addon: '+20 zł' },
                  ].map((sz) => (
                    <button
                      type="button"
                      key={sz.key}
                      onClick={() => handleFieldChange('size', sz.key)}
                      className={`py-3 px-2 text-center border-2 rounded-xl transition-all cursor-pointer flex flex-col justify-center items-center ${
                        customization.size === sz.key
                          ? 'border-[#C8765A] bg-[#C8765A]/5 text-[#C8765A] font-bold shadow-xs'
                          : 'border-[#2C2416]/10 bg-white hover:border-[#2C2416]/30 text-[#2C2416]/70'
                      }`}
                    >
                      <span className="block font-medium">{sz.label}</span>
                      <span className="block text-[9px] opacity-60 mt-0.5">{sz.addon}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Frame Wood Toggle Switch */}
              <div className="p-4 bg-[#F5F0E8] rounded-2xl flex items-center justify-between border border-[#2C2416]/5 transition-colors">
                <div className="space-y-0.5 text-left pr-3">
                  <span className="text-xs font-bold uppercase tracking-wider font-mono text-[#2C2416]/70 block">
                    Oprawa w Dębową Ramę:
                  </span>
                  <span className="text-[11px] text-[#2C2416]/65 leading-tight block">
                    Zmontowany w dębową drewnianą ramę, gotowy do bezpośredniego powieszenia na ścianie (+79 zł)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleFieldChange('hasFrame', !customization.hasFrame)}
                  className={`w-14 h-8 shrink-0 rounded-full p-1 transition-colors relative cursor-pointer ${
                    customization.hasFrame ? 'bg-[#C8765A]' : 'bg-neutral-300'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${
                      customization.hasFrame ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* CARD 3: EXPLICIT STEP 3 - SAVINGS BUNDLES AND EXTRAS */}
            <div className="bg-white p-6 rounded-3xl border border-[#2C2416]/5 shadow-sm space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-[#2C2416]/10">
                <span className="w-7 h-7 rounded-sm bg-[#2C2416] text-[#FAF7F2] flex items-center justify-center text-xs font-bold font-mono">03</span>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#2C2416]">Krok 3: Pakiety promocyjne &amp; Dodatki premium</h3>
                  <p className="text-[9px] text-neutral-400 font-mono uppercase tracking-wider">Oszczędzaj kupując zestawy i dodaj ręczne uszlachetnienia</p>
                </div>
              </div>

              {/* Bundles Options */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-widest text-[#2C2416]/60 font-mono block">
                  Wybierz Pakiety i oszczędzaj:
                </label>
                <div className="grid grid-cols-1 gap-2">
                  
                  {/* Option Solo */}
                  <div
                    onClick={() => handleFieldChange('selectedPackage', 'solo')}
                    className={`p-3.5 rounded-xl border-2 text-left cursor-pointer transition-colors flex justify-between items-center ${
                      (!customization.selectedPackage || customization.selectedPackage === 'solo')
                        ? 'border-[#C8765A] bg-[#C8765A]/5'
                        : 'border-[#2C2416]/10 bg-white hover:border-[#2C2416]/20'
                    }`}
                  >
                    <div>
                      <span className="block text-xs font-bold text-[#2C2416]">Pakiet Solo (1 plakat)</span>
                      <span className="block text-[10px] text-neutral-500">Standardowy pojedynczy druk Twojego wspomnienia</span>
                    </div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 font-semibold">Standard</span>
                  </div>

                  {/* Option Duo */}
                  <div
                    onClick={() => handleFieldChange('selectedPackage', 'duo')}
                    className={`p-3.5 rounded-xl border-2 text-left cursor-pointer transition-colors flex justify-between items-center ${
                      customization.selectedPackage === 'duo'
                        ? 'border-[#C8765A] bg-[#C8765A]/5'
                        : 'border-[#2C2416]/10 bg-white hover:border-[#2C2416]/20'
                    }`}
                  >
                    <div>
                      <span className="block text-xs font-bold text-[#2C2416] flex items-center gap-2">
                        Pakiet DUET (Zestaw 2 plakatów) 
                        <span className="text-[9px] font-mono bg-[#C8765A] text-white py-0.5 px-1.5 rounded-full uppercase">Drugi -30%!</span>
                      </span>
                      <span className="block text-[10px] text-neutral-500">Doskonały pomysł na prezent dla rodziców lub partnera</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-red-600 font-bold text-[10px] uppercase tracking-wider">Drugi -30%</span>
                      <span className="block text-[#2C9A84] text-[9px] font-bold">Zapisujesz ~35 zł</span>
                    </div>
                  </div>

                  {/* Option Trio */}
                  <div
                    onClick={() => handleFieldChange('selectedPackage', 'trio')}
                    className={`p-3.5 rounded-xl border-2 text-left cursor-pointer transition-colors flex justify-between items-center ${
                      customization.selectedPackage === 'trio'
                        ? 'border-[#C8765A] bg-[#C8765A]/5'
                        : 'border-[#2C2416]/10 bg-white hover:border-[#2C2416]/20'
                    }`}
                  >
                    <div>
                      <span className="block text-xs font-bold text-[#2C2416] flex items-center gap-2">
                        Pakiet GALERIA TRIO (3 plakaty) 
                        <span className="text-[9px] font-mono bg-amber-600 text-white py-0.5 px-1.5 rounded-full uppercase">Trzeci -50%!</span>
                      </span>
                      <span className="block text-[10px] text-neutral-500">Stwórz imponujący układ ścienny w salonie</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-red-600 font-bold text-[10px] uppercase tracking-wider font-mono">Trzeci -50%</span>
                      <span className="block text-[#2C9A84] text-[9px] font-bold">Zapisujesz ~70 zł</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Luxury additions / Cross-selling checkboxes */}
              <div className="space-y-2 pt-3 border-t border-[#2C2416]/5">
                <label className="text-xs font-bold uppercase tracking-widest text-[#2C2416]/60 font-mono block">
                  Uszlachetnienia &amp; Ochrona Premium:
                </label>
                <div className="space-y-2">
                  
                  {/* Seal check */}
                  <div
                    onClick={() => handleFieldChange('hasPremiumSeal', !customization.hasPremiumSeal)}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      customization.hasPremiumSeal ? 'border-amber-600 bg-amber-500/5' : 'border-[#2C2416]/10 bg-white hover:border-[#2C2416]/20'
                    }`}
                  >
                    <div className="flex gap-2.5 items-center text-left max-w-[85%]">
                      <span className="text-lg">🏵️</span>
                      <div>
                        <span className="block text-xs font-bold text-[#2C2416]">Złote ręczne tłoczenie pieczęci (+19 zł)</span>
                        <span className="block text-[10px] text-[#2C2416]/60">Dodaje luksusowy znak autentyczności na dnie każdego projektu</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={!!customization.hasPremiumSeal}
                      onChange={() => {}}
                      className="accent-amber-600 cursor-pointer pointer-events-none"
                    />
                  </div>

                  {/* Insurance check */}
                  <div
                    onClick={() => handleFieldChange('hasInsurance', !customization.hasInsurance)}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      customization.hasInsurance ? 'border-indigo-600 bg-indigo-500/5' : 'border-[#2C2416]/10 bg-white hover:border-[#2C2416]/20'
                    }`}
                  >
                    <div className="flex gap-2.5 items-center text-left max-w-[85%]">
                      <span className="text-lg">📦</span>
                      <div>
                        <span className="block text-xs font-bold text-[#2C2416]">Gwarancja transportowa "Bezstłuczkowo" (+9 zł)</span>
                        <span className="block text-[10px] text-[#2C2416]/60">Kurier potłukł szkło? Natychmiast wysyłamy całkowicie nową ramę na nasz koszt</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={!!customization.hasInsurance}
                      onChange={() => {}}
                      className="accent-indigo-600 cursor-pointer pointer-events-none"
                    />
                  </div>

                  {/* Giftwrap check */}
                  <div
                    onClick={() => handleFieldChange('hasGiftWrap', !customization.hasGiftWrap)}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      customization.hasGiftWrap ? 'border-[#C8765A] bg-[#C8765A]/5' : 'border-[#2C2416]/10 bg-white hover:border-[#2C2416]/20'
                    }`}
                  >
                    <div className="flex gap-2.5 items-center text-left max-w-[85%]">
                      <span className="text-lg">🎁</span>
                      <div>
                        <span className="block text-xs font-bold text-[#2C2416]">Aksamitny eko-papier i owinięcie prezentowe (+29 zł)</span>
                        <span className="block text-[10px] text-[#2C2416]/60">Projekt zapakowany w butikową tekturę, liście i satynowe wstążki</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={!!customization.hasGiftWrap}
                      onChange={() => {}}
                      className="accent-[#C8765A] cursor-pointer pointer-events-none"
                    />
                  </div>

                </div>
              </div>
            </div>

          </div>

          {/* Action trigger checkout or cart drawer slider panels */}
          {(() => {
            let total = currentProductCost;
            if (customization.hasFrame) total += 79;
            if (customization.hasPremiumSeal) total += 19;
            if (customization.hasInsurance) total += 9;
            if (customization.hasGiftWrap) total += 29;

            if (customization.selectedPackage === 'duo') {
              total = total * 1.7;
            } else if (customization.selectedPackage === 'trio') {
              total = total * 2.5;
            }
            const finalVal = Math.round(total);
            
            return (
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleOrderAdd}
                  className="bg-[#C8765A] hover:bg-[#A0522D] text-white flex-1 py-4.5 px-8 rounded-full text-xs font-mono font-bold uppercase tracking-widest shadow-lg hover:shadow-xl transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Kup teraz: {finalVal} zł &rarr;</span>
                </button>
                
                <button
                  onClick={() => {
                    const singlePrice = calculatePrice();
                    onAddToCart({
                      id: `cart_${Date.now()}`,
                      productName: getPosterTypeLabel(customization.type),
                      price: singlePrice,
                      customization: { ...customization },
                    });
                    setTimeout(() => {
                      onOpenCart();
                    }, 100);
                  }}
                  className="border-2 border-[#2C2416] text-[#2C2416] hover:bg-[#2C2416]/5 py-4 px-6 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Dodaj do koszyka
                </button>
              </div>
            );
          })()}

          {formCompleted && (
            <div className="p-3 bg-emerald-600 text-white rounded-xl text-xs font-bold uppercase tracking-wide text-center animate-pulse">
              ✓ Produkt dodany do koszyka! Ładowanie podglądu kasy...
            </div>
          )}

          {/* Secure seals */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[9px] uppercase tracking-wider font-bold text-neutral-500 pt-2 font-mono">
            <div className="flex items-center gap-1.5 bg-[#F5F0E8] p-2 rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Bezpieczne płatności</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#F5F0E8] p-2 rounded-lg">
              <Truck className="w-3.5 h-3.5 text-indigo-600" />
              <span>Darmowa wysyłka</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#F5F0E8] p-2 rounded-lg">
              <History className="w-3.5 h-3.5 text-amber-600" />
              <span>14 dni na zwrot</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#F5F0E8] p-2 rounded-lg">
              <Sparkles className="w-3.5 h-3.5 text-pink-600" />
              <span>Muzealny Druk</span>
            </div>
          </div>

          {/* TAB SECTIONS */}
          <div className="pt-8 border-t border-[#2C2416]/10 space-y-4">
            <div className="flex border-b border-[#2C2416]/10 text-xs font-bold uppercase tracking-wider font-mono">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-3 px-4 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'details' ? 'border-[#C8765A] text-[#C8765A] font-bold' : 'border-transparent text-neutral-400'
                }`}
              >
                Szczegóły wykonania
              </button>
              <button
                onClick={() => setActiveTab('guide')}
                className={`pb-3 px-4 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'guide' ? 'border-[#C8765A] text-[#C8765A] font-bold' : 'border-transparent text-neutral-400'
                }`}
              >
                Jak drukujemy?
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 px-4 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'reviews' ? 'border-[#C8765A] text-[#C8765A] font-bold' : 'border-transparent text-neutral-400'
                }`}
              >
                Recenzje (1247)
              </button>
            </div>

            <div className="text-xs text-[#2C2416]/80 leading-relaxed font-sans space-y-3 min-h-[140px] pt-1">
              {activeTab === 'details' && (
                <ul className="list-disc pl-5 space-y-1.5">
                  <li><strong className="text-[#2C2416]">Papier muzealny:</strong> Matowy papier fotograficzny o gramaturze 230g/m² o wyjątkowo głębokim nasyceniu barw.</li>
                  <li><strong className="text-[#2C2416]">Atramenty pigmentowe:</strong> Oryginalne ekologiczne barwniki chroniące przed promieniowaniem UV (nie blakną przez pokolenia).</li>
                  <li><strong className="text-[#2C2416]">Ramy litego drewna:</strong> Nasze ekskluzywne ramy mają grubość 14mm, są wyposażone w odporne na stłuczenie szkło akrylowe.</li>
                  <li><strong className="text-[#2C2416]">Indywidualna opieka:</strong> Każdy plakat jest weryfikowany pod kątem ortografii i kompozycji przez grafika przed drukiem.</li>
                </ul>
              )}

              {activeTab === 'guide' && (
                <ol className="list-decimal pl-5 space-y-1.5">
                  <li>Wprowadzasz parametry i zamawiasz najpiękniejszy plakat.</li>
                  <li>W ciągu 24h nasz system astronomiczny lub zespół artystów przygotowuje spersonalizowany plakat.</li>
                  <li>Przesyłamy cyfrowe zrzuty na Twój e-mail — akceptujesz projekt lub prosisz o darmowe modyfikacje.</li>
                  <li>Po akceptacji zrzutu plakat leci na drukarki, jest starannie laminowany i wysyłany do Ciebie pod drzwi!</li>
                </ol>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <div className="p-3 bg-[#F5F0E8] rounded-xl flex gap-3 text-left">
                    <span className="text-[#C9A84C] font-bold shrink-0">★★★★★</span>
                    <div>
                      <p className="font-bold text-[#2C2416]">Magdalena S. <span className="font-normal text-neutral-400">(Wrocław)</span></p>
                      <p className="text-[#2C2416]/70 mt-0.5">Podgląd przyszedł błyskawicznie, wykonanie po prostu zwalające z nóg. Idealny design do nowoczesnego salonu!</p>
                    </div>
                  </div>
                  <div className="p-3 bg-[#F5F0E8] rounded-xl flex gap-3 text-left">
                    <span className="text-[#C9A84C] font-bold shrink-0">★★★★★</span>
                    <div>
                      <p className="font-bold text-[#2C2416]">Karol W. <span className="font-normal text-neutral-400">(Kraków)</span></p>
                      <p className="text-[#2C2416]/70 mt-0.5">Świetny kontakt, darmowe ramy były super chronione w paczce. Żona płakała ze wzruszenia pod choinką.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* POWIĄZANE PRODUKTY "Może Ci się spodobać" */}
      <div className="pt-24 space-y-8 border-t border-[#2C2416]/10 mt-16 text-left">
        <div className="space-y-1">
          <h3 className="font-mono text-xs uppercase tracking-widest text-[#C8765A] font-bold">Zaprojektuj coś jeszcze</h3>
          <h2 className="font-serif text-3xl text-[#2C2416] font-bold">Może Ci się spodobać</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              type: 'stars',
              title: 'Gwiaździsta noc',
              subtitle: 'Noc, w królestwie marzeń',
              dateString: '24 MAJA 2024',
              location: 'Gdańsk, PL',
              theme: 'night',
              size: '40x50',
              hasFrame: true,
            },
            {
              type: 'city',
              title: 'KRAKÓW',
              subtitle: 'SZEPTY ULICZEK STAREGO MIASTA',
              dateString: '18 PAŹDZIERNIKA 2023',
              location: '50° 03\' N • 19° 56\' E',
              theme: 'cream',
              size: '30x40',
              hasFrame: false,
            },
            {
              type: 'pet',
              title: 'Księżniczka Tosia',
              subtitle: 'Królowa Pledów i Poduszek',
              dateString: 'ROYAL PET',
              location: 'RENAISSANCE CAT',
              theme: 'gold',
              size: '40x50',
              hasFrame: true,
              petStyle: 'royal',
            },
             {
              type: 'music',
              title: 'AMARILLO BY MORNING',
              subtitle: 'TRACK 04: RECORD BREAKING VIBE',
              dateString: 'MAXIM: RELEASED 1983',
              location: 'COUNTRY MUSIC LEGEND',
              theme: 'black',
              size: '40x50',
              hasFrame: false,
            },
            {
              type: 'car',
              title: '911 Turbo S',
              subtitle: 'FLAT 6 / 650 HORSEPOWER',
              dateString: '0-100: 2.7S',
              location: 'LEGENDARY RACING',
              theme: 'black',
              size: '50x70',
              hasFrame: true,
            },
          ].map((prod, index) => (
             <div
               key={index}
               onClick={() => {
                 onUpdateCustomization({
                   type: prod.type as any,
                   title: prod.title,
                   subtitle: prod.subtitle,
                   dateString: prod.dateString,
                   location: prod.location,
                   theme: prod.theme as any,
                   size: prod.size as any,
                   hasFrame: prod.hasFrame,
                   petStyle: (prod as any).petStyle as any,
                   passionTheme: (prod as any).passionTheme as any,
                   quantity: 1,
                 });
                 window.scrollTo(0, 80);
               }}
               className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#2C2416]/5 hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
             >
               <div className="aspect-[3/4] relative rounded-xl overflow-hidden shadow-xs mb-3">
                 <PosterMock customization={prod as any} />
               </div>
               <div className="text-left">
                 <h4 className="font-serif font-bold text-sm text-[#2C2416]">
                   {prod.type === 'stars' && 'Mapa Gwiazd Premium'}
                   {prod.type === 'city' && 'Artystyczna Mapa Ulic'}
                   {prod.type === 'pet' && 'Królewski Portret'}
                   {prod.type === 'music' && 'Muzyczny Sentyment'}
                   {prod.type === 'car' && 'Kolekcja Moto Klasyk'}
                 </h4>
                 <p className="font-mono text-[10px] text-[#C8765A] font-semibold uppercase mt-0.5">
                  od 119 zł
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Mobile Mini-Preview */}
      <div 
        className={`fixed bottom-6 right-6 z-40 lg:hidden transform transition-all duration-500 ease-out flex flex-col items-end gap-2 ${
          showMobilePreview ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-90 pointer-events-none'
        }`}
      >
        <button
          onClick={() => {
            window.scrollTo({ top: 120, behavior: 'smooth' });
          }}
          className="bg-[#2C2416] text-[#FAF7F2] text-[10px] font-mono font-bold uppercase tracking-wider py-1.5 px-3.5 rounded-full shadow-md hover:bg-[#C8765A] transition-colors flex items-center gap-1.5"
        >
          <Eye size={12} />
          <span>Powróć do podglądu</span>
        </button>

        <div 
          onClick={() => {
            window.scrollTo({ top: 120, behavior: 'smooth' });
          }}
          className="bg-white p-2 rounded-2xl shadow-2xl border border-[#2C2416]/10 flex items-center gap-3 cursor-pointer select-none ring-1 ring-black/5 hover:border-[#C8765A] active:scale-95 transition-all w-[240px]"
        >
          {/* Miniature wrapper with exact scaling factor to prevent element overflow */}
          <div className="w-12 h-16 rounded-lg overflow-hidden border border-[#2C2416]/5 relative shrink-0 shadow-sm bg-[#FAF7F2]">
            <div className="scale-[0.35] origin-top-left w-[285%] h-[285%] select-none pointer-events-none">
              <PosterMock customization={customization} />
            </div>
          </div>

          <div className="text-left overflow-hidden">
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#C8765A] block truncate">
              Twój projekt live
            </span>
            <h4 className="font-serif font-bold text-xs text-[#2C2416] truncate">
              {customization.title || 'Zaprojektuj plakat'}
            </h4>
            <p className="font-mono text-[9px] text-[#2C2416]/50 truncate mt-0.5">
              {customization.subtitle || 'Spersonalizowany plakat'}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
