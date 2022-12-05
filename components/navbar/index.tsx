import type { FC } from 'react';
import clsx from 'clsx';
import NavbarLink from './navbarLink';
import ContextualMenu from './contextualMenu';
import ThemeSwitcher from './themeSwitcher';
import pages from '@/lib/navigation';

const Navbar: FC = () => (
  <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center">
    <div
      className={clsx(
        'flex items-center rounded-full border px-3 shadow-lg shadow-zinc-800/5',
        'border-zinc-100 bg-white',
        'dark:border-zinc-700 dark:bg-zinc-900'
      )}
    >
      <div className="flex items-center px-1">
        {pages.map((link) => (
          <NavbarLink key={link.name} {...link} />
        ))}
      </div>
      <ThemeSwitcher />
      <ContextualMenu />
    </div>
  </div>
);

export default Navbar;
