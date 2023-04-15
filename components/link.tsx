import type { FC, HTMLProps } from 'react';

type LinkProps = Omit<HTMLProps<HTMLAnchorElement>, 'href'> & {
  href: string;
};

const Link: FC<LinkProps> = ({ href, children, ...props }) => {
  const isExternal = href.startsWith('http');

  return (
    <a
      {...props}
      href={href}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      target={isExternal ? '_blank' : undefined}
    >
      {children}
    </a>
  );
};

export default Link;
