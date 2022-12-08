import Link from 'next/link';
import type { FC } from 'react';
import { social } from '@/lib/social';

const SocialLinks: FC = () => (
  <div className="flex flex-col flex-wrap gap-4">
    {social.map(({ icon: Icon, name, url, id }) => (
      <Link
        key={id}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={name}
        className="group flex items-center gap-2 text-sm font-medium text-zinc-800 no-underline transition-colors hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon
          className="h-4 w-4 flex-none fill-zinc-500 transition-colors group-hover:fill-teal-500"
          width={16}
          height={16}
        />
        <span>{name}</span>
      </Link>
    ))}
  </div>
);

export default SocialLinks;
