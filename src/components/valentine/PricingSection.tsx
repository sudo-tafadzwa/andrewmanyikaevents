import { motion } from 'framer-motion';
import { Check, Sparkles, Zap, Star, Crown, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

const WHATSAPP_NUMBER = '263782826984'; // Zimbabwe format

const getWhatsAppUrl = (ticketType: string) => {
  const message = `Hi! I'd like to book a ${ticketType} ticket for Spices & Spouses on February 14th, 2026. Please send me the payment details.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export function PricingSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const standardFeatures = [
    '4 Course Gourmet Dinner',
    'Red carpet entrance',
    'Stand up comedy & poetry by Andrew Manyika',
    'Live entertainment',
    'Party games with MC',
    'Karaoke',
    'Moonlight sparklers',
    'Spicy Photobooth',
    'Complementary gifts',
    'Digital photo gallery'
  ];

  const premiumFeatures = [
    'Everything in Standard, plus:',
    'Customised Poetry Commission',
    'VIP premium seating',
    'Premium gift',
    'Private photo session'
  ];

  return (
    <section id="pricing-section" className="py-24 bg-gradient-to-b from-[#1a0000] to-[#0a0000] px-4 relative overflow-hidden">
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
            <span className="text-[#B76E79] text-sm font-medium">EXCLUSIVE TICKETS</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif text-white mb-6">
            Choose Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] via-[#B76E79] to-[#8B0000]">
              Experience
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Two incredible packages designed for an unforgettable Valentine's celebration
          </p>
        </motion.div>

        {/* Reservation Deadline Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-12 p-4 rounded-xl bg-gradient-to-r from-[#8B0000]/30 to-[#B76E79]/20 border border-[#B76E79]/30 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-[#B76E79]">
            <Calendar className="w-5 h-5" />
            <span className="font-medium">Reservations must be completed by February 4th, 2026</span>
          </div>
        </motion.div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden relative">
          {/* Scroll Indicator */}
          <div className="flex items-center justify-between px-4 mb-3">
            <span className="text-gray-400 text-sm">Swipe to compare</span>
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
            className="flex gap-4 overflow-x-auto pb-4 px-4 pt-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Standard Ticket - Mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex-shrink-0 w-[300px] snap-center relative h-[520px]"
            >
              <div className="relative bg-gradient-to-br from-[#1a0000] to-[#0a0000] border border-[#8B0000]/30 rounded-2xl p-6 h-full flex flex-col">
                <div className="inline-flex items-center gap-2 bg-[#8B0000]/20 border border-[#8B0000]/30 rounded-full px-3 py-1.5 mb-4 w-fit">
                  <Star className="w-3 h-3 text-[#B76E79]" />
                  <span className="text-[#B76E79] text-xs font-medium">STANDARD</span>
                </div>

                <div className="mb-6">
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Per Person</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-serif font-bold text-white">$100</span>
                    <span className="text-gray-500 text-xs">all-inclusive</span>
                  </div>
                  <p className="text-transparent text-xs mt-1">Placeholder</p>
                </div>

                <div className="space-y-2 mb-6 flex-1 overflow-y-auto">
                  {standardFeatures.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#8B0000]/20 border border-[#8B0000]/40 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-[#B76E79]" />
                      </div>
                      <span className="text-gray-300 text-xs">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <a
                    href={getWhatsAppUrl('Standard ($100)')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 px-4 bg-gradient-to-r from-[#8B0000] to-[#A00000] text-white rounded-xl font-medium text-sm text-center"
                  >
                    Book Standard - $100
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Premium Ticket - Mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex-shrink-0 w-[300px] snap-center relative h-[520px]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#8B0000] to-[#B76E79] rounded-2xl blur opacity-30 z-0" />
              <div className="relative bg-gradient-to-br from-[#1a0000] to-[#0a0000] border border-[#B76E79]/40 rounded-2xl p-6 h-full flex flex-col">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#8B0000] to-[#B76E79] px-4 py-1 rounded-full text-white font-medium text-xs shadow-lg flex items-center gap-1 z-20 whitespace-nowrap">
                  <Crown className="w-3 h-3" />
                  RECOMMENDED
                </div>

                <div className="inline-flex items-center gap-2 bg-[#B76E79]/20 border border-[#B76E79]/30 rounded-full px-3 py-1.5 mb-4 w-fit">
                  <Sparkles className="w-3 h-3 text-[#B76E79]" />
                  <span className="text-[#B76E79] text-xs font-medium">PREMIUM VIP</span>
                </div>

                <div className="mb-6">
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Per Person</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-serif font-bold text-white">$150</span>
                    <span className="text-gray-500 text-xs">all-inclusive</span>
                  </div>
                  <p className="text-[#B76E79] text-xs mt-1">The ultimate personalized experience</p>
                </div>

                <div className="space-y-2 mb-6 flex-1 overflow-y-auto">
                  {premiumFeatures.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                        i === 0 ? 'bg-[#B76E79]/30 border border-[#B76E79]/50' : 'bg-gradient-to-br from-[#8B0000] to-[#B76E79]'
                      }`}>
                        {i === 0 ? <Sparkles className="w-2.5 h-2.5 text-[#B76E79]" /> : <Check className="w-2.5 h-2.5 text-white" />}
                      </div>
                      <span className={`text-xs ${i === 0 ? 'text-[#B76E79] font-medium' : 'text-gray-300'}`}>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <a
                    href={getWhatsAppUrl('Premium VIP ($150)')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 px-4 bg-gradient-to-r from-[#B76E79] to-[#8B0000] text-white rounded-xl font-medium text-sm text-center"
                  >
                    Book Premium VIP - $150
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll Progress Dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            <div className="w-2 h-2 rounded-full bg-[#B76E79]" />
            <div className="w-2 h-2 rounded-full bg-[#8B0000]/40" />
          </div>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 max-w-5xl mx-auto pt-6 items-stretch">
          {/* Standard Ticket */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex"
          >
            <div className="relative bg-gradient-to-br from-[#1a0000] to-[#0a0000] border border-[#8B0000]/30 rounded-3xl p-8 flex flex-col w-full">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#8B0000]/20 border border-[#8B0000]/30 rounded-full px-4 py-2 mb-6 w-fit">
                <Star className="w-4 h-4 text-[#B76E79]" />
                <span className="text-[#B76E79] text-sm font-medium">STANDARD</span>
              </div>

              {/* Price */}
              <div className="mb-8">
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Per Person</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-serif font-bold text-white">$100</span>
                  <span className="text-gray-500 text-sm">all-inclusive</span>
                </div>
                <p className="text-transparent text-sm mt-2">Placeholder text</p>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8 flex-1">
                {standardFeatures.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#8B0000]/20 border border-[#8B0000]/40 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#B76E79]" />
                    </div>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="mt-auto">
                <motion.a
                  href={getWhatsAppUrl('Standard ($100)')}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full py-4 px-6 bg-gradient-to-r from-[#8B0000] to-[#A00000] text-white rounded-xl font-medium shadow-[0_0_30px_rgba(139,0,0,0.3)] hover:shadow-[0_0_50px_rgba(139,0,0,0.5)] transition-all duration-300 text-center"
                >
                  Book Standard - $100
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Premium Ticket */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex"
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#8B0000] to-[#B76E79] rounded-3xl blur opacity-30 z-0" />

            <div className="relative bg-gradient-to-br from-[#1a0000] to-[#0a0000] border border-[#B76E79]/40 rounded-3xl p-8 flex flex-col w-full">
              {/* Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#8B0000] to-[#B76E79] px-6 py-2 rounded-full text-white font-medium text-sm shadow-lg flex items-center gap-2 z-10">
                <Crown className="w-4 h-4" />
                RECOMMENDED
              </div>

              <div className="inline-flex items-center gap-2 bg-[#B76E79]/20 border border-[#B76E79]/30 rounded-full px-4 py-2 mb-6 mt-4 w-fit">
                <Sparkles className="w-4 h-4 text-[#B76E79]" />
                <span className="text-[#B76E79] text-sm font-medium">PREMIUM VIP</span>
              </div>

              {/* Price */}
              <div className="mb-8">
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Per Person</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-serif font-bold text-white">$150</span>
                  <span className="text-gray-500 text-sm">all-inclusive</span>
                </div>
                <p className="text-[#B76E79] text-sm mt-2">
                  The ultimate personalized experience
                </p>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8 flex-1">
                {premiumFeatures.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                      i === 0
                        ? 'bg-[#B76E79]/30 border border-[#B76E79]/50'
                        : 'bg-gradient-to-br from-[#8B0000] to-[#B76E79]'
                    }`}>
                      {i === 0 ? (
                        <Sparkles className="w-3 h-3 text-[#B76E79]" />
                      ) : (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className={`text-sm ${i === 0 ? 'text-[#B76E79] font-medium' : 'text-gray-300'}`}>
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="mt-auto">
                <motion.a
                  href={getWhatsAppUrl('Premium VIP ($150)')}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full py-4 px-6 bg-gradient-to-r from-[#B76E79] to-[#8B0000] text-white rounded-xl font-medium shadow-[0_0_40px_rgba(183,110,121,0.4)] hover:shadow-[0_0_60px_rgba(183,110,121,0.6)] transition-all duration-300 text-center"
                >
                  Book Premium VIP - $150
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 text-sm">
            <span className="text-[#B76E79] font-medium">Saturday, February 14th, 2026 • 6 – 10 PM</span>
            <br />
            Rainbow Towers VIP Lounge, Harare • Limited to 100 guests
          </p>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 mt-8 text-gray-500 text-sm"
        >
          {['Instant confirmation', 'Customer support'].map((badge, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#B76E79]" />
              <span>{badge}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
