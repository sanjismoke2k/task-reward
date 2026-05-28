import { useEffect, useRef, useCallback } from 'react';
import { checkLeads } from '../lib/api';
import { API_CONFIG } from '../lib/constants';
import toast from 'react-hot-toast';

export function useLeadChecker({ completedIds, onLeadCompleted, offers = [] }) {
  const completedIdsRef = useRef(completedIds);
  completedIdsRef.current = completedIds;

  const offersRef = useRef(offers);
  offersRef.current = offers;

  const check = useCallback(async () => {
    const leads = await checkLeads();
    if (!leads.length) return;

    let newLeads = [];
    leads.forEach((lead) => {
      const idStr = String(lead.offer_id);
      if (!completedIdsRef.current.has(idStr)) {
        const dollarsEarned = parseFloat(lead.points) / 100;

        // Look up the offer name from loaded offers
        const matchedOffer = offersRef.current.find(
          (o) => String(o.id || o.offer_id) === idStr
        );
        const offerName = matchedOffer?.name || `Offer #${lead.offer_id}`;

        newLeads.push({ id: idStr, amount: dollarsEarned, name: offerName });
        toast.success(
          `+$${dollarsEarned.toFixed(2)} from ${offerName}`,
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
    check();
    const interval = setInterval(check, API_CONFIG.LEAD_CHECK_INTERVAL);
    return () => clearInterval(interval);
  }, [check]);
}
