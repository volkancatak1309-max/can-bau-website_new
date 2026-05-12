import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LanguageContext';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
}

const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'Wohnanlage Sonnenhof erfolgreich übergeben',
    date: '15. März 2024',
    category: 'Projekt',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=85&w=600',
    excerpt: 'Nach 18 Monaten Bauzeit wurde die Wohnanlage Sonnenhof in Hohenems feierlich an die Eigentümer übergeben.',
  },
  {
    id: '2',
    title: 'CAN BAU auf der Bau-Messe Dornbirn',
    date: '28. Februar 2024',
    category: 'Messe',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=85&w=600',
    excerpt: 'Besuchen Sie uns am Stand 47 auf der Bau-Messe Dornbirn vom 15.-17. März 2024.',
  },
  {
    id: '3',
    title: 'Neue Partnerschaft mit Liebherr',
    date: '10. Januar 2024',
    category: 'Partnerschaft',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=85&w=600',
    excerpt: 'CAN BAU freut sich über die neue strategische Partnerschaft mit Liebherr für Baumaschinen.',
  },
  {
    id: '4',
    title: 'Gewerbehof Dornbirn: Baustart im Frühling',
    date: '5. Dezember 2023',
    category: 'Projekt',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=85&w=600',
    excerpt: 'Der Neubau des Gewerbehofs in Dornbirn startet im Frühling 2024 mit einer Gesamtfläche von 3.800 m².',
  },
  {
    id: '5',
    title: '25 Jahre CAN BAU GmbH',
    date: '20. November 2023',
    category: 'Jubiläum',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=85&w=600',
    excerpt: 'Seit 25 Jahren bauen wir mit Leidenschaft und Präzision in Vorarlberg. Ein Rückblick auf ein Vierteljahrhundert.',
  },
  {
    id: '6',
    title: 'Villa Alpine in Lech fertiggestellt',
    date: '3. Oktober 2023',
    category: 'Projekt',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=85&w=600',
    excerpt: 'Die exklusive Villa Alpine in Lech wurde erfolgreich fertiggestellt und übergeben.',
  },
];

export default function News() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = document.querySelectorAll('.news-animate');
      elements.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
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
    <section ref={sectionRef} className="min-h-screen bg-white">
      <div className="px-6 md:px-10 py-16 md:py-24">
        {/* Header */}
        <div className="news-animate mb-16">
          <span className="section-label text-[#888] mb-4 block">{t('news_title')}</span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-[#111]">
            {t('news_title')}
          </h2>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="news-animate group cursor-pointer"
            >
              <div className="image-reveal mb-4 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-4 mb-2">
                <span className="font-mono text-[0.6rem] text-[#C8A45C] uppercase tracking-wider">
                  {item.category}
                </span>
                <span className="font-mono text-[0.6rem] text-[#aaa]">{item.date}</span>
              </div>
              <h3 className="font-display text-xl md:text-2xl text-[#111] mb-2 group-hover:text-[#C8A45C] transition-colors">
                {item.title}
              </h3>
              <p className="font-body text-sm text-[#555] leading-relaxed mb-4">
                {item.excerpt}
              </p>
              <span className="font-mono text-xs text-[#888] group-hover:text-[#111] transition-colors inline-flex items-center gap-1">
                {t('read_more')}
                <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
