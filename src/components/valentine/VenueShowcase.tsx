import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, Star, Award, Camera, Music, Gamepad2, Mic } from 'lucide-react';

export function VenueShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  const experiences = [
    {
      icon: Camera,
      title: 'Red Carpet Experience',
      description: "It's Lights, Camera, Action when you walk the red carpet – dress to dazzle",
      image: '/images/red-carpet.jpg'
    },
    {
      icon: Music,
      title: 'Live Entertainment',
      description: 'Award winning Poets & Comedians; Dancers & DJs; and Magnificent Musicians',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800'
    },
    {
      icon: Gamepad2,
      title: 'Party Games',
      description: "Fun activities from our Master of Ceremonies designed to break the ice",
      image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=800'
    },
    {
      icon: Mic,
      title: 'Karaoke',
      description: 'The floor is yours – take the stage and let your voice shine',
      image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=800'
    }
  ];

  return (
    <section ref={containerRef} className="relative bg-[#0a0000] py-24 overflow-hidden">
      {/* Parallax background elements */}
      <motion.div
        style={{ y, opacity }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8B0000] rounded-full blur-[200px] opacity-20"
      />

      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#8B0000]/10 border border-[#8B0000]/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-[#B76E79]" />
            <span className="text-[#B76E79] text-sm font-medium">THE VENUE</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif text-white mb-6">
            Occupy
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] via-[#B76E79] to-[#8B0000]">
              Opulence
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Nestled in the Heart of Harare's Premiere luxury hotel is the Rainbow Towers VIP lounge,
            reimagined as a custom luxury restaurant for one night only. Join us in this oasis of opulence
            and you'll feel like you've entered another world.
          </p>
        </motion.div>

        {/* Experience Grid with Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl h-[350px]"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0000] via-[#0a0000]/60 to-transparent" />
              </div>

              {/* Content overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8B0000] to-[#B76E79] flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(139,0,0,0.4)] group-hover:scale-110 transition-transform duration-300">
                    <exp.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-2">{exp.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{exp.description}</p>
                </motion.div>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-[#B76E79] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Border on hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-[#B76E79]/0 group-hover:border-[#B76E79]/40 transition-all duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: Star,
              title: '5-Star Service',
              desc: 'Dedicated staff ensuring perfection'
            },
            {
              icon: Award,
              title: 'Premium Location',
              desc: 'Rainbow Towers VIP Lounge, Harare'
            },
            {
              icon: Sparkles,
              title: 'Elegant Décor',
              desc: 'Professionally designed ambiance'
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#8B0000]/10 to-transparent border border-[#8B0000]/20 hover:border-[#B76E79]/40 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-[#8B0000]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-[#B76E79]" />
                </div>
                <h3 className="text-xl font-serif text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
