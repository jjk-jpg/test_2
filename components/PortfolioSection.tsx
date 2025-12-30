
import React from 'react';
import { PortfolioItem } from '../types';

interface PortfolioSectionProps {
  portfolio: PortfolioItem[];
  accentColor: string;
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ portfolio, accentColor }) => {
  return (
    <section id="portfolio" className="py-32 bg-black/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-6">포트폴리오</h2>
            <p className="text-xl text-gray-400 max-w-xl">
              딩스튜디오가 진행한 수많은 프로젝트 중 엄선된 결과물을 확인해 보세요. 브랜드의 아이덴티티를 담아냅니다.
            </p>
          </div>
          <div className="flex gap-4">
            {['전체', '로고', '웹', '브랜딩'].map((cat) => (
              <button 
                key={cat} 
                className={`px-6 py-2 rounded-full border border-white/10 text-sm font-medium hover:border-white/40 transition-all ${cat === '전체' ? 'bg-white/10' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {portfolio.map((item) => (
            <div key={item.id} className="group relative bg-[#1A1A1A] rounded-3xl overflow-hidden border border-white/5 transition-all hover:border-white/20">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              <div className="p-8">
                <div 
                  className="inline-block px-3 py-1 mb-4 rounded-md text-[10px] font-black tracking-widest uppercase text-white"
                  style={{ backgroundColor: accentColor }}
                >
                  {item.category}
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </div>
              
              {/* Hover Border Effect */}
              <div 
                className="absolute inset-0 border-2 rounded-3xl opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none"
                style={{ borderColor: accentColor }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
