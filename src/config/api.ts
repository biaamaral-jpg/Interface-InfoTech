// A URL é fornecida pelo .env.local ou pelo ambiente de build da Vercel.
const defaultApiUrl = typeof window !== 'undefined'
  ? (window.location.hostname === 'localhost'
      ? 'http://localhost:3000'
      : 'https://infotech-9wu3.onrender.com')
  : 'https://infotech-9wu3.onrender.com';

const apiUrl = import.meta.env.VITE_API_URL?.trim() || defaultApiUrl;

export const API_URL = apiUrl.replace(/\/+$/, '');