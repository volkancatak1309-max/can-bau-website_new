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

      {/* FOOTER — Archidomo-style: full-bleed wordmark + 4 columns */}
      <footer className="pt-20 md:pt-28 pb-10 border-t" style={{ borderColor: 'var(--border-light)', backgroundColor: 'var(--cream)' }}>
        {/* Giant wordmark + BAUMEISTER tagline */}
        <div className="px-4 md:px-6 mb-20 md:mb-28">
          <span className="footer-giant block">CAN BAU</span>
          <span className="footer-baumeister mt-3 block">B A U M E I S T E R</span>
        </div>

        {/* 4-column grid */}
        <div className="px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-16">
            {/* Column 1: Navigation with + buttons */}
            <div>
              <button className="plus-btn mb-6" aria-hidden="true">+</button>
              <h4 className="section-label mb-5" style={{ color: 'var(--text-secondary)' }}>{t('nav_agency')}</h4>
              <nav className="flex flex-col gap-2">
                {leftNav.map((item) => (
                  <a
                    key={item.href}
                    href={`#${item.href}`}
                    className="font-body text-sm hover:opacity-60 transition-opacity no-underline w-fit"
                    style={{ color: 'var(--black)' }}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Column 2: Contact + Socials */}
            <div>
              <h4 className="section-label mb-5" style={{ color: 'var(--text-secondary)' }}>{t('contact_title')}</h4>
              <div className="flex flex-col gap-1 mb-6">
                <a href="tel:+435576755450" className="font-body text-sm hover:opacity-60 transition-opacity no-underline" style={{ color: 'var(--black)' }}>
                  +43 (0) 5576 755 450
                </a>
                <a href="mailto:info@canbau.at" className="font-body text-sm hover:opacity-60 transition-opacity no-underline" style={{ color: 'var(--black)' }}>
                  info@canbau.at
                </a>
              </div>
              <h4 className="section-label mb-3" style={{ color: 'var(--text-secondary)' }}>{t('nav_socials')}</h4>
              <div className="flex flex-col gap-1">
                <a href="#" className="font-body text-sm hover:opacity-60 transition-opacity no-underline" style={{ color: 'var(--black)' }}>Instagram</a>
                <a href="#" className="font-body text-sm hover:opacity-60 transition-opacity no-underline" style={{ color: 'var(--black)' }}>LinkedIn</a>
              </div>
            </div>

            {/* Column 3: Showroom / HQ */}
            <div>
              <h4 className="section-label mb-5" style={{ color: 'var(--text-secondary)' }}>Showroom</h4>
              <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--black)' }}>
                Radetzkystraße 66<br />
                6845 Hohenems<br />
                Österreich
              </p>
              <p className="font-mono text-xs mt-4" style={{ color: 'var(--text-secondary)' }}>
                Mo – Fr · 08:00 – 17:00
              </p>
            </div>

            {/* Column 4: Second location */}
            <div>
              <h4 className="section-label mb-5" style={{ color: 'var(--text-secondary)' }}>Werkstatt</h4>
              <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--black)' }}>
                Industriestraße 12<br />
                6850 Dornbirn<br />
                Vorarlberg
              </p>
              <p className="font-mono text-xs mt-4" style={{ color: 'var(--text-secondary)' }}>
                Termin nach Vereinbarung
              </p>
            </div>
          </div>

          {/* Bottom bar: © + LEGALS | PRIVACY POLICY */}
          <div className="pt-6 border-t flex flex-col md:flex-row items-start md:items-center justify-between gap-3" style={{ borderColor: 'var(--border-light)' }}>
            <p className="font-mono text-[0.625rem] uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
              © {new Date().getFullYear()} CAN BAU GmbH — {t('footer_rights')}
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="font-mono text-[0.625rem] uppercase tracking-wider hover:opacity-60 transition-opacity no-underline" style={{ color: 'var(--text-secondary)' }}>
                Legals
              </a>
              <span className="font-mono text-[0.625rem]" style={{ color: 'var(--border-light)' }}>|</span>
              <a href="#" className="font-mono text-[0.625rem] uppercase tracking-wider hover:opacity-60 transition-opacity no-underline" style={{ color: 'var(--text-secondary)' }}>
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
