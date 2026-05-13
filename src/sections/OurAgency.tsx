import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function OurAgency() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(elementsRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="wrapper-1564"
      style={{
        paddingTop: '12rem',
        paddingBottom: '12rem',
        backgroundColor: 'var(--color-beige)',
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Sol: + butonu ve başlık */}
        <div className="md:col-span-5" ref={addToRefs}>
          {/* + butonu */}
          <button
            className="plus-btn mb-8"
            aria-label="Agency"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1">
              <line x1="6.5" y1="0" x2="6.5" y2="13" />
              <line x1="0" y1="6.5" x2="13" y2="6.5" />
            </svg>
          </button>

          {/* Section label */}
          <p className="section-label mb-4" style={{ color: 'var(--color-beige-light)' }}>
            {t('agency_label') || 'Agency'}
          </p>

          {/* Büyük başlık */}
          <h2
            className="title-3"
            style={{
              fontFamily: 'var(--font-canela)',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              fontWeight: 'var(--font-weight-light)',
              lineHeight: '125%',
              color: 'var(--color-black)',
            }}
          >
            Our <em>agency</em>
          </h2>
        </div>

        {/* Sağ: Metin içerik */}
        <div className="md:col-span-7 md:pt-16" ref={addToRefs}>
          <p
            className="mb-8"
            style={{
              fontFamily: 'var(--font-canela)',
              fontSize: 'var(--text-24)',
              fontStyle: 'italic',
              fontWeight: 'var(--font-weight-light)',
              lineHeight: '1.4',
              color: 'var(--color-black)',
            }}
          >
            {t('agency_subtitle') || 'Excellence in every detail'}
          </p>

          <div className="flex flex-col gap-6">
            <p
              style={{
                fontFamily: 'var(--font-maison-neue)',
                fontSize: 'var(--text-16)',
                fontWeight: 'var(--font-weight-normal)',
                lineHeight: '1.7',
                color: 'var(--color-black)',
              }}
            >
              {t('agency_text1')}
            </p>

            <p
              style={{
                fontFamily: 'var(--font-maison-neue)',
                fontSize: 'var(--text-16)',
                fontWeight: 'var(--font-weight-normal)',
                lineHeight: '1.7',
                color: 'var(--color-black)',
              }}
            >
              {t('agency_text2')}
            </p>
          </div>

          {/* CTA butonu */}
          <div className="mt-10">
            <a
              href="#/agence"
              className="btn-primary"
            >
              {t('agency_cta') || 'Discover Our Agency'}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 12L12 4M12 4H5M12 4V11" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
