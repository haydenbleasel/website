import type { LinkProps } from '@prismicio/react';
import Link from 'next/link';
import type { FC } from 'react';
import { Share } from 'react-feather';

const ExternalLinkComponent: FC<LinkProps> = ({ children, href, ...props }) => (
  <Link href={href}>
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className="inline items-center gap-2 text-md font-normal text-gray-500 transition-all hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-500"
    >
      {children}
      {typeof children === 'string' && (
        <div className="text-gray-400 dark:text-gray-600">
          <Share size={16} />
        </div>
      )}
    </a>
  </Link>
);

export default ExternalLinkComponent;
