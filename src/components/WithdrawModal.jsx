import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Send, Loader2, ArrowRightLeft, Shield, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

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

// SVG logos
const PayPalLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797H9.603c-.564 0-1.04.408-1.13.964L7.076 21.337z" fill="#003087"/>
    <path d="M18.429 7.462c-.025.148-.054.298-.084.45-1.09 5.555-4.8 7.472-9.542 7.472H6.83a1.172 1.172 0 0 0-1.158.99l-1.2 7.588-.34 2.15a.617.617 0 0 0 .61.715h4.292c.507 0 .938-.369 1.017-.869l.042-.216.806-5.103.052-.28a1.024 1.024 0 0 1 1.012-.869h.636c4.126 0 7.355-1.676 8.3-6.523.394-2.025.19-3.716-.852-4.904a4.131 4.131 0 0 0-1.182-.865 9.157 9.157 0 0 1 .564 .264z" fill="#003087"/>
  </svg>
);

const BitcoinLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
    <circle cx="12" cy="12" r="12" fill="#F7931A"/>
    <path d="M16.662 10.661c.228-1.547-.945-2.379-2.554-2.934l.522-2.096-1.275-.318-.508 2.04a52.185 52.185 0 0 0-1.02-.24l.512-2.052-1.274-.318-.522 2.095c-.277-.063-.549-.125-.813-.191l.001-.007-1.759-.44-.339 1.362s.945.217.925.23c.516.129.609.47.594.741l-.595 2.39c.036.009.082.022.133.043l-.135-.034-.834 3.35c-.063.157-.224.393-.586.303.013.019-.926-.231-.926-.231l-.633 1.46 1.66.414c.308.078.611.159.908.235l-.528 2.12 1.273.317.522-2.096c.348.094.685.181 1.015.262l-.52 2.084 1.275.318.527-2.115c2.176.412 3.812.246 4.501-1.724.555-1.586-.028-2.5-1.172-3.096.834-.193 1.461-.742 1.629-1.878zm-2.914 4.088c-.394 1.586-3.062.728-3.926.513l.7-2.812c.864.216 3.641.644 3.226 2.299zm.395-4.112c-.36 1.442-2.58.71-3.3.53l.636-2.55c.72.18 3.04.514 2.664 2.02z" fill="white"/>
  </svg>
);

const USDTLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
    <circle cx="12" cy="12" r="12" fill="#26A17B"/>
    <path d="M13.4 10.88v-1.6h3.36V7.12H7.24v2.16h3.36v1.6c-2.85.13-5 .72-5 1.42 0 .7 2.15 1.29 5 1.42v5.08h2.8v-5.08c2.84-.13 4.98-.72 4.98-1.42 0-.7-2.14-1.29-4.98-1.42zm0 2.34c-.08 0-.16.01-.24.01-.1 0-.2 0-.3-.01-2.5-.1-4.37-.58-4.37-1.14 0-.5 1.56-.93 3.71-1.08v1.72c.2.02.4.02.6.02.17 0 .33 0 .5-.01V11c2.17.15 3.74.58 3.74 1.08 0 .56-1.88 1.04-4.4 1.14h.76z" fill="white"/>
  </svg>
);

const BankLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
    <rect width="24" height="24" rx="12" fill="#1E40AF"/>
    <path d="M12 4L5 8.5V10h14V8.5L12 4z" fill="white"/>
    <rect x="6.5" y="11" width="2" height="5.5" rx="0.5" fill="white"/>
    <rect x="11" y="11" width="2" height="5.5" rx="0.5" fill="white"/>
    <rect x="15.5" y="11" width="2" height="5.5" rx="0.5" fill="white"/>
    <rect x="5" y="17.5" width="14" height="2" rx="0.5" fill="white"/>
  </svg>
);

