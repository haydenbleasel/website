import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { FC } from 'react';

export const Profile: FC = () => (
  <div className="p-4 flex items-center gap-3">
    <Image
      src="https://pbs.twimg.com/profile_images/1702751101248770048/OdvwPdoQ_400x400.jpg"
      unoptimized
      width={40}
      height={40}
      className="rounded-full w-10 h-10"
      alt=""
    />
    <div>
      <p
        className={cn(
          'text-sm font-semibold',
          'text-zinc-900 dark:text-zinc-100'
        )}
      >
        Hayden Bleasel
      </p>
      <p className={cn('text-sm', 'text-zinc-500 dark:text-zinc-400')}>
        CPO at Corellium
      </p>
    </div>
  </div>
);
