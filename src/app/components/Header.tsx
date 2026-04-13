import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home', path: '/' },

    { id: 'about', label: 'About Me', path: '/about' },
    { id: 'contact', label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark-walnut/95 backdrop-blur-sm shadow-lg' : 'bg-ebony/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo/Name */}
        <Link
          to="/"
          className="font-garamond text-2xl tracking-wider text-khaki-beige hover:text-camel transition-colors duration-300"
        >
          Omoke Ogao
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.path}
              className={`font-sans relative text-base transition-colors duration-300 ${
                isActive(link.path)
                  ? 'text-camel'
                  : 'text-dry-sage hover:text-camel'
              }`}
            >
              {link.label}
              {isActive(link.path) && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-camel"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}