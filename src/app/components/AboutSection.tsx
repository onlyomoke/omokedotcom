import { motion } from 'motion/react';
import { ExternalLink, Copy } from 'lucide-react';
import { toast } from 'sonner';

export function AboutSection() {
  const copyEmail = () => {
    navigator.clipboard.writeText('onlyomoke@gmail.com');
    toast.success('Email copied to clipboard!');
  };

  const pressArticles = [
    {
      title: 'Rising Videographer Captures Essence of Modern Storytelling',
      publication: 'Creative Review',
      url: '#',
    },
    {
      title: 'Behind the Lens: Omoke Ogao\'s Cinematic Journey',
      publication: 'Film & Video Magazine',
      url: '#',
    },
    {
      title: 'The Art of Visual Narrative in Digital Age',
      publication: 'Filmmaker Weekly',
      url: '#',
    },
  ];

  return (
    <section id="about" className="min-h-screen py-24 px-6 bg-ebony">
      <div className="max-w-7xl mx-auto">
        {/* Split Screen Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
              <img
                src="/public/images/profile.jpeg"
                alt="Omoke Ogao"
                className="w-full h-full object-cover brightness-[0.85] contrast-[1.1]"
              />
              {/* Border accent */}
              <div className="absolute inset-0 border-4 border-saddle-brown rounded-lg pointer-events-none" />
            </div>
          </motion.div>

          {/* Right: Biography */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-serif text-5xl md:text-6xl text-khaki-beige mb-6 font-bold">
                About 
              </h2>
              <div className="space-y-4 text-khaki-beige text-lg leading-relaxed">
                <p className="font-sans font-normal">
                  Omoke Ogao is a Kenyan creative whose work lives at the intersection of music, visual storytelling, culture, and identity. Based in Nairobi and London, he approaches creativity as world-building; crafting ideas, images, and experiences that feel emotionally honest, visually striking, and culturally alive. 


                </p>
                <p className="font-sans font-normal">
                  With a practice rooted in storytelling and visual world-building, he creates work that feels intentional, culturally grounded, and emotionally resonant. Drawing from both local texture and global influence, Omoke is part of a new generation of African creatives shaping how stories are seen, felt, and remembered.
                </p>
                
              </div>
            </div>

            {/* Contact Email */}
            <div className="border-t border-dusty-olive pt-8">
              <p className="font-sans text-sm uppercase tracking-wider text-dry-sage-light mb-3 font-medium">
                Get In Touch
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <a
                  href="mailto:onlyomoke@gmail.com"
                  className="font-mono text-khaki-beige hover:text-camel transition-colors text-lg"
                >
                  onlyomoke@gmail.com
                </a>
                <button
                  onClick={copyEmail}
                  className="font-sans px-4 py-2 border-2 border-camel text-camel hover:bg-camel hover:text-dark-walnut rounded transition-all duration-300 flex items-center gap-2 font-medium"
                >
                  <Copy className="w-4 h-4" />
                  Copy Email
                </button>
              </div>
            </div>

            {/* Press Section */}
            <div className="border-t border-dusty-olive pt-8">
              <h3 className="font-serif text-2xl text-khaki-beige mb-6 font-semibold">
                Featured In
              </h3>
              <div className="space-y-4">
                {pressArticles.map((article, index) => (
                  <motion.a
                    key={index}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-charcoal-brown hover:bg-dark-walnut rounded-lg transition-colors duration-300 group"
                  >
                    <div className="flex-1">
                      <p className="font-sans text-dry-sage group-hover:text-khaki-beige transition-colors mb-1 font-medium">
                        {article.title}
                      </p>
                      <p className="font-sans text-sm text-dry-sage-light font-normal">
                        {article.publication}
                      </p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-camel flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}