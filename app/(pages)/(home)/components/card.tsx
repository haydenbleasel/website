import { cn } from '@/lib/utils';
import type { FC, ReactNode } from 'react';

type CardProperties = {
  readonly children: ReactNode;
  readonly className?: string;
};

export const Card: FC<CardProperties> = ({ children, className }) => (
  <div
    className={cn(
      'not-prose bg-white overflow-hidden relative border border-neutral-200 rounded-xl p-4',
      className
    )}
  >
    {children}
  </div>
);
