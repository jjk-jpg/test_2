
import React, { useState, useEffect } from 'react';
import { ViewMode, PortfolioItem, SiteSettings } from './types.ts';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import PortfolioSection from './components/PortfolioSection.tsx';
import ServicesSection from './components/ServicesSection.tsx';
import Footer from './components/Footer.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';

const DEFAULT_PORTFOLIO: PortfolioItem[] = [
  {
    id: '1',
    title: '퓨처 테크놀로지 브랜딩',
    category: '로고 디자인',
    imageUrl: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800',
    description: '혁신적인 IT 기업을 위한 심볼릭 디자인 및 가이드라인 제작'
  },
  {
    id: '2',
    title: '럭셔리 코스메틱 웹사이트',
    category: '웹 디자인',
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800',
    description: '고급 브랜드 이미지를 극대화한 인터랙티브 반응형 웹사이트'
  },
  {
    id: '3',
    title: '에코 라이프스타일 패키징',
    category: '브랜딩',
    imageUrl: 'https://images.unsplash.com/photo-1544117518-30df578096a4?auto=format&fit=crop&q=80&w=800',
    description: '지속 가능한 가치를 담은 친환경 브랜드 통합 아이덴티티'
  }
];

const DEFAULT_SETTINGS: SiteSettings = {
  heroHeadline: '창의적인 디자인으로 브랜드의 미래를 그리다',
  heroSubheadline: 'Ding Studio는 단순한 디자인을 넘어 브랜드의 가치를 시각적으로 완성합니다.',
  accentColor: '#8A2BE2'
};

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>(ViewMode.HOME);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedPortfolio = localStorage.getItem('ding_portfolio');
      const savedSettings = localStorage.getItem('ding_settings');
      const authStatus = localStorage.getItem('ding_auth');

      if (savedPortfolio) {
        setPortfolio(JSON.parse(savedPortfolio));
      } else {
        setPortfolio(DEFAULT_PORTFOLIO);
        localStorage.setItem('ding_portfolio', JSON.stringify(DEFAULT_PORTFOLIO));
      }

      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      } else {
        setSettings(DEFAULT_SETTINGS);
        localStorage.setItem('ding_settings', JSON.stringify(DEFAULT_SETTINGS));
      }

      if (authStatus === 'true') {
        setIsLoggedIn(true);
      }
      setIsLoaded(true);
    } catch (e) {
      console.error("Initialization error:", e);
      setPortfolio(DEFAULT_PORTFOLIO);
      setSettings(DEFAULT_SETTINGS);
      setIsLoaded(true);
    }
  }, []);

  const updatePortfolio = (newItems: PortfolioItem[]) => {
    setPortfolio(newItems);
    localStorage.setItem('ding_portfolio', JSON.stringify(newItems));
  };

  const updateSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
    localStorage.setItem('ding_settings', JSON.stringify(newSettings));
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('ding_auth', 'true');
    setView(ViewMode.ADMIN);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('ding_auth');
    setView(ViewMode.HOME);
  };

  if (!isLoaded) return <div className="bg-black min-h-screen"></div>;

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white selection:bg-purple-500/30">
      <Navbar 
        view={view} 
        setView={setView} 
        isLoggedIn={isLoggedIn} 
        onLogout={handleLogout} 
        accentColor={settings.accentColor}
      />

      <main className="flex-grow">
        {view === ViewMode.HOME ? (
          <>
            <Hero settings={settings} />
            <PortfolioSection portfolio={portfolio} accentColor={settings.accentColor} />
            <ServicesSection accentColor={settings.accentColor} />
          </>
        ) : (
          <AdminDashboard 
            isLoggedIn={isLoggedIn}
            onLogin={handleLogin}
            portfolio={portfolio}
            setPortfolio={updatePortfolio}
            settings={settings}
            setSettings={updateSettings}
            accentColor={settings.accentColor}
          />
        )}
      </main>

      <Footer accentColor={settings.accentColor} />
    </div>
  );
};

export default App;
