import { env } from '@/lib/env';
import { resend } from '@/lib/resend';
import Image from 'next/image';
import { TeaserTitle } from './teaser-title';

const teaserIds = [
  '4670c9cc-7e0f-4d4b-a6a3-c27cee3df33d',
  '3f57e5f3-9940-4447-b479-053e2ed92397',
  '71e7c35a-f089-41e7-a395-65816b994f83',
  '6d175576-f268-4718-954c-8b05918bb1e9',
  'f1e1b1a6-919a-4342-896c-1a81c678456f',
];

// Client-side MD5 hashing function
function md5(str: string): string {
  const encoder = new TextEncoder();
  const data = encoder.encode(str.toLowerCase().trim());

  return crypto.subtle.digest('SHA-256', data).then((hash) => {
    return Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  });
}

export const Teaser = async () => {
  const contacts = await resend.contacts.list({
    audienceId: env.RESEND_AUDIENCE_ID,
  });

  return (
    <div className="flex flex-col gap-4">
      <TeaserTitle contacts={contacts.data?.data.length ?? 0} />
      <div className="-space-x-2 flex items-center">
        {contacts.data?.data
          .filter((contact) => teaserIds.includes(contact.id))
          .map(async (contact) => {
            const hashedEmail = await md5(contact.email);
            return (
              <Image
                key={contact.id}
                src={`https://www.gravatar.com/avatar/${hashedEmail}?d=404`}
                alt=""
                width={40}
                height={40}
                className="h-8 w-8 rounded-full object-cover ring-2 ring-secondary"
              />
            );
          })}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background ring-2 ring-secondary">
          <span className="text-[8px] text-muted-foreground">
            +
            {new Intl.NumberFormat('en-US', { notation: 'compact' }).format(
              contacts.data?.data.length - teaserIds.length
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
