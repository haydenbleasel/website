import clsx from 'clsx';
import { ArrowLeft } from 'lucide-react';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
import type { FC } from 'react';

const BackLink: FC<LinkProps> = (props) => (
  <Link
    className={clsx(
      'absolute top-[10px] -left-24 hidden items-center gap-1 text-sm no-underline transition-transform hover:-translate-x-1 lg:flex',
      'text-zinc-500',
      'dark:text-zinc-400'
    )}
    {...props}
  >
    <ArrowLeft size={16} />
    <span>Back</span>
  </Link>
);

export default BackLink;
