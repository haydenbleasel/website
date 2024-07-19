import { cn } from '@/lib/utils';
import Image from 'next/image';
import type { FC } from 'react';
import Profile from './avatar.jpg';

export const Avatar: FC = () => (
  <Image
    alt=""
    className={cn(
      'm-0 inline w-8 aspect-square overflow-hidden object-cover rounded-md border rotate-6 -translate-y-0.5',
      'border-neutral-200',
      'dark:border-neutral-700'
    )}
    src={Profile}
  />
);
