'use client';

import { Link } from '@/components/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

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
    href: '/stack',
    label: 'Stack',
    active: (pathname: string) => pathname.startsWith('/stack'),
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
    <ul className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col justify-center p-4">
      {links.map(({ href, label, active }) => (
        <li key={href}>
          <Link
            href={href}
            className={cn(
              'block rounded-md px-3 py-2 text-sm hover:bg-muted',
              active(pathname) ? 'text-primary' : 'border-none'
            )}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};
