
import React from 'react';

interface ServicesSectionProps {
  accentColor: string;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ accentColor }) => {
  const services = [
    {
      title: '로고 디자인',
      desc: '브랜드의 첫인상을 결정짓는 강력하고 직관적인 로고를 제작합니다.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: '웹사이트 제작',
      desc: '최신 트렌드와 기술을 접목하여 사용자 경험이 뛰어난 최상의 결과물을 제공합니다.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 21h6l-.75-4M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: '브랜드 컨설팅',
      desc: '브랜드의 시장 경쟁력을 높이기 위한 전략적인 시각화를 제안합니다.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <section id="services" className="py-32 relative overflow-hidden">
       <div 
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-5 blur-[150px]"
        style={{ backgroundColor: accentColor }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black mb-8">전문 서비스</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            우리는 브랜드의 가능성을 발견하고, 디자인을 통해 현실로 구현합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {services.map((s, idx) => (
            <div key={idx} className="group p-10 bg-[#1A1A1A] border border-white/5 rounded-[40px] hover:border-white/20 transition-all">
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-10 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
                style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
              >
                {s.icon}
              </div>
              <h3 className="text-3xl font-bold mb-6">{s.title}</h3>
              <p className="text-gray-500 leading-relaxed text-lg">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
