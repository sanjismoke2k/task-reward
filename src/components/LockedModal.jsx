import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X, Shield } from 'lucide-react';

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modal = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 28 },
  },
  exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.15 } },
};

// SVG logos for payment methods
const PayPalLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797H9.603c-.564 0-1.04.408-1.13.964L7.076 21.337z" fill="#003087"/>
    <path d="M18.429 7.462c-.025.148-.054.298-.084.45-1.09 5.555-4.8 7.472-9.542 7.472H6.83a1.172 1.172 0 0 0-1.158.99l-1.2 7.588-.34 2.15a.617.617 0 0 0 .61.715h4.292c.507 0 .938-.369 1.017-.869l.042-.216.806-5.103.052-.28a1.024 1.024 0 0 1 1.012-.869h.636c4.126 0 7.355-1.676 8.3-6.523.394-2.025.19-3.716-.852-4.904a4.131 4.131 0 0 0-1.182-.865 9.157 9.157 0 0 1 .564 .264z" fill="#003087"/>
    <path d="M17.865 7.236a7.842 7.842 0 0 0-.963-.213 12.262 12.262 0 0 0-1.947-.142H9.57c-.098 0-.192.016-.28.046a1.028 1.028 0 0 0-.737.823L7.29 14.845l-.038.234a1.172 1.172 0 0 1 1.158-.99h1.973c4.742 0 8.452-1.917 9.542-7.472.032-.164.059-.325.084-.483a5.829 5.829 0 0 0-.891-.39 7.828 7.828 0 0 0-1.253-.508z" fill="#002F86"/>
  </svg>
);

const BitcoinLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
    <circle cx="12" cy="12" r="12" fill="#F7931A"/>
    <path d="M16.662 10.661c.228-1.547-.945-2.379-2.554-2.934l.522-2.096-1.275-.318-.508 2.04a52.185 52.185 0 0 0-1.02-.24l.512-2.052-1.274-.318-.522 2.095c-.277-.063-.549-.125-.813-.191l.001-.007-1.759-.44-.339 1.362s.945.217.925.23c.516.129.609.47.594.741l-.595 2.39c.036.009.082.022.133.043l-.135-.034-.834 3.35c-.063.157-.224.393-.586.303.013.019-.926-.231-.926-.231l-.633 1.46 1.66.414c.308.078.611.159.908.235l-.528 2.12 1.273.317.522-2.096c.348.094.685.181 1.015.262l-.52 2.084 1.275.318.527-2.115c2.176.412 3.812.246 4.501-1.724.555-1.586-.028-2.5-1.172-3.096.834-.193 1.461-.742 1.629-1.878zm-2.914 4.088c-.394 1.586-3.062.728-3.926.513l.7-2.812c.864.216 3.641.644 3.226 2.299zm.395-4.112c-.36 1.442-2.58.71-3.3.53l.636-2.55c.72.18 3.04.514 2.664 2.02z" fill="white"/>
  </svg>
);

const BankLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
    <rect width="24" height="24" rx="12" fill="#1E40AF"/>
    <path d="M12 4L5 8.5V10h14V8.5L12 4z" fill="white"/>
    <rect x="6.5" y="11" width="2" height="5.5" rx="0.5" fill="white"/>
    <rect x="11" y="11" width="2" height="5.5" rx="0.5" fill="white"/>
    <rect x="15.5" y="11" width="2" height="5.5" rx="0.5" fill="white"/>
    <rect x="5" y="17.5" width="14" height="2" rx="0.5" fill="white"/>
  </svg>
);

const PAYMENT_METHODS = [
  { name: 'PayPal', logo: PayPalLogo, color: 'bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/30' },
  { name: 'Crypto', logo: BitcoinLogo, color: 'bg-orange-50 dark:bg-orange-950/30 border-orange-100 dark:border-orange-900/30' },
  { name: 'Banking', logo: BankLogo, color: 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-100 dark:border-indigo-900/30' },
];

export default function LockedModal({ isOpen, onClose, balance, minWithdraw }) {
  const progressPercent = Math.min((balance / minWithdraw) * 100, 100);
  const remaining = Math.max(minWithdraw - balance, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <motion.div
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-[1.75rem] shadow-2xl border border-gray-200/80 dark:border-gray-800 z-10 overflow-hidden"
          >
            {/* Header band */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-5 text-center relative">
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: '16px 16px',
              }} />
              <div className="relative">
                <div className="w-14 h-14 mx-auto bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-3">
                  <Lock size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-black text-white">
                  Withdrawals Locked
                </h3>
                <p className="text-white/80 text-sm mt-1 font-medium">
                  Earn ${remaining.toFixed(2)} more to unlock
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            >
              <X size={16} />
            </button>

            <div className="p-6">
              {/* Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Progress
                  </span>
                  <span className="text-xs font-bold text-gray-900 dark:text-white tabular-nums">
                    ${balance.toFixed(2)} / ${minWithdraw.toFixed(2)}
                  </span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-3 overflow-hidden border border-gray-200 dark:border-gray-700">
                  <motion.div
                    className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Locked Payment Methods */}
              <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
                Payment Methods
              </p>
              <div className="space-y-2.5 mb-6">
                {PAYMENT_METHODS.map((method) => {
                  const Logo = method.logo;
                  return (
                    <div
                      key={method.name}
                      className={`flex items-center justify-between px-4 py-3 rounded-2xl border ${method.color} opacity-60`}
                    >
                      <div className="flex items-center gap-3">
                        <Logo />
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                          {method.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500">
                        <Lock size={13} />
                        <span className="text-[11px] font-semibold">Locked</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Security note */}
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 mb-5">
                <Shield size={14} className="text-emerald-500 flex-shrink-0" />
                <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium leading-tight">
                  Reach ${minWithdraw.toFixed(2)} minimum to unlock all payment methods and withdraw your earnings securely.
                </span>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 text-white font-bold py-3.5 rounded-2xl transition-all shadow-sm text-sm"
              >
                Keep Earning
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
