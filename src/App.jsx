import { useState, useCallback, useEffect, useMemo } from 'react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';


import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import OfferList from './components/OfferList';
import Footer from './components/Footer';
import LockedModal from './components/LockedModal';
import WithdrawModal from './components/WithdrawModal';

import { useOffers } from './hooks/useOffers';
import { useLeadChecker } from './hooks/useLeadChecker';
import { useLocalStorage } from './hooks/useLocalStorage';
import { API_CONFIG } from './lib/constants';

export default function App() {
  // --- Persistent State ---
  const [state, setState] = useLocalStorage('taskRewardsState', {
    points: 0,
    tasksCompleted: 0,
    completedTaskIds: [],
  });

  // --- Derived State ---
  const completedIds = useMemo(
    () => new Set(state.completedTaskIds.map(String)),
    [state.completedTaskIds]
  );

  // --- Local State ---
  const [pendingIds, setPendingIds] = useState(new Set());
  const [lockedOpen, setLockedOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  // --- Theme ---
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (localStorage.theme === 'dark') return true;
    if (!('theme' in localStorage)) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [isDark]);

  const toggleTheme = useCallback(() => setIsDark((d) => !d), []);

  // --- Offers ---
  const { offers, loading, error, refetch } = useOffers();

  // --- Lead Checker ---
  const handleLeadCompleted = useCallback(
    (newLeads) => {
      setState((prev) => {
        const newCompletedIds = [...prev.completedTaskIds];
        let totalNewEarnings = 0;

        newLeads.forEach(({ id, amount }) => {
          if (!newCompletedIds.includes(id)) {
            newCompletedIds.push(id);
            totalNewEarnings += amount;
          }
        });

        return {
          points: prev.points + totalNewEarnings,
          tasksCompleted: prev.tasksCompleted + newLeads.length,
          completedTaskIds: newCompletedIds,
        };
      });

      // Remove from pending
      setPendingIds((prev) => {
        const next = new Set(prev);
        newLeads.forEach(({ id }) => next.delete(id));
        return next;
      });
    },
    [setState]
  );

  useLeadChecker({
    completedIds,
    onLeadCompleted: handleLeadCompleted,
  });

  // --- Task Actions ---
  const handleStartTask = useCallback((id, url) => {
    window.open(url, '_blank');
    setPendingIds((prev) => new Set(prev).add(id));
    toast('Offer opened! Complete it fully to get credited.', {
      icon: '📋',
      duration: 4000,
    });
  }, []);

  // --- Withdraw ---
  const handleOpenWithdraw = useCallback(() => {
    if (state.points >= API_CONFIG.MIN_WITHDRAW) {
      setWithdrawOpen(true);
    } else {
      setLockedOpen(true);
    }
  }, [state.points]);

  const handleWithdraw = useCallback(() => {
    setState((prev) => ({
      ...prev,
      points: 0,
    }));
  }, [setState]);

  return (
    <div className="bg-gray-100 text-gray-900 font-sans antialiased dark:bg-gray-950 dark:text-gray-100 min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Toast Provider */}
      <Toaster
        position="top-center"
        toastOptions={{
          className:
            '!bg-white dark:!bg-gray-800 !text-gray-800 dark:!text-gray-200 !shadow-lg !border !border-gray-200/80 dark:!border-gray-700/80 !rounded-2xl !font-medium !text-sm !max-w-[340px]',
          duration: 4000,
        }}
        containerStyle={{
          top: 64,
        }}
      />

      {/* Navigation */}
      <Navbar
        balance={state.points}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onWithdraw={handleOpenWithdraw}
      />

      {/* Main Content */}
      <main className="flex-grow z-10 pt-14 sm:pt-16">
        <HeroSection
          balance={state.points}
          tasksCompleted={state.tasksCompleted}
          minWithdraw={API_CONFIG.MIN_WITHDRAW}
        />

        <OfferList
          offers={offers}
          loading={loading}
          error={error}
          completedIds={completedIds}
          pendingIds={pendingIds}
          onStartTask={handleStartTask}
          onRefetch={refetch}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <LockedModal
        isOpen={lockedOpen}
        onClose={() => setLockedOpen(false)}
        balance={state.points}
        minWithdraw={API_CONFIG.MIN_WITHDRAW}
      />

      <WithdrawModal
        isOpen={withdrawOpen}
        onClose={() => setWithdrawOpen(false)}
        balance={state.points}
        onWithdraw={handleWithdraw}
      />
    </div>
  );
}
