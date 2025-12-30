
import React from 'react';

interface FooterProps {
  accentColor: string;
}

const Footer: React.FC<FooterProps> = ({ accentColor }) => {
  return (
    <footer id="contact" className="py-20 bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-2">
            <div className="text-3xl font-black mb-8">
              DING<span style={{ color: accentColor }}>STUDIO</span>
            </div>
            <p className="text-gray-500 max-w-sm text-lg leading-relaxed mb-10">
              우리는 디자인이 세상을 바꾸는 힘이 있다고 믿습니다.<br />
              당신의 비즈니스를 시각적으로 한 단계 높여보세요.
            </p>
            <div className="flex space-x-6">
              {['Instagram', 'Facebook', 'LinkedIn', 'Twitter'].map(social => (
                <a key={social} href="#" className="text-gray-500 hover:text-white transition-colors">{social}</a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-8">연락처</h4>
            <ul className="space-y-4 text-gray-500">
              <li>hello@dingstudio.com</li>
              <li>02-1234-5678</li>
              <li>서울시 강남구 테헤란로 123</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8">정보</h4>
            <ul className="space-y-4 text-gray-500">
              <li>개용약관</li>
              <li>개인정보처리방침</li>
              <li>자주 묻는 질문</li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} DING STUDIO. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-gray-600 text-sm">
            <span>Powered by</span>
            <span className="font-bold text-gray-400">Creative Tech</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
