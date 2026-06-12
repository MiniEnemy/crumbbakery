import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Heart, Plus, ShoppingCart, Sparkles, Check, X } from 'lucide-react';
import { MENU_ITEMS } from '../MenuData';
import { MenuItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface MenuSectionProps {
  onAddToBag: (item: MenuItem, quantity: number, notes?: string) => void;
}

export default function MenuSection({ onAddToBag }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState<'all' | 'vegan' | 'slow-ferment'>('all');
  
  // Customization modal state
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [customNotes, setCustomNotes] = useState('');
  const [showConf, setShowConf] = useState(false);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'favourites', label: "Daily Favourites" },
    { id: 'loaves', label: 'Artisan Loaves' },
    { id: 'buns', label: 'Sweet Buns' },
    { id: 'muffins', label: 'Muffins & Tarts' },
    { id: 'celebration', label: 'Celebration Cakes' }
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter - for 'favourites' we can check item.category or isFav
      const matchesCategory = activeCategory === 'all' 
        ? true 
        : activeCategory === 'favourites' 
          ? item.isFav === true 
          : item.category === activeCategory;

      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDiet = dietFilter === 'all'
        ? true
        : dietFilter === 'vegan'
          ? item.tags.some(t => t.toLowerCase().includes('vegan'))
          : item.tags.some(t => t.toLowerCase().includes('slow ferment') || t.toLowerCase().includes('sourdough'));

      return matchesCategory && matchesSearch && matchesDiet;
    });
  }, [activeCategory, searchQuery, dietFilter]);

  const handleOpenItem = (item: MenuItem) => {
    setSelectedItem(item);
    setQuantity(1);
    setCustomNotes('');
    setShowConf(false);
  };

  const handleAddConfirm = () => {
    if (!selectedItem) return;
    onAddToBag(selectedItem, quantity, customNotes);
    setShowConf(true);
    setTimeout(() => {
      setSelectedItem(null);
      setShowConf(false);
    }, 1000);
  };

  return (
    <section className="py-20 bg-surface-container-lowest relative z-10" id="menu">
      <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Section title */}
        <div className="text-center mb-8">
          <span className="font-accent text-3xl text-primary mb-2 block">bake list</span>
          <h2 className="font-serif font-extrabold text-3xl md:text-4xl text-primary">Interactive Bakery Menu</h2>
          <div className="w-24 h-1 bg-primary-container mx-auto mt-2 rounded-full"></div>
          <p className="font-sans text-on-surface-variant max-w-md mx-auto mt-3 text-sm">
            Everything is baked strictly before sunrise using 100% natural, preservative-free sourdough cultures and flour mills.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-surface rounded-2xl p-4 mb-10 border border-outline-variant shadow-sm flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-5 h-5 absolute left-3 top-3.5 text-outline" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sourdough, lemon, buns, tea..."
                className="w-full bg-surface-container-low border border-outline-variant rounded-xl pl-10 pr-4 py-3 placeholder:text-outline/70 focus:outline-none focus:border-primary text-sm font-sans"
              />
            </div>

            {/* Diet constraint quick pills */}
            <div className="flex items-center gap-2 w-full md:w-auto scrollbar-none overflow-x-auto pb-1 md:pb-0">
              <span className="text-xs font-semibold text-primary capitalize flex items-center gap-1.5 whitespace-nowrap mr-2">
                <SlidersHorizontal className="w-4 h-4" /> Filter Diet:
              </span>
              <button
                onClick={() => setDietFilter('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  dietFilter === 'all' 
                    ? 'bg-primary text-on-primary' 
                    : 'bg-surface-container hover:bg-surface-container-high text-[#51443f]'
                }`}
              >
                All Diets
              </button>
              <button
                onClick={() => setDietFilter('vegan')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  dietFilter === 'vegan' 
                    ? 'bg-secondary text-on-secondary' 
                    : 'bg-surface-container hover:bg-surface-container-high text-[#51443f]'
                }`}
              >
                100% Plant-Based/Vegan
              </button>
              <button
                onClick={() => setDietFilter('slow-ferment')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  dietFilter === 'slow-ferment' 
                    ? 'bg-primary-container text-on-primary-container' 
                    : 'bg-surface-container hover:bg-surface-container-high text-[#51443f]'
                }`}
              >
                Slow-Ferment / Sourdoughs
              </button>
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none border-t border-outline-variant/30 pt-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-bold font-sans tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#ffeade] text-[#7d5545] border-2 border-[#7d5545]'
                    : 'bg-transparent text-[#51443f] border-2 border-transparent hover:bg-surface-container'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Live filtered items count */}
        <div className="text-xs text-on-surface-variant/70 mb-4 px-2">
          显示 {filteredItems.length} 个烘焙美食
        </div>

        {/* Product Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }}
                className="bg-[#ffeade] hand-drawn-border p-4 flex flex-col justify-between hover:scale-[1.01] transition-transform duration-200"
              >
                {/* Image Container with organic frame */}
                <div className="relative w-full aspect-square overflow-hidden mb-4 rounded-2xl border border-[#3D2B1F]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover select-none"
                    referrerPolicy="no-referrer"
                  />
                  {item.isFav && (
                    <span className="absolute top-3 left-3 bg-[#e8b4a0] text-[#6a4535] text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 border border-[#3D2B1F]/30">
                      <Heart className="w-3 h-3 fill-[#6a4535]" /> Fave
                    </span>
                  )}
                </div>

                {/* Info and action */}
                <div className="space-y-2 flex-grow">
                  <h3 className="font-serif font-extrabold text-lg text-primary">{item.name}</h3>
                  <p className="font-sans text-xs text-on-surface-variant line-clamp-2 leading-relaxed min-h-[32px]">
                    {item.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-[10px] bg-surface-container-low text-on-surface-variant/80 px-2 py-0.5 rounded-md font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Lower buy section */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-outline-variant/30">
                  <span className="font-serif font-black text-primary text-base">
                    £{item.price.toFixed(2)}
                  </span>
                  
                  <button
                    onClick={() => handleOpenItem(item)}
                    className="bg-primary text-on-primary hover:bg-[#623e2f]/90 text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all select-none cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Customize
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-surface rounded-3xl border-2 border-dashed border-outline-variant/70">
            <p className="text-[#51443f] font-medium text-lg">No treats found matching your filters!</p>
            <p className="text-xs text-on-surface-variant/70 mt-1">Try resetting search tags or dietary filters.</p>
          </div>
        )}

      </div>

      {/* Item Customization Modal Overlay */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-[#28180d]"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.9, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 15, opacity: 0 }}
              className="bg-surface relative w-full max-w-md rounded-3xl p-6 md:p-8 shadow-[0_10px_50px_rgba(40,24,13,0.25)] border-2 border-[#3D2B1F]"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-primary cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <span className="text-[10px] bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-bold uppercase tracking-widest">
                  {selectedItem.category}
                </span>

                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.name} 
                  className="w-full aspect-[16/10] object-cover rounded-2xl border border-outline-variant"
                  referrerPolicy="no-referrer"
                />

                <h3 className="font-serif font-extrabold text-2xl text-primary leading-tight">
                  {selectedItem.name}
                </h3>

                <p className="font-sans text-xs text-on-surface-variant">
                  {selectedItem.description}
                </p>

                {/* Dietary Disclaimer info badge */}
                <div className="bg-surface-container-low rounded-xl p-3 text-[11px] text-on-surface-variant flex items-center gap-2 border border-outline-variant/40">
                  <Sparkles className="w-4 h-4 text-primary shrink-0 animate-bounce" />
                  <span>Always made-to-order: We source award-winning organic wheat flour and natural spring water.</span>
                </div>

                {/* Customize notes input */}
                <div className="space-y-1.5">
                  <label className="font-label-caps text-xs text-primary">Special Baker Notes (optional)</label>
                  <input
                    type="text"
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    placeholder="e.g. Extra Crispy, Gift ribbon, slice it..."
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-3 focus:outline-none focus:border-primary text-xs font-sans"
                  />
                </div>

                {/* Quantity controller */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-label-caps text-xs text-[#51443f] mr-1">Quantity:</span>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-full bg-surface-container hover:bg-[#ffe3d2] text-[#7d5545] font-bold flex items-center justify-center cursor-pointer select-none"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold text-sm text-primary">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-full bg-surface-container hover:bg-[#ffe3d2] text-[#7d5545] font-bold flex items-center justify-center cursor-pointer select-none"
                    >
                      +
                    </button>
                  </div>

                  <span className="font-serif font-extrabold text-lg text-primary">
                    £{(selectedItem.price * quantity).toFixed(2)}
                  </span>
                </div>

                {/* Confirm submit Button */}
                <button
                  onClick={handleAddConfirm}
                  disabled={showConf}
                  className={`w-full py-4 mt-2 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-all select-none ${
                    showConf 
                      ? 'bg-secondary text-on-secondary' 
                      : 'bg-primary text-on-primary hover:bg-[#623e2f]'
                  }`}
                >
                  {showConf ? (
                    <>
                      <Check className="w-5 h-5 text-surface-container-highest animate-ping" />
                      Yum! Added To Bag!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Add to Bag
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
