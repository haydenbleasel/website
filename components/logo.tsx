import type { LinkProps } from 'next/link';
import Link from 'next/link';
import type { FC, ReactNode } from 'react';

type LogoProps = LinkProps & {
  icon: FC;
  children: ReactNode;
};

const Logo: FC<LogoProps> = ({ icon: Icon, children, ...props }) => (
  <Link
    {...props}
    className="no-underline inline-block"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span className="inline-block align-baseline">
      <Icon />
    </span>
    <span className="ml-1 underline inline-block">{children}</span>
  </Link>
);

export default Logo;
