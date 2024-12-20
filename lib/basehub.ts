import { basehub as basehubClient } from 'basehub';

export const basehub = basehubClient({
  cache: process.env.NODE_ENV === 'production' ? undefined : 'no-store',
});
