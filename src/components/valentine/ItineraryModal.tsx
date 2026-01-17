import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Wine, Music, Utensils, Gamepad2, Users, Mic, Sparkles, Star, Gift } from 'lucide-react';

interface ItineraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewMenu: () => void;
}

const itineraryItems = [
  {
    title: 'Red Carpet Arrival',
    description: "It's Lights, Camera, Action when you walk the red carpet – dress to dazzle. Feel like a celebrity as cameras flash and your arrival is celebrated in style.",
    icon: Camera,
    image: '/images/red-carpet.jpeg',
    fallbackImage: 'https://images.unsplash.com/photo-1607537002385-fe6f11ec19b8?q=80&w=600',
    highlight: true
  },
  {
    title: 'Welcome Drinks & Reception',
    description: 'Indulge in handcrafted mocktails and exquisite canapés as you mingle in an atmosphere of sophistication. The perfect prelude to an unforgettable evening.',
    icon: Wine,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=600'
  },
  {
    title: 'Live Entertainment',
    description: 'Award winning Poets & Comedians; Dancers & DJs; and Magnificent Musicians take centre stage to take you on a unique visual and sonic journey.',
    icon: Music,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=600',
    highlight: true
  },
  {
    title: '4 Course Gourmet Dinner',
    description: 'Send your taste buds on this chef-curated culinary journey that turns your palate into a palace of Italian and French Cuisine.',
    icon: Utensils,
    image: '/images/fine-dining.jpeg',
    fallbackImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600',
    hasMenu: true
  },
  {
    title: 'Party Games with Our Refined MC',
    description: "How much does a polar bear weigh – enough to break the Ice. And that's exactly what these fun activities from our Master of Ceremonies are designed to do. With impeccable wit, charm, and the ability to read the room perfectly, our MC will guide you through thrilling interactive games designed to spark connections and create unforgettable moments.",
    icon: Gamepad2,
    image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=600',
    highlight: true
  },
  {
    title: 'Professional Dancers',
    description: 'Watch mesmerizing dance performances by talented professional dancers that will leave you spellbound and inspired to hit the floor yourself.',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?q=80&w=600'
  },
  {
    title: 'Karaoke',
    description: 'The floor is yours – take the stage and let your voice shine, or cheer on others as they perform in our state-of-the-art karaoke setup.',
    icon: Mic,
    image: '/images/karaoke.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=600'
  },
  {
    title: 'Complementary Gifts',
    description: 'Take home beautiful gifts courtesy of our partners and hosts – a memento of an unforgettable evening.',
    icon: Gift,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600'
  },
  {
    title: 'Moonlight Sparklers',
    description: 'A dazzling surprise to end the evening. Professional photographers capture this breathtaking moment as we celebrate under the stars.',
    icon: Sparkles,
    image: '/images/moonlight-sparkles.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=600',
    highlight: true
  }
];

const premiumExperiences = [
  {
    title: 'Personalized Poetry',
    description: 'A professional poet crafts verses just for you and your special someone',
    icon: Star
  },
  {
    title: 'VIP Seating',
    description: 'Premium table placement with the best views of all performances',
    icon: Star
  },
  {
    title: 'Exclusive Gift Package',
    description: 'Luxury curated gift set worth $150+ to take home',
    icon: Star
  }
];

export function ItineraryModal({ isOpen, onClose, onViewMenu }: ItineraryModalProps) {
  // Prevent body scroll when modal is open
  if (typeof window !== 'undefined') {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-gradient-to-br from-[#1a0000] to-[#0a0000] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#8B0000]/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-20 bg-gradient-to-b from-[#1a0000] to-transparent px-8 pt-8 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[#B76E79] text-sm font-medium tracking-wider uppercase">
                    Your Evening Journey
                  </span>
                  <h2 className="text-3xl md:text-4xl font-serif text-white mt-2">
                    Full <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#B76E79]">Itinerary</span>
                  </h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-12 h-12 rounded-full bg-[#8B0000]/20 border border-[#8B0000]/30 flex items-center justify-center text-white hover:bg-[#8B0000]/40 transition-colors"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="px-4 sm:px-8 pb-8 overflow-y-auto max-h-[calc(90vh-120px)] overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
              {/* Timeline */}
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#8B0000] via-[#B76E79] to-[#8B0000] hidden md:block" />

                <div className="space-y-6 sm:space-y-8">
                  {itineraryItems.map((item, index) => (
                    <div
                      key={index}
                      className="relative md:pl-16"
                    >
                      {/* Timeline dot */}
                      <div className={`absolute left-0 w-12 h-12 rounded-full hidden md:flex items-center justify-center ${
                        item.highlight
                          ? 'bg-gradient-to-br from-[#8B0000] to-[#B76E79] shadow-[0_0_20px_rgba(139,0,0,0.5)]'
                          : 'bg-[#8B0000]/20 border border-[#8B0000]/40'
                      }`}>
                        <item.icon className="w-5 h-5 text-white" />
                      </div>

                      {/* Card */}
                      <div className={`group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#8B0000]/10 to-transparent border ${
                        item.highlight ? 'border-[#B76E79]/40' : 'border-[#8B0000]/20'
                      }`}>
                        <div className="flex flex-col md:flex-row">
                          {/* Image */}
                          <div className="relative w-full md:w-64 h-40 sm:h-48 md:h-auto flex-shrink-0 overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                if (item.fallbackImage && e.currentTarget.src !== item.fallbackImage) {
                                  e.currentTarget.src = item.fallbackImage;
                                } else {
                                  e.currentTarget.style.display = 'none';
                                }
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1a0000] hidden md:block" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a0000] to-transparent md:hidden" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 p-4 sm:p-6">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="md:hidden w-10 h-10 rounded-full bg-[#8B0000]/20 flex items-center justify-center">
                                <item.icon className="w-5 h-5 text-[#B76E79]" />
                              </div>
                              {item.highlight && (
                                <span className="px-3 py-1 bg-[#B76E79]/20 rounded-full text-[#B76E79] text-xs font-medium">
                                  Highlight
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl font-serif font-bold text-white mb-2">
                              {item.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                              {item.description}
                            </p>
                            {item.hasMenu && (
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={onViewMenu}
                                className="mt-4 px-4 py-2 bg-[#8B0000]/20 border border-[#8B0000]/40 rounded-lg text-[#B76E79] text-sm font-medium hover:bg-[#8B0000]/30 transition-all duration-300"
                              >
                                View Full Menu
                              </motion.button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Premium Experiences Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-[#B76E79]/20 to-[#8B0000]/10 border border-[#B76E79]/30"
              >
                <div className="text-center mb-6">
                  <span className="text-[#B76E79] text-sm font-medium tracking-wider uppercase">
                    Upgrade to Premium - $150
                  </span>
                  <h3 className="text-2xl font-serif text-white mt-2">
                    Personalized Extra Experiences
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {premiumExperiences.map((exp, index) => (
                    <div key={index} className="p-4 rounded-xl bg-[#8B0000]/10 border border-[#8B0000]/20">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B0000] to-[#B76E79] flex items-center justify-center mb-3">
                        <exp.icon className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-white font-medium mb-1">{exp.title}</h4>
                      <p className="text-gray-400 text-sm">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
