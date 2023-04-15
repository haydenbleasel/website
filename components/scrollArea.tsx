'use client';

import type { FC, ReactNode } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import clsx from 'clsx';

type ScrollAreaProviderProps = {
  orientation?: ScrollArea.ScrollAreaScrollbarProps['orientation'];
  children: ReactNode;
};

const ScrollAreaProvider: FC<ScrollAreaProviderProps> = ({
  orientation = 'vertical',
  children,
}) => (
  <ScrollArea.Root className="relative h-screen w-full overflow-hidden">
    <ScrollArea.Viewport className="h-full w-full">
      {children}
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar
      orientation={orientation}
      className={clsx(
        'flex touch-none select-none transition-colors',
        orientation === 'vertical'
          ? 'h-full w-2.5 border-l border-l-transparent p-[1px]'
          : 'h-2.5 border-t border-t-transparent p-[1px]'
      )}
    />
    <ScrollArea.Corner />
  </ScrollArea.Root>
);

export default ScrollAreaProvider;
