import { format } from 'date-fns';
import domains from 'disposable-email-domains';
import type { NextApiHandler } from 'next';
import type { ReactElement } from 'react';
import sendMail from '../../emails';
import template from '../../emails/TextEmail';

type ContactResponse = {
  error?: string;
  message?: string;
};

const handler: NextApiHandler<ContactResponse> = async (req, res) => {
  const { name, email, message } = req.body as {
    name: string;
    email?: string;
    message?: string;
  };

  if (!email) {
    res.status(400).json({ error: 'Missing email field' });
    return;
  }

  if (!message) {
    res.status(400).json({ error: 'Missing message field' });
    return;
  }

  const domain = email.split('@')[1];

  if (domains.includes(domain)) {
    res.status(400).json({
      error:
        "Sorry, we don't accept disposable email addresses. Please use a different email address.",
    });
    return;
  }

  const ip = req.headers['x-forwarded-for'] as string | undefined;

  try {
    await sendMail({
      subject: 'Incoming message',
      to: process.env.EMAIL_ADDRESS,
      replyTo: email,
      component: template({
        name,
        message,
        items: [
          `Date: ${format(new Date(), 'MMMM do, yyyy at h:mm a')}`,
          `Email: ${email}`,
          `IP: ${ip ?? req.socket.remoteAddress ?? 'Unknown'}`,
          `Device: ${req.headers['user-agent'] ?? 'Unknown'}`,
          `Language: ${req.headers['accept-language'] ?? 'Unknown'}`,
        ],
      }) as ReactElement,
    });

    res.status(200).json({ message: 'Email sent' });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : (error as string);

    res.status(500).json({ error: errorMessage });
  }
};

export default handler;
