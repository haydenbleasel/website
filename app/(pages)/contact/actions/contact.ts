/* eslint-disable no-console */

'use server';

import { revalidatePath } from 'next/cache';
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

export const contact = async (
  prevState: never,
  formData: FormData
): Promise<{
  message: string;
}> => {
  const data = formSchema.parse(Object.fromEntries(formData));

  console.log('📧 Contact form submission', data);

  try {
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
