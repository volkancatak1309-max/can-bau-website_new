import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LanguageContext';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  name: string;
  size: string;
  location: string;
  year: string;
  description: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 'sonnenhof',
    name: 'Wohnanlage Sonnenhof',
    size: '2.400 m²',
    location: 'Hohenems',
    year: '2024',
    description: 'Moderne Architektur trifft auf höchste Wohnqualität inmitten der Vorarlberger Landschaft.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=85&w=1000',
  },
  {
    id: 'dornbirn',
    name: 'Gewerbehof Dornbirn',
    size: '3.800 m²',
    location: 'Dornbirn',
    year: '2023',
    description: 'Modernes Gewerbezentrum mit Büroflächen, Lagerhallen und Showroom.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=85&w=1000',
  },
  {
    id: 'alpine',
    name: 'Villa Alpine',
    size: '450 m²',
    location: 'Lech',
    year: '2023',
    description: 'Exklusive Villa in den Alpen mit panoramischem Bergblick.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=85&w=1000',
  },
  {
    id: 'rathaus',
    name: 'Sanierung Rathaus',
    size: '1.200 m²',
    location: 'Feldkirch',
    year: '2022',
    description: 'Umfassende Sanierung des historischen Rathausgebäudes unter Denkmalschutz.',
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=85&w=1000',
  },
  {
    id: 'rheintal',
    name: 'Industriehalle Rheintal',
    size: '5.500 m²',
    location: 'Lustenau',
    year: '2022',
    description: 'Neubau einer modernen Industriehalle mit Bürotrakt und Sozialräumen.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=85&w=1000',
  },
  {
    id: 'bregenz',
    name: 'Einfamilienhaus Bregenz',
    size: '320 m²',
    location: 'Bregenz',
    year: '2021',
    description: 'Einfamilienhaus mit modernem Design und Seeblick.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=85&w=1000',
  },
  {
    id: 'tiefgarage',
    name: 'Tiefgarage Marktgasse',
    size: '1.800 m²',
    location: 'Bludenz',
    year: '2021',
    description: 'Neubau einer Tiefgarage im Stadtzentrum von Bludenz.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=85&w=1000',
  },
  {
    id: 'montfort',
    name: 'Gewerbebau Montfort',
    size: '2.100 m²',
    location: 'Rankweil',
    year: '2020',
    description: 'Gewerbegebäude mit moderner Fassade und effizienter Raumaufteilung.',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=85&w=1000',
  },
  {
    id: 'altbau',
    name: 'Umbau Altbau',
    size: '280 m²',
    location: 'Hard',
    year: '2020',
    description: 'Sensibler Umbau eines denkmalgeschützten Altbaus am Bodensee.',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=85&w=1000',
  },
];

export default function Realisations() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = document.querySelectorAll('.real-animate');
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
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen" style={{ backgroundColor: '#F5F0E8' }}>
      {selectedProject ? (
        /* Project Detail View */
        <div className="bg-white">
          <div className="relative h-[70vh] overflow-hidden">
            <img
              src={selectedProject.image}
              alt={selectedProject.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
            <div className="absolute bottom-0 left-0 p-6 md:p-10">
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-4">
                {selectedProject.name}
              </h2>
              <div className="flex gap-6">
                <span className="project-tag text-white/80">[ {selectedProject.size} ]</span>
                <span className="project-tag text-white/80">[ {selectedProject.location} ]</span>
                <span className="project-tag text-white/80">[ {selectedProject.year} ]</span>
              </div>
            </div>
          </div>

          <div className="px-6 md:px-10 py-16">
            <p className="font-body text-lg text-[#444] max-w-2xl mb-8">
              {selectedProject.description}
            </p>
            <button
              onClick={() => setSelectedProject(null)}
              className="btn-outline text-[#111]"
            >
              <span>Zurück zur Übersicht</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      ) : (
        /* Projects List/Grid View */
        <div className="px-6 md:px-10 py-16 md:py-24">
          {/* Header */}
          <div className="real-animate mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="section-label text-[#888] mb-4 block">{t('projects_title')}</span>
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-[#111]">
                {t('projects_title')}
              </h2>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setViewMode('grid')}
                className={`font-mono text-xs uppercase tracking-wider transition-colors ${
                  viewMode === 'grid' ? 'text-[#111]' : 'text-[#aaa]'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`font-mono text-xs uppercase tracking-wider transition-colors ${
                  viewMode === 'list' ? 'text-[#111]' : 'text-[#aaa]'
                }`}
              >
                Liste
              </button>
            </div>
          </div>

          {viewMode === 'grid' ? (
            /* Grid View */
            <div className="space-y-24">
              {projects.map((project, i) => (
                <div
                  key={project.id}
                  className={`real-animate grid grid-cols-1 ${
                    i % 2 === 0 ? 'md:grid-cols-[1fr_1.5fr]' : 'md:grid-cols-[1.5fr_1fr]'
                  } gap-8 md:gap-16 items-start`}
                >
                  <div className={i % 2 !== 0 ? 'md:order-2' : ''}>
                    <h3 className="font-display text-3xl md:text-4xl text-[#111] mb-4">
                      {project.name}
                    </h3>
                    <div className="flex flex-wrap gap-4 mb-6">
                      <span className="project-tag text-[#888]">[ {project.size} ]</span>
                      <span className="project-tag text-[#888]">[ {project.location} ]</span>
                      <span className="project-tag text-[#888]">[ {project.year} ]</span>
                    </div>
                    <p className="font-body text-sm text-[#555] leading-relaxed mb-6 max-w-md">
                      {project.description}
                    </p>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="btn-outline text-[#111]"
                    >
                      <span>{t('project_btn')}</span>
                      <ArrowUpRight size={14} />
                    </button>
                  </div>

                  <div className={`image-reveal ${i % 2 !== 0 ? 'md:order-1' : ''}`}>
                    <button onClick={() => setSelectedProject(project)} className="w-full">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full aspect-[4/3] object-cover hover:scale-[1.02] transition-transform duration-500"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="divide-y divide-[#E5E0D8]">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="real-animate group w-full flex items-center justify-between py-5 transition-colors hover:bg-[#EDE8E0] px-3 -mx-3 text-left"
                >
                  <div className="flex-1">
                    <span className="font-display text-xl md:text-2xl text-[#111] group-hover:translate-x-2 transition-transform duration-300 inline-block">
                      {project.name}
                    </span>
                  </div>
                  <div className="hidden md:flex items-center gap-8 lg:gap-16">
                    <span className="font-mono text-xs text-[#888] w-24 text-right">{project.size}</span>
                    <span className="font-mono text-xs text-[#888] w-32 text-right uppercase">{project.location}</span>
                    <span className="font-mono text-xs text-[#888] w-16 text-right">{project.year}</span>
                  </div>
                  <div className="ml-4">
                    <ArrowUpRight
                      size={16}
                      className="text-[#999] group-hover:text-[#111] transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
