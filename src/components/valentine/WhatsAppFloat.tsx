import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
export function WhatsAppFloat() {
  return <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-2">
      <motion.div initial={{
      opacity: 0,
      x: 20
    }} animate={{
      opacity: 1,
      x: 0
    }} transition={{
      delay: 2
    }} className="bg-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium text-gray-700 mb-2 relative hidden md:block">
        Questions? We're here to help!
        <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-white transform rotate-45" />
      </motion.div>

      <motion.a href="https://wa.me/YOUR_PHONE_NUMBER?text=Hi!%20I%20have%20questions%20about%20the%20Valentine's%20event%20on%20February%2014th" target="_blank" rel="noopener noreferrer"
    whileHover={{
      scale: 1.1
    }} whileTap={{
      scale: 0.9
    }} className="bg-[#25D366] text-white p-4 rounded-full shadow-lg flex items-center justify-center relative group">
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        <MessageCircle size={28} fill="white" className="relative z-10" />
      </motion.a>
    </div>;
}