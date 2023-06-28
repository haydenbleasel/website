'use server';

import { getDate } from '@/lib/utils';

type SendEmailProps = {
  name: string;
  email: string;
  message: string;
  type: string;
};

export const sendEmail = async ({
  name,
  email,
  type,
  message,
}: SendEmailProps): Promise<string> => {
  if (
    !process.env.COMLINK_PASSPHRASE ||
    !process.env.POSTMARK_SERVER_API_TOKEN
  ) {
    throw new Error('Missing environment variables.');
  }

  const response = await fetch('https://comlink.beskar.co/api/send', {
    headers: {
      'Content-Type': 'application/json',
      'x-comlink-passphrase': process.env.COMLINK_PASSPHRASE,
    },
    method: 'POST',
    body: JSON.stringify({
      from: 'noreply@beskar.co',
      to: process.env.EMAIL_ADDRESS,
      subject: `Incoming message from ${name}`,
      title: `Incoming message from ${name}`,
      replyTo: email,
      token: process.env.POSTMARK_SERVER_API_TOKEN,
      body: `I would like to ${type.toLowerCase()}.`,
      outro: message,
      footer: `Sent on ${getDate()}`,
    }),
  });

  const data = (await response.json()) as { message: string };

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.message;
};