const PAYMENT_METHODS = [
  { value: 'paypal', label: 'PayPal', logo: PayPalLogo, placeholder: 'Enter your PayPal email address', color: 'border-blue-200 dark:border-blue-800/40 bg-blue-50/50 dark:bg-blue-950/20' },
  { value: 'usdt', label: 'USDT (TRC20)', logo: USDTLogo, placeholder: 'Enter your USDT TRC20 wallet address', color: 'border-emerald-200 dark:border-emerald-800/40 bg-emerald-50/50 dark:bg-emerald-950/20' },
  { value: 'btc', label: 'Bitcoin', logo: BitcoinLogo, placeholder: 'Enter your Bitcoin wallet address', color: 'border-orange-200 dark:border-orange-800/40 bg-orange-50/50 dark:bg-orange-950/20' },
  { value: 'bank', label: 'Bank Transfer', logo: BankLogo, placeholder: 'Enter your bank account number', color: 'border-indigo-200 dark:border-indigo-800/40 bg-indigo-50/50 dark:bg-indigo-950/20' },
];

export default function WithdrawModal({ isOpen, onClose, balance, onWithdraw }) {
  const [selectedMethod, setSelectedMethod] = useState('paypal');
  const [accountDetails, setAccountDetails] = useState('');
  const [processing, setProcessing] = useState(false);
  const [isMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 640);

  const activeMethod = PAYMENT_METHODS.find(m => m.value === selectedMethod);

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
        `$${amount.toFixed(2)} withdrawal via ${activeMethod.label} submitted!`,
        { duration: 5000, icon: '🎉' }
      );
    }, 2000);
  };

  const variants = isMobile ? modalMobile : modalDesktop;

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
                className="relative w-full sm:max-w-md bg-white dark:bg-gray-900 rounded-t-[1.75rem] sm:rounded-[1.75rem] shadow-2xl border-t sm:border border-gray-200/80 dark:border-gray-800 overflow-hidden"
              >
                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">
                      Withdraw Funds
                    </h3>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 font-medium">
                      Choose your payment method
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="p-6">
                  {/* Balance */}
                  <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-950/20 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 mb-6">
                    <div>
                      <p className="text-[11px] font-bold text-emerald-600/60 dark:text-emerald-400/60 uppercase tracking-wider mb-0.5">
                        Available
                      </p>
                      <span className="text-3xl font-black text-emerald-700 dark:text-emerald-300 tracking-tight">
                        ${balance.toFixed(2)}
                      </span>
                    </div>
                    <div className="w-10 h-10 bg-emerald-500/15 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={20} className="text-emerald-500" />
                    </div>
                  </div>

                  {/* Payment Method Selection */}
                  <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
                    Select Method
                  </p>
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    {PAYMENT_METHODS.map((method) => {
                      const Logo = method.logo;
                      const isSelected = selectedMethod === method.value;
                      return (
                        <motion.button
                          key={method.value}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setSelectedMethod(method.value)}
                          className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl border-2 transition-all text-left ${
                            isSelected
                              ? 'border-emerald-500 dark:border-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/30 shadow-sm'
                              : 'border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800/50'
                          }`}
                        >
                          <Logo />
                          <div className="min-w-0">
                            <span className={`text-sm font-bold block leading-tight ${isSelected ? 'text-emerald-700 dark:text-emerald-300' : 'text-gray-700 dark:text-gray-300'}`}>
                              {method.label}
                            </span>
                          </div>
                          {isSelected && (
                            <Check size={14} className="text-emerald-500 ml-auto flex-shrink-0" />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Account Input */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                        {activeMethod.label} Details
                      </label>
                      <input
                        type="text"
                        value={accountDetails}
                        onChange={(e) => setAccountDetails(e.target.value)}
                        placeholder={activeMethod.placeholder}
                        className="block w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        required
                      />
                    </div>

                    {/* Security Note */}
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                      <Shield size={13} className="text-emerald-500 flex-shrink-0" />
                      <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                        Payments processed within 24-48 hours securely
                      </span>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      disabled={processing}
                      className={`w-full flex justify-center items-center py-3.5 rounded-2xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm shadow-emerald-500/20 transition-all ${
                        processing ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {processing ? (
                        <>
                          <Loader2 size={16} className="animate-spin mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send size={15} className="mr-2" />
                          Withdraw ${balance.toFixed(2)}
                        </>
                      )}
                    </motion.button>
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
