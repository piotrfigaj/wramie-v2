import React, { useState } from 'react';
import { RefreshCw, Printer, Mail, ShieldAlert, BadgeHelp, HelpCircle, ChevronDown, CheckCircle2, Package, Globe, Smartphone, Heart } from 'lucide-react';

interface HowItWorksViewProps {
  onNavigate: (view: 'home' | 'product' | 'katalog' | 'kategoria-gwiazdy' | 'o-nas' | 'jak-dziala' | 'faq') => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ onNavigate }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const guarantees = [
    {
      icon: <RefreshCw className="w-10 h-10 text-[#C8765A]" />,
      title: 'Nielimitowane poprawki',
      desc: 'Poprawiamy projekt dopóki nie będziesz nim zachwycony w 100%. Zmiana dedykacji, kolorów czy układu u nas to standard.',
    },
    {
      icon: <Printer className="w-10 h-10 text-[#C8765A]" />,
      title: 'Druk premium',
      desc: 'Używamy matowego papieru Fine Art o gramaturze 250g/m² o matowym wykończeniu oraz japońskich bezwonnych tuszy pigmentowych.',
    },
    {
      icon: <Mail className="w-10 h-10 text-[#C8765A]" />,
      title: 'Podgląd zawsze gratis',
      desc: 'Żaden unikalny plakat nie trafia do maszyny drukarskiej bez Twojej ostatecznej, pisemnej zgody na przesłany w mailu plik dębowy.',
    },
    {
      icon: <Package className="w-10 h-10 text-[#C8765A]" />,
      title: 'Bezpieczne pakowanie',
      desc: 'Wysyłamy w grubych kartonowych tubach lub ubezpieczonych, pięciowarstwowych płaskich kartonach. Nic się nie ma prawa zgiąć.',
    },
    {
      icon: <ShieldAlert className="w-10 h-10 text-[#C8765A]" />,
      title: '14 dni na bezpieczną reklamację',
      desc: 'Udostępniamy procedurę błyskawicznej reklamacji. Jeśli plakat ucierpi w transporcie, drukujemy nowy natychmiast, całkowicie za darmo.',
    },
    {
      icon: <CheckCircle2 className="w-10 h-10 text-[#C8765A]" />,
      title: '4.97 / 5.0 Ocena',
      desc: 'Ponad 2000 zweryfikowanych opinii zakochanych par, rodziców i przyjaciół gwarantuje luksusowe rzemiosło w każdym detalu.',
    },
  ];

  const miniFaqs = [
    {
      q: 'Ile trwa realizacja?',
      a: 'Projekt w formie podglądu PDF otrzymujesz w 24h na swój mail. Po Twojej akceptacji drukujemy, oprawiamy w ramę i przekazujemy kurierowi w 48h. Łącznie to około 3-4 dni robocze od zakupu do dostarczenia paczki do Twojego domu.',
    },
    {
      q: 'Czy mogę zamówić z ramą?',
      a: 'Oczywiście. Oferujemy najwyższej jakości czarne aluminiowe ramy o minimalistycznym profilu w formatach 30×40 cm, 40×50 cm oraz 50×70 cm. Rama kosztuje 79 zł, ma bezpieczne transparentne szkło akrylowe i jest od razu oprawiana — plakat dostarczamy gotowy do zawieszenia.',
    },
    {
      q: 'Co jeśli popełnię błąd w danych?',
      a: 'Bez obaw! Możesz do nas napisać mailowo lub zadzwonić tuż po złożeniu zamówienia. Wprowadzimy poprawki od zaraz. Poza tym zawsze przed drukiem przesyłamy projekt do akceptacji, więc wyłapiesz każdą ewentualną literówkę.',
    },
    {
      q: 'Czy mogę zamówić ekspresowo?',
      a: 'Tak, w procesie składania zamówienia dostępna jest opcja EXPRESS. Wtedy nasz grafik przygotowuje projekt i wysyła podgląd w ciągu 4 godzin od opłacenia za dopłatą 39 zł.',
    },
    {
      q: 'Jakie są dostępne formaty?',
      a: 'Drukujemy w klasycznych i harmonijnych rozmiarach: A4, A3, 30×40 cm, 40×50 cm, 50×70 cm oraz wielkim 70×100 cm. Każdy z nich doskonale pasuje do standardowych, modnych profili.',
    },
  ];

  return (
    <div id="page-jak-dziala" className="page w-full min-h-screen bg-[#FAF7F2] pb-16 selection:bg-[#F2C4A0]/60 text-left pt-20">
      
      {/* 1. HERO SEKCJA */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-[#FAF7F2] overflow-hidden px-6 md:px-12 py-16">
        
        {/* Huge dynamic decorative number 3 absolute behind */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none select-none z-0">
          <span className="font-serif font-black text-[380px] md:text-[500px] text-[#2C2416] leading-none translate-y-8">
            3
          </span>
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10 w-full">
          <span className="inline-block text-xs font-mono font-bold tracking-[2px] text-[#C8765A] uppercase bg-[#C8765A]/5 px-3 py-1 rounded-full border border-[#C8765A]/25">
            ✦ PROSTO I PRZEJRZYŚCIE
          </span>
          <h1 className="font-serif text-4.5xl md:text-6.5xl font-bold text-[#2C2416] tracking-tight leading-tight">
            Gotowe w 3 prostych <br />
            <em className="text-[#C8765A] not-italic italic font-serif font-light">krokach</em>
          </h1>
          <p className="font-sans text-sm md:text-base text-[#2C2416]/75 max-w-xl mx-auto leading-relaxed">
            Od momentu wysłania pomysłu po chwile zawieszenia gotowej ramy na Twojej ścianie. Dbamy o najwyższą wygodę i rzemieślnicze zadowolenie.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 text-xs font-semibold text-[#8B5A2B]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E8DFD0] shadow-sm">⚡ Projekt w 24h</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E8DFD0] shadow-sm">📦 Wysyłka 48h</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E8DFD0] shadow-sm">✓ Podgląd zanim wyślemy</span>
          </div>
        </div>
      </section>

      {/* 2. GŁÓWNY PROCES — INTERAKTYWNY PIONOWY TIMELINE */}
      <section className="relative py-16 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#E8DFD0]/60">
        
        {/* Central decorative dashed line (Desktop timeline path) */}
        <div className="absolute left-[30px] md:left-1/2 top-10 bottom-10 w-[2px] bg-dashed border-l-2 border-dashed border-[#C8765A]/30 -translate-x-1/2 z-0" />

        <div className="space-y-24 md:space-y-36 relative z-10">
          
          {/* KROK 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            
            {/* Col Text: Left on Desktop */}
            <div className="relative pl-12 md:pl-0 md:pr-16 text-left space-y-4">
              {/* Outer timeline indicator */}
              <div className="absolute left-0 md:left-auto md:right-[-38px] top-1 md:top-1/2 md:-translate-y-1/2 w-6 h-6 rounded-full bg-[#FAF7F2] border-4 border-[#C8765A] z-20 flex items-center justify-center shadow" />
              
              {/* Giant number placeholder */}
              <div className="absolute -top-12 left-0 md:left-auto md:right-4 opacity-15 select-none font-serif font-black text-[96px] text-[#F2C4A0] leading-none z-0">
                01
              </div>

              <span className="inline-block text-[10px] font-mono font-bold tracking-[1.5px] text-[#C8765A] uppercase bg-[#C8765A]/5 px-2.5 py-0.5 rounded">
                Zaczyna się od Ciebie
              </span>
              <h3 className="font-serif text-2.5xl md:text-3.5xl font-bold text-[#2C2416] leading-tight">
                Wybierz i spersonalizuj
              </h3>
              <p className="font-sans text-xs md:text-sm text-[#2C2416]/75 leading-relaxed">
                Wybierz kategorię plakatu i artystyczny szablon. Następnie wypełnij prosty formularz — wpisz datę, miejsce, imiona oraz unikalną dedykację, która ma rzeźbić dół kompozycji. Zajmie Ci to najwyżej 3 minuty.
              </p>

              <ul className="text-xs space-y-1.5 text-[#2C2416]/80 pt-2 font-sans font-medium">
                <li className="flex items-center gap-2">
                  <span className="text-[#C8765A]">✓</span>
                  <span>Ponad 200 szlachetnych szablonów do wyboru</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#C8765A]">✓</span>
                  <span>Wysoce estetyczny podgląd na żywo w formularzu</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#C8765A]">✓</span>
                  <span>Możliwość swobodnej modyfikacji po złożeniu zamówienia</span>
                </li>
              </ul>
            </div>

            {/* Col Visual: Right on Desktop (MacBook styled simulated form preview) */}
            <div className="flex justify-center pl-10 md:pl-0">
              <div className="w-full max-w-[420px] bg-neutral-900 rounded-2xl shadow-xl overflow-hidden p-2 border border-neutral-800">
                <div className="flex gap-1.5 pb-2 px-2 border-b border-neutral-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                {/* Simulated Web Interface */}
                <div className="bg-[#FAF7F2] p-5 rounded-lg text-[#2C2416] font-sans space-y-3.5 text-xs text-left">
                  <div className="bg-[#2C2416] text-[#C9A84C] font-mono text-[8px] tracking-widest p-1.5 rounded uppercase font-bold text-center">
                    ⚒ KREATOR MODELU GWIAZD
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">1. Wpisz Nagłówek</label>
                    <input type="text" readOnly value="Natalia & Kacper" className="w-full bg-white border border-[#2C2416]/10 px-3 py-1.5 rounded text-[#2C2416] outline-none" style={{ borderLeft: '3px solid #C8765A' }} />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">2. Data</label>
                      <input type="text" readOnly value="23 LIPCA 2025" className="w-full bg-white border border-[#2C2416]/10 px-3 py-1.5 rounded text-[#2C2416] outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">3. Lokalizacja</label>
                      <input type="text" readOnly value="Wrocław, PL" className="w-full bg-white border border-[#2C2416]/10 px-3 py-1.5 rounded text-[#2C2416] outline-none" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">4. Osobista Dedykacja</label>
                    <input type="text" readOnly value="Pod gwiazdami wszystko się zaczęło..." className="w-full bg-white border border-[#2C2416]/10 px-3 py-1.5 rounded text-[#2C2416] outline-none" />
                  </div>

                  <div className="bg-[#F5F0E8] p-2.5 rounded border border-[#E8DFD0] flex items-center justify-between">
                    <div>
                      <span className="block text-[8px] uppercase font-bold tracking-widest text-neutral-500">FORMAT</span>
                      <span className="text-[11px] font-bold text-[#2C2416]">Format 40x50 cm + Rama</span>
                    </div>
                    <span className="text-xs font-bold text-[#C8765A]">198 zł / szt</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* KROK 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            
            {/* Col Visual: Left on Desktop (iPhone styled simulated email view) */}
            <div className="flex justify-center pr-0 md:pr-10 order-2 md:order-1 pl-10 md:pl-0">
              <div className="w-full max-w-[280px] bg-neutral-900 rounded-[38px] p-2.5 shadow-xl border-[4px] border-neutral-800 aspect-[9/16] flex flex-col justify-between">
                
                {/* Top dynamic notch */}
                <div className="w-28 h-4.5 bg-neutral-800 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="w-2.5 h-1 bg-neutral-900 rounded-full" />
                </div>

                <div className="bg-white flex-1 rounded-[30px] p-4 text-[#2C2416] font-sans flex flex-col justify-between overflow-hidden text-left relative text-xs">
                  <div className="space-y-3.5">
                    {/* Header simulated info */}
                    <div className="border-b border-neutral-100 pb-2.5 space-y-1">
                      <span className="text-[9px] text-neutral-400 block font-semibold uppercase leading-none">NADAWCA:</span>
                      <span className="text-[10px] font-bold text-[#C8765A] block leading-none">projekt@wramie.com &bull; 24h</span>
                      <span className="text-[11px] text-[#2C2416] block font-bold mt-1 leading-tight">Twój podgląd jest zaplanowany! ✨</span>
                    </div>

                    {/* Simulation mockup graphic */}
                    <div className="bg-[#F5F0E8] p-3 rounded-xl border border-[#E8DFD0] space-y-3">
                      <div className="text-center text-[9px] leading-tight-dense font-serif">
                        <span className="block font-bold">MINIATURA MODELU</span>
                        <span className="text-[#C8765A] font-bold text-[8px]">Natalia &amp; Kacper</span>
                      </div>
                      {/* Circle inside miniature */}
                      <div className="w-16 h-16 rounded-full border-2 border-[#C8765A] mx-auto flex items-center justify-center bg-sky-950">
                        <span className="text-white text-[10px]">&bull;</span>
                      </div>
                      <div className="flex justify-center gap-1">
                        <span className="px-1.5 py-0.5 bg-white text-[7px] font-bold rounded">AKCEPTUJĘ ✓</span>
                        <span className="px-1.5 py-0.5 bg-red-150 text-[7px] font-bold text-red-650 rounded">CHCĘ ZMIAN ✍</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[8.5px] text-neutral-400 leading-relaxed text-center italic mt-2">
                    Możesz zgłaszać nieskończenie wiele zmian! Wydrukujemy po pełnej akceptacji.
                  </p>
                </div>
              </div>
            </div>

            {/* Col Text: Right on Desktop */}
            <div className="relative pl-12 md:pl-0 md:pl-16 text-left space-y-4 order-1 md:order-2">
              {/* Outer timeline indicator */}
              <div className="absolute left-0 md:left-[-38px] top-1 md:top-1/2 md:-translate-y-1/2 w-6 h-6 rounded-full bg-[#FAF7F2] border-4 border-[#C8765A] z-20 flex items-center justify-center shadow" />

              {/* Giant number placeholder */}
              <div className="absolute -top-12 left-0 md:left-4 opacity-15 select-none font-serif font-black text-[96px] text-[#F2C4A0] leading-none z-0">
                02
              </div>

              <span className="inline-block text-[10px] font-mono font-bold tracking-[1.5px] text-white uppercase bg-[#C8765A] px-2.5 py-0.5 rounded">
                Nasz ruch
              </span>
              <h3 className="font-serif text-2.5xl md:text-3.5xl font-bold text-[#2C2416] leading-tight">
                Projekt w 24 godziny
              </h3>
              <p className="font-sans text-xs md:text-sm text-[#2C2416]/75 leading-relaxed">
                Nasz profesjonalny projektant ręcznie przygotowuje plakat na podstawie podanych zapytań. Wyrównuje detale, bada proporcje, dba o idealny krój czcionek. Do 24h od zakupu wysyłamy na Twój e-mail plik PDF w dużej skali do wglądu.
              </p>

              <ul className="text-xs space-y-1.5 text-[#2C2416]/80 pt-2 font-sans font-medium">
                <li className="flex items-center gap-2">
                  <span className="text-[#C8765A]">✓</span>
                  <span>Indywidualny, polski artysta projektant, a nie suchy automat</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#C8765A]">✓</span>
                  <span>Plik PDF w pełnej docelowej rozdzielczości do wglądu</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#C8765A]">✓</span>
                  <span>Całkowicie nielimitowane, darmowe poprawki aż do pełnego zachwytu</span>
                </li>
              </ul>
            </div>

          </div>

          {/* KROK 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            
            {/* Col Text: Left on Desktop */}
            <div className="relative pl-12 md:pl-0 md:pr-16 text-left space-y-4">
              {/* Outer timeline indicator */}
              <div className="absolute left-0 md:left-auto md:right-[-38px] top-1 md:top-1/2 md:-translate-y-1/2 w-6 h-6 rounded-full bg-[#FAF7F2] border-4 border-[#C8765A] z-20 flex items-center justify-center shadow" />

              {/* Giant number placeholder */}
              <div className="absolute -top-12 left-0 md:left-auto md:right-4 opacity-15 select-none font-serif font-black text-[96px] text-[#F2C4A0] leading-none z-0">
                03
              </div>

              <span className="inline-block text-[10px] font-mono font-bold tracking-[1.5px] text-[#C8765A] uppercase bg-[#C8765A]/5 px-2.5 py-0.5 rounded">
                Finisz
              </span>
              <h3 className="font-serif text-2.5xl md:text-3.5xl font-bold text-[#2C2416] leading-tight">
                Druk, pakowanie i ubezpieczona wysyłka
              </h3>
              <p className="font-sans text-xs md:text-sm text-[#2C2416]/75 leading-relaxed">
                Po Twoim pisemnym potwierdzeniu, zlecenie kierujemy do naszego studio druku. Powstaje on na ploterach z bezwonnymi tuszami pigmentowymi, na papierze Fine Art 250g. Pakujemy go w ozdobny ozdobny sztywny karton lub ramę kurierską. Cała wysyłka opuszcza nasz magazyn w 48h.
              </p>

              <ul className="text-xs space-y-1.5 text-[#2C2416]/80 pt-2 font-sans font-medium">
                <li className="flex items-center gap-2">
                  <span className="text-[#C8765A]">✓</span>
                  <span>Papier Fine Art 250g/m² ze zrównoważonych źródeł z certyfikatem FSC</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#C8765A]">✓</span>
                  <span>Tusze pigmentowe o gwarantowanej odporności na blaknięcie ponad 100 lat</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#C8765A]">✓</span>
                  <span>Paczkę owijamy bibułką ozdobną — natychmiast gotowa do przekazania</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#C8765A]">✓</span>
                  <span>Wydajna dostawa InPost Paczkomat lub ubezpieczony kurier krajowy</span>
                </li>
              </ul>
            </div>

            {/* Col Visual: Right on Desktop (Simulated cardboard parcel preview) */}
            <div className="flex justify-center pl-10 md:pl-0">
              <div className="w-full max-w-[340px] bg-gradient-to-br from-[#d97706] to-[#b45309] rounded-2xl p-6 text-white font-mono space-y-4 shadow-xl border border-amber-500/10 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute right-[-10%] top-[-10%] w-24 h-24 bg-white/5 rounded-full pointer-events-none" />
                
                {/* Simulated sticker label */}
                <div className="bg-white text-black p-3.5 rounded-lg space-y-2 text-[9px] text-left">
                  <div className="flex justify-between font-bold border-b border-neutral-100 pb-1.5">
                    <span>NADAWCA: wramie.com PL</span>
                    <span>DOSTAWA: INPOST</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="block font-bold">NATALIA KOWALSKA</span>
                    <span className="block opacity-70">UL. RYNEK 45 / 3, WROCŁAW</span>
                  </div>
                  <div className="border border-black p-1 text-center font-bold font-mono tracking-widest text-[8px] bg-neutral-50 uppercase">
                    ☘ OSTROŻNIE: NIE ZGINAĆ!
                  </div>
                </div>

                {/* Simulated parcel strings */}
                <div className="h-10 border-t border-dashed border-white/20 flex items-center justify-between text-[10px] font-sans font-bold pt-2">
                  <span className="inline-flex items-center gap-1">📦 PACZKA UBEZPIECZONA</span>
                  <span className="text-[#F2C4A0]">100% ECO</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. CO GWARANTUJEMY — PASKI */}
      <section className="py-20 bg-[#F5F0E8] border-t border-b border-[#E8DFD0]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center space-y-14">
          
          <div className="space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-mono font-bold tracking-widest text-[#C8765A] uppercase block">KOMFORT I ZAUFANIE</span>
            <h2 className="font-serif text-3.5xl md:text-5xl font-bold text-[#2C2416] tracking-tight">
              Co gwarantujemy w cenie
            </h2>
            <p className="font-sans text-sm text-[#2C2416]/70 leading-relaxed">
              Dla każdego klienta oferujemy pełny butikowy luksus, bez żadnych nieprzyjemnych niespodzianek na żadnym kroku.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {guarantees.map((g, i) => (
              <div 
                key={i} 
                className="bg-white p-7 rounded-3xl border-t-[4px] border-[#C8765A] shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
                    {g.icon}
                  </div>
                  <h3 className="font-serif text-[18px] font-bold text-[#2C2416]">
                    {g.title}
                  </h3>
                  <p className="text-xs md:text-[13px] text-[#2C2416]/70 leading-relaxed font-sans">
                    {g.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. FAQ MINI (5 pytań) */}
      <section className="py-20 bg-[#FAF7F2] max-w-4xl mx-auto px-6">
        <div className="text-center space-y-12">
          
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-[#C8765A] uppercase block">SZYBKIE ODPOWIEDZI</span>
            <h2 className="font-serif text-3.5xl md:text-[42px] font-bold text-[#2C2416] tracking-tight">
              Najczęstsze pytania
            </h2>
          </div>

          {/* Accordion List */}
          <div className="divide-y divide-[#E8DFD0] border-t border-b border-[#E8DFD0] text-left">
            {miniFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="py-5 font-sans">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex justify-between items-center text-left py-1 text-[#2C2416] hover:text-[#C8765A] transition-colors focus:outline-none cursor-pointer"
                  >
                    <span className="font-serif font-bold text-base md:text-[18px]">
                      {faq.q}
                    </span>
                    <span className={`transition-transform duration-300 transform p-1.5 bg-[#2C2416]/5 rounded-full ${isOpen ? 'rotate-135 bg-[#C8765A]/10 text-[#C8765A]' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                  
                  {/* Transition container */}
                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{
                      maxHeight: isOpen ? '400px' : '0px',
                      opacity: isOpen ? '100%' : '0%',
                    }}
                  >
                    <p className="text-xs md:text-sm text-[#2C2416]/80 pt-3.5 leading-relaxed font-sans">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. GWARANCJE I CTA KOŃCOWE */}
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
