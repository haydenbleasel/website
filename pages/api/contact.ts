import { format } from 'date-fns';
import domains from 'disposable-email-domains';
import type { NextApiHandler } from 'next';
import type { ReactElement } from 'react';
import sendMail from '@/emails';
import template from '@/emails/TextEmail';
import parseBody from '@/lib/parseBody';
import parseError from '@/lib/parseError';

type ContactRequest = {
  name?: string;
  email?: string;
  message?: string;
} & (
  | {
      type: 'contact';
    }
  | {
      type: 'freelance';
      project: string;
      budget: string;
    }
);

type ContactResponse = {
  error?: string;
  message?: string;
};

export const config = {
  runtime: 'nodejs',
};

const handler: NextApiHandler<ContactResponse> = async (req, res) => {
  const { name, email, message, type, ...props } =
    parseBody<ContactRequest>(req);

  if (
    req.headers.authorization !==
    `Bearer ${process.env.NEXT_PUBLIC_API_PASSPHRASE ?? ''}`
  ) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  if (!name) {
    res.status(400).json({ error: 'No name provided' });
    return;
  }

  if (!email) {
    res.status(400).json({ error: 'Missing email field' });
    return;
  }

  if (!message) {
    res.status(400).json({ error: 'Missing message field' });
    return;
  }

  if (type === 'freelance' && 'project' in props && !props.project) {
    res.status(400).json({ error: 'Missing project field' });
    return;
  }

  const domain = email.split('@')[1];

  if (domains.includes(domain)) {
    res.status(400).json({
      error:
        "Sorry, I don't accept disposable email addresses. Please use a different email address.",
    });
    return;
  }

  const ip = req.headers['x-forwarded-for'] as string | undefined;
  const now = new Date();

  const items = [
    `Date: ${format(now, 'MMMM do, yyyy')} at ${format(now, 'h:mm a')}`,
    `Email: ${email}`,
    `IP: ${ip ?? req.socket.remoteAddress ?? 'Unknown'}`,
    `Device: ${req.headers['user-agent'] ?? 'Unknown'}`,
    `Type: ${type}`,
  ];

  if (type === 'freelance') {
    if ('project' in props) {
      items.push(`Project: ${props.project}`);
    }

    if ('budget' in props) {
      items.push(`Budget: ${props.budget}`);
    }
  }

  try {
    await sendMail({
      subject: `Incoming ${type} request`,
      to: process.env.EMAIL_ADDRESS,
      replyTo: email,
      component: template({
        name,
        message,
        items,
      }) as ReactElement,
    });

    res.status(200).json({ message: 'Email sent' });
  } catch (error) {
    const errorMessage = parseError(error);

    res.status(500).json({ error: errorMessage });
  }
};

export default handler;
