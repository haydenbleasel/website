import { Lora as createSerif } from '@next/font/google';

export const serif = createSerif({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-serif',
});
