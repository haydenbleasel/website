import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react';
import { CaretDownIcon, XIcon } from '@phosphor-icons/react/dist/ssr';
import type { ComponentPropsWithoutRef } from 'react';
import { MobileNavItem } from './mobile-nav-item';

type MobileNavigationProps = ComponentPropsWithoutRef<typeof Popover>;

export const MobileNavigation = (props: MobileNavigationProps) => (
  <Popover {...props}>
    <PopoverButton className="group flex items-center rounded-full bg-white/90 px-4 py-2 font-medium text-sm text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20">
      Menu
      <CaretDownIcon className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400" />
    </PopoverButton>
    <PopoverBackdrop
      className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-xs duration-150 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in dark:bg-black/80"
      transition
    />
    <PopoverPanel
      className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 duration-150 data-closed:scale-95 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in dark:bg-zinc-900 dark:ring-zinc-800"
      focus
      transition
    >
      <div className="flex flex-row-reverse items-center justify-between">
        <PopoverButton aria-label="Close menu" className="-m-1 p-1">
          <XIcon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
        </PopoverButton>
        <h2 className="font-medium text-sm text-zinc-600 dark:text-zinc-400">
          Navigation
        </h2>
      </div>
      <nav className="mt-6">
        <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
          <MobileNavItem href="/about">About</MobileNavItem>
          <MobileNavItem href="/blog">Blog</MobileNavItem>
          <MobileNavItem href="/projects">Projects</MobileNavItem>
          <MobileNavItem href="/speaking">Speaking</MobileNavItem>
          <MobileNavItem href="/stack">Stack</MobileNavItem>
        </ul>
      </nav>
    </PopoverPanel>
  </Popover>
);
