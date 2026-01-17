import { motion } from 'framer-motion';
import { Ticket } from 'lucide-react';

export function BuyTicketCTA() {
  const scrollToTickets = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-8 text-center"
    >
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={scrollToTickets}
        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#8B0000] to-[#A00000] text-white rounded-xl font-medium shadow-[0_0_30px_rgba(139,0,0,0.3)] hover:shadow-[0_0_50px_rgba(139,0,0,0.5)] transition-all duration-300"
      >
        <Ticket className="w-5 h-5" />
        Buy Your Ticket
      </motion.button>
    </motion.div>
  );
}
