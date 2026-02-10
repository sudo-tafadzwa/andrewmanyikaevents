import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingDown, AlertCircle, Flame } from 'lucide-react';

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

// Ticket countdown: starts at 40 on Feb 10, drops 8 per day (1 every 3 hours)
function getTicketsRemaining() {
  const startDate = new Date('2026-02-10T00:00:00');
  const startTickets = 40;
  const ticketsPerDay = 8; // 8 tickets drop per day = 1 every 3 hours
  const now = new Date();
  const hoursElapsed = (now.getTime() - startDate.getTime()) / (1000 * 60 * 60);
  const ticketsDropped = Math.floor(hoursElapsed / 3); // 1 ticket every 3 hours
  const remaining = startTickets - ticketsDropped;
  return Math.max(remaining, 2); // never go below 2
}

export function ScarcityCounter() {
  const [tickets, setTickets] = useState(getTicketsRemaining);

  // Update ticket count every 3 minutes for smooth feel
  useEffect(() => {
    const interval = setInterval(() => {
      setTickets(getTicketsRemaining());
    }, 3 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Countdown timer logic - real time until February 14th at 6 PM
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

  const ticketPercentage = (tickets / 40) * 100;

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
                  <span className="text-sm text-gray-400">tickets left</span>
                </div>
                <p className="text-xs text-[#B76E79] mt-1">
                  {tickets > 30 ? 'Selling Fast' : tickets > 15 ? 'Almost Sold Out' : 'Final Spots!'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Countdown Timer with Confetti */}
          <div className="relative flex flex-col items-center gap-2">
            {/* Floating confetti / sparkle particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 6 + 3,
                  height: Math.random() * 6 + 3,
                  background: ['#B76E79', '#8B0000', '#FFD700', '#FF6B6B', '#FF69B4', '#FFA07A'][i % 6],
                  left: `${10 + Math.random() * 80}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -15, 5, -10, 0],
                  x: [0, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 15, 0],
                  opacity: [0.3, 1, 0.5, 1, 0.3],
                  scale: [0.8, 1.2, 0.9, 1.1, 0.8],
                  rotate: [0, 90, 180, 270, 360],
                }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: 'easeInOut',
                }}
              />
            ))}

            <div className="flex gap-2 justify-center relative z-10">
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

            {/* Urgency text below countdown */}
            <motion.div
              className="flex items-center gap-1.5 relative z-10"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-xs font-semibold text-[#B76E79] tracking-wide uppercase">
                Hurry — Selling out fast!
              </span>
              <Flame className="w-3.5 h-3.5 text-orange-400" />
            </motion.div>
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
