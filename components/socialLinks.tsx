'use client';

import Link from 'next/link';
import type { FC } from 'react';
import { social } from '@/lib/social';
import { MoreHorizontal } from 'lucide-react';
import Popover from './popover';

const SocialLinks: FC = () => (
  <div className="-m-[14px] flex max-w-[16rem] flex-wrap">
    {social
      .filter(({ featured }) => featured)
      .map(({ icon: Icon, name, url, id }) => (
        <Link
          key={id}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className="group flex items-center gap-2 p-[14px] text-sm font-medium text-zinc-800 no-underline transition-colors hover:text-emerald-500 dark:text-zinc-200 dark:hover:text-emerald-500"
          data-no-glimpse
        >
          <Icon
            className="h-5 w-5 flex-none fill-zinc-500 transition-colors group-hover:fill-emerald-500"
            width={20}
            height={20}
          />
          <span className="sr-only">{name}</span>
        </Link>
      ))}
    <Popover
      content={
        <div className="flex flex-col">
          {social
            .filter(({ featured }) => !featured)
            .map(({ icon: Icon, name, url, id }) => (
              <Link
                key={id}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="group flex items-center gap-2 p-2 text-sm font-medium text-zinc-800 no-underline transition-colors hover:text-emerald-500 dark:text-zinc-200 dark:hover:text-emerald-500"
                data-no-glimpse
              >
                <Icon
                  className="h-5 w-5 flex-none fill-zinc-500 transition-colors group-hover:fill-emerald-500"
                  width={20}
                  height={20}
                />
                <span>{name}</span>
              </Link>
            ))}
        </div>
      }
    >
      <div className="group flex cursor-pointer items-center gap-2 p-[14px] text-sm font-medium text-zinc-800 no-underline transition-colors hover:text-emerald-500 dark:text-zinc-200 dark:hover:text-emerald-500">
        <MoreHorizontal className="h-5 w-5 flex-none text-zinc-500 transition-colors group-hover:text-emerald-500" />
      </div>
    </Popover>
  </div>
);

export default SocialLinks;
