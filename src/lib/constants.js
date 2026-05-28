export const API_CONFIG = {
  USER_ID: import.meta.env.VITE_USER_ID || '654321',
  API_KEY: import.meta.env.VITE_API_KEY || 'dc6bf5aaf8e85f4a335178e9deb59042',
  get FEED_URL() {
    return `https://de6jvomfbm0af.cloudfront.net/public/offers/feed.php?user_id=${this.USER_ID}&api_key=${this.API_KEY}&s1=&s2=&callback=?`;
  },
  LEAD_CHECK_URL: 'https://de6jvomfbm0af.cloudfront.net/public/external/check2.php?testing=0&callback=?',
  LEAD_CHECK_INTERVAL: 15000,
  OFFERS_PER_PAGE: 5,
  MIN_WITHDRAW: 10.00,
};

export const OFFER_STYLES = [
  { color: 'blue', icon: 'Gamepad2' },
  { color: 'emerald', icon: 'Star' },
  { color: 'purple', icon: 'Smartphone' },
  { color: 'amber', icon: 'Gem' },
  { color: 'rose', icon: 'Flame' },
  { color: 'cyan', icon: 'Zap' },
  { color: 'indigo', icon: 'Trophy' },
  { color: 'orange', icon: 'Target' },
];
