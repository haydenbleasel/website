import type { FC } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import type { LucideProps } from 'lucide-react';
import Tooltip from '../tooltip';
import CurrentPageProvider from './currentPageProvider';

type NavbarLinkProps = {
  href: string;
  name: string;
  icon: FC<LucideProps>;
};

const NavbarLink: FC<NavbarLinkProps> = ({ name, icon: Icon, href }) => {
  let label = name;

  if (!href.startsWith('/')) {
    label = `${name} ↗️`;
  }

  return (
    <Tooltip label={label}>
      <CurrentPageProvider href={href}>
        <Link href={href} className="relative block p-2">
          <Icon
            size={20}
            className={clsx(
              'cursor-pointer text-zinc-500 transition-colors group-hover:text-teal-600',
              'dark:text-zinc-400 dark:group-hover:text-teal-400',
              'group-[.active-page]:text-teal-600',
              'dark:group-[.active-page]:text-teal-400'
            )}
          />
          <span className="sr-only">{name}</span>
          <span
            className={clsx(
              'absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 opacity-0 transition-opacity group-hover:opacity-100 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0',
              'group-[.active-page]:opacity-100'
            )}
          />
        </Link>
      </CurrentPageProvider>
    </Tooltip>
  );
};

export default NavbarLink;
