import Link from 'next/link';
import { Status } from './status';

const links = [
  {
    label: 'Twitter',
    href: 'https://twitter.com/haydenbleasel',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/haydenbleasel',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/haydenbleasel',
  },
];

export const Footer = () => (
  <footer className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 py-8 sm:px-8">
    <div className="flex items-center justify-center gap-4">
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.label}
        </Link>
      ))}
    </div>
    <p className="text-muted-foreground text-sm">
      &copy; {new Date().getFullYear()} Hayden Bleasel. All rights reserved.
    </p>
    <Status />
  </footer>
);
