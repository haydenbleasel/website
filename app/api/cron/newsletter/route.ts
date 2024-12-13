import { env } from '@/lib/env';
import { resend } from '@/lib/resend';
import { parseError } from '@/lib/utils';
import { updateEdgeConfig } from '@/lib/vercel';

export const maxDuration = 300;
export const revalidate = 0;
export const dynamic = 'force-dynamic';

export type ContactsProps = {
  total: number;
  subscribers: {
    id: string;
    hash: string;
  }[];
};

const md5 = async (str: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(str.toLowerCase().trim());

  const hash = await crypto.subtle.digest('SHA-256', data);

  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

const teaserIds = [
  '4670c9cc-7e0f-4d4b-a6a3-c27cee3df33d',
  '3f57e5f3-9940-4447-b479-053e2ed92397',
  '71e7c35a-f089-41e7-a395-65816b994f83',
  '6d175576-f268-4718-954c-8b05918bb1e9',
  'f1e1b1a6-919a-4342-896c-1a81c678456f',
  '2de4bbf5-0e8a-41cb-a55c-a1bbf0bbc57a',
];

export const GET = async (): Promise<Response> => {
  try {
    const contacts = await resend.contacts.list({
      audienceId: env.RESEND_AUDIENCE_ID,
    });

    if (!contacts.data?.data.length) {
      throw new Error('No contacts found');
    }

    const hashes = await Promise.all(
      contacts.data.data
        .filter((contact) => teaserIds.includes(contact.id))
        .map(async (contact) => ({
          id: contact.id,
          hash: await md5(contact.email),
        }))
    );

    const props: ContactsProps = {
      total: contacts.data.data.length,
      subscribers: hashes,
    };

    await updateEdgeConfig('resend', props);

    return new Response(undefined, { status: 204 });
  } catch (error) {
    const message = parseError(error);

    return new Response(message, { status: 500 });
  }
};
