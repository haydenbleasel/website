import { cn } from '@/lib/utils';
import type { FC, ReactNode } from 'react';

type ContainerProps = {
  readonly wide?: boolean;
  readonly children: ReactNode;
};

export const Container: FC<ContainerProps> = ({ wide, children }) => (
  <div
    className={cn(
      'container px-4 sm:px-8 py-16 lg:py-24 mx-auto prose prose-zinc dark:prose-invert',
      wide && 'max-w-4xl'
    )}
  >
    {children}
  </div>
);
