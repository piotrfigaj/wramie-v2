import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, CheckCircle, Heart, Star, Users, Palette, Trophy } from 'lucide-react';

interface AboutViewProps {
  onNavigate: (view: 'home' | 'product' | 'katalog' | 'kategoria-gwiazdy' | 'o-nas' | 'jak-dziala' | 'faq') => void;
}

// Custom Counter component to animate upon viewport rendering
const AnimatedStatsCounter: React.FC<{ target: number; suffix?: string; formatFn?: (val: number) => string }> = ({ target, suffix = '', formatFn }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 2000; // 2 seconds
          const stepTime = 30;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, stepTime);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target]);

  const displayVal = formatFn ? formatFn(count) : count.toLocaleString('pl-PL');

  return (
    <div ref={elementRef} className="text-4xl md:text-6xl font-serif font-bold text-white tracking-tight">
      {displayVal}{suffix}
    </div>
  );
};

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  const values = [
    {
      emoji: '🎨',
      title: 'Każdy plakat ręcznie sprawdzany',
      desc: 'Zanim wyślemy, profesjonalny projektant sprawdza czy wszystko jest idealne, wyrównuje dedykacje, dobiera czcionki. Nie ma tu ślepej taśmy produkcyjnej.',
    },
    {
      emoji: '📮',
      title: 'Podgląd przed drukiem',
      desc: 'Dostajesz plik PDF do akceptacji na swoją skrzynkę mailową. Dopiero po Twoim ostatecznym "OK" zlecamy wydruk w najwyższej rozdzielczości.',
    },
    {
      emoji: '📦',
      title: 'Pakowanie jak prezent',
      desc: 'Każdy plakat owijamy w elegancki papier ozdobny i umieszczamy w sztywnym bezpiecznym kartonie. Możesz wysyłać go prosto do rąk obdarowywanej osoby.',
    },
    {
      emoji: '🌱',
      title: 'Papier z certyfikatem FSC',
      desc: 'Drukujemy na luksusowym papierze Fine Art o gramaturze 250g/m² o matowym wykończeniu, pozyskiwanym w 100% z odpowiedzialnych i certyfikowanych źródeł.',
    },
  ];

  const team = [
    {
      name: 'Piotrek',
      role: 'Współzałożyciel & grafik',
      desc: 'Pasjonat typografii i technologii kosmicznej. Dba o to, by każda gwiazda na mapie odpowiadała rzeczywistym układom ciał niebieskich.',
      gradient: 'from-[#C8765A] to-[#F2C4A0]',
      initials: 'P',
    },
    {
      name: 'Asia',
      role: 'Współzałożycielka & obsługa klienta',
      desc: 'Zawsze doradzi najlepsze słowa na dedykację. Czyta każdy list od Was i pilnuje, aby podglądy trafiały do skrzynek dokładnie na czas.',
      gradient: 'from-[#FAF7F2] to-[#E8DFD0]',
      initials: 'A',
    },
    {
      name: 'Marek',
      role: 'Druk & produkcja',
      desc: 'Mistrz rzemiosła ramiarskiego. Dobiera pasujące profile i kontroluje, aby naciąg papieru w złoconych i aluminiowych ramach był nienaganny.',
      gradient: 'from-[#FAF7F2] to-[#F2C4A0]',
      initials: 'M',
    },
    {
      name: 'Kaśka',
      role: 'Social media & inspiracje',
      desc: 'Utrwala magię Waszych realizacji. Projektuje aranżacje wnętrz i wyszukuje najpiękniejsze ślubne oraz urodzinowe fotografie.',
      gradient: 'from-[#0D1B2A] to-[#C8765A]',
      initials: 'K',
    },
  ];

  const studioImages = [
    {
      title: 'Studio Kreatywne',
      desc: 'Gdzie rodzą się koncepcje i dopracowujemy typografię.',
      gradient: 'from-[#C8765A] via-[#A0522D] to-[#2C2416]',
    },
    {
      title: 'Drukarnia Rzemieślnicza',
      desc: 'Nasze zaawansowane plotery nanoszą bezwonne tusze pigmentowe.',
      gradient: 'from-[#0D1B2A] via-[#E8DFD0] to-[#F5F0E8]',
    },
    {
      title: 'Dział Pakowania & Kontroli',
      desc: 'Ręczne owijanie w ozdobny papier i dekoracje wstążkowe.',
      gradient: 'from-[#F2C4A0] via-[#C8765A] to-[#E8DFD0]',
    },
  ];

  return (
    <div id="page-o-nas" className="page w-full min-h-screen bg-[#FAF7F2] pb-16 selection:bg-[#F2C4A0]/60 text-left pt-20">
      
      {/* 1. HERO — EDITORIAL STYLE */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Column Left: Team creative image frame */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Dots background framework */}
            <div className="absolute inset-y-0 -left-4 w-4 hidden md:block select-none opacity-20 text-[#C8765A] font-mono leading-none text-xs">
              ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
            </div>
            
            <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#F2C4A0] to-[#C8765A] border border-[#2C2416]/10 p-1 flex items-end">
              {/* Artistic border doodle representing team frame */}
              <div className="absolute inset-4 border border-dashed border-white/20 rounded-2xl pointer-events-none" />
              
              <div className="w-full h-full bg-[#2C2416]/20 absolute inset-0 mix-blend-multiply" />
              
              {/* Inner card information text */}
              <div className="absolute bottom-6 left-6 right-6 z-10 text-white bg-black/35 backdrop-blur-md p-5 rounded-2xl border border-white/10">
                <p className="font-serif italic font-bold text-lg text-[#F2C4A0]">Studio wramie &bull; Wrocław</p>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-[10px] font-mono tracking-widest uppercase opacity-80">Rzemieślnicza Pasja</span>
                  <span className="text-[10px] text-white">♥ od 2022 roku</span>
                </div>
              </div>

              {/* Vector representation elements */}
              <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-32 h-32 rounded-full border border-white/10 opacity-40 mix-blend-overlay animate-pulse" />
              <div className="absolute top-[25%] left-[60%] w-24 h-24 bg-white/10 rounded-full blur-xl" />
            </div>
          </div>

          {/* Column Right: Text details block */}
          <div className="lg:col-span-7 space-y-6 lg:pl-6">
            <span className="inline-block text-xs font-mono font-bold tracking-[2px] text-[#C8765A] uppercase">
              ✦ NASZA HISTORIA
            </span>
            <div className="space-y-4">
              <h1 className="font-serif text-4.5xl md:text-5.5xl font-bold text-[#2C2416] tracking-tight leading-[1.12]">
                Za każdym plakatem <br />
                <em className="text-[#C8765A] not-italic italic font-serif font-light">stoi prawdziwa historia.</em>
              </h1>
              <p className="font-sans text-[#2C2416]/95 text-base md:text-[17px] leading-[1.8]">
                <strong>wramie.com</strong> zaczęło się od zwykłego, lecz nietuzinkowego prezentu. Szukaliśmy czegoś naprawdę głębokiego i osobistego na naszą rocznicę i nic gotowego nie potrafiło oddać naszych uczuć. Więc postanowiliśmy zrobić to sami — zaprojektowaliśmy i wydrukowaliśmy mapę układu gwiazd z nocy naszego pierwszego, wrocławskiego spotkania.
              </p>
              <p className="font-sans text-[#2C2416]/75 text-sm md:text-base leading-[1.7]">
                Dziś tworzymy ponad 500 personalizowanych dzieł sztuki miesięcznie, lecz do każdego projektu podchodzimy z identyczną czułością, jak do tego pierwszego. Doskonale wiemy, że za każdym przysłanym zamówieniem kryje się coś niezwykle istotnego: pamiętna data, wyjątkowe miejsce, ukochany człowiek lub przełomowa chwila Waszego życia.
              </p>
            </div>

            {/* Signature at bottom */}
            <div className="pt-4 flex flex-col items-start">
              <p className="font-serif italic text-3xl text-[#C8765A]" style={{ fontFamily: '"Dancing Script", cursive, serif' }}>
                — Piotrek &amp; Asia, założyciele
              </p>
              <span className="text-[10px] font-mono uppercase tracking-[2px] text-neutral-400 mt-1">ZESPÓŁ PROJEKTOWY WRAMIE</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. NASZE LICZBY (Sekcja statystyk) */}
      <section className="bg-[#C8765A] text-white py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            
            <div className="space-y-1">
              <AnimatedStatsCounter target={12847} suffix=" +" />
              <div className="text-xs md:text-sm font-sans text-[#F5F0E8] uppercase tracking-widest font-semibold">
                Zadowolonych klientów
              </div>
            </div>

            <div className="space-y-1">
              <AnimatedStatsCounter target={500} suffix=" +" formatFn={(val) => `${val}+`} />
              <div className="text-xs md:text-sm font-sans text-[#F5F0E8] uppercase tracking-widest font-semibold">
                Plakatów miesięcznie
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-4xl md:text-6xl font-serif font-bold text-white tracking-tight">
                4.97 ★
              </div>
              <div className="text-xs md:text-sm font-sans text-[#F5F0E8] uppercase tracking-widest font-semibold">
                Średnia ocena
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-4xl md:text-6xl font-serif font-bold text-white tracking-tight">
                24h
              </div>
              <div className="text-xs md:text-sm font-sans text-[#F5F0E8] uppercase tracking-widest font-semibold">
                Czas na projekt
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. JAK DZIAŁAMY — WARTOŚCI */}
      <section className="py-20 bg-[#F5F0E8] border-b border-[#E8DFD0]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center space-y-14">
          <div className="space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-mono font-bold tracking-widest text-[#C8765A] uppercase block">KOMPROMISÓW BRAK</span>
            <h2 className="font-serif text-3.5xl md:text-5xl font-bold text-[#2C2416] tracking-tight">
              Co nas wyróżnia
            </h2>
            <p className="font-sans text-sm text-[#2C2416]/70 leading-relaxed">
              Wydajemy wojnę niskiej jakości masowej produkcji. Tworzymy na lata, zabezpieczając wspomnienia w postaci odpornych dzieł sztuki.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {values.map((v, i) => (
              <div 
                key={i}
                className="bg-white p-8 rounded-3xl border-l-[6px] border-[#C8765A] border-y border-r border-[#2C2416]/5 shadow-sm space-y-3"
              >
                <div className="text-4xl">{v.emoji}</div>
                <h3 className="font-serif text-xl font-bold text-[#2C2416]">
                  {v.title}
                </h3>
                <p className="text-xs md:text-[13.5px] text-[#2C2416]/75 leading-relaxed font-sans">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. NASZ ZESPÓŁ */}
      <section className="py-20 bg-[#FAF7F2] border-b border-[#E8DFD0]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center space-y-16">
          <div className="space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-mono font-bold tracking-widest text-[#C8765A] uppercase block">RDZEŃ RZEMIOSŁA</span>
            <h2 className="font-serif text-3.5xl md:text-5xl font-bold text-[#2C2416] tracking-tight">
              Ludzie za wramie
            </h2>
            <p className="font-sans text-sm text-[#2C2416]/70 leading-relaxed">
              Małe czteroosobowe grono, w którym artystyczna wizja łączy się z rzemieślniczym sznytem i troską o klienta.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div 
                key={i} 
                className="group flex flex-col items-center bg-white p-6 rounded-3xl border border-[#2C2416]/5 hover:border-[#C8765A]/50 transition-all duration-300 shadow-xs"
              >
                {/* Round Avatar mockup representation */}
                <div className={`w-28 h-28 rounded-full bg-gradient-to-tr ${member.gradient} border-[3px] border-white group-hover:border-[#C8765A] shadow-md flex items-center justify-center text-[#2C2416] font-serif font-black text-3xl transition-all duration-300 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-neutral-900/5 mix-blend-overlay" />
                  <span>{member.initials}</span>
                </div>
                
                <div className="mt-5 text-center space-y-1.5">
                  <h4 className="font-serif text-lg font-bold text-[#2C2416] group-hover:text-[#C8765A] transition-colors">
                    {member.name}
                  </h4>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block font-bold leading-none">
                    {member.role}
                  </span>
                  <hr className="w-8 border-[#C8765A] mx-auto opacity-70 my-2" />
                  <p className="text-xs text-[#2C2416]/70 leading-relaxed font-sans px-1 italic">
                    {member.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. NASZE ATELIER */}
      <section className="py-20 bg-[#2C2416] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center space-y-12">
          
          <div className="space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-mono font-bold tracking-widest text-[#F2C4A0] uppercase block">LOKALNA PRZEDSIĘBIORCZOŚĆ</span>
            <h2 className="font-serif text-3.5xl md:text-5xl font-bold text-white tracking-tight">
              Tworzymy we Wrocławiu
            </h2>
            <p className="font-sans text-sm text-neutral-300 leading-relaxed">
              To tutaj, we wrocławskim atelier, na każdym etapie dbamy o to, by gotowa paczka opuszczała nasze ręce w stanie doskonałym.
            </p>
          </div>

          {/* 3 mock photos row with gradients */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {studioImages.map((img, idx) => (
              <div 
                key={idx}
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-neutral-800 p-6 flex flex-col justify-end text-left shadow-lg"
              >
                {/* Back gradient layer with vector representation */}
                <div className={`absolute inset-0 bg-gradient-to-br ${img.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent z-0" />

                <div className="relative z-10 space-y-1">
                  <h4 className="font-serif text-lg font-bold text-white group-hover:text-[#F2C4A0] transition-colors">
                    {img.title}
                  </h4>
                  <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                    {img.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Address and quick info block */}
          <div className="pt-6 border-t border-white/5 max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-neutral-400 text-xs font-mono">
            <div className="flex flex-col items-center gap-1.5">
              <MapPin className="w-5 h-5 text-[#C8765A]" />
              <span>ul. Świdnicka 23, Wrocław</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Mail className="w-5 h-5 text-[#C8765A]" />
              <span>hello@wramie.com</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Phone className="w-5 h-5 text-[#C8765A]" />
              <span>+48 500 XXX XXX</span>
            </div>
          </div>

          <div className="pt-4">
            <a 
              href="mailto:hello@wramie.com"
              className="inline-flex bg-[#C8765A] hover:bg-[#A0522D] text-white text-xs font-bold uppercase tracking-widest py-4 px-8 rounded-full shadow-lg transition-transform duration-300 hover:scale-102 cursor-pointer"
            >
              Napisz do nas &rarr;
            </a>
          </div>

        </div>
      </section>

      {/* 6. CTA KOŃCOWE */}
      <section className="bg-gradient-to-b from-[#C8765A] to-[#A0522D] text-[#FAF7F2] py-20 px-6 md:px-12 text-center flex flex-col items-center justify-center space-y-6">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-mono font-bold tracking-widest text-[#FAF7F2]/80 uppercase block">UNIKALNE WSPOMNIENIE</span>
          <h2 className="font-serif text-3.5xl md:text-5.5xl font-bold text-white leading-tight">
            Gotowy na swój pierwszy plakat?
          </h2>
          <p 
            className="text-2xl md:text-4.5xl text-[#FAF7F2] font-semibold tracking-wide italic"
            style={{ fontFamily: '"Dancing Script", cursive, serif' }}
          >
            Zacznij od czegoś wyjątkowego
          </p>
        </div>
        
        <button
          onClick={() => {
            onNavigate('product');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-white hover:bg-neutral-100 text-[#C8765A] text-xs font-bold uppercase tracking-wider py-5 px-10 rounded-full shadow-xl hover:shadow-black/10 transition-all duration-300 hover:scale-103 cursor-pointer"
        >
          Stwórz plakat &rarr;
        </button>
      </section>

    </div>
  );
};
