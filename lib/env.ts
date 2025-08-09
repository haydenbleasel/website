import { vercel } from '@t3-oss/env-core/presets-zod';
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  extends: [vercel()],
  server: {
    RESEND_AUDIENCE_ID: z.string(),
    RESEND_TOKEN: z.string(),
    NODE_ENV: z.enum(['development', 'production']).optional(),
  },
  client: {
    NEXT_PUBLIC_LOGO_DEV_TOKEN: z.string().startsWith('pk_'),
  },
  runtimeEnv: {
    RESEND_AUDIENCE_ID: process.env.RESEND_AUDIENCE_ID,
    RESEND_TOKEN: process.env.RESEND_TOKEN,
    NEXT_PUBLIC_LOGO_DEV_TOKEN: process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN,
    NODE_ENV: process.env.NODE_ENV,
  },
});
