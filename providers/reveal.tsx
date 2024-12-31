'use client';

import { cn } from '@/lib/utils';
import { ArrowDown } from 'lucide-react';
import { type ReactNode, useState } from 'react';

type RevealProviderProperties = {
  children: ReactNode;
  className?: string;
};

export const RevealProvider = ({
  className,
  children,
}: RevealProviderProperties) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        open ? 'h-auto' : 'h-[40rem]',
        className
      )}
    >
      {children}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={cn(
            'absolute right-0 bottom-0 left-0 z-10 flex items-center justify-center gap-2 border-t bg-backdrop/90 p-3 text-muted-foreground text-sm backdrop-blur-sm transition-all',
            'hover:bg-background/90'
          )}
        >
          <ArrowDown size={16} />
          <p>See more</p>
        </button>
      )}
    </div>
  );
};
