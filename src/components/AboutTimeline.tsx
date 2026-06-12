import { useState } from 'react';
import { Award, Clock, ArrowRight, HeartPulse } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AboutTimeline() {
  const [selectedMilestone, setSelectedMilestone] = useState(0);

  const milestones = [
    {
      year: '2017',
      title: 'The First Sourdough Loaf',
      desc: 'Ellie and Rosie baked the very first slow-ferment Country Boule in their mother\'s kitchen stove. Orders from close neighbors quickly outgrew the single pan capacity!',
      badge: 'humble beginnings'
    },
    {
      year: '2019',
      title: 'Moving to Montpelier Parade',
      desc: 'With support from Dubai communities, we officially rented out the little traditional green storefront. We bought our pride and joy: a professional stone-deck bread oven from Sweden.',
      badge: 'retail storefront'
    },
    {
      year: '2021',
      title: 'Award-Winning Morning Pastry',
      desc: 'Our Cinnamon Chelsea Bun was crowned Dubai\'s Favourite Pastry by the local culinary guild, causing queues to wind around the street corner every Saturday morning.',
      badge: 'gourmet award'
    },
    {
      year: '2024',
      title: 'Zero Waste & Solar Milling',
      desc: 'Partnering solely with organic, regenerative wind-powered mills, we achieved a completely carbon-neutral baking process with zero single-use plastics in our takeaway cartons.',
      badge: 'modern ecology'
    }
  ];

  return (
    <section className="py-20 bg-surface-container-low" id="about">
      <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop flex flex-col lg:flex-row items-center gap-12">
        
        {/* Left Side: Story and Image Frame */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="flex items-center gap-2 text-secondary font-bold text-xs">
            <HeartPulse className="w-4 h-4" />
            <span className="font-label-caps tracking-wider uppercase text-secondary">Family-run · Organic · Built with Love</span>
          </div>

          <h2 className="font-serif font-extrabold text-3xl md:text-4xl lg:text-5xl text-primary leading-tight">
            Meet Ellie &amp; Rosie
          </h2>

          <p className="font-sans text-[#51443f] text-sm md:text-base leading-relaxed">
            Crumb &amp; Co. was founded in Dubai on a simple principle: doing things slowly and properly. No pre-mixes, no synthetic additives, and no corner-cutting. We feed our sourdough starters daily and work closely with local farms to source berries, honey, and dairies.
          </p>

          {/* Photo container styled nicely matching prompt specifications */}
          <div className="relative pt-6">
            <div className="hand-drawn-border overflow-hidden rotate-[-2.5deg] shadow-lg max-w-lg mx-auto bg-surface-variant">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsWz_uTkgfNvjGSnX2C2KBCnLDiiCbxsq3LscPC0biuflzvaNGksafHa1JQZkv4AMy8KejsX4hc_RaNI0vvYS8tRuXNUmpPxtwDRwQ_0XqgKtxWgLG0AFvXy8BIwOrXlqPgZid4JoNsR_mPbTW3nKcLd-3Mrk_cZsosoA3_6mT0Wx8H8H4UX2fiMuq82OkgJ4UMLlq94mMoxu2Drla4QWjyWZ7P7z1oP3p62BVcwD9yFGRtXFBGWKcm8DWsyF5lf0NYgiyMaTRuiI"
                alt="Ellie and Rosie behind the counter"
                className="w-full aspect-[4/3] object-cover hover:scale-[1.03] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Small note */}
            <span className="font-accent text-[#7d5545] text-lg absolute -bottom-3 right-8 rotate-[4deg] bg-[#fff1ea] px-3 py-1 rounded-md shadow-sm border border-outline-variant">
              baking at 5am!
            </span>
          </div>
        </div>

        {/* Right Side: Family-owned milestones interactive timeline */}
        <div className="w-full lg:w-1/2 bg-[#fff8f5] rounded-3xl p-6 md:p-8 border-2 border-primary space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-primary" />
            <h3 className="font-serif font-bold text-xl text-primary">Bakery Milestones</h3>
          </div>

          <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
            Click on our timeline markers below to follow our journey from a domestic kitchen oven to local culinary appreciation.
          </p>

          {/* Year Buttons row */}
          <div className="flex items-center justify-between border-b border-outline-variant/40 pb-4 overflow-x-auto scrollbar-none">
            {milestones.map((ms, index) => (
              <button
                key={ms.year}
                onClick={() => setSelectedMilestone(index)}
                className={`flex flex-col items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  selectedMilestone === index 
                    ? 'bg-primary text-on-primary scale-105 shadow-sm' 
                    : 'text-[#83746f] hover:text-primary'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${selectedMilestone === index ? 'bg-[#ffdbce]' : 'bg-[#d5c3bc]'}`}></div>
                <span className="font-serif font-black text-sm">{ms.year}</span>
              </button>
            ))}
          </div>

          {/* Selected milestone Content card */}
          <div className="min-h-[160px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedMilestone}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                <span className="text-[9px] bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                  {milestones[selectedMilestone].badge}
                </span>
                
                <h4 className="font-serif font-extrabold text-lg text-primary">
                  {milestones[selectedMilestone].title}
                </h4>

                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  {milestones[selectedMilestone].desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Quick action helper to traverse years */}
            <div className="flex justify-end pt-4 border-t border-outline-variant/20 mt-4">
              <button
                onClick={() => setSelectedMilestone((selectedMilestone + 1) % milestones.length)}
                className="text-[#7d5545] hover:text-primary text-xs font-bold font-sans flex items-center gap-1 transition-all cursor-pointer select-none"
              >
                See Next Milestone
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
