import type { ContactsProps } from '@/app/api/cron/newsletter/route';
import { get } from '@vercel/edge-config';
import Image from 'next/image';
import { TeaserTitle } from './teaser-title';

export const Teaser = async () => {
  const contacts = await get<ContactsProps>('resend');

  return (
    <div className="flex flex-col gap-4">
      <TeaserTitle contacts={contacts?.total ?? 2200} />
      <div className="-space-x-2 flex items-center">
        {contacts?.subscribers.map((contact) => (
          <Image
            key={contact.id}
            src={`https://www.gravatar.com/avatar/${contact.hash}?d=404`}
            alt=""
            width={40}
            height={40}
            className="h-8 w-8 rounded-full object-cover ring-2 ring-secondary"
          />
        ))}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background ring-2 ring-secondary">
          <span className="text-[8px] text-muted-foreground">
            +
            {new Intl.NumberFormat('en-US', { notation: 'compact' }).format(
              (contacts?.total ?? 0) - (contacts?.subscribers.length ?? 0)
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
