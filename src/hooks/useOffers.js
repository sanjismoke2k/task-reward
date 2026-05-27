import { useState, useEffect, useCallback } from 'react';
import { fetchOffers as fetchOffersApi } from '../lib/api';

export function useOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOffers = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await fetchOffersApi();
    if (result.error) {
      setError(result.error);
    } else if (result.offers.length === 0) {
      setError('No offers available for your region right now. Please check back later.');
    }
    setOffers(result.offers);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadOffers();
  }, [loadOffers]);

  return { offers, loading, error, refetch: loadOffers };
}
