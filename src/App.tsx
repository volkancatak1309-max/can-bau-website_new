import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import Agence from './pages/Agence';
import Realisations from './pages/Realisations';
import Immersion from './pages/Immersion';
import Contact from './pages/Contact';
import News from './pages/News';

gsap.registerPlugin(ScrollTrigger);

function AppContent() {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        window.scrollTo(0, 0);
        setIsTransitioning(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [location, displayLocation]);

  return (
    <>
      <PageTransition isActive={isTransitioning} />
      <Layout>
        <Routes location={displayLocation}>
          <Route path="/" element={<Home />} />
          <Route path="/agence" element={<Agence />} />
          <Route path="/realisations" element={<Realisations />} />
          <Route path="/immersion" element={<Immersion />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/actualites" element={<News />} />
        </Routes>
      </Layout>
    </>
  );
}

function App() {
  return (
    <HashRouter>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </HashRouter>
  );
}

export default App;
