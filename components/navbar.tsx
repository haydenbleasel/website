'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Link } from './link';
import type { FC } from 'react';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Work', path: '/work' },
  { name: 'Blog', path: '/blog' },
  { name: 'Stack', path: '/stack' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar: FC = () => {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        'rounded-full px-6 flex items-center gap-6 fixed bottom-6 left-1/2 -translate-x-1/2 backdrop-blur-sm backdrop-filter bg-opacity-50 shadow-lg border text-sm',
        'bg-white/80 border-neutral-950/10'
      )}
    >
      {pages.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className={cn(
            'relative py-3',
            pathname === link.path
              ? 'font-medium text-orange-500'
              : 'text-neutral-500'
          )}
        >
          {link.name}

          {pathname === link.path && (
            <span className="w-full h-px bg-current absolute left-0 top-full" />
          )}
        </Link>
      ))}
    </nav>
  );
};
