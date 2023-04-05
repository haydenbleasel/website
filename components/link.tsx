import type { ComponentPropsWithRef, FC } from 'react';
import NextLink from 'next/link';

type NextLinkProps = ComponentPropsWithRef<typeof NextLink>;

type LinkProps = Omit<NextLinkProps, 'href'> & {
  href: string;
};

const Link: FC<LinkProps> = ({ href, ...props }) => {
  const isExternal = href.startsWith('http');

  return (
    <NextLink
      {...props}
      href={href}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      target={isExternal ? '_blank' : undefined}
    />
  );
};

export default Link;
