'use server';

import { Resend } from 'resend';
import { render } from '@react-email/render';
import { ContactTemplate as template } from '@/emails/contact';
import { parseError } from '@/lib/error';
import type { ReactElement } from 'react';

if (!process.env.RESEND_TOKEN) {
  throw new Error('RESEND_TOKEN environment variable is not set');
}

const resend = new Resend(process.env.RESEND_TOKEN);

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
  const react = template({
    name,
    email,
    message,
    type,
  }) as ReactElement;
  const text = render(react, { plainText: true });

  if (!process.env.RESEND_FROM) {
    throw new Error('RESEND_FROM environment variable is not set');
  }

  if (!process.env.RESEND_TO) {
    throw new Error('RESEND_TO environment variable is not set');
  }

  try {
    const response = await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: process.env.RESEND_TO,
      subject: 'Contact form submission',
      reply_to: email,
      react,
      text,
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return {};
  } catch (error) {
    const errorMessage = parseError(error);

    return { error: errorMessage };
  }
};
