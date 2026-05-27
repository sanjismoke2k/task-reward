import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Gamepad2, Star, Smartphone, Gem, Flame, Zap, Trophy, Target,
  ArrowRight, Loader2, ClipboardCheck, ImageOff,
} from 'lucide-react';

const ICON_MAP = { Gamepad2, Star, Smartphone, Gem, Flame, Zap, Trophy, Target };
const ICON_NAMES = ['Gamepad2', 'Star', 'Smartphone', 'Gem', 'Flame', 'Zap', 'Trophy', 'Target'];

const COLOR_CONFIG = [
  {
    bg: 'bg-blue-500/10',
    text: 'text-blue-500 dark:text-blue-400',
    ring: 'ring-blue-500/20',
    glow: 'from-blue-500/8 via-transparent to-transparent',
    badge: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 ring-1 ring-blue-500/20',
  },
  {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-500 dark:text-emerald-400',
    ring: 'ring-emerald-500/20',
    glow: 'from-emerald-500/8 via-transparent to-transparent',
    badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20',
  },
  {
    bg: 'bg-violet-500/10',
    text: 'text-violet-500 dark:text-violet-400',
    ring: 'ring-violet-500/20',
    glow: 'from-violet-500/8 via-transparent to-transparent',
    badge: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 ring-1 ring-violet-500/20',
  },
  {
    bg: 'bg-amber-500/10',
    text: 'text-amber-500 dark:text-amber-400',
    ring: 'ring-amber-500/20',
    glow: 'from-amber-500/8 via-transparent to-transparent',
    badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/20',
  },
  {
    bg: 'bg-rose-500/10',
    text: 'text-rose-500 dark:text-rose-400',
    ring: 'ring-rose-500/20',
    glow: 'from-rose-500/8 via-transparent to-transparent',
    badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-1 ring-rose-500/20',
  },
  {
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-500 dark:text-cyan-400',
    ring: 'ring-cyan-500/20',
    glow: 'from-cyan-500/8 via-transparent to-transparent',
    badge: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 ring-1 ring-cyan-500/20',
  },
  {
    bg: 'bg-indigo-500/10',
    text: 'text-indigo-500 dark:text-indigo-400',
    ring: 'ring-indigo-500/20',
    glow: 'from-indigo-500/8 via-transparent to-transparent',
    badge: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 ring-1 ring-indigo-500/20',
  },
  {
    bg: 'bg-orange-500/10',
    text: 'text-orange-500 dark:text-orange-400',
    ring: 'ring-orange-500/20',
    glow: 'from-orange-500/8 via-transparent to-transparent',
    badge: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 ring-1 ring-orange-500/20',
  },
];

// Clean HTML entities from anchor text
function cleanHtml(str) {
  if (!str) return str;
  const el = document.createElement('div');
  el.innerHTML = str;
  return el.textContent || el.innerText || str;
}

export default function OfferCard({ offer, index, isPending, onStart }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  // === Map EXACT API fields ===
  const id = String(offer.id || offer.offer_id || '');
  const name = offer.name || 'Exclusive Offer';
  const anchor = cleanHtml(offer.anchor) || '';
  const conversion = offer.conversion || '';            // "Register (New Users Only)", "Complete with valid info"
  const networkIcon = offer.network_icon || null;       // The offer image/logo
  const payout = parseFloat(offer.user_payout || offer.payout || offer.amount || 0);
  const url = offer.url || offer.link || '#';

  const colorIdx = (parseInt(id) || index) % COLOR_CONFIG.length;
  const colors = COLOR_CONFIG[colorIdx];
  const FallbackIcon = ICON_MAP[ICON_NAMES[colorIdx]];

  const hasIcon = networkIcon && !imgError;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="relative bg-white dark:bg-gray-900/80 rounded-[1.25rem] border border-gray-200/80 dark:border-gray-700/50 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
        {/* Hover glow */}
        <div className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${colors.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

        <div className="relative p-4 sm:p-5">
          {/* Row 1: Icon/Image + Name + Payout */}
          <div className="flex items-start gap-3.5">
            {/* Offer Image or Fallback Icon */}
            <div className="flex-shrink-0">
              {hasIcon ? (
                <div className={`w-[52px] h-[52px] rounded-[14px] overflow-hidden ring-1 ${colors.ring} bg-white dark:bg-gray-800 group-hover:scale-105 transition-transform duration-300 relative`}>
                  {!imgLoaded && (
                    <div className="absolute inset-0 skeleton rounded-[14px]" />
                  )}
                  <img
                    src={networkIcon}
                    alt={name}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setImgLoaded(true)}
                    onError={() => setImgError(true)}
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className={`w-[52px] h-[52px] rounded-[14px] flex items-center justify-center ${colors.bg} ${colors.text} ring-1 ${colors.ring} group-hover:scale-105 transition-transform duration-300`}>
                  <FallbackIcon size={24} strokeWidth={1.8} />
                </div>
              )}
            </div>

            {/* Name + Anchor */}
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h4 className="text-[15px] sm:text-base font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {name}
                  </h4>
                  {anchor && (
                    <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-1 leading-relaxed line-clamp-2">
                      {anchor}
                    </p>
                  )}
                </div>

                {/* Payout */}
                <div className="flex-shrink-0 text-right">
                  <span className="text-lg sm:text-xl font-black text-primary-600 dark:text-primary-400 tracking-tight leading-none">
                    +${payout.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Conversion Instruction — THE TASK TO DO */}
          {conversion && (
            <div className="mt-3 ml-[66px]">
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-primary-50/80 dark:bg-primary-950/30 border border-primary-100 dark:border-primary-900/40">
                <div className="w-5 h-5 rounded-md bg-primary-500/15 dark:bg-primary-400/15 flex items-center justify-center flex-shrink-0">
                  <ClipboardCheck size={12} className="text-primary-600 dark:text-primary-400" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary-500/70 dark:text-primary-500/60 block leading-none mb-0.5">
                    What to do
                  </span>
                  <span className="text-xs font-semibold text-primary-700 dark:text-primary-300 leading-snug block">
                    {conversion}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Row 3: Action Button */}
          <div className="mt-3.5 ml-[66px]">
            {isPending ? (
              <button
                disabled
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 text-sm font-semibold cursor-not-allowed border border-gray-200/80 dark:border-gray-700/50"
              >
                <Loader2 size={14} className="animate-spin" />
                Verifying completion...
              </button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => onStart(id, url)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-bold shadow-sm hover:shadow-md active:shadow-sm transition-all duration-200 hover:bg-gray-800 dark:hover:bg-gray-100"
              >
                Start Task
                <ArrowRight size={14} strokeWidth={2.5} />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
