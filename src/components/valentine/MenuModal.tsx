import { motion, AnimatePresence } from 'framer-motion';
import { X, Utensils, Soup, ChefHat, Cake, Sparkles } from 'lucide-react';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuCourses = [
  {
    course: 'I. THE OPENING',
    subtitle: 'Choice of Starter',
    icon: Utensils,
    items: [
      {
        origin: 'Italian',
        name: 'Trout Crudo alla Costiera',
        description: 'Thinly sliced Nyanga Trout fillet marinated in lemon zest wrapped in bacon, served on a bed of orange and fennel confit and laced with lemon and herb butter.'
      },
      {
        origin: 'French',
        name: 'Beef Carpaccio aux Truffes',
        description: 'Seared Midlands Beef tenderloin, sliced thin and served with a non-alcoholic balsamic reduction, shaved Parmesan, and Romaine lettuce.'
      }
    ]
  },
  {
    course: 'II. THE WARMTH',
    subtitle: 'Choice of Vegetarian Soup',
    icon: Soup,
    items: [
      {
        origin: 'French',
        name: 'Potage Velouté de Champignons',
        description: 'A rich, creamy forest mushroom soup served with a crisp garlic croûte and a dollop of crème fraîche.',
        vegetarian: true
      },
      {
        origin: 'Italian',
        name: 'Roasted Red Pepper & Tomato Bisque',
        description: 'Slow-roasted local peppers and tomatoes blended with mascarpone, served with a parmesan-crusted breadstick.',
        vegetarian: true
      }
    ]
  },
  {
    course: 'III. THE SIGNATURE',
    subtitle: 'Choice of Main Course',
    icon: ChefHat,
    items: [
      {
        origin: 'French',
        name: 'Poached Hake Fillet "À la Polonaise"',
        description: 'Butter-poached Hake fillet served with a classic French garnish of chopped boiled egg, parsley, and toasted brioche crumbs.',
        accompaniments: [
          { label: 'Starch', value: 'Fondant Potatoes (slow-cooked in butter and vegetable stock)' },
          { label: 'Garnish', value: 'Steamed broccoli fried in garlic butter and cashews' }
        ]
      },
      {
        origin: 'Italian',
        name: 'Braised Beef Tagliata',
        description: 'Grilled beef sirloin medallions served over a bed of rocket, finished with a reduction of demi-glace and rosemary.',
        accompaniments: [
          { label: 'Starch', value: 'Creamy Saffron Basmati' },
          { label: 'Garnish', value: 'Charred cherry tomatoes and shaved Parmesan' }
        ]
      },
      {
        origin: 'French',
        name: 'Poulet à l\'Estragon (Tarragon Chicken)',
        description: 'Pan-roasted free-range chicken breast with a creamy tarragon and mushroom reduction (de-glazed with verjuice).',
        accompaniments: [
          { label: 'Starch', value: 'Pomme Mousseline (Ultra-smooth buttery mashed potatoes)' },
          { label: 'Garnish', value: 'Glazed baby carrots and haricots verts' }
        ]
      }
    ]
  },
  {
    course: 'IV. THE SWEET ENDING',
    subtitle: 'Choice of Dessert',
    icon: Cake,
    items: [
      {
        origin: 'Italian',
        name: 'Panna Cotta ai Frutti di Bosco',
        description: 'Silky vanilla bean panna cotta topped with a medley of Vumba forest berries and a honey-lemon glaze.'
      },
      {
        origin: 'Italian',
        name: 'Traditional Tiramisu (Non-Alcoholic)',
        description: 'Layers of espresso-soaked ladyfingers and mascarpone cream, flavored with vanilla bean instead of coffee liqueur, topped with heavy cocoa.'
      },
      {
        origin: 'Signature',
        name: 'The "Vumba Sunset" Valentine Tartlet',
        description: 'A delicate hand-crafted French Patisserie shell, lined with a whisper of decadent homemade pastry cream. This signature Valentine\'s creation features a hidden heart of Nyanga strawberry reduction, crowned with a floral arrangement of sun-ripened Eastern Highlands strawberries and forest peaches.',
        signature: true
      }
    ]
  }
];

