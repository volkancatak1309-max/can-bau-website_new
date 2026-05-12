import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { title: 'Hochbau', desc: 'Wohnbau, Gewerbebau und Sonderprojekte — vom Aushub bis zur Schlüsselübergabe.' },
  { title: 'Tiefbau', desc: 'Straßen, Kanäle, Fundamente und Infrastruktur für Gemeinden und Unternehmen.' },
  { title: 'Abbrucharbeiten', desc: 'Professioneller Rückbau mit modernster Technik und höchsten Sicherheitsstandards.' },
  { title: 'Baustoffhandel', desc: 'Qualitätsbaustoffe für Profis: Beton, Kies, Sand und Spezialmaterialien.' },
  { title: 'Mietpark', desc: 'Baumaschinen und Equipment für jedes Projekt — flexibel, zuverlässig, fair.' },
];

const partners = [
  'Liebherr', 'Wirtgen', 'Vögele', 'Hamm', 'Kleemann',
  'Atlas Copco', 'Bosch', 'Makita', 'Hilti', 'Siemens',
  'Schüco', 'Jung', 'Gira', 'Geberit', 'Hansgrohe',
  'Duravit', 'Villeroy & Boch', 'Bette', 'Bora', 'Gaggenau',
];

export default function Immersion() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = document.querySelectorAll('.immersion-animate');
      elements.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });

      // Parallax
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

  return (
    <section ref={sectionRef} className="bg-white">
      {/* Hero: Full bleed mountain/lake image */}
      <div className="relative h-[80vh] md:h-screen w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=85&w=2000"
          alt="Vorarlberg Landschaft"
          className="w-full h-full object-cover"
          data-parallax
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
        <div className="absolute bottom-0 left-0 p-6 md:p-10">
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-white">
            {t('immersion_title')}
          </h2>
        </div>
      </div>

      <div className="px-6 md:px-10 py-16 md:py-24">
        {/* Subtitle */}
        <div className="immersion-animate max-w-3xl mb-24">
          <p className="font-display text-2xl md:text-3xl text-[#111] italic leading-[1.3]">
            {t('immersion_subtitle')}
          </p>
        </div>

        {/* Interior gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-24">
          <div className="immersion-animate image-reveal">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=85&w=800"
              alt="Innenausbau"
              className="w-full aspect-[4/3] object-cover"
            />
          </div>
          <div className="immersion-animate image-reveal md:mt-12">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=85&w=800"
              alt="Detail"
              className="w-full aspect-[4/3] object-cover"
            />
          </div>
        </div>

        {/* Big Quote */}
        <div className="immersion-animate max-w-3xl mx-auto text-center mb-24">
          <p className="font-display text-3xl md:text-4xl text-[#111] italic leading-[1.2]">
            "Das Haus trotzt der Schwerkraft. Schwebend zwischen Himmel und Wasser..."
          </p>
        </div>

        {/* Services */}
        <div className="mb-24">
          <div className="immersion-animate mb-12">
            <span className="section-label text-[#888] mb-4 block">Leistungen</span>
            <h3 className="font-display text-3xl md:text-4xl text-[#111]">
              Unsere <span className="italic">Expertise</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.title} className="immersion-animate group p-6 border border-[#E5E0D8] hover:bg-[#F5F0E8] transition-colors">
                <h4 className="font-display text-2xl text-[#111] mb-3">{service.title}</h4>
                <p className="font-body text-sm text-[#555] leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partners Grid */}
        <div className="mb-24">
          <div className="immersion-animate mb-12">
            <span className="section-label text-[#888] mb-4 block">Partner & Marken</span>
            <h3 className="font-display text-3xl md:text-4xl text-[#111]">
              Unsere <span className="italic">Partner</span>
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {partners.map((partner) => (
              <div
                key={partner}
                className="immersion-animate flex items-center justify-center p-4 border border-[#E5E0D8] hover:border-[#111] transition-colors"
              >
                <span className="font-mono text-xs text-[#888] uppercase tracking-wider">{partner}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Final image */}
        <div className="immersion-animate image-reveal">
          <img
            src="https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&q=85&w=1200"
            alt="Showroom"
            className="w-full aspect-[21/9] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
