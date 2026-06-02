import React, { useState } from 'react';
import { X, Trash2, ShoppingCart, ShieldCheck, RefreshCw, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onRemoveItem,
  onClearCart,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  if (!isOpen) return null;

  const totalSum = cart.reduce((acc, item) => {
    let price = item.price;
    if (item.customization.hasFrame) {
      price += 79; // Frame premium added to cart totals
    }
    if (item.customization.hasPremiumSeal) {
      price += 19;
    }
    if (item.customization.hasInsurance) {
      price += 9;
    }
    if (item.customization.hasGiftWrap) {
      price += 29;
    }

    let itemTotal = price;
    if (item.customization.selectedPackage === 'duo') {
      itemTotal = price * 1.7;
    } else if (item.customization.selectedPackage === 'trio') {
      itemTotal = price * 2.5;
    } else {
      itemTotal = price * (item.customization.quantity || 1);
    }

    return acc + Math.round(itemTotal);
  }, 0);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderCompleted(true);
    }, 1800);
  };

  const handleFinish = () => {
    setOrderCompleted(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-100 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer content pane */}
      <div className="relative w-full max-w-md h-full bg-[#FAF7F2] shadow-2xl flex flex-col z-10 animate-slide-in">
        {/* Header */}
        <div className="p-6 border-b border-[#2C2416]/10 flex items-center justify-between bg-[#2C2416] text-white">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-peach text-[#F2C4A0]" />
            <h3 className="font-serif italic font-bold text-lg">Twój Koszyk</h3>
            <span className="bg-[#C8765A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full font-mono">
              {cart.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderCompleted ? (
          /* Order Complete Success Screen */
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-emerald-600" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-[#2C2416] mb-2">Dziękujemy za zamówienie!</h4>
            <p className="text-sm text-[#2C2416]/70 max-w-[280px] mb-6">
              Nasi graficy już pracują nad Twoim projektem. W ciągu 24h otrzymasz gotowy e-mail z podglądem do akceptacji!
            </p>
            <div className="bg-[#F5F0E8] p-4 rounded-xl w-full text-left border border-dashed border-[#2C2416]/20 mb-8 space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#2C2416]/60">ID Zamówienia:</span>
                <span className="font-bold text-[#2C2416]">#WR-2026-9284</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#2C2416]/60">Status:</span>
                <span className="text-emerald-600 font-bold uppercase">OPŁACONE (Przelewy24)</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#2C2416]/60">Dostawa:</span>
                <span className="text-[#2C2416] font-medium">Kurier InPost Paczkomaty</span>
              </div>
            </div>
            <button
              onClick={handleFinish}
              className="w-full bg-[#C8765A] hover:bg-[#A0522D] text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
            >
              Cudownie! Wróć do sklepu
            </button>
          </div>
        ) : cart.length === 0 ? (
          /* Empty state view */
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
            <ShoppingCart className="w-12 h-12 text-[#2C2416]/10 mb-4" />
            <h4 className="font-serif text-lg font-bold text-[#2C2416] mb-1">Twój koszyk jest pusty</h4>
            <p className="text-xs text-[#2C2416]/60 max-w-[240px] mb-6">
              Dodaj spersonalizowany plakat i zaprojektuj swoją własną wyjątkową pamiątkę w kilka chwil!
            </p>
            <button
              onClick={onClose}
              className="bg-[#C8765A] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider"
            >
              Zacznij Tworzyć
            </button>
          </div>
        ) : (
          /* Cart Item list */
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#F5F0E8] p-4 rounded-xl border border-[#2C2416]/5 flex gap-4 items-start shadow-xs hover:shadow-md transition-shadow"
                >
                  {/* Miniature Poster Art Mock representation */}
                  <div className="w-16 h-20 rounded border border-neutral-800 bg-neutral-900 overflow-hidden relative shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-slate-900 opacity-90 flex items-center justify-center">
                      <div className="text-[10px] text-peach font-serif italic text-white/80">
                        {item.customization.type === 'stars' && '✦'}
                        {item.customization.type === 'city' && '🗺️'}
                        {item.customization.type === 'pet' && '🐾'}
                        {item.customization.type === 'music' && '🎵'}
                        {item.customization.type === 'car' && '🏎️'}
                        {item.customization.type === 'passion' && '⚡'}
                      </div>
                    </div>
                  </div>

                  {/* Detail */}
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-sm font-bold text-[#2C2416] truncate">
                      {item.productName}
                    </p>
                    <p className="font-mono text-[10px] text-[#C8765A] font-semibold">
                      {item.customization.size} &bull;{' '}
                      {item.customization.theme === 'night' && 'Nocny Błękit'}
                      {item.customization.theme === 'black' && 'Elegancka Czerń'}
                      {item.customization.theme === 'gold' && 'Złoty Zachód'}
                      {item.customization.theme === 'cream' && 'Kremowy Minimalizm'}
                    </p>
                    
                    <ul className="text-[10px] text-[#2C2416]/60 mt-1 space-y-0.5 font-sans leading-tight">
                      <li>Tytuł: <span className="font-medium text-[#2C2416]">{item.customization.title || 'bez tytułu'}</span></li>
                      <li>Szczegóły: <span className="text-[#2C2416]">{item.customization.location || item.customization.dateString}</span></li>
                      {item.customization.hasFrame ? (
                        <li className="text-emerald-700 font-semibold">
                          ✓ Elegancka Rama (+79 zł)
                        </li>
                      ) : (
                        <li className="opacity-40">Bez ramy (sam wydruk)</li>
                      )}
                      {item.customization.hasPremiumSeal && (
                        <li className="text-amber-700 font-semibold">
                          ✓ Złota pieczęć tłoczona (+19 zł)
                        </li>
                      )}
                      {item.customization.hasInsurance && (
                        <li className="text-indigo-700 font-semibold">
                          ✓ Gwarancja bezstłuczkowa (+9 zł)
                        </li>
                      )}
                      {item.customization.hasGiftWrap && (
                        <li className="text-[#C8765A] font-semibold">
                          ✓ Pakowanie na prezent (+29 zł)
                        </li>
                      )}
                      {item.customization.selectedPackage === 'duo' && (
                        <li className="text-[#C8765A] font-bold">
                          🎁 Pakiet DUET (2 plakaty, drugi -30%)
                        </li>
                      )}
                      {item.customization.selectedPackage === 'trio' && (
                        <li className="text-[#C8765A] font-bold">
                          🎁 Pakiet TRIO (3 plakaty, trzeci -50%)
                        </li>
                      )}
                    </ul>

                    <div className="flex justify-between items-center mt-2.5">
                      <span className="font-sans text-xs text-[#2C2416] font-bold">
                        {item.customization.selectedPackage === 'duo' ? 'Zestaw: 2x Plakaty' : item.customization.selectedPackage === 'trio' ? 'Zestaw: 3x Plakaty' : `Ilość: ${item.customization.quantity || 1}`}
                      </span>
                      <span className="font-serif text-sm font-bold text-[#C8765A]">
                        {(() => {
                          let base = item.price;
                          if (item.customization.hasFrame) base += 79;
                          if (item.customization.hasPremiumSeal) base += 19;
                          if (item.customization.hasInsurance) base += 9;
                          if (item.customization.hasGiftWrap) base += 29;

                          if (item.customization.selectedPackage === 'duo') {
                            return Math.round(base * 1.7);
                          } else if (item.customization.selectedPackage === 'trio') {
                            return Math.round(base * 2.5);
                          }
                          return base * (item.customization.quantity || 1);
                        })()} zł
                      </span>
                    </div>
                  </div>

                  {/* Trash delete button */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1 hover:bg-[#2C2416]/5 text-[#2C2416]/50 hover:text-red-600 rounded transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Summation panel & checkout CTA */}
            <div className="p-6 bg-white border-t border-[#2C2416]/10 space-y-4">
              <div className="space-y-1.5 font-sans">
                <div className="flex justify-between text-xs text-[#2C2416]/60">
                  <span>Wydruki plakatowe</span>
                  <span>{cart.reduce((s, i) => s + i.price * (i.customization.quantity || 1), 0)} zł</span>
                </div>
                <div className="flex justify-between text-xs text-[#2C2416]/60">
                  <span>Ramy drewniane oak/classic</span>
                  <span>
                    {cart.reduce((s, i) => s + (i.customization.hasFrame ? 79 : 0) * (i.customization.quantity || 1), 0)} zł
                  </span>
                </div>
                <div className="flex justify-between text-xs text-emerald-700 font-semibold font-sans">
                  <span>Przesyłka premium kurierem</span>
                  <span>0 zł (Gratis!)</span>
                </div>
                <div className="h-[1px] bg-neutral-200 my-2" />
                <div className="flex justify-between items-baseline pt-1">
                  <span className="font-serif italic font-bold text-lg text-[#2C2416]">Razem do zapłaty:</span>
                  <span className="font-serif text-2xl font-bold text-[#C8765A]">{totalSum} zł</span>
                </div>
              </div>

              {/* Secure payment shield indicators */}
              <div className="flex gap-2 justify-center items-center py-2 bg-[#F5F0E8] rounded-lg text-[9px] text-[#2C2416]/60 uppercase tracking-wider font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Bezpieczne płatności Przelewy24 / BLIK</span>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-[#C8765A] hover:bg-[#A0522D] text-white text-sm font-bold uppercase tracking-widest py-3 rounded-full shadow-lg transition-transform transform active:scale-[0.98] disabled:opacity-80 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isCheckingOut ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Łączenie z bankiem...</span>
                  </>
                ) : (
                  <span>Przejdź do kasy ({totalSum} zł) →</span>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
