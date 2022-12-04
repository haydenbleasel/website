'use client';

import type { FC } from 'react';
import { Suspense } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import type { LucideProps } from 'lucide-react';
import Tooltip from '../tooltip';

const NavbarLink: FC<{
  href: string;
  name: string;
  icon: string;
}> = ({ name, icon, href }) => {
  const pathname = usePathname();
  const active = pathname === href;
  const Icon = dynamic<LucideProps>(
    async () =>
      import(
        /* webpackChunkName: "lucide-icon" */
        `lucide-react/dist/esm/icons/${icon}`
      ),
    { suspense: true }
  );

  return (
    <Tooltip label={name}>
      <Link href={href} className="p-2 group relative">
        <>
          <Suspense>
            <Icon
              size={20}
              className={clsx(
                'text-gray-500 group-hover:text-teal-600 transition-colors',
                active && 'text-teal-600'
              )}
            />
          </Suspense>
          <span className="sr-only">{name}</span>
          <span
            className={clsx(
              'opacity-0 group-hover:opacity-100 transition-opacity absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0',
              active && 'opacity-100'
            )}
          />
        </>
      </Link>
    </Tooltip>
  );
};

export default NavbarLink;
