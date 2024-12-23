import { basehub as basehubClient } from 'basehub';
import { env } from './env';

export const basehub = basehubClient({
  token: env.BASEHUB_TOKEN,
});
