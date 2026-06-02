import React, { useEffect, useRef, useState } from 'react';
import { Star, MapPin, Heart, Palette, MessageSquare, Compass, ArrowLeft, ArrowRight, Check, Send, Sparkles, User, BadgeAlert, Rocket } from 'lucide-react';
import { PosterMock } from './PosterMock';
import { PosterCustomization } from '../types';
// @ts-ignore
import heroMockupWall from '../assets/images/hero_mockup_wall_1780355166283.png';
// @ts-ignore
import starsCollectionMockup from '../assets/images/stars_collection_mockup_1780355544639.png';
// @ts-ignore
import cityCollectionMockup from '../assets/images/city_collection_mockup_1780355561292.png';
// @ts-ignore
import petCollectionMockup from '../assets/images/pet_collection_mockup_1780355577426.png';
// @ts-ignore
import passionCollectionMockup from '../assets/images/passion_collection_mockup_1780355593307.png';

const HERO_SLIDES = [
  {
    id: 'stars',
    tag: '✦ KONSTELACJE GWIAZD ✦',
    title: 'Twoja własna kropka we Wszechświecie',
    subtitle: 'Wspomnienia zapisane w ułożeniu gwiazd z najważniejszej nocy w życiu. Sentymentalna dokładność.',
    image: starsCollectionMockup,
    anchorId: 'sec-cat-stars',
    btnText: 'Zaprojektuj mapę nieba',
  },
  {
    id: 'city',
    tag: '🗺️ PLAN ARCHITEKTONICZNY MIASTA 🗺️',
    title: 'Upleć historię z siatki ulic',
    subtitle: 'Niezwykle precyzyjne mapy metropolii, miasteczek i ukochanych miejsc. Minimalistyczna sztuka.',
    image: cityCollectionMockup,
    anchorId: 'sec-cat-city',
    btnText: 'Stwórz mapę miasta',
  },
  {
    id: 'pet',
    tag: '🐾 KRÓLEWSKI PORTRET PUPILA 🐾',
    title: 'Najwierniejszy przyjaciel jako monarcha',
    description: '',
    subtitle: 'Dostojny, renesansowy styl Twojego zwierzaka na płótnie premium. Zabawna i luksusowa pamiątka.',
    image: petCollectionMockup,
    anchorId: 'sec-cat-pet',
    btnText: 'Zaprojektuj portret',
  },
  {
    id: 'music_and_car',
    tag: '🎵 MUZYKA & MOTO 🏎️',
    title: 'Pielęgnuj to, co naprawdę kochasz',
    subtitle: 'Kultowe minimalistyczne plakaty muzyczne oraz rzemieślnicze schematy techniczne Twoich ulubionych legend szos.',
    image: passionCollectionMockup,
    anchorId: 'sec-cat-passion',
    btnText: 'Zaprojektuj plakat',
  }
];

interface HomeViewProps {
  onNavigate: (view: 'home' | 'product') => void;
  onSelectProduct: (product: PosterCustomization) => void;
}

// Animated Counter Utility Component
const AnimatedCounter: React.FC<{ target: number; suffix?: string; prefix?: string }> = ({
  target,
  suffix = '',
  prefix = '',
}) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let triggered = false;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          let start = 0;
          const duration = 2000;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {prefix}
      {count.toLocaleString('pl-PL')}
      {suffix}
    </span>
  );
};

