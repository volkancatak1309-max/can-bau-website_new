interface PageTransitionProps {
  isActive: boolean;
}

export default function PageTransition({ isActive }: PageTransitionProps) {
  return (
    <div
      className={`fixed inset-0 z-[100] bg-white transition-opacity duration-400 ease-in-out pointer-events-none ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ transitionDuration: '400ms' }}
    />
  );
}
