import type { ComponentPropsWithoutRef } from 'react';
import { NavItem } from './nav-item';

type DesktopNavigationProps = ComponentPropsWithoutRef<'nav'>;

export const DesktopNavigation = (props: DesktopNavigationProps) => (
  <nav {...props}>
    <ul className="flex rounded-full bg-white/90 px-3 font-medium text-sm text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
      <NavItem href="/about">About</NavItem>
      <NavItem href="/blog">Blog</NavItem>
      <NavItem href="/projects">Projects</NavItem>
      <NavItem href="/speaking">Speaking</NavItem>
      <NavItem href="/stack">Stack</NavItem>
    </ul>
  </nav>
);
