import { parseError } from '@/lib/error';
import { res } from '@/lib/response';
import { getDate } from '@/lib/utils';

type ContactRequest = {
  name?: string;
  email?: string;
  message?: string;
  type?: string;
};

export const POST = async (req: Request): Promise<Response> => {
  const { name, email, message, type } = (await req.json()) as ContactRequest;
  const origin = new URL(req.headers.get('origin') ?? '').href;
  const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? '').href;

  if (origin !== siteUrl) {
    return res(401, { message: 'Unauthorized' });
  }

  if (!process.env.COMLINK_PASSPHRASE) {
    return res(500, { message: 'No Comlink passphrase provided' });
  }

  if (!process.env.POSTMARK_SERVER_API_TOKEN) {
    return res(500, { message: 'No Postmark API token provided' });
  }

  if (!name) {
    return res(400, { message: 'Missing name field' });
  }

  if (!email) {
    return res(400, { message: 'Missing email field' });
  }

  if (!message) {
    return res(400, { message: 'Missing message field' });
  }

  if (!type) {
    return res(400, { message: 'Missing type field' });
  }

  try {
    const response = await fetch('https://comlink.beskar.co/api/send', {
      headers: {
        'Content-Type': 'application/json',
        'x-comlink-passphrase': process.env.COMLINK_PASSPHRASE,
      },
      method: 'POST',
      body: JSON.stringify({
        from: 'noreply@beskar.co',
        to: process.env.EMAIL_ADDRESS,
        subject: `Incoming ${type} message from ${name}`,
        title: `Incoming ${type} message from ${name}`,
        replyTo: email,
        token: process.env.POSTMARK_SERVER_API_TOKEN,
        body: message,
        footer: `Sent on ${getDate()}`,
      }),
    });

    const data = (await response.json()) as { message: string };

    if (!response.ok) {
      throw new Error(data.message);
    }

    return res(200, { message: data.message });
  } catch (error) {
    const errorMessage = parseError(error);

    return res(500, { message: errorMessage });
  }
};
