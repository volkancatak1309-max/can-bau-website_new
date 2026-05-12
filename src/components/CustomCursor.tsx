import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  const mouse = useRef({ x: 0, y: 0 });
  const outerPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>();

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) {
      setHidden(true);
      return;
    }

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!outerRef.current) return;
      if (target.closest('a, button')) outerRef.current.classList.add('cursor-hover');
      if (target.closest('[data-cursor="view"]')) outerRef.current.classList.add('cursor-view');
    };

    const onOut = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!outerRef.current) return;
      if (target.closest('a, button')) outerRef.current.classList.remove('cursor-hover');
      if (target.closest('[data-cursor="view"]')) outerRef.current.classList.remove('cursor-view');
    };

    const animate = () => {
      outerPos.current.x += (mouse.current.x - outerPos.current.x) * 0.15;
      outerPos.current.y += (mouse.current.y - outerPos.current.y) * 0.15;

      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${mouse.current.x - 3}px, ${mouse.current.y - 3}px, 0)`;
      }
      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${outerPos.current.x - 16}px, ${outerPos.current.y - 16}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      <div ref={outerRef} className="custom-cursor-outer" aria-hidden="true">
        <span className="cursor-label">VIEW</span>
      </div>
      <div ref={innerRef} className="custom-cursor-inner" aria-hidden="true" />
    </>
  );
}
