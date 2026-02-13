import { motion } from 'framer-motion';
import { Utensils, Camera, Music, Sparkles, Gamepad2, Mic, Gift, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

interface ExperienceGridProps {
  onViewItinerary: () => void;
  onViewMenu: () => void;
}

const experiences = [
  {
    icon: Utensils,
    title: '4 Course Gourmet Dinner',
    desc: 'Chef-curated Italian and French cuisine journey',
    gradient: 'from-[#8B0000] to-[#A00000]',
    image: '/images/fine-dining.jpeg',
    fallbackImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800',
    hasMenu: true
  },
  {
    icon: Mic,
    title: 'Stand Up Comedy & Poetry',
    desc: 'Embrace the masterful storytelling of International Poet & 2x NAMA Nominated Comedian Andrew Manyika',
    gradient: 'from-[#722F37] to-[#8B0000]',
    image: '/images/Andrew.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1527224538127-2104bb71c51b?q=80&w=800'
  },
  {
    icon: Camera,
    title: 'Red Carpet Experience',
    desc: "Lights, Camera, Action – dress to dazzle",
    gradient: 'from-[#B76E79] to-[#8B0000]',
    image: '/images/red-carpet.jpeg',
    fallbackImage: 'https://images.unsplash.com/photo-1607537002385-fe6f11ec19b8?q=80&w=800'
  },
  {
    icon: Music,
    title: 'Live Entertainment',
    desc: 'Dynamic Dancers, Poets and Musicians on stage',
    gradient: 'from-[#8B0000] to-[#B76E79]',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800',
    fallbackImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800'
  },
  {
    icon: Camera,
    title: 'Pro Photoshoot',
    desc: 'Awaken your inner cover model',
    gradient: 'from-[#8B0000] to-[#A00000]',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800',
    fallbackImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800'
  },
  {
    icon: Gamepad2,
    title: 'Party Games',
    desc: 'Fun ice-breaker activities from our MC',
    gradient: 'from-[#A00000] to-[#722F37]',
    image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=800',
    fallbackImage: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=800'
  },
  {
    icon: Mic,
    title: 'Karaoke',
    desc: 'Take the stage and let your voice shine',
    gradient: 'from-[#B76E79] to-[#8B0000]',
    image: '/images/karaoke.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=800'
  },
  {
    icon: Gift,
    title: 'Complementary Gifts',
    desc: 'Courtesy of our partners and hosts',
    gradient: 'from-[#722F37] to-[#8B0000]',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800',
    fallbackImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800'
  },
  {
    icon: Sparkles,
    title: 'Moonlight Sparklers',
    desc: 'A dazzling surprise to end the evening',
    gradient: 'from-[#8B0000] to-[#B76E79]',
    image: '/images/moonlight-sparkles.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800'
  }
];

export function ExperienceGrid({ onViewItinerary, onViewMenu }: ExperienceGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="experience-section" className="py-16 md:py-24 bg-gradient-to-b from-[#0a0000] to-[#1a0000] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#8B0000] rounded-full blur-[150px] opacity-10" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#B76E79] rounded-full blur-[180px] opacity-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[#B76E79] text-sm font-medium tracking-wider uppercase mb-4">
              THE SPICES & SPOUSES EXPERIENCE
            </span>
            <h2 className="text-3xl md:text-6xl font-serif text-white mb-4 md:mb-6">
              We've Created the Moment,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] via-[#B76E79] to-[#8B0000]">
                for You to Capture the Memory
              </span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
              Every detail meticulously crafted for an unforgettable evening.
            </p>
          </motion.div>
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden relative">
          {/* Scroll Indicator */}
          <div className="flex items-center justify-between px-4 mb-3">
            <span className="text-gray-400 text-sm">Swipe to explore</span>
            <div className="flex gap-2">
              <button
                onClick={() => scroll('left')}
                className="w-8 h-8 rounded-full bg-[#8B0000]/30 border border-[#8B0000]/50 flex items-center justify-center text-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-8 h-8 rounded-full bg-[#8B0000]/30 border border-[#8B0000]/50 flex items-center justify-center text-white"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Horizontal Scroll Container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 px-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex-shrink-0 w-[260px] h-[320px] snap-center group relative overflow-hidden rounded-2xl"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      if (exp.fallbackImage && e.currentTarget.src !== exp.fallbackImage) {
                        e.currentTarget.src = exp.fallbackImage;
                      }
                    }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${exp.gradient} opacity-80`} />
                  <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between p-5">
                  <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                    <exp.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-white mb-2">
                      {exp.title}
                    </h3>
                    <p className="text-white/85 text-sm leading-relaxed">
                      {exp.desc}
                    </p>
                    {exp.hasMenu && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewMenu();
                        }}
                        className="mt-3 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white text-sm font-medium"
                      >
                        View Menu
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll Progress Dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-[#B76E79]' : 'bg-[#8B0000]/40'}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-4 auto-rows-[280px] px-4">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`${index === 0 ? 'md:col-span-2' : ''} group relative overflow-hidden rounded-2xl cursor-pointer`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    if (exp.fallbackImage && e.currentTarget.src !== exp.fallbackImage) {
                      e.currentTarget.src = exp.fallbackImage;
                    }
                  }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${exp.gradient} opacity-70`} />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-6">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <exp.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white mb-2">
                    {exp.title}
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    {exp.desc}
                  </p>
                </div>

                {exp.hasMenu && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewMenu();
                    }}
                    className="mt-4 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white text-sm font-medium hover:bg-white/30 transition-all duration-300 w-fit"
                  >
                    View Menu
                  </motion.button>
                )}
              </div>

              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-white/20 transition-all duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12 md:mt-16 px-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onViewItinerary}
            className="px-8 py-4 bg-gradient-to-r from-[#8B0000] to-[#A00000] text-white rounded-lg font-medium shadow-[0_0_40px_rgba(139,0,0,0.3)] hover:shadow-[0_0_60px_rgba(139,0,0,0.5)] transition-all duration-300"
          >
            View Full Itinerary
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
