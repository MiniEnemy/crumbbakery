import React, { useState } from 'react';
import { INITIAL_REVIEWS } from '../MenuData';
import { Review } from '../types';
import { Star, MessageSquareHeart, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !text) return;

    setSubmitting(true);

    setTimeout(() => {
      const newReview: Review = {
        id: `rev-${Date.now()}`,
        author: `${author} (Verified Buyer)`,
        text: text,
        rating: rating,
        date: 'Just now',
        isUserSubmitted: true
      };

      setReviews([newReview, ...reviews]);
      setSuccess(true);
      setSubmitting(false);
      setAuthor('');
      setText('');
      setRating(5);

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }, 800);
  };

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-accent text-3xl text-primary mb-2 block">warm words</span>
          <h2 className="font-serif font-extrabold text-3xl md:text-4xl text-primary">Loved by Locals</h2>
          <div className="w-24 h-1 bg-primary-container mx-auto mt-2 rounded-full"></div>
        </div>

        {/* Existing Reviews Block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <AnimatePresence mode="popLayout">
            {reviews.map((rev, index) => (
              <motion.div
                key={rev.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative p-8 bg-[#F5DEB3] rounded-3xl border-2 border-[#3D2B1F] flex flex-col justify-between"
              >
                {/* Vintage quotation marks styling */}
                <span className="absolute -top-3 left-4 text-[#e8b4a0] text-7xl font-serif select-none pointer-events-none opacity-45">
                  “
                </span>

                <div className="space-y-4 relative z-10">
                  {/* Stars indicators */}
                  <div className="flex gap-0.5 text-primary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-primary' : 'opacity-20'}`} 
                      />
                    ))}
                  </div>

                  <p className="font-sans text-xs italic text-on-surface leading-relaxed">
                    {rev.text}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#3D2B1F]/15 flex items-center justify-between">
                  <span className="font-accent text-[#7d5545] font-black text-[15px] block truncate max-w-[140px]">
                    {rev.author}
                  </span>
                  <span className="text-[10px] text-on-surface-variant font-medium">
                    {rev.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Review writer form */}
        <div className="max-w-xl mx-auto bg-surface-container-low border-2 border-[#3D2B1F] rounded-3xl p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2 mb-2 text-primary">
            <MessageSquareHeart className="w-5 h-5" />
            <h3 className="font-serif font-black text-lg">Leave Ellie &amp; Rosie a Review</h3>
          </div>

          <form onSubmit={handleReviewSubmit} className="space-y-4">
            
            {/* Star Rating Picker */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-on-surface">Your Rating:</span>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="text-primary hover:scale-115 active:scale-95 transition-transform cursor-pointer"
                  >
                    <Star className={`w-6 h-6 ${star <= rating ? 'fill-primary text-primary' : 'text-outline/30'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Author Input */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface">Your Name / Town</label>
              <input
                type="text"
                value={author}
                required
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Sarah J. from Dubai"
                className="w-full bg-[#fff8f5] border border-outline-variant rounded-xl p-3 focus:outline-none focus:border-primary text-xs font-sans"
              />
            </div>

            {/* Review text */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface">Your Experience</label>
              <textarea
                value={text}
                required
                onChange={(e) => setText(e.target.value)}
                placeholder="The crumb was perfect, highly recommend..."
                rows={3}
                className="w-full bg-[#fff8f5] border border-outline-variant rounded-xl p-3 focus:outline-none focus:border-primary text-xs font-sans"
              />
            </div>

            {/* Send Button */}
            <button
              type="submit"
              disabled={submitting || success}
              className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold font-sans text-xs tracking-wider uppercase transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer btn-bounce"
            >
              {submitting ? 'Stamping Receipt card...' : 'Publish Testimonial'}
            </button>

            {/* Success message */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-[#c5ecc9] border border-[#4a6c50] text-[#2c4e34] p-3 rounded-xl flex items-center gap-2 text-xs font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Review published live below Ellie &amp; Rosie's Board! Thank you!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

      </div>
    </section>
  );
}
