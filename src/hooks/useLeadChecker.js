import { useEffect, useRef, useCallback } from 'react';
import { checkLeads } from '../lib/api';
import { API_CONFIG } from '../lib/constants';
import toast from 'react-hot-toast';

export function useLeadChecker({ completedIds, onLeadCompleted }) {
  const completedIdsRef = useRef(completedIds);
  completedIdsRef.current = completedIds;

  const check = useCallback(async () => {
    const leads = await checkLeads();
    if (!leads.length) return;

    let newLeads = [];
    leads.forEach((lead) => {
      const idStr = String(lead.offer_id);
      if (!completedIdsRef.current.has(idStr)) {
        const dollarsEarned = parseFloat(lead.points) / 100;
        newLeads.push({ id: idStr, amount: dollarsEarned });
        toast.success(
          `Payment Received! Offer #${lead.offer_id}: +$${dollarsEarned.toFixed(2)}`,
          {
            duration: 5000,
            icon: '💰',
            style: { fontWeight: 600 },
          }
        );
      }
    });

    if (newLeads.length > 0) {
      onLeadCompleted(newLeads);
    }
  }, [onLeadCompleted]);

  useEffect(() => {
    // Check immediately on mount
    check();
    const interval = setInterval(check, API_CONFIG.LEAD_CHECK_INTERVAL);
    return () => clearInterval(interval);
  }, [check]);
}
