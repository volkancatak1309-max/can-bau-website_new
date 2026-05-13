import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LanguageContext';
import { ArrowUpRight } from 'lucide-react';
import Hero from '../sections/Hero';
import OurAgency from '../sections/OurAgency';
import Inspiration from '../sections/Inspiration';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { name: 'Wohnanlage Sonnenhof', size: '2.400 m²', location: 'Hohenems', year: '2024' },
  { name: 'Gewerbehof Dornbirn', size: '3.800 m²', location: 'Dornbirn', year: '2023' },
  { name: 'Villa Alpine', size: '450 m²', location: 'Lech', year: '2023' },
  { name: 'Sanierung Rathaus', size: '1.200 m²', location: 'Feldkirch', year: '2022' },
  { name: 'Industriehalle Rheintal', size: '5.500 m²', location: 'Lustenau', year: '2022' },
  { name: 'Einfamilienhaus Bregenz', size: '320 m²', location: 'Bregenz', year: '2021' },
  { name: 'Tiefgarage Marktgasse', size: '1.800 m²', location: 'Bludenz', year: '2021' },
  { name: 'Gewerbebau Montfort', size: '2.100 m²', location: 'Rankweil', year: '2020' },
  { name: 'Umbau Altbau Hard', size: '280 m²', location: 'Hard', year: '2020' },
  { name: 'Wohnpark Bodensee', size: '4.200 m²', location: 'Bregenz', year: '2019' },
  { name: 'Bürokompass Götzis', size: '1.500 m²', location: 'Götzis', year: '2019' },
  { name: 'Sportanlage Lustenau', size: '3.200 m²', location: 'Lustenau', year: '2018' },
];

