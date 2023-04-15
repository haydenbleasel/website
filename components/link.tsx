import type { ComponentPropsWithRef, FC } from 'react';
import NextLink from 'next/link';

type NextLinkProps = ComponentPropsWithRef<typeof NextLink>;

const Link: FC<NextLinkProps> = (props) => {
  const { href } = props;
  const isExternal = typeof href === 'string' ? href.startsWith('http') : false;

  return (
    <NextLink
      {...props}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      target={isExternal ? '_blank' : undefined}
    />
  );
};

export default Link;
