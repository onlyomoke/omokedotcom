import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onScrollDown: () => void;
}

export function HeroSection({ onScrollDown }: HeroSectionProps) {
  const heroImages = [
    'https://images.unsplash.com/photo-1759882608520-8c4f8cd40f8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB2aWRlb2dyYXBoZXIlMjBjYW1lcmF8ZW58MXx8fHwxNzc0OTYwOTMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1638961837480-5aee8a8f90cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBmaWxtJTIwcHJvZHVjdGlvbnxlbnwxfHx8fDE3NzQ5NjA5MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1769699167687-540cce99f744?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBjYW1lcmElMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzc0ODYxMjM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1683164700391-aaba7cf89049?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwZmlsbSUyMHNldHxlbnwxfHx8fDE3NzQ5NjA5MzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1660815365188-21a5eff8fdb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBsYW5kc2NhcGUlMjBnb2xkZW58ZW58MXx8fHwxNzc0OTYwOTM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1674124504779-62197c204390?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHZpZGVvJTIwcHJvZHVjdGlvbnxlbnwxfHx8fDE3NzQ5MjA2NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  ];

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Image Grid */}
      <div className="grid grid-cols-3 gap-0 h-full">
        {heroImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: index * 0.1 }}
            className="relative overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${image})`,
                filter: 'brightness(0.7) contrast(1.1)',
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Overlay with Title */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-walnut/40 via-transparent to-dark-walnut/80 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center px-6"
        >
          <h1 className="font-serif text-7xl md:text-8xl mb-4 text-khaki-beige tracking-tight font-heavy">
            Cinematic
            <br />
            Storytelling
          </h1>
          <p className="font-sans text-xl md:text-2xl text-dry-sage-light mt-6 font-medium">
            Professional Videography by Omoke Ogao
          </p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={onScrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-khaki-beige hover:text-camel transition-colors cursor-pointer group"
      >
        <span className="font-sans text-sm tracking-wider uppercase font-medium">
          Explore Work
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="group-hover:text-camel transition-colors"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  );
}