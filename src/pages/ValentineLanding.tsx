import { useState } from 'react';
import { HeroSection } from '../components/valentine/HeroSection';
import { ScarcityCounter } from '../components/valentine/ScarcityCounter';
import { ExperienceGrid } from '../components/valentine/ExperienceGrid';
import { VenueShowcase } from '../components/valentine/VenueShowcase';
import { PricingSection } from '../components/valentine/PricingSection';
import { WhatsAppFloat } from '../components/valentine/WhatsAppFloat';
import { FinalCTA } from '../components/valentine/FinalCTA';
import { ItineraryModal } from '../components/valentine/ItineraryModal';
import { MenuModal } from '../components/valentine/MenuModal';

export function ValentineLanding() {
  const [isItineraryOpen, setIsItineraryOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#0a0000] overflow-x-hidden">
      <HeroSection />
      <ScarcityCounter />
      <ExperienceGrid
        onViewItinerary={() => setIsItineraryOpen(true)}
        onViewMenu={() => setIsMenuOpen(true)}
      />
      <VenueShowcase />
      <PricingSection />
      <FinalCTA />
      <WhatsAppFloat />

      {/* Modals */}
      <ItineraryModal
        isOpen={isItineraryOpen}
        onClose={() => setIsItineraryOpen(false)}
        onViewMenu={() => {
          setIsItineraryOpen(false);
          setIsMenuOpen(true);
        }}
      />
      <MenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-gradient-to-b from-[#1a0000] to-[#0a0000] text-gray-500 py-12 text-center text-sm border-t border-[#8B0000]/20">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-white font-serif text-xl mb-2">Andrews Manyika Events</p>
          <p className="text-gray-400 mb-6">Creating unforgettable experiences since 2020</p>
          <div className="flex flex-wrap justify-center gap-6 mb-6 text-xs">
            <a href="#" className="hover:text-[#B76E79] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#B76E79] transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-[#B76E79] transition-colors">Contact Us</a>
            <a href="#" className="hover:text-[#B76E79] transition-colors">FAQ</a>
          </div>
          <p className="text-gray-600 text-xs">
            &copy; 2025 Andrews Manyika Events. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
