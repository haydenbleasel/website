import type { LinkProps } from '@prismicio/react';
import Link from 'next/link';
import type { FC } from 'react';
import { ArrowUpRight } from 'react-feather';

const ExternalLinkComponent: FC<LinkProps> = ({ children, href, ...props }) => (
  <Link href={href}>
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className="inline text-md font-normal text-gray-900 transition-colors hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
    >
      {children}
      {Array.isArray(children) && (
        <ArrowUpRight
          size={14}
          className="ml-[2px] inline -translate-y-[2px]"
        />
      )}
    </a>
  </Link>
);

export default ExternalLinkComponent;
