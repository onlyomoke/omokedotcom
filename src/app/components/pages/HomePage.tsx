// src/app/components/pages/HomePage.tsx
import { HeroSection } from '../HeroSection';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const navigate = useNavigate();

  const scrollToFilms = () => {
    navigate('/films');
    const filmsElement = document.getElementById('films');
    if (filmsElement) {
      filmsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    navigate('/about');
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
    </>
  );
}