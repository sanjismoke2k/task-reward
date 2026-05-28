import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Clock, Receipt, Inbox } from 'lucide-react';

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalMobile = {
  hidden: { opacity: 0, y: '100%' },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  exit: { opacity: 0, y: '100%', transition: { duration: 0.2 } },
};

const modalDesktop = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 28 } },
  exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.15 } },
};

function timeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function TaskHistoryModal({ isOpen, onClose, payoutHistory = [] }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const variants = isMobile ? modalMobile : modalDesktop;

  const totalEarned = payoutHistory.reduce((sum, e) => sum + e.amount, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
          <motion.div
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end sm:items-center justify-center p-0 sm:p-4">
              <motion.div
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative w-full sm:max-w-md bg-white dark:bg-gray-900 rounded-t-[1.75rem] sm:rounded-[1.75rem] shadow-2xl border-t sm:border border-gray-200/80 dark:border-gray-800 overflow-hidden max-h-[85vh] sm:max-h-[80vh] flex flex-col"
              >
                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <Receipt size={17} className="text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">
                        Task History
                      </h3>
                      <p className="text-[11px] text-gray-400 dark:text-gray-500 font-medium mt-0.5">
                        {payoutHistory.length} task{payoutHistory.length !== 1 ? 's' : ''} completed
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Total Earned Banner */}
                {payoutHistory.length > 0 && (
                  <div className="px-6 py-4 bg-emerald-50/80 dark:bg-emerald-950/20 border-b border-emerald-100 dark:border-emerald-900/30 flex-shrink-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-600/60 dark:text-emerald-400/50 uppercase tracking-wider">
                        Total Earned
                      </span>
                      <span className="text-2xl font-black text-emerald-700 dark:text-emerald-300 tracking-tight tabular-nums">
                        ${totalEarned.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}

                {/* History List */}
                <div className="overflow-y-auto flex-1 overscroll-contain">
                  {payoutHistory.length === 0 ? (
                    <div className="px-6 py-16 text-center">
                      <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-4">
                        <Inbox size={28} className="text-gray-300 dark:text-gray-600" />
                      </div>
                      <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                        No tasks completed yet
                      </h4>
                      <p className="text-sm text-gray-400 dark:text-gray-500 max-w-[240px] mx-auto">
                        Start completing offers and your earnings will show up here
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100 dark:divide-gray-800/60">
                      {payoutHistory.map((entry, i) => (
                        <motion.div
                          key={entry.id + '-' + i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.03 }}
                          className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                              <CheckCircle2 size={16} className="text-emerald-500" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate leading-snug">
                                {entry.name}
                              </p>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <Clock size={10} className="text-gray-300 dark:text-gray-600" />
                                <p className="text-[11px] text-gray-400 dark:text-gray-500 font-medium">
                                  {entry.date ? formatDate(entry.date) : 'Recently'}
                                </p>
                              </div>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex-shrink-0 ml-3 tabular-nums">
                            +${entry.amount.toFixed(2)}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex-shrink-0">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={onClose}
                    className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 text-white font-bold py-3 rounded-2xl transition-all shadow-sm text-sm"
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
