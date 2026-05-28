import { motion } from 'framer-motion';
import { Banknote, ListChecks, ArrowDown, Sparkles, History } from 'lucide-react';

export default function HeroSection({ balance, tasksCompleted, onOpenHistory }) {
  const balanceStr = balance.toFixed(2);
  const [dollars, cents] = balanceStr.split('.');

  return (
    <section id="hero" className="relative pt-4 pb-6 sm:pt-8 sm:pb-10">
      <div className="max-w-3xl mx-auto px-4">

        {/* Promo Text — Above card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-5 text-center px-2"
        >
          <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
            Complete Tasks.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-teal-500">
              Earn Real Money.
            </span>
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-md mx-auto">
            Download apps, do surveys, sign up for free trials, and complete simple sponsored tasks — 
            earn real money and withdraw anytime to PayPal, crypto or your bank.
          </p>
        </motion.div>

        {/* Balance Card — Dark */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-[1.75rem] overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950" />
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }} />
          <div className="absolute -right-16 -top-16 w-56 h-56 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute -left-8 -bottom-12 w-40 h-40 bg-teal-500/8 rounded-full blur-3xl" />

          <div className="relative px-6 py-7 sm:px-8 sm:py-9">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Banknote size={16} className="text-white/80" />
                </div>
                <span className="text-white/50 text-sm font-semibold">Available Balance</span>
              </div>
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full px-2.5 py-1"
              >
                <Sparkles size={12} className="text-primary-400" />
                <span className="text-[11px] font-bold text-white/70">Live</span>
              </motion.div>
            </div>

            {/* Big balance */}
            <div className="flex items-baseline gap-0.5 mb-6">
              <span className="text-white/40 text-3xl sm:text-4xl font-bold">$</span>
              <span className="text-5xl sm:text-6xl font-black text-white tracking-tight leading-none">
                {dollars}
              </span>
              <span className="text-white/30 text-2xl sm:text-3xl font-bold">.{cents}</span>
            </div>

            {/* Bottom row: completed + history button */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 bg-white/8 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/5">
                <ListChecks size={15} className="text-primary-400" />
                <span className="text-sm font-bold text-white/70">
                  <span className="text-white">{tasksCompleted}</span> completed
                </span>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onOpenHistory}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 backdrop-blur-sm rounded-xl px-3.5 py-2.5 border border-white/5 transition-colors"
              >
                <History size={14} className="text-white/60" />
                <span className="text-xs font-bold text-white/70">History</span>
              </motion.button>
            </div>
          </div>
        </motion.div>


        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-5"
        >
          <a
            href="#tasks"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            Browse offers below
            <motion.div animate={{ y: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <ArrowDown size={13} />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
