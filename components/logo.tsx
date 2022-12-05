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
    className="inline-block no-underline"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span className="inline-block align-baseline dark:brightness-0 dark:invert">
      <Icon />
    </span>
    <span className="ml-1 inline-block underline">{children}</span>
  </Link>
);

export default Logo;
