'use server';

import { z } from 'zod';
import { resend } from '@/lib/resend';

export const subscribe = async (
  prevState: any,
  formData: FormData
): Promise<{
  message: string;
}> => {
  const schema = z.object({
    email: z.string().email(),
  });

  const data = schema.parse(Object.fromEntries(formData));

  try {
    const response = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['delivered@resend.dev'],
      subject: 'Hello world',
      text: `Hello, ${data.email}!`,
    });

    if (response.error) {
      throw new Error(response.error);
    }

    return { message: 'Subscribed!' };
  } catch (error) {
    return { message: error.message };
  }
};
