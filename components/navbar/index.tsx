'use client';
import type { FC, HTMLProps } from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import { Plus } from 'lucide-react';
import NavbarLink from './navbarLink';
import ContextualMenu from './contextualMenu';
import ThemeSwitcher from './themeSwitcher';
import pages from '@/lib/navigation';

const Container: FC<HTMLProps<HTMLDivElement>> = ({ className, ...props }) => (
  <div
    className={clsx(
      'mx-auto flex items-center rounded-full border shadow-lg shadow-zinc-800/5',
      'border-zinc-100 bg-white',
      'dark:border-zinc-700 dark:bg-zinc-900',
      className
    )}
    {...props}
  />
);

const Navbar: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col-reverse justify-center gap-2 sm:right-0 sm:left-0">
      <Container className="flex sm:hidden">
        <button
          className="relative block p-2"
          type="button"
          onClick={() => setOpen((prev) => !prev)}
        >
          <Plus
            size={20}
            className={clsx(
              'cursor-pointer text-zinc-500 transition-colors group-hover:text-teal-600',
              'dark:text-zinc-400 dark:group-hover:text-teal-400',
              'group-[.active-page]:text-teal-600',
              'dark:group-[.active-page]:text-teal-400'
            )}
          />
          <span className="sr-only">Open Menu</span>
          <span
            className={clsx(
              'absolute inset-x-1 -bottom-px hidden h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 opacity-0 transition-opacity group-hover:opacity-100 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0 sm:block',
              'group-[.active-page]:opacity-100'
            )}
          />
        </button>
      </Container>
      <Container
        className={clsx(
          'hidden flex-col py-1 sm:flex sm:flex-row sm:py-0 sm:px-3',
          open && '!flex'
        )}
      >
        <div className="flex flex-col items-center sm:flex-row sm:px-1">
          {pages.map((link) => (
            <NavbarLink key={link.name} {...link} />
          ))}
        </div>
        <ThemeSwitcher />
        <ContextualMenu />
      </Container>
    </div>
  );
};

export default Navbar;
