import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { useLang } from '../context/LanguageContext';

const heroImages = [
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=90&w=2000',
  'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=90&w=2000',
  'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=90&w=2000',
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=90&w=2000',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=90&w=2000',
  'https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?auto=format&fit=crop&q=90&w=2000',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=90&w=2000',
  'https://images.unsplash.com/photo-1600573472556-e636c2acda88?auto=format&fit=crop&q=90&w=2000',
];

const DURATION = 1.2;
const EASE = 'power2.inOut';
const AUTOPLAY = 5000;

export default function Hero() {
  const { t } = useLang();
  const [counter, setCounter] = useState(0);
  
  const animatingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  
  // Büyük görsel ref'leri
  const bigA = useRef<HTMLDivElement>(null);
  const bigB = useRef<HTMLDivElement>(null);
  const bigAImg = useRef<HTMLImageElement>(null);
  const bigBImg = useRef<HTMLImageElement>(null);
  
  // Thumb ref'leri
  const thumbA = useRef<HTMLDivElement>(null);
  const thumbB = useRef<HTMLDivElement>(null);
  const thumbAImg = useRef<HTMLImageElement>(null);
  const thumbBImg = useRef<HTMLImageElement>(null);
  
  const isAActive = useRef(true);
  const idxRef = useRef(0);

  // Görsel yükleme helper (robust, direct assignment)
  const loadImage = (img: HTMLImageElement | null, src: string) => {
    if (!img) return;
    if (img.src === src) return;
    img.src = src;
  };

  // Slayt fonksiyonu — büyük yukarı kayıp gider (reveal), thumb sabit kalır
  const slide = useCallback(() => {
    if (animatingRef.current) return;
    animatingRef.current = true;

    const newIdx = (idxRef.current + 1) % heroImages.length;

    const visibleBig = isAActive.current ? bigA.current : bigB.current;
    const hiddenBig = isAActive.current ? bigB.current : bigA.current;
    const hiddenBigImg = isAActive.current ? bigBImg.current : bigAImg.current;
    // Thumb sabit kalır — her zaman thumbA görünür, içeriği update edilir
    const visibleThumbImg = thumbAImg.current;

    if (!visibleBig || !hiddenBig) {
      idxRef.current = newIdx;
      setCounter(newIdx);
      animatingRef.current = false;
      return;
    }

    // Hidden big'e thumb'da görünen görseli yükle (yeni büyük = mevcut thumb)
    loadImage(hiddenBigImg, heroImages[newIdx]);
    // Visible thumb'a bir sonraki görseli yükle (sıradaki büyük olacak)
    loadImage(visibleThumbImg, heroImages[(newIdx + 1) % heroImages.length]);

    // Hidden big'i anında visible big'in tam altına yerleştir
    gsap.set(hiddenBig, { yPercent: 0 });

    // Sadece visible big yukarı kayıp gider, alttaki yeni big açığa çıkar
    const tl = gsap.timeline({
      onComplete: () => {
        // Eski visible big'i bekleme pozisyonuna geri at (sıradaki slide için hazır)
        gsap.set(visibleBig, { yPercent: 100 });
        isAActive.current = !isAActive.current;
        idxRef.current = newIdx;
        setCounter(newIdx);
        animatingRef.current = false;
      }
    });

    tl.to(visibleBig, { yPercent: -100, duration: DURATION, ease: EASE }, 0);

  }, []);

  // Tıklama
  const handleClick = useCallback(() => {
    if (animatingRef.current) return;
    if (timerRef.current) clearInterval(timerRef.current);
    slide();
    timerRef.current = setInterval(slide, AUTOPLAY);
  }, [slide]);

  // Autoplay - sadece 1 kez
  useEffect(() => {
    timerRef.current = setInterval(slide, AUTOPLAY);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [slide]);

  // Tüm görselleri mount'ta preload et (cache'e al)
  useEffect(() => {
    heroImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // İlk yükleme
  useEffect(() => {
    loadImage(bigAImg.current, heroImages[0]);
    loadImage(bigBImg.current, heroImages[1]);
    loadImage(thumbAImg.current, heroImages[1]);
    loadImage(thumbBImg.current, heroImages[2]);

    gsap.set(bigA.current, { yPercent: 0 });
    gsap.set(bigB.current, { yPercent: 100 });
    gsap.set(thumbA.current, { yPercent: 0 });
    gsap.set(thumbB.current, { yPercent: 100 });
  }, []);

  // Text animasyonu
  const textRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.fromTo(textRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.5 }
    );
  }, []);

  // SplitText hero title animation (A2)
  const titleRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (!titleRef.current) return;
    const split = new SplitType(titleRef.current, { types: 'chars' });
    gsap.from(split.chars, {
      opacity: 0,
      y: 40,
      rotateX: -45,
      stagger: 0.03,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.3,
    });
    return () => { split.revert(); };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden" style={{ marginTop: 'calc(-13vw - 50px)' }}>
      
      {/* BÜYÜK GÖRSEL - 2 container, tam üst üste */}
      <div className="absolute inset-0 overflow-hidden">
        <div ref={bigA} className="absolute inset-0 will-change-transform">
          <img ref={bigAImg} alt="" className="w-full h-full object-cover" />
        </div>
        <div ref={bigB} className="absolute inset-0 will-change-transform">
          <img ref={bigBImg} alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/20 z-[20] pointer-events-none" />

      {/* THUMB - Sağ altta, TEK label, container'lar tam üst üste */}
      <div className="absolute bottom-28 right-10 z-[25] hidden md:block" style={{ width: '280px', height: '210px' }}>
        <button 
          onClick={handleClick}
          className="relative w-full h-full group cursor-pointer border-2 border-white/40 hover:border-white transition-colors duration-300 overflow-hidden"
        >
          {/* Container'lar - hepsi absolute inset-0, tam üst üste */}
          <div ref={thumbA} className="absolute inset-0 will-change-transform">
            <img ref={thumbAImg} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div ref={thumbB} className="absolute inset-0 will-change-transform">
            <img ref={thumbBImg} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          
          {/* LABEL - SADECE BİR KEZ, container'ların ÜZERİNDE */}
          <span className="absolute bottom-2 right-2 font-mono text-[0.65rem] text-white/70 uppercase bg-black/30 px-2 py-1 z-10 pointer-events-none">
            Nächstes →
          </span>
        </button>
      </div>

      {/* METİN */}
      <div className="absolute bottom-0 left-0 right-0 z-[30] p-6 md:p-10 pointer-events-none">
        <div ref={textRef} className="max-w-lg pointer-events-auto">
          <p ref={titleRef} className="font-body text-lg md:text-xl text-white leading-relaxed drop-shadow-lg">
            {t('hero_text')}
          </p>
        </div>
      </div>

      {/* COUNTER */}
      <div className="absolute bottom-6 left-6 md:left-10 z-[30]">
        <span className="font-mono text-xs text-white/60">
          {String(counter + 1).padStart(2, '0')} / {String(heroImages.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}
