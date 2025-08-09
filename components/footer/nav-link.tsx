import Link from 'next/link';
import type { ReactNode } from 'react';

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

export const NavLink = ({ href, children }: NavLinkProps) => (
  <Link
    className="transition hover:text-teal-500 dark:hover:text-teal-400"
    href={href}
  >
    {children}
  </Link>
);
