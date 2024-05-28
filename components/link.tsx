import NextLink from 'next/link';
import type { FC, ReactNode } from 'react';

type LinkProperties = {
  readonly href: string;
  readonly children: ReactNode;
  readonly className?: string;
  readonly label?: string;
};

export const Link: FC<LinkProperties> = ({
  href,
  children,
  label,
  ...properties
}) =>
  href.startsWith('/') ? (
    <NextLink href={href} aria-label={label} {...properties}>
      {children}
    </NextLink>
  ) : (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      {...properties}
    >
      {children}
    </a>
  );
