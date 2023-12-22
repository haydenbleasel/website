'use client';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { FC, ReactNode } from 'react';

type ActiveProviderProps = {
  readonly href: string;
  readonly children: ReactNode;
  readonly className?: string;
};

export const ActiveProvider: FC<ActiveProviderProps> = ({
  className,
  href,
  children,
}) => {
  const pathname = usePathname();

  // I use `startsWith` here to handle nested routes
  const active = href === '/' ? pathname === href : pathname.startsWith(href);

  return (
    <div
      className={cn('group', className, {
        'active-page': active,
      })}
    >
      {children}
    </div>
  );
};
