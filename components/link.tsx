import NextLink from 'next/link';
import type { FC, ReactNode } from 'react';

type LinkProps = {
  readonly href: string;
  readonly children: ReactNode;
  readonly className?: string;
};

export const Link: FC<LinkProps> = ({ href, children, ...props }) =>
  href.startsWith('/') ? (
    <NextLink href={href} {...props}>
      {children}
    </NextLink>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
