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

  // Archidomo: header colors based on blend mode
  const headerBlend = isHome && !scrolled ? 'header-blend' : 'header-dark';

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

  // Nav items - Archidomo style
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
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-beige)' }}>
      <CustomCursor />

      {/* HEADER - Archidomo style */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ${hidden && !mobileOpen ? '-translate-y-full' : 'translate-y-0'} ${headerBlend}`}>
        {/* Giant brand name - Archidomo logo style */}
        <div className="px-4 md:px-8 pt-4 pb-0">
          <a href="#/" className="block text-left no-underline" onClick={() => window.scrollTo(0, 0)}>
            <h1 className="font-display leading-[0.85] tracking-[-0.02em]" style={{
              fontSize: 'clamp(6rem, 13vw, 18rem)',
              fontFamily: 'var(--font-canela)',
              fontWeight: 'var(--font-weight-light)',
              color: 'var(--color-white)',
              mixBlendMode: 'difference',
            }}>
              CAN BAU
            </h1>
          </a>
        </div>

        {/* Navigation - Archidomo nav style */}
        <nav className="px-4 md:px-8 py-4 flex items-center justify-between">
          {/* Divider line */}
          <div className="absolute top-0 left-0 right-0 h-px opacity-20" style={{ backgroundColor: 'var(--header-divider-color, var(--color-black))' }} />

          {/* Left nav */}
          <div className="hidden md:flex items-center" style={{ gap: '12rem' }}>
            {leftNav.map((item) => (
              <a
                key={item.href}
                href={`#${item.href}`}
                className="nav-item"
                onClick={() => window.scrollTo(0, 0)}
              >
                <span className="nav-icon">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1">
                    <line x1="6.5" y1="0" x2="6.5" y2="13" />
                    <line x1="0" y1="6.5" x2="13" y2="6.5" />
                  </svg>
                </span>
                <span className="nav-label">{item.label}</span>
              </a>
            ))}
          </div>

          {/* Right nav */}
          <div className="flex items-center" style={{ gap: '12rem' }}>
            <div className="hidden md:flex items-center" style={{ gap: '12rem' }}>
              {rightNav.map((item) => (
                <a
                  key={item.label}
                  href={item.href === '#' ? '#' : `#${item.href}`}
                  className="nav-item"
                >
                  <span className="nav-icon">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1">
                      <line x1="6.5" y1="0" x2="6.5" y2="13" />
                      <line x1="0" y1="6.5" x2="13" y2="6.5" />
                    </svg>
                  </span>
                  <span className="nav-label">{item.label}</span>
                </a>
              ))}
            </div>

            {/* Language switcher */}
            <div className="hidden md:flex items-center gap-2">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className="transition-colors bg-transparent border-none cursor-pointer"
                  style={{
                    fontFamily: 'var(--font-maison-neue-mono)',
                    fontSize: 'var(--text-13)',
                    color: lang === l.code ? 'var(--header-text-color)' : 'var(--header-text-color)',
                    opacity: lang === l.code ? 1 : 0.5,
                  }}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 transition-colors bg-transparent border-none"
              style={{ color: 'var(--header-text-color)' }}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-[80px] z-40 px-6 py-8" style={{ backgroundColor: 'var(--color-beige)' }}>
          <nav className="flex flex-col gap-6">
            {[...leftNav, ...rightNav].map((item) => (
              <a
                key={item.href}
                href={item.href === '#' ? '#' : `#${item.href}`}
                className="no-underline"
                style={{
                  fontFamily: 'var(--font-canela)',
                  fontSize: 'var(--text-36)',
                  fontWeight: 'var(--font-weight-medium)',
                  lineHeight: '100%',
                  color: 'var(--color-black)',
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Spacer for fixed header */}
      <div className="h-[calc(13vw+80px)]" style={{ minHeight: '140px' }} />

      <main>{children}</main>

      {/* FOOTER - Archidomo style */}
      <footer style={{ backgroundColor: 'var(--color-beige)' }}>
        {/* Giant logo */}
        <div className="px-4 md:px-8 pt-16 pb-8">
          <h2 className="footer-giant" style={{
            fontFamily: 'var(--font-canela)',
            fontSize: 'clamp(7.2rem, 15vw, 28rem)',
            fontWeight: 'var(--font-weight-light)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: 'var(--color-black)',
          }}>
            CAN BAU
          </h2>
          <p className="footer-baumeister" style={{
            fontFamily: 'var(--font-maison-neue-mono)',
            fontSize: 'var(--text-14)',
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
            color: 'var(--color-black)',
            textAlign: 'center',
            marginTop: '1rem',
          }}>
            BAUMEISTER
          </p>
        </div>

        {/* 4-column layout */}
        <div className="px-4 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
            {/* Column 1: Navigation */}
            <div>
              <button className="plus-btn mb-6">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1">
                  <line x1="6.5" y1="0" x2="6.5" y2="13" />
                  <line x1="0" y1="6.5" x2="13" y2="6.5" />
                </svg>
              </button>
              <nav className="flex flex-col gap-3">
                {leftNav.map((item) => (
                  <a
                    key={item.href}
                    href={`#${item.href}`}
                    className="no-underline transition-opacity hover:opacity-70"
                    style={{
                      fontFamily: 'var(--font-maison-neue)',
                      fontSize: 'var(--text-18)',
                      color: 'var(--color-black)',
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Column 2: Contact + Socials */}
            <div>
              <h4 className="mb-4" style={{
                fontFamily: 'var(--font-maison-neue)',
                fontSize: 'var(--text-18)',
                color: 'var(--color-black)',
              }}>
                {t('contact_title')}
              </h4>
              <div className="flex flex-col gap-1 mb-6">
                <a href="tel:+435576755450" className="no-underline transition-opacity hover:opacity-70" style={{
                  fontFamily: 'var(--font-maison-neue-mono)',
                  fontSize: 'var(--text-13)',
                  color: 'var(--color-black)',
                  textTransform: 'uppercase',
                }}>
                  +43 (0) 5576 755 450
                </a>
                <a href="mailto:info@canbau.at" className="no-underline transition-opacity hover:opacity-70" style={{
                  fontFamily: 'var(--font-maison-neue-mono)',
                  fontSize: 'var(--text-13)',
                  color: 'var(--color-black)',
                  textTransform: 'uppercase',
                }}>
                  info@canbau.at
                </a>
              </div>

              <h4 className="mb-4" style={{
                fontFamily: 'var(--font-maison-neue)',
                fontSize: 'var(--text-18)',
                color: 'var(--color-black)',
              }}>
                Socials
              </h4>
              <div className="flex flex-col gap-2">
                <a href="#" className="no-underline transition-opacity hover:opacity-70 flex items-center gap-2" style={{
                  fontFamily: 'var(--font-maison-neue-mono)',
                  fontSize: 'var(--text-13)',
                  color: 'var(--color-black)',
                  textTransform: 'uppercase',
                }}>
                  <span>+</span> INSTAGRAM
                </a>
                <a href="#" className="no-underline transition-opacity hover:opacity-70 flex items-center gap-2" style={{
                  fontFamily: 'var(--font-maison-neue-mono)',
                  fontSize: 'var(--text-13)',
                  color: 'var(--color-black)',
                  textTransform: 'uppercase',
                }}>
                  <span>+</span> LINKEDIN
                </a>
              </div>
            </div>

            {/* Column 3: Showroom (Hohenems) */}
            <div>
              <h4 className="mb-4" style={{
                fontFamily: 'var(--font-maison-neue)',
                fontSize: 'var(--text-18)',
                color: 'var(--color-black)',
              }}>
                Hohenems – Showroom
              </h4>
              <div className="flex flex-col gap-1">
                <p style={{
                  fontFamily: 'var(--font-maison-neue-mono)',
                  fontSize: 'var(--text-13)',
                  color: 'var(--color-black)',
                  textTransform: 'uppercase',
                  lineHeight: 1.6,
                }}>
                  Radetzkystraße 66<br />
                  6845 Hohenems<br />
                  Österreich
                </p>
              </div>
            </div>

            {/* Column 4: Werkstatt (Dornbirn) */}
            <div>
              <h4 className="mb-4" style={{
                fontFamily: 'var(--font-maison-neue)',
                fontSize: 'var(--text-18)',
                color: 'var(--color-black)',
              }}>
                Dornbirn – Werkstatt
              </h4>
              <div className="flex flex-col gap-1">
                <p style={{
                  fontFamily: 'var(--font-maison-neue-mono)',
                  fontSize: 'var(--text-13)',
                  color: 'var(--color-black)',
                  textTransform: 'uppercase',
                  lineHeight: 1.6,
                }}>
                  Bachmähdamm 6<br />
                  6850 Dornbirn<br />
                  Österreich
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="px-4 md:px-8 py-4 flex items-center justify-between" style={{ borderTop: '1px solid var(--border-light)' }}>
          <span style={{
            fontFamily: 'var(--font-maison-neue-mono)',
            fontSize: 'var(--text-13)',
            color: 'var(--color-beige-light)',
            textTransform: 'uppercase',
          }}>
            © {new Date().getFullYear()} CAN BAU GmbH
          </span>
          <div className="flex items-center gap-4">
            <a href="#" className="no-underline transition-opacity hover:opacity-70" style={{
              fontFamily: 'var(--font-maison-neue-mono)',
              fontSize: 'var(--text-13)',
              color: 'var(--color-beige-light)',
              textTransform: 'uppercase',
            }}>
              LEGALS
            </a>
            <span style={{ color: 'var(--color-beige-light)' }}>|</span>
            <a href="#" className="no-underline transition-opacity hover:opacity-70" style={{
              fontFamily: 'var(--font-maison-neue-mono)',
              fontSize: 'var(--text-13)',
              color: 'var(--color-beige-light)',
              textTransform: 'uppercase',
            }}>
              PRIVACY POLICY
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
