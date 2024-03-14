/* eslint-disable no-console */

'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { resend } from '@/lib/resend';
import { parseError } from '@/lib/utils';

export const formSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  message: z.string().min(1).max(1000),
  type: z.enum(['general', 'contract', 'advisory', 'agency']),
});

export const contact = async (
  prevState: any,
  formData: FormData
): Promise<{
  message: string;
}> => {
  const data = formSchema.parse(formData);

  console.log('📧 Contact form submission', data);

  if (!process.env.RESEND_FROM) {
    throw new Error('RESEND_FROM environment variable is not set');
  }

  if (!process.env.RESEND_TO) {
    throw new Error('RESEND_TO environment variable is not set');
  }

  console.log('📧 Constructing React template...');

  try {
    console.log('📧 Sending email...');

    const response = await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: process.env.RESEND_TO,
      subject: 'Contact form submission',
      reply_to: data.email,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Type: ${data.type}`,
        `Message: ${data.message}`,
      ].join('\n\n'),
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
