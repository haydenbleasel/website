import { cn } from '@/lib/utils';
import type { FC, ReactNode } from 'react';

type CardProps = {
  readonly title: string;
  readonly children: ReactNode;
  readonly className?: string;
};

export const Card: FC<CardProps> = ({ title, children, className }) => (
  <div className="rounded-2xl bg-gray-100 p-1">
    <p className="text-neutral-900 dark:text-neutral-100 font-medium py-2 px-4">
      {title}
    </p>
    <div
      className={cn(
        'bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm',
        className
      )}
    >
      {children}
    </div>
  </div>
);
