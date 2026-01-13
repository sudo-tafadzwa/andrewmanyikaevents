import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-[#0a0000] to-[#1a0000] px-4 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#8B0000] rounded-full blur-[200px] opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-[#B76E79] rounded-full blur-[180px] opacity-15"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Icon */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#8B0000] to-[#B76E79] mb-8 shadow-[0_0_60px_rgba(139,0,0,0.4)]"
          >
            <Heart className="w-10 h-10 text-white" fill="white" />
          </motion.div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-6">
            Ready to Make
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] via-[#B76E79] to-[#8B0000]">
              This Valentine's Unforgettable?
            </span>
          </h2>

          {/* Description */}
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12">
            Don't let this moment slip away. Whether you're celebrating love, seeking connection,
            or simply embracing the magic of the night—your story starts here.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-10 py-5 bg-gradient-to-r from-[#8B0000] to-[#A00000] text-white rounded-xl font-medium text-lg shadow-[0_0_50px_rgba(139,0,0,0.4)] hover:shadow-[0_0_70px_rgba(139,0,0,0.6)] transition-all duration-300 flex items-center gap-3"
            >
              Secure Your Spot Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-transparent border-2 border-[#B76E79] text-[#B76E79] rounded-xl font-medium text-lg hover:bg-[#B76E79]/10 transition-all duration-300"
            >
              View Full Details
            </motion.button>
          </div>

          {/* Footer info */}
          <div className="space-y-2 text-gray-500 text-sm">
            <p>andrewmanyikaevents.com</p>
            <p className="text-[#B76E79]">February 14, 2025 • 7:00 PM</p>
            <p>Limited to 100 Guests • Selling Fast</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
