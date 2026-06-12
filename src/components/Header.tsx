import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (section: string) => void;
  activeSection: string;
}

export default function Header({ cartCount, onOpenCart, onNavigate, activeSection }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'bakes', label: 'Our Favourites' },
    { id: 'menu', label: 'Interactive Menu' },
    { id: 'about', label: ' Ellie & Rosie' },
    { id: 'orders', label: 'Cake Customizer' },
    { id: 'find-us', label: 'Find Us' }
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${
      scrolled 
        ? 'bg-surface/90 backdrop-blur-md py-3 shadow-[0_4px_30px_rgba(40,24,13,0.06)] border-b border-outline-variant/40' 
        : 'bg-transparent py-5'
    }`}>
      <nav className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center">
        
        {/* Logo and Brand */}
        <div 
          onClick={() => handleLinkClick('bakes')}
          className="flex items-center gap-2 cursor-pointer active:scale-95 transition-all text-primary"
        >
          {/* Decorative Logo Stamp */}
          <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center border border-primary/20 shadow-inner">
            <span className="font-accent-text text-xl font-bold pt-1 text-on-primary-container">C</span>
          </div>
          <span className="font-serif font-extrabold text-lg tracking-tight hidden sm:inline-block">
            Crumb &amp; Co.
          </span>
          <span className="font-accent-text text-md text-primary font-bold pl-1 sm:hidden">
            Crumb &amp; Co.
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`font-label-caps text-label-caps transition-all py-1 cursor-pointer border-b-2 ${
                  isActive 
                    ? 'text-primary border-primary font-extrabold' 
                    : 'text-on-surface-variant hover:text-primary border-transparent'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Action Widgets */}
        <div className="flex items-center gap-3">
          
          {/* Toggle Menu Assistant or Order Bag */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenCart}
            id="cart-trigger-btn"
            className="relative w-11 h-11 rounded-full bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant flex items-center justify-center text-primary cursor-pointer shadow-sm"
          >
            <ShoppingBag className="w-5 h-5" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-secondary text-on-secondary text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold font-sans border-2 border-surface"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Quick Order Button */}
          <button 
            onClick={() => handleLinkClick('orders')}
            className="hidden sm:flex bg-primary text-on-primary hover:bg-primary/95 text-xs tracking-wider uppercase font-semibold px-5 py-2.5 rounded-full transition-transform active:scale-95 items-center gap-2 cursor-pointer shadow-sm btn-bounce"
          >
            <Gift className="w-3.5 h-3.5" />
            Custom Cake
          </button>

          {/* Mobile Hamburger toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full hover:bg-surface-container-high flex items-center justify-center text-primary cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface-container-low border-b border-outline-variant/60"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left font-label-caps text-sm tracking-widest text-[#51443f] active:text-primary py-2.5 border-b border-outline-variant/20`}
                >
                  {link.label}
                </button>
              ))}
              <button 
                onClick={() => handleLinkClick('orders')}
                className="w-full bg-[#7d5545] text-on-primary py-3 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-secondary animate-ping"></div>
                Custom Cake Builder
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
