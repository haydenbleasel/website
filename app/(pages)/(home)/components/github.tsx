import { Link } from '@/components/link';
import { cn } from '@/lib/utils';
import { get } from '@vercel/edge-config';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import type { ReactElement } from 'react';
import GitHubLogo from './github.svg';

export const GitHub = async (): Promise<ReactElement> => {
  const github = await get<{ followers: number }>('github');

  return (
    <div
      className={cn(
        'not-prose inline-flex scale-[0.8] overflow-hidden rounded-md border align-text-bottom shadow-[0_1px_8px_0_rgba(0,0,0,0.04)] md:scale-100',
        'border-neutral-200',
        'dark:border-neutral-700'
      )}
    >
      <Link
        className={cn(
          'flex items-center justify-center border-r px-2 py-1.5 shadow-[inset_0_-2px_5px_0_rgba(0,0,0,0.07)]',
          'border-neutral-200 bg-neutral-100',
          'dark:border-neutral-700 dark:bg-neutral-800'
        )}
        href="https://github.com/haydenbleasel"
        aria-label="GitHub"
      >
        <Image
          alt=""
          className="h-5 w-5 dark:invert"
          src={GitHubLogo as StaticImageData}
        />
      </Link>{' '}
      <span
        className={cn(
          'px-2 py-1.5 font-medium text-sm shadow-[inset_0_-2px_5px_0_rgba(0,0,0,0.07)]',
          'bg-white',
          'dark:bg-neutral-800'
        )}
      >
        {github?.followers ?? '200+'}
      </span>
    </div>
  );
};
