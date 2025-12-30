
import React, { useState } from 'react';
import { ViewMode } from '../types';

interface NavbarProps {
  view: ViewMode;
  setView: (view: ViewMode) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  accentColor: string;
}

const Navbar: React.FC<NavbarProps> = ({ view, setView, isLoggedIn, onLogout, accentColor }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: '홈', id: 'home' },
    { name: '포트폴리오', id: 'portfolio' },
    { name: '서비스', id: 'services' },
    { name: '문의하기', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    if (view !== ViewMode.HOME) {
      setView(ViewMode.HOME);
      // 뷰가 바뀐 후 스크롤을 위해 약간의 지연을 둡니다.
      setTimeout(() => {
        const element = document.getElementById(targetId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(targetId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setView(ViewMode.HOME);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#121212]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="text-2xl font-black tracking-tighter cursor-pointer select-none"
          onClick={handleLogoClick}
        >
          DING<span style={{ color: accentColor }}>STUDIO</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={(e) => handleNavClick(e, item.id)}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              {item.name}
            </button>
          ))}
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <button
                onClick={(e) => { e.preventDefault(); setView(ViewMode.ADMIN); }}
                className={`text-sm font-medium px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-all ${view === ViewMode.ADMIN ? 'bg-white/10' : ''}`}
              >
                관리자
              </button>
              <button
                onClick={(e) => { e.preventDefault(); onLogout(); }}
                className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <button
              onClick={(e) => { e.preventDefault(); setView(ViewMode.ADMIN); }}
              className="text-sm font-medium px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-all"
            >
              로그인
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen); }}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#121212] border-b border-white/10 py-6 px-6 flex flex-col space-y-4">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={(e) => handleNavClick(e, item.id)}
              className="text-left text-lg font-semibold text-gray-300 active:text-white"
            >
              {item.name}
            </button>
          ))}
          <hr className="border-white/10" />
          {isLoggedIn ? (
            <>
              <button
                onClick={(e) => { e.preventDefault(); setView(ViewMode.ADMIN); setIsOpen(false); }}
                className="text-left text-lg font-semibold text-gray-300"
              >
                관리자 대시보드
              </button>
              <button
                onClick={(e) => { e.preventDefault(); onLogout(); setIsOpen(false); }}
                className="text-left text-lg font-semibold text-red-400"
              >
                로그아웃
              </button>
            </>
          ) : (
            <button
              onClick={(e) => { e.preventDefault(); setView(ViewMode.ADMIN); setIsOpen(false); }}
              className="text-left text-lg font-semibold text-gray-300"
            >
              로그인
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
