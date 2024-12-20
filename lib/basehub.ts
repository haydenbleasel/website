import { basehub as basehubClient } from 'basehub';
import { env } from './env';

export const basehub = basehubClient({
  cache: process.env.NODE_ENV === 'production' ? undefined : 'no-store',
  token: env.BASEHUB_TOKEN,
});
