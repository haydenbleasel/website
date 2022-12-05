import Link from 'next/link';
import type { FC } from 'react';
import { social } from '@/lib/social';

const SocialLinks: FC = () => (
  <div className="flex flex-wrap flex-col gap-4">
    {social.map(({ icon: Icon, name, url, id }) => (
      <Link
        key={id}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={name}
        className="group flex items-center gap-2 no-underline text-sm font-medium text-gray-800 hover:text-teal-500 dark:text-gray-200 dark:hover:text-teal-500"
      >
        <Icon
          className="flex-none w-4 h-4 fill-gray-500 transition group-hover:fill-teal-500"
          width={16}
          height={16}
        />
        <span>{name}</span>
      </Link>
    ))}
  </div>
);

export default SocialLinks;
