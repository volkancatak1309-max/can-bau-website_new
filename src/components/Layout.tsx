import { useEffect, useState, useRef, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { Menu, X } from 'lucide-react';
import CustomCursor from './CustomCursor';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { lang, setLang, t } = useLang();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const lastScroll = useRef(0);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = location.pathname === '/' || location.hash === '#/' || location.pathname === '';
  
  const navTextColor = scrolled || !isHome || mobileOpen ? 'text-[#1a1a1a]' : 'text-white';
  const borderColor = scrolled || !isHome || mobileOpen ? 'border-[#e5e0d8]' : 'border-white/20';
  const bgColor = scrolled || !isHome || mobileOpen ? 'bg-white' : 'bg-transparent';

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > lastScroll.current && y > 200);
      lastScroll.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Nav item'lar - HREF kullan (düz HTML link)
  const leftNav = [
    { label: t('nav_agency'), href: '/agence' },
    { label: t('nav_projects'), href: '/realisations' },
    { label: t('nav_immersion'), href: '/immersion' },
    { label: t('nav_contact'), href: '/contact' },
  ];

  const rightNav = [
    { label: t('nav_news'), href: '/actualites' },
    { label: t('nav_socials'), href: '#' },
  ];

  const languages: Array<{ code: 'de' | 'en' | 'tr'; label: string }> = [
    { code: 'de', label: 'DE' },
    { code: 'en', label: 'EN' },
    { code: 'tr', label: 'TR' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <CustomCursor />
      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ${hidden && !mobileOpen ? '-translate-y-full' : 'translate-y-0'}`}>
        {/* Giant brand name */}
        <div className={`px-4 md:px-6 pt-2 pb-0 transition-colors duration-300 ${bgColor}`}>
          <a href="#/" className="block text-left no-underline" onClick={() => window.scrollTo(0, 0)}>
            <h1 className="font-display leading-[0.85] tracking-[-0.02em] text-white mix-blend-difference" style={{ fontSize: 'clamp(60px, 13vw, 180px)' }}>
              CAN BAU
            </h1>
          </a>
        </div>

        {/* Navigation */}
        <nav className={`px-4 md:px-6 py-2 flex items-center justify-between border-t transition-all duration-300 ${borderColor} ${bgColor}`}>
          <div className="hidden md:flex items-center gap-6">
            {leftNav.map((item) => (
              <a 
                key={item.href} 
                href={`#${item.href}`} 
                className={`nav-link ${navTextColor} transition-colors duration-300 no-underline`}
                onClick={() => window.scrollTo(0, 0)}
              >
                <span className="plus-icon">+</span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:flex items-center gap-6">
              {rightNav.map((item) => (
                <a 
                  key={item.label} 
                  href={item.href === '#' ? '#' : `#${item.href}`} 
                  className={`nav-link ${navTextColor} transition-colors duration-300 no-underline`}
                >
                  <span className="plus-icon">+</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-2">
              {languages.map((l) => (
                <button 
                  key={l.code} 
                  onClick={() => setLang(l.code)} 
                  className={`font-mono text-xs transition-colors bg-transparent border-none ${lang === l.code ? (scrolled || !isHome ? 'text-[#1a1a1a] font-medium' : 'text-white font-medium') : (scrolled || !isHome ? 'text-[#aaa] hover:text-[#666]' : 'text-white/50 hover:text-white/80')}`}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <button onClick={() => setMobileOpen(!mobileOpen)} className={`md:hidden p-2 transition-colors bg-transparent border-none ${navTextColor}`}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-[80px] bg-white z-40 px-6 py-8">
          <nav className="flex flex-col gap-6">
            {[...leftNav, ...rightNav].map((item) => (
              <a 
                key={item.href} 
                href={item.href === '#' ? '#' : `#${item.href}`} 
                className="font-display text-3xl text-[#1a1a1a] hover:text-[#C8A45C] transition-colors no-underline"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-8 pt-8 border-t border-[#e5e0d8] flex gap-4">
            {languages.map((l) => (
              <button key={l.code} onClick={() => setLang(l.code)} className={`font-mono text-sm bg-transparent border-none ${lang === l.code ? 'text-[#1a1a1a] font-medium' : 'text-[#aaa]'}`}>
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="h-[calc(13vw+50px)]" style={{ minHeight: '120px' }} />

      <main>{children}</main>

      {/* FOOTER */}
      <footer className="py-16 md:py-24 border-t border-[#e5e0d8]">
        <div className="px-6 md:px-10">
          <div className="mb-16">
            <h2 className="font-display text-[8vw] md:text-[6vw] leading-[0.9] text-[#1a1a1a] tracking-[-0.02em]">CAN BAU GMBH</h2>
            <p className="font-display text-[3vw] md:text-[2vw] text-[#888] italic mt-2 leading-none">Hochbau · Tiefbau · Abbruch</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">
            <div>
              <h4 className="section-label text-[#aaa] mb-4">Navigation</h4>
              <nav className="flex flex-col gap-2">
                {leftNav.map((item) => (
                  <a key={item.href} href={`#${item.href}`} className="font-body text-sm text-[#444] hover:text-[#1a1a1a] transition-colors no-underline w-fit">
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            <div>
              <h4 className="section-label text-[#aaa] mb-4">{t('contact_title')}</h4>
              <div className="flex flex-col gap-1">
                <p className="font-body text-sm text-[#444]">Radetzkystraße 66<br />6845 Hohenems<br />Österreich</p>
                <a href="tel:+435576755450" className="font-body text-sm text-[#444] hover:text-[#1a1a1a] transition-colors mt-2">+43 (0) 5576 755 450</a>
                <a href="mailto:info@canbau.at" className="font-body text-sm text-[#444] hover:text-[#1a1a1a] transition-colors">info@canbau.at</a>
              </div>
            </div>

            <div>
              <h4 className="section-label text-[#aaa] mb-4">{t('footer_rights')}</h4>
              <div className="flex flex-col gap-1">
                <span className="font-body text-sm text-[#888]">© {new Date().getFullYear()} CAN BAU GmbH</span>
                <div className="flex items-center gap-4 mt-2">
                  <a href="#" className="font-body text-xs text-[#aaa] hover:text-[#666]">Impressum</a>
                  <a href="#" className="font-body text-xs text-[#aaa] hover:text-[#666]">Datenschutz</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
