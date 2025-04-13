'use client';

import { Link } from '@/components/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Avatar } from './avatar';

const links = [
  {
    href: '/',
    label: 'Home',
    active: (pathname: string) => pathname === '/',
  },
  {
    href: '/blog',
    label: 'Blog',
    active: (pathname: string) => pathname.startsWith('/blog'),
  },
  {
    href: '/contact',
    label: 'Contact',
    active: (pathname: string) => pathname.startsWith('/contact'),
  },
];

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="group -translate-y-1/2 fixed top-1/2 left-0 hidden select-none gap-2 text-foreground-lighter text-xs lg:grid">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex items-center gap-2 transition-opacity',
              link.active(pathname)
                ? 'text-foreground'
                : 'opacity-0 hover:text-foreground group-hover:opacity-100'
            )}
          >
            <div className="h-px w-5 bg-border" />
            {link.label}
          </Link>
        ))}
      </div>
      <div className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between gap-4 border-b border-dotted bg-background/50 p-4 backdrop-blur-sm sm:hidden">
        <Avatar />
        <div className="flex items-center gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-2 text-xs transition-colors',
                link.active(pathname)
                  ? 'text-foreground'
                  : 'text-foreground-lighter'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
