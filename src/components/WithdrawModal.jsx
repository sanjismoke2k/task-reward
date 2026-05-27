import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Landmark, Send, Loader2, ArrowRightLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modal = {
  hidden: { opacity: 0, y: '100%' },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  exit: {
    opacity: 0,
    y: '100%',
    transition: { duration: 0.2 },
  },
};

const modalDesktop = {
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

const PAYMENT_METHODS = [
  { value: 'paypal', label: 'PayPal', icon: '💳' },
  { value: 'usdt', label: 'Crypto (USDT TRC20)', icon: '🪙' },
  { value: 'btc', label: 'Crypto (Bitcoin)', icon: '₿' },
  { value: 'bank', label: 'Direct Bank Transfer', icon: '🏦' },
];

export default function WithdrawModal({ isOpen, onClose, balance, onWithdraw }) {
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [accountDetails, setAccountDetails] = useState('');
  const [processing, setProcessing] = useState(false);
  const [isMobile] = useState(() => window.innerWidth < 640);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!accountDetails.trim()) {
      toast.error('Please enter your account details');
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      const amount = balance;
      onWithdraw();
      setProcessing(false);
      setAccountDetails('');
      onClose();
      toast.success(
        `Withdrawal of $${amount.toFixed(2)} submitted successfully!`,
        { duration: 5000, icon: '🎉' }
      );
    }, 1800);
  };

  const variants = isMobile ? modal : modalDesktop;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <motion.div
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end sm:items-center justify-center p-0 sm:p-4">
              <motion.div
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative w-full sm:max-w-lg bg-white dark:bg-gray-900 rounded-t-[2rem] sm:rounded-[2.5rem] shadow-2xl border-t sm:border border-gray-100 dark:border-gray-800 overflow-hidden"
              >
                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/20">
                  <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
                    Withdraw Funds
                  </h3>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="px-6 py-8 sm:p-8">
                  {/* Success Banner */}
                  <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 rounded-2xl p-4 flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mr-4 flex-shrink-0">
                      <Check size={18} className="text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-green-800 dark:text-green-300">
                        Unlocked!
                      </h4>
                      <p className="text-xs text-green-600 dark:text-green-400/80 mt-0.5">
                        You can now withdraw your balance.
                      </p>
                    </div>
                  </div>

                  {/* Balance Box */}
                  <div className="mb-8 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-inner">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold mb-1">
                        Available to Withdraw
                      </p>
                      <span className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                        ${balance.toFixed(2)}
                      </span>
                    </div>
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full hidden sm:flex items-center justify-center">
                      <ArrowRightLeft size={22} />
                    </div>
                  </div>

                  {/* Withdraw Form */}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        Select Payment Method
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                          <Landmark size={18} />
                        </div>
                        <select
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="block w-full pl-11 pr-10 py-3.5 sm:py-3 text-base border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none border transition-colors appearance-none font-medium"
                        >
                          {PAYMENT_METHODS.map((m) => (
                            <option key={m.value} value={m.value}>
                              {m.icon} {m.label}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        Account Details / Wallet Address
                      </label>
                      <input
                        type="text"
                        value={accountDetails}
                        onChange={(e) => setAccountDetails(e.target.value)}
                        placeholder="Enter your email, account #, or crypto address"
                        className="block w-full px-4 py-3.5 sm:py-3 text-base border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none border transition-colors font-medium"
                        required
                      />
                    </div>

                    <div className="pt-4 pb-2 sm:pb-0">
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        disabled={processing}
                        className={`w-full flex justify-center items-center py-4 px-4 rounded-xl shadow-lg shadow-primary-500/30 text-lg font-bold text-white bg-primary-600 hover:bg-primary-700 transition-all ${
                          processing ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                      >
                        {processing ? (
                          <>
                            <Loader2 size={20} className="animate-spin mr-2" />
                            Processing Request...
                          </>
                        ) : (
                          <>
                            <Send size={18} className="mr-2" />
                            Request Withdrawal
                          </>
                        )}
                      </motion.button>
                      <p className="text-xs text-center text-gray-500 mt-4">
                        Payments are processed within 24-48 business hours.
                      </p>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
