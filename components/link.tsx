import NextLink from 'next/link';
import type { FC } from 'react';

type LinkProps = {
  readonly href: string;
  readonly children: string;
};

export const Link: FC<LinkProps> = ({ href, children }) =>
  href.startsWith('/') ? (
    <NextLink href={href}>{children}</NextLink>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
