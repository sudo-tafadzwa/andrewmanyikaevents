import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Zap } from 'lucide-react';

export function PricingSection() {
  const includedFeatures = [
    'Gourmet 4-course dinner',
    'Premium open bar access',
    'Professional photoshoot',
    'Red carpet entrance',
    'Live entertainment',
    'Curated gift package ($100+ value)',
    'Poetry performance',
    'Connection activities',
    'Valet parking',
    'Digital photo gallery'
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#1a0000] to-[#0a0000] px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#8B0000] rounded-full blur-[250px] opacity-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#8B0000]/10 border border-[#8B0000]/20 rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-[#B76E79]" />
            <span className="text-[#B76E79] text-sm font-medium">EXCLUSIVE OFFER</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif text-white mb-6">
            One Ticket,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] via-[#B76E79] to-[#8B0000]">
              Endless Memories
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            All-inclusive experience worth over $300. Pay once, enjoy everything.
          </p>
        </motion.div>

        {/* Main Pricing Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#8B0000] to-[#B76E79] rounded-3xl blur opacity-25" />

          {/* Card content */}
          <div className="relative bg-gradient-to-br from-[#1a0000] to-[#0a0000] border border-[#8B0000]/30 rounded-3xl p-8 md:p-12">
            {/* Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#8B0000] to-[#A00000] px-6 py-2 rounded-full text-white font-medium text-sm shadow-lg">
              <Sparkles className="inline w-4 h-4 mr-2" />
              Limited to 100 Guests
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mt-8">
              {/* Left - Price */}
              <div>
                <div className="mb-8">
                  <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Per Person</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-7xl font-serif font-bold text-white">$100</span>
                    <div className="text-gray-500">
                      <p className="text-sm">all-inclusive</p>
                    </div>
                  </div>
                  <p className="text-[#B76E79] text-sm mt-4">
                    ✨ Save over $200 compared to individual pricing
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 px-6 bg-gradient-to-r from-[#8B0000] to-[#A00000] text-white rounded-xl font-medium shadow-[0_0_40px_rgba(139,0,0,0.4)] hover:shadow-[0_0_60px_rgba(139,0,0,0.6)] transition-all duration-300"
                  >
                    Book Now - Full Payment
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 px-6 bg-transparent border border-[#B76E79] text-[#B76E79] rounded-xl font-medium hover:bg-[#B76E79]/10 transition-all duration-300"
                  >
                    Reserve with $30 Deposit
                  </motion.button>

                  <button className="w-full text-gray-400 text-sm hover:text-white transition-colors underline">
                    Join Waiting List (Free)
                  </button>
                </div>

                <p className="text-gray-500 text-xs text-center mt-6">
                  💳 Secure payment • 🔒 SSL encrypted • ✅ Instant confirmation
                </p>
              </div>

              {/* Right - Features */}
              <div>
                <p className="text-white font-medium mb-6">Everything Included:</p>
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {includedFeatures.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#8B0000]/20 border border-[#8B0000]/40 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-[#B76E79]" />
                      </div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom note */}
            <div className="mt-8 pt-8 border-t border-[#8B0000]/20 text-center">
              <p className="text-gray-400 text-sm">
                <span className="text-[#B76E79] font-medium">February 14th, 2025 • 7:00 PM - Midnight</span>
                <br />
                Deposit option: Pay $30 now, remaining $70 by February 10th
              </p>
            </div>
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 mt-12 text-gray-500 text-sm"
        >
          {['Money-back guarantee', '100% secure checkout', 'Instant email confirmation', 'Customer support 24/7'].map((badge, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#B76E79]" />
              <span>{badge}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(139, 0, 0, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(183, 110, 121, 0.5);
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
}
