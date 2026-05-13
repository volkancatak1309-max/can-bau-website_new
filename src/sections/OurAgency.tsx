import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

/**
 * "Our Agency" — Archidomo-style two-column intro.
 * Left: oversized serif heading ("Our agency" + italic) with + button.
 * Right: lead paragraph + secondary paragraph + CTA.
 * Scroll-triggered fade-up stagger.
 */
export default function OurAgency() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = sectionRef.current?.querySelector('.agency-heading');
      const body = sectionRef.current?.querySelectorAll('.agency-fade');

      if (heading) {
        gsap.fromTo(
          heading,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: heading, start: 'top 85%', once: true },
          }
        );
      }

      if (body && body.length) {
        gsap.fromTo(
          body,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-40"
      style={{ backgroundColor: 'var(--cream)' }}
    >
      <div className="px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          {/* LEFT: + button + label + giant heading */}
          <div className="md:col-span-5">
            <button className="plus-btn mb-8" aria-hidden="true">+</button>
            <span className="section-label block mb-6" style={{ color: 'var(--text-secondary)' }}>
              {t('agency_title')}
            </span>
            <h2
              className="agency-heading font-display leading-[0.92]"
              style={{
                color: 'var(--black)',
                fontSize: 'clamp(48px, 6vw, 96px)',
                letterSpacing: '-0.02em',
              }}
            >
              Our <span className="italic">agency</span>
            </h2>
          </div>

          {/* RIGHT: subtitle + body + CTA */}
          <div className="md:col-span-7 md:pl-8 md:pt-16">
            <p
              className="agency-fade font-display italic mb-10"
              style={{
                color: 'var(--black)',
                fontSize: 'clamp(20px, 1.8vw, 28px)',
                lineHeight: 1.35,
              }}
            >
              {t('agency_subtitle')}
            </p>

            <div className="agency-fade max-w-xl space-y-6 mb-12">
              <p className="font-body text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {t('agency_text1')}
              </p>
              <p className="font-body text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {t('agency_text2')}
              </p>
            </div>

            <a href="#/agence" className="agency-fade btn-outline inline-flex" style={{ color: 'var(--black)' }}>
              <span>{t('agency_title')}</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
