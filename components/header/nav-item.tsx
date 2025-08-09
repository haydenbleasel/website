import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

type NavItemProps = {
  href: string;
  children: ReactNode;
};

export const NavItem = ({ href, children }: NavItemProps) => {
  const isActive = usePathname() === href;

  return (
    <li>
      <Link
        className={clsx(
          'relative block px-3 py-2 transition',
          isActive
            ? 'text-teal-500 dark:text-teal-400'
            : 'hover:text-teal-500 dark:hover:text-teal-400'
        )}
        href={href}
      >
        {children}
        {isActive && (
          <span className="-bottom-px absolute inset-x-1 h-px bg-linear-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0" />
        )}
      </Link>
    </li>
  );
};
