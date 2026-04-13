// src/app/components/HeroSection.tsx
import { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import { ChevronLeft, ChevronRight, X, Film, User, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroSectionProps {
  onNavigateToFilms: () => void;
  onNavigateToAbout: () => void;
}

// YouTube video data for the carousel
const carouselVideos = [
  { id: 'DGmjwTqg_C0' },
  { id: 'dj_zUJNv_zc' },
  { id: 'EojQfbRj4aM' },
  { id: 'T6FZF_VMu3o' },
  { id: '-JN_2J8QxS8' },
  { id: '3GbxFCREyvg' },
  { id: '0GosIu8vDcY' },
  { id: 'rPYEdhK4OtU' },
  { id: 'rkRnOf1s7-o' }
];

// Define image sets for each container with title and artist
const imageSets = [
  {
    title: 'CONQUER',
    artist: 'Elsy Wameyo ft Ywaya Tajiri',
    youtubeId: '3GbxFCREyvg',
    images: [
      'conquer1.png',
      'conquer2.png',
      'conquer3.png',
      'conquer4.png',
      'conquer5.png',
      'conquer6.png',
      'conquer7.png',
      'conquer8.png',
    ]
  },
  {
    title: 'I WANT YOU',
    artist: 'Bien',
    youtubeId: 'rkRnOf1s7-o',
    images: [
      'iwantyou1.png',
      'iwantyou2.png',
      'iwantyou3.png',
      'iwantyou4.png',
      'iwantyou5.png',
      'iwantyou6.png',
      'iwantyou7.png',
      'iwantyou8.png',
      'iwantyou9.png',
      'iwantyou10.png',
      'iwantyou11.png',
      'iwantyou12.png',
      'iwantyou13.png',
      'iwantyou14.png',
      'iwantyou15.png',
      'iwantyou16.png',
      'iwantyou17.png',
      'iwantyou18.png',
      'iwantyou19.png',
    ]
  },
  {
    title: 'LOWKEY',
    artist: 'Toxic Lyrikali',
    youtubeId: 'EojQfbRj4aM',
    images: [
      'lowkey1.png',
      'lowkey2.png',
      'lowkey3.png',
      'lowkey4.png',
    ]
  },
  {
    title: 'NALIA',
    artist: 'Maureen Kunga',
    youtubeId: 'T6FZF_VMu3o',
    images: [
      'nalia1.png',
      'nalia2.png',
      'nalia3.png',
      'nalia4.png',
      'nalia5.png',
      'nalia6.png',
      'nalia7.png',
      'nalia8.png',
      'nalia9.png',
      'nalia10.png',
    ]
  },
  {
    title: 'MiLELE',
    artist: 'Element Eleéeh',
    youtubeId: '_9EN_lUDYQA',
    images: [
      'rwanda1.png',
      'rwanda2.png',
      'rwanda3.png',
      'rwanda4.png',
      'rwanda5.png',
      'rwanda6.png',
      'rwanda7.png',
      'rwanda8.png',
      'rwanda9.png',
      'rwanda10.png',
    ]
  },
  {
    title: 'SIANDA',
    artist: 'Savara',
    youtubeId: 'uz1XXbkNWyU',
    images: [
      'sianda1.png',
      'sianda2.png',
      'sianda3.png',
      'sianda4.png',
      'sianda5.png',
      'sianda6.png',
      'sianda7.png',
    ]
  },
  {
    title: 'TOO EASY',
    artist: 'Bien',
    youtubeId: 'DGmjwTqg_C0',
    images: [
      'tooeasy1.png',
      'tooeasy2.png',
    ]
  },
  {
    title: 'UMVA',
    artist: 'Elsy Wameyo',
    youtubeId: '-JN_2J8QxS8',
    images: [
      'umva1.png',
      'umva2.png',
      'umva3.png',
      'umva4.png',
    ]
  }
];

// Helper function to get image URL
const getImageUrl = (filename: string) => {
  return `/images/${filename}`;
};

// Pre-fetch and cache video metadata (only titles, no years)
const metadataCache = new Map<string, string>();

const fetchVideoTitle = async (videoId: string): Promise<string> => {
  if (metadataCache.has(videoId)) {
    return metadataCache.get(videoId)!;
  }
  
  try {
    const response = await fetch(
      `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`
    );
    const data = await response.json();
    
    let title = data.title || 'Untitled';
    
    // Clean up title - remove year and common suffixes
    title = title.replace(/\s*[\(\[].*[\)\]]\s*$/, '').trim();
    title = title.replace(/\s*\|\s*(19|20)\d{2}\s*$/, '').trim();
    title = title.replace(/\s*[-–]\s*(19|20)\d{2}\s*$/, '').trim();
    
    metadataCache.set(videoId, title);
    return title;
  } catch (error) {
    console.error('Error fetching video title:', error);
    return 'Untitled';
  }
};

const preloadYouTubePlayer = (videoId: string) => {
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1&enablejsapi=1`;
  document.body.appendChild(iframe);
  
  setTimeout(() => {
    iframe.remove();
  }, 5000);
};

export function HeroSection({ onNavigateToFilms, onNavigateToAbout }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [videoTitles, setVideoTitles] = useState<Map<string, string>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [preloadedIndices, setPreloadedIndices] = useState<Set<number>>(new Set());
  const playerRefs = useRef<Map<string, any>>(new Map());
  
  const [selectedGridVideo, setSelectedGridVideo] = useState<{ url: string; title: string } | null>(null);
  
  // Initialize indices for each container safely
  const [currentImageIndices, setCurrentImageIndices] = useState<number[]>(() => 
    imageSets.map((imageSet) => Math.floor(Math.random() * imageSet.images.length))
  );

  useEffect(() => {
    const initializeCarousel = async () => {
      setIsLoading(true);
      
      // Fetch titles for all unique video IDs
      const allVideoIds = [...carouselVideos.map(v => v.id), ...imageSets.map(set => set.youtubeId)];
      const uniqueVideoIds = [...new Set(allVideoIds)];
      
      const titlePromises = uniqueVideoIds.map(videoId => fetchVideoTitle(videoId));
      const titleResults = await Promise.all(titlePromises);
      
      const titleMap = new Map();
      uniqueVideoIds.forEach((videoId, index) => {
        titleMap.set(videoId, titleResults[index]);
      });
      setVideoTitles(titleMap);
      
      const videosToPreload = carouselVideos.slice(0, 3);
      videosToPreload.forEach(video => {
        preloadYouTubePlayer(video.id);
      });
      
      setIsLoading(false);
    };
    
    initializeCarousel();
  }, []);

  // Auto-advance carousel every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselVideos.length);
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);

  // Auto-advance each grid container's image independently
  useEffect(() => {
    if (currentImageIndices.length !== imageSets.length) return;
    
    const intervals = imageSets.map((imageSet, containerIndex) => {
      const intervalTime = Math.random() * 3000 + 3000;
      
      return setInterval(() => {
        setCurrentImageIndices(prev => {
          const newIndices = [...prev];
          if (newIndices[containerIndex] !== undefined && imageSet.images.length > 0) {
            newIndices[containerIndex] = (newIndices[containerIndex] + 1) % imageSet.images.length;
          }
          return newIndices;
        });
      }, intervalTime);
    });

    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselVideos.length) % carouselVideos.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselVideos.length);
  };

  const openModal = (videoId: string) => {
    setSelectedVideo(videoId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  const openGridVideo = (youtubeId: string, title: string) => {
    setSelectedGridVideo({
      url: `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`,
      title: title
    });
  };

  const closeGridVideo = () => {
    setSelectedGridVideo(null);
  };

  const currentVideo = carouselVideos[currentIndex];
  const currentTitle = videoTitles.get(currentVideo.id) || 'Loading...';

  const playerOptions = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      mute: 1,
      loop: 1,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      playlist: currentVideo.id,
    },
  };

  const modalPlayerOptions = {
    ...playerOptions,
    playerVars: {
      ...playerOptions.playerVars,
      autoplay: 1,
      mute: 0,
      controls: 1,
    },
  };

  if (isLoading) {
    return (
      <div className="relative w-full min-h-screen bg-dark-walnut flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-camel border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-khaki-beige font-sans">Loading cinematic experience...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* YouTube Carousel Section */}
      <div className="relative w-full bg-dark-walnut py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative group">
            <div 
              className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl cursor-pointer bg-ebony"
              onClick={() => openModal(currentVideo.id)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentVideo.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <YouTube
                    videoId={currentVideo.id}
                    opts={playerOptions}
                    className="w-full h-full"
                    onReady={(event) => {
                      playerRefs.current.set(currentVideo.id, event.target);
                      event.target.playVideo();
                    }}
                  />
                </motion.div>
              </AnimatePresence>
              
              <div className="absolute inset-0 bg-gradient-to-t from-dark-walnut/60 via-transparent to-dark-walnut/30 pointer-events-none" />
              
              <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 rounded-full bg-camel/90 flex items-center justify-center transform transition-all duration-300"
                >
                  <Play className="w-10 h-10 text-dark-walnut ml-1" />
                </motion.div>
              </div>
            </div>

            {/* Title only - no year */}
            <div className="mt-6 text-center">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={`title-${currentVideo.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="font-sans text-xl md:text-2xl font-medium text-khaki-beige tracking-wide"
                >
                  {currentTitle}
                </motion.h3>
              </AnimatePresence>
            </div>

            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-dark-walnut/80 backdrop-blur-sm flex items-center justify-center text-khaki-beige hover:bg-camel/50 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-105"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-dark-walnut/80 backdrop-blur-sm flex items-center justify-center text-khaki-beige hover:bg-camel/50 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-105"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="flex justify-center gap-3 mt-8">
              {carouselVideos.map((video, index) => (
                <button
                  key={video.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-500 rounded-full ${
                    index === currentIndex
                      ? 'w-10 h-2 bg-camel'
                      : 'w-2 h-2 bg-khaki-beige/40 hover:bg-khaki-beige/60 hover:scale-110'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Image Grid Section - Two-layer titles */}
      <section className="relative w-full bg-dark-walnut">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-10 lg:gap-x-12 gap-y-32 md:gap-y-40 lg:gap-y-48">
            {imageSets.map((imageSet, containerIndex) => {
              const currentIndexValue = currentImageIndices[containerIndex];
              if (currentIndexValue === undefined || !imageSet.images[currentIndexValue]) {
                return null;
              }
              
              const currentImage = imageSet.images[currentIndexValue];
              
              return (
                <motion.div
                  key={`container-${containerIndex}`}
                  className="group cursor-pointer"
                  onClick={() => openGridVideo(imageSet.youtubeId, `${imageSet.title} - ${imageSet.artist}`)}
                >
                  <div className="relative w-full overflow-hidden rounded-lg bg-ebony shadow-lg">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={`${containerIndex}-${currentImage}`}
                        src={getImageUrl(currentImage)}
                        alt={imageSet.title}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </AnimatePresence>
                    
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                      <div className="w-16 h-16 rounded-full bg-camel/90 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <Play className="w-8 h-8 text-dark-walnut ml-1" />
                      </div>
                    </div>
                    
                    <div className="relative pt-[56.25%]" />
                  </div>
                  
                  {/* Two-layer titles - Video title and artist */}
                  <div className="mt-6">
                    <motion.h3 
                      key={`title-${containerIndex}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="font-sans text-xl md:text-xl lg:text-2xl font-medium text-khaki-beige tracking-wide mb-1"
                    >
                      {imageSet.title}
                    </motion.h3>
                    {imageSet.artist && (
                      <motion.p
                        key={`artist-${containerIndex}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="font-sans text-sm md:text-base text-dry-sage/80 tracking-wide"
                      >
                        {imageSet.artist}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal for Carousel Videos */}
      <AnimatePresence>
        {isModalOpen && selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 text-khaki-beige hover:text-camel transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <YouTube
                videoId={selectedVideo}
                opts={modalPlayerOptions}
                className="w-full h-full rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal for Grid Videos */}
      <AnimatePresence>
        {selectedGridVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
            onClick={closeGridVideo}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeGridVideo}
                className="absolute -top-12 right-0 text-khaki-beige hover:text-camel transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <iframe
                src={selectedGridVideo.url}
                title={selectedGridVideo.title}
                className="w-full h-full rounded-lg shadow-2xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}