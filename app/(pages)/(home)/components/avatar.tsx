import { cn } from '@/lib/utils';
import Image from 'next/image';
import type { FC } from 'react';
import Profile from './avatar.jpg';

export const Avatar: FC = () => (
  <Image
    alt=""
    className={cn(
      '-translate-y-0.5 m-0 inline aspect-square w-8 rotate-6 overflow-hidden rounded-md border object-cover',
      'border-neutral-200',
      'dark:border-neutral-700'
    )}
    src={Profile}
  />
);
