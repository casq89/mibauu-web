import axios from 'axios';

export const miBauuClient = axios.create({
  baseURL: process.env.PUBLIC_BFF_URL,
});
