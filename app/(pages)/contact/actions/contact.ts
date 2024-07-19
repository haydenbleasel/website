'use server';

import { formSchema } from '@/lib/form';
import { resend } from '@/lib/resend';
import { parseError } from '@/lib/utils';
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

const from = process.env.RESEND_FROM;
const to = process.env.RESEND_TO;

if (!from || !to) {
  throw new Error(
    'RESEND_FROM and RESEND_TO environment variables are not set'
  );
}

const kvRestApiUrl = process.env.KV_REST_API_URL;
const kvRestApiToken = process.env.KV_REST_API_TOKEN;

if (!kvRestApiUrl || !kvRestApiToken) {
  throw new Error(
    'KV_REST_API_URL and KV_REST_API_TOKEN environment variables are not set'
  );
}

export const contact = async (
  _previousState: never,
  formData: FormData
): Promise<{
  message: string;
}> => {
  const data = formSchema.parse(Object.fromEntries(formData));

  try {
    const ip = headers().get('x-forwarded-for');
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
      from,
      to,
      subject: `New ${data.type} message from ${data.name}`,
      reply_to: data.email,
      text: data.message,
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    revalidatePath('/contact');

    return { message: 'Thanks! Your message has been sent.' };
  } catch (error) {
    const errorMessage = parseError(error);

    return { message: errorMessage };
  }
};
