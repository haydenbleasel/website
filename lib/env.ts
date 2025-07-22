import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    RESEND_AUDIENCE_ID: z.string(),
    RESEND_TOKEN: z.string().startsWith('re_'),
    RESEND_TO: z.email(),
    RECAPTCHA_SECRET_KEY: z.string(),

    // Added by Vercel
    VERCEL_PROJECT_PRODUCTION_URL: z.string(),
  },
  client: {
    NEXT_PUBLIC_LOGO_DEV_TOKEN: z.string().startsWith('pk_'),
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string(),
  },
  runtimeEnv: {
    RESEND_AUDIENCE_ID: process.env.RESEND_AUDIENCE_ID,
    RESEND_TOKEN: process.env.RESEND_TOKEN,
    RESEND_TO: process.env.RESEND_TO,
    VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
    NEXT_PUBLIC_LOGO_DEV_TOKEN: process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
  },
});
