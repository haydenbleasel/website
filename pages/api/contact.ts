import { format } from 'date-fns';
import domains from 'disposable-email-domains';
import parseError from '@/lib/parseError';
import type { NextRequest } from 'next/server';

type ContactRequest = {
  name?: string;
  email?: string;
  message?: string;
} & (
  | {
      type: 'contact' | 'consulting' | 'board';
    }
  | {
      type: 'freelance';
      project: string;
      budget: string;
    }
);

export const config = {
  runtime: 'edge',
};

const res = (status: number, message: string) =>
  new Response(JSON.stringify({ message }), { status });

const handler = async (req: NextRequest): Promise<Response> => {
  const { name, email, message, type, ...props } =
    (await req.json()) as ContactRequest;
  const authorization = req.headers.get('authorization');
  const expectedAuthorization = `Bearer ${
    process.env.NEXT_PUBLIC_API_PASSPHRASE ?? ''
  }`;

  if (authorization !== expectedAuthorization) {
    return res(401, 'Unauthorized');
  }

  if (!process.env.COMLINK_PASSPHRASE) {
    return res(500, 'No Comlink passphrase provided');
  }

  if (!process.env.POSTMARK_SERVER_API_TOKEN) {
    return res(500, 'No Postmark API token provided');
  }

  if (!process.env.EMAIL_ADDRESS) {
    return res(500, 'No destination email address provided');
  }

  if (!name) {
    return res(400, 'Missing name field');
  }

  if (!email) {
    return res(400, 'Missing email field');
  }

  if (!message) {
    return res(400, 'Missing message field');
  }

  if (type === 'freelance' && 'project' in props && !props.project) {
    return res(400, 'Missing project field');
  }

  const domain = email.split('@')[1];

  if (domains.includes(domain)) {
    return res(
      400,
      "Sorry, I don't accept disposable email addresses. Please use a different email address."
    );
  }

  const items = [];

  if (type === 'freelance') {
    if ('project' in props) {
      items.push(`Project: ${props.project}`);
    }

    if ('budget' in props) {
      items.push(`Budget: ${props.budget}`);
    }
  }

  try {
    const response = await fetch('https://comlink.beskar.co/api/send', {
      headers: {
        'Content-Type': 'application/json',
        'x-comlink-passphrase': process.env.COMLINK_PASSPHRASE,
      },
      method: 'POST',
      body: JSON.stringify({
        to: process.env.EMAIL_ADDRESS,
        from: 'noreply@beskar.co',
        replyTo: email,
        token: process.env.POSTMARK_SERVER_API_TOKEN,
        subject: `Incoming ${type} message from ${name}`,
        title: `Incoming ${type} message from ${name}`,
        message,
        outro: items.join(', '),
        footer: `Sent on ${format(new Date(), 'MMMM do, yyyy')}`,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return res(200, 'Message sent successfully');
  } catch (error) {
    const errorMessage = parseError(error);

    return res(500, errorMessage);
  }
};

export default handler;
