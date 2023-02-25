import type { FC, HTMLProps } from 'react';
import ExternalLink from './externalLink';

type LogoProps = HTMLProps<HTMLAnchorElement> & {
  icon: FC;
};

const Logo: FC<LogoProps> = ({ icon: Icon, children, ...props }) => (
  <ExternalLink
    {...props}
    className="inline-flex items-center align-bottom no-underline"
  >
    <span className="inline-block align-baseline dark:brightness-0 dark:invert">
      <Icon />
    </span>
    <span className="ml-1 inline-block underline">{children}</span>
  </ExternalLink>
);

export default Logo;
