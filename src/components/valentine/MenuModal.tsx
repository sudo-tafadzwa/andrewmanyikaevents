import { useEffect } from 'react';
import { X, Utensils, Soup, ChefHat, Cake, Sparkles, LucideIcon } from 'lucide-react';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Accompaniment {
  label: string;
  value: string;
}

interface MenuItem {
  origin: string;
  name: string;
  description: string;
  vegetarian?: boolean;
  signature?: boolean;
  accompaniments?: Accompaniment[];
}

interface MenuCourse {
  course: string;
  subtitle: string;
  icon: LucideIcon;
  items: MenuItem[];
}

const menuCourses: MenuCourse[] = [
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
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-[#1a0000] to-[#0a0000] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#8B0000]/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-20 bg-[#1a0000] px-4 sm:px-8 pt-6 sm:pt-8 pb-4">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <div className="inline-flex items-center gap-2 bg-[#8B0000]/20 border border-[#8B0000]/30 rounded-full px-4 py-2 mb-4">
                <Sparkles className="w-4 h-4 text-[#B76E79]" />
                <span className="text-[#B76E79] text-sm font-medium">THE RAINBOW TOWERS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white">
                French & Italian Fusion
              </h2>
              <p className="text-[#B76E79] text-base sm:text-lg mt-2 font-serif italic">
                Valentine Menu
              </p>
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 sm:top-8 right-4 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#8B0000]/20 border border-[#8B0000]/30 flex items-center justify-center text-white hover:bg-[#8B0000]/40 transition-colors"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div
          className="px-4 sm:px-8 pb-8 overflow-y-auto max-h-[calc(90vh-160px)]"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div className="space-y-8 sm:space-y-10">
            {menuCourses.map((course, courseIndex) => (
              <div key={courseIndex}>
                {/* Course Header */}
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#8B0000] to-[#B76E79] flex items-center justify-center">
                    <course.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif text-white">{course.course}</h3>
                    <p className="text-[#B76E79] text-sm">{course.subtitle}</p>
                  </div>
                </div>

                {/* Course Items */}
                <div className="space-y-3 sm:space-y-4 pl-3 sm:pl-4 border-l-2 border-[#8B0000]/30 ml-6 sm:ml-7">
                  {course.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className={`relative p-3 sm:p-5 rounded-xl ${
                        item.signature
                          ? 'bg-gradient-to-br from-[#B76E79]/20 to-[#8B0000]/10 border border-[#B76E79]/40'
                          : 'bg-[#8B0000]/10 border border-[#8B0000]/20'
                      }`}
                    >
                      {/* Origin badge */}
                      <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                          item.origin === 'Italian'
                            ? 'bg-green-900/30 text-green-400 border border-green-800/30'
                            : item.origin === 'French'
                            ? 'bg-blue-900/30 text-blue-400 border border-blue-800/30'
                            : 'bg-[#B76E79]/30 text-[#B76E79] border border-[#B76E79]/30'
                        }`}>
                          {item.origin}
                        </span>
                        {item.vegetarian && (
                          <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-emerald-900/30 text-emerald-400 border border-emerald-800/30">
                            Vegetarian
                          </span>
                        )}
                        {item.signature && (
                          <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-[#B76E79]/30 text-[#B76E79] border border-[#B76E79]/30 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            Signature
                          </span>
                        )}
                      </div>

                      {/* Dish name */}
                      <h4 className="text-lg sm:text-xl font-serif text-white mb-1 sm:mb-2">
                        {item.name}
                      </h4>

                      {/* Description */}
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed italic">
                        {item.description}
                      </p>

                      {/* Accompaniments */}
                      {item.accompaniments && (
                        <div className="mt-3 space-y-1 sm:space-y-2">
                          {item.accompaniments.map((acc, accIndex) => (
                            <div key={accIndex} className="flex items-start gap-2">
                              <span className="text-[#B76E79] text-xs font-medium min-w-[50px] sm:min-w-[60px]">
                                {acc.label}:
                              </span>
                              <span className="text-gray-500 text-xs">
                                {acc.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-6 sm:mt-8 text-center p-3 sm:p-4 rounded-xl bg-[#8B0000]/10 border border-[#8B0000]/20">
            <p className="text-gray-400 text-xs sm:text-sm">
              All dishes prepared with locally sourced ingredients from Nyanga, Vumba, and the Eastern Highlands.
            </p>
            <p className="text-[#B76E79] text-xs mt-2">
              Please inform our staff of any dietary requirements or allergies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
