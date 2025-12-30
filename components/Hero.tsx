
import React from 'react';
import { SiteSettings } from '../types';

interface HeroProps {
  settings: SiteSettings;
}

const Hero: React.FC<HeroProps> = ({ settings }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Gradient Orbs */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-[120px]"
        style={{ backgroundColor: settings.accentColor }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-[150px]"
        style={{ backgroundColor: settings.accentColor }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-block px-4 py-1.5 mb-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
          <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Premium Creative Agency</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black mb-10 leading-[1.1] tracking-tight text-white">
          {settings.heroHeadline.split(' ').map((word, i) => (
            <span key={i} className="inline-block mr-4">
              {word === '디자인으로' || word === '미래를' ? (
                <span style={{ color: settings.accentColor }}>{word}</span>
              ) : word}
            </span>
          ))}
        </h1>

        <p className="text-lg md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          {settings.heroSubheadline}
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <a 
            href="#contact"
            className="group relative px-10 py-5 rounded-full font-bold text-white overflow-hidden transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: settings.accentColor }}
          >
            <span className="relative z-10">무료 상담 신청하기</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
          <a 
            href="#portfolio"
            className="px-10 py-5 rounded-full font-bold border border-white/20 text-white hover:bg-white/10 transition-all active:scale-95"
          >
            포트폴리오 보기
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
