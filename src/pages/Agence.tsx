import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Agence() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = document.querySelectorAll('.agence-animate');
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

      // Parallax images
      const parallaxImages = document.querySelectorAll('[data-parallax]');
      parallaxImages.forEach((img) => {
        gsap.to(img, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const team = [
    { name: 'Max Mustermann', role: 'Geschäftsführer', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=85&w=400' },
    { name: 'Anna Bauer', role: 'Projektleiterin', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=85&w=400' },
    { name: 'Thomas Weber', role: 'Bauleiter', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=85&w=400' },
  ];

  return (
    <section ref={sectionRef} className="bg-white">
      {/* Hero Image */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=85&w=1600"
          alt="CAN BAU Büro"
          className="w-full h-full object-cover"
          data-parallax
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80" />
      </div>

      <div className="px-6 md:px-10 py-16 md:py-24">
        {/* Title */}
        <div className="agence-animate mb-16">
          <span className="section-label text-[#888] mb-4 block">{t('agency_title')}</span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-[#111]">
            {t('agency_title')}
          </h2>
        </div>

        {/* Big Quote */}
        <div className="agence-animate max-w-3xl mb-24">
          <p className="font-display text-2xl md:text-3xl lg:text-4xl text-[#111] italic leading-[1.3]">
            {t('agency_subtitle')}
          </p>
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-24">
          <div className="agence-animate">
            <div className="image-reveal mb-8">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=85&w=800"
                alt="Architektur Detail"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <p className="font-body text-sm text-[#555] leading-relaxed">
              {t('agency_text1')}
            </p>
          </div>

          <div className="agence-animate md:mt-20">
            <div className="image-reveal mb-8">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=85&w=800"
                alt="Fertiges Gebäude"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <p className="font-body text-sm text-[#555] leading-relaxed">
              {t('agency_text2')}
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="agence-animate mb-8">
          <span className="section-label text-[#888] mb-4 block">{t('team_title')}</span>
          <h3 className="font-display text-3xl md:text-4xl text-[#111] mb-12">
            {t('team_subtitle')} <span className="italic">CAN BAU</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.name} className="agence-animate group">
              <div className="image-reveal mb-4 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full aspect-[3/4] object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <h4 className="font-display text-xl text-[#111]">{member.name}</h4>
              <p className="font-mono text-xs text-[#888] uppercase">{member.role}</p>
            </div>
          ))}
        </div>

        {/* Big Quote */}
        <div className="agence-animate mt-24 max-w-3xl mx-auto text-center">
          <p className="font-display text-3xl md:text-4xl text-[#111] italic leading-[1.2]">
            "{t('team_quote')}"
          </p>
        </div>
      </div>
    </section>
  );
}
