import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Camera, Music, PenTool, Gift, Sparkles, Users, Heart, Wine, Flame } from 'lucide-react';

const experiences = [
  {
    icon: Utensils,
    title: 'Gourmet 4-Course Dinner',
    desc: 'Chef-curated culinary journey with wine pairings',
    gradient: 'from-[#8B0000] to-[#A00000]',
    span: 'md:col-span-2'
  },
  {
    icon: Camera,
    title: 'Red Carpet Experience',
    desc: 'Paparazzi-style entrance photography',
    gradient: 'from-[#B76E79] to-[#8B0000]',
    span: 'md:col-span-1'
  },
  {
    icon: Music,
    title: 'Live Entertainment',
    desc: 'Jazz ensemble & DJ dance floor',
    gradient: 'from-[#722F37] to-[#8B0000]',
    span: 'md:col-span-1'
  },
  {
    icon: PenTool,
    title: 'Custom Poetry',
    desc: 'Personalized verses crafted live',
    gradient: 'from-[#8B0000] to-[#B76E79]',
    span: 'md:col-span-2'
  },
  {
    icon: Gift,
    title: 'Luxury Gifting',
    desc: 'Curated packages worth $100+',
    gradient: 'from-[#A00000] to-[#722F37]',
    span: 'md:col-span-1'
  },
  {
    icon: Camera,
    title: 'Pro Photoshoot',
    desc: 'Professional lighting & editing',
    gradient: 'from-[#8B0000] to-[#A00000]',
    span: 'md:col-span-1'
  },
  {
    icon: Wine,
    title: 'Premium Open Bar',
    desc: 'Signature cocktails & champagne',
    gradient: 'from-[#B76E79] to-[#8B0000]',
    span: 'md:col-span-1'
  },
  {
    icon: Users,
    title: 'Connection Activities',
    desc: 'Icebreakers for singles & couples',
    gradient: 'from-[#722F37] to-[#A00000]',
    span: 'md:col-span-2'
  },
  {
    icon: Flame,
    title: 'Wishing Ceremony',
    desc: 'Candle lighting & wish wall',
    gradient: 'from-[#8B0000] to-[#B76E79]',
    span: 'md:col-span-1'
  }
];

export function ExperienceGrid() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#0a0000] to-[#1a0000] px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#8B0000] rounded-full blur-[150px] opacity-10" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#B76E79] rounded-full blur-[180px] opacity-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[#B76E79] text-sm font-medium tracking-wider uppercase mb-4">
              THE EXPERIENCE
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
              A Night of
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] via-[#B76E79] to-[#8B0000]">
                Extraordinary Moments
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Every detail meticulously crafted to create an unforgettable evening of luxury, romance, and connection.
            </p>
          </motion.div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`${exp.span} group relative overflow-hidden rounded-2xl bg-gradient-to-br ${exp.gradient} p-6 cursor-pointer`}
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <exp.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white mb-2">
                    {exp.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {exp.desc}
                  </p>
                </div>

                {/* Decorative element */}
                <div className="absolute bottom-4 right-4 w-24 h-24 rounded-full bg-white/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Border gradient on hover */}
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
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">
            Plus valet parking, coat check, and exclusive take-home gifts
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-[#8B0000] to-[#A00000] text-white rounded-lg font-medium shadow-[0_0_40px_rgba(139,0,0,0.3)] hover:shadow-[0_0_60px_rgba(139,0,0,0.5)] transition-all duration-300"
          >
            See Full Itinerary
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
