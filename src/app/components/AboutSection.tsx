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
    <section id="about" className="min-h-screen py-24 px-6 bg-[#414833]">
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
                src="https://images.unsplash.com/photo-1674507738101-b4dbe86beea7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMGRpcmVjdG9yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc0OTYwOTM0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Omoke Ogao"
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.85) contrast(1.1)' }}
              />
              {/* Border accent */}
              <div className="absolute inset-0 border-4 border-[#7f4f24] rounded-lg pointer-events-none" />
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
              <h2
                className="text-5xl md:text-6xl text-[#b6ad90] mb-6"
                style={{ fontFamily: 'New York, Georgia, serif', fontWeight: 700 }}
              >
                About Me
              </h2>
              <div className="space-y-4 text-[#b6ad90] text-lg leading-relaxed">
                <p style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
                  I'm Omoke Ogao, a professional videographer specializing in cinematic storytelling 
                  that captures the authentic moments that matter most. With over a decade of experience 
                  behind the camera, I've had the privilege of documenting weddings, creating compelling 
                  commercials, and producing music videos that resonate with audiences worldwide.
                </p>
                <p style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
                  My approach is rooted in understanding the unique narrative of each project. Whether 
                  it's the intimate emotions of a wedding day, the bold vision of a brand campaign, or 
                  the artistic expression of a music video, I believe in crafting visual stories that 
                  are both timeless and impactful.
                </p>
                <p style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
                  I draw inspiration from classic cinema and modern visual aesthetics, always striving 
                  to push creative boundaries while maintaining the authenticity that makes each story 
                  truly memorable.
                </p>
              </div>
            </div>

            {/* Contact Email */}
            <div className="border-t border-[#656d4a] pt-8">
              <p
                className="text-sm uppercase tracking-wider text-[#a4ac86] mb-3"
                style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}
              >
                Get In Touch
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <a
                  href="mailto:onlyomoke@gmail.com"
                  className="text-[#b6ad90] hover:text-[#a68a64] transition-colors text-lg"
                  style={{ fontFamily: 'Menlo, Monaco, monospace' }}
                >
                  onlyomoke@gmail.com
                </a>
                <button
                  onClick={copyEmail}
                  className="px-4 py-2 border-2 border-[#a68a64] text-[#a68a64] hover:bg-[#a68a64] hover:text-[#582f0e] rounded transition-all duration-300 flex items-center gap-2"
                  style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}
                >
                  <Copy className="w-4 h-4" />
                  Copy Email
                </button>
              </div>
            </div>

            {/* Press Section */}
            <div className="border-t border-[#656d4a] pt-8">
              <h3
                className="text-2xl text-[#b6ad90] mb-6"
                style={{ fontFamily: 'New York, Georgia, serif', fontWeight: 600 }}
              >
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
                    className="flex items-start gap-3 p-4 bg-[#333d29] hover:bg-[#582f0e] rounded-lg transition-colors duration-300 group"
                  >
                    <div className="flex-1">
                      <p
                        className="text-[#c2c5aa] group-hover:text-[#b6ad90] transition-colors mb-1"
                        style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif', fontWeight: 500 }}
                      >
                        {article.title}
                      </p>
                      <p
                        className="text-sm text-[#a4ac86]"
                        style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}
                      >
                        {article.publication}
                      </p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-[#a68a64] flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
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