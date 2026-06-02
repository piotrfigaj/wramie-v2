import React from 'react';
import { PosterCustomization } from '../types';

interface PosterMockProps {
  customization: PosterCustomization;
  interactive?: boolean;
}

export const PosterMock: React.FC<PosterMockProps> = ({ customization, interactive = false }) => {
  const {
    type,
    title,
    subtitle,
    dateString,
    location,
    theme,
    hasFrame,
    petStyle = 'royal',
    passionTheme = 'music',
  } = customization;

  // Frame Styles mapping
  const frameClass = hasFrame ? 'frame-black' : '';

  // Theme color values for the outer border or details
  const getThemeColors = () => {
    switch (theme) {
      case 'black':
        return {
          bg: 'from-[#1A1A1A] to-[#0A0A0A]',
          text: 'text-neutral-100',
          mutedText: 'text-neutral-400',
          accentColor: '#FFFFFF',
          accentText: 'text-white',
          border: 'border-neutral-800',
          circleStroke: '#FFFFFF',
          svgFilter: 'invert(1)',
        };
      case 'gold':
        return {
          bg: 'from-[#42311C] via-[#2A1E11] to-[#120B04]',
          text: 'text-[#F5EAD4]',
          mutedText: 'text-[#C9A84C]/70',
          accentColor: '#C9A84C',
          accentText: 'text-[#C9A84C]',
          border: 'border-[#42311C]',
          circleStroke: '#C9A84C',
          svgFilter: 'none',
        };
      case 'cream':
        return {
          bg: 'from-[#FDFBF7] to-[#F5F0E8]',
          text: 'text-[#2C2416]',
          mutedText: 'text-[#8C7A65]',
          accentColor: '#C8765A',
          accentText: 'text-[#C8765A]',
          border: 'border-[#E8DFD0]',
          circleStroke: '#2C2416',
          svgFilter: 'none',
        };
      case 'night':
      default:
        return {
          bg: 'from-[#1B2A4A] via-[#0D1B2A] to-[#050B14]',
          text: 'text-slate-100',
          mutedText: 'text-slate-400',
          accentColor: '#F2C4A0',
          accentText: 'text-[#F2C4A0]',
          border: 'border-slate-800',
          circleStroke: '#F2C4A0',
          svgFilter: 'none',
        };
    }
  };

  const colors = getThemeColors();

  // Draw Stars View
  const renderStars = () => {
    return (
      <div className={`w-full h-full bg-gradient-to-b ${colors.bg} flex flex-col justify-between p-6 relative`}>
        {/* Subtle Milkyway Ellipse */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="50%" cy="40%" rx="180" ry="90" fill="url(#milkyway-grad)" transform="rotate(-25 150 150)" filter="blur(25px)" />
            <defs>
              <radialGradient id="milkyway-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={colors.accentColor} stopOpacity="0.8" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Twinkling star elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="star absolute w-1 h-1 bg-white rounded-full top-1/4 left-1/3" />
          <div className="star absolute w-[2px] h-[2px] bg-white rounded-full top-[15%] left-[70%]" />
          <div className="star absolute w-1.5 h-1.5 bg-[#FAF0D9] rounded-full top-1/2 left-[80%]" />
          <div className="star absolute w-[2px] h-[2px] bg-white rounded-full top-[70%] left-[25%]" />
          <div className="star absolute w-[3px] h-[3px] bg-amber-200 rounded-full top-[35%] left-[85%]" />
          <div className="star absolute w-[1px] h-[1px] bg-white rounded-full top-[55%] left-[15%]" />
          <div className="star absolute w-[2px] h-[2px] bg-white rounded-full top-10 left-[45%]" />
          <div className="star absolute w-[3px] h-[3px] bg-slate-300 rounded-full top-[64%] left-[68%]" />
        </div>

        {/* Main Constellation Circle */}
        <div className="relative flex-1 flex items-center justify-center pt-4">
          <svg className="w-[82%] aspect-square relative" viewBox="0 0 200 200">
            {/* Outer Constellation Ring */}
            <circle cx="100" cy="100" r="94" fill="none" stroke={colors.circleStroke} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
            <circle cx="100" cy="100" r="90" fill="none" stroke={colors.circleStroke} strokeWidth="1" />
            
            {/* Grid coordinates tickers around circle */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const x1 = 100 + 90 * Math.cos(angle);
              const y1 = 100 + 90 * Math.sin(angle);
              const x2 = 100 + 86 * Math.cos(angle);
              const y2 = 100 + 86 * Math.sin(angle);
              return (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={colors.circleStroke} strokeWidth="0.8" opacity="0.6" />
              );
            })}

            {/* Constellation lines */}
            <g opacity="0.7">
              {/* Ursa Major mock */}
              <polyline points="45,95 65,85 85,90 100,75 125,75 140,88 120,105 100,75" fill="none" stroke={theme === 'cream' ? '#555' : '#E8EEF4'} strokeWidth="0.75" className="constellation-line" />
              {/* Cassiopeia mock */}
              <polyline points="110,40 125,30 140,43 155,30 170,42" fill="none" stroke={theme === 'cream' ? '#555' : '#E8EEF4'} strokeWidth="0.75" />
              {/* Cygnus/Cross mock */}
              <polyline points="60,130 90,120 120,110 90,120 80,100 100,140" fill="none" stroke={colors.circleStroke} strokeWidth="0.6" />
              {/* Orion mock */}
              <polyline points="110,130 135,135 145,160 120,155 110,130" fill="none" stroke={theme === 'cream' ? '#555' : '#E8EEF4'} strokeWidth="0.75" />
              <polyline points="120,145 130,146 140,147" fill="none" stroke={colors.circleStroke} strokeWidth="1.2" /> {/* Belt */}
            </g>

            {/* Glowing star nodes */}
            <g>
              <circle cx="45" cy="95" r="2" fill="#FFF" className="star" />
              <circle cx="65" cy="85" r="1.5" fill={colors.accentColor} />
              <circle cx="85" cy="90" r="2.5" fill="#FFF" />
              <circle cx="100" cy="75" r="3" fill={colors.accentColor} className="star animate-pulse" />
              <circle cx="110" cy="40" r="2" fill="#FFF" />
              <circle cx="125" cy="30" r="2" fill="#FFF" />
              <circle cx="140" cy="43" r="2" fill={colors.accentColor} />
              <circle cx="155" cy="30" r="1.5" fill="#FFF" />
              <circle cx="170" cy="42" r="2.5" fill="#FFF" />
              <circle cx="90" cy="120" r="3" fill="#FFF" />
              <circle cx="120" cy="110" r="1.5" fill="#FFF" />
              <circle cx="110" cy="130" r="2.5" fill={colors.accentColor} />
              <circle cx="135" cy="135" r="2" fill="#FFF" />
              <circle cx="145" cy="160" r="3" fill="#FFF" className="star" />
              <circle cx="120" cy="155" r="2" fill={colors.accentColor} />
            </g>

            {/* Accent Compass point designators */}
            <text x="100" y="24" textAnchor="middle" fontSize="6" fontFamily="sans-serif" fill={colors.circleStroke} opacity="0.6" fontWeight="bold">N</text>
            <text x="100" y="184" textAnchor="middle" fontSize="6" fontFamily="sans-serif" fill={colors.circleStroke} opacity="0.6" fontWeight="bold">S</text>
            <text x="24" y="102" textAnchor="middle" fontSize="6" fontFamily="sans-serif" fill={colors.circleStroke} opacity="0.6" fontWeight="bold">W</text>
            <text x="176" y="102" textAnchor="middle" fontSize="6" fontFamily="sans-serif" fill={colors.circleStroke} opacity="0.6" fontWeight="bold">E</text>
          </svg>
        </div>

        {/* Poster Labeling Section */}
        <div className="text-center z-10 pt-4 pb-2 border-t border-dashed border-opacity-20 border-white/40">
          <p className={`font-serif text-lg tracking-wide mb-1 ${colors.text}`}>{title || "Natalia & Kacper"}</p>
          <div className="h-[1px] w-12 bg-current opacity-30 mx-auto my-1.5" />
          <p className={`font-cursive text-md ${colors.accentText} min-h-[22px] mb-1`}>{subtitle || "Wśród gwiazd wszystko się zaczęło"}</p>
          <div className="flex justify-center items-center gap-3 text-[9px] uppercase tracking-wider font-mono opacity-80 mt-1">
            <span className={colors.accentText}>{location || "Wrocław, PL"}</span>
            <span className="opacity-40">|</span>
            <span className={colors.text}>{dateString || "23 LIPCA 2025"}</span>
          </div>
          {location && (
            <div className={`text-[7px] font-mono opacity-50 tracking-widest mt-0.5 ${colors.mutedText}`}>
              51° 6' 27.817'' N &bull; 17° 1' 58.076'' E
            </div>
          )}
        </div>
      </div>
    );
  };

  // Draw City Map View
  const renderCity = () => {
    // City map can use standard themes or enforce a specific clean monochrome palette
    const isCreamTheme = theme === 'cream' || theme === 'gold';
    const cityBg = isCreamTheme ? 'bg-[#FAF7F2]' : 'bg-[#181818]';
    const gridColor = isCreamTheme ? 'rgba(44, 36, 22, 0.04)' : 'rgba(255, 255, 255, 0.03)';
    const streetPrimary = isCreamTheme ? 'rgba(44, 36, 22, 0.45)' : 'rgba(255, 255, 255, 0.4)';
    const streetSecondary = isCreamTheme ? 'rgba(44, 36, 22, 0.12)' : 'rgba(255, 255, 255, 0.09)';
    const labelColor = isCreamTheme ? 'text-[#2C2416]' : 'text-neutral-100';
    const accentBorder = isCreamTheme ? 'border-amber-900/10' : 'border-neutral-800';

    return (
      <div className={`w-full h-full ${cityBg} flex flex-col justify-between p-6 relative`}>
        {/* Graph paper micro-grid */}
        <div 
          className="absolute inset-0 opacity-100 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, ${gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`,
            backgroundSize: '14px 14px'
          }}
        />

        {/* Abstract vector street map rendering */}
        <div className="relative flex-1 w-full overflow-hidden flex items-center justify-center rounded border border-neutral-200/5 mt-4">
          <svg className="w-[95%] h-[95%]" viewBox="0 0 200 240">
            {/* Waterbody representation (River Odra) */}
            <path 
              d="M-10,120 Q50,110 80,140 T180,110 T220,120" 
              fill="none" 
              stroke={isCreamTheme ? 'rgba(164, 196, 210, 0.4)' : 'rgba(64, 96, 120, 0.35)'} 
              strokeWidth="22" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            {/* Fine secondary river branch */}
            <path 
              d="M80,140 Q110,150 130,190 T160,250" 
              fill="none" 
              stroke={isCreamTheme ? 'rgba(164, 196, 210, 0.3)' : 'rgba(64, 96, 120, 0.25)'} 
              strokeWidth="10" 
              strokeLinecap="round" 
            />

            {/* street grid - secondary streets */}
            <g stroke={streetSecondary} strokeWidth="1.2" strokeLinecap="round" opacity="0.8">
              {/* Horizontal lattices */}
              <line x1="-10" y1="40" x2="210" y2="40" />
              <line x1="-10" y1="80" x2="210" y2="75" />
              <line x1="-10" y1="160" x2="210" y2="165" />
              <line x1="-10" y1="200" x2="210" y2="195" />
              
              {/* Vertical lattices */}
              <line x1="30" y1="-10" x2="35" y2="250" />
              <line x1="70" y1="-10" x2="65" y2="250" />
              <line x1="130" y1="-10" x2="135" y2="250" />
              <line x1="170" y1="-10" x2="165" y2="250" />

              {/* Angle sub streets */}
              <line x1="0" y1="10" x2="180" y2="210" />
              <line x1="180" y1="20" x2="10" y2="220" />
              <line x1="40" y1="240" x2="190" y2="110" />
              <line x1="160" y1="0" x2="20" y2="150" />
            </g>

            {/* street grid - main avenues */}
            <g stroke={streetPrimary} strokeWidth="2.5" strokeLinecap="round">
              <line x1="-10" y1="100" x2="210" y2="100" />
              <line x1="100" y1="-10" x2="100" y2="250" />
              <circle cx="100" cy="100" r="15" fill="none" strokeWidth="2.5" />
              
              {/* Ring avenue */}
              <path d="M 40,65 A 65,65 0 0,1 160,65" fill="none" strokeWidth="2.2" />
              <path d="M 40,135 A 65,65 0 0,0 160,135" fill="none" strokeWidth="2.2" />
            </g>

            {/* Central Heart Indicator */}
            <g transform="translate(100, 100)" className="animate-pulse">
              <circle cx="0" cy="0" r="6" fill="#C8765A" opacity="0.3" className="scale-125 duration-1000" />
              {/* Heart SVG path */}
              <path 
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                fill="#C8765A" 
                transform="translate(-6, -6) scale(0.5)" 
              />
            </g>
          </svg>
        </div>

        {/* Custom Text Information */}
        <div className={`text-center pt-5 pb-1 z-10 border-t ${accentBorder}`}>
          <p className={`font-sans tracking-[0.25em] font-bold text-xs uppercase mb-1.5 opacity-60 ${labelColor}`}>
            {subtitle || "TO TUTAJ ZACZĘŁA SIĘ MOJA MIŁOŚĆ"}
          </p>
          <p className={`font-serif text-2xl font-bold tracking-widest leading-none ${labelColor}`}>
            {title || "WROCŁAW"}
          </p>
          <div className="h-[1px] w-14 bg-terracotta mx-auto my-2" />
          <p className={`font-sans text-[10px] tracking-widest uppercase opacity-70 font-semibold mb-1 ${labelColor}`}>
            {dateString || "23 LIPCA 2025"}
          </p>
          <p className="font-mono text-[8px] opacity-40 tracking-wider text-neutral-500">
            {location || "51° 06' N • 17° 02' E"}
          </p>
        </div>
      </div>
    );
  };

  // Draw Pet Portrait View
  const renderPet = () => {
    const isRoyal = petStyle === 'royal';
    const petBg = isRoyal 
      ? 'bg-gradient-to-br from-[#2D1F17] via-[#1F140E] to-[#120905]' 
      : 'bg-gradient-to-tr from-[#FFE135] via-[#FFF37A] to-[#FFF6A2]';
    const textLabelColor = isRoyal ? 'text-[#FAF3E5]' : 'text-neutral-900';
    const subtitleColor = isRoyal ? 'text-amber-400 font-serif' : 'font-sans text-pink-600 font-bold';

    return (
      <div className={`w-full h-full ${petBg} flex flex-col justify-between p-6 relative`}>
        {/* Background vignette or popart dots */}
        {!isRoyal && (
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle, #000 15%, transparent 16%)',
            backgroundSize: '12px 12px'
          }} />
        )}

        {/* Pet portrait container */}
        <div className="relative flex-1 w-full flex items-center justify-center mt-4">
          <svg className="w-[85%] h-[85%] max-h-[170px]" viewBox="0 0 160 160">
            {isRoyal ? (
              // Royal Coat of Arms / Renaissance Portrait
              <g>
                {/* Background glowing shield aureole */}
                <circle cx="80" cy="85" r="50" fill="url(#royal-glow)" opacity="0.25" />
                
                {/* Royal scarlet velvet cloak */}
                <path 
                  d="M40,150 C40,110 50,90 80,90 C110,90 120,110 120,150" 
                  fill="#A02010" 
                  stroke="#7A1208" 
                  strokeWidth="2" 
                />
                <path 
                  d="M50,150 C50,115 62,95 80,95 C98,95 110,115 110,150" 
                  fill="#C03020" 
                />
                
                {/* Golden epic necklace collar */}
                <path 
                  d="M58,125 Q80,140 102,125" 
                  fill="none" 
                  stroke="#C9A84C" 
                  strokeWidth="6" 
                  strokeLinecap="round" 
                />
                <path 
                  d="M58,125 Q80,140 102,125" 
                  fill="none" 
                  stroke="#E8C96E" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                />
                
                {/* Royal medallion badge */}
                <circle cx="80" cy="138" r="7" fill="#C9A84C" stroke="#FFF" strokeWidth="0.8" />
                <polygon points="80,134 82,138 85,138 82,140 83,143 80,141 77,143 78,140 75,138 78,138" fill="#D4AF37" />

                {/* Furry orange regal puppy head overlay */}
                <path 
                  d="M 55,90 Q 52,65 58,55 Q 65,40 80,45 Q 95,40 102,55 Q 108,65 105,90 Z" 
                  fill="#D2691E" 
                />
                {/* White snout patch */}
                <ellipse cx="80" cy="74" rx="14" ry="11" fill="#FFF8F0" />
                
                {/* Cute ears */}
                <path d="M57,55 Q45,45 42,58 C40,65 48,72 55,60" fill="#B24F0E" />
                <path d="M103,55 Q115,45 118,58 C120,65 112,72 105,60" fill="#B24F0E" />
                
                {/* Face specs: Cute eyes, nose */}
                <circle cx="70" cy="62" r="3" fill="#1C1410" />
                <circle cx="90" cy="62" r="3" fill="#1C1410" />
                <ellipse cx="80" cy="68" rx="4" ry="2.5" fill="#111" />
                <path d="M80,70.5 L80,75 C80,76 77,77 75,76 M80,75 C80,76 83,77 85,76" fill="none" stroke="#111" strokeWidth="1" />

                {/* Glowing Golden Crown atop head */}
                <g transform="translate(80, 36) scale(0.9)">
                  <path 
                    d="M-22,8 L-25,-3 L-12,3 L0,-12 L12,3 L25,-3 L22,8 Z" 
                    fill="#C9A84C" 
                    stroke="#FFD700" 
                    strokeWidth="1" 
                  />
                  <line x1="-22" y1="8" x2="22" y2="8" stroke="#FAF7F2" strokeWidth="2.5" />
                  {/* Jewels */}
                  <circle cx="0" cy="-12" r="2.5" fill="#DA1212" />
                  <circle cx="-25" cy="-3" r="2" fill="#1A72E8" />
                  <circle cx="25" cy="-3" r="2" fill="#1A72E8" />
                  <circle cx="-12" cy="3" r="1.5" fill="#0F9D58" />
                  <circle cx="12" cy="3" r="1.5" fill="#0F9D58" />
                </g>
              </g>
            ) : (
              // Pop Art Cartoon style
              <g>
                {/* Dynamic starburst backdrop */}
                <path d="M80,80 L20,-10 L30,-15 Z L80,80 L80,-20 L95,-20 Z L80,80 L140,-10 L150,-5 Z L80,80 L180,60 L180,75 Z L80,80 L140,150 L115,160 Z L80,80 L20,140 L10,120 Z" fill="#FF5376" opacity="0.35" />
                
                {/* High contrast cartoon cat outline */}
                <ellipse cx="80" cy="115" rx="42" ry="38" fill="#FFF" stroke="#2C2416" strokeWidth="4.5" />
                
                {/* Big cat pointy ears */}
                <polygon points="40,95 24,55 52,80" fill="#38B6FF" stroke="#2C2416" strokeWidth="4.5" strokeLinejoin="round" />
                <polygon points="120,95 136,55 108,80" fill="#38B6FF" stroke="#2C2416" strokeWidth="4.5" strokeLinejoin="round" />
                <polygon points="42,91 32,62 50,79" fill="#FF5376" />
                <polygon points="118,91 128,62 110,79" fill="#FF5376" />

                {/* Snout and whiskers */}
                <ellipse cx="80" cy="122" rx="12" ry="8" fill="#FFC1D2" stroke="#2C2416" strokeWidth="3" />
                <ellipse cx="80" cy="119" rx="3.5" ry="2.2" fill="#2C2416" />
                
                {/* Anime sparkling eyes */}
                <circle cx="62" cy="104" r="8" fill="#2C2416" />
                <circle cx="60" cy="101" r="2.5" fill="#FFF" />
                <circle cx="64" cy="107" r="1" fill="#FFF" />

                <circle cx="98" cy="104" r="8" fill="#2C2416" />
                <circle cx="96" cy="101" r="2.5" fill="#FFF" />
                <circle cx="100" cy="107" r="1" fill="#FFF" />

                {/* Whiskers lines */}
                <line x1="32" y1="120" x2="16" y2="116" stroke="#2C2416" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="30" y1="128" x2="14" y2="128" stroke="#2C2416" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="128" y1="120" x2="144" y2="116" stroke="#2C2416" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="130" y1="128" x2="146" y2="128" stroke="#2C2416" strokeWidth="3.5" strokeLinecap="round" />
                
                {/* Pop art speech text outline wrap in label below */}
              </g>
            )}
            <defs>
              <radialGradient id="royal-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#C9A84C" stopOpacity="1" />
                <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Poster Labeling Section */}
        <div className={`text-center pt-4 pb-2 border-t ${isRoyal ? 'border-amber-900/40' : 'border-[#2C2416]/10'}`}>
          <span className={`text-[10px] tracking-widest uppercase font-mono px-3 py-1 rounded-full ${isRoyal ? 'bg-amber-900/30 text-amber-300' : 'bg-[#2C2416]/10 text-[#2C2416]'} inline-block mb-2 font-bold`}>
            {isRoyal ? '✦ KRÓLEWSKI RETRO PORTRET ✦' : '★ POP ART COLLECTION ★'}
          </span>
          <p className={`font-serif text-2xl font-bold tracking-wide italic ${textLabelColor}`}>
            {title || (isRoyal ? "Lord Baron" : "Puszek")}
          </p>
          <p className={`text-xs ${subtitleColor} mt-1`}>
            {subtitle || (isRoyal ? "Obrońca Królestwa Kanapy" : "Król Churu i Porannych Biegów")}
          </p>
        </div>
      </div>
    );
  };

  // Draw Music Poster View
  const renderMusic = () => {
    const isNightTheme = theme === 'night' || theme === 'black';
    const musicBg = isNightTheme ? 'bg-[#121212]' : 'bg-[#F2ECE4]';
    const textCol = isNightTheme ? 'text-white' : 'text-[#2C2416]';
    const barCol = isNightTheme ? 'bg-[#C8765A]' : 'bg-[#A0522D]';

    return (
      <div className={`w-full h-full ${musicBg} flex flex-col justify-between p-6 relative`}>
        {/* Vinyl record plate shape */}
        <div className="relative flex-1 w-full flex flex-col items-center justify-center mt-3">
          {/* Spinning groove pattern */}
          <div className="w-[140px] aspect-square rounded-full bg-neutral-900 shadow-xl flex items-center justify-center relative border border-black group-hover:rotate-45 transition-transform duration-1000">
            <div className="absolute inset-2 rounded-full border border-neutral-800 opacity-40" />
            <div className="absolute inset-5 rounded-full border border-neutral-700 opacity-30" />
            <div className="absolute inset-8 rounded-full border border-neutral-800 opacity-40" />
            <div className="absolute inset-11 rounded-full border border-neutral-700 opacity-30" />
            {/* Vinyl center sticker */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-terracotta to-peach flex items-center justify-center border border-black">
              <div className="w-2.5 h-2.5 rounded-full bg-[#121212] border border-white/20" />
            </div>
          </div>

          {/* Music Waveform indicator */}
          <div className="flex gap-[3px] items-end h-8 mt-5 w-[80%] justify-center opacity-60">
            <div className={`w-[3px] h-4 ${barCol} rounded-full`} />
            <div className={`w-[3px] h-6 ${barCol} rounded-full`} />
            <div className={`w-[3px] h-3 ${barCol} rounded-full`} />
            <div className={`w-[3px] h-7 ${barCol} rounded-full`} />
            <div className={`w-[3px] h-5 ${barCol} rounded-full`} />
            <div className={`w-[3px] h-6 ${barCol} rounded-full`} />
            <div className={`w-[3px] h-4 ${barCol} rounded-full`} />
            <div className={`w-[3px] h-2 ${barCol} rounded-full`} />
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-500/20 text-center">
          <span className={`text-[9px] uppercase tracking-[0.25em] font-mono px-2 py-0.5 border opacity-50 ${textCol === 'text-white' ? 'border-white/30 text-white' : 'border-black/20 text-black'} rounded inline-block mb-1`}>
            {location || "ALBUM OF THE YEAR"}
          </span>
          <p className={`font-serif text-lg font-bold leading-tight ${textCol}`}>
            {title || "THE EMINEM SHOW"}
          </p>
          <p className="font-sans text-xs text-terracotta italic mb-1">
            {subtitle || "Track 04: Without Me"}
          </p>
          {/* Play bar control mockup */}
          <div className="w-full flex items-center gap-2 mt-3 text-neutral-500 text-[8px] font-mono">
            <span>02:34</span>
            <div className="flex-1 h-[2px] bg-neutral-700/20 rounded relative">
              <div className="absolute top-0 left-0 w-[60%] h-full bg-terracotta" />
              <div className="absolute top-[-2px] left-[60%] w-1.5 h-1.5 rounded-full bg-terracotta" />
            </div>
            <span>04:12</span>
          </div>
        </div>
      </div>
    );
  };

  // Draw Car / Porsche Passion Poster mockup
  const renderCar = () => {
    const isNightTheme = theme === 'night' || theme === 'black';
    const carBg = isNightTheme ? 'bg-[#0E0E0E]' : 'bg-[#FAF7F2]';
    const textTheme = isNightTheme ? 'text-white' : 'text-[#2C2416]';

    return (
      <div className={`w-full h-full ${carBg} flex flex-col justify-between p-6 relative`}>
        {/* Giant outline text back layer */}
        <div className="absolute top-[18%] left-0 right-0 text-center select-none pointer-events-none opacity-[0.06] font-sans font-black text-6xl tracking-widest leading-none text-neutral-500">
          {title ? title.split(' ')[0].toUpperCase() : "PORSCHE"}
        </div>

        {/* Car silhouette graphic */}
        <div className="relative flex-1 w-full flex items-center justify-center mt-2">
          <svg className="w-[90%] h-[90%] max-h-[140px]" viewBox="0 0 160 100">
            {/* Elegant sports car outline */}
            <path 
              d="M10,80 C15,80 20,78 25,75 C30,70 35,58 50,56 C65,54 85,38 105,38 C125,38 135,42 140,48 C145,54 148,64 150,80" 
              fill="none" 
              stroke="#C8765A" 
              strokeWidth="3.5" 
              strokeLinecap="round" 
            />
            {/* Cabin details */}
            <path 
              d="M72,50 C80,44 95,44 105,44 C112,44 118,46 122,50 Z" 
              fill="none" 
              stroke={isNightTheme ? '#FFF' : '#333'} 
              strokeWidth="1.5" 
            />
            {/* Chassis elements */}
            <line x1="8" y1="80" x2="152" y2="80" stroke={isNightTheme ? '#FFF' : '#333'} strokeWidth="2" />
            
            {/* Wheels */}
            <circle cx="38" cy="80" r="11" fill={isNightTheme ? '#0E0E0E' : '#FAF7F2'} stroke={isNightTheme ? '#FFF' : '#222'} strokeWidth="3" />
            <circle cx="38" cy="80" r="4" fill="#C8765A" />
            <circle cx="122" cy="80" r="11" fill={isNightTheme ? '#0E0E0E' : '#FAF7F2'} stroke={isNightTheme ? '#FFF' : '#222'} strokeWidth="3" />
            <circle cx="122" cy="80" r="4" fill="#C8765A" />
            
            {/* Ground shading */}
            <ellipse cx="80" cy="91" rx="65" ry="3.5" fill="rgba(0,0,0,0.15)" />
          </svg>
        </div>

        {/* Specs Table at bottom */}
        <div className={`pt-3 border-t ${isNightTheme ? 'border-white/10' : 'border-neutral-900/10'}`}>
          <p className={`font-sans tracking-widest text-[9px] font-bold uppercase mb-1 ${textTheme} opacity-60`}>
            {location || "LEGENDARY MOTORS COLLECTION"}
          </p>
          <div className="flex justify-between items-baseline mb-2">
            <h4 className={`font-serif text-xl font-bold ${textTheme}`}>{title || "911 Turbo S"}</h4>
            <span className="text-xs font-mono text-terracotta font-semibold">{subtitle || "FLAT 6 / 650 HP"}</span>
          </div>
          
          {/* Grid properties specs */}
          <div className="grid grid-cols-3 gap-2 text-[8px] font-mono border-t border-dashed border-neutral-500/25 pt-2 opacity-80">
            <div>
              <p className="text-neutral-500 uppercase">ENGINE</p>
              <p className={textTheme}>3.8L TWINTURBO</p>
            </div>
            <div>
              <p className="text-neutral-500 uppercase">0-100 KM/H</p>
              <p className={textTheme}>2.7 SECONDS</p>
            </div>
            <div>
              <p className="text-neutral-500 uppercase">MAX SPEED</p>
              <p className={textTheme}>330 KM/H</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getPosterContent = () => {
    switch (type) {
      case 'city':
        return renderCity();
      case 'pet':
        return renderPet();
      case 'music':
        return renderMusic();
      case 'car':
        return renderCar();
      case 'passion':
        return passionTheme === 'car' ? renderCar() : renderMusic();
      case 'stars':
      default:
        return renderStars();
    }
  };

  return (
    <div className={`poster-mock ${frameClass} w-full shadow-poster h-full relative group`}>
      {/* Glossy reflection cover */}
      <div className="glare-overlay" />
      
      {/* Main rendered poster layout */}
      {getPosterContent()}
    </div>
  );
};
