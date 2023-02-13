'use client';

import Link from 'next/link';
import type { FC } from 'react';
import { social } from '@/lib/social';
import Popover from './popover';
import Tooltip from './tooltip';
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';

const SocialLinks: FC = () => (
  <div className="-m-[14px] flex max-w-[16rem] flex-wrap">
    {social
      .filter(({ featured }) => featured)
      .map(({ icon: Icon, name, url, id }) => (
        <Tooltip key={id} content={name}>
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className="group flex items-center gap-2 p-[14px] text-sm font-medium text-neutral-800 no-underline transition-colors hover:text-emerald-500 dark:text-neutral-200 dark:hover:text-emerald-500"
            data-no-glimpse
          >
            <Icon
              className="h-5 w-5 flex-none fill-neutral-500 transition-colors group-hover:fill-emerald-500"
              width={20}
              height={20}
            />
            <span className="sr-only">{name}</span>
          </Link>
        </Tooltip>
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
                className="group flex items-center gap-2 p-2 text-sm font-medium text-neutral-800 no-underline transition-colors hover:text-emerald-500 dark:text-neutral-200 dark:hover:text-emerald-500"
                data-no-glimpse
              >
                <Icon
                  className="h-5 w-5 flex-none fill-neutral-500 transition-colors group-hover:fill-emerald-500"
                  width={20}
                  height={20}
                />
                <span>{name}</span>
              </Link>
            ))}
        </div>
      }
    >
      <div className="group flex cursor-pointer items-center gap-2 p-[14px] text-sm font-medium text-neutral-800 no-underline transition-colors hover:text-emerald-500 dark:text-neutral-200 dark:hover:text-emerald-500">
        <EllipsisHorizontalIcon className="h-5 w-5 flex-none text-neutral-500 transition-colors group-hover:text-emerald-500" />
      </div>
    </Popover>
  </div>
);

export default SocialLinks;
