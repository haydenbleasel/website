import { Links } from './links';
import { Status } from './status';
import { ThemeSwitcher } from './theme-switcher';

export const Footer = () => (
  <footer className="container mx-auto flex flex-col gap-16 px-4 py-16 sm:px-0">
    <Links />
    <div className="grid grid-cols-3">
      <Status />
      <div className="flex items-center justify-center">
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Hayden Bleasel. All rights reserved.
        </p>
      </div>
      <div className="flex items-center justify-end">
        <ThemeSwitcher />
      </div>
    </div>
  </footer>
);
