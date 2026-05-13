import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

/**
 * "Inspiration / La Vision" — Archidomo-style asymmetric reveal.
 * - Top: + button, mono caption, CTA on the left; office photo center; B/W team portrait right.
 * - Middle: oversized serif statement.
 * - Bottom: two horizontal galleries (Architecture, Pools & Outdoor) with snap-scroll.
 *
 * Parallax on the cover image, scroll-triggered fade-up on text/group columns.
 */

const ARCHITECTURE_IMAGES = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=85&w=900',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=85&w=900',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=85&w=900',
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=85&w=900',
  'https://images.unsplash.com/photo-1600573472556-e636c2acda88?auto=format&fit=crop&q=85&w=900',
];

const OUTDOOR_IMAGES = [
  'https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?auto=format&fit=crop&q=85&w=900',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=85&w=900',
  'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=85&w=900',
  'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=85&w=900',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=85&w=900',
];

export default function Inspiration() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-up reveals
      gsap.utils.toArray<HTMLElement>('.insp-fade').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          }
        );
      });

      // Parallax on cover image
      if (parallaxRef.current) {
        gsap.to(parallaxRef.current, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: parallaxRef.current,
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
      id="vision"
      ref={sectionRef}
      className="relative py-24 md:py-40"
      style={{ backgroundColor: 'var(--cream)' }}
    >
      {/* ===== TOP TRIPTYCH: left text column + center office image + right B/W portrait ===== */}
      <div className="px-6 md:px-10 mb-20 md:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
          {/* LEFT: + button, mono caption, CTA */}
          <div className="md:col-span-3 insp-fade">
            <button className="plus-btn mb-8" aria-hidden="true">+</button>
            <span className="section-label block mb-6" style={{ color: 'var(--text-secondary)' }}>
              {t('inspiration_label')}
            </span>
            <p className="statement-text mb-10 max-w-[260px]">
              {t('inspiration_caption')}
            </p>
            <a href="#/immersion" className="btn-outline inline-flex" style={{ color: 'var(--black)' }}>
              <span>{t('inspiration_btn')}</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* CENTER: large office image with parallax */}
          <div className="md:col-span-6 insp-fade">
            <div className="image-reveal revealed aspect-[4/5] overflow-hidden">
              <img
                ref={parallaxRef}
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=85&w=1200"
                alt=""
                className="w-full h-full object-cover"
                style={{ scale: '1.1' }}
              />
            </div>
          </div>

          {/* RIGHT: B/W portrait */}
          <div className="md:col-span-3 insp-fade md:mt-24">
            <div className="image-reveal revealed aspect-[3/4] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=85&w=600"
                alt=""
                className="w-full h-full object-cover"
                style={{ filter: 'grayscale(100%) contrast(1.05)' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ===== GIANT STATEMENT ===== */}
      <div className="px-6 md:px-10 mb-24 md:mb-40">
        <h2
          className="insp-fade font-display max-w-6xl"
          style={{
            color: 'var(--black)',
            fontSize: 'clamp(40px, 7vw, 128px)',
            lineHeight: 0.95,
            letterSpacing: '-0.025em',
          }}
        >
          La <span className="italic">vision</span>
          <br />
          <span style={{ color: 'var(--text-secondary)' }}>{t('inspiration_statement')}</span>
        </h2>
      </div>

      {/* ===== HORIZONTAL GALLERY 1: Architecture ===== */}
      <div className="mb-16 md:mb-24">
        <div className="px-6 md:px-10 mb-6 flex items-baseline justify-between">
          <span className="section-label" style={{ color: 'var(--text-secondary)' }}>
            {t('gallery_architecture')}
          </span>
          <span className="font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
            ← scroll →
          </span>
        </div>
        <div className="horizontal-gallery px-6 md:px-10">
          {ARCHITECTURE_IMAGES.map((src, i) => (
            <div
              key={`arch-${i}`}
              className="image-reveal revealed"
              style={{ width: 'clamp(260px, 32vw, 480px)', aspectRatio: '4/5' }}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* ===== HORIZONTAL GALLERY 2: Pools & Outdoor Spaces ===== */}
      <div>
        <div className="px-6 md:px-10 mb-6 flex items-baseline justify-between">
          <span className="section-label" style={{ color: 'var(--text-secondary)' }}>
            {t('gallery_outdoor')}
          </span>
          <span className="font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
            ← scroll →
          </span>
        </div>
        <div className="horizontal-gallery px-6 md:px-10">
          {OUTDOOR_IMAGES.map((src, i) => (
            <div
              key={`pool-${i}`}
              className="image-reveal revealed"
              style={{ width: 'clamp(260px, 32vw, 480px)', aspectRatio: '4/5' }}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
