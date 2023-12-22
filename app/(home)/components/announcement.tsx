import { Link } from '@/components/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { FC } from 'react';

export type AnnouncementProps = {
  readonly text: string;
  readonly cta: string;
  readonly link: string;
};

export const Announcement: FC<AnnouncementProps> = ({ text, cta, link }) => (
  <div
    className={cn(
      'flex flex-col items-start gap-4 border rounded-lg p-4',
      'bg-zinc-50 border-zinc-200',
      'dark:bg-zinc-900 dark:border-zinc-700'
    )}
  >
    <p className="text-zinc-900 dark:text-white text-sm m-0">{text}</p>
    <Button asChild>
      <Link href={link} className="no-underline">
        {cta}
      </Link>
    </Button>
  </div>
);