const featured = [
  { name: 'Wohnanlage Sonnenhof', size: '2.400 m²', location: 'Hohenems', year: '2024', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=85&w=1000' },
  { name: 'Gewerbehof Dornbirn', size: '3.800 m²', location: 'Dornbirn', year: '2023', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=85&w=1000' },
  { name: 'Villa Alpine', size: '450 m²', location: 'Lech', year: '2023', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=85&w=1000' },
  { name: 'Sanierung Rathaus', size: '1.200 m²', location: 'Feldkirch', year: '2022', image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=85&w=1000' },
  { name: 'Industriehalle Rheintal', size: '5.500 m²', location: 'Lustenau', year: '2022', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=85&w=1000' },
];

export default function Home() {
  const { t } = useLang();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal-up').forEach((el) => {
        gsap.fromTo(el, 
          { y: 50, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (index: number) => {
    if (hoveredIndex !== null && hoveredIndex !== index) {
      setPrevIndex(hoveredIndex);
    }
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setPrevIndex(hoveredIndex);
    setHoveredIndex(null);
  };

  return (
    <div>
      {/* ===== HERO WITH SLIDESHOW ===== */}
      <Hero />

      {/* ===== OUR AGENCY (Archidomo intro block) ===== */}
      <OurAgency />

      {/* ===== SKETCH vs REALITY ===== */}
      <section className="py-24 md:py-32 bg-white">
        <div className="px-6 md:px-10">
          <div className="reveal-up mb-16">
            <span className="section-label text-[#888] mb-3 block">{t('sketch_title')}</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#111]">{t('sketch_subtitle')} <span className="italic">{t('sketch_subtitle_italic')}</span></h2>
          </div>
          <div className="reveal-up grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="image-reveal">
              <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=85&w=900" alt="" className="w-full aspect-[4/3] object-cover" />
              <p className="font-mono text-xs text-[#888] mt-3 uppercase tracking-wider">{t('sketch_label_1')}</p>
            </div>
            <div className="image-reveal">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=85&w=900" alt="" className="w-full aspect-[4/3] object-cover" />
              <p className="font-mono text-xs text-[#888] mt-3 uppercase tracking-wider">{t('sketch_label_2')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PROJECTS ===== */}
      <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--cream)' }}>
        <div className="px-6 md:px-10">
          <div className="reveal-up mb-16">
            <span className="section-label text-[#888] mb-3 block">{t('projects_title')}</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#111]">Ausgewählte <span className="italic">Projekte</span></h2>
          </div>
          <div className="space-y-28">
            {featured.map((p, i) => (
              <div key={p.name} className={`reveal-up grid grid-cols-1 ${i % 2 === 0 ? 'md:grid-cols-[1fr_1.5fr]' : 'md:grid-cols-[1.5fr_1fr]'} gap-8 md:gap-16 items-start`}>
                <div className={i % 2 !== 0 ? 'md:order-2' : ''}>
                  <h3 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#111] mb-4">{p.name}</h3>
                  <div className="flex gap-4 mb-6 flex-wrap">
                    <span className="project-tag text-[#888]">[ {p.size} ]</span>
                    <span className="project-tag text-[#888]">[ {p.location} ]</span>
                    <span className="project-tag text-[#888]">[ {p.year} ]</span>
                  </div>
                  <Link to="/realisations" className="btn-outline text-[#111] inline-flex"><span>{t('project_btn')}</span><ArrowUpRight size={14} /></Link>
                </div>
                <div className={`image-reveal ${i % 2 !== 0 ? 'md:order-1' : ''}`}>
                  <img src={p.image} alt={p.name} className="w-full aspect-[4/3] object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ANIMATED PROJECT LIST ===== */}
      <section className="py-20 md:py-28 bg-white">
        <div className="px-6 md:px-10 max-w-5xl mx-auto">
          <div className="reveal-up mb-12">
            <span className="section-label text-[#888] mb-3 block">{t('projects_title')}</span>
            <h2 className="font-display text-4xl md:text-5xl text-[#111] mb-4">{t('projects_overview')}</h2>
            <p className="font-body text-sm text-[#888] max-w-lg">{t('projects_overview_desc')}</p>
          </div>
          {/* Tablo başlığı */}
          <div className="hidden md:grid grid-cols-[1fr_120px_160px_40px] gap-4 pb-3 border-b border-[#e5e0d8]">
            <span className="font-mono text-xs text-[#aaa] uppercase tracking-wider">{t('projects_title')}</span>
            <span className="font-mono text-xs text-[#aaa] uppercase tracking-wider text-right">m²</span>
            <span className="font-mono text-xs text-[#aaa] uppercase tracking-wider text-right">Ort</span>
            <span></span>
          </div>
          
          <div ref={listRef} className="reveal-up divide-y divide-[#e5e0d8]">
            {projects.map((p, i) => (
              <Link
                key={p.name}
                to="/realisations"
                className="project-list-item group grid grid-cols-1 md:grid-cols-[1fr_120px_160px_40px] gap-4 items-center py-5 px-4 -mx-4"
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={handleMouseLeave}
                data-direction={prevIndex !== null && hoveredIndex === null && prevIndex === i ? 'exit' : ''}
              >
                <div className="item-content truncate">
                  <span className="font-display text-xl md:text-2xl">{p.name}</span>
                </div>
                <span className="item-meta font-mono text-xs text-[#888] text-right hidden md:block">{p.size}</span>
                <span className="item-meta font-mono text-xs text-[#888] text-right uppercase hidden md:block">{p.location}</span>
                <div className="text-right">
                  <ArrowUpRight size={16} className="item-arrow text-[#999] inline-block" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INSPIRATION / LA VISION (Archidomo big-statement + galleries) ===== */}
      <Inspiration />

      {/* ===== STATS ===== */}
      <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--cream)' }}>
        <div className="px-6 md:px-10">
          <div className="reveal-up grid grid-cols-2 md:grid-cols-4 gap-12">
            {[{ num: '25+', label: 'Jahre Erfahrung' }, { num: '480+', label: 'Projekte realisiert' }, { num: '65', label: 'Mitarbeiter' }, { num: '100%', label: 'Zufriedenheit' }].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-4xl md:text-5xl lg:text-6xl text-[#111] mb-2">{s.num}</div>
                <div className="font-mono text-xs text-[#888] uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== QUOTE ===== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="px-6 md:px-10 max-w-3xl mx-auto text-center">
          <p className="reveal-up font-display text-2xl md:text-3xl lg:text-4xl text-[#111] italic leading-[1.3]">"{t('footer_tagline')}"</p>
        </div>
      </section>

      {/* ===== PARTNERS ===== */}
      <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--cream)' }}>
        <div className="px-6 md:px-10">
          <div className="reveal-up mb-12">
            <span className="section-label text-[#888] mb-3 block">{t('partner_title')}</span>
            <h2 className="font-display text-3xl md:text-4xl text-[#111]">{t('partner_subtitle')} <span className="italic">{t('partner_subtitle_italic')}</span></h2>
          </div>
          <div className="reveal-up grid grid-cols-3 md:grid-cols-5 gap-3">
            {['Liebherr', 'Wirtgen', 'Vögele', 'Hamm', 'Kleemann', 'Atlas Copco', 'Bosch', 'Makita', 'Hilti', 'Siemens', 'Schüco', 'Jung', 'Gira', 'Geberit', 'Hansgrohe'].map((p) => (
              <div key={p} className="flex items-center justify-center p-4 border border-[#e5e0d8] bg-white hover:border-[#1a1a1a] transition-colors">
                <span className="font-mono text-xs text-[#888] uppercase tracking-wider">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
