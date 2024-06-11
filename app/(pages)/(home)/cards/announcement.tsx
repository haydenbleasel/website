import { get } from '@vercel/edge-config';
import { Link } from '@/components/link';
import { cn } from '@/lib/utils';
import { Card } from '@/components/card';
import type { ReactElement } from 'react';

export const AnnouncementCard = async (): Promise<ReactElement> => {
  const announcement = await get<{
    readonly text: string;
    readonly link: string;
  }>('announcement');

  if (!announcement) {
    return <div />;
  }

  return (
    <Card
      title="Latest Update"
      className="flex flex-col items-start justify-between gap-4 p-4"
    >
      <p className="text-neutral-500 dark:text-neutral-400 text-sm">
        {announcement.text}
      </p>
      <Link
        href={announcement.link}
        className={cn(
          'rounded-full text-sm py-2.5 px-4 font-medium',
          'bg-neutral-100 text-neutral-950 placeholder:text-neutral-500 outline-orange-500',
          'dark:bg-neutral-900 dark:text-white dark:placeholder-text-neutral-600'
        )}
      >
        Learn more
      </Link>
    </Card>
  );
};