export function MenuModal({ isOpen, onClose }: MenuModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-[#1a0000] to-[#0a0000] rounded-3xl overflow-hidden border border-[#8B0000]/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-20 bg-gradient-to-b from-[#1a0000] via-[#1a0000] to-transparent px-8 pt-8 pb-6">
              <div className="flex items-center justify-between">
                <div className="text-center flex-1">
                  <div className="inline-flex items-center gap-2 bg-[#8B0000]/20 border border-[#8B0000]/30 rounded-full px-4 py-2 mb-4">
                    <Sparkles className="w-4 h-4 text-[#B76E79]" />
                    <span className="text-[#B76E79] text-sm font-medium">THE RAINBOW TOWERS</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif text-white">
                    French & Italian Fusion
                  </h2>
                  <p className="text-[#B76E79] text-lg mt-2 font-serif italic">
                    Valentine Menu
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    A Non-Alcoholic French & Italian Fusion
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-8 right-8 w-12 h-12 rounded-full bg-[#8B0000]/20 border border-[#8B0000]/30 flex items-center justify-center text-white hover:bg-[#8B0000]/40 transition-colors"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="px-8 pb-8 overflow-y-auto max-h-[calc(90vh-180px)] custom-scrollbar">
              <div className="space-y-12">
                {menuCourses.map((course, courseIndex) => (
                  <motion.div
                    key={courseIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: courseIndex * 0.15 }}
                  >
                    {/* Course Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#8B0000] to-[#B76E79] flex items-center justify-center shadow-[0_0_20px_rgba(139,0,0,0.4)]">
                        <course.icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-serif text-white">{course.course}</h3>
                        <p className="text-[#B76E79] text-sm">{course.subtitle}</p>
                      </div>
                    </div>

                    {/* Course Items */}
                    <div className="space-y-6 pl-4 border-l-2 border-[#8B0000]/30 ml-7">
                      {course.items.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: courseIndex * 0.15 + itemIndex * 0.1 }}
                          className={`relative p-6 rounded-2xl ${
                            item.signature
                              ? 'bg-gradient-to-br from-[#B76E79]/20 to-[#8B0000]/10 border border-[#B76E79]/40'
                              : 'bg-[#8B0000]/10 border border-[#8B0000]/20'
                          } hover:border-[#B76E79]/50 transition-all duration-300`}
                        >
                          {/* Origin badge */}
                          <div className="flex items-center gap-2 mb-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              item.origin === 'Italian'
                                ? 'bg-green-900/30 text-green-400 border border-green-800/30'
                                : item.origin === 'French'
                                ? 'bg-blue-900/30 text-blue-400 border border-blue-800/30'
                                : 'bg-[#B76E79]/30 text-[#B76E79] border border-[#B76E79]/30'
                            }`}>
                              {item.origin}
                            </span>
                            {item.vegetarian && (
                              <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-900/30 text-emerald-400 border border-emerald-800/30">
                                Vegetarian
                              </span>
                            )}
                            {item.signature && (
                              <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#B76E79]/30 text-[#B76E79] border border-[#B76E79]/30 flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                Signature
                              </span>
                            )}
                          </div>

                          {/* Dish name */}
                          <h4 className="text-xl font-serif text-white mb-2">
                            {item.name}
                          </h4>

                          {/* Description */}
                          <p className="text-gray-400 text-sm leading-relaxed italic">
                            {item.description}
                          </p>

                          {/* Accompaniments */}
                          {item.accompaniments && (
                            <div className="mt-4 space-y-2">
                              {item.accompaniments.map((acc, accIndex) => (
                                <div key={accIndex} className="flex items-start gap-2">
                                  <span className="text-[#B76E79] text-xs font-medium min-w-[60px]">
                                    {acc.label}:
                                  </span>
                                  <span className="text-gray-500 text-xs">
                                    {acc.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer note */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-12 text-center p-6 rounded-2xl bg-[#8B0000]/10 border border-[#8B0000]/20"
              >
                <p className="text-gray-400 text-sm">
                  All dishes prepared with locally sourced ingredients from Nyanga, Vumba, and the Eastern Highlands.
                </p>
                <p className="text-[#B76E79] text-xs mt-2">
                  Please inform our staff of any dietary requirements or allergies.
                </p>
              </motion.div>
            </div>

            {/* Glow effects */}
            <div className="absolute top-20 right-20 w-64 h-64 bg-[#8B0000] rounded-full blur-[150px] opacity-20 pointer-events-none" />
            <div className="absolute bottom-20 left-20 w-48 h-48 bg-[#B76E79] rounded-full blur-[120px] opacity-15 pointer-events-none" />
          </motion.div>

          <style>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: rgba(139, 0, 0, 0.1);
              border-radius: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(183, 110, 121, 0.5);
              border-radius: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: rgba(183, 110, 121, 0.7);
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
