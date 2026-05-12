import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LanguageContext';
import { ArrowUpRight, MapPin, Phone, Mail, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = document.querySelectorAll('.contact-animate');
      elements.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=85&w=1600"
          alt="CAN BAU Büro"
          className="w-full h-full object-cover"
          data-parallax
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80" />
        <div className="absolute bottom-0 left-0 p-6 md:p-10">
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-[#111]">
            {t('contact_title')}
          </h2>
        </div>
      </div>

      <div className="px-6 md:px-10 py-16 md:py-24">
        {/* Big tagline */}
        <div className="contact-animate max-w-3xl mb-24">
          <p className="font-display text-2xl md:text-3xl text-[#111] italic leading-[1.3]">
            Für uns ist keine Baustelle zu klein oder zu groß. 
            Kontaktieren Sie uns für Ihr nächstes Projekt.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-24">
          <div className="contact-animate">
            <div className="flex items-center gap-3 mb-4">
              <MapPin size={18} className="text-[#C8A45C]" />
              <span className="font-mono text-xs text-[#888] uppercase tracking-wider">{t('contact_address')}</span>
            </div>
            <p className="font-body text-base text-[#444]">
              Radetzkystraße 66<br />
              6845 Hohenems<br />
              Vorarlberg, Österreich
            </p>
          </div>

          <div className="contact-animate">
            <div className="flex items-center gap-3 mb-4">
              <Phone size={18} className="text-[#C8A45C]" />
              <span className="font-mono text-xs text-[#888] uppercase tracking-wider">{t('contact_phone')}</span>
            </div>
            <a href="tel:+435576755450" className="font-body text-base text-[#444] hover:text-[#111] transition-colors block">
              +43 (0) 5576 755 450
            </a>
            <a href="tel:+43664123456" className="font-body text-base text-[#444] hover:text-[#111] transition-colors block mt-1">
              +43 (0) 664 123 45 67
            </a>
          </div>

          <div className="contact-animate">
            <div className="flex items-center gap-3 mb-4">
              <Mail size={18} className="text-[#C8A45C]" />
              <span className="font-mono text-xs text-[#888] uppercase tracking-wider">{t('contact_email')}</span>
            </div>
            <a href="mailto:info@canbau.at" className="font-body text-base text-[#444] hover:text-[#111] transition-colors block">
              info@canbau.at
            </a>
            <a href="mailto:projekte@canbau.at" className="font-body text-base text-[#444] hover:text-[#111] transition-colors block mt-1">
              projekte@canbau.at
            </a>
          </div>
        </div>

        {/* Opening Hours + CTA */}
        <div className="contact-animate grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-24">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Clock size={18} className="text-[#C8A45C]" />
              <span className="font-mono text-xs text-[#888] uppercase tracking-wider">{t('opening_hours')}</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between font-body text-sm text-[#444]">
                <span>{t('weekdays')}</span>
                <span>07:00 – 17:00</span>
              </div>
              <div className="flex justify-between font-body text-sm text-[#444]">
                <span>{t('saturday')}</span>
                <span>08:00 – 12:00</span>
              </div>
              <div className="flex justify-between font-body text-sm text-[#aaa]">
                <span>{t('sunday')}</span>
                <span>{t('closed')}</span>
              </div>
            </div>
          </div>

          <div className="flex items-end">
            <a
              href="mailto:info@canbau.at"
              className="btn-outline text-[#111] inline-flex"
            >
              <span>{t('contact_btn')}</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="contact-animate image-reveal">
          <div className="w-full aspect-[21/9] bg-[#F5F0E8] flex items-center justify-center border border-[#E5E0D8]">
            <div className="text-center">
              <MapPin size={32} className="text-[#C8A45C] mx-auto mb-4" />
              <p className="font-body text-sm text-[#888]">
                Radetzkystraße 66, 6845 Hohenems<br />
                Österreich
              </p>
              <a
                href="https://maps.google.com/?q=Radetzkystraße+66+6845+Hohenems"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[#C8A45C] hover:text-[#111] transition-colors mt-4 inline-block"
              >
                AUF GOOGLE MAPS ÖFFNEN →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
