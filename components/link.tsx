import NextLink from 'next/link';
import type { FC, ReactNode } from 'react';

type LinkProps = {
  readonly href: string;
  readonly children: ReactNode;
  readonly className?: string;
  readonly label?: string;
};

export const Link: FC<LinkProps> = ({ href, children, label, ...props }) =>
  href.startsWith('/') ? (
    <NextLink href={href} aria-label={label} {...props}>
      {children}
    </NextLink>
  ) : (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      {...props}
    >
      {children}
    </a>
  );
