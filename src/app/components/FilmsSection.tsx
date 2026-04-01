import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Masonry from 'react-responsive-masonry';
import { Play, X } from 'lucide-react';

interface Film {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  youtubeId: string;
}

const films: Film[] = [
  {
    id: 1,
    title: 'Love Stories',
    category: 'Wedding',
    thumbnail: 'https://images.unsplash.com/photo-1768777271060-4b76e9ebf582?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdmlkZW9ncmFwaHl8ZW58MXx8fHwxNzc0OTIwNjQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    youtubeId: 'dQw4w9WgXcQ',
  },
  {
    id: 2,
    title: 'Urban Rhythm',
    category: 'Music Video',
    thumbnail: 'https://images.unsplash.com/photo-1674124504779-62197c204390?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHZpZGVvJTIwcHJvZHVjdGlvbnxlbnwxfHx8fDE3NzQ5MjA2NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    youtubeId: 'dQw4w9WgXcQ',
  },
  {
    id: 3,
    title: 'Brand Vision',
    category: 'Commercial',
    thumbnail: 'https://images.unsplash.com/photo-1683164700391-aaba7cf89049?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwZmlsbSUyMHNldHxlbnwxfHx8fDE3NzQ5NjA5MzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    youtubeId: 'dQw4w9WgXcQ',
  },
  {
    id: 4,
    title: 'Behind the Lens',
    category: 'Documentary',
    thumbnail: 'https://images.unsplash.com/photo-1645048984874-f8078b0467e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N1bWVudGFyeSUyMGZpbG1tYWtlcnxlbnwxfHx8fDE3NzQ5NjA5MzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    youtubeId: 'dQw4w9WgXcQ',
  },
  {
    id: 5,
    title: 'Golden Hour',
    category: 'Narrative',
    thumbnail: 'https://images.unsplash.com/photo-1660815365188-21a5eff8fdb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBsYW5kc2NhcGUlMjBnb2xkZW58ZW58MXx8fHwxNzc0OTYwOTM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    youtubeId: 'dQw4w9WgXcQ',
  },
  {
    id: 6,
    title: 'Production Diary',
    category: 'Commercial',
    thumbnail: 'https://images.unsplash.com/photo-1638961837480-5aee8a8f90cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBmaWxtJTIwcHJvZHVjdGlvbnxlbnwxfHx8fDE3NzQ5NjA5MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    youtubeId: 'dQw4w9WgXcQ',
  },
];

export function FilmsSection() {
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);

  return (
    <section id="films" className="min-h-screen py-24 px-6 bg-charcoal-brown">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-serif text-5xl md:text-6xl text-khaki-beige mb-4 font-bold">
            Featured Films
          </h2>
          <p className="font-sans text-lg text-dry-sage-light font-normal">
            A curated selection of cinematic work
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <Masonry columnsCount={3} gutter="1.5rem">
          {films.map((film, index) => (
            <motion.div
              key={film.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedFilm(film)}
            >
              <div className="relative overflow-hidden rounded-lg bg-ebony">
                {/* Thumbnail */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={film.thumbnail}
                    alt={film.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-walnut/90 via-dark-walnut/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-saddle-brown flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      <Play className="w-8 h-8 text-dry-sage ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>

                {/* Metadata */}
                <div className="p-4">
                  <p className="font-sans text-xs uppercase tracking-wider text-dry-sage-light mb-1 font-medium">
                    {film.category}
                  </p>
                  <h3 className="font-sans text-xl text-dry-sage font-medium">
                    {film.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </Masonry>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedFilm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-dark-walnut/95 backdrop-blur-sm"
            onClick={() => setSelectedFilm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative w-full max-w-5xl bg-ebony rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedFilm(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-dark-walnut text-khaki-beige hover:bg-saddle-brown transition-colors flex items-center justify-center"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Video Embed */}
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedFilm.youtubeId}?autoplay=1`}
                  title={selectedFilm.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              {/* Video Info */}
              <div className="p-6">
                <p className="font-sans text-sm uppercase tracking-wider text-dry-sage-light mb-2 font-medium">
                  {selectedFilm.category}
                </p>
                <h3 className="font-serif text-3xl text-khaki-beige font-semibold">
                  {selectedFilm.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}