import { social } from '@/lib/social';
import Image from 'next/image';
import Link from 'next/link';
import { Status } from './status';
import { ThemeSwitcher } from './theme-switcher';

export const Footer = () => (
  <footer className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 py-8 sm:px-8">
    <div className="flex items-center justify-center gap-4">
      {Object.values(social).map((link) => (
        <Link key={link.href} href={link.href}>
          <Image
            src={link.icon}
            alt={link.label}
            width={20}
            height={20}
            className="h-5 w-5"
          />
        </Link>
      ))}
    </div>
    <p className="text-muted-foreground text-sm">
      &copy; {new Date().getFullYear()} Hayden Bleasel. All rights reserved.
    </p>
    <Status />
    <ThemeSwitcher />
  </footer>
);
