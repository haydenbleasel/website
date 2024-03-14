'use client';

import { usePathname } from 'next/navigation';
import {
  BriefcaseBusinessIcon,
  HomeIcon,
  LayersIcon,
  MessagesSquareIcon,
  NewspaperIcon,
  NotebookPenIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from './link';
import type { FC } from 'react';

const pages = [
  { name: 'Home', path: '/', icon: HomeIcon },
  { name: 'Work', path: '/work', icon: BriefcaseBusinessIcon },
  { name: 'Blog', path: '/blog', icon: NotebookPenIcon },
  { name: 'Features', path: '/features', icon: NewspaperIcon },
  { name: 'Stack', path: '/stack', icon: LayersIcon },
  { name: 'Contact', path: '/contact', icon: MessagesSquareIcon },
];

export const Navbar: FC = () => {
  const pathname = usePathname();
  const isActive = (path: string) =>
    path === '/' ? path === pathname : pathname.startsWith(path);

  return (
    <nav
      className={cn(
        'rounded-full px-6 flex items-center gap-6 fixed bottom-6 left-1/2 -translate-x-1/2 backdrop-blur-sm backdrop-filter bg-opacity-50 shadow-lg border text-sm',
        'bg-white/80 border-neutral-950/10',
        'dark:bg-neutral-950/80 dark:border-neutral-100/10'
      )}
    >
      {pages.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className={cn(
            'relative py-3',
            isActive(link.path)
              ? 'font-medium text-orange-500'
              : 'text-neutral-500 dark:text-neutral-400'
          )}
        >
          <span className="block sm:hidden">
            <link.icon className="w-5 h-5" />
          </span>
          <span className="hidden sm:block">{link.name}</span>
          {isActive(link.path) && (
            <span className="w-full h-px bg-current absolute left-0 top-full" />
          )}
        </Link>
      ))}
    </nav>
  );
};
