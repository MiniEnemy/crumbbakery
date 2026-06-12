import React, { useState, useMemo } from 'react';
import { ChefHat, Info, Check, Plus, AlertCircle, ShoppingCart } from 'lucide-react';
import { MenuItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CakeCustomizerProps {
  onAddToBag: (item: MenuItem, quantity: number, notes?: string) => void;
}

export default function CakeCustomizer({ onAddToBag }: CakeCustomizerProps) {
  const [flavour, setFlavour] = useState('Lemon Sicilian Drizzle');
  const [size, setSize] = useState('8" Medium (Serves 10-12)');
  const [frostingStyle, setFrostingStyle] = useState('Rustic Semi-Naked');
  const [requirements, setRequirements] = useState<string[]>([]);
  const [inscription, setInscription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const flavours = [
    { name: 'Lemon Sicilian Drizzle', color: '#FFF2B2', highlight: 'Fresh Amalfi organic lemon juice and candied rind' },
    { name: 'Rich Chocolate Fudge Drip', color: '#4E3629', highlight: 'Decadent 70% dark Belgian cocoa and chocolate ganache' },
    { name: 'Vanilla Bean & Rose Jam', color: '#FFF8F4', highlight: 'Wild English roses macerated with real vanilla bean pods' },
    { name: 'Vegan Raspberry Dream', color: '#F7A3B7', highlight: 'Moist oat milk plant sponge packed with hand-picked raspberries' },
    { name: 'Salted Caramel Buttercream', color: '#D4A373', highlight: 'Rich caramel sauce cooked with Cornish sea salt flakes' }
  ];

  const sizes = [
    { name: '6" Small (Serves 6-8)', add: 0, text: 'Compact, cozy and perfect for intimate key gatherings.' },
    { name: '8" Medium (Serves 10-12)', add: 10, text: 'Our most popular size, ideal for standard family parties.' },
    { name: '10" Large (Serves 16-20)', add: 20, text: 'Expansive two-tier treat for beautiful, grand celebrations.' }
  ];

  const frostings = ['Rustic Semi-Naked', 'Creamy Soft Swirls', 'Classic Smooth Fondant', 'Woven Buttercream Buds'];

  const diets = ['Gluten-Free Flour', 'Dairy-Free Butter', 'Nut-Free Recipe'];

  const currentFlavourDetails = useMemo(() => {
    return flavours.find((f) => f.name === flavour) || flavours[0];
  }, [flavour]);

  const currentSizeDetails = useMemo(() => {
    return sizes.find((s) => s.name === size) || sizes[1];
  }, [size]);

  const calculatedPrice = useMemo(() => {
    const base = 25; // 6" base
    const addPrice = currentSizeDetails.add;
    const requirementsAdd = requirements.length * 2.50; // extra cost for custom allergy subs
    return base + addPrice + requirementsAdd;
  }, [currentSizeDetails, requirements]);

  const ingredientsList = useMemo(() => {
    const arr = ['Local Free-Range Eggs', 'Premium Unrefined Sugar', 'Double Whipped Normandy Butter'];
    if (requirements.includes('Gluten-Free Flour')) {
      arr[1] = 'Grounded Rice & Almond Flour Mixture';
    }
    if (requirements.includes('Dairy-Free Butter')) {
      arr[2] = 'Purified Organic Coconut Fat Butter alternative';
    }
    return [...arr, currentFlavourDetails.highlight];
  }, [requirements, currentFlavourDetails]);

  const handleDietToggle = (diet: string) => {
    if (requirements.includes(diet)) {
      setRequirements(requirements.filter((r) => r !== diet));
    } else {
      setRequirements([...requirements, diet]);
    }
  };

  const handleCustomCakeAdd = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a virtual menu item representing this custom cake
    const customCakeItem: MenuItem = {
      id: `custom-cake-${Date.now()}`,
      name: `Custom ${flavour} Cake`,
      description: `A custom-baked cake with details: Size: ${size}, Frosting style: ${frostingStyle}, Dietary needs: ${requirements.join(', ') || 'Classic Recipe'}, Inside note: "${inscription || 'None'}"`,
      price: calculatedPrice,
      category: 'celebration',
      tags: ['Bespoke Customizer', 'Freshly Handcrafted'],
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600'
    };

    onAddToBag(customCakeItem, 1, `Inscription: "${inscription || 'None'}"`);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setInscription('');
      setRequirements([]);
    }, 1500);
  };

  return (
    <section className="py-20 px-margin-mobile md:px-margin-desktop bg-surface-container" id="orders">
      <div className="max-w-[1240px] mx-auto">
        <div className="text-center mb-12">
          <span className="font-accent text-3xl text-primary mb-2 block">bespoke craft</span>
          <h2 className="font-serif font-extrabold text-3xl md:text-4xl text-primary">Design Your Celebration Cake</h2>
          <div className="w-24 h-1 bg-[#e8b4a0] mx-auto mt-2 rounded-full"></div>
          <p className="font-sans text-on-surface-variant max-w-lg mx-auto mt-3 text-sm">
            Select your recipe elements below and we will prepare a bespoke recipe estimation card with custom pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Customizer form columns */}
          <form onSubmit={handleCustomCakeAdd} className="lg:col-span-7 bg-[#fff8f5] rounded-3xl p-6 md:p-8 space-y-8 border-2 border-[#3D2B1F]">
            
            {/* Step 1: Flavour */}
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-xl text-primary flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-secondary" />
                1. Choose Cake Flavour Base
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {flavours.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setFlavour(item.name)}
                    className={`p-4 rounded-xl text-left border-2 transition-all flex items-center gap-3 cursor-pointer ${
                      flavour === item.name 
                        ? 'border-[#7d5545] bg-[#ffeade]' 
                        : 'border-outline-variant hover:border-[#7d5545]/40 bg-surface'
                    }`}
                  >
                    {/* Colour spot simulation */}
                    <div 
                      className="w-5 h-5 rounded-full border border-black/10 shrink-0" 
                      style={{ backgroundColor: item.color }} 
                    />
                    <div>
                      <p className="font-bold text-xs text-primary">{item.name}</p>
                      <p className="text-[10px] text-on-surface-variant leading-tight mt-0.5 line-clamp-1">
                        {item.highlight}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Size */}
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-xl text-primary flex items-center gap-2">
                <Info className="w-5 h-5 text-secondary" />
                2. Select Layer Size
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                {sizes.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setSize(item.name)}
                    className={`p-4 rounded-xl text-left border-2 transition-all flex flex-col justify-between cursor-pointer ${
                      size === item.name 
                        ? 'border-primary bg-primary-container/20' 
                        : 'border-outline-variant hover:border-primary/40 bg-surface'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-xs text-primary">{item.name}</p>
                      <p className="text-[10px] text-on-surface-variant leading-tight mt-1">
                        {item.text}
                      </p>
                    </div>
                    {item.add > 0 && (
                      <span className="text-[10px] text-secondary font-black mt-3">
                        +£{item.add.toFixed(2)}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Frosting Type */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-sm text-[#7d5545]">3. Buttercream &amp; Frosting Finish</h4>
              <div className="flex flex-wrap gap-2 pt-1">
                {frostings.map((finish) => (
                  <button
                    key={finish}
                    type="button"
                    onClick={() => setFrostingStyle(finish)}
                    className={`px-4 py-2 text-xs font-bold rounded-lg border-2 transition-all cursor-pointer ${
                      frostingStyle === finish 
                        ? 'bg-secondary text-on-secondary border-secondary' 
                        : 'bg-surface border-outline-variant hover:border-secondary-container'
                    }`}
                  >
                    {finish}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Allergens */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-sm text-[#7d5545] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-secondary" />
                4. Adjust Recipe Requirements (Optional)
              </h4>
              <p className="text-[11px] text-on-surface-variant">
                We safely substitute classic ingredients using sterile containers. Surcharge of +£2.50 per replacement applies.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 animate-pulse">
                {diets.map((diet) => {
                  const hasDiet = requirements.includes(diet);
                  return (
                    <button
                      key={diet}
                      type="button"
                      onClick={() => handleDietToggle(diet)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 cursor-pointer ${
                        hasDiet 
                          ? 'bg-[#c5ecc9] text-[#2c4e34] border-[#4a6c50]' 
                          : 'bg-surface border-outline-variant text-[#51443f]'
                      }`}
                    >
                      <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${hasDiet ? 'bg-secondary text-white' : 'bg-outline/20'}`}>
                        {hasDiet && <Check className="w-2.5 h-2.5" />}
                      </div>
                      {diet}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Inscription */}
            <div className="space-y-2">
              <h4 className="font-serif font-bold text-sm text-primary">5. Hand-Drawn Inscription Greeting</h4>
              <input
                type="text"
                maxLength={45}
                value={inscription}
                onChange={(e) => setInscription(e.target.value)}
                placeholder="e.g. Happy 30th Birthday Thomas!"
                className="w-full bg-surface-container-low border-2 border-primary rounded-xl p-3 focus:outline-none focus:border-secondary text-sm font-sans"
              />
              <p className="text-[10px] text-on-surface-variant/70 text-right">
                {inscription.length}/45 characters maximum
              </p>
            </div>

          </form>

          {/* Right sidebar: Hand-drawn estimated Receipt card and virtual design */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual Cake representation */}
            <div className="bg-[#fbddca] rounded-3xl p-6 border-2 border-[#3D2B1F] flex flex-col items-center text-center relative overflow-hidden shadow-inner min-h-[220px] justify-center">
              
              {/* Spinning star sparkles background */}
              <div className="absolute top-2 right-2 animate-spin duration-1000">✨</div>
              
              {/* Dynamic Buttercream Cake shape rendering */}
              <div className="relative w-36 h-36 mt-4 flex items-end justify-center">
                
                {/* Cake base layer */}
                <div 
                  className="w-32 h-16 rounded-b-[20px] border-2 border-[#3D2B1F] shadow-lg relative z-10 transition-colors duration-500"
                  style={{ backgroundColor: currentFlavourDetails.color }}
                >
                  {/* Decorative frosting piping */}
                  <div className="absolute top-1 left-0 w-full flex justify-around opacity-75">
                    <span className="text-[10px]">🧁</span>
                    <span className="text-[10px]">🧁</span>
                    <span className="text-[10px]">🧁</span>
                  </div>

                  {/* Mid jam Layer */}
                  <div className="absolute top-6 left-0 w-full h-1.5 bg-[#ba1a1a] opacity-80" />
                </div>

                {/* Cake top layer */}
                <div 
                  className="w-28 h-12 rounded-t-[12px] border-2 border-[#3D2B1F] border-b-0 absolute bottom-12 z-20 transition-colors duration-500 flex items-center justify-center"
                  style={{ backgroundColor: currentFlavourDetails.color }}
                >
                  {/* Frosted style indicator marker line */}
                  <div className="w-full text-center text-[10px] opacity-70 italic font-accent text-on-surface select-none pt-2">
                    {frostingStyle}
                  </div>
                </div>

                {/* Cake Candle sparkles */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 font-bold animate-bounce text-xl">
                  🕯️
                </div>

              </div>

              {/* Dynamic Greeting note attached to preview */}
              <div className="mt-6 z-10">
                <span className="font-accent text-[#7d5545] font-black text-xl italic drop-shadow-sm select-none break-all max-w-[280px] block">
                  {inscription ? `"${inscription}"` : '"Your Inscription Here"'}
                </span>
                <p className="font-label-caps text-[9px] uppercase tracking-widest text-on-surface-variant mt-1.5">
                  Virtual Cake Blueprint
                </p>
              </div>

            </div>

            {/* Simulated Receipt estimate */}
            <div className="bg-[#FAF3E8] rounded-3xl p-6 border-2 border-[#3D2B1F] relative space-y-4 shadow-md font-mono text-xs text-on-surface">
              
              {/* Hand-drawn check details */}
              <div className="border-b border-dashed border-[#3D2B1F]/40 pb-4 text-center">
                <p className="font-serif font-black text-lg text-primary">Crumb &amp; Co. Bake Note</p>
                <p className="text-[10px] text-on-surface-variant italic mt-0.5">Harrogate, North Yorkshire</p>
              </div>

              <div className="space-y-2 border-b border-dashed border-[#3D2B1F]/40 pb-4">
                <div className="flex justify-between">
                  <span>Size: {size.split(' ')[0]} Layer</span>
                  <span className="font-bold">£25.00</span>
                </div>
                {currentSizeDetails.add > 0 && (
                  <div className="flex justify-between text-on-surface-variant">
                    <span>.. Size Surcharge</span>
                    <span>+£{currentSizeDetails.add.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Flavor: {flavour.split(' ')[0]}</span>
                  <span className="text-secondary font-bold">Included</span>
                </div>
                <div className="flex justify-between">
                  <span>Decoration Style</span>
                  <span className="text-secondary font-bold">Included</span>
                </div>
                
                {requirements.map((req) => (
                  <div key={req} className="flex justify-between text-[#83746f]">
                    <span>.. Sub: {req.split(' ')[0]}</span>
                    <span>+£2.50</span>
                  </div>
                ))}
              </div>

              {/* Baked details list */}
              <div className="space-y-1">
                <p className="font-serif text-[#7d5545] font-extrabold text-[11px] uppercase">Gourmet Core Ingredients:</p>
                <div className="grid grid-cols-2 gap-y-1 gap-x-2 text-[10px] text-on-surface-variant">
                  {ingredientsList.map((ing, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#44664b] rounded-full shrink-0"></span>
                      <span className="truncate">{ing}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total estimation */}
              <div className="flex items-center justify-between pt-4 border-t border-[#3D2B1F]/60">
                <span className="font-bold text-sm">Estimated Total:</span>
                <span className="font-serif text-2xl font-black text-[#7d5545]">
                  £{calculatedPrice.toFixed(2)}
                </span>
              </div>

              <button
                type="submit"
                onClick={handleCustomCakeAdd}
                disabled={submitted}
                className={`w-full py-4 rounded-xl font-sans font-bold uppercase text-xs tracking-wider transition-all shadow-md mt-2 flex items-center justify-center gap-2 cursor-pointer ${
                  submitted 
                    ? 'bg-secondary text-on-secondary' 
                    : 'bg-primary text-on-primary hover:bg-[#623e2f]'
                }`}
              >
                {submitted ? (
                  <>
                    <Check className="w-4 h-4 text-surface" />
                    Estimate Sent to Bakery Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 text-surface-variant" />
                    Secure Customize Order
                  </>
                )}
              </button>

              <p className="text-[9px] text-[#83746f] text-center leading-relaxed">
                Estimate includes free local collection from Montpelier Parade. Cancellations made 48 hours prior to selected bake date are fully refunded.
              </p>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
