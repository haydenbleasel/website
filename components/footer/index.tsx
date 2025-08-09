import { ContainerInner, ContainerOuter } from '@/components/Container';
import { NavLink } from './nav-link';

export const Footer = () => (
  <footer className="mt-32 flex-none">
    <ContainerOuter>
      <div className="border-zinc-100 border-t pt-10 pb-16 dark:border-zinc-700/40">
        <ContainerInner>
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 font-medium text-sm text-zinc-800 dark:text-zinc-200">
              <NavLink href="/about">About</NavLink>
              <NavLink href="/projects">Projects</NavLink>
              <NavLink href="/speaking">Speaking</NavLink>
              <NavLink href="/stack">Stack</NavLink>
            </div>
            <p className="text-sm text-zinc-400 dark:text-zinc-500">
              &copy; {new Date().getFullYear()} Hayden Bleasel. All rights
              reserved.
            </p>
          </div>
        </ContainerInner>
      </div>
    </ContainerOuter>
  </footer>
);
