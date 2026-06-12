import { Plus, Minus, Trash2, X, ShoppingBag, Leaf, Award } from 'lucide-react';
import { CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQty, onRemoveItem, onClearCart }: CartDrawerProps) {
  const [checkingOut, setCheckingOut] = useState(false);
  const [success, setSuccess] = useState(false);
  const [customerPhone, setCustomerPhone] = useState('');

  const cartSubtotal = cartItems.reduce((acc, current) => {
    return acc + current.item.price * current.quantity;
  }, 0);

  const estimatedPreparationTime = cartItems.some(i => i.item.category === 'celebration')
    ? '24-48 Hours (Custom Bake)'
    : 'Ready for Collection in 15 Minutes!';

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setCheckingOut(true);
    setTimeout(() => {
      setSuccess(true);
      setCheckingOut(false);
      onClearCart();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#28180d]"
          />

          {/* Drawer container slided from right */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-surface border-l-2 border-[#3D2B1F] flex flex-col justify-between"
            >
              
              {/* Top fixed Header */}
              <div className="p-6 border-b border-outline-variant/40 flex items-center justify-between bg-surface-container-low">
                <div className="flex items-center gap-2 text-primary">
                  <ShoppingBag className="w-5 h-5 text-secondary" />
                  <span className="font-serif font-black text-lg">Your Bake Bag</span>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-surface-container hover:bg-[#ffe3d2] flex items-center justify-center text-primary cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Central Scrollable contents list */}
              <div className="flex-grow p-6 overflow-y-auto space-y-4">
                {success ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10 space-y-4"
                  >
                    <div className="w-16 h-16 bg-[#c5ecc9] rounded-full flex items-center justify-center mx-auto border-2 border-[#2c4e34]">
                      <span className="text-3xl text-secondary">🧁</span>
                    </div>
                    <h3 className="font-serif font-extrabold text-2xl text-primary">Bake Order Stamped!</h3>
                    <p className="font-sans text-xs text-on-surface-variant max-w-xs mx-auto leading-relaxed">
                      We have received your treat request! Ellie is wrapping up your pastries now. Please come over to <strong>12 Montpelier Parade, Dubai</strong> for pickup!
                    </p>
                    <div className="bg-[#fff1ea] p-4 rounded-xl border border-outline-variant text-[11px] text-left text-on-surface-variant max-w-xs mx-auto space-y-1">
                      <p className="font-bold text-primary">🔔 Order Status: Preparing</p>
                      <p>Estimated Pickup: {cartItems.some(i => i.item.category === 'celebration') ? '24 Hours' : '15-20 mins'}</p>
                      <p>Store Code Estimate: #CRUMB-{Math.floor(1000 + Math.random() * 9000)}</p>
                    </div>
                    <button
                      onClick={() => {
                        setSuccess(false);
                        onClose();
                      }}
                      className="bg-primary text-on-primary font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider cursor-pointer"
                    >
                      Done
                    </button>
                  </motion.div>
                ) : cartItems.length > 0 ? (
                  <div className="space-y-4">
                    {cartItems.map((cartItem) => (
                      <div 
                        key={cartItem.id} 
                        className="bg-[#ffeade] p-3 rounded-2xl border border-[#3D2B1F]/30 flex gap-3 relative"
                      >
                        {/* Avatar */}
                        <img 
                          src={cartItem.item.image} 
                          alt={cartItem.item.name} 
                          className="w-16 h-16 object-cover rounded-xl border border-outline-variant shrink-0" 
                          referrerPolicy="no-referrer"
                        />

                        {/* Details */}
                        <div className="flex-grow min-w-0 pr-4">
                          <h4 className="font-serif font-bold text-sm text-primary truncate">
                            {cartItem.item.name}
                          </h4>
                          <p className="text-[11px] text-on-surface-variant italic truncate mt-0.5">
                            {cartItem.customNotes || cartItem.item.description}
                          </p>

                          {/* Control row */}
                          <div className="flex items-center justify-between mt-2.5">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => onUpdateQty(cartItem.id, -1)}
                                className="w-5 h-5 rounded-full bg-surface hover:bg-[#ffe3d2] text-primary flex items-center justify-center font-bold text-[10px] cursor-pointer"
                              >
                                -
                              </button>
                              <span className="text-xs font-bold text-primary w-4 text-center">
                                {cartItem.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQty(cartItem.id, 1)}
                                className="w-5 h-5 rounded-full bg-surface hover:bg-[#ffe3d2] text-primary flex items-center justify-center font-bold text-[10px] cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                            <span className="font-bold text-xs text-primary">
                              AED {(cartItem.item.price * cartItem.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Small Trash can */}
                        <button
                          onClick={() => onRemoveItem(cartItem.id)}
                          className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full hover:bg-error-container text-on-surface-variant hover:text-error flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-outline/50 mx-auto">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <p className="font-sans font-semibold text-sm text-[#51443f]">Your Bake Bag is empty!</p>
                    <p className="text-[11px] text-on-surface-variant/70 leading-relaxed max-w-xs mx-auto">
                      Explore today's zesty lemon drizzle cakes, pillowy cinnamon Chelsea buns, and add items to begin.
                    </p>
                  </div>
                )}
              </div>

              {/* Lower summary / submit block */}
              {!success && (
                <div className="p-6 border-t border-outline-variant/40 bg-surface-container-low space-y-4">
                  {cartItems.length > 0 ? (
                    <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                      
                      {/* ETA indicator */}
                      <div className="bg-[#fff8f5] p-3 rounded-xl border border-outline-variant/40 text-[10px] text-on-surface-variant flex items-center gap-2">
                        <Leaf className="w-3.5 h-3.5 text-secondary shrink-0 animate-bounce" />
                        <div>
                          <p className="font-bold text-secondary">Pickup ETA: {estimatedPreparationTime}</p>
                          <p>Collection Address: 12 Montpelier Parade, Dubai</p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-on-surface-variant">
                          <span>Today's Subtotal</span>
                          <span>AED {cartSubtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xs text-on-surface-variant">
                          <span>VAT (Tax Included)</span>
                          <span>Standard Rate</span>
                        </div>
                        <div className="flex justify-between text-sm font-black text-primary pt-2 border-t border-outline-variant/20">
                          <span>Total Amount</span>
                          <span className="font-serif text-lg">AED {cartSubtotal.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Phone checkout input for notification */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase tracking-wider text-on-surface-variant">
                          Your Mobile for SMS pickup alerts
                        </label>
                        <input
                          type="tel"
                          required
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="07123 456 789"
                          className="w-full bg-[#fff8f5] border border-outline-variant rounded-xl p-3 focus:outline-none focus:border-primary text-xs font-sans"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={checkingOut}
                        className="w-full bg-primary text-on-primary hover:bg-[#623e2f] py-4 rounded-xl font-sans font-bold uppercase text-xs tracking-wider transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer btn-bounce"
                      >
                        {checkingOut ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                            Stamping Order Bag...
                          </>
                        ) : (
                          <>
                            <Award className="w-4 h-4 text-surface-variant animate-pulse" />
                            Submit Order for Pickup
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    <button
                      onClick={onClose}
                      className="w-full bg-[#7d5545] text-on-primary py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer"
                    >
                      Continue Browsing
                    </button>
                  )}
                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
