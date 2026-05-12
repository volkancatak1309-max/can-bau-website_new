import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Heading animation
    const heading = section.querySelector('.about-heading');
    if (heading) {
      gsap.fromTo(
        heading,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }

    // Body text
    const bodyText = section.querySelector('.about-body');
    if (bodyText) {
      gsap.fromTo(
        bodyText,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bodyText,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-white py-24 md:py-32"
    >
      <div className="w-full px-6 md:px-10">
        {/* Section label */}
        <div className="mb-6">
          <span className="section-label text-[#888]">Unser Unternehmen</span>
        </div>

        {/* Giant heading */}
        <h2 className="about-heading font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#111] max-w-4xl mb-16">
          <span className="text-reveal">
            <span className="char inline-block">Unser</span>
          </span>{' '}
          <span className="text-reveal">
            <span className="char inline-block italic">Unternehmen</span>
          </span>
        </h2>

        {/* Body text - offset right */}
        <div className="about-body ml-auto max-w-2xl pr-4 md:pr-16">
          <p className="font-body text-base md:text-lg text-[#444] leading-relaxed mb-8">
            Das Studio schafft zeitgenössische Räume, die außergewöhnlich sind und perfekt 
            in einzigartige Orte eingebettet sind: in Vorarlberg, in den Bergen des 
            Bregenzerwaldes oder am Bodensee. In atemberaubenden Kulissen, wo die Natur 
            das Außergewöhnliche vorschreibt, unterstützt die Technik die Inspiration, 
            um das Unmögliche zu realisieren.
          </p>
          <p className="font-body text-base md:text-lg text-[#444] leading-relaxed">
            Wir bauen mit Präzision, Verantwortung und kompromissloser Qualität. 
            Jedes Projekt ist ein Versprechen: an unsere Kunden, an unser Team und 
            an die Region, die uns geprägt hat.
          </p>
        </div>
      </div>

      {/* Large office image */}
      <div className="mt-20 px-6 md:px-10">
        <div className="image-reveal w-full max-w-4xl mx-auto">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=85&w=1200"
            alt="CAN BAU Büro"
            className="w-full aspect-[16/9] object-cover"
          />
        </div>
      </div>

      {/* Sketch vs Render comparison */}
      <div className="mt-8 px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <div className="image-reveal">
            <img
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=85&w=600"
              alt="Architekturskizze"
              className="w-full aspect-[4/3] object-cover"
            />
          </div>
          <div className="image-reveal">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=85&w=600"
              alt="Fertiges Gebäude"
              className="w-full aspect-[4/3] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
