import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, Wallet, Menu, X, Landmark, ListChecks, Moon, Sun, ArrowUpRight } from 'lucide-react';

export default function Navbar({ balance, isDark, onToggleTheme, onWithdraw }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const balanceStr = balance.toFixed(2);

  const scrollToTasks = () => {
    const el = document.getElementById('tasks');
    if (el) {
      window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-40 top-0 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-gray-950/95 shadow-sm'
          : 'bg-white/80 dark:bg-gray-950/80'
      } backdrop-blur-2xl backdrop-saturate-150 border-b border-gray-200/50 dark:border-gray-800/50`}
    >
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer gap-2.5"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-emerald-500/25">
              <DollarSign size={17} strokeWidth={2.5} />
            </div>
            <span className="font-heading font-bold text-lg sm:text-xl tracking-tight text-gray-900 dark:text-white">
              TaskRewards
            </span>
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              onClick={scrollToTasks}
              className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors px-3 py-1.5"
            >
              Offers
            </button>

            {/* Balance Chip */}
            <div className="flex items-center bg-emerald-50 dark:bg-emerald-900/20 rounded-full px-3.5 py-1.5 gap-2 border border-emerald-100 dark:border-emerald-800/30">
              <Wallet size={14} className="text-emerald-500" />
              <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300 tabular-nums">
                ${balanceStr}
              </span>
            </div>

            <button
              onClick={onToggleTheme}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onWithdraw}
              className="text-sm font-semibold text-white bg-gray-900 dark:bg-white dark:text-gray-900 px-4 py-2 rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-sm flex items-center gap-1.5"
            >
              Withdraw
              <ArrowUpRight size={14} />
            </motion.button>
          </div>

          {/* Mobile Right */}
          <div className="flex md:hidden items-center gap-2.5">
            <div className="flex items-center bg-emerald-50 dark:bg-emerald-900/20 rounded-full px-2.5 py-1 gap-1.5 border border-emerald-100 dark:border-emerald-800/30">
              <Wallet size={12} className="text-emerald-500" />
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 tabular-nums">
                ${balanceStr}
              </span>
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800/80"
          >
            <div className="px-4 py-4 space-y-1">
              <button
                onClick={scrollToTasks}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-colors flex items-center gap-3"
              >
                <ListChecks size={18} className="text-emerald-500" />
                Available Offers
              </button>

              <div
                className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-colors cursor-pointer"
                onClick={onToggleTheme}
              >
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-3">
                  {isDark ? <Sun size={18} className="text-emerald-500" /> : <Moon size={18} className="text-emerald-500" />}
                  {isDark ? 'Light Mode' : 'Dark Mode'}
                </span>
                <div className={`w-10 h-6 rounded-full transition-colors flex items-center px-0.5 ${isDark ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                  <motion.div
                    className="w-5 h-5 rounded-full bg-white shadow-sm"
                    animate={{ x: isDark ? 16 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </div>
              </div>

              <div className="pt-3">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { onWithdraw(); setMenuOpen(false); }}
                  className="w-full bg-gray-900 dark:bg-white dark:text-gray-900 text-white px-4 py-3.5 rounded-2xl font-bold text-sm transition-colors shadow-sm flex justify-center items-center gap-2"
                >
                  <Landmark size={16} />
                  Withdraw Funds
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
