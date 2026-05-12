import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useLang } from '../context/LanguageContext';

const heroImages = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=85&w=1600',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=85&w=1600',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=85&w=1600',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=85&w=1600',
  'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=85&w=1600',
  'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=85&w=1600',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=85&w=1600',
  'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&q=85&w=1600',
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

  // Görsel yükleme helper
  const loadImage = (img: HTMLImageElement | null, src: string) => {
    if (!img) return;
    const temp = new Image();
    temp.onload = () => { img.src = src; };
    temp.src = src;
  };

  // Slayt fonksiyonu
  const slide = useCallback(() => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    
    const newIdx = (idxRef.current + 1) % heroImages.length;
    
    const visibleBig = isAActive.current ? bigA.current : bigB.current;
    const hiddenBig = isAActive.current ? bigB.current : bigA.current;
    const visibleThumb = isAActive.current ? thumbA.current : thumbB.current;
    const hiddenThumb = isAActive.current ? thumbB.current : thumbA.current;
    const hiddenBigImg = isAActive.current ? bigBImg.current : bigAImg.current;
    const hiddenThumbImg = isAActive.current ? thumbBImg.current : thumbAImg.current;
    
    if (!visibleBig || !hiddenBig || !visibleThumb || !hiddenThumb) {
      idxRef.current = newIdx;
      setCounter(newIdx);
      animatingRef.current = false;
      return;
    }
    
    // Görseli önceden yükle
    loadImage(hiddenBigImg, heroImages[newIdx]);
    loadImage(hiddenThumbImg, heroImages[(newIdx + 1) % heroImages.length]);
    
    // GSAP animasyon
    const tl = gsap.timeline({
      onComplete: () => {
        isAActive.current = !isAActive.current;
        idxRef.current = newIdx;
        setCounter(newIdx);
        animatingRef.current = false;
      }
    });
    
    tl.to(hiddenBig, { yPercent: 0, duration: DURATION, ease: EASE }, 0)
      .to(hiddenThumb, { yPercent: 0, duration: DURATION, ease: EASE }, 0)
      .to(visibleBig, { yPercent: -100, duration: DURATION, ease: EASE }, 0)
      .to(visibleThumb, { yPercent: -100, duration: DURATION, ease: EASE }, 0);
      
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
          <p className="font-body text-lg md:text-xl text-white leading-relaxed drop-shadow-lg">
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
