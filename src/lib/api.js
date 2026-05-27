import { API_CONFIG } from './constants';

// JSONP utility for cross-origin API calls
let jsonpCounter = 0;

function jsonp(url) {
  return new Promise((resolve, reject) => {
    const callbackName = `jsonp_cb_${Date.now()}_${jsonpCounter++}`;
    const separator = url.includes('?') ? '&' : '?';
    const finalUrl = url.replace('callback=?', `callback=${callbackName}`);

    const script = document.createElement('script');
    script.src = finalUrl;

    const cleanup = () => {
      delete window[callbackName];
      if (script.parentNode) script.parentNode.removeChild(script);
    };

    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error('JSONP request timed out'));
    }, 15000);

    window[callbackName] = (data) => {
      clearTimeout(timeout);
      cleanup();
      resolve(data);
    };

    script.onerror = () => {
      clearTimeout(timeout);
      cleanup();
      reject(new Error('JSONP request failed'));
    };

    document.head.appendChild(script);
  });
}

export async function fetchOffers() {
  try {
    const data = await jsonp(API_CONFIG.FEED_URL);
    const offers = Array.isArray(data) ? data : (data?.offers || []);
    return { offers, error: null };
  } catch (error) {
    console.error('Failed to fetch offers:', error);
    return { offers: [], error: 'Failed to connect to the offer wall. Please refresh the page.' };
  }
}

export async function checkLeads() {
  try {
    const data = await jsonp(API_CONFIG.LEAD_CHECK_URL);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Failed to check leads:', error);
    return [];
  }
}
