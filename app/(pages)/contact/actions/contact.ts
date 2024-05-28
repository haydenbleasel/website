/* eslint-disable no-console */

'use server';

import { revalidatePath } from 'next/cache';
import { kv } from '@vercel/kv';
import { Ratelimit } from '@upstash/ratelimit';
import { headers } from 'next/headers';
import { resend } from '@/lib/resend';
import { parseError } from '@/lib/utils';
import { formSchema } from '@/lib/form';

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
  console.warn(
    'KV_REST_API_URL and KV_REST_API_TOKEN environment variables are not set'
  );
}

export const contact = async (
  previousState: never,
  formData: FormData
): Promise<{
  message: string;
}> => {
  const data = formSchema.parse(Object.fromEntries(formData));

  console.log('📧 Contact form submission', data);

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

    console.log('📧 Sending email...');

    const response = await resend.emails.send({
      from,
      to,
      subject: `New ${data.type} message from ${data.name}`,
      reply_to: data.email,
      text: data.message,
    });

    console.log('📧 Email sent', { response });

    if (response.error) {
      throw new Error(response.error.message);
    }

    console.log('📧 Contact form submission successful');

    revalidatePath('/contact');

    return { message: 'Thanks! Your message has been sent.' };
  } catch (error) {
    const errorMessage = parseError(error);

    console.error('📧 Contact form submission failed', { error: errorMessage });

    return { message: errorMessage };
  }
};
