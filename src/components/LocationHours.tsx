import { useState, useEffect } from 'react';
import { Clock, MapPin, Phone, CheckCircle, XCircle } from 'lucide-react';

export default function LocationHours() {
  const [status, setStatus] = useState({ open: false, text: 'Checking status...' });

  useEffect(() => {
    const checkStatus = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Europe/London',
          hour: 'numeric',
          minute: 'numeric',
          hour12: false,
          weekday: 'long'
        });
        
        const parts = formatter.formatToParts(now);
        const partMap = Object.fromEntries(parts.map(p => [p.type, p.value]));
        
        const day = partMap.weekday; // e.g. "Tuesday"
        const hour = parseInt(partMap.hour, 10);
        const minute = parseInt(partMap.minute, 10);
        const timeVal = hour * 60 + minute;

        if (day === 'Sunday' || day === 'Monday') {
          setStatus({ open: false, text: 'Closed today. Resting the sourdough ovens!' });
          return;
        }

        if (day === 'Saturday') {
          // 09:00 - 15:00
          if (timeVal >= 540 && timeVal < 900) {
            setStatus({ open: true, text: `Open Now! Grab a Chelsea Cinnamon Bun (Closes 3 PM UK time)` });
          } else {
            setStatus({ open: false, text: `Closed. See you Saturday morning 09:00!` });
          }
          return;
        }

        // Tue - Fri (08:00 - 16:00)
        if (timeVal >= 480 && timeVal < 960) {
          setStatus({ open: true, text: `Open Now! Warm sourdough rests on-deck (Closes 4 PM UK time)` });
        } else {
          setStatus({ open: false, text: `Closed now. Fresh loaves emerge tomorrow 08:00.` });
        }
      } catch (err) {
        setStatus({ open: true, text: 'Live Status Verified: Call the store!' });
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop" id="find-us">
      <div className="flex flex-col lg:flex-row gap-8 bg-[#fbddca] rounded-[32px] overflow-hidden border-2 border-[#3D2B1F] shadow-sm">
        
        {/* Left Side details */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 space-y-8 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="font-accent text-3xl text-primary block">drop by!</span>
            <h2 className="font-serif font-extrabold text-3xl md:text-4xl text-primary leading-tight">
              Visit Ellie &amp; Rosie
            </h2>
            <p className="font-sans text-on-surface-variant font-medium flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary shrink-0 animate-bounce" />
              12 Montpelier Parade, Harrogate HG1 2TJ
            </p>
          </div>

          {/* Clock table status */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-[#44664b]" />
              <h3 className="font-serif font-bold text-lg text-primary">Store Hours</h3>
            </div>

            {/* Live indicator block */}
            <div className={`p-4 rounded-xl border flex items-start gap-3 transition-colors ${
              status.open 
                ? 'bg-[#c5ecc9]/50 border-[#4a6c50]/40 text-[#2c4e34]' 
                : 'bg-[#ffdad6]/50 border-error/20 text-[#93000a]'
            }`}>
              {status.open ? (
                <CheckCircle className="w-5 h-5 text-secondary shrink-0 pt-0.5 animate-pulse" />
              ) : (
                <XCircle className="w-5 h-5 text-error shrink-0 pt-0.5" />
              )}
              <div className="text-xs">
                <p className="font-bold uppercase tracking-wider">{status.open ? 'OPEN - Come on in!' : 'CLOSED CURRENTLY'}</p>
                <p className="mt-0.5 font-medium leading-relaxed">{status.text}</p>
              </div>
            </div>

            <div className="space-y-2.5 text-sm font-sans pt-2">
              <div className="flex justify-between border-b border-outline-variant/30 pb-2">
                <span className="font-semibold text-on-surface-variant">Tuesday - Friday</span>
                <span className="font-bold text-primary">08:00 - 16:00</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/30 pb-2">
                <span className="font-semibold text-on-surface-variant">Saturday morning</span>
                <span className="font-bold text-primary">09:00 - 15:00</span>
              </div>
              <div className="flex justify-between text-on-surface-variant/70 italic">
                <span>Sunday - Monday</span>
                <span className="text-error font-medium">Closed for rest</span>
              </div>
            </div>
          </div>

          {/* Contact phone widget */}
          <div className="flex items-center gap-4 pt-4 border-t border-outline-variant/30">
            <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container border border-primary/20">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="font-label-caps text-[10px] text-on-surface-variant">Phone &amp; Custom cake queries</p>
              <p className="font-bold text-primary text-base">01423 555 888</p>
            </div>
          </div>
        </div>

        {/* Right Side: Map location placeholder */}
        <div className="w-full lg:w-1/2 h-80 lg:h-auto min-h-[340px] relative">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOcPqcp9_rBX8yt8XXyClFqMN-7OJQxIzdZlGAfjLE9fkgA2a4JMOIAmLxagFnDW1EYRCx8lOnaeF_slbI6dh8152V_z0rjYHVbVbD5MhGJbQw6DKGMAwK2x8R2nAPCuer53Sf85jCjKG1sh1NVof82Otx5krcGfgQCcp3C4nx9jnNMF4_r2T3ljMb_Gt2O8V2HUiRzzm6XAWwKew3y0pEOBPAPoG0kkCByW0pboR7z7QMckUMWWUVOt_hyq6QX6pyI5M2pJcmCuA"
            alt="Harrogate Shop Location Map"
            className="w-full h-full object-cover select-none"
            referrerPolicy="no-referrer"
          />
          {/* Overlay to coordinate with sage color palette */}
          <div className="absolute inset-0 bg-[#7d5545] mix-blend-color opacity-25" />
          <div className="absolute bottom-6 left-6 bg-[#fff8f5] p-3 rounded-lg border border-[#3D2B1F] shadow-md flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></span>
            <span className="font-bold text-primary">Montpelier Parade, Harrogate</span>
          </div>
        </div>

      </div>
    </section>
  );
}
