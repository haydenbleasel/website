'use client';
import { usePathname } from 'next/navigation';
import type { FC, ReactNode } from 'react';

const CurrentPageProvider: FC<{ href: string; children: ReactNode }> = ({
  href,
  children,
}) => {
  const pathname = usePathname();
  const active = pathname === href;

  return <div className={active ? 'active-page group' : ''}>{children}</div>;
};

export default CurrentPageProvider;
