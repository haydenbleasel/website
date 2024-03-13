'use server';

import { render } from '@react-email/render';
import { resend } from '@/lib/resend';
import type { ReactElement } from 'react';
import { ContactTemplate as template } from '@/emails/contact';
import { parseError } from '@/lib/error';

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
  log.info('📧 Contact form submission', { name, email, message, type });

  if (!process.env.RESEND_FROM) {
    throw new Error('RESEND_FROM environment variable is not set');
  }

  if (!process.env.RESEND_TO) {
    throw new Error('RESEND_TO environment variable is not set');
  }

  log.info('📧 Constructing React template...');

  const react = template({
    name,
    email,
    message,
    type,
  }) as ReactElement;

  log.info('📧 Constructing text template...');

  const text = render(react, { plainText: true });

  try {
    log.info('📧 Sending email...');

    const response = await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: process.env.RESEND_TO,
      subject: 'Contact form submission',
      reply_to: email,
      react,
      text,
    });

    log.info('📧 Email sent', { response });

    if (response.error) {
      throw new Error(response.error.message);
    }

    log.info('📧 Contact form submission successful');

    return {};
  } catch (error) {
    const errorMessage = parseError(error);

    log.error('📧 Contact form submission failed', { error: errorMessage });

    return { error: errorMessage };
  }
};
