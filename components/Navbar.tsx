
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
    { name: '홈', view: ViewMode.HOME, href: '#home' },
    { name: '포트폴리오', view: ViewMode.HOME, href: '#portfolio' },
    { name: '서비스', view: ViewMode.HOME, href: '#services' },
    { name: '문의하기', view: ViewMode.HOME, href: '#contact' },
  ];

  const handleNavClick = (targetView: ViewMode) => {
    setView(targetView);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#121212]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="text-2xl font-black tracking-tighter cursor-pointer select-none"
          onClick={() => handleNavClick(ViewMode.HOME)}
        >
          DING<span style={{ color: accentColor }}>STUDIO</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setView(item.view)}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              {item.name}
            </a>
          ))}
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setView(ViewMode.ADMIN)}
                className={`text-sm font-medium px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-all ${view === ViewMode.ADMIN ? 'bg-white/10' : ''}`}
              >
                관리자
              </button>
              <button
                onClick={onLogout}
                className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <button
              onClick={() => setView(ViewMode.ADMIN)}
              className="text-sm font-medium px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-all"
            >
              로그인
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
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
        <div className="md:hidden bg-[#121212] border-b border-white/10 py-6 px-6 flex flex-col space-y-4 animate-in slide-in-from-top duration-300">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => handleNavClick(item.view)}
              className="text-lg font-semibold text-gray-300 active:text-white"
            >
              {item.name}
            </a>
          ))}
          <hr className="border-white/10" />
          {isLoggedIn ? (
            <>
              <button
                onClick={() => handleNavClick(ViewMode.ADMIN)}
                className="text-left text-lg font-semibold text-gray-300"
              >
                관리자 대시보드
              </button>
              <button
                onClick={onLogout}
                className="text-left text-lg font-semibold text-red-400"
              >
                로그아웃
              </button>
            </>
          ) : (
            <button
              onClick={() => handleNavClick(ViewMode.ADMIN)}
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
