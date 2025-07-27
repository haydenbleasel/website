'use client';

import { usePathname } from 'next/navigation';
import { Link } from '@/components/link';
import { cn } from '@/lib/utils';

const links = [
  {
    href: '/',
    label: 'About',
    active: (pathname: string) => pathname === '/',
  },
  {
    href: '/work',
    label: 'Work',
    active: (pathname: string) => pathname.startsWith('/work'),
  },
  {
    href: '/projects',
    label: 'Projects',
    active: (pathname: string) => pathname.startsWith('/projects'),
  },
  {
    href: '/blog',
    label: 'Blog',
    active: (pathname: string) => pathname.startsWith('/blog'),
  },
  {
    href: '/stack',
    label: 'Stack',
    active: (pathname: string) => pathname.startsWith('/stack'),
  },
  {
    href: '/live',
    label: 'Live',
    active: (pathname: string) => pathname.startsWith('/live'),
  },
];

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <ul>
      {links.map(({ href, label, active }) => (
        <li key={href}>
          <Link
            className={cn(
              'block rounded-md px-3 py-2 text-sm hover:bg-muted',
              active(pathname) ? 'text-primary' : 'border-none'
            )}
            href={href}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};
