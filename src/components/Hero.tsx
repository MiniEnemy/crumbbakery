import { useRef, useEffect } from 'react';
import { Sparkles, CalendarRange } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = 360);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = 360;
    };
    window.addEventListener('resize', handleResize);

    // Drip Particle system
    interface IcingDrip {
      x: number;
      y: number;
      targetY: number;
      radius: number;
      speed: number;
      wiggle: number;
      phase: number;
    }

    const drips: IcingDrip[] = [];
    const dripCount = Math.min(Math.floor(width / 35), 35);

    for (let i = 0; i < dripCount; i++) {
      const segmentWidth = width / dripCount;
      const x = i * segmentWidth + segmentWidth / 2 + (Math.random() - 0.5) * 15;
      drips.push({
        x: x,
        y: -10,
        targetY: 80 + Math.random() * 110,
        radius: 12 + Math.random() * 16,
        speed: 0.15 + Math.random() * 0.25,
        wiggle: 1 + Math.random() * 3,
        phase: Math.random() * Math.PI
      });
    }

    let t = 0;
    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);
      t += 0.01;

      // Draw the solid top header icing band
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(width, 0);
      ctx.lineTo(width, 40);

      // Curvy icing body
      for (let x = width; x >= 0; x -= 10) {
        const wave = Math.sin(x * 0.005 + t * 0.6) * 15 + Math.cos(x * 0.02 + t * 0.2) * 5;
        ctx.lineTo(x, 45 + wave);
      }
      ctx.closePath();
      ctx.fill();

      // Draw individual dripping nodes with organic drops
      drips.forEach((drip) => {
        if (drip.y < drip.targetY) {
          drip.y += drip.speed;
        }

        const currentWiggleX = drip.x + Math.sin(t * 1.5 + drip.phase) * drip.wiggle;
        
        ctx.fillStyle = '#ffffff';
        // Draw drip body connecting top
        ctx.beginPath();
        ctx.moveTo(drip.x - drip.radius * 0.7, 40);
        ctx.quadraticCurveTo(drip.x, drip.y - drip.radius, currentWiggleX - drip.radius, drip.y);
        ctx.arc(currentWiggleX, drip.y, drip.radius, Math.PI, 0, true);
        ctx.quadraticCurveTo(drip.x, drip.y - drip.radius, drip.x + drip.radius * 0.7, 40);
        ctx.closePath();
        ctx.fill();

        // Little sheen layer on the icing drops
        ctx.fillStyle = 'rgba(251, 237, 228, 0.45)';
        ctx.beginPath();
        ctx.arc(currentWiggleX - drip.radius * 0.3, drip.y - drip.radius * 0.3, drip.radius * 0.25, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleAction = (id: string) => {
    onNavigate(id);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-surface py-20 md:py-28 lg:py-32">
      {/* Decorative dripping icing simulation */}
      <div className="absolute top-0 left-0 w-full h-[360px] opacity-70 pointer-events-none z-0">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop text-center relative z-10 pt-16">
        
        {/* Established Stamp badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-block"
        >
          <span className="font-accent text-3xl md:text-4xl text-primary mb-3 block transform rotate-[-4deg]">
            Est. 2017
          </span>
        </motion.div>

        {/* Big Premium Header */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif font-extrabold text-4xl sm:text-5xl md:text-6xl text-primary max-w-4xl mx-auto mb-6 tracking-tight leading-tight"
        >
          Harrogate's Favourite Little Craft Bakery
        </motion.h1>

        {/* Brand Copy */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-sans text-lg md:text-xl text-on-surface-variant max-w-xl mx-auto mb-10 leading-relaxed font-medium"
        >
          Hand-kneaded organic sourdoughs, zesty morning buns, and custom buttercream creation cakes baked fresh in Yorkshire since dawn. 
        </motion.p>

        {/* Primary Call-to-actions */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
        >
          <button
            onClick={() => handleAction('menu')}
            className="w-full sm:w-auto bg-primary text-on-primary hover:bg-primary/95 px-8 py-4 rounded-xl font-bold font-sans transition-all flex items-center justify-center gap-2 cursor-pointer btn-bounce shadow-md"
          >
            <Sparkles className="w-5 h-5 text-surface-variant animate-pulse" />
            Explore Daily Menu
          </button>
          
          <button
            onClick={() => handleAction('orders')}
            className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary/5 px-8 py-4 rounded-xl font-bold font-sans transition-all flex items-center justify-center gap-2 cursor-pointer btn-bounce"
          >
            <CalendarRange className="w-5 h-5" />
            Design Celebration Cake
          </button>
        </motion.div>

        {/* Ribbon attributes badges */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-14 opacity-80 text-primary text-xs tracking-wider uppercase font-semibold">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            36-Hour Sourdoughs
          </div>
          <div className="flex items-center gap-2 border-l border-outline-variant/60 pl-6 hidden sm:flex">
            <span className="w-2 h-2 rounded-full bg-primary-container"></span>
            Heritage Yorkshire Flour
          </div>
          <div className="flex items-center gap-2 border-l border-outline-variant/60 pl-6">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            100% Preservative Free
          </div>
        </div>

      </div>

      <div className="custom-divider w-full mt-10"></div>
    </section>
  );
}
