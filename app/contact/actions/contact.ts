/* eslint-disable no-console */

'use server';

import { resend } from '@/lib/resend';
import { parseError } from '@/lib/utils';

type ContactProps = {
  name: string;
  email: string;
  message: string;
  type: string;
};

export const contact = async ({
  name,
  email,
  message,
  type,
}: ContactProps): Promise<{
  error?: string;
}> => {
  console.log('📧 Contact form submission', { name, email, message, type });

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
      reply_to: email,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Type: ${type}`,
        `Message: ${message}`,
      ].join('\n\n'),
    });

    console.log('📧 Email sent', { response });

    if (response.error) {
      throw new Error(response.error.message);
    }

    console.log('📧 Contact form submission successful');

    return {};
  } catch (error) {
    const errorMessage = parseError(error);

    console.error('📧 Contact form submission failed', { error: errorMessage });

    return { error: errorMessage };
  }
};
