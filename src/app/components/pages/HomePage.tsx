// src/app/components/pages/HomePage.tsx
import { HeroSection } from '../HeroSection';
import { AboutSection } from '../AboutSection';
import { ContactSection } from '../ContactSection';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const navigate = useNavigate();

  const scrollToFilms = () => {
    const filmsElement = document.getElementById('films');
    if (filmsElement) {
      filmsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const aboutElement = document.getElementById('about');
    if (aboutElement) {
      aboutElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <HeroSection 
        onNavigateToFilms={scrollToFilms}
        onNavigateToAbout={scrollToAbout}
      />
      <AboutSection />
      <ContactSection />
    </>
  );
}