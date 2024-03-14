'use server';

import { z } from 'zod';
import { resend } from '@/lib/resend';
import { parseError } from '@/lib/utils';

const audienceId = process.env.RESEND_AUDIENCE_ID;

if (!audienceId) {
  throw new Error('Missing RESEND_AUDIENCE_ID');
}

export const subscribe = async (
  prevState: never,
  formData: FormData
): Promise<{
  message: string;
}> => {
  const schema = z.object({
    email: z.string().email(),
  });

  const data = schema.parse(Object.fromEntries(formData));

  try {
    const response = await resend.contacts.create({
      email: data.email,
      unsubscribed: false,
      audienceId,
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return { message: 'Subscribed!' };
  } catch (error) {
    const message = parseError(error);

    return { message };
  }
};
