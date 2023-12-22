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
      'bg-neutral-50 border-neutral-200',
      'dark:bg-neutral-900 dark:border-neutral-700'
    )}
  >
    <p className="text-neutral-900 dark:text-white text-sm m-0">{text}</p>
    <Button asChild>
      <Link href={link} className="no-underline">
        {cta}
      </Link>
    </Button>
  </div>
);
