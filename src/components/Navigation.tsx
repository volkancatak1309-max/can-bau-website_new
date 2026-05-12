import { useEffect, useState, useRef } from 'react';

interface NavigationProps {
  onLogoClick: () => void;
}

const leftNav = [
  { label: 'Unternehmen', href: '#about' },
  { label: 'Projekte', href: '#projects' },
  { label: 'Leistungen', href: '#vision' },
  { label: 'Kontakt', href: '#contact' },
];

const rightNav = [
  { label: 'News', href: '#' },
  { label: 'Kontakt', href: '#contact' },
  { label: 'DE', href: '#' },
];

export default function Navigation({ onLogoClick: _onLogoClick }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const lastScroll = useRef(0);
  const [hidden, setHidden] = useState(false);

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

  const scrollTo = (href: string) => {
    if (href === '#') return;
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm' : 'bg-transparent'
      } ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="w-full px-6 md:px-10 py-5 flex items-center justify-between border-b border-transparent">
        <div className="flex items-center gap-8 md:gap-12">
          {leftNav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(item.href);
              }}
              className="nav-item text-[#111] group"
            >
              <span className="inline-block transition-transform duration-300 group-hover:rotate-90">+</span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-8 md:gap-12">
          {rightNav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                if (item.label === 'Kontakt') {
                  scrollTo(item.href);
                } else {
                  e.preventDefault();
                  scrollTo(item.href);
                }
              }}
              className="nav-item text-[#111] group"
            >
              <span className="inline-block transition-transform duration-300 group-hover:rotate-90">+</span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
