import { cn } from '@/lib/utils';
import type { FC, ReactNode } from 'react';

type CardProps = {
  readonly title: string;
  readonly children: ReactNode;
  readonly className?: string;
};

export const Card: FC<CardProps> = ({ title, children, className }) => (
  <div
    className={cn('rounded-2xl p-1', 'bg-neutral-100', 'dark:bg-neutral-900')}
  >
    <p
      className={cn(
        'font-medium py-2 px-4',
        'text-neutral-900',
        'dark:text-neutral-100'
      )}
    >
      {title}
    </p>
    <div
      className={cn(
        'border rounded-xl overflow-hidden shadow-sm',
        'bg-white border-neutral-200',
        'dark:bg-neutral-950 dark:border-neutral-800',
        className
      )}
    >
      {children}
    </div>
  </div>
);
