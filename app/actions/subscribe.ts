'use server';

import { resend } from '@/lib/resend';
import { parseError } from '@/lib/utils';

const audienceId = process.env.RESEND_AUDIENCE_ID;

if (!audienceId) {
  throw new Error('Missing RESEND_AUDIENCE_ID');
}

export const subscribe = async (
  email: string
): Promise<
  | {
      message: string;
    }
  | {
      error: string;
    }
> => {
  try {
    const response = await resend.contacts.create({
      email,
      unsubscribed: false,
      audienceId,
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return { message: 'Subscribed!' };
  } catch (error) {
    const message = parseError(error);

    return { error: message };
  }
};
