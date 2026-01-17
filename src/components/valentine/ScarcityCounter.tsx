import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingDown, AlertCircle } from 'lucide-react';

function ViewerCount() {
  const [viewerCount, setViewerCount] = useState(() => Math.floor(Math.random() * 10 + 6)); // Random 6-15

  useEffect(() => {
    // Change viewer count every 3-8 seconds randomly
    const updateViewers = () => {
      const change = Math.random() > 0.5 ? 1 : -1;
      setViewerCount(prev => {
        const newCount = prev + change;
        // Keep between 6 and 15
        if (newCount < 6) return 6;
        if (newCount > 15) return 15;
        return newCount;
      });
    };

    const interval = setInterval(updateViewers, Math.random() * 5000 + 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <p className="text-gray-400 text-xs">
      {viewerCount} people viewing now
    </p>
  );
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export function ScarcityCounter() {
  const [tickets, setTickets] = useState(89);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Fetch real ticket data from backend
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`${API_URL}/stats`);
        if (response.ok) {
          const data = await response.json();
          // Use total remaining from API
          setTickets(data.remaining || 89);
        }
      } catch (error) {
        console.error('Failed to fetch ticket stats:', error);
        // Keep default value on error
      }
    };

    // Fetch immediately
    fetchTickets();

    // Refresh every 30 seconds
    const interval = setInterval(fetchTickets, 30000);
    return () => clearInterval(interval);
  }, []);

  // Countdown timer logic - February 14th, 2026 at 6 PM
  useEffect(() => {
    const targetDate = new Date('2026-02-14T18:00:00');
    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };
    const timer = setInterval(updateTimer, 1000);
    updateTimer();
    return () => clearInterval(timer);
  }, []);

  const ticketPercentage = (tickets / 100) * 100;

  return (
    <section className="sticky top-0 z-40 bg-gradient-to-r from-[#1a0000] via-[#2a0505] to-[#1a0000] border-b border-[#8B0000]/20 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">

          {/* Tickets Remaining */}
          <motion.div
            className="relative bg-gradient-to-r from-[#8B0000]/20 to-transparent border border-[#8B0000]/30 rounded-lg p-4 overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            {/* Progress bar background */}
            <div className="absolute bottom-0 left-0 h-1 w-full bg-[#8B0000]/20">
              <motion.div
                className="h-full bg-gradient-to-r from-[#8B0000] to-[#B76E79]"
                initial={{ width: '100%' }}
                animate={{ width: `${ticketPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#8B0000]/30 flex items-center justify-center flex-shrink-0">
                <TrendingDown className="w-6 h-6 text-[#B76E79]" />
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={tickets}
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      className="text-3xl font-serif font-bold text-white"
                    >
                      {tickets}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-sm text-gray-400">/ 100 tickets left</span>
                </div>
                <p className="text-xs text-[#B76E79] mt-1">
                  {tickets > 50 ? 'Selling Fast' : tickets > 20 ? 'Almost Sold Out' : 'Final Spots!'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Countdown Timer */}
          <div className="flex gap-2 justify-center">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Mins', value: timeLeft.minutes },
              { label: 'Secs', value: timeLeft.seconds }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="w-14 h-14 bg-[#8B0000]/10 border border-[#8B0000]/20 rounded-lg flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-white font-mono">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase text-gray-500 tracking-wider">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Urgency Message */}
          <motion.div
            className="flex items-center gap-3 justify-center md:justify-end"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <AlertCircle className="w-5 h-5 text-[#B76E79]" />
            <div>
              <p className="text-white text-sm font-medium">Don't miss out!</p>
              <ViewerCount />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
