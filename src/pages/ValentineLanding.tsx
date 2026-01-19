import { useState, useCallback } from 'react';
import { HeroSection } from '../components/valentine/HeroSection';
import { ScarcityCounter } from '../components/valentine/ScarcityCounter';
import { ExperienceGrid } from '../components/valentine/ExperienceGrid';
import { PricingSection } from '../components/valentine/PricingSection';
import { WhatsAppFloat } from '../components/valentine/WhatsAppFloat';
import { FinalCTA } from '../components/valentine/FinalCTA';
import { ItineraryModal } from '../components/valentine/ItineraryModal';
import { MenuModal } from '../components/valentine/MenuModal';

export function ValentineLanding() {
  const [isItineraryOpen, setIsItineraryOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuOpenedFromItinerary, setMenuOpenedFromItinerary] = useState(false);

  const handleOpenMenuFromItinerary = useCallback(() => {
    setMenuOpenedFromItinerary(true);
    setIsMenuOpen(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
    // If menu was opened from itinerary, reopen itinerary after a brief delay
    if (menuOpenedFromItinerary) {
      setMenuOpenedFromItinerary(false);
      // Small delay to allow menu close animation
      setTimeout(() => {
        setIsItineraryOpen(true);
      }, 100);
    }
  }, [menuOpenedFromItinerary]);

  const handleOpenMenu = useCallback(() => {
    setMenuOpenedFromItinerary(false);
    setIsMenuOpen(true);
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0000] overflow-x-hidden">
      <HeroSection onViewMenu={handleOpenMenu} />
      <ScarcityCounter />
      <ExperienceGrid
        onViewItinerary={() => setIsItineraryOpen(true)}
        onViewMenu={handleOpenMenu}
      />
      <PricingSection />
      <FinalCTA />
      <WhatsAppFloat />

      {/* Modals */}
      <ItineraryModal
        isOpen={isItineraryOpen && !isMenuOpen}
        onClose={() => setIsItineraryOpen(false)}
        onViewMenu={handleOpenMenuFromItinerary}
      />
      <MenuModal
        isOpen={isMenuOpen}
        onClose={handleCloseMenu}
      />

      {/* Footer */}
      <footer className="bg-gradient-to-b from-[#1a0000] to-[#0a0000] text-gray-500 py-12 text-center text-sm border-t border-[#8B0000]/20">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-white font-serif text-xl mb-2">Andrews Manyika Events</p>
          <p className="text-gray-400 mb-6">Creating unforgettable experiences since 2016</p>
          <p className="text-gray-600 text-xs">
            &copy; 2026 Andrews Manyika Events. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
