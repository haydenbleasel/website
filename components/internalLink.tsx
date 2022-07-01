import type { LinkProps } from '@prismicio/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FC } from 'react';

const InternalLinkComponent: FC<LinkProps> = ({ children, href, ...props }) => {
  const { asPath } = useRouter();
  const active = asPath === href;

  return (
    <Link
      href={href}
      className={`text-md font-normal transition-all ${
        active
          ? 'text-gray-600 dark:text-gray-300'
          : 'text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-300'
      }`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default InternalLinkComponent;
