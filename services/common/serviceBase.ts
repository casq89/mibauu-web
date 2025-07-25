import axios from 'axios';

export const miBauuClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SUPABASE_URL,
});
