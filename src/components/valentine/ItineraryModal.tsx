import { useRef, useEffect } from 'react';
import { X, Camera, Music, Utensils, Gamepad2, Users, Mic, Sparkles, Star, Gift, Crown, Gem, Shield, Award, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

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
    title: 'Stand Up Comedy & Performance Poetry by Andrew Manyika',
    description: 'Dynamic Dancers, Prolific Poets and Magnificent Musicians take centre stage to send you on a unique visual and sonic journey.',
    icon: Music,
    image: '/images/Andrew.jpg',
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

const venueHighlights = [
  {
    icon: Camera,
    title: 'Red Carpet Arrival',
    description: "Make a grand entrance on our signature red carpet with professional photographers capturing your star-worthy moments",
    image: '/images/red-carpet.jpeg',
    fallback: 'https://images.unsplash.com/photo-1607537002385-fe6f11ec19b8?q=80&w=800'
  },
  {
    icon: Crown,
    title: 'VIP Lounge Exclusivity',
    description: "Experience the pinnacle of luxury in Rainbow Towers' most prestigious private space, reserved exclusively for our 100 guests",
    image: 'https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=800'
  },
  {
    icon: Gem,
    title: 'World-Class Hospitality',
    description: "Rainbow Towers' award-winning service team delivers impeccable attention to every detail of your evening",
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800'
  },
  {
    icon: Shield,
    title: 'Private & Secure',
    description: "Enjoy complete privacy with dedicated security and exclusive access to our transformed luxury venue",
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800',
    fallback: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800'
  }
];

const venueFeatures = [
  {
    icon: Star,
    title: "Harare's Iconic Landmark",
    desc: "Host your special night at Zimbabwe's most prestigious hotel"
  },
  {
    icon: Award,
    title: 'Limited to 100 Guests',
    desc: 'An intimate, exclusive gathering for a select few'
  },
  {
    icon: Users,
    title: 'Secure Parking',
    desc: 'Safe and convenient parking facilities at Rainbow Towers'
  }
];

export function ItineraryModal({ isOpen, onClose, onViewMenu }: ItineraryModalProps) {
  const venueScrollRef = useRef<HTMLDivElement>(null);

  const scrollVenue = (direction: 'left' | 'right') => {
    if (venueScrollRef.current) {
      const scrollAmount = 280;
      venueScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] bg-gradient-to-br from-[#1a0000] to-[#0a0000] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#8B0000]/30 animate-slideUp"
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
            <button
              onClick={onClose}
              className="w-12 h-12 rounded-full bg-[#8B0000]/20 border border-[#8B0000]/30 flex items-center justify-center text-white hover:bg-[#8B0000]/40 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-8 pb-8 overflow-y-auto max-h-[calc(90vh-120px)]" style={{ WebkitOverflowScrolling: 'touch' }}>
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
                          loading="lazy"
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
                          <button
                            onClick={onViewMenu}
                            className="mt-4 px-4 py-2 bg-[#8B0000]/20 border border-[#8B0000]/40 rounded-lg text-[#B76E79] text-sm font-medium hover:bg-[#8B0000]/30 transition-colors"
                          >
                            View Full Menu
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Experiences Section */}
          <div className="mt-12 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#B76E79]/20 to-[#8B0000]/10 border border-[#B76E79]/30">
            <div className="text-center mb-6">
              <span className="text-[#B76E79] text-sm font-medium tracking-wider uppercase">
                Upgrade to Premium - $150
              </span>
              <h3 className="text-2xl font-serif text-white mt-2">
                Personalized Extra Experiences
              </h3>
            </div>

            {/* Mobile Horizontal Scroll */}
            <div className="md:hidden flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {premiumExperiences.map((exp, index) => (
                <div key={index} className="flex-shrink-0 w-[240px] snap-center p-4 rounded-xl bg-[#8B0000]/10 border border-[#8B0000]/20">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B0000] to-[#B76E79] flex items-center justify-center mb-3">
                    <exp.icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-white font-medium mb-1">{exp.title}</h4>
                  <p className="text-gray-400 text-sm">{exp.description}</p>
                </div>
              ))}
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-3 gap-4">
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
          </div>

          {/* Venue Section */}
          <div className="mt-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-[#8B0000]/10 border border-[#8B0000]/20 rounded-full px-4 py-2 mb-4">
                <MapPin className="w-4 h-4 text-[#B76E79]" />
                <span className="text-[#B76E79] text-sm font-medium">THE VENUE</span>
              </div>
              <h3 className="text-3xl font-serif text-white mb-2">
                Occupy{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] via-[#B76E79] to-[#8B0000]">
                  Opulence
                </span>
              </h3>
              <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                Nestled in the Heart of Harare's Premiere luxury hotel is the Rainbow Towers VIP lounge,
                reimagined as a custom luxury restaurant for one night only.
              </p>
            </div>

            {/* Mobile Horizontal Scroll for Venue */}
            <div className="md:hidden relative mb-8">
              {/* Scroll Indicator */}
              <div className="flex items-center justify-between px-1 mb-3">
                <span className="text-gray-400 text-sm">Swipe to explore</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => scrollVenue('left')}
                    className="w-8 h-8 rounded-full bg-[#8B0000]/30 border border-[#8B0000]/50 flex items-center justify-center text-white"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scrollVenue('right')}
                    className="w-8 h-8 rounded-full bg-[#8B0000]/30 border border-[#8B0000]/50 flex items-center justify-center text-white"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Horizontal Scroll Container */}
              <div
                ref={venueScrollRef}
                className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {venueHighlights.map((item, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-[260px] h-[180px] snap-center group relative overflow-hidden rounded-xl"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          if (item.fallback && e.currentTarget.src !== item.fallback) {
                            e.currentTarget.src = item.fallback;
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0000] via-[#0a0000]/70 to-transparent" />
                    </div>

                    {/* Content overlay */}
                    <div className="absolute inset-0 p-3 flex flex-col justify-end">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#8B0000] to-[#B76E79] flex items-center justify-center">
                          <item.icon className="w-3.5 h-3.5 text-white" />
                        </div>
                        <h4 className="text-sm font-serif text-white">{item.title}</h4>
                      </div>
                      <p className="text-gray-300 text-xs leading-relaxed line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Scroll Progress Dots */}
              <div className="flex justify-center gap-1.5 mt-3">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-[#B76E79]' : 'bg-[#8B0000]/40'}`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop Venue Highlights Grid */}
            <div className="hidden md:grid md:grid-cols-2 gap-4 mb-8">
              {venueHighlights.map((item, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-xl h-[200px]"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        if (item.fallback && e.currentTarget.src !== item.fallback) {
                          e.currentTarget.src = item.fallback;
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0000] via-[#0a0000]/70 to-transparent" />
                  </div>

                  {/* Content overlay */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B0000] to-[#B76E79] flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="text-lg font-serif text-white">{item.title}</h4>
                    </div>
                    <p className="text-gray-300 text-xs leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Venue Features - Horizontal Scroll */}
            <div className="md:hidden flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {venueFeatures.map((feature, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[200px] snap-center p-4 rounded-xl bg-gradient-to-br from-[#8B0000]/10 to-transparent border border-[#8B0000]/20"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#8B0000]/20 flex items-center justify-center mb-2">
                    <feature.icon className="w-4 h-4 text-[#B76E79]" />
                  </div>
                  <h4 className="text-white font-medium text-sm mb-1">{feature.title}</h4>
                  <p className="text-gray-400 text-xs">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* Desktop Venue Features */}
            <div className="hidden md:grid md:grid-cols-3 gap-4">
              {venueFeatures.map((feature, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-gradient-to-br from-[#8B0000]/10 to-transparent border border-[#8B0000]/20"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#8B0000]/20 flex items-center justify-center mb-3">
                    <feature.icon className="w-5 h-5 text-[#B76E79]" />
                  </div>
                  <h4 className="text-white font-medium mb-1">{feature.title}</h4>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
