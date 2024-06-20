import Image from 'next/image';
import { get } from '@vercel/edge-config';
import { cn } from '@/lib/utils';
import { Link } from '@/components/link';
import GitHubLogo from './github.svg';
import type { ReactElement } from 'react';
import type { StaticImageData } from 'next/image';

export const GitHub = async (): Promise<ReactElement> => {
  const github = await get<{ followers: number }>('github');

  return (
    <div
      className={cn(
        'not-prose align-text-bottom inline-flex overflow-hidden border rounded-md shadow-[0_1px_8px_0_rgba(0,0,0,0.04)] scale-[0.8] md:scale-100',
        'border-neutral-200',
        'dark:border-neutral-700'
      )}
    >
      <Link
        className={cn(
          'px-2 py-1.5 border-r shadow-[inset_0_-2px_5px_0_rgba(0,0,0,0.07)] flex items-center justify-center',
          'bg-neutral-100 border-neutral-200',
          'dark:bg-neutral-800 dark:border-neutral-700'
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
          'px-2 py-1.5 text-sm font-medium shadow-[inset_0_-2px_5px_0_rgba(0,0,0,0.07)]',
          'bg-white',
          'dark:bg-neutral-800'
        )}
      >
        {github?.followers ?? '200+'}
      </span>
    </div>
  );
};
