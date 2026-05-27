import { motion } from 'framer-motion';
import { Banknote, ListChecks, Rocket } from 'lucide-react';

export default function HeroSection({ balance, tasksCompleted, minWithdraw }) {
  const progressPercent = Math.min((balance / minWithdraw) * 100, 100);
  const balanceStr = balance.toFixed(2);

  return (
    <section id="hero" className="relative pt-6 pb-8 sm:pt-10 sm:pb-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            Welcome back 👋
          </p>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Your Earnings
          </h1>
        </motion.div>

        {/* Balance Card - Main */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="relative rounded-[1.5rem] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-800 dark:via-gray-750 dark:to-gray-900 p-6 sm:p-8 mb-4 overflow-hidden shadow-xl"
        >
          {/* Decorative circles */}
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-primary-500/15 rounded-full blur-2xl" />
          <div className="absolute -left-4 -bottom-4 w-28 h-28 bg-teal-500/10 rounded-full blur-2xl" />

          <div className="relative">
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-2">
              Total Balance
            </p>
            <div className="flex items-end gap-1 mb-6">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none">
                ${balanceStr}
              </span>
              <span className="text-primary-400 text-sm font-bold mb-1">USD</span>
            </div>

            {/* Progress to withdrawal */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-400">
                  Withdrawal progress
                </span>
                <span className="text-xs font-bold text-gray-300 tabular-nums">
                  {Math.round(progressPercent)}%
                </span>
              </div>
              <div className="w-full bg-gray-700/60 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-primary-400 to-teal-400 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                />
              </div>
              <p className="text-[11px] text-gray-500 mt-1.5 font-medium">
                ${balanceStr} of ${minWithdraw.toFixed(2)} to unlock withdrawal
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="bg-white dark:bg-gray-900/80 rounded-2xl p-4 border border-gray-200/80 dark:border-gray-800/60 shadow-sm"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 dark:text-blue-400 flex items-center justify-center mb-2.5">
              <ListChecks size={18} />
            </div>
            <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">
              Completed
            </p>
            <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              {tasksCompleted}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white dark:bg-gray-900/80 rounded-2xl p-4 border border-gray-200/80 dark:border-gray-800/60 shadow-sm"
          >
            <div className="w-9 h-9 rounded-xl bg-primary-500/10 text-primary-500 dark:text-primary-400 flex items-center justify-center mb-2.5">
              <Rocket size={18} />
            </div>
            <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">
              Goal
            </p>
            <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              ${minWithdraw.toFixed(0)}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
