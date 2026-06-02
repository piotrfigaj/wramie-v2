import React, { useState, useEffect } from 'react';
import { Star, Eye, Gift, ShoppingBag, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { PosterCustomization } from '../types';

// @ts-ignore
import starsCollectionMockup from '../assets/images/stars_collection_mockup_1780355544639.png';
// @ts-ignore
import cityCollectionMockup from '../assets/images/city_collection_mockup_1780355561292.png';
// @ts-ignore
import petCollectionMockup from '../assets/images/pet_collection_mockup_1780355577426.png';
// @ts-ignore
import passionCollectionMockup from '../assets/images/passion_collection_mockup_1780355593307.png';

interface CatalogViewProps {
  onNavigate: (view: 'home' | 'product' | 'katalog' | 'kategoria-gwiazdy' | 'o-nas' | 'jak-dziala' | 'faq') => void;
  onSelectProduct: (product: PosterCustomization) => void;
}

interface ProductItem {
  id: string;
  category: 'stars' | 'city' | 'pet' | 'music' | 'car' | 'gdziesiepoznalismy';
  categoryLabel: string;
  badge?: 'Bestseller' | 'Nowość' | 'Okazja' | 'Rekomendacja';
  badgeColor?: string;
  title: string;
  price: number;
  oldPrice: number;
  theme: 'night' | 'black' | 'gold' | 'cream';
  rating: number;
  reviewsCount: number;
  imageMock: string;
  customizationProps: PosterCustomization;
}

export const CatalogView: React.FC<CatalogViewProps> = ({ onNavigate, onSelectProduct }) => {
  const [selectedFilter, setSelectedFilter] = useState<'wszystkie' | 'stars' | 'city' | 'pet' | 'music' | 'car' | 'gdziesiepoznalismy'>('wszystkie');
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [quickviewProduct, setQuickviewProduct] = useState<ProductItem | null>(null);

  // Define 24 products of 6 categories
  const products: ProductItem[] = [
    // 4x Mapa Gwiazd (stars)
    {
      id: 'p_stars_1',
      category: 'stars',
      categoryLabel: 'Mapa Gwiazd',
      badge: 'Bestseller',
      badgeColor: 'bg-[#C8765A] text-white',
      title: 'Mapa Gwiazd — Wieczór nad Krakowem',
      price: 119,
      oldPrice: 149,
      theme: 'night',
      rating: 5,
      reviewsCount: 89,
      imageMock: starsCollectionMockup,
      customizationProps: { type: 'stars', title: 'Natalia & Kacper', subtitle: 'Wieczór nad Krakowem', dateString: '2025-07-23', location: 'Kraków, PL', theme: 'night', size: '40x50', hasFrame: true, quantity: 1 }
    },
    {
      id: 'p_stars_2',
      category: 'stars',
      categoryLabel: 'Mapa Gwiazd',
      title: 'Konstelacja Miłości — Rocznica we Wrocławiu',
      price: 119,
      oldPrice: 159,
      theme: 'black',
      rating: 5,
      reviewsCount: 42,
      imageMock: starsCollectionMockup,
      customizationProps: { type: 'stars', title: 'Kasia & Tomek', subtitle: 'Nasza rocznica', dateString: '2023-09-12', location: 'Wrocław, PL', theme: 'black', size: '30x40', hasFrame: false, quantity: 1 }
    },
    {
      id: 'p_stars_3',
      category: 'stars',
      categoryLabel: 'Mapa Gwiazd',
      badge: 'Nowość',
      badgeColor: 'bg-emerald-600 text-white',
      title: 'Pod Niebem Warszawy — Chwila spotkania',
      price: 129,
      oldPrice: 169,
      theme: 'gold',
      rating: 5,
      reviewsCount: 17,
      imageMock: starsCollectionMockup,
      customizationProps: { type: 'stars', title: 'Alicja & Filip', subtitle: 'Pod Niebem Warszawy', dateString: '2024-11-05', location: 'Warszawa, PL', theme: 'gold', size: '50x70', hasFrame: true, quantity: 1 }
    },
    {
      id: 'p_stars_4',
      category: 'stars',
      categoryLabel: 'Mapa Gwiazd',
      title: 'Dwie Gwiazdy — Niebo nad Gdańskiem',
      price: 119,
      oldPrice: 149,
      theme: 'cream',
      rating: 4,
      reviewsCount: 23,
      imageMock: starsCollectionMockup,
      customizationProps: { type: 'stars', title: 'Marta & Michał', subtitle: 'Dwie Gwiazdy', dateString: '2022-08-30', location: 'Gdańsk, PL', theme: 'cream', size: '30x40', hasFrame: false, quantity: 1 }
    },

    // 4x Mapa Miasta (city)
    {
      id: 'p_city_1',
      category: 'city',
      categoryLabel: 'Mapa Miasta',
      badge: 'Bestseller',
      badgeColor: 'bg-[#C8765A] text-white',
      title: 'Artystyczna Mapa Wrocławia — Wspólne Drogi',
      price: 119,
      oldPrice: 149,
      theme: 'cream',
      rating: 5,
      reviewsCount: 112,
      imageMock: cityCollectionMockup,
      customizationProps: { type: 'city', title: 'WROCŁAW', subtitle: 'To tutaj się poznaliśmy', dateString: '2023-07-23', location: '51° 06\' N • 17° 02\' E', theme: 'cream', size: '50x70', hasFrame: true, quantity: 1 }
    },
    {
      id: 'p_city_2',
      category: 'city',
      categoryLabel: 'Mapa Miasta',
      title: 'Plan Architektoniczny Warszawy',
      price: 119,
      oldPrice: 149,
      theme: 'black',
      rating: 5,
      reviewsCount: 54,
      imageMock: cityCollectionMockup,
      customizationProps: { type: 'city', title: 'WARSZAWA', subtitle: 'Nasza stolica', dateString: '2021-05-15', location: '52° 13\' N • 21° 00\' E', theme: 'black', size: '40x50', hasFrame: false, quantity: 1 }
    },
    {
      id: 'p_city_3',
      category: 'city',
      categoryLabel: 'Mapa Miasta',
      badge: 'Okazja',
      badgeColor: 'bg-indigo-600 text-white',
      title: 'Romantyczny Gdańsk — Wspomnienia z wakacji',
      price: 109,
      oldPrice: 139,
      theme: 'gold',
      rating: 4,
      reviewsCount: 29,
      imageMock: cityCollectionMockup,
      customizationProps: { type: 'city', title: 'GDAŃSK', subtitle: 'Wakacyjne chwile', dateString: '2024-08-01', location: '54° 21\' N • 18° 38\' E', theme: 'gold', size: '30x40', hasFrame: true, quantity: 1 }
    },
    {
      id: 'p_city_4',
      category: 'city',
      categoryLabel: 'Mapa Miasta',
      title: 'Aesthetic Poznań Minimalist Map',
      price: 119,
      oldPrice: 149,
      theme: 'night',
      rating: 5,
      reviewsCount: 38,
      imageMock: cityCollectionMockup,
      customizationProps: { type: 'city', title: 'POZNAŃ', subtitle: 'Nowoczesny i elegancki', dateString: '2025-01-10', location: '52° 24\' N • 16° 55\' E', theme: 'night', size: '40x50', hasFrame: false, quantity: 1 }
    },

    // 4x Portret Pupila (pet)
    {
      id: 'p_pet_1',
      category: 'pet',
      categoryLabel: 'Portret Pupila',
      badge: 'Bestseller',
      badgeColor: 'bg-[#C8765A] text-white',
      title: 'Królewski Portret Kota — Maurycy I',
      price: 129,
      oldPrice: 169,
      theme: 'gold',
      rating: 5,
      reviewsCount: 143,
      imageMock: petCollectionMockup,
      customizationProps: { type: 'pet', title: 'Maurycy I', subtitle: 'Królewski Portret Pupila', dateString: 'ROYAL CAT', location: 'RENAISSANCE STYLE', theme: 'gold', size: '30x40', hasFrame: true, petStyle: 'royal', quantity: 1 }
    },
    {
      id: 'p_pet_2',
      category: 'pet',
      categoryLabel: 'Portret Pupila',
      title: 'Popartowy Portret Psa — Figo',
      price: 129,
      oldPrice: 159,
      theme: 'cream',
      rating: 5,
      reviewsCount: 67,
      imageMock: petCollectionMockup,
      customizationProps: { type: 'pet', title: 'Figo', subtitle: 'Ikona designu', dateString: 'CUTE DOG', location: 'POPART STYLE', theme: 'cream', size: '40x50', hasFrame: false, petStyle: 'popart', quantity: 1 }
    },
    {
      id: 'p_pet_3',
      category: 'pet',
      categoryLabel: 'Portret Pupila',
      badge: 'Nowość',
      badgeColor: 'bg-emerald-600 text-white',
      title: 'Szlachecki Portret Psa — Baron Aleksander',
      price: 139,
      oldPrice: 179,
      theme: 'black',
      rating: 5,
      reviewsCount: 19,
      imageMock: petCollectionMockup,
      customizationProps: { type: 'pet', title: 'Aleksander', subtitle: 'Dostojny Baron', dateString: 'ROYAL DOG', location: 'BAROQUE STYLE', theme: 'black', size: '50x70', hasFrame: true, petStyle: 'royal', quantity: 1 }
    },
    {
      id: 'p_pet_4',
      category: 'pet',
      categoryLabel: 'Portret Pupila',
      title: 'Królewska Dama — Portret Kotki Belli',
      price: 129,
      oldPrice: 169,
      theme: 'night',
      rating: 5,
      reviewsCount: 52,
      imageMock: petCollectionMockup,
      customizationProps: { type: 'pet', title: 'Bella I', subtitle: 'Królowa Salonów', dateString: 'ROYAL QUEEN', location: 'RENAISSANCE STYLE', theme: 'night', size: '40x50', hasFrame: false, petStyle: 'royal', quantity: 1 }
    },

    // 4x Plakaty Muzyczne (music)
    {
      id: 'p_music_1',
      category: 'music',
      categoryLabel: 'Plakat Muzyczny',
      badge: 'Bestseller',
      badgeColor: 'bg-[#C8765A] text-white',
      title: 'Stylizowany Vinyl — Ulubiony Album Muzyczny',
      price: 109,
      oldPrice: 139,
      theme: 'black',
      rating: 5,
      reviewsCount: 96,
      imageMock: passionCollectionMockup,
      customizationProps: { type: 'music', title: 'KULTOWY VINYL', subtitle: 'Retro Album', dateString: 'COLLECTORS LP', location: 'MUSIC IS LIFE', theme: 'black', size: '40x50', hasFrame: true, quantity: 1 }
    },
    {
      id: 'p_music_2',
      category: 'music',
      categoryLabel: 'Plakat Muzyczny',
      title: 'Wydruk Ścieżki Dźwiękowej Fali Audio',
      price: 109,
      oldPrice: 139,
      theme: 'cream',
      rating: 4,
      reviewsCount: 31,
      imageMock: passionCollectionMockup,
      customizationProps: { type: 'music', title: 'SOUNDWAVE ART', subtitle: 'Twoja Piosenka', dateString: '100% PERSONALIZED', location: 'AUDIO RECORD', theme: 'cream', size: '30x40', hasFrame: false, quantity: 1 }
    },
    {
      id: 'p_music_3',
      category: 'music',
      categoryLabel: 'Plakat Muzyczny',
      title: 'Retro Playlista Spotify Plakat',
      price: 119,
      oldPrice: 149,
      theme: 'night',
      rating: 5,
      reviewsCount: 47,
      imageMock: passionCollectionMockup,
      customizationProps: { type: 'music', title: 'LOVE PLAYLIST', subtitle: 'Lista Naszych Piosenek', dateString: 'BEST SONGS', location: 'SCAN CODE ART', theme: 'night', size: '40x50', hasFrame: true, quantity: 1 }
    },
    {
      id: 'p_music_4',
      category: 'music',
      categoryLabel: 'Plakat Muzyczny',
      badge: 'Okazja',
      badgeColor: 'bg-indigo-600 text-white',
      title: 'Retro Album Art Kolekcja Jazz',
      price: 99,
      oldPrice: 129,
      theme: 'gold',
      rating: 4,
      reviewsCount: 15,
      imageMock: passionCollectionMockup,
      customizationProps: { type: 'music', title: 'JAZZ NIGHTS', subtitle: 'Retro Jazz Festival', dateString: 'CHICAGO 1964', location: 'FINE MUSIC ART', theme: 'gold', size: '30x40', hasFrame: false, quantity: 1 }
    },

    // 4x Plakaty Moto (car)
    {
      id: 'p_moto_1',
      category: 'car',
      categoryLabel: 'Kolekcja Moto',
      badge: 'Bestseller',
      badgeColor: 'bg-[#C8765A] text-white',
      title: 'Kultowa Maszyna — Schemat Porsche 911',
      price: 119,
      oldPrice: 149,
      theme: 'black',
      rating: 5,
      reviewsCount: 84,
      imageMock: passionCollectionMockup,
      customizationProps: { type: 'car', title: 'PORSCHE 911', subtitle: 'Legenda Szos', dateString: 'PRODUCTION 1963', location: 'GERMAN ENGINEER', theme: 'black', size: '50x70', hasFrame: true, quantity: 1 }
    },
    {
      id: 'p_moto_2',
      category: 'car',
      categoryLabel: 'Kolekcja Moto',
      title: 'Retro Patent Motocykla Specyfikacja',
      price: 109,
      oldPrice: 139,
      theme: 'gold',
      rating: 5,
      reviewsCount: 22,
      imageMock: passionCollectionMockup,
      customizationProps: { type: 'car', title: 'VINTAGE MOTO', subtitle: 'Patent Techniczny', dateString: 'PATENT DRAWINGS', location: 'ENGINE DETAILED', theme: 'gold', size: '30x40', hasFrame: false, quantity: 1 }
    },
    {
      id: 'p_moto_3',
      category: 'car',
      categoryLabel: 'Kolekcja Moto',
      badge: 'Nowość',
      badgeColor: 'bg-emerald-600 text-white',
      title: 'Klasyk Amerykański — Mustang Fastback',
      price: 119,
      oldPrice: 159,
      theme: 'night',
      rating: 5,
      reviewsCount: 12,
      imageMock: passionCollectionMockup,
      customizationProps: { type: 'car', title: 'MUSTANG FASTBACK', subtitle: 'American Muscle Car', dateString: 'V8 HORSEPOWER', location: 'DETROIT CLASSIC', theme: 'night', size: '40x50', hasFrame: true, quantity: 1 }
    },
    {
      id: 'p_moto_4',
      category: 'car',
      categoryLabel: 'Kolekcja Moto',
      title: 'Elegancja Formuły — Monako Rysunek',
      price: 119,
      oldPrice: 149,
      theme: 'cream',
      rating: 4,
      reviewsCount: 19,
      imageMock: passionCollectionMockup,
      customizationProps: { type: 'car', title: 'MONTE CARLO GP', subtitle: 'Retro Racing Circuit', dateString: 'GRAND PRIX', location: 'RACE TRACK ART', theme: 'cream', size: '40x50', hasFrame: false, quantity: 1 }
    },

    // 4x Gdzie się poznaliśmy (gdziesiepoznalismy)
    {
      id: 'p_love_1',
      category: 'gdziesiepoznalismy',
      categoryLabel: 'Gdzie się poznaliśmy',
      badge: 'Bestseller',
      badgeColor: 'bg-[#C8765A] text-white',
      title: 'Plakat Serce — Gdzie Się Poznaliśmy',
      price: 119,
      oldPrice: 149,
      theme: 'cream',
      rating: 5,
      reviewsCount: 167,
      imageMock: cityCollectionMockup,
      customizationProps: { type: 'city', title: 'WROCŁAW', subtitle: 'Nasza miłość się zaczęła', dateString: '23 LIPCA 2023', location: '51° 06\' N • 17° 02\' E', theme: 'cream', size: '40x50', hasFrame: true, quantity: 1 }
    },
    {
      id: 'p_love_2',
      category: 'gdziesiepoznalismy',
      categoryLabel: 'Gdzie się poznaliśmy',
      title: 'Splecione Dłonie Pod Mapą Nieba',
      price: 129,
      oldPrice: 169,
      theme: 'night',
      rating: 5,
      reviewsCount: 83,
      imageMock: starsCollectionMockup,
      customizationProps: { type: 'stars', title: 'Ania & Jan', subtitle: 'Wspólnie Pod Gwiazdami', dateString: '2025-05-18', location: 'Zakopane, PL', theme: 'night', size: '50x70', hasFrame: true, quantity: 1 }
    },
    {
      id: 'p_love_3',
      category: 'gdziesiepoznalismy',
      categoryLabel: 'Gdzie się poznaliśmy',
      badge: 'Okazja',
      badgeColor: 'bg-indigo-600 text-white',
      title: 'Trzy Miasta — Nasza Wspólna Georgafia',
      price: 139,
      oldPrice: 189,
      theme: 'gold',
      rating: 5,
      reviewsCount: 41,
      imageMock: cityCollectionMockup,
      customizationProps: { type: 'city', title: 'WROCŁAW & WARSZAWA', subtitle: 'Nasze drogi połączone', dateString: '2024-02-14', location: 'Dwa Serca Jedna Droga', theme: 'gold', size: '50x70', hasFrame: true, quantity: 1 }
    },
    {
      id: 'p_love_4',
      category: 'gdziesiepoznalismy',
      categoryLabel: 'Gdzie się poznaliśmy',
      title: 'Minimalistyczne Współrzędne Naszego Domu',
      price: 109,
      oldPrice: 139,
      theme: 'black',
      rating: 4,
      reviewsCount: 28,
      imageMock: cityCollectionMockup,
      customizationProps: { type: 'city', title: 'NASZ DOM', subtitle: 'Tu bije serce rodziny', dateString: 'KLUCZE 2024', location: '50° 03\' N • 19° 56\' E', theme: 'black', size: '30x40', hasFrame: false, quantity: 1 }
    }
  ];

  // Filters logic
  const filteredProducts = products.filter((p) => {
    if (selectedFilter === 'wszystkie') return true;
    return p.category === selectedFilter;
  });

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    // popularity (bestsellers first)
    const isABest = a.badge === 'Bestseller' ? 1 : 0;
    const isBBest = b.badge === 'Bestseller' ? 1 : 0;
    return isBBest - isABest;
  });

  const handlePersonalise = (product: ProductItem) => {
    onSelectProduct(product.customizationProps);
    onNavigate('product');
  };

  return (
    <div id="page-katalog" className="page w-full min-h-screen bg-[#FAF7F2] pb-16 selection:bg-[#F2C4A0]/60 text-left pt-20">
      
      {/* 1. HERO SEKCJA (mała, nie pełnoekranowa — max 340px high) */}
      <section className="relative h-[250px] md:h-[300px] bg-[#F5F0E8] overflow-hidden flex items-center px-6 md:px-12 border-b border-[#E8DFD0]">
        {/* Decorative SVG Blob by the right side */}
        <div className="absolute right-[-5%] top-[10%] w-[35%] h-[80%] bg-[#F2C4A0]/30 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute right-[5%] top-[15%] opacity-20 hidden md:block pointer-events-none">
          <svg width="220" height="220" viewBox="0 0 200 200" fill="none" className="text-[#C8765A]">
            <path d="M120,-160C157.3,-143.7,189.7,-111.4,204.4,-70.7C219.1,-30,216,-15,197.8,17.4C179.7,49.8,146.4,99.5,111.5,133.4C76.6,167.3,39.9,185.3,-2.3,188.4C-44.5,191.6,-92.3,179.8,-128.8,150.1C-165.3,120.3,-190.4,72.6,-195.9,23C-201.3,-26.6,-187.1,-78.1,-157.6,-113.6C-128.1,-149.1,-83.4,-168.6,-40,-162C3.4,-155.4,42.7,-176.3,120,-160Z" transform="translate(100, 100)" fill="currentColor" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#C8765A] uppercase">
            <span>Strona główna</span>
            <span>&rarr;</span>
            <span className="text-[#2C2416]">Katalog</span>
          </div>
          <h1 className="font-serif text-3.5xl md:text-5.5xl font-bold tracking-tight text-[#2C2416] leading-none">
            Wszystkie plakaty
          </h1>
          <p className="font-sans text-sm md:text-base text-[#2C2416]/70 max-w-lg leading-relaxed">
            Ponad 200 wzorów. Każdy unikalny, personalizowany rzemieślniczo z miłością dla Ciebie.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#8B5A2B] pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/50 border border-[#E8DFD0]">✦ Darmowa wysyłka od 149 zł</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/50 border border-[#E8DFD0]">✦ Podgląd w 24h</span>
          </div>
        </div>
      </section>

      {/* 2. FILTROWANIE (sticky pod navem) */}
      <section className="sticky top-20 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD0] py-4 px-6 md:px-12 shadow-[0_4px_20px_rgba(44,36,22,0.02)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Horizontal scroll pills */}
          <div className="flex overflow-x-auto scrollbar-none pb-2 md:pb-0 gap-2 -mx-6 px-6 md:-mx-0 md:px-0">
            {[
              { id: 'wszystkie', label: 'Wszystkie' },
              { id: 'stars', label: 'Mapa Gwiazd' },
              { id: 'city', label: 'Mapa Miasta' },
              { id: 'pet', label: 'Portret Pupila' },
              { id: 'music', label: 'Plakaty Muzyczne' },
              { id: 'car', label: 'Kolekcja Moto' },
              { id: 'gdziesiepoznalismy', label: 'Zakochani / Gdzie się poznaliśmy' },
            ].map((pill) => (
              <button
                key={pill.id}
                onClick={() => {
                  setSelectedFilter(pill.id as any);
                  setCurrentPage(1);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  selectedFilter === pill.id
                    ? 'bg-[#C8765A] text-white shadow-md shadow-[#C8765A]/20 scale-102'
                    : 'bg-[#F2C4A0]/10 text-[#2C2416] hover:bg-[#F2C4A0]/20 border border-[#2C2416]/5'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* Right Sort dropdown & counts */}
          <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-[#E8DFD0]/60 pt-3 md:pt-0">
            <span className="text-xs text-[#2C2416]/60 font-medium font-sans">
              Wyświetlono <strong className="text-[#2C2416] font-semibold">{filteredProducts.length}</strong> z {products.length} produktów
            </span>
            
            <div className="flex items-center gap-2">
              <span className="text-xs font-sans text-[#2C2416]/50">Sortuj:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-[#2C2416]/15 rounded-full text-xs font-semibold px-4 py-2 hover:border-[#C8765A] focus:outline-none focus:ring-1 focus:ring-[#C8765A] text-[#2C2416] cursor-pointer"
              >
                <option value="popularity">Popularność ↓</option>
                <option value="price-asc">Cena: rosnąco</option>
                <option value="price-desc">Cena: malejąco</option>
                <option value="rating">Najlepiej oceniane</option>
              </select>
            </div>
          </div>

        </div>
      </section>

      {/* 3. SIATKA PRODUKTÓW (główna zawartość) */}
      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((p, index) => {
            // Pick a thematic background gradient if image mockup isn't rendering well
            let backdropStyle = 'bg-gradient-to-br from-[#0D1B2A] to-[#120F1C]'; // default
            if (p.category === 'city') backdropStyle = 'bg-gradient-to-br from-[#FAF7F2] to-[#E8DFD0]';
            if (p.category === 'pet') backdropStyle = 'bg-gradient-to-br from-[#2D2418] to-[#1C1510]';
            if (p.category === 'music' || p.category === 'car') backdropStyle = 'bg-gradient-to-br from-[#1C1510] to-[#2C2416]';
            if (p.category === 'gdziesiepoznalismy') backdropStyle = 'bg-gradient-to-br from-[#F5F0E8] to-[#F2C4A0]/20';

            return (
              <div 
                key={p.id}
                className="group bg-white rounded-3xl overflow-hidden border border-[#2C2416]/5 shadow-[0_4px_15px_rgba(44,36,22,0.03)] hover:shadow-[0_15px_30px_rgba(44,36,22,0.08)] hover:-translate-y-1.5 transition-all duration-350 flex flex-col justify-between"
              >
                {/* Upper part - Mockup representation image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 flex items-center justify-center p-3">
                  {p.imageMock ? (
                    <img 
                      src={p.imageMock} 
                      alt={p.title} 
                      className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className={`w-full h-full rounded-xl ${backdropStyle} flex items-center justify-center p-4 border border-[#2C2416]/5`}>
                      <span className="font-serif italic text-white/40 text-xs">Aesthetic Poster Mockup</span>
                    </div>
                  )}

                  {/* Naklejka kategorii */}
                  <div className="absolute top-3 left-3 bg-[#F2C4A0] text-[#A0522D] text-[10px] font-mono font-bold px-2.5 py-1 rounded-full">
                    {p.categoryLabel}
                  </div>

                  {/* Optional badges (Bestseller / Nowość / Okazja) */}
                  {p.badge && (
                    <div className={`absolute top-3 right-3 ${p.badgeColor} text-[9px] font-sans font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md`}>
                      {p.badge}
                    </div>
                  )}

                  {/* Overlay on hover: Quick view */}
                  <div className="absolute inset-0 bg-[#2C2416]/40 backdrop-blur-light opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center pointer-events-none group-hover:pointer-events-auto z-10 px-4">
                    <button
                      onClick={() => setQuickviewProduct(p)}
                      className="bg-[#FAF7F2] hover:bg-[#C8765A] hover:text-white text-[#2C2416] text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-full shadow-lg transition-all duration-250 cursor-pointer flex items-center gap-1.5 transform translate-y-4 group-hover:translate-y-0"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Szybki podgląd</span>
                    </button>
                  </div>
                </div>

                {/* Bottom info details block */}
                <div className="p-4 md:p-5 text-left flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5 min-h-[50px]">
                    <h3 className="font-serif text-[15px] md:text-base font-bold text-[#2C2416] tracking-tight group-hover:text-[#C8765A] transition-colors leading-tight line-clamp-2">
                      {p.title}
                    </h3>
                    <div className="flex items-center gap-1 font-sans">
                      <span className="text-[#C9A84C] flex text-xs">
                        {Array.from({ length: p.rating }).map((_, i) => (
                          <Star key={i} className="w-3 w-3 fill-[#C9A84C] text-[#C9A84C]" />
                        ))}
                      </span>
                      <span className="text-[11px] text-[#2C2416]/40 font-medium">({p.reviewsCount})</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-[#C8765A]">{p.price} zł</span>
                      <span className="text-xs text-[#2C2416]/40 line-through font-medium">{p.oldPrice} zł</span>
                    </div>

                    <button
                      onClick={() => handlePersonalise(p)}
                      className="w-full bg-[#C8765A] hover:bg-[#A0522D] text-white text-[11px] font-semibold uppercase tracking-wider py-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-250 cursor-pointer flex items-center justify-center gap-1"
                    >
                      <span>Personalizuj ⚒ &rarr;</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. BANNER PROMOCYJNY (między siatką a paginacją) */}
      <section className="my-16 mx-6 md:px-12 max-w-7xl lg:mx-auto">
        <div className="bg-[#2C2416] text-[#FAF7F2] p-8 md:p-12 rounded-3xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-xl">
          <div className="absolute right-[-10%] top-[-10%] w-[35%] aspect-square bg-[#C8765A]/15 rounded-full filter blur-2xl pointer-events-none" />
          <div className="space-y-3 text-left max-w-2xl relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-[10px] font-mono font-bold tracking-widest text-[#F2C4A0] uppercase">
              🎁 IDEALNY PODSTAWOWY PREZENT
            </span>
            <h2 className="font-serif text-2.5xl md:text-4xl font-bold tracking-tight text-white leading-tight">
              Nie możesz zdecydować? Karta upominkowa wramie
            </h2>
            <p className="font-sans text-xs md:text-sm text-neutral-300 leading-relaxed">
              Podaruj wybór — niech bliska osoba sama stworzy swój plakat ze swoją historią, wybierając ulubiony moment, styl nieba i dedykację.
            </p>
          </div>
          <button
            onClick={() => {
              onSelectProduct({
                type: 'stars',
                title: 'Karta Podarunkowa',
                subtitle: 'Wyjątkowy prezent',
                dateString: 'DLA CIEBIE',
                location: 'WRAMIE.COM',
                theme: 'gold',
                size: '40x50',
                hasFrame: true,
                quantity: 1,
              });
              onNavigate('product');
            }}
            className="bg-[#C8765A] hover:bg-[#A0522D] text-white text-xs font-bold uppercase tracking-wider py-4.5 px-8 rounded-full shadow-lg transition-transform duration-300 hover:scale-102 self-start md:self-center cursor-pointer whitespace-nowrap z-10"
          >
            Kup kartę podarunkową &rarr;
          </button>
        </div>
      </section>

      {/* 4. PAGINACJA */}
      <section className="flex justify-center items-center gap-2 mt-8">
        <button 
          onClick={() => { if (currentPage > 1) setCurrentPage(currentPage - 1); }}
          className="w-10 h-10 rounded-full bg-white border border-[#2C2416]/10 flex items-center justify-center text-xs font-bold font-sans cursor-pointer hover:bg-[#FAF7F2] transition-colors"
        >
          &larr;
        </button>
        {[1, 2, 3, '...', 9].map((page, idx) => (
          <button
            key={idx}
            onClick={() => { if (typeof page === 'number') setCurrentPage(page); }}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold font-sans transition-all duration-300 cursor-pointer ${
              page === currentPage
                ? 'bg-[#C8765A] text-white shadow-md'
                : 'bg-white border border-[#2C2416]/10 hover:bg-[#FAF7F2]'
            }`}
          >
            {page}
          </button>
        ))}
        <button 
          onClick={() => { if (currentPage < 3) setCurrentPage(currentPage + 1); }}
          className="w-10 h-10 rounded-full bg-white border border-[#2C2416]/10 flex items-center justify-center text-xs font-bold font-sans cursor-pointer hover:bg-[#FAF7F2] transition-colors"
        >
          &rarr;
        </button>
      </section>

      {/* Szybki podgląd i modal (Quickview Modal) */}
      {quickviewProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-light z-50 flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative grid grid-cols-1 md:grid-cols-2">
            
            {/* Close button */}
            <button
              onClick={() => setQuickviewProduct(null)}
              className="absolute top-4 right-4 bg-[#2C2416]/10 hover:bg-[#2C2416]/20 p-2 rounded-full cursor-pointer z-20 text-[#2C2416]"
              aria-label="Zamknij"
            >
              ✕
            </button>

            {/* Col Left: Big poster */}
            <div className="bg-[#FAF7F2] p-8 flex items-center justify-center border-r border-[#E8DFD0]/50 aspect-[3/4] md:aspect-auto">
              <img 
                src={quickviewProduct.imageMock} 
                alt={quickviewProduct.title} 
                className="w-full max-h-[460px] object-cover rounded-xl shadow-lg"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Col Right: Detailed metrics and info */}
            <div className="p-8 flex flex-col justify-between text-left">
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold tracking-widest text-[#C8765A] uppercase">
                  {quickviewProduct.categoryLabel}
                </span>
                <h2 className="font-serif text-2.5xl font-bold text-[#2C2416] leading-tight-dense">
                  {quickviewProduct.title}
                </h2>
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C9A84C] text-[#C9A84C]" />
                    ))}
                  </div>
                  <span className="text-xs text-[#2C2416]/50">({quickviewProduct.reviewsCount} zweryfikowanych opinii)</span>
                </div>
                
                <hr className="border-[#E8DFD0]" />

                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block font-bold">W cenie gwarantujemy:</span>
                  <ul className="text-xs text-[#2C2416]/75 space-y-1.5 font-sans">
                    <li>✓ Indywidualny dobór kompozycji i grafikę premium</li>
                    <li>✓ Papier szlachetny Fine Art o gramaturze 250g/m²</li>
                    <li>✓ Elektroniczny podgląd PDF do akceptacji przed szybką wysyłką</li>
                    <li>✓ Odporne tusze pigmentowe o trwałości ponad 100 lat</li>
                  </ul>
                </div>
                
                <div className="pt-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block font-bold mb-2">Rozmiar plonów:</span>
                  <div className="flex gap-2">
                    {['30x40 cm', '40x50 cm', '50x70 cm'].map((sz) => (
                      <span key={sz} className="px-3 py-1 bg-white border border-[#2C2416]/10 rounded text-xs font-semibold text-[#2C2416]/80">{sz}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-[#C8765A]">{quickviewProduct.price} zł</span>
                  <span className="text-sm text-[#2C2416]/40 line-through font-medium">{quickviewProduct.oldPrice} zł</span>
                  <span className="text-xs text-white bg-emerald-600 font-bold px-2 py-0.5 rounded-full uppercase ml-auto">Oszczędzasz {quickviewProduct.oldPrice - quickviewProduct.price} zł</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      handlePersonalise(quickviewProduct);
                      setQuickviewProduct(null);
                    }}
                    className="flex-1 bg-[#C8765A] hover:bg-[#A0522D] text-white text-xs font-bold uppercase tracking-wider py-4 px-6 rounded-full shadow-lg transition-all duration-250 cursor-pointer text-center"
                  >
                    Przejdź do kreatora &rarr;
                  </button>
                  <button
                    onClick={() => setQuickviewProduct(null)}
                    className="px-6 py-4 bg-white border border-[#2C2416]/10 hover:bg-[#2C2416]/5 rounded-full text-xs font-bold text-[#2C2416] transition-colors"
                  >
                    Wróć do sklepu
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
