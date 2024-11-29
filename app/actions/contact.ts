'use server';

import { env } from '@/lib/env';
import { resend } from '@/lib/resend';
import { parseError } from '@/lib/utils';
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import type { z } from 'zod';
import type { contactSchema } from '../contact/schema';

export const contact = async (
  data: z.infer<typeof contactSchema>
): Promise<
  | {
      message: string;
    }
  | {
      error: string;
    }
> => {
  const head = await headers();

  try {
    const ip = head.get('x-forwarded-for');
    const ratelimit = new Ratelimit({
      redis: kv,
      // rate limit to 1 request every day
      limiter: Ratelimit.slidingWindow(1, '1d'),
    });

    const { success } = await ratelimit.limit(`ratelimit_${ip}`);

    if (!success) {
      throw new Error(
        'You have reached your request limit. Please try again later.'
      );
    }

    const response = await resend.emails.send({
      from: env.RESEND_FROM,
      to: env.RESEND_TO,
      subject: `New ${data.type} message from ${data.name}`,
      replyTo: data.email,
      text: data.message,
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    revalidatePath('/contact');

    return { message: 'Thanks! Your message has been sent.' };
  } catch (error) {
    const errorMessage = parseError(error);

    return { error: errorMessage };
  }
};
