'use client';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import type { FC, ReactNode } from 'react';

const CurrentPageProvider: FC<{ href: string; children: ReactNode }> = ({
  href,
  children,
}) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <div
      className={clsx('group', {
        'active-page': active,
      })}
    >
      {children}
    </div>
  );
};

export default CurrentPageProvider;