// Bestsellers list of templates
const BESTSELLERS: {
  id: string;
  name: string;
  badge: string;
  originalPrice: number;
  salePrice: number;
  ratingCount: number;
  defaults: PosterCustomization;
}[] = [
  {
    id: 'prod_stars_classic',
    name: 'Mapa Gwiazd — Twoja Noc',
    badge: 'Ulubieniec Par',
    originalPrice: 149,
    salePrice: 119,
    ratingCount: 234,
    defaults: {
      type: 'stars',
      title: 'Natalia & Kacper',
      subtitle: 'Noc, w której zapłonęły gwiazdy',
      dateString: '23 LIPCA 2025',
      location: 'Wrocław, PL',
      theme: 'night',
      size: '40x50',
      hasFrame: true,
      quantity: 1,
    },
  },
  {
    id: 'prod_city_love',
    name: 'Plan Miasta — Nasze Miejsce',
    badge: 'Unikalna Pamiątka',
    originalPrice: 149,
    salePrice: 119,
    ratingCount: 188,
    defaults: {
      type: 'city',
      title: 'WROCŁAW',
      subtitle: 'TO TUTAJ PO RAZ PIERWSZY CIĘ SPOTKAŁEM',
      dateString: '3 WRZEŚNIA 2024',
      location: '51° 06\' N • 17° 02\' E',
      theme: 'cream',
      size: '50x70',
      hasFrame: false,
      quantity: 1,
    },
  },
  {
    id: 'prod_pet_ludwik',
    name: 'Królewski Pupilek — Lord Baron',
    badge: 'Ekskluzywne',
    originalPrice: 169,
    salePrice: 129,
    ratingCount: 154,
    defaults: {
      type: 'pet',
      title: 'Lord Baron',
      subtitle: 'Obrońca Królestwa Dywanów i Kanap',
      dateString: 'PAN DOMU',
      location: 'KRÓLEWSKI ROZMIAR',
      theme: 'gold',
      size: '30x40',
      hasFrame: true,
      petStyle: 'royal',
      quantity: 1,
    },
  },
  {
    id: 'prod_music_vinyl',
    name: 'The Retro Album — Plakat Muzyczny',
    badge: 'Retro vibe',
    originalPrice: 139,
    salePrice: 109,
    ratingCount: 94,
    defaults: {
      type: 'music',
      title: 'THE EMINEM SHOW',
      subtitle: 'TRACK 04: WITHOUT ME',
      dateString: 'RELEASED 2002',
      location: 'HIP-HOP LEGEND',
      theme: 'black',
      size: 'A3',
      hasFrame: false,
      quantity: 1,
    },
  },
  {
    id: 'prod_car_porsche',
    name: 'Sportowy Klasyk Coupe 911 GT',
    badge: 'Dla fana moto',
    originalPrice: 149,
    salePrice: 119,
    ratingCount: 112,
    defaults: {
      type: 'car',
      title: '911 Turbo S',
      subtitle: 'FLAT 6 / 650 HORSEPOWER',
      dateString: '0-100: 2.7S',
      location: 'LEGENDARY PERFORMANCE',
      theme: 'black',
      size: '50x70',
      hasFrame: true,
      quantity: 1,
    },
  },
  {
    id: 'prod_pet_popart',
    name: 'Neon Pop-Art Portrait — Puszek',
    badge: 'Nowość',
    originalPrice: 169,
    salePrice: 129,
    ratingCount: 82,
    defaults: {
      type: 'pet',
      title: 'Puszek',
      subtitle: 'Kosmiczny Kot na Punktem Lasera',
      dateString: 'POP-ART STYLE',
      location: 'SUNFLOWER SUN',
      theme: 'cream',
      size: '40x50',
      hasFrame: false,
      petStyle: 'popart',
      quantity: 1,
    },
  },
];

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onSelectProduct }) => {
  const [bestsellerIndex, setBestsellerIndex] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const [timelineVisible, setTimelineVisible] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [isReviewHovered, setIsReviewHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Reviews dragging and swipe variables
  const reviewsCarouselRef = useRef<HTMLDivElement>(null);
  const [isReviewsDragging, setIsReviewsDragging] = useState(false);
  const [reviewsStartX, setReviewsStartX] = useState(0);
  const [reviewsScrollLeft, setReviewsScrollLeft] = useState(0);

  // Custom controller function to scroll cleanly to a specific card
  const scrollToReview = (index: number) => {
    setReviewIndex(index);
    if (!reviewsCarouselRef.current) return;
    const container = reviewsCarouselRef.current;
    
    const items = container.querySelectorAll('.review-card-item');
    if (items && items[index]) {
      const targetElement = items[index] as HTMLElement;
      container.scrollTo({
        left: targetElement.offsetLeft - container.offsetLeft,
        behavior: 'smooth'
      });
    }
  };

  // Keep track of which slide is center-most to active-highlight indicators naturally when user manual swiped
  const handleReviewsScroll = () => {
    if (!reviewsCarouselRef.current || isReviewsDragging) return;
    const container = reviewsCarouselRef.current;
    const items = container.querySelectorAll('.review-card-item');
    let closestIndex = 0;
    let minDistance = Infinity;
    
    items.forEach((item, idx) => {
      const el = item as HTMLElement;
      const distance = Math.abs((el.offsetLeft - container.offsetLeft) - container.scrollLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });
    
    setReviewIndex(closestIndex);
  };

  // Mouse drag action events
  const handleReviewsMouseDown = (e: React.MouseEvent) => {
    if (!reviewsCarouselRef.current) return;
    setIsReviewsDragging(true);
    setReviewsStartX(e.pageX - reviewsCarouselRef.current.offsetLeft);
    setReviewsScrollLeft(reviewsCarouselRef.current.scrollLeft);
    setIsReviewHovered(true);
  };

  const handleReviewsMouseMove = (e: React.MouseEvent) => {
    if (!isReviewsDragging || !reviewsCarouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - reviewsCarouselRef.current.offsetLeft;
    const walk = (x - reviewsStartX) * 1.5; 
    reviewsCarouselRef.current.scrollLeft = reviewsScrollLeft - walk;

    // Track state live
    const container = reviewsCarouselRef.current;
    const items = container.querySelectorAll('.review-card-item');
    let closestIndex = 0;
    let minDistance = Infinity;
    items.forEach((item, idx) => {
      const el = item as HTMLElement;
      const distance = Math.abs((el.offsetLeft - container.offsetLeft) - container.scrollLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });
    setReviewIndex(closestIndex);
  };

  const handleReviewsMouseUpOrLeave = () => {
    setIsReviewsDragging(false);
    setIsReviewHovered(false);
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isReviewHovered || isReviewsDragging) return;
    const interval = setInterval(() => {
      setReviewIndex((prev) => {
        const nextIdx = (prev + 1) % 6;
        if (reviewsCarouselRef.current) {
          const container = reviewsCarouselRef.current;
          const items = container.querySelectorAll('.review-card-item');
          if (items && items[nextIdx]) {
            const targetElement = items[nextIdx] as HTMLElement;
            container.scrollTo({
              left: targetElement.offsetLeft - container.offsetLeft,
              behavior: 'smooth'
            });
          }
        }
        return nextIdx;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [isReviewHovered, isReviewsDragging]);
  const [activeSlide, setActiveSlide] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Auto scroll slideshow every 6.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  // Scroll animations via Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Timeline trigger scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setTimelineVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Subnet Parallax logic for Hero Posters
  const handleHeroMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
    setParallaxOffset({ x, y });
  };

  const handleBestsellerNavigation = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setBestsellerIndex((prev) => (prev + 1 >= BESTSELLERS.length - 2 ? 0 : prev + 1));
    } else {
      setBestsellerIndex((prev) => (prev === 0 ? BESTSELLERS.length - 3 : prev - 1));
    }
  };

  const handleSelectBestseller = (item: typeof BESTSELLERS[0]) => {
    onSelectProduct(item.defaults);
    onNavigate('product');
  };

  return (
    <div id="page-home" className="w-full relative bg-[#FAF7F2]">
      
      {/* SEKCJA A — HERO SLIDESHOW */}
      <section 
        className="relative h-[85vh] lg:h-[95vh] min-h-[600px] lg:min-h-[750px] w-full flex items-center justify-center overflow-hidden bg-black text-white"
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={() => setParallaxOffset({ x: 0, y: 0 })}
      >
        {/* Full-bleed Slides Background */}
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-[1250ms] ease-in-out ${
              index === activeSlide ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 pointer-events-none z-0'
            }`}
          >
            {/* Dark elegant premium backdrop filters */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/80 z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover transition-transform duration-[6500ms] ${
                index === activeSlide ? 'scale-105 brightness-95' : 'scale-115'
              }`}
              referrerPolicy="no-referrer"
            />
          </div>
        ))}

        {/* Content Box */}
        <div 
          style={{
            transform: `translate(${parallaxOffset.x * 0.4}px, ${parallaxOffset.y * 0.4}px)`,
            transition: 'transform 0.15s ease-out'
          }}
          className="max-w-7xl w-full mx-auto px-6 md:px-[60px] h-full flex flex-col justify-center text-left relative z-20 pt-16 md:pt-24"
        >
          <div className="space-y-6 max-w-3.5xl">
            {/* Decorative Label with stats */}
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md uppercase text-[10px] md:text-[11px] font-semibold text-[#F2C4A0] tracking-[2px] transition-all duration-300">
              <span>✦ PONAD <AnimatedCounter target={12847} /> HISTORII W RAMIE ✦</span>
              <span className="w-1.5 h-1.5 bg-[#C8765A] rounded-full animate-ping" />
              <span className="text-white/60 lowercase font-normal italic pr-1">kliknij by przewinąć</span>
            </div>

            {/* Slide Title */}
            <div className="space-y-3">
              <span className="block text-xs font-mono tracking-widest text-[#C8765A] uppercase">
                {HERO_SLIDES[activeSlide].tag}
              </span>
              <h1 className="font-serif text-4xl sm:text-[46px] md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                {HERO_SLIDES[activeSlide].title}
              </h1>
            </div>

            {/* Slide description */}
            <p className="font-sans text-neutral-200/85 text-base md:text-[18px] leading-[1.65] max-w-2xl mb-8">
              {HERO_SLIDES[activeSlide].subtitle}
            </p>

            {/* Interactive slide CTAs */}
            <div className="flex flex-wrap gap-4 pt-1 mb-6">
              <button
                onClick={() => onNavigate('product')}
                className="bg-[#C8765A] hover:bg-[#A0522D] text-white font-sans text-[13px] md:text-[14px] font-semibold tracking-wide uppercase py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-350 hover:scale-[1.03] active:scale-[0.98] cursor-pointer flex items-center gap-2"
              >
                {HERO_SLIDES[activeSlide].btnText} &rarr;
              </button>
              <button
                onClick={() => {
                  const target = document.getElementById(HERO_SLIDES[activeSlide].anchorId);
                  target?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border border-white/30 hover:bg-white/10 text-white font-sans text-[13px] md:text-[14px] font-semibold tracking-wide uppercase py-4.5 px-10 rounded-full transition-all duration-350 hover:scale-[1.02] cursor-pointer"
              >
                Dowiedz się więcej &darr;
              </button>
            </div>

            {/* Trust highlights */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-6 border-t border-white/10 text-white/50 uppercase text-[10px] md:text-[11px] font-semibold tracking-widest font-sans">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#C8765A]"><path d="M20 6L9 17l-5-5"/></svg>
                <span>Druk pigmentowy premium</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#C8765A]"><path d="M20 6L9 17l-5-5"/></svg>
                <span>Podgląd mailowy w 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#C8765A]"><path d="M20 6L9 17l-5-5"/></svg>
                <span>Ekspresowa dostawa</span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel indicator controls - Chevrons */}
        <button 
          onClick={() => setActiveSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full border border-white/10 bg-black/20 hover:bg-[#C8765A] text-white transition-all cursor-pointer"
          aria-label="Poprzedni"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={() => setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full border border-white/10 bg-black/20 hover:bg-[#C8765A] text-white transition-all cursor-pointer"
          aria-label="Następny"
        >
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Bottom selector dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 bg-black/15 backdrop-blur-md px-4.5 py-2.5 rounded-full border border-white/10">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeSlide ? 'bg-[#C8765A] w-6' : 'bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Slajd ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* SEKCJA KATEGORII — Nowy luksusowy design zamiast surowego czarnego paska */}
      <section id="sec-categories" className="py-24 px-6 md:px-12 bg-[#FAF7F2] border-t border-[#2C2416]/10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C8765A]">Wybierz swoją intymną historię</span>
              <h2 className="font-serif text-3.5xl md:text-5xl font-bold tracking-tight text-[#2C2416]">
                Nasze Flagowe Kolekcje
              </h2>
            </div>
            <p className="font-sans text-sm text-[#2C2416]/60 max-w-md leading-relaxed">
              Każda kolekcja została zaprojektowana ze szczególnym uwzględnieniem równowagi kompozycji, szlachetnego minimalizmu oraz najwyższej jakości druku pigmentowego.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            
            {/* Kategoria 1: Mapa Gwiazd */}
            <button 
              onClick={() => {
                const el = document.getElementById('sec-cat-stars');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group bg-white p-3.5 sm:p-5 lg:p-6 rounded-[20px] sm:rounded-[24px] border border-[#2C2416]/10 hover:border-[#C8765A] hover:bg-[#FCFBF9] hover:shadow-[0_20px_40px_-10px_rgba(200,118,90,0.1)] transition-all duration-400 cursor-pointer flex flex-col justify-between text-left relative overflow-hidden"
            >
              {/* Subtle top decoration */}
              <div className="flex justify-between items-center mb-2 sm:mb-4">
                <span className="font-mono text-[9px] sm:text-[10px] font-bold text-[#C8765A]/80 tracking-widest uppercase">
                  ✦ N° 01
                </span>
                <span className="font-mono text-[8px] sm:text-[9px] text-[#2C2416]/40 uppercase tracking-wider bg-[#2C2416]/5 px-2 py-0.5 rounded-full font-bold">
                  Kosmos
                </span>
              </div>

              <div className="space-y-2.5 sm:space-y-4 w-full">
                {/* Real Image of Category with Luxury Frame */}
                <div className="w-full aspect-[4/5] rounded-lg sm:rounded-xl overflow-hidden relative border border-[#2C2416]/5 bg-neutral-50 shadow-inner group-hover:shadow-md transition-shadow duration-500">
                  <img 
                    src={starsCollectionMockup} 
                    alt="Kolekcja Mapa Gwiazd" 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 bg-[#2C2416] text-[#C9A84C] font-mono text-[7px] sm:text-[8px] font-extrabold pb-0.5 px-2 py-0.5 rounded-sm uppercase tracking-widest shadow-xs">
                    BESTSELLER
                  </div>
                </div>

                <div className="space-y-1 pt-0.5 px-0.5">
                  <h3 className="font-serif text-[14px] sm:text-[16px] md:text-lg lg:text-xl font-bold text-[#2C2416] group-hover:text-[#C8765A] transition-colors leading-tight truncate">
                    Mapa Gwiazd
                  </h3>
                  <div className="h-[2px] w-6 bg-[#C8765A]/20 group-hover:w-12 transition-all duration-500 rounded-full" />
                  <p className="text-[10px] sm:text-[11px] md:text-[12px] text-[#2C2416]/65 leading-relaxed font-sans pt-1 line-clamp-2 md:line-clamp-none">
                    Ułożenie planet i konstelacji z najważniejszego dla Was wieczoru.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2.5 sm:pt-4 mt-3 sm:mt-5 border-t border-dashed border-[#2C2416]/10 text-[9px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#2C2416]/45 group-hover:text-[#C8765A] transition-colors w-full px-0.5">
                <span>od <span className="font-sans font-extrabold text-[#2C2416] group-hover:text-[#C8765A] text-xs sm:text-sm transition-colors">119 zł</span></span>
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[#2C2416]/10 text-[#2C2416]/50 group-hover:border-[#C8765A] group-hover:bg-[#C8765A] group-hover:text-white flex items-center justify-center transition-all duration-350 text-xs sm:text-sm shrink-0">
                  →
                </div>
              </div>
            </button>

            {/* Kategoria 2: Mapa Miasta */}
            <button 
              onClick={() => {
                const el = document.getElementById('sec-cat-city');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group bg-white p-3.5 sm:p-5 lg:p-6 rounded-[20px] sm:rounded-[24px] border border-[#2C2416]/10 hover:border-[#C8765A] hover:bg-[#FCFBF9] hover:shadow-[0_20px_40px_-10px_rgba(200,118,90,0.1)] transition-all duration-400 cursor-pointer flex flex-col justify-between text-left relative overflow-hidden"
            >
              {/* Subtle top decoration */}
              <div className="flex justify-between items-center mb-2.5 sm:mb-4">
                <span className="font-mono text-[9px] sm:text-[10px] font-bold text-[#C8765A]/80 tracking-widest uppercase">
                  🗺️ N° 02
                </span>
                <span className="font-mono text-[8px] sm:text-[9px] text-[#2C2416]/40 uppercase tracking-wider bg-[#2C2416]/5 px-2 py-0.5 rounded-full font-bold">
                  Karty
                </span>
              </div>

              <div className="space-y-2.5 sm:space-y-4 w-full">
                {/* Real Image of Category with Luxury Frame */}
                <div className="w-full aspect-[4/5] rounded-lg sm:rounded-xl overflow-hidden relative border border-[#2C2416]/5 bg-neutral-50 shadow-inner group-hover:shadow-md transition-shadow duration-500">
                  <img 
                    src={cityCollectionMockup} 
                    alt="Kolekcja Mapa Miasta" 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 bg-[#C8765A] text-white font-mono text-[7px] sm:text-[8px] font-extrabold pb-0.5 px-2 py-0.5 rounded-sm uppercase tracking-widest shadow-xs">
                    SZTUKA
                  </div>
                </div>

                <div className="space-y-1 pt-0.5 px-0.5">
                  <h3 className="font-serif text-[14px] sm:text-[16px] md:text-lg lg:text-xl font-bold text-[#2C2416] group-hover:text-[#C8765A] transition-colors leading-tight truncate">
                    Mapa Miasta
                  </h3>
                  <div className="h-[2px] w-6 bg-[#C8765A]/20 group-hover:w-12 transition-all duration-500 rounded-full" />
                  <p className="text-[10px] sm:text-[11px] md:text-[12px] text-[#2C2416]/65 leading-relaxed font-sans pt-1 line-clamp-2 md:line-clamp-none">
                    Szlachetny minimalizm i siatka ulic bliskich Waszemu sercu miejsc.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2.5 sm:pt-4 mt-3 sm:mt-5 border-t border-dashed border-[#2C2416]/10 text-[9px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#2C2416]/45 group-hover:text-[#C8765A] transition-colors w-full px-0.5">
                <span>od <span className="font-sans font-extrabold text-[#2C2416] group-hover:text-[#C8765A] text-xs sm:text-sm transition-colors">119 zł</span></span>
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[#2C2416]/10 text-[#2C2416]/50 group-hover:border-[#C8765A] group-hover:bg-[#C8765A] group-hover:text-white flex items-center justify-center transition-all duration-350 text-xs sm:text-sm shrink-0">
                  →
                </div>
              </div>
            </button>

            {/* Kategoria 3: Portret Pupila */}
            <button 
              onClick={() => {
                const el = document.getElementById('sec-cat-pet');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group bg-white p-3.5 sm:p-5 lg:p-6 rounded-[20px] sm:rounded-[24px] border border-[#2C2416]/10 hover:border-[#C8765A] hover:bg-[#FCFBF9] hover:shadow-[0_20px_40px_-10px_rgba(200,118,90,0.1)] transition-all duration-400 cursor-pointer flex flex-col justify-between text-left relative overflow-hidden"
            >
              {/* Subtle top decoration */}
              <div className="flex justify-between items-center mb-2.5 sm:mb-4">
                <span className="font-mono text-[9px] sm:text-[10px] font-bold text-[#C8765A]/80 tracking-widest uppercase">
                  🐾 N° 03
                </span>
                <span className="font-mono text-[8px] sm:text-[9px] text-[#2C2416]/40 uppercase tracking-wider bg-[#2C2416]/5 px-2 py-0.5 rounded-full font-bold">
                  Szlachecki
                </span>
              </div>

              <div className="space-y-2.5 sm:space-y-4 w-full">
                {/* Real Image of Category with Luxury Frame */}
                <div className="w-full aspect-[4/5] rounded-lg sm:rounded-xl overflow-hidden relative border border-[#2C2416]/5 bg-neutral-50 shadow-inner group-hover:shadow-md transition-shadow duration-500">
                  <img 
                    src={petCollectionMockup} 
                    alt="Kolekcja Portret Pupila" 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 bg-amber-700 text-white font-mono text-[7px] sm:text-[8px] font-extrabold pb-0.5 px-2 py-0.5 rounded-sm uppercase tracking-widest shadow-xs">
                    RETUSZ PIĘKNA
                  </div>
                </div>

                <div className="space-y-1 pt-0.5 px-0.5">
                  <h3 className="font-serif text-[14px] sm:text-[16px] md:text-lg lg:text-xl font-bold text-[#2C2416] group-hover:text-[#C8765A] transition-colors leading-tight truncate">
                    Portret Pupila
                  </h3>
                  <div className="h-[2px] w-6 bg-[#C8765A]/20 group-hover:w-12 transition-all duration-500 rounded-full" />
                  <p className="text-[10px] sm:text-[11px] md:text-[12px] text-[#2C2416]/65 leading-relaxed font-sans pt-1 line-clamp-2 md:line-clamp-none">
                    Twój czworonożny przyjaciel uwieczniony w renesansowym stylu.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2.5 sm:pt-4 mt-3 sm:mt-5 border-t border-dashed border-[#2C2416]/10 text-[9px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#2C2416]/45 group-hover:text-[#C8765A] transition-colors w-full px-0.5">
                <span>od <span className="font-sans font-extrabold text-[#2C2416] group-hover:text-[#C8765A] text-xs sm:text-sm transition-colors">129 zł</span></span>
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[#2C2416]/10 text-[#2C2416]/50 group-hover:border-[#C8765A] group-hover:bg-[#C8765A] group-hover:text-white flex items-center justify-center transition-all duration-350 text-xs sm:text-sm shrink-0">
                  →
                </div>
              </div>
            </button>

            {/* Kategoria 4: Muzyka & Motoryzacja */}
            <button 
              onClick={() => {
                const el = document.getElementById('sec-cat-passion');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group bg-white p-3.5 sm:p-5 lg:p-6 rounded-[20px] sm:rounded-[24px] border border-[#2C2416]/10 hover:border-[#C8765A] hover:bg-[#FCFBF9] hover:shadow-[0_20px_40px_-10px_rgba(200,118,90,0.1)] transition-all duration-400 cursor-pointer flex flex-col justify-between text-left relative overflow-hidden"
            >
              {/* Subtle top decoration */}
              <div className="flex justify-between items-center mb-2.5 sm:mb-4">
                <span className="font-mono text-[9px] sm:text-[10px] font-bold text-[#C8765A]/80 tracking-widest uppercase">
                  🎵 N° 04
                </span>
                <span className="font-mono text-[8px] sm:text-[9px] text-[#2C2416]/40 uppercase tracking-wider bg-[#2C2416]/5 px-2 py-0.5 rounded-full font-bold">
                  Hobby
                </span>
              </div>

              <div className="space-y-2.5 sm:space-y-4 w-full">
                {/* Real Image of Category with Luxury Frame */}
                <div className="w-full aspect-[4/5] rounded-lg sm:rounded-xl overflow-hidden relative border border-[#2C2416]/5 bg-neutral-50 shadow-inner group-hover:shadow-md transition-shadow duration-500">
                  <img 
                    src={passionCollectionMockup} 
                    alt="Kolekcja Muzyczna & Motoryzacyjna" 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 bg-[#2C2416] text-[#E8DFD0] font-mono text-[7px] sm:text-[8px] font-extrabold pb-0.5 px-2 py-0.5 rounded-sm uppercase tracking-widest shadow-xs">
                    KONESERZY
                  </div>
                </div>

                <div className="space-y-1 pt-0.5 px-0.5">
                  <h3 className="font-serif text-[14px] sm:text-[16px] md:text-lg lg:text-xl font-bold text-[#2C2416] group-hover:text-[#C8765A] transition-colors leading-tight truncate">
                    Muzyka & Moto
                  </h3>
                  <div className="h-[2px] w-6 bg-[#C8765A]/20 group-hover:w-12 transition-all duration-500 rounded-full" />
                  <p className="text-[10px] sm:text-[11px] md:text-[12px] text-[#2C2416]/65 leading-relaxed font-sans pt-1 line-clamp-2 md:line-clamp-none">
                    Kultowe vinyle oraz legendarne tech-schematy klasyków szos.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2.5 sm:pt-4 mt-3 sm:mt-5 border-t border-dashed border-[#2C2416]/10 text-[9px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#2C2416]/45 group-hover:text-[#C8765A] transition-colors w-full px-0.5">
                <span>od <span className="font-sans font-extrabold text-[#2C2416] group-hover:text-[#C8765A] text-xs sm:text-sm transition-colors">109 zł</span></span>
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[#2C2416]/10 text-[#2C2416]/50 group-hover:border-[#C8765A] group-hover:bg-[#C8765A] group-hover:text-white flex items-center justify-center transition-all duration-350 text-xs sm:text-sm shrink-0">
                  →
                </div>
              </div>
            </button>

          </div>
        </div>
      </section>

      {/* SEKCJA B — KATEGORIE NA STRONIE GŁÓWNEJ */}
      {/* 4 Osobne subsekcje o wysublimowanym unikalnym klimacie */}
      <section className="w-full">
        
        {/* SUBSEKCJA 01: MAPA GWIAZD - Kosmiczna Głębia Nocy */}
        <div id="sec-cat-stars" className="relative min-h-screen py-24 bg-gradient-to-b from-[#0D1B2A] to-[#120F1C] text-white flex items-center overflow-hidden">
          {/* Constellation background grid star clusters */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <div className="star absolute w-1 h-1 bg-white rounded-full top-[10%] left-[20%]" />
            <div className="star absolute w-[2px] h-[2px] bg-white rounded-full top-[45%] left-[80%]" />
            <div className="star absolute w-1.5 h-1.5 bg-[#FFF0DB] rounded-full top-[70%] left-[40%]" />
            <div className="star absolute w-[3px] h-[3px] bg-amber-100 rounded-full top-[25%] left-[65%]" />
            <div className="star absolute w-1 h-1 bg-slate-300 rounded-full top-[85%] left-[15%]" />
            <div className="star absolute w-[2px] h-[2px] bg-sky-200 rounded-full top-[60%] left-[88%]" />
          </div>

          <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Tekst - Lewa strona */}
            <div className="lg:col-span-6 space-y-6 text-left animate-on-scroll">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#C9A84C] font-semibold tracking-wider">01 / KOLEKCJA PREMIUM</span>
                <div className="h-[1px] w-12 bg-[#C9A84C]/40" />
              </div>
              
              <h2 className="font-serif text-4xl md:text-6xl font-light tracking-tight text-white leading-tight">
                Mapa Gwiazd<br />
                <span className="font-sans text-xs uppercase tracking-widest text-slate-400 font-semibold">Uwiecznij noc, którą</span><br />
                <span className="font-cursive text-4xl md:text-5xl text-[#C9A84C]/95 italic">zapamiętasz na zawsze</span>
              </h2>

              <p className="font-sans text-slate-300/80 text-sm md:text-base leading-relaxed">
                Podaj datę i najbliższe Twojemu sercu miasto, a nasz autorski system odtworzy dokładną mapę nocnego nieba i układ gwiazd widoczny z tego miejsca w tamtej wyjątkowej sekundzie. Rocznica zaręczyn, data ślubu czy narodziny maleństwa — zatrzymaj kosmiczną harmonię chwil.
              </p>

              <div className="flex items-baseline gap-2 pt-2">
                <span className="text-xs text-slate-400 font-medium">Butikowa cena:</span>
                <span className="text-3xl font-serif text-[#C9A84C] font-bold">od 119 zł</span>
                <span className="text-xs text-slate-500 line-through">149 zł</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    onSelectProduct({
                      type: 'stars',
                      title: 'Pod Gwiazdami',
                      subtitle: 'Wspólna podróż trwa do dziś',
                      dateString: '23 WRZEŚNIA 2023',
                      location: 'Wrocław, PL',
                      theme: 'night',
                      size: '40x50',
                      hasFrame: true,
                      quantity: 1,
                    });
                    onNavigate('product');
                  }}
                  className="inline-flex items-center gap-2 border-2 border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D1B2A] font-sans font-bold text-xs uppercase tracking-widest py-3 px-6 rounded-full transition-all duration-350 cursor-pointer"
                >
                  Stwórz Mapę Gwiazd →
                </button>
              </div>
            </div>

            {/* Wizualizacja Plakatu - Prawa strona */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end animate-on-scroll">
              <div className="w-full max-w-[340px] aspect-[3/4]">
                <PosterMock
                  customization={{
                    type: 'stars',
                    title: 'Daria & Patryk',
                    subtitle: 'Wszystkie konstelacje wskazywały Ciebie',
                    dateString: '14 LUTEGO 2025',
                    location: 'Warszawa, PL',
                    theme: 'night',
                    size: '50x70',
                    hasFrame: true,
                    quantity: 1,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* SUBSEKCJA 02: MAPA MIASTA - Precyzja Minimalizmu ulicznego */}
        <div id="sec-cat-city" className="relative min-h-screen py-24 bg-[#FAF7F2] text-[#2C2416] flex items-center overflow-hidden border-y border-[#2C2416]/5">
          {/* Subtle street matrix layout lines in backdrop */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <pattern id="street-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 0 10 L 100 10 M 10 0 L 10 100 M 0 50 L 100 50 M 80 0 L 80 100" fill="none" stroke="#2C2416" strokeWidth="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#street-grid)" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Poster Mockup - Lewa Strona */}
            <div className="lg:col-span-6 flex justify-center lg:justify-start order-2 lg:order-1 animate-on-scroll">
              <div className="w-full max-w-[340px] aspect-[3/4]">
                <PosterMock
                  customization={{
                    type: 'city',
                    title: 'WROCŁAW',
                    subtitle: 'TO TUTAJ ZACZĘŁA SIĘ NASZA HISTORIA OBUSTRONNA',
                    dateString: '8 MARCA 2024',
                    location: '51° 06\' N • 17° 02\' E',
                    theme: 'cream',
                    size: '40x50',
                    hasFrame: true,
                    quantity: 1,
                  }}
                />
              </div>
            </div>

            {/* Tekst - Prawa strona */}
            <div className="lg:col-span-6 space-y-6 text-left order-1 lg:order-2 animate-on-scroll">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#C8765A] font-semibold tracking-wider">02 / SZTUKA ARCHITEKTURY</span>
                <div className="h-[1px] w-12 bg-[#C8765A]/40" />
              </div>

              <h2 className="font-serif text-4xl md:text-6xl font-light tracking-tight text-[#2C2416] leading-tight">
                Mapa Miasta<br />
                <span className="font-serif italic font-bold text-[#C8765A]">Twoje miejsce,</span><br />
                <span className="font-sans text-md font-semibold tracking-widest text-[#2C2416]/70 uppercase">nasza wspólna historia</span>
              </h2>

              <p className="font-sans text-[#2C2416]/75 text-sm md:text-base leading-relaxed">
                Paryski bulwar, wąska uliczka na wrocławskim rynku czy cichy zakątek bieszczadzkiej polany? Wskaż nam dowolne wybrane współrzędne na świecie, a my przerysujemy artystyczną, surową siatkę topograficzną dróg ze złotym lub czerwonym punktem serca akcentującym Waszą najważniejszą bazę na globie.
              </p>

              <div className="flex items-baseline gap-2 pt-2">
                <span className="text-xs text-[#2C2416]/50">Regularna opieka:</span>
                <span className="text-3xl font-serif text-[#C8765A] font-bold">od 119 zł</span>
                <span className="text-xs text-neutral-400 line-through">149 zł</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    onSelectProduct({
                      type: 'city',
                      title: 'WARSZAWA',
                      subtitle: 'KAŻDA ULICA MIASTA TĘTNI NASZYM SZEPTEM',
                      dateString: '1 LIPCA 2025',
                      location: '52° 13\' N • 21° 00\' E',
                      theme: 'cream',
                      size: '50x70',
                      hasFrame: false,
                      quantity: 1,
                    });
                    onNavigate('product');
                  }}
                  className="bg-[#C8765A] hover:bg-[#A0522D] text-white font-sans text-xs font-bold uppercase tracking-widest py-3.5 px-6 rounded-full shadow-md transition-all cursor-pointer"
                >
                  Zaprojektuj Mapę Miasta →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SUBSEKCJA 03: PORTRET PUPILA - Ciepłe i Szlachetne Portrety Zwierzaków */}
        <div id="sec-cat-pet" className="relative min-h-screen py-24 bg-gradient-to-br from-[#F5E6D3] to-[#EDD9C0] text-[#2C2416] flex items-center overflow-hidden">
          <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Tekst - Lewa Strona */}
            <div className="lg:col-span-5 space-y-6 text-left animate-on-scroll">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#A0522D] font-semibold tracking-wider">03 / ARTYSTYCZNA OPRAWA</span>
                <div className="h-[1px] w-12 bg-[#A0522D]/40" />
              </div>

              <h2 className="font-serif text-4xl md:text-6xl font-light tracking-tight text-[#2C2416] leading-tight">
                Portret Pupila<br />
                <span className="font-cursive text-4xl text-[#A0522D]/95 italic leading-none">Twój czworonożny bohater</span><br />
                <span className="font-sans text-xs uppercase tracking-widest font-semibold text-[#2C2416]/50">w renesansowej koronie</span>
              </h2>

              <p className="font-sans text-[#2C2416]/75 text-sm md:text-base leading-relaxed">
                Prześlij zdjęcie swojego wiernego psa, dumnego kota, królika czy nawet chomika! Nasi utalentowani artyści cyfrowi przeniosą głowę Twojego pupila na szlachecką renesansową szatę lub skomponują wyrazisty i pełen energii plakat w stylu pop-art. Dzieło sztuki dla każdego pets mastera.
              </p>

              <div className="flex items-baseline gap-2 pt-2">
                <span className="text-xs text-neutral-500">Unikalne dzieło:</span>
                <span className="text-3xl font-serif text-[#A0522D] font-bold">od 129 zł</span>
                <span className="text-xs text-pink-700/60 font-semibold uppercase font-mono bg-pink-100/50 px-2 py-0.5 rounded text-[9px]">
                  Ręczny retusz w 24h
                </span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    onSelectProduct({
                      type: 'pet',
                      title: 'Majesty Tosia',
                      subtitle: 'Królowa Foteli i Rannych Pobudek',
                      dateString: 'ROYAL CAT',
                      location: 'RENAISSANCE SUITE',
                      theme: 'gold',
                      size: '40x50',
                      hasFrame: true,
                      petStyle: 'royal',
                      quantity: 1,
                    });
                    onNavigate('product');
                  }}
                  className="bg-[#2C2416] hover:bg-[#A0522D] text-white hover:text-white font-sans text-xs font-bold uppercase tracking-widest py-3.5 px-6 rounded-full transition-all cursor-pointer"
                >
                  Portret mojego Pupila →
                </button>
              </div>
            </div>

            {/* Dwa plakaty side-by-side - Prawa strona */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4 animate-on-scroll">
              <div className="w-full aspect-[3/4] hover:scale-103 duration-300 transform rotate-[-1deg]">
                <PosterMock
                  customization={{
                    type: 'pet',
                    title: 'Lord Leon',
                    subtitle: 'Główny Inspektor Poduszeczek',
                    dateString: 'ROYAL CAT',
                    location: 'GOLD LUXURY',
                    theme: 'gold',
                    size: '40x50',
                    hasFrame: true,
                    petStyle: 'royal',
                    quantity: 1,
                  }}
                />
              </div>
              <div className="w-full aspect-[3/4] hover:scale-103 duration-300 transform rotate-[1deg] translate-y-6 lg:translate-y-8">
                <PosterMock
                  customization={{
                    type: 'pet',
                    title: 'Piorun',
                    subtitle: 'Mistrz Biegów po Dywanie',
                    dateString: 'POP-ART EDITION',
                    location: 'SUNSHINE BRIGHT',
                    theme: 'cream',
                    size: '30x40',
                    hasFrame: false,
                    petStyle: 'popart',
                    quantity: 1,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* SUBSEKCJA 04: PLAKATY PASJI - Muzyka, Motoryzacja, Sporty */}
        <div id="sec-cat-passion" className="relative min-h-screen py-24 bg-gradient-to-b from-[#111111] to-[#1C1C1C] text-white flex items-center overflow-hidden">
          <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Trzy plakaty w rzędzie - Lewa strona */}
            <div className="lg:col-span-7 grid grid-cols-3 gap-2.5 sm:gap-4 order-2 lg:order-1 animate-on-scroll">
              {/* Music Poster */}
              <div className="w-full aspect-[3/4] hover:scale-103 transition-transform duration-300">
                <PosterMock
                  customization={{
                    type: 'music',
                    title: 'DARK INSIDE',
                    subtitle: 'TRACK 07: INFINITE SKY',
                    dateString: 'RELEASED 2026',
                    location: 'AMBIENT TECHNO',
                    theme: 'black',
                    size: '30x40',
                    hasFrame: false,
                    quantity: 1,
                  }}
                />
              </div>
              {/* Car Poster */}
              <div className="w-full aspect-[3/4] hover:scale-103 transition-transform duration-300 translate-y-4">
                <PosterMock
                  customization={{
                    type: 'car',
                    title: 'Carrera Turbo',
                    subtitle: 'FLAT-6 AUTOMATION / 650HP',
                    dateString: 'MAXIM: 330KM/H',
                    location: 'FAST AND CURIOUS',
                    theme: 'cream',
                    size: '40x50',
                    hasFrame: true,
                    quantity: 1,
                  }}
                />
              </div>
              {/* Retro album vinyl */}
              <div className="w-full aspect-[3/4] hover:scale-103 transition-transform duration-300">
                <PosterMock
                  customization={{
                    type: 'music',
                    title: 'RETRO GROOVES',
                    subtitle: 'SIDE A: GOLD TRACKS',
                    dateString: 'VINTAGE 1974',
                    location: 'SOUL COLLATERAL',
                    theme: 'gold',
                    size: '30x40',
                    hasFrame: false,
                    quantity: 1,
                  }}
                />
              </div>
            </div>

            {/* Tekst - Prawa Strona */}
            <div className="lg:col-span-5 space-y-6 text-left order-1 lg:order-2 animate-on-scroll">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#C8765A] font-semibold tracking-wider">04 / ARCHIWUM ZAINTERESOWAŃ</span>
                <div className="h-[1px] w-12 bg-[#C8765A]/40" />
              </div>

              <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-white leading-tight">
                Plakaty Pasji<br />
                <span className="font-serif italic font-bold text-[#C8765A]">Muzyka i Motoryzacja</span>
              </h2>

              <p className="font-sans text-neutral-400 text-sm md:text-base leading-relaxed">
                Ulubiony album muzyczny z kodem odtwarzacza, sylwetka klasycznego auta z kompletną specyfikacją techniczną na plakacie. Pokaż swoje prawdziwe pasje i ozdób swój gabinet, sypialnię lub pokój gracza w prawdziwie kolekcjonerskim, butikowym stylu.
              </p>

              <div className="flex items-baseline gap-2 pt-2">
                <span className="text-xs text-neutral-500">Unikatowa kolekcja:</span>
                <span className="text-3xl font-serif text-[#C8765A] font-bold">od 109 zł</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    onSelectProduct({
                      type: 'music',
                      title: 'STYLIZOWANY VINYL',
                      subtitle: 'RETRO ALBUM SPECIFICATION',
                      dateString: 'COLLECTORS LP',
                      location: 'MUSIC IS LIFE',
                      theme: 'black',
                      size: '40x50',
                      hasFrame: true,
                      quantity: 1,
                    });
                    onNavigate('product');
                  }}
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#C8765A] text-white hover:bg-[#C8765A] font-sans font-bold text-xs uppercase tracking-widest py-3 px-5 rounded-full transition-all duration-350 cursor-pointer text-center"
                >
                  🎵 Plakat Muzyczny →
                </button>
                <button
                  onClick={() => {
                    onSelectProduct({
                      type: 'car',
                      title: '911 Turbo S',
                      subtitle: 'FLAT 6 / 650 HORSEPOWER',
                      dateString: 'LEGENDARY PERFORMANCE',
                      location: 'LEGENDARY RACING',
                      theme: 'black',
                      size: '40x50',
                      hasFrame: true,
                      quantity: 1,
                    });
                    onNavigate('product');
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-[#C8765A] border-2 border-[#C8765A] text-white hover:bg-[#A0522D] hover:border-[#A0522D] font-sans font-bold text-xs uppercase tracking-widest py-3 px-5 rounded-full transition-all duration-350 cursor-pointer text-center"
                >
                  🏎️ Kolekcja Moto →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEKCJA C — JAK TO DZIAŁA z animacją rysowanej linii */}
      <section id="sec-how-it-works" className="py-24 px-6 md:px-12 bg-[#F5F0E8] overflow-hidden">
        <div className="max-w-7xl mx-auto text-center space-y-16">
          
          <div className="space-y-3 max-w-xl mx-auto">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#C8765A] font-bold">Unikalny Proces</h3>
            <h2 className="font-serif text-3xl md:text-5xl text-[#2C2416] font-bold">Jak to działa?</h2>
            <div className="h-1 w-16 bg-[#C8765A] mx-auto rounded" />
            <p className="text-sm text-[#2C2416]/70 leading-relaxed font-sans">
              Od pomysłu do druku premium na muzealnym papierze matowym w 3 prostych krokach.
            </p>
          </div>

          {/* Timeline steps with drawing vector line underneath */}
          <div ref={timelineRef} className="relative max-w-4xl mx-auto">
            {/* SVG Connecting Timeline draw line */}
            <div className="absolute top-[78px] left-[15%] right-[15%] h-[3px] hidden md:block z-0 pointer-events-none">
              <svg className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
                <line 
                  x1="0" y1="0" x2="100%" y2="0" 
                  stroke="#F2C4A0" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  strokeDasharray="6 6"
                  opacity="0.5" 
                />
                <line 
                  x1="0" y1="0" x2="100%" y2="0" 
                  stroke="#C8765A" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  className={`timeline-line ${timelineVisible ? 'visible' : ''}`}
                />
              </svg>
            </div>

            {/* Grid of 3 Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 md:gap-12 relative z-10 font-sans">
              
              {/* Step 1 */}
              <div className="space-y-4 animate-on-scroll flex flex-col items-center text-center relative">
                <div className="font-serif text-[42px] font-black text-[#C8765A] leading-none mb-1">
                  01
                </div>
                <div className="w-16 h-16 bg-white text-[#C8765A] border-4 border-[#F5F0E8] rounded-full flex items-center justify-center shadow-md relative z-10 ring-4 ring-[#C8765A]/10">
                  <Palette className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#2C2416] pt-1">Wybierz &amp; Spersonalizuj</h4>
                <p className="text-xs text-[#2C2416]/70 max-w-[240px] leading-relaxed mx-auto">
                  Wybierz ulubiony motyw, wprowadź własne imiona, datę, miejscowość, wybierz paletę minimalistyczną i wielkość.
                </p>
              </div>

              {/* Step 2 */}
              <div className="space-y-4 animate-on-scroll flex flex-col items-center text-center relative pt-4 md:pt-0">
                <div className="font-serif text-[42px] font-black text-[#C8765A] leading-none mb-1 relative">
                  02
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#C8765A] text-white font-mono text-[8px] font-bold uppercase tracking-wider py-0.5 px-2.5 rounded-full shadow-md z-30 whitespace-nowrap">
                    ⚡ 24h Projekt
                  </span>
                </div>
                <div className="w-16 h-16 bg-white text-[#C8765A] border-4 border-[#F5F0E8] rounded-full flex items-center justify-center shadow-md relative z-10 ring-4 ring-[#C8765A]/10">
                  <Compass className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#2C2416] pt-1">Podgląd w 24h na E-mail</h4>
                <p className="text-xs text-[#2C2416]/70 max-w-[240px] leading-relaxed mx-auto">
                  Nasi graficy przygotują plakat i prześlą cyfrową wersję na Twój e-mail. Dajemy Ci 100% gwarancji akceptacji i poprawek.
                </p>
              </div>

              {/* Step 3 */}
              <div className="space-y-4 animate-on-scroll flex flex-col items-center text-center relative">
                <div className="font-serif text-[42px] font-black text-[#C8765A] leading-none mb-1">
                  03
                </div>
                <div className="w-16 h-16 bg-white text-[#C8765A] border-4 border-[#F5F0E8] rounded-full flex items-center justify-center shadow-md relative z-10 ring-4 ring-[#C8765A]/10">
                  <Rocket className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#2C2416] pt-1">Dostawa pod Drzwi</h4>
                <p className="text-xs text-[#2C2416]/70 max-w-[240px] leading-relaxed mx-auto">
                  Plakat drukujemy na matowym papierze premium 230g, ostrożnie pakujemy w kartonową tubę lub oprawiamy w ramy i wysyłamy błyskawicznie.
                </p>
              </div>
            </div>
          </div>

          {/* Animated Statistics widgets */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto pt-12 border-t border-[#2C2416]/10 font-sans">
            <div className="bg-[#FAF7F2] p-4 sm:p-6 rounded-2xl shadow-xs text-center border border-[#2C2416]/5">
              <span className="block font-serif text-2xl sm:text-3xl md:text-4xl text-[#C8765A] font-bold">
                <AnimatedCounter target={12847} />
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold text-[#2C2416]/60 uppercase tracking-widest block mt-1">Zadowolonych klientów</span>
            </div>
            <div className="bg-[#FAF7F2] p-4 sm:p-6 rounded-2xl shadow-xs text-center border border-[#2C2416]/5">
              <span className="block font-serif text-2xl sm:text-3xl md:text-4xl text-[#C8765A] font-bold">
                <AnimatedCounter target={98} suffix="%" />
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold text-[#2C2416]/60 uppercase tracking-widest block mt-1">Poleca nasze plakaty</span>
            </div>
            <div className="bg-[#FAF7F2] p-4 sm:p-6 rounded-2xl shadow-xs text-center border border-[#2C2416]/5">
              <span className="block font-serif text-xl sm:text-2xl md:text-3xl text-[#C8765A] font-bold leading-none py-1 md:py-2">
                Poprawki 24h
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold text-[#2C2416]/60 uppercase tracking-widest block mt-1">Gwarancja Satysfakcji</span>
            </div>
            <div className="bg-[#FAF7F2] p-4 sm:p-6 rounded-2xl shadow-xs text-center border border-[#2C2416]/5">
              <span className="block font-serif text-2xl sm:text-3xl md:text-4xl text-[#C8765A] font-bold">
                <AnimatedCounter target={230} suffix="g" />
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold text-[#2C2416]/60 uppercase tracking-widest block mt-1">Papier matowy premium</span>
            </div>
          </div>
        </div>
      </section>

      {/* SEKCJA D — BESTSELLERY - Karuzela z 6 kartami */}
      <section id="sec-bestsellers" className="py-24 px-6 md:px-12 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="text-left space-y-2">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#C8765A] font-bold">Nasze Perełki</h3>
              <h2 className="font-serif text-3xl md:text-5xl text-[#2C2416] font-bold">Najchętniej wybierane</h2>
              <p className="text-xs text-[#2C2416]/60 font-sans">Zainspiruj się gotowymi bestsellerowymi kompozycjami i spersonalizuj je po swojemu.</p>
            </div>
            {/* Arrows controllers */}
            <div className="flex gap-3">
              <button
                onClick={() => handleBestsellerNavigation('prev')}
                className="p-3 border border-[#2C2416]/10 hover:bg-[#C8765A] hover:text-white rounded-full transition-all cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleBestsellerNavigation('next')}
                className="p-3 border border-[#2C2416]/10 hover:bg-[#C8765A] hover:text-white rounded-full transition-all cursor-pointer"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Carousel body slider */}
          <div className="overflow-x-auto md:overflow-hidden py-4 -mx-4 px-4 scrollbar-none">
            <div 
              className="flex gap-3 md:gap-6 transition-transform duration-500 ease-out md:transform-none"
              style={windowWidth >= 768 ? { transform: `translateX(-${bestsellerIndex * 34.2}%)` } : {}}
            >
              {BESTSELLERS.map((item) => (
                <div
                  key={item.id}
                  className="w-[140px] sm:w-[170px] md:w-[340px] shrink-0 snap-start"
                >
                  {/* Product Card Container */}
                  <div className="bg-[#FAF7F2] p-2 sm:p-4 rounded-2xl sm:rounded-3xl border border-[#2C2416]/5 shadow-sm hover:shadow-xl group/card transition-all duration-350 h-full flex flex-col justify-between">
                    
                    {/* Mock Poster view Box with hover lift */}
                    <div className="relative aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden shadow-md group-hover/card:scale-[1.04] group-hover/card:-rotate-1 duration-500 transition-all">
                      <PosterMock customization={item.defaults} />
                    </div>

                    {/* Meta options */}
                    <div className="pt-3 text-left space-y-1 ml-0.5 sm:ml-1 font-sans">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                        <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-[#C8765A]">
                          {item.badge}
                        </span>
                        <div className="flex items-center text-amber-500 text-[8px] sm:text-[11px] font-bold uppercase tracking-wider">
                          ★ ★ ★ ★ ★ <span className="text-neutral-500 ml-0.5">({item.ratingCount})</span>
                        </div>
                      </div>

                      <h4 className="font-serif text-[12px] sm:text-lg font-bold text-[#2C2416] group-hover/card:text-[#C8765A] transition-colors leading-tight line-clamp-1">
                        {item.name}
                      </h4>

                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-1 sm:pt-2 gap-1.5 sm:gap-0">
                        <div className="flex items-baseline gap-1 leading-none">
                          <span className="text-[12px] sm:text-base md:text-lg font-serif font-bold text-[#C8765A]">
                            {item.salePrice} zł
                          </span>
                          <span className="text-[9px] sm:text-xs text-neutral-400 line-through">
                            {item.originalPrice} zł
                          </span>
                        </div>

                        {/* Custom touch button */}
                        <button
                          onClick={() => handleSelectBestseller(item)}
                          className="bg-[#2C2416] hover:bg-[#C8765A] text-white text-[8px] sm:text-[11px] font-semibold uppercase tracking-wider py-1 sm:py-2 px-2 sm:px-4 rounded-full transition-colors cursor-pointer w-full sm:w-auto text-center"
                        >
                          Projektuj
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 pt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setBestsellerIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  bestsellerIndex === i ? 'bg-[#C8765A] scale-125' : 'bg-[#C8765A]/20'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SEKCJA E — OPINIE (social proof) */}
      <section id="sec-reviews" className="py-24 px-6 md:px-12 bg-[#2C2416] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center space-y-2">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#F2C4A0] font-bold">Serca Klientów</h3>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-bold leading-tight">Co mówią nasi klienci?</h2>
            <p className="text-sm text-neutral-400 font-sans max-w-lg mx-auto">
              Średnia ocena to <span className="text-[#F2C4A0] font-bold">4.9/5 ★</span> na podstawie ponad 2 000 zweryfikowanych opinii od miłośników designu.
            </p>
          </div>

          {/* Reviews Carousel body */}
          <div 
            ref={reviewsCarouselRef}
            onScroll={handleReviewsScroll}
            onMouseDown={handleReviewsMouseDown}
            onMouseMove={handleReviewsMouseMove}
            onMouseUp={handleReviewsMouseUpOrLeave}
            onMouseLeave={handleReviewsMouseUpOrLeave}
            className="overflow-x-auto py-4 -mx-4 px-4 scrollbar-none cursor-grab active:cursor-grabbing select-none scroll-smooth relative z-20"
          >
            <div 
              className="flex gap-6"
            >
              {[
                {
                  initials: 'MK',
                  gradient: 'from-[#C8765A] to-[#A0522D]',
                  name: 'Marta K. z Poznania',
                  text: 'Jestem zachwycona! Mapa gwiazd z nocy naszych zaręczyn wyszła przecudnie. Projekt przyszedł na maila po 6 godzinach, poprosiłam o drobną zmianę napisu, co zostało zrobione natychmiast. Oprawa w dębową ramę dodaje niesamowitej elegancji.',
                  product: 'Mapa Gwiazd',
                },
                {
                  initials: 'TB',
                  gradient: 'from-indigo-500 to-amber-500',
                  name: 'Tomasz B. z Wrocławia',
                  text: 'Narysowane ulice Wrocławia z serduszkiem w miejscu pierwszego spotkania to strzał w dziesiątkę na rocznicę dla żony. Genialny papier, bardzo głęboka, matowa czerń i szybka paczka w paczkomacie. Zdecydowanie polecam to studio!',
                  product: 'Mapa Miasta',
                },
                {
                  initials: 'JO',
                  gradient: 'from-teal-500 to-amber-600',
                  name: 'Justyna O. z Gdańska',
                  text: 'Zamówiłam królewski portret mojego mopsa o imieniu Baron i pękam ze śmiechu za każdym razem kiedy na niego patrzę. Połączenie renesansowej peleryny i korony z jego kochanym pyskiem to arcydzieło. Fantastyczna pamiątka i świetny kontakt.',
                  product: 'Portret Pupila',
                },
                {
                  initials: 'KW',
                  gradient: 'from-blue-600 to-cyan-500',
                  name: 'Karol W. z Warszawy',
                  text: 'Kolekcjonerski schemat Porsche 911 na czarnym tle wygląda nieziemsko w moim gabinecie. Papier matowy najwyższej klasy, nie odbija światła i ma genialną fakturę. Szybka dostawa w sztywnej tubie.',
                  product: 'Plakat Moto',
                },
                {
                  initials: 'AS',
                  gradient: 'from-fuchsia-600 to-pink-500',
                  name: 'Anna S. z Krakowa',
                  text: 'Kupiłam plakat na rocznicę ślubu moich rodziców. Byli niesamowicie poruszeni widząc niebo nad nimi z tamtego dnia. Błyskawiczna korekta tekstu przez miłego grafika, perfekcyjne wykonanie i ramy.',
                  product: 'Mapa Gwiazdy',
                },
                {
                  initials: 'MD',
                  gradient: 'from-emerald-500 to-teal-600',
                  name: 'Michał D. z Łodzi',
                  text: 'Spersonalizowany plakat z moim ulubionym albumem muzycznym Eminema to genialne dopełnienie mojego kącika z winylami. Bardzo staranne pakowanie i wyraziste kolory. Na pewno wrócę po kolejne plakaty.',
                  product: 'Plakat Muzyczny',
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="w-[270px] sm:w-[320px] md:w-[360px] shrink-0 snap-start review-card-item pointer-events-none"
                >
                  <div className="bg-[#FAF7F2]/5 p-6 sm:p-8 rounded-3xl border border-white/5 relative z-10 text-left h-full flex flex-col justify-between pointer-events-auto">
                    <div>
                      <span className="absolute right-6 top-2 font-serif text-[110px] text-[#C8765A] opacity-20 pointer-events-none select-none">
                        ”
                      </span>
                      <div className="text-[#F2C4A0] font-bold text-xs uppercase tracking-widest mb-3 select-none">★★★★★</div>
                      <p className="font-sans text-xs sm:text-sm text-neutral-200 leading-relaxed mb-6 italic select-none">
                        "{item.text}"
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3 pt-3 border-t border-white/5 select-none">
                      <div className={`w-10 h-10 bg-gradient-to-br ${item.gradient} rounded-full flex items-center justify-center text-xs font-bold text-white uppercase shrink-0`}>
                        {item.initials}
                      </div>
                      <div className="min-w-0">
                        <h5 className="font-bold text-sm font-serif truncate text-white">{item.name}</h5>
                        <span className="inline-block text-[9px] bg-[#C8765A] text-white px-2.5 py-0.5 rounded-full font-sans uppercase font-semibold mt-0.5 truncate max-w-full">
                          Kupuje: {item.product}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 pt-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToReview(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  reviewIndex === i ? 'bg-[#F2C4A0] scale-125' : 'bg-[#F2C4A0]/20'
                }`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* SEKCJA INS — INSTAGRAM SOCIAL GALLERY */}
      <section className="py-24 px-6 md:px-12 bg-[#F5F0E8] overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-12 text-center pointer-events-auto">
          <div className="space-y-2">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#C8765A] font-bold">Instamoment</h3>
            <h2 className="font-serif text-3xl md:text-5xl text-[#2C2416] font-bold">#wramie w Waszych domach</h2>
            <p className="text-sm text-[#2C2416]/60 font-sans max-w-lg mx-auto">
              Zrób zdjęcie swojego plakatu, oznacz nas tagiem <span className="text-[#C8765A] font-bold">@wramie_pl</span> i zainspiruj tysiące innych miłośników luksusowych wnętrz!
            </p>
          </div>

          {/* Interactive photo gallery grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 font-sans">
            {[
              { id: 1, img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=400&auto=format&fit=crop", tag: "@domowa_ostoja", likes: "142", type: "city" },
              { id: 2, img: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?q=80&w=400&auto=format&fit=crop", tag: "@marta_m00n", likes: "89", type: "stars" },
              { id: 3, img: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=400&auto=format&fit=crop", tag: "@wroc_love", likes: "213", type: "city" },
              { id: 4, img: "https://images.unsplash.com/photo-1507082767356-63e267dbf5d8?q=80&w=400&auto=format&fit=crop", tag: "@baron_the_cat", likes: "305", type: "pet" },
              { id: 5, img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=400&auto=format&fit=crop", tag: "@mieszkanie_b3", likes: "76", type: "car" },
              { id: 6, img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=400&auto=format&fit=crop", tag: "@nowoczesny_salon", likes: "198", type: "stars" },
            ].map((feed) => (
              <div 
                key={feed.id} 
                className="group relative aspect-square rounded-2xl overflow-hidden border border-[#2C2416]/5 bg-neutral-200/50 hover:shadow-lg transition-all duration-350 cursor-pointer"
              >
                <img 
                  src={feed.img} 
                  alt={`Zdjęcie instagramowe od ${feed.tag}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay hover panel */}
                <div className="absolute inset-0 bg-[#2C2416]/80 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex justify-between items-center text-white/90 text-[10px] font-mono font-semibold">
                    <span>{feed.tag}</span>
                    <span className="flex items-center gap-0.5">❤️ {feed.likes}</span>
                  </div>
                  
                  <div className="text-left font-sans">
                    <span className="text-[9px] uppercase tracking-widest font-mono text-[#F2C4A0] font-bold block">Wybierz styl</span>
                    <button
                      onClick={() => handleSelectBestseller({
                        id: `insta_${feed.id}`,
                        name: feed.type === 'stars' ? "Niebo nad nami" : feed.type === 'city' ? "Kolekcja Wspólne Ulice" : feed.type === 'pet' ? "Portret Lorda" : "Klasyk szos",
                        badge: "Inspiracja",
                        salePrice: 119,
                        originalPrice: 149,
                        ratingCount: 35,
                        defaults: {
                          type: feed.type as 'stars' | 'city' | 'pet' | 'music' | 'car',
                          title: feed.type === 'stars' ? "MARTA & JAN" : "GDAŃSK",
                          subtitle: "Tajemnica tamtej pamiętnej nocy",
                          dateString: "10 LUTEGO 2024",
                          location: "54° 21' N • 18° 39' E",
                          theme: "cream",
                          size: "30x40",
                          hasFrame: true,
                          quantity: 1
                        }
                      })}
                      className="mt-1 pb-0.5 text-[9px] font-bold text-white bg-[#C8765A] px-2.5 py-0.5 rounded-full uppercase tracking-wider hover:bg-white hover:text-[#C8765A] transition-colors"
                    >
                      Projektuj &rarr;
                    </button>
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
