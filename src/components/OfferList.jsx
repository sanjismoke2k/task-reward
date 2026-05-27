import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, RefreshCw, CheckCheck, Zap, Sparkles } from 'lucide-react';
import OfferCard from './OfferCard';
import { API_CONFIG } from '../lib/constants';

// Skeleton loader
function OfferSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900/80 rounded-[1.25rem] p-4 sm:p-5 border border-gray-200/80 dark:border-gray-800/60">
      <div className="flex items-start gap-3.5">
        <div className="w-[52px] h-[52px] rounded-[14px] skeleton flex-shrink-0" />
        <div className="flex-1 space-y-2.5 pt-1">
          <div className="h-4 skeleton rounded-lg w-3/4" />
          <div className="h-3.5 skeleton rounded-lg w-full" />
          <div className="h-3.5 skeleton rounded-lg w-1/2" />
        </div>
        <div className="h-6 skeleton rounded-lg w-16 mt-1" />
      </div>
      <div className="mt-4 ml-[66px]">
        <div className="h-10 skeleton rounded-xl w-28" />
      </div>
    </div>
  );
}

export default function OfferList({
  offers,
  loading,
  error,
  completedIds,
  pendingIds,
  onStartTask,
  onRefetch,
}) {
  const [currentPage, setCurrentPage] = useState(0);

  const availableOffers = useMemo(() => {
    return offers.filter((offer) => {
      const id = String(offer.offer_id || offer.id || '');
      return !completedIds.has(id);
    });
  }, [offers, completedIds]);

  const displayOffers = availableOffers.slice(0, (currentPage + 1) * API_CONFIG.OFFERS_PER_PAGE);
  const hasMore = displayOffers.length < availableOffers.length;

  return (
    <section id="tasks" className="pb-16 sm:pb-24 relative">
      <div className="max-w-3xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-5 mt-6"
        >
          <div>
            <h2 className="font-heading text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Available Offers
            </h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 font-medium">
              {availableOffers.length} offer{availableOffers.length !== 1 ? 's' : ''} available
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-primary-500/10 text-primary-600 dark:text-primary-400 px-3 py-1.5 rounded-full">
            <Sparkles size={13} />
            <span className="text-[11px] font-bold tracking-wide">Auto-tracking</span>
          </div>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <OfferSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-10 text-center bg-red-50 dark:bg-red-950/20 rounded-2xl border border-red-100 dark:border-red-900/30"
          >
            <p className="text-red-500 dark:text-red-400 font-medium text-sm mb-4">{error}</p>
            <button
              onClick={onRefetch}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-semibold hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
            >
              <RefreshCw size={14} />
              Retry
            </button>
          </motion.div>
        )}

        {/* Offer Cards */}
        {!loading && !error && (
          <>
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {displayOffers.map((offer, i) => {
                  const id = String(offer.offer_id || offer.id || '');
                  return (
                    <OfferCard
                      key={id || i}
                      offer={offer}
                      index={i}
                      isPending={pendingIds.has(id)}
                      onStart={onStartTask}
                    />
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Empty */}
            {availableOffers.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-14 bg-white dark:bg-gray-900/80 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 mt-2"
              >
                <div className="w-16 h-16 mx-auto bg-primary-500/10 text-primary-500 rounded-2xl flex items-center justify-center mb-4">
                  <CheckCheck size={28} />
                </div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-1">
                  All Done!
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 px-6">
                  You've completed all offers. New ones come regularly — check back soon!
                </p>
              </motion.div>
            )}

            {/* Load More */}
            {hasMore && (
              <div className="text-center mt-5">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="inline-flex items-center gap-2 bg-white dark:bg-gray-900/80 border border-gray-200/80 dark:border-gray-700/50 px-6 py-2.5 rounded-full text-sm font-bold text-gray-700 dark:text-gray-300 shadow-sm hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                >
                  Load More
                  <ChevronDown size={15} />
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
