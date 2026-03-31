import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FilmsSection } from './components/FilmsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'films', 'about', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFilms = () => {
    const filmsSection = document.getElementById('films');
    if (filmsSection) {
      filmsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#582f0e]">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#414833',
            color: '#c2c5aa',
            border: '1px solid #656d4a',
          },
        }}
      />
      
      <Header activeSection={activeSection} />
      <HeroSection onScrollDown={scrollToFilms} />
      <FilmsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
