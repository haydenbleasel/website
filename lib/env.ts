import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    BASEHUB_TOKEN: z.string().min(1).startsWith('bshb_pk_'),
    RESEND_AUDIENCE_ID: z.string().min(1),
    RESEND_TOKEN: z.string().min(1).startsWith('re_'),
    BETTERSTACK_API_KEY: z.string().min(1),
    BETTERSTACK_URL: z.string().min(1),
    GITHUB_TOKEN: z.string().min(1).startsWith('github_pat_'),
    KV_REST_API_URL: z.string().min(1).url(),
    KV_REST_API_TOKEN: z.string().min(1),
    RESEND_FROM: z.string().min(1).email(),
    RESEND_TO: z.string().min(1).email(),
  },
  client: {},
  runtimeEnv: {
    BASEHUB_TOKEN: process.env.BASEHUB_TOKEN,
    RESEND_AUDIENCE_ID: process.env.RESEND_AUDIENCE_ID,
    RESEND_TOKEN: process.env.RESEND_TOKEN,
    BETTERSTACK_API_KEY: process.env.BETTERSTACK_API_KEY,
    BETTERSTACK_URL: process.env.BETTERSTACK_URL,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    KV_REST_API_URL: process.env.KV_REST_API_URL,
    KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
    RESEND_FROM: process.env.RESEND_FROM,
    RESEND_TO: process.env.RESEND_TO,
  },
});
