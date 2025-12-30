
import React, { useState, useEffect } from 'react';
import { ViewMode, PortfolioItem, SiteSettings } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PortfolioSection from './components/PortfolioSection';
import ServicesSection from './components/ServicesSection';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard';

const DEFAULT_PORTFOLIO: PortfolioItem[] = [
  {
    id: '1',
    title: '미래지향적 테크 로고',
    category: '로고 디자인',
    imageUrl: 'https://picsum.photos/seed/design1/800/600',
    description: '혁신적인 IT 기업을 위한 심볼릭 디자인'
  },
  {
    id: '2',
    title: '럭셔리 코스메틱 웹사이트',
    category: '웹 디자인',
    imageUrl: 'https://picsum.photos/seed/design2/800/600',
    description: '고급 브랜드 이미지를 극대화한 반응형 웹'
  },
  {
    id: '3',
    title: '친환경 푸드 브랜딩',
    category: '브랜딩',
    imageUrl: 'https://picsum.photos/seed/design3/800/600',
    description: '자연의 가치를 담은 통합 브랜드 아이덴티티'
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

  // Initialize from LocalStorage
  useEffect(() => {
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

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500" style={{ backgroundColor: '#121212' }}>
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
