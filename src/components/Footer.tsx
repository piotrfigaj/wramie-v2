import React from 'react';
import { Instagram, Facebook, Compass, ShieldAlert } from 'lucide-react';
import { AppView } from '../App';

interface FooterProps {
  onNavigate: (view: AppView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#1C1510] text-[#FAF7F2] pt-16 pb-8 px-6 md:px-12 border-t border-white/5 font-sans mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
        
        {/* Column 1 - Brand description */}
        <div className="space-y-4">
          <div 
            onClick={() => {
              onNavigate('home');
              window.scrollTo(0, 0);
            }}
            className="font-serif italic font-bold text-2xl tracking-normal text-white cursor-pointer selection:bg-transparent"
          >
            wramie<span className="text-[#C8765A] font-extrabold">.</span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed max-w-[240px]">
            Butikowe studio personalizowanych plakatów premium. Z miłości do najpiękniejszych chwil, astronomii, rysunku rzemieślniczego oraz kochanych czworonogów.
          </p>
          <div className="flex gap-3 text-neutral-400">
            <a href="#" className="hover:text-[#C8765A] transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-[#C8765A] transition-colors"><Facebook className="w-5 h-5" /></a>
          </div>
        </div>

        {/* Column 2 - Shop links */}
        <div className="space-y-4 text-xs font-mono uppercase tracking-wider">
          <h4 className="font-serif italic font-bold text-sm text-white capitalize tracking-normal">Nasza Oferta</h4>
          <ul className="space-y-2.5 text-neutral-400 font-sans tracking-normal capitalize">
            <li><button onClick={() => { onNavigate('kategoria-gwiazdy'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors cursor-pointer text-left block">🌌 Mapa Gwiazd Premium</button></li>
            <li><button onClick={() => { onNavigate('katalog'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors cursor-pointer text-left block">🗺️ Mapa Miasta / Wspólne drogi</button></li>
            <li><button onClick={() => { onNavigate('katalog'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors cursor-pointer text-left block">👑 Rzemieślniczy Portret Pupila</button></li>
            <li><button onClick={() => { onNavigate('katalog'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors cursor-pointer text-left block">🎵 Plakaty Muzyczne i Moto</button></li>
          </ul>
        </div>

        {/* Column 3 - Help */}
        <div className="space-y-4 text-xs font-mono uppercase tracking-wider">
          <h4 className="font-serif italic font-bold text-sm text-white capitalize tracking-normal">Pomoc &amp; Informacje</h4>
          <ul className="space-y-2.5 text-neutral-400 font-sans tracking-normal capitalize">
            <li><button onClick={() => onNavigate('jak-dziala')} className="hover:text-white transition-colors cursor-pointer text-left block text-neutral-400 leading-normal border-none p-0">Sposób pakowania i dostawy</button></li>
            <li><button onClick={() => onNavigate('jak-dziala')} className="hover:text-white transition-colors cursor-pointer text-left block text-neutral-400 leading-normal border-none p-0">Czas realizacji zamówienia</button></li>
            <li><button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors cursor-pointer text-left block text-neutral-400 leading-normal border-none p-0">Wymiana, zwroty i reklamacje</button></li>
            <li><button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors cursor-pointer text-left block text-neutral-400 leading-normal border-none p-0">Regulamin zakupów studenckich</button></li>
          </ul>
        </div>

        {/* Column 4 - Trust icons */}
        <div className="space-y-4 text-left">
          <h4 className="font-serif italic font-bold text-sm text-white">Dostawy &amp; Płatności</h4>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Korzystamy wyłącznie z najbezpieczniejszych bramek płatniczych w kraju. Każdą przesyłkę w pełni ubezpieczamy.
          </p>
          
          {/* Trust logos */}
          <div className="grid grid-cols-3 gap-2 text-[8px] font-mono font-bold text-center text-white/50">
            <div className="border border-white/10 rounded p-1.5 flex flex-col justify-center items-center">
              <span className="text-[10px] text-white">⚡ BLIK</span>
              <span className="opacity-60 text-[6px]">Szybki przelew</span>
            </div>
            <div className="border border-white/10 rounded p-1.5 flex flex-col justify-center items-center">
              <span className="text-[10px] text-emerald-400">✓ P24</span>
              <span className="opacity-60 text-[6px]">Przelewy24</span>
            </div>
            <div className="border border-white/10 rounded p-1.5 flex flex-col justify-center items-center">
              <span className="text-[10px] text-[#F2C4A0]">InPost</span>
              <span className="opacity-60 text-[6px]">Paczkomaty</span>
            </div>
          </div>
          
          <div className="flex gap-2 items-center text-[10px] text-neutral-500 font-mono">
            <span className="text-emerald-500 font-bold">🔒 Połączenie SSL</span>
            <span>&bull;</span>
            <span>Bezpieczne zakupy</span>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-500 gap-4">
        <div>
          <span>© 2026 wramie.com. Wszelkie prawa zastrzeżone.</span>
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white transition-all">Polityka prywatności</a>
          <span>|</span>
          <a href="#" className="hover:text-white transition-all">Regulamin sklepu</a>
        </div>
        <div className="font-sans italic text-[11px]">
          Zaprojektowane z ♥ we Wrocławiu
        </div>
      </div>
    </footer>
  );
};
