import { env } from './env';

export const clamp = (number: number, a: number, b: number) => {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  return Math.min(Math.max(number, min), max);
};

const protocol = env.NODE_ENV === 'production' ? 'https' : 'http';

export const baseUrl = `${protocol}://${env.VERCEL_PROJECT_PRODUCTION_URL}`;
