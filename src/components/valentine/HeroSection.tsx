import { motion } from 'framer-motion';
import { Calendar, MapPin, Users } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0a0000]">
      {/* Split Screen Layout */}
      <div className="grid lg:grid-cols-2 min-h-screen">

        {/* Left Side - Content */}
        <div className="relative flex items-center justify-center p-8 lg:p-16 bg-gradient-to-br from-[#1a0000] via-[#2a0505] to-[#0a0000]">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute w-96 h-96 bg-[#8B0000] rounded-full blur-[120px] opacity-20"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ top: '10%', left: '10%' }}
            />
            <motion.div
              className="absolute w-72 h-72 bg-[#B76E79] rounded-full blur-[100px] opacity-15"
              animate={{
                x: [0, -80, 0],
                y: [0, 120, 0],
                scale: [1, 1.3, 1]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ bottom: '20%', right: '10%' }}
            />
          </div>

          <div className="relative z-10 max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#8B0000]/20 backdrop-blur-sm border border-[#8B0000]/30 rounded-full px-4 py-2 mb-8">
                <span className="w-2 h-2 bg-[#B76E79] rounded-full animate-pulse"></span>
                <span className="text-[#B76E79] text-sm font-medium tracking-wider">LIMITED TO 100 GUESTS</span>
              </div>

              {/* Main Title */}
              <h1 className="text-5xl md:text-7xl font-serif text-white leading-[1.1] mb-6">
                Spices
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] via-[#B76E79] to-[#8B0000]">
                  & Spouses
                </span>
              </h1>

              {/* Description */}
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                The one night in a year where fine dining, live entertainment, and meaningful
                connections are ignited and rekindled.
              </p>

              {/* Info Cards */}
              <div className="space-y-3 mb-10">
                {[
                  { icon: Calendar, text: 'Saturday, February 14th, 2026 • 6 – 10 PM' },
                  { icon: MapPin, text: 'Rainbow Towers Harare, VIP Lounge' },
                  { icon: Users, text: 'A Comedy & Poetry Dinner for Singles, Couples & Friends' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3 text-gray-400"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#8B0000]/10 border border-[#8B0000]/20 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[#B76E79]" />
                    </div>
                    <span className="text-sm">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const experienceSection = document.getElementById('experience-section');
                    if (experienceSection) {
                      experienceSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="group px-8 py-4 bg-gradient-to-r from-[#8B0000] to-[#A00000] text-white rounded-lg font-medium relative overflow-hidden shadow-[0_0_40px_rgba(139,0,0,0.3)]"
                >
                  <span className="relative z-10">View Experience</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#A00000] to-[#8B0000] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Image Grid */}
        <div className="relative h-[50vh] lg:h-screen">
          <div className="absolute inset-0 grid grid-cols-2 gap-1">
            {[
              { src: '/images/fine-dining.jpeg', fallback: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800', alt: 'Fine dining experience' },
              { src: '/images/red-carpet.jpeg', fallback: 'https://images.unsplash.com/photo-1607537002385-fe6f11ec19b8?q=80&w=800', alt: 'Red carpet arrival' },
              { src: '/images/karaoke.jpg', fallback: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=800', alt: 'Karaoke entertainment' },
              { src: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800', fallback: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800', alt: 'Professional photography' }
            ].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
                className="relative overflow-hidden group"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    if (e.currentTarget.src !== img.fallback) {
                      e.currentTarget.src = img.fallback;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#8B0000]/40 to-transparent opacity-60" />
              </motion.div>
            ))}
          </div>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0a0000]/50 lg:to-[#0a0000]/80" />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-[#B76E79] rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-[#B76E79] rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
