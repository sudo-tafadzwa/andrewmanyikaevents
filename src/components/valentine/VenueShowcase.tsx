import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, Star, Award } from 'lucide-react';

export function VenueShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200',
      title: 'Red Carpet Arrival',
      description: 'Make your grand entrance on the crimson carpet'
    },
    {
      url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200',
      title: 'Luxury Ballroom',
      description: 'Crystal chandeliers and elegant décor'
    },
    {
      url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200',
      title: 'Premium Table Settings',
      description: 'Fine dining with candlelit ambiance'
    },
    {
      url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200',
      title: 'Professional Photoshoot',
      description: 'Studio-quality lighting and backdrops'
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
            Step Into
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] via-[#B76E79] to-[#8B0000]">
              Pure Luxury
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            An exclusive Harare venue transformed into a Valentine's dreamscape
          </p>
        </motion.div>

        {/* Image Grid - Horizontal Scroll */}
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
            {images.map((image, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative flex-shrink-0 w-[85vw] md:w-[600px] h-[400px] snap-center group"
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0000] via-[#0a0000]/50 to-transparent" />

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <h3 className="text-2xl font-serif text-white mb-2">{image.title}</h3>
                      <p className="text-gray-300 text-sm">{image.description}</p>
                    </motion.div>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-[#B76E79] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
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
              desc: 'Exclusive venue in prime Harare'
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

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
