import React, { useState, useEffect } from 'react';
import { Star, Shield, ArrowRight, Sparkles, CheckCircle2, Calendar, Edit3, Award, MessageSquare } from 'lucide-react';
import { PosterCustomization } from '../types';

// @ts-ignore
import starsCollectionMockup from '../assets/images/stars_collection_mockup_1780355544639.png';

interface CategoryStarsViewProps {
  onNavigate: (view: 'home' | 'product' | 'katalog' | 'kategoria-gwiazdy' | 'o-nas' | 'jak-dziala' | 'faq') => void;
  onSelectProduct: (product: PosterCustomization) => void;
}

export const CategoryStarsView: React.FC<CategoryStarsViewProps> = ({ onNavigate, onSelectProduct }) => {
  const [selectedStyle, setSelectedStyle] = useState<number>(0);
  const [visibleProductsCount, setVisibleProductsCount] = useState<number>(8);
  
  // Generating sixty random stars static coordinates once, for standard high fidelity
  const [stars, setStars] = useState<{ id: number; top: number; left: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < 60; i++) {
      arr.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2.5 + 1.2,
        delay: Math.random() * 4,
      });
    }
    setStars(arr);
  }, []);

  const stylesList = [
    {
      id: 0,
      name: 'Nocny Błękit',
      desc: 'Klasyczny, romantyczny',
      gradient: 'from-[#172554] to-[#0f172a]',
      textColor: 'text-sky-200',
      price: 'od 119 zł',
    },
    {
      id: 1,
      name: 'Elegancka Czerń',
      desc: 'Minimalistyczny, ponadczasowy',
      gradient: 'from-[#0a0a0a] to-[#18181b]',
      textColor: 'text-neutral-300',
      price: 'od 119 zł',
    },
    {
      id: 2,
      name: 'Złoty Zachód',
      desc: 'Ciepły, luksusowy',
      gradient: 'from-[#3c1e08] to-[#1a0f02]',
      textColor: 'text-amber-200/90',
      price: 'od 129 zł',
    },
    {
      id: 3,
      name: 'Kremowy Minimalizm',
      desc: 'Nowoczesny, skandynawski',
      gradient: 'from-[#fdfcfa] to-[#f4f2ee]',
      textColor: 'text-[#C8765A]',
      price: 'od 119 zł',
    },
  ];

  const occasions = [
    { emoji: '💍', name: 'Rocznica ślubu', desc: 'Uwiecznij waszą wyjątkową datę i najjaśniejsze niebo.' },
    { emoji: '👶', name: 'Narodziny dziecka', desc: 'Gwiazdy w unikalnym dniu przyjścia na świat nowego członka rodziny.' },
    { emoji: '💑', name: 'Walentynki', desc: 'Pierwszy pocałunek, propozycja lub spotkanie pod gwiazdami.' },
    { emoji: '🎓', name: 'Absolwent szkoły', desc: 'Wieczór wielkiego sukcesu i moment dający początek marzeniom.' },
    { emoji: '🏠', name: 'Nowe mieszkanie', desc: 'Niebiosa sprzyjające w dniu odebrania kluczy do Waszej oazy.' },
    { emoji: '🎂', name: 'Urodziny bliskiej osoby', desc: 'Twoja wyjątkowa noc urodzin we wspaniałym świetle gwiazd.' },
  ];

  // Specific grid variants matching catalog cards style
  const mockProductsList = [
    { id: 'cs_p_1', title: 'Aesthetic Deep Sky Blue Poster', theme: 'night', price: 119, oldPrice: 149, iconVal: '✦' },
    { id: 'cs_p_2', title: 'Carbon Clean Black Star Map', theme: 'black', price: 119, oldPrice: 149, iconVal: '✦' },
    { id: 'cs_p_3', title: 'Gold Foil Premium Amber Poster', theme: 'gold', price: 129, oldPrice: 179, iconVal: '✦' },
    { id: 'cs_p_4', title: 'Creamy Scandinavian Soft Map', theme: 'cream', price: 119, oldPrice: 149, iconVal: '✦' },
    { id: 'cs_p_5', title: 'Nasza Wspólna Droga Do Gwiazd', theme: 'night', price: 129, oldPrice: 159, iconVal: '✦' },
    { id: 'cs_p_6', title: 'Górski Szczyt Nocnej Konstelacji', theme: 'black', price: 119, oldPrice: 149, iconVal: '✦' },
    { id: 'cs_p_7', title: 'Wieczór nad Tatrami — Starry Peak', theme: 'gold', price: 129, oldPrice: 169, iconVal: '✦' },
    { id: 'cs_p_8', title: 'Lekki Pastelowy Szkic Astronomiczny', theme: 'cream', price: 119, oldPrice: 149, iconVal: '✦' },
    { id: 'cs_p_9', title: 'Gwiazdy Nad Bałtykiem Sunset Coast', theme: 'night', price: 119, oldPrice: 149, iconVal: '✦' },
    { id: 'cs_p_10', title: 'Dark Cosmic Void Retro Spec', theme: 'black', price: 129, oldPrice: 159, iconVal: '✦' },
    { id: 'cs_p_11', title: 'Golden Helix Nebula Vintage Frame', theme: 'gold', price: 139, oldPrice: 189, iconVal: '✦' },
    { id: 'cs_p_12', title: 'Chantal Rose Premium Minimal Star', theme: 'cream', price: 119, oldPrice: 149, iconVal: '✦' },
  ];

  const handleStartCustomizer = () => {
    onSelectProduct({
      type: 'stars',
      title: 'Natalia & Kacper',
      subtitle: 'Pod gwiazdami wszystko się zaczęło',
      dateString: '23 LIPCA 2025',
      location: 'Wrocław, PL',
      theme: 'night',
      size: '40x50',
      hasFrame: true,
      quantity: 1,
    });
    onNavigate('product');
  };

  return (
    <div id="page-kategoria-gwiazdy" className="page w-full min-h-screen bg-[#FAF7F2] pb-16 selection:bg-amber-100/60 text-left pt-20">
      
      {/* 1. HERO — PEŁNOEKRANOWY, IMMERSYJNY */}
      <section className="relative min-h-[85vh] py-16 flex items-center justify-center overflow-hidden bg-[#0D1B2A] text-white">
        
        {/* CSS twinkle stars */}
        <div className="absolute inset-0 z-0">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute bg-white rounded-full animate-pulse transition-opacity duration-1000"
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: Math.random() * 0.7 + 0.3,
                animationDelay: `${star.delay}s`,
                animationDuration: `${Math.random() * 4 + 2}s`,
              }}
            />
          ))}
        </div>

        {/* Soft elegant glowing overlays */}
        <div className="absolute top-[20%] left-[-10%] w-[50%] aspect-square rounded-full bg-blue-900/40 filter blur-[150px] opacity-60 pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] aspect-square rounded-full bg-[#1e293b]/50 filter blur-[130px] opacity-50 pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Column Left: text contents */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#FAF7F2]/60 uppercase">
              <span>Strona główna</span>
              <span>&rarr;</span>
              <span className="text-white">Katalog</span>
              <span>&rarr;</span>
              <span className="text-[#C9A84C]">Mapa Gwiazd</span>
            </div>

            <span className="inline-block text-[#C9A84C] font-mono text-[11px] font-bold tracking-[0.15em] uppercase border border-[#C9A84C]/30 px-3 py-1 rounded-full bg-[#C9A84C]/5">
              ✦ WYJĄTKOWA KATEGORIA
            </span>
            
            <div className="space-y-4">
              <h1 className="font-serif text-5xl md:text-[68px] font-bold tracking-tight text-white leading-[1.05]">
                Mapa Gwiazd <br />
                <em className="text-[#C9A84C] not-italic italic font-serif font-light">Twoja noc,</em> <br />
                na zawsze.
              </h1>
              <p className="font-sans text-[#FAF7F2]/80 text-base md:text-lg leading-[1.7] max-w-xl">
                Podaj datę i miejsce — astronomia zrobi resztę. Odtwarzamy dokładny układ konstelacji z dowolnego momentu w historii. Dzień Waszego ślubu, narodziny dziecka, pierwszy wspólny krok.
              </p>
            </div>

            {/* Icons row */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-center gap-3 text-sm font-sans text-neutral-200">
                <span className="w-8 h-8 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C] text-xs font-bold">1</span>
                <span>Wybierz magiczną datę i położenie geograficzne</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-sans text-neutral-200">
                <span className="w-8 h-8 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C] text-xs font-bold">2</span>
                <span>Dodaj imiona, osobiste słowa i własną dedykację</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-sans text-neutral-200">
                <span className="w-8 h-8 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C] text-xs font-bold">3</span>
                <span>Dopasuj stylowe barwy i odbierz podgląd PDF w 24h</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4">
              <button
                onClick={handleStartCustomizer}
                className="bg-[#C9A84C] hover:bg-[#b0903c] text-[#0D1B2A] text-xs font-bold tracking-widest uppercase px-10 py-5 rounded-full shadow-xl hover:shadow-[#C9A84C]/10 transition-all cursor-pointer transform hover:scale-[1.03]"
              >
                Stwórz swoją Mapę Gwiazd &rarr;
              </button>
              <div className="text-left py-1 text-xs text-white/60 font-medium">
                <span className="block text-white font-semibold">Ceny od 119 zł</span>
                <span>Darmowa i ubezpieczona wysyłka</span>
              </div>
            </div>
          </div>

          {/* Column Right: Elegant golden framed astronomical canvas mockup */}
          <div className="lg:col-span-5 flex justify-center pb-8 lg:pb-0">
            <div 
              id="mockup-huge-frame"
              className="relative w-full max-w-[390px] aspect-[3/4] rounded-2xl bg-[#111111] p-3 shadow-[0_25px_60px_rgba(0,0,0,0.6)] border-[14px] border-[#1c1917]"
              style={{
                boxShadow: '0 25px 60px -15px rgba(0,0,0,0.8), inset 0 0 10px rgba(255,255,255,0.05)'
              }}
            >
              {/* Stars astronomical map inner card */}
              <div className="w-full h-full bg-gradient-to-b from-[#111c2e] to-[#0A0D14] rounded overflow-hidden flex flex-col justify-between p-6 relative select-none">
                
                {/* Constellation overlay */}
                <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-300 via-transparent to-transparent" />

                {/* Date & location info on top of the map */}
                <div className="text-center space-y-0.5 z-10 text-[9px] text-[#FAF7F2]/50 font-mono tracking-widest uppercase">
                  <span>WROCŁAW, POLAND</span>
                  <span className="block opacity-75">51° 06&apos; N &bull; 17° 02&apos; E</span>
                </div>

                {/* Large astronomical circle */}
                <div className="relative w-full aspect-square flex items-center justify-center my-3">
                  <div className="absolute inset-0 border-2 border-[#C9A84C] rounded-full opacity-60 flex items-center justify-center shadow-[0_0_15px_rgba(201,168,76,0.15)]" />
                  
                  {/* Glowing milky way diagonal */}
                  <div className="absolute w-[200px] h-[50px] bg-white rounded-full opacity-5 blur-[25px] rotate-45 pointer-events-none" />

                  {/* Star circles with lines */}
                  <svg className="absolute w-[80%] h-[80%] opacity-80" viewBox="0 0 100 100">
                    {/* Constellation lines */}
                    <line x1="25" y1="30" x2="45" y2="40" stroke="white" strokeWidth="0.4" strokeDasharray="1 1" />
                    <line x1="45" y1="40" x2="70" y2="35" stroke="white" strokeWidth="0.4" strokeDasharray="1 1" />
                    <line x1="70" y1="35" x2="80" y2="60" stroke="white" strokeWidth="0.4" strokeDasharray="1 1" />
                    <line x1="45" y1="40" x2="50" y2="70" stroke="white" strokeWidth="0.4" />
                    <line x1="50" y1="70" x2="25" y2="80" stroke="white" strokeWidth="0.4" strokeDasharray="1 1" />

                    {/* Nodes (Stars) */}
                    <circle cx="25" cy="30" r="1.5" fill="#C9A84C" className="animate-pulse" />
                    <circle cx="45" cy="40" r="2" fill="white" />
                    <circle cx="70" cy="35" r="1.5" fill="white" />
                    <circle cx="80" cy="60" r="1.8" fill="#C9A84C" />
                    <circle cx="50" cy="70" r="2.2" fill="white" />
                    <circle cx="25" cy="80" r="1" fill="white" />

                    {/* Fills of minor stars */}
                    <circle cx="15" cy="50" r="0.8" fill="white" />
                    <circle cx="85" cy="20" r="1.2" fill="white" opacity="0.6" />
                    <circle cx="60" cy="15" r="0.7" fill="#C9A84C" />
                  </svg>
                </div>

                {/* Sub-text labels below circle */}
                <div className="text-center space-y-2 z-10 w-full">
                  <span className="text-[9px] font-mono tracking-[4px] text-white/40 block pb-1 border-b border-white/5 uppercase">
                    WŚRÓD GWIAZD WSZYSTKO SIĘ ZACZĘŁO
                  </span>
                  
                  {/* Elegant typography pairing: script for names, sans for metadata */}
                  <h3 className="font-serif italic font-bold text-xl text-white tracking-widest mt-1">
                    Natalia &amp; Kacper
                  </h3>
                  
                  <span className="block text-[8px] font-mono tracking-widest text-[#C9A84C] uppercase font-bold">
                    23 LIPCA 2025 &bull; 21:15
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. WARIANTY STYLÓW (sekcja pod hero) */}
      <section className="py-20 bg-[#FAF7F2] border-b border-[#E8DFD0]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center space-y-12">
          <div className="space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-mono font-bold tracking-widest text-[#C8765A] uppercase block">PERSONALIZACJA FORM</span>
            <h2 className="font-serif text-3.5xl md:text-5xl font-bold text-[#2C2416] tracking-tight">
              Wybierz swój styl
            </h2>
            <p className="font-sans text-sm text-[#2C2416]/70 leading-relaxed">
              Każda paleta niesie ze sobą odmienny nastrój. Wybierz tę, która idealnie dopełni charakter wnętrza Twojego domu.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stylesList.map((style, i) => (
              <div
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`group bg-white rounded-3xl p-5 border cursor-pointer transition-all duration-350 flex flex-col justify-between min-h-[350px] text-left relative ${
                  selectedStyle === style.id
                    ? 'border-[#C8765A] ring-2 ring-[#C8765A]/15 bg-amber-50/5 scale-102'
                    : 'border-[#2C2416]/5 hover:border-[#C8765A]/40 hover:scale-[1.02]'
                }`}
              >
                <div className="space-y-4">
                  {/* Mini plakat representation */}
                  <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden relative flex items-center justify-center p-3">
                    <div className={`w-full h-full bg-gradient-to-br ${style.gradient} rounded-xl shadow-inner relative flex flex-col justify-between p-4`}>
                      <span className="text-[6px] font-mono text-white/30 text-center tracking-widest block uppercase">WARSZAWA, 2025</span>
                      {/* Circle inside mini poster */}
                      <div className="w-[80%] aspect-square rounded-full border border-white/20 mx-auto flex items-center justify-center relative">
                        <span className="text-[7px] text-white/10">✦</span>
                      </div>
                      <span className={`text-[8px] font-serif text-center block ${style.textColor}`}>A&K</span>
                    </div>
                  </div>

                  <div className="space-y-1 px-1">
                    <h3 className="font-serif text-lg font-bold text-[#2C2416]">
                      {style.name}
                    </h3>
                    <p className="text-xs text-[#2C2416]/60 font-sans">
                      {style.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#2C2416]/5 text-xs font-mono font-bold uppercase tracking-wider text-[#2C2416]/40 group-hover:text-[#C8765A] px-1">
                  <span>{style.price}</span>
                  <span className={`${selectedStyle === style.id ? 'text-[#C8765A]' : ''}`}>&rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. INSPIRACJE / PRZYKŁADOWE OKAZJE */}
      <section className="py-20 bg-[#F5F0E8] border-b border-[#E8DFD0]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center space-y-12">
          <div className="space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-mono font-bold tracking-widest text-[#C8765A] uppercase block">INSPIRUJĄCE CHWILE</span>
            <h2 className="font-serif text-3.5xl md:text-5xl font-bold text-[#2C2416] tracking-tight">
              Idealne na każdą okazję
            </h2>
            <p className="font-sans text-sm text-[#2C2416]/70 leading-relaxed">
              Niebiosa uwiecznione w pamiętnym dniu, tworzące genialne kompozycje, pamiątki lub ekskluzywne prezenty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {occasions.map((occ, idx) => (
              <div 
                key={idx}
                className="bg-white p-6 md:p-8 rounded-3xl border border-[#2C2416]/5 hover:border-[#1C1510]/15 hover:bg-[#FAF7F2] transition-colors duration-300 text-left flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div className="space-y-3">
                  <div className="text-3.5xl">{occ.emoji}</div>
                  <h3 className="font-serif text-xl font-bold text-[#2C2416]">{occ.name}</h3>
                  <p className="text-xs md:text-[13px] text-[#2C2416]/65 leading-relaxed font-sans">{occ.desc}</p>
                </div>
                <button
                  onClick={handleStartCustomizer}
                  className="text-xs font-semibold text-[#C8765A] hover:text-[#A0522D] flex items-center gap-1 uppercase tracking-wider font-sans cursor-pointer self-start"
                >
                  <span>Zacznij tutaj &rarr;</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SEKCJA PROCESU (jak powstaje Twoja Mapa Gwiazd) */}
      <section className="py-20 bg-[#0D1B2A] text-white overflow-hidden relative border-b border-black">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center space-y-16 relative z-10">
          
          <div className="space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-mono font-bold tracking-widest text-[#C9A84C] uppercase block">PROJEKTOWANIE OD KULIS</span>
            <h2 className="font-serif text-3.5xl md:text-5xl font-bold text-white tracking-tight">
              Jak powstaje Twoja Mapa Gwiazd
            </h2>
            <p className="font-sans text-sm text-neutral-300 leading-relaxed">
              Astronomiczna dokładność spotyka się z dbałością o każdy piksel. Cała procedura zamknięta w 4 krokach.
            </p>
          </div>

          {/* Interactive Steps Visualisers */}
          <div className="relative mt-8 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 lg:gap-8 justify-center">
            
            {/* SVG horizontal connecting dash-line */}
            <div className="absolute top-[45px] left-[10%] right-[10%] h-[2px] hidden md:block opacity-25 z-0">
              <svg className="w-full h-full" viewBox="0 0 100 1" preserveAspectRatio="none">
                <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="#C9A84C" strokeWidth="2" strokeDasharray="5, 5" />
              </svg>
            </div>

            {[
              { num: '01', title: 'Podajesz datę i miejsce', desc: 'Możesz dodatkowo uzupełnić czas, imiona, dopasować ramę oraz osobistą dedykację.', icon: <Calendar className="w-6 h-6" /> },
              { num: '02', title: 'Algorytm liczy konstelację', desc: 'Analizujemy pozycję słońca, planet, gwiazdozbiorów na podstawie dokładnej bazy NASA.', icon: <Sparkles className="w-6 h-6" /> },
              { num: '03', title: 'Projektant finalizuje', desc: 'Udoskonalamy symetrię tekstu, krój czcionek, linie, sprawdzając spójność kompozycji.', icon: <Edit3 className="w-6 h-6" /> },
              { num: '04', title: 'Drukujemy i wysyłamy', desc: 'Przenosimy na szorstki papier 250g Fine Art, starannie pakujemy i nadajemy w bezpieczną podróż.', icon: <Award className="w-6 h-6" /> },
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center space-y-4 max-w-[280px] mx-auto group">
                {/* Large gold absolute number */}
                <div className="text-4xl md:text-5xl font-serif font-black text-[#C9A84C]/25 group-hover:text-[#C9A84C]/45 transition-colors leading-none tracking-tight">
                  {step.num}
                </div>
                
                {/* Icon blob */}
                <div className="w-[50px] h-[50px] rounded-full bg-[#1e2d3d] border border-[#C9A84C]/40 text-[#C9A84C] flex items-center justify-center group-hover:bg-[#C9A84C] group-hover:text-[#0D1B2A] transition-all duration-300 shadow-md">
                  {step.icon}
                </div>

                <div className="space-y-1 px-2">
                  <h4 className="font-serif text-[17px] font-bold text-white group-hover:text-[#C9A84C] transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-[11px] md:text-xs text-neutral-300 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. SIATKA PRODUKTÓW KATEGORII */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 text-left">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-[#C8765A] uppercase block">SPERSONALIZUJ SWÓJ EGZEMPLARZ</span>
            <h2 className="font-serif text-3.5xl md:text-4.5xl font-bold text-[#2C2416] tracking-tight">
              Wszystkie warianty Mapy Gwiazd
            </h2>
          </div>
          <span className="text-xs text-[#2C2416]/60 font-medium font-sans mt-2 md:mt-0">
            Dostępnych jest <strong className="text-[#C8765A]">47 wzorów</strong> w różnych konfiguracjach kolorystycznych
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockProductsList.slice(0, visibleProductsCount).map((p) => (
            <div 
              key={p.id}
              className="group bg-white rounded-3xl overflow-hidden border border-[#2C2416]/5 shadow-[0_4px_15px_rgba(44,36,22,0.03)] hover:shadow-[0_15px_30px_rgba(44,36,22,0.08)] hover:-translate-y-1.5 transition-all duration-350 flex flex-col justify-between"
            >
              {/* Upper representation */}
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 flex items-center justify-center p-3">
                <img 
                  src={starsCollectionMockup} 
                  alt={p.title} 
                  className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Badge top-left */}
                <div className="absolute top-3 left-3 bg-[#E8DFD0] text-[#2C2416]/80 text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase">
                  Mapa Gwiazd
                </div>

                {/* Badge top-right */}
                <div className="absolute top-3 right-3 bg-neutral-900 text-[#C9A84C] text-[9px] font-sans font-bold uppercase tracking-widest px-2.5 py-1 rounded shadow">
                  ★ Popularne
                </div>
              </div>

              {/* Bottom Info Details */}
              <div className="p-4 md:p-5 text-left flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <h3 className="font-serif text-[15px] md:text-base font-bold text-[#2C2416] group-hover:text-[#C8765A] transition-colors leading-tight line-clamp-2">
                    {p.title}
                  </h3>
                  <div className="flex items-center gap-1 font-sans">
                    <span className="text-amber-500 flex text-xs">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#C9A84C] text-[#C9A84C]" />
                      ))}
                    </span>
                    <span className="text-[11px] text-[#2C2416]/40 font-medium">(114 opinii)</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#2C2416]/5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-base md:text-lg font-bold text-[#C8765A]">{p.price} zł</span>
                    <span className="text-xs text-[#2C2416]/40 line-through font-medium">{p.oldPrice} zł</span>
                  </div>

                  <button
                    onClick={handleStartCustomizer}
                    className="w-full bg-[#C8765A] hover:bg-[#A0522D] text-white text-[11px] font-semibold uppercase tracking-wider py-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-250 cursor-pointer flex items-center justify-center"
                  >
                    <span>Personalizuj &rarr;</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load more triggers */}
        {visibleProductsCount < mockProductsList.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleProductsCount((prev) => prev + 4)}
              className="bg-white border border-[#2C2416]/10 hover:border-[#C8765A] text-[#2C2416] text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <span>Wczytaj więcej (39)</span>
              <span>&darr;</span>
            </button>
          </div>
        )}
      </section>

      {/* 6. OPINIE TYLKO DLA MAPY GWIAZD */}
      <section className="py-20 bg-[#F5F0E8] border-t border-b border-[#E8DFD0]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between text-left">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold tracking-widest text-[#C8765A] uppercase block">PRAWDZIWE EMOCJE</span>
              <h2 className="font-serif text-3.5xl md:text-4.5xl font-bold text-[#2C2416]">
                Co mówią nasi klienci
              </h2>
            </div>
            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <span className="text-[#C9A84C] text-lg font-bold">★ 4.97 / 5.0</span>
              <span className="text-xs text-[#2C2416]/50">(na podstawie 1,847 opinii)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { author: 'Sylwia K.', tag: 'Rocznica Ślubu', text: 'Plakat dotarł błyskawicznie. Układ gwiazd z dnia naszego ślubu wywołał łzy wzruszenia u męża. Druk i złote litery są absolutnie najwyższej jakości.', initials: 'SK' },
              { author: 'Marta & Janusz', tag: 'Narodziny syna', text: 'Zamówiliśmy mapę gwiazd na narodziny naszego pierwszego synka. Całość w czarnej aluminiowej ramie prezentuje się wspaniale w dziecięcym pokoiku.', initials: 'MJ' },
              { author: 'Filip B.', tag: 'Prezent Ślubny', text: 'Znakomity kontakt! Poprosiłem o poprawkę w tekście tuż przed pójściem do druku — wszystko załatwiliśmy w 10 minut za pomocą szybkiego maila. Polecam!', initials: 'FB' },
            ].map((rev, i) => (
              <div key={i} className="bg-white p-6 md:p-8 rounded-3xl border border-[#2C2416]/5 flex flex-col justify-between space-y-6 shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#F2C4A0]/20 text-[#C8765A] font-bold text-sm flex items-center justify-center">
                        {rev.initials}
                      </div>
                      <div className="text-left">
                        <h4 className="font-serif font-bold text-sm text-[#2C2416]">{rev.author}</h4>
                        <span className="text-[10px] text-[#C8765A] font-mono uppercase tracking-wider">{rev.tag}</span>
                      </div>
                    </div>
                    <div className="flex text-amber-400 text-xs">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className="w-3.5 h-3.5 fill-[#C9A84C] text-[#C9A84C]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs md:text-[13px] text-[#2C2416]/75 italic leading-relaxed font-sans">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>
                
                {/* Mini mockup decoration */}
                <div className="h-20 bg-[#FAF7F2] rounded-2xl flex items-center justify-center p-3 border border-[#2C2416]/5 gap-3">
                  <div className="w-10 h-10 bg-[#0D1B2A] rounded border border-white/10 flex items-center justify-center text-white text-[8px] font-serif">★</div>
                  <div className="text-left flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-[#2C2416] block truncate">Egzemplarz Sylwii</span>
                    <span className="text-[9px] text-neutral-400 block font-mono">30x40 cm &bull; Czarna Rama</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
