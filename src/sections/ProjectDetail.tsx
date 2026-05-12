import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';

interface ProjectDetailProps {
  projectId: string;
  onBack: () => void;
}

const projectsData: Record<string, {
  name: string;
  size: string;
  location: string;
  year: string;
  description: string;
  heroImage: string;
  gallery: string[];
}> = {
  sonnenhof: {
    name: 'Wohnanlage Sonnenhof',
    size: '2.400 m²',
    location: 'Hohenems',
    year: '2024',
    description: 'Mit der Wohnanlage Sonnenhof realisiert CAN BAU ein meisterhaftes Bauvorhaben – moderne Architektur trifft auf höchste Wohnqualität inmitten der Vorarlberger Landschaft. Das Projekt umfasst 12 Eigentumswohnungen mit hochwertiger Ausstattung und nachhaltiger Bauweise.',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=85&w=1600',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=85&w=800',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=85&w=800',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&q=85&w=800',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=85&w=800',
    ],
  },
  dornbirn: {
    name: 'Gewerbehof Dornbirn',
    size: '3.800 m²',
    location: 'Dornbirn',
    year: '2023',
    description: 'Ein modernes Gewerbezentrum mit Büroflächen, Lagerhallen und Showroom. Die architektonische Gestaltung vereint Funktionalität mit ästhetischer Eleganz.',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=85&w=1600',
    gallery: [
      'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=85&w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=85&w=800',
    ],
  },
  alpine: {
    name: 'Villa Alpine',
    size: '450 m²',
    location: 'Lech',
    year: '2023',
    description: 'Eine exklusive Villa in den Alpen mit panoramischem Bergblick. Premium-Materialien und innovative Bauweise vereinen sich zu einem einzigartigen Wohnerlebnis.',
    heroImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=85&w=1600',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=85&w=800',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=85&w=800',
    ],
  },
  rathaus: {
    name: 'Sanierung Rathaus',
    size: '1.200 m²',
    location: 'Feldkirch',
    year: '2022',
    description: 'Umfassende Sanierung des historischen Rathausgebäudes unter Denkmalschutz. Moderne Technik trifft auf historische Bausubstanz.',
    heroImage: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=85&w=1600',
    gallery: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=85&w=800',
    ],
  },
  rheintal: {
    name: 'Industriehalle Rheintal',
    size: '5.500 m²',
    location: 'Lustenau',
    year: '2022',
    description: 'Neubau einer modernen Industriehalle mit Bürotrakt und Sozialräumen. Effiziente Logistik und zeitgemäße Arbeitsbedingungen standen im Fokus.',
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=85&w=1600',
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=85&w=800',
    ],
  },
  default: {
    name: 'Projekt',
    size: '—',
    location: 'Vorarlberg',
    year: '2024',
    description: 'Ein herausragendes Bauvorhaben der CAN BAU GmbH.',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=85&w=1600',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=85&w=800',
    ],
  },
};

export default function ProjectDetail({ projectId, onBack }: ProjectDetailProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const project = projectsData[projectId] || projectsData.default;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Hero text animation
    const heroText = section.querySelector('.hero-text');
    if (heroText) {
      gsap.fromTo(
        heroText,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
      );
    }

    // Gallery images
    const galleryItems = section.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, i) => {
      gsap.fromTo(
        item,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.5 + i * 0.1,
          ease: 'power2.out',
        }
      );
    });
  }, [projectId]);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-white">
      {/* Back button */}
      <div className="fixed top-24 left-6 md:left-10 z-40">
        <button
          onClick={onBack}
          className="btn-outline text-[#111] bg-white/80 backdrop-blur-sm"
        >
          <ArrowLeft size={14} />
          <span>Zurück</span>
        </button>
      </div>

      {/* Hero: Full bleed image with project name */}
      <div className="relative h-[80vh] md:h-screen w-full overflow-hidden">
        <img
          src={project.heroImage}
          alt={project.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
        
        {/* Project name overlay */}
        <div className="hero-text absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-4">
            {project.name}
          </h1>
          <div className="flex flex-wrap gap-6">
            <span className="project-tag text-white/80">[ {project.size} ]</span>
            <span className="project-tag text-white/80">[ {project.location} ]</span>
            <span className="project-tag text-white/80">[ {project.year} ]</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-20 md:py-32 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          {/* Description */}
          <p className="font-body text-lg md:text-xl text-[#444] leading-relaxed mb-16">
            {project.description}
          </p>

          {/* Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.gallery.map((img, i) => (
              <div 
                key={i} 
                className={`gallery-item image-reveal ${i === 0 ? 'md:col-span-2' : ''}`}
              >
                <img
                  src={img}
                  alt={`${project.name} - Bild ${i + 1}`}
                  className={`w-full object-cover ${i === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}
                />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <a 
              href="mailto:info@canbau.at" 
              className="btn-outline text-[#111] inline-flex"
            >
              <span>Projekt anfragen</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
