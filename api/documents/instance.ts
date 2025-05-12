import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://xzcmwwxpiuhflofxxkda.supabase.co/rest/v1/',
  headers: {
    apikey: process.env.NEXT_PUBLIC_API_KEY,
  },
});
