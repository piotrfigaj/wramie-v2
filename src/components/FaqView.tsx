import React, { useState } from 'react';
import { Search, ChevronDown, Mail, MessageCircle, Phone, Package, Edit, RotateCcw, Image, CreditCard, Gift, Send } from 'lucide-react';

interface FaqViewProps {
  onNavigate: (view: 'home' | 'product' | 'katalog' | 'kategoria-gwiazdy' | 'o-nas' | 'jak-dziala' | 'faq') => void;
}

interface FaqItem {
  q: string;
  a: string;
}

interface FaqCategory {
  title: string;
  id: string;
  items: FaqItem[];
}

export const FaqView: React.FC<FaqViewProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const categories: FaqCategory[] = [
    {
      title: 'ZAMÓWIENIA I WYSYŁKA',
      id: 'shipping',
      items: [
        { q: 'Ile trwa wysyłka?', a: 'Wysyłamy ubezpieczonym kurierem DPD oraz poprzez InPost Paczkomaty. Standardowy czas dostawy to 1-2 dni robocze od przekazania paczki. Paczkomaty są dostępne dla formatów do 40×50 cm.' },
        { q: 'Jak śledzić paczkę?', a: 'Po przekazaniu paczki kurierowi wysyłamy e-mail oraz SMS o planowanej dostawie wraz z aktywnym linkiem do śledzenia przesyłki.' },
        { q: 'Czy mogę zmienić adres po zamówieniu?', a: 'Tak, pod warunkiem, że plakat nie opuścił jeszcze we Wrocławiu naszego magazynu. Prosimy o natychmiastowy kontakt (temat: ZMIANA ADRESU).' },
        { q: 'Wysyłka za granicę?', a: 'Tak, z ogromną chęcią wysyłamy do wszystkich krajów Unii Europejskiej. Koszt wysyłki międzynarodowej wynosi od 25 zł, a średni prognozowany czas dostawy to około 3-7 dni roboczych.' },
        { q: 'Ile kosztuje wysyłka?', a: 'Dla wszystkich zamówień o wartości powyżej 149 zł wysyłka jest całkowicie darmowa. Poniżej tej kwoty: Paczkomat InPost kosztuje 9,90 zł, a przesyłka Kurierska 14,90 zł.' }
      ]
    },
    {
      title: 'PERSONALIZACJA',
      id: 'personalization',
      items: [
        { q: 'Czy mogę dodać własne zdjęcie?', a: 'Tak! W przypadku "Portretu Pupila" ładujesz plik graficzny pupila poprzez nasz interaktywny formularz przed zamówieniem. Nasz rysownik na tej podstawie projektuje resztę.' },
        { q: 'Jak podać współrzędne GPS?', a: 'Podaj w formularzu samo miasto — nasz algorytm samoczynnie odszuka oficjalne, precyzyjne współrzędne geograficzne i umieści je w pięknym seryjnym formacie.' },
        { q: 'Mogę mieć tekst po angielsku?', a: 'Oczywiście. Możesz wpisywać słowa w dowolnym języku królewskim świata (angielski, hiszpański itp.) — nasz system i projektanci bez problemu to przygotują.' },
        { q: 'Ile znaków zmieści się w dedykacji?', a: 'W standardowym formacie mieścimy do 80 znaków na dole plakatu, aby zachować idealne proporcje. Jeśli potrzebujesz dłuższego wiersza, skontaktuj się z nami — dostosujemy szablon specjalnie dla Ciebie.' }
      ]
    },
    {
      title: 'ZWROTY I REKLAMACJE',
      id: 'returns',
      items: [
        { q: 'Mam prawo do zwrotu?', a: 'Zgodnie z polskim prawem (art. 38 ustawy o prawach konsumenta), produkty personalizowane wytwarzane na indywidualne zamówienie nie podlegają standardowemu zwrotowi bez podania przyczyny. Jeśli jednak cokolwiek w projekcie poszło nie po Twojej myśli, zapraszamy do kontaktu — dbamy o zadowolenie i zawsze znajdziemy satysfakcjonujące rozwiązanie!' },
        { q: 'Plakat dotarł uszkodzony — co robić?', a: 'Zrób szybkie zdjęcie zniszczonej paczki lub plakatu i wyślij je na nasz adres: hello@wramie.com. Bez zadawania zbędnych pytań zlecimy natychmiastowy wydruk i ponowną wysyłkę nowego egzemplarza na nasz koszt.' },
        { q: 'Plakat nie wygląda jak na podglądzie', a: 'Kolory wydruku na papierze fine art mogą nieznacznie różnić się (około 5-10%) od obrazu wyświetlanego na podświetlanym ekranie telefonu ze względu na przestrzeń barwną CMYK. Jeśli uważasz, że rozbieżność jest zbyt silna, napisz — pomożemy!' }
      ]
    }
  ];

  const helpCategories = [
    { icon: <Package className="w-8 h-8 text-[#C8765A]" />, title: 'Zamówienia i wysyłka', desc: 'Śledzenie przesyłek, terminy dostaw, opcje kurierskie', count: '12 artykułów', term: 'Wysyłka' },
    { icon: <Edit className="w-8 h-8 text-[#C8765A]" />, title: 'Personalizacja', desc: 'Jak podawać dane, poprawki tekstowe, opcje kreatora', count: '8 artykułów', term: 'Personalizacja' },
    { icon: <RotateCcw className="w-8 h-8 text-[#C8765A]" />, title: 'Zwroty i reklamacje', desc: 'Uszkodzenia w transporcie, polityka reklamacji', count: '6 artykułów', term: 'Zwrot' },
    { icon: <Image className="w-8 h-8 text-[#C8765A]" />, title: 'Produkty i formaty', desc: 'Dostępne rozmiary, ramy aluminiowe, gatunki papieru', count: '10 artykułów', term: 'Ramy' },
    { icon: <CreditCard className="w-8 h-8 text-[#C8765A]" />, title: 'Płatności', desc: 'Metody BLIK, Przelewy24, rozliczenie i faktury', count: '5 artykułów', term: 'Płatności' },
    { icon: <Gift className="w-8 h-8 text-[#C8765A]" />, title: 'Karty podarunkowe', desc: 'Zasady bonów prezentowych i ozdobne pakowanie', count: '4 artykuły', term: 'Prezent' }
  ];

  const toggleItem = (categoryIndex: number, itemIndex: number) => {
    const key = `${categoryIndex}-${itemIndex}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Live filter FAQ results based on searchQuery textcontent
  const normalizedQuery = searchQuery.trim().toLowerCase();

  // Filter Categories & Items based on user search query matching question or answer
  const filteredCategories = categories.map((cat, catIdx) => {
    const matchedItems = cat.items.filter(
      (item) =>
        item.q.toLowerCase().includes(normalizedQuery) ||
        item.a.toLowerCase().includes(normalizedQuery)
    );
    return { ...cat, items: matchedItems };
  }).filter((cat) => cat.items.length > 0);

  const totalResults = filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <div id="page-faq" className="page w-full min-h-screen bg-[#FAF7F2] pb-16 selection:bg-[#F2C4A0]/60 text-left pt-20">
      
      {/* 1. HERO SEARCH (mały, ~300px) */}
      <section className="bg-[#2C2416] text-white py-16 px-6 md:px-12 relative overflow-hidden flex flex-col items-center justify-center text-center">
        {/* Ambient decorative backgrounds */}
        <div className="absolute right-[-10%] top-[-10%] w-72 h-72 bg-[#C8765A]/15 rounded-full filter blur-2xl pointer-events-none" />
        <div className="absolute left-[-10%] bottom-[-10%] w-60 h-60 bg-[#F2C4A0]/10 rounded-full filter blur-2xl pointer-events-none" />

        <div className="max-w-xl w-full space-y-5 relative z-10 flex flex-col items-center">
          <h1 className="font-serif text-3.5xl md:text-5xl font-bold text-white tracking-tight leading-none leading-tight-dense">
            Jak możemy <br />
            <em className="text-[#F2C4A0] italic not-italic font-light font-serif">pomóc?</em>
          </h1>
          
          {/* Custom Search Input Panel */}
          <div className="w-full max-w-[560px] relative text-neutral-600 bg-white rounded-full flex items-center p-1 border border-white/10 shadow-lg group-focus-within:ring-2 group-focus-within:ring-[#C8765A]/30">
            <span className="pl-4.5 pr-2.5 text-neutral-400">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Szukaj odpowiedzi (np. zwrot, wysyłka, ramy)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent px-2.5 py-3 outline-none text-xs md:text-sm text-[#2C2416] font-medium placeholder-neutral-400 font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 px-3.5 text-xs font-semibold text-neutral-400 hover:text-[#C8765A] cursor-pointer"
              >
                wyczyść
              </button>
            )}
          </div>

          {/* Rapid Tag Suggestions below input */}
          <div className="flex flex-wrap gap-2 pt-1 justify-center text-[11px] font-sans font-medium text-neutral-400">
            <span>Popularne tematy:</span>
            {['Zwrot', 'Wysyłka', 'Personalizacja', 'Ramy'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="text-[#F2C4A0] hover:text-white transition-colors cursor-pointer border-b border-[#F2C4A0]/20 hover:border-white leading-none pb-0.5"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. KATEGORIE POMOCY */}
      <section className="py-16 bg-[#FAF7F2] border-b border-[#E8DFD0]/65 text-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-[#C8765A] uppercase block">DOKUMENTACJA BAZY</span>
            <h2 className="font-serif text-3.5xl md:text-4.5xl font-bold text-[#2C2416] tracking-tight">
              Wybierz kategorię pomocy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((h, i) => (
              <div
                key={i}
                onClick={() => setSearchQuery(h.term)}
                className="group bg-white p-6 rounded-3xl border border-[#2C2416]/5 hover:border-[#C8765A] hover:-translate-y-1 transition-all duration-300 shadow-xs text-left cursor-pointer flex flex-col justify-between min-h-[170px]"
              >
                <div className="space-y-3 text-left">
                  <span className="w-12 h-12 bg-[#F5F0E8] rounded-xl flex items-center justify-center">
                    {h.icon}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#2C2416] group-hover:text-[#C8765A] transition-colors leading-tight">
                    {h.title}
                  </h3>
                  <p className="text-xs text-[#2C2416]/60 leading-relaxed font-sans">
                    {h.desc}
                  </p>
                </div>
                
                <span className="text-[11px] font-bold text-[#C8765A] mt-4 font-mono uppercase block">
                  {h.count} &rarr;
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. ROZBUDOWANE FAQ PO KATEGORIACH (ACCORDION) */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-left">
          
          {normalizedQuery ? (
            <div className="pb-6 border-b border-[#E8DFD0] mb-8">
              <span className="text-xs font-mono font-bold tracking-widest text-[#C8765A] uppercase block">WYNIKI WYSZUKIWANIA</span>
              <p className="text-sm font-sans text-[#2C2416]/70 pt-1">
                Znaleziono <strong className="text-[#C8765A] font-bold">{totalResults}</strong> odpowiedzi dla hasła &ldquo;{searchQuery}&rdquo;:
              </p>
            </div>
          ) : null}

          {/* Conditional results rendering */}
          {filteredCategories.length > 0 ? (
            <div className="space-y-16">
              {filteredCategories.map((cat, catIdx) => (
                <div key={cat.id} className="space-y-6">
                  
                  {/* Category Header */}
                  <h3 className="font-serif text-[#2C2416] text-xl md:text-2xl font-bold border-b-2 border-[#C8765A] pb-2 tracking-tight">
                    {cat.title}
                  </h3>

                  <div className="divide-y divide-[#E8DFD0]">
                    {cat.items.map((item, itemIdx) => {
                      const key = `${catIdx}-${itemIdx}`;
                      const isOpen = !!openItems[key];
                      
                      return (
                        <div key={itemIdx} className="py-4.5 text-left font-sans">
                          
                          <button
                            onClick={() => toggleItem(catIdx, itemIdx)}
                            className="w-full flex justify-between items-center text-left py-1 text-[#2C2416] hover:text-[#C8765A] transition-colors cursor-pointer"
                          >
                            <span className="font-serif font-bold text-base md:text-[17px]">
                              {item.q}
                            </span>
                            <span className={`p-1.5 rounded-full transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#C8765A]/10 text-[#C8765A]' : 'bg-[#2C2416]/5'}`}>
                              <ChevronDown className="w-3.5 h-3.5" />
                            </span>
                          </button>

                          <div
                            className="overflow-hidden transition-all duration-300 ease-in-out"
                            style={{
                              maxHeight: isOpen ? '450px' : '0px',
                              opacity: isOpen ? '100%' : '0%'
                            }}
                          >
                            <p className="text-xs md:text-sm text-[#2C2416]/85 pt-3 leading-relaxed font-sans">
                              {item.a}
                            </p>
                          </div>

                        </div>
                      );
                    })}
                  </div>

                </div>
              ))}
            </div>
          ) : (
            /* Wynik 0 wyników: pokaż komunikat */
            <div className="bg-[#F5F0E8] p-8 rounded-3xl border border-[#C8765A]/20 text-center space-y-4 max-w-lg mx-auto shadow-sm my-8">
              <span className="text-4xl text-[#C8765A] block">🔍</span>
              <h3 className="font-serif text-lg md:text-xl font-bold text-[#2C2416]">
                Nie znaleźliśmy dopasowań dla &ldquo;{searchQuery}&rdquo;
              </h3>
              <p className="text-xs md:text-sm text-[#2C2416]/70 leading-relaxed font-sans font-medium">
                Bez obaw! Możesz zapytać nas o to bezpośrednio. Cały nasz mały wrocławski zespół doradzi Ci natychmiast na czacie lub mailowo.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                }}
                className="text-xs font-bold uppercase tracking-widest text-[#C8765A] hover:text-[#A0522D] block mx-auto pt-2 underline cursor-pointer"
              >
                Pokaż wszystkie pytania
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 4. KONTAKT BEZPOŚREDNI */}
      <section className="py-20 bg-[#2C2416] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center space-y-12">
          
          <div className="space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-mono font-bold tracking-widest text-[#F2C4A0] uppercase block">NA WYCIĄGNIĘCIE RĘKI</span>
            <h2 className="font-serif text-3.5xl md:text-4.5xl font-bold text-white tracking-tight">
              Nie znalazłeś odpowiedzi?
            </h2>
            <p className="font-sans text-sm text-neutral-300 leading-relaxed">
              Jesteśmy dla Ciebie dostępni od poniedziałku do piątku w godzinach 9:00 - 17:00. Pomożemy w wyborze rozmiaru i tekście!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto">
            
            {/* E-mail Card */}
            <div className="bg-[#1C1510] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3.5">
                <span className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#C8765A]">
                  <Mail className="w-6 h-6" />
                </span>
                <h3 className="font-serif text-xl font-bold text-white leading-none">E-mail</h3>
                <p className="text-sm font-semibold text-[#F2C4A0]">hello@wramie.com</p>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  Odpowiadamy w ciągu maksymalnie 2 godzin (pon-pt 9-17).
                </p>
              </div>
              <a
                href="mailto:hello@wramie.com"
                className="w-full bg-[#C8765A] hover:bg-[#A0522D] text-white text-[11px] font-bold uppercase tracking-widest py-3 rounded-full text-center shadow transition-colors cursor-pointer"
              >
                Napisz &rarr;
              </a>
            </div>

            {/* Chat Card */}
            <div className="bg-[#1C1510] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3.5">
                <span className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#C8765A]">
                  <MessageCircle className="w-6 h-6" />
                </span>
                <h3 className="font-serif text-xl font-bold text-white leading-none">Czat na żywo</h3>
                <p className="text-sm font-semibold text-[#F2C4A0]">Bąbelek czatu na dole</p>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  Nasz wrocławski doradca klienta czeka online po kliknięciu.
                </p>
              </div>
              <button
                onClick={() => alert('W tym demo okienko czatu otworzyło się mentalnie. Nasz konsultant prześle pozdrowienia!')}
                className="w-full bg-[#C8765A] hover:bg-[#A0522D] text-white text-[11px] font-bold uppercase tracking-widest py-3 rounded-full text-center shadow transition-colors cursor-pointer border-none"
              >
                Otwórz czat &rarr;
              </button>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-[#1C1510] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3.5">
                <span className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#C8765A]">
                  <Phone className="w-6 h-6" />
                </span>
                <h3 className="font-serif text-xl font-bold text-white leading-none">WhatsApp</h3>
                <p className="text-sm font-semibold text-[#F2C4A0]">+48 500 XXX XXX</p>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  Zadaj szybkie pytanie o plon lub podgląd zamówienia przez telefon.
                </p>
              </div>
              <a
                href="https://wa.me/48500000000"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#C8765A] hover:bg-[#A0522D] text-white text-[11px] font-bold uppercase tracking-widest py-3 rounded-full text-center shadow transition-colors cursor-pointer"
              >
                Napisz na WhatsApp &rarr;
              </a>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
