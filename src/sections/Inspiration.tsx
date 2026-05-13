import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const architectureImages = [
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1600573472556-e636c2acda88?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600',
];

const poolImages = [
  'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600',
];

export default function Inspiration() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-up animasyonu
      const fadeElements = sectionRef.current?.querySelectorAll('.insp-fade');
      if (fadeElements) {
        gsap.from(fadeElements, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        });
      }

      // Parallax efekti (cover görsel)
      if (coverRef.current) {
        gsap.to(coverRef.current, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: coverRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--color-beige)',
        paddingTop: '8rem',
        paddingBottom: '8rem',
      }}
    >
      {/* Triptik bölüm */}
      <div className="wrapper-1564">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* Sol: + butonu, metin, CTA */}
          <div className="md:col-span-3 insp-fade">
            <button className="plus-btn mb-6" aria-label="Inspiration">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1">
                <line x1="6.5" y1="0" x2="6.5" y2="13" />
                <line x1="0" y1="6.5" x2="13" y2="6.5" />
              </svg>
            </button>

            <p
              className="statement-text mb-8"
              style={{
                fontFamily: 'var(--font-maison-neue-mono)',
                fontSize: 'var(--text-13)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                lineHeight: '1.7',
                color: 'var(--color-black)',
              }}
            >
              {t('inspiration_caption') || 'Here our ideas are born, inspired by the majesty of the mountains and the serenity of the lake.'}
            </p>

            <a
              href="#/agence"
              className="btn-primary"
            >
              {t('inspiration_btn') || 'Agency'}
            </a>
          </div>

          {/* Orta: Büyük ofis fotoğrafı + parallax */}
          <div className="md:col-span-6 overflow-hidden insp-fade" style={{ height: 'clamp(30rem, 40vw, 50rem)' }}>
            <div ref={coverRef} className="w-full h-[120%]">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                alt="Office"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Sağ: Siyah-beyaz personel fotoğrafı */}
          <div className="md:col-span-3 md:mt-24 insp-fade" style={{ height: 'clamp(25rem, 30vw, 40rem)' }}>
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600"
              alt="Team"
              className="w-full h-full object-cover"
              style={{ filter: 'grayscale(100%)' }}
            />
          </div>
        </div>
      </div>

      {/* Büyük statement */}
      <div className="wrapper-1564 mt-24 md:mt-40 mb-16 md:mb-24 insp-fade">
        <h2
          style={{
            fontFamily: 'var(--font-canela)',
            fontSize: 'clamp(4rem, 7vw, 12.8rem)',
            fontWeight: 'var(--font-weight-light)',
            lineHeight: '110%',
            color: 'var(--color-black)',
          }}
        >
          {t('inspiration_statement') || 'Reality is not a limitation,'}
          <br />
          <span style={{ color: 'var(--color-beige-light)' }}>
            {t('inspiration_statement2') || 'possibilities to...'}
          </span>
        </h2>
      </div>

      {/* Galeri 1: Architecture */}
      <div className="mb-16 insp-fade">
        <div className="wrapper-1564 mb-6 flex items-center justify-between">
          <h3
            style={{
              fontFamily: 'var(--font-maison-neue)',
              fontSize: 'var(--text-18)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-black)',
            }}
          >
            {t('gallery_architecture') || 'Architecture'}
          </h3>
          <p
            className="statement-text hidden md:block"
            style={{ maxWidth: '30rem' }}
          >
            {t('gallery_architecture_desc') || 'When lines shape space and celebrate character'}
          </p>
        </div>
        <div className="wrapper-1564">
          <div className="horizontal-gallery">
            {architectureImages.map((src, i) => (
              <div key={i} className="gallery-item">
                <img src={src} alt={`Architecture ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Galeri 2: Pools & Outdoor Spaces */}
      <div className="insp-fade">
        <div className="wrapper-1564 mb-6 flex items-center justify-between">
          <h3
            style={{
              fontFamily: 'var(--font-maison-neue)',
              fontSize: 'var(--text-18)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-black)',
            }}
          >
            {t('gallery_outdoor') || 'Pools & Outdoor Spaces'}
          </h3>
          <p
            className="statement-text hidden md:block"
            style={{ maxWidth: '30rem' }}
          >
            {t('gallery_outdoor_desc') || 'Pools and gardens merge with the horizon, reaching out to the vastness of the world like never before'}
          </p>
        </div>
        <div className="wrapper-1564">
          <div className="horizontal-gallery">
            {poolImages.map((src, i) => (
              <div key={i} className="gallery-item">
                <img src={src} alt={`Pool ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
