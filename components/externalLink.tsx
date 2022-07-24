import type { LinkProps } from '@prismicio/react';
import Link from 'next/link';
import type { FC } from 'react';
import { ArrowUpRight } from 'react-feather';

const ExternalLinkComponent: FC<LinkProps> = ({ children, ...props }) => (
  <Link {...props}>
    {children}
    <ArrowUpRight size={14} className="ml-[2px] inline -translate-y-[2px]" />
  </Link>
);

export default ExternalLinkComponent;
