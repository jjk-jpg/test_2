
import React, { useState } from 'react';
import { PortfolioItem, SiteSettings } from '../types';

interface AdminDashboardProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  portfolio: PortfolioItem[];
  setPortfolio: (items: PortfolioItem[]) => void;
  settings: SiteSettings;
  setSettings: (settings: SiteSettings) => void;
  accentColor: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  isLoggedIn, 
  onLogin, 
  portfolio, 
  setPortfolio, 
  settings, 
  setSettings,
  accentColor
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isEditingSettings, setIsEditingSettings] = useState(false);
  const [newPortfolio, setNewPortfolio] = useState<Partial<PortfolioItem>>({
    title: '',
    category: '로고 디자인',
    description: '',
    imageUrl: 'https://picsum.photos/800/600'
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple mock password
      onLogin();
      setError('');
    } else {
      setError('비밀번호가 올바르지 않습니다. (팁: admin123)');
    }
  };

  const addPortfolio = () => {
    if (!newPortfolio.title) return;
    const item: PortfolioItem = {
      id: Date.now().toString(),
      title: newPortfolio.title || '',
      category: newPortfolio.category || '기타',
      description: newPortfolio.description || '',
      imageUrl: newPortfolio.imageUrl || `https://picsum.photos/seed/${Date.now()}/800/600`
    };
    setPortfolio([item, ...portfolio]);
    setNewPortfolio({ title: '', category: '로고 디자인', description: '', imageUrl: 'https://picsum.photos/800/600' });
  };

  const deletePortfolio = (id: string) => {
    setPortfolio(portfolio.filter(item => item.id !== id));
  };

  const saveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingSettings(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="bg-[#1A1A1A] p-10 rounded-[30px] border border-white/10 w-full max-w-md shadow-2xl">
          <h2 className="text-3xl font-black mb-8 text-center">관리자 로그인</h2>
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">비밀번호</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="비밀번호 입력"
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button 
              type="submit"
              className="w-full py-4 rounded-xl font-bold text-white transition-all hover:brightness-110 active:scale-95"
              style={{ backgroundColor: accentColor }}
            >
              로그인
            </button>
          </form>
          <p className="mt-8 text-center text-xs text-gray-500 italic">비밀번호: admin123</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-black">대시보드</h1>
          <p className="text-gray-400 mt-2">사이트 콘텐츠와 설정을 실시간으로 관리하세요.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsEditingSettings(!isEditingSettings)}
            className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all"
          >
            {isEditingSettings ? '포트폴리오 관리' : '기본 설정 편집'}
          </button>
        </div>
      </div>

      {isEditingSettings ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-[#1A1A1A] p-10 rounded-[30px] border border-white/10">
            <h3 className="text-2xl font-bold mb-8">사이트 기본 설정</h3>
            <form onSubmit={saveSettings} className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3 text-lg font-semibold">메인 헤드라인</label>
                <textarea 
                  value={settings.heroHeadline}
                  onChange={(e) => setSettings({...settings, heroHeadline: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 min-h-[120px] focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3 text-lg font-semibold">서브 헤드라인</label>
                <textarea 
                  value={settings.heroSubheadline}
                  onChange={(e) => setSettings({...settings, heroSubheadline: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 min-h-[100px] focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3 text-lg font-semibold">테마 포인트 컬러</label>
                <div className="flex items-center gap-6">
                  <input 
                    type="color"
                    value={settings.accentColor}
                    onChange={(e) => setSettings({...settings, accentColor: e.target.value})}
                    className="w-20 h-20 bg-transparent cursor-pointer rounded-full overflow-hidden"
                  />
                  <span className="text-xl font-mono uppercase tracking-widest">{settings.accentColor}</span>
                </div>
              </div>
              <button 
                type="submit"
                className="px-10 py-5 rounded-2xl font-bold text-white transition-all hover:scale-105"
                style={{ backgroundColor: accentColor }}
              >
                변경사항 저장 완료
              </button>
            </form>
          </div>
          <div className="bg-[#1A1A1A] p-10 rounded-[30px] border border-white/10 flex items-center justify-center text-center">
            <div>
              <div 
                className="w-32 h-32 rounded-full mx-auto mb-8 animate-pulse"
                style={{ backgroundColor: `${accentColor}40`, border: `4px solid ${accentColor}` }}
              />
              <h4 className="text-2xl font-bold mb-4">실시간 미리보기 제공 중</h4>
              <p className="text-gray-500">대시보드에서 수정하는 모든 텍스트와 색상은<br />홈페이지에 즉시 반영됩니다.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-12">
          {/* New Portfolio Form */}
          <div className="bg-[#1A1A1A] p-10 rounded-[30px] border border-white/10">
            <h3 className="text-2xl font-bold mb-8">새 포트폴리오 추가</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">제목</label>
                <input 
                  type="text"
                  placeholder="프로젝트명"
                  value={newPortfolio.title}
                  onChange={(e) => setNewPortfolio({...newPortfolio, title: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">카테고리</label>
                <select 
                  value={newPortfolio.category}
                  onChange={(e) => setNewPortfolio({...newPortfolio, category: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none"
                >
                  <option>로고 디자인</option>
                  <option>웹 디자인</option>
                  <option>브랜딩</option>
                  <option>기타</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">이미지 URL</label>
                <input 
                  type="text"
                  placeholder="https://..."
                  value={newPortfolio.imageUrl}
                  onChange={(e) => setNewPortfolio({...newPortfolio, imageUrl: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none"
                />
              </div>
              <button 
                onClick={addPortfolio}
                className="w-full py-3 rounded-xl font-bold text-white transition-all hover:brightness-110"
                style={{ backgroundColor: accentColor }}
              >
                추가하기
              </button>
            </div>
          </div>

          {/* List Portfolio Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolio.map((item) => (
              <div key={item.id} className="bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/10 group">
                <div className="h-40 overflow-hidden relative">
                  <img src={item.imageUrl} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <button 
                        onClick={() => deletePortfolio(item.id)}
                        className="p-3 bg-red-500/80 rounded-full hover:bg-red-500 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-[10px] font-black tracking-widest text-gray-500 uppercase block mb-1">{item.category}</span>
                  <h4 className="font-bold truncate">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
