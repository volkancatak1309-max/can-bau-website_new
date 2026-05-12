import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
  onProjectClick: (projectId: string) => void;
}

const projectList = [
  { id: 'sonnenhof', name: 'Wohnanlage Sonnenhof', size: '2.400 m²', location: 'Hohenems', year: '2024' },
  { id: 'dornbirn', name: 'Gewerbehof Dornbirn', size: '3.800 m²', location: 'Dornbirn', year: '2023' },
  { id: 'alpine', name: 'Villa Alpine', size: '450 m²', location: 'Lech', year: '2023' },
  { id: 'rathaus', name: 'Sanierung Rathaus', size: '1.200 m²', location: 'Feldkirch', year: '2022' },
  { id: 'rheintal', name: 'Industriehalle Rheintal', size: '5.500 m²', location: 'Lustenau', year: '2022' },
  { id: 'bregenz', name: 'Einfamilienhaus Bregenz', size: '320 m²', location: 'Bregenz', year: '2021' },
  { id: 'tiefgarage', name: 'Tiefgarage Marktgasse', size: '1.800 m²', location: 'Bludenz', year: '2021' },
  { id: 'montfort', name: 'Gewerbebau Montfort', size: '2.100 m²', location: 'Rankweil', year: '2020' },
  { id: 'altbau', name: 'Umbau Altbau', size: '280 m²', location: 'Hard', year: '2020' },
];

const featuredProject = {
  id: 'sonnenhof',
  name: 'Wohnanlage Sonnenhof',
  size: '2.400 m²',
  location: 'Hohenems',
  year: '2024',
  description: 'Mit der Wohnanlage Sonnenhof realisiert CAN BAU ein meisterhaftes Bauvorhaben – moderne Architektur trifft auf höchste Wohnqualität inmitten der Vorarlberger Landschaft.',
  image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=85&w=1200',
};

export default function Projects({ onProjectClick }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const quote = section.querySelector('.project-quote');
    if (quote) {
      gsap.fromTo(
        quote,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: { trigger: quote, start: 'top 80%', once: true },
        }
      );
    }

    const projectName = section.querySelector('.featured-name');
    if (projectName) {
      gsap.fromTo(
        projectName,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: projectName, start: 'top 80%', once: true },
        }
      );
    }

    const listItems = section.querySelectorAll('.project-list-item');
    listItems.forEach((item, i) => {
      gsap.fromTo(
        item,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: i * 0.05,
          ease: 'power2.out',
          scrollTrigger: { trigger: item, start: 'top 90%', once: true },
        }
      );
    });
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 md:py-32"
      style={{ backgroundColor: '#F5F0E8' }}
    >
      <div className="w-full px-6 md:px-10">
        {/* Quote */}
        <div className="project-quote max-w-md mb-20">
          <p className="font-mono text-xs text-[#666] leading-relaxed uppercase tracking-wider">
            Aus der Chance eines Ortes ein Lebenserlebnis zu machen, 
            das seinesgleichen sucht.
          </p>
        </div>

        {/* Featured Project */}
        <div className="mb-20">
          <h3 className="featured-name font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#111] mb-6">
            {featuredProject.name}
          </h3>
          <div className="flex flex-wrap gap-6 mb-8">
            <span className="project-tag text-[#666]">[ {featuredProject.size} ]</span>
            <span className="project-tag text-[#666]">[ {featuredProject.location} ]</span>
            <span className="project-tag text-[#666]">[ {featuredProject.year} ]</span>
          </div>

          {/* Asymmetric layout: small image left, big image right */}
          <div className="grid grid-cols-12 gap-4 mb-8">
            <div className="col-span-12 md:col-span-4">
              <div className="image-reveal">
                <img
                  src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=85&w=500"
                  alt="Projekt Detail"
                  className="w-full aspect-[3/4] object-cover"
                />
              </div>
            </div>
            <div className="col-span-12 md:col-span-8">
              <div className="image-reveal">
                <img
                  src={featuredProject.image}
                  alt={featuredProject.name}
                  className="w-full aspect-[16/10] object-cover"
                />
              </div>
            </div>
          </div>

          <p className="font-body text-sm text-[#555] max-w-lg mb-8 leading-relaxed">
            {featuredProject.description}
          </p>

          <button 
            onClick={() => onProjectClick(featuredProject.id)}
            className="btn-outline text-[#111] cursor-pointer"
          >
            <span>Projekt ansehen</span>
            <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Divider */}
        <div className="divider-line mb-0" />

        {/* Project List */}
        <div className="divide-y divide-[#E5E0D8]">
          {projectList.map((project) => (
            <button
              key={project.id}
              onClick={() => onProjectClick(project.id)}
              className="project-list-item group w-full flex items-center justify-between py-4 md:py-5 transition-colors hover:bg-[#EDE8E0] px-2 -mx-2 text-left cursor-pointer"
            >
              <div className="flex-1">
                <span className="font-display text-lg md:text-xl text-[#111] group-hover:translate-x-2 transition-transform duration-300 inline-block">
                  {project.name}
                </span>
              </div>
              <div className="hidden md:flex items-center gap-12">
                <span className="font-mono text-xs text-[#888] w-24 text-right">{project.size}</span>
                <span className="font-mono text-xs text-[#888] w-32 text-right uppercase">{project.location}</span>
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

        {/* Bottom CTA */}
        <div className="mt-12">
          <button 
            onClick={() => {}}
            className="btn-outline text-[#111] cursor-pointer"
          >
            <span>Alle Projekte</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
