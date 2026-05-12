import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Vision() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Heading
    const heading = section.querySelector('.vision-heading');
    if (heading) {
      gsap.fromTo(
        heading,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: heading, start: 'top 80%', once: true },
        }
      );
    }

    // Body
    const body = section.querySelector('.vision-body');
    if (body) {
      gsap.fromTo(
        body,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: { trigger: body, start: 'top 85%', once: true },
        }
      );
    }
  }, []);

  return (
    <section id="vision" ref={sectionRef} className="relative bg-white">
      {/* Full bleed image */}
      <div className="w-full h-[60vh] md:h-[80vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=85&w=1600"
          alt="Premium Villa"
          className="w-full h-full object-cover"
          data-parallax
        />
      </div>

      {/* Vision content */}
      <div className="py-24 md:py-32 px-6 md:px-10">
        {/* Label */}
        <div className="mb-6">
          <span className="section-label text-[#888]">Unsere Vision</span>
        </div>

        {/* Giant heading */}
        <h2 className="vision-heading font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#111] max-w-4xl mb-16">
          Die Vision
        </h2>

        {/* Body text */}
        <div className="vision-body ml-auto max-w-2xl pr-4 md:pr-16 mb-20">
          <p className="font-body text-base md:text-lg text-[#444] leading-relaxed">
            CAN BAU denkt Räume, die uns tief mit dem verbinden, was uns erhebt. 
            Die Schönheit, die wir zelebrieren, ist nicht unkörperlich: Sie geht auf 
            die Gefühle ein und ehrt die reinen Emotionen. Manchmal spektakulär, 
            niemals protzig – sie bietet ein seltenes und unendlich persönliches Erlebnis.
          </p>
        </div>

        {/* Office images grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          <div className="image-reveal">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=85&w=800"
              alt="CAN BAU Büro"
              className="w-full aspect-[4/3] object-cover"
            />
          </div>
          <div className="image-reveal">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=85&w=800"
              alt="CAN BAU Team"
              className="w-full aspect-[4/3] object-cover"
            />
          </div>
        </div>

        {/* Quote + CTA */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-xs">
            <p className="font-mono text-xs text-[#666] leading-relaxed uppercase tracking-wider mb-6">
              Hier entstehen unsere Ideen, getragen von der Qualität 
              der Berge und der Bodensee-Region.
            </p>
            <a href="#" className="btn-outline text-[#111]">
              <span>Das Unternehmen</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          <p className="font-display text-2xl md:text-3xl text-[#111] max-w-md italic">
            Die Realität ist keine Begrenzung, sondern Möglichkeiten zu transzendieren.
          </p>
        </div>
      </div>
    </section>
  );
}
