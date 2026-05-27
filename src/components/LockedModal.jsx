import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X } from 'lucide-react';

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modal = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 25 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.15 },
  },
};

export default function LockedModal({ isOpen, onClose, balance, minWithdraw }) {
  const progressPercent = Math.min((balance / minWithdraw) * 100, 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <motion.div
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-800 p-8 sm:p-10 text-center z-10"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            >
              <X size={16} />
            </button>

            {/* Icon */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-yellow-100 dark:bg-yellow-900/30 mb-6 border border-yellow-200 dark:border-yellow-800/50 shadow-inner">
              <Lock size={32} className="text-yellow-600 dark:text-yellow-400" />
            </div>

            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
              Unlock Payments
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-base">
              First complete the minimum withdrawal amount of{' '}
              <strong className="text-gray-900 dark:text-white">
                ${minWithdraw.toFixed(2)}
              </strong>{' '}
              to add banking and payment details.
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-4 mb-3 p-1 shadow-inner border border-gray-200 dark:border-gray-700">
              <motion.div
                className="bg-gradient-to-r from-primary-400 to-primary-600 h-2 rounded-full shadow-sm"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              />
            </div>
            <p className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-8 tracking-wide">
              ${balance.toFixed(2)}{' '}
              <span className="text-gray-400 font-medium">/ ${minWithdraw.toFixed(2)}</span>
            </p>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 text-white font-bold py-4 px-4 rounded-2xl transition-all shadow-lg hover:shadow-xl text-lg"
            >
              Keep Earning
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
