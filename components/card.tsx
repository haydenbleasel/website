import { cn } from '@/lib/utils';
import type { FC, ReactNode } from 'react';

type CardProperties = {
  readonly title: string;
  readonly children: ReactNode;
  readonly className?: string;
};

export const Card: FC<CardProperties> = ({ title, children, className }) => (
  <div
    className={cn(
      'flex flex-col rounded-2xl p-1',
      'bg-neutral-100',
      'dark:bg-neutral-900'
    )}
  >
    <p
      className={cn(
        'm-0 block shrink-0 px-4 py-2 font-medium text-sm',
        'text-neutral-900',
        'dark:text-neutral-100'
      )}
    >
      {title}
    </p>
    <div
      className={cn(
        'relative flex-1 overflow-hidden rounded-xl border shadow-sm',
        'border-neutral-200 bg-white',
        'dark:border-neutral-800 dark:bg-neutral-950',
        className
      )}
    >
      {children}
    </div>
  </div>
);
