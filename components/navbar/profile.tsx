import Image from 'next/image';
import { cn } from '@/lib/utils';
import Avatar from './avatar.jpg';
import type { FC } from 'react';

export const Profile: FC = () => (
  <div className="p-4 flex items-center gap-3">
    <Image
      src={Avatar}
      loading="eager"
      priority
      placeholder="blur"
      width={40}
      height={40}
      className="rounded-full w-10 h-10"
      alt=""
      quality={100}
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
