'use server';

import { Resend } from 'resend';
import { env } from '@/lib/env';

const audienceId = env.RESEND_AUDIENCE_ID;
const resend = new Resend(env.RESEND_TOKEN);

if (!audienceId) {
  throw new Error('Missing RESEND_AUDIENCE_ID');
}

export const subscribe = async (
  _prevState: unknown,
  formData: FormData
): Promise<{
  message: string;
  error: string;
}> => {
  const email = formData.get('email');

  if (typeof email !== 'string') {
    return { message: '', error: 'Invalid email address' };
  }

  const response = await resend.contacts.create({
    email,
    unsubscribed: false,
    audienceId,
  });

  if (response.error) {
    return { message: '', error: response.error.message };
  }

  return { message: 'Subscribed!', error: '' };
};
