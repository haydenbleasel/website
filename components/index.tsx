'use client';

import { Link } from '@/components/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { LocalTime } from './local-time';

const links = [
  {
    href: '/',
    label: 'Home',
    active: (pathname: string) => pathname === '/',
  },
  {
    href: '/about',
    label: 'About',
    active: (pathname: string) => pathname.startsWith('/about'),
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
    href: '/contact',
    label: 'Contact',
    active: (pathname: string) => pathname.startsWith('/contact'),
  },
];

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between">
      <LocalTime />
      <ul className="flex gap-4 text-sm">
        {links.map(({ href, label, active }) => (
          <li key={href}>
            <Link
              href={href}
              className={cn(active(pathname) && 'text-primary')}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
