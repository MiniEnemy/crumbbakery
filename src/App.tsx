import React, { useState } from 'react';
import { Mail, ArrowRight, Instagram, Facebook, Compass } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import CakeCustomizer from './components/CakeCustomizer';
import AboutTimeline from './components/AboutTimeline';
import Testimonials from './components/Testimonials';
import LocationHours from './components/LocationHours';
import CartDrawer from './components/CartDrawer';
import { CartItem, MenuItem } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('bakes');
  
  // Newsletter state
  const [newsEmail, setNewsEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Cart operations
  const handleAddToBag = (item: MenuItem, quantity: number, notes?: string) => {
    // Generate unique ID for this specific customization combination
    const id = `${item.id}-${notes || ''}`;

    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + quantity } : i));
      }
      return [...prev, { id, item, quantity, customNotes: notes }];
    });
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Nav scroll controller
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const cartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsEmail('');
    }, 2000);
  };

  return (
    <div className="bg-surface text-on-surface font-sans antialiased min-h-screen">
      
      {/* Premium Sticky Header Navigation */}
      <Header 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      {/* Hero Welcome banner with dripping canvas */}
      <Hero onNavigate={handleNavigate} />

      {/* Menu interactive section */}
      <MenuSection onAddToBag={handleAddToBag} />

      {/* Artisan cake customized sandbox form */}
      <CakeCustomizer onAddToBag={handleAddToBag} />

      {/* Ellie & Rosie timeline about section */}
      <AboutTimeline />

      {/* Loved by locals testimonials reviews block */}
      <Testimonials />

      {/* Map, Opening hours with London time calculator */}
      <LocationHours />

      {/* Sliding Bag/Cart drawer on the right side */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Handcrafted Footer */}
      <footer className="bg-surface-container-low border-t border-outline-variant/60 rounded-t-[40px] mt-12">
        
        {/* Email Subscribe / newsletter section */}
        <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop pt-16 pb-12 border-b border-outline-variant/30 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <span className="font-accent text-3xl text-primary transform rotate-[-3deg] block">Saturday specials</span>
            <h3 className="font-serif font-extrabold text-2xl text-primary">Receive Our Warm Baking Recipes</h3>
            <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
              We send out Ellie&apos;s award-winning sourdough tips and details on limited Saturday morning cake specials once a week. No spam. Only sugar.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <input
                type="email"
                required
                value={newsEmail}
                onChange={(e) => setNewsEmail(e.target.value)}
                placeholder="rose@example.com"
                className="flex-grow bg-[#fff8f5] border border-outline-variant rounded-xl p-3 focus:outline-none focus:border-primary text-xs font-sans"
              />
              <button
                type="submit"
                className="bg-primary text-on-primary hover:bg-[#623e2f] px-6 py-3.5 rounded-xl font-bold font-sans text-xs transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer btn-bounce pr-5"
              >
                {subscribed ? 'Joined the Club!' : 'Subscribe'}
                <ArrowRight className="w-4 h-4 text-surface-variant" />
              </button>
            </form>

            <AnimatePresence>
              {subscribed && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-secondary font-bold"
                >
                  🎉 Sourdough club registered! Flour magic is on the way!
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Lower copyright bar */}
        <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          
          {/* Logo element */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1.5">
            <div className="font-serif font-extrabold text-primary flex items-center gap-2">
              {/* Bakery icon */}
              <span className="text-xl">🧁</span>
              <span>Crumb &amp; Co.</span>
            </div>
            <p className="font-sans text-xs text-on-surface-variant/70">
              © {new Date().getFullYear()} Crumb &amp; Co. Harrogate. Hand-baked in Yorkshire.
            </p>
          </div>

          {/* Social connections */}
          <div className="flex items-center gap-4 text-primary">
            <span className="text-xs font-semibold text-on-surface-variant/80 uppercase tracking-widest hidden md:inline">Follow the Flour:</span>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center border border-outline-variant/40 hover:scale-110 transition-transform text-primary"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center border border-outline-variant/40 hover:scale-110 transition-transform text-primary"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a 
              href="mailto:ellie-and-rosie@crumb-co-harrogate.co.uk"
              className="w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center border border-outline-variant/40 hover:scale-110 transition-transform text-primary"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

        </div>
      </footer>

    </div>
  );
}
