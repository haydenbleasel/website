import Link from 'next/link';
import type { FC } from 'react';
import { social } from '@/lib/social';

const SocialLinks: FC = () => (
  <div className="flex flex-wrap">
    {social.map(({ icon: Icon, name, url, id }) => (
      <Link
        key={id}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={name}
        className="group flex items-center gap-2 p-[14px] text-sm font-medium text-zinc-800 no-underline transition-colors hover:text-emerald-500 dark:text-zinc-200 dark:hover:text-emerald-500"
      >
        <Icon
          className="h-5 w-5 flex-none fill-zinc-500 transition-colors group-hover:fill-emerald-500"
          width={20}
          height={20}
        />
        <span className="sr-only">{name}</span>
      </Link>
    ))}
  </div>
);

export default SocialLinks;
