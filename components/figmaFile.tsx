import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import formatDate from '@/lib/formatDate';
import { fetchFigmaFile } from '@/lib/figma';

type FigmaFileProps = {
  id: string;
};

const FigmaFile = async ({ id }: FigmaFileProps): Promise<ReactNode> => {
  const file = await fetchFigmaFile(id);

  return (
    <Link
      href={`https://www.figma.com/file/${id}`}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        'block overflow-hidden rounded-lg border no-underline shadow-lg shadow-zinc-800/5 transition-colors',
        'border-zinc-200 bg-white hover:bg-zinc-50',
        'dark:border-zinc-600 dark:bg-zinc-900 dark:hover:bg-zinc-800'
      )}
    >
      <div className="relative aspect-[2/1] w-full">
        <Image
          src={file.thumbnailUrl}
          width={640}
          height={320}
          quality={100}
          alt=""
          className="relative m-0 w-full rounded-none"
        />
      </div>
      <div className="flex flex-col gap-1 border-t border-zinc-200 p-4 dark:border-zinc-700">
        <p className="m-0 text-base font-medium line-clamp-1 sm:text-lg">
          {file.name}
        </p>
        <p
          className={clsx(
            'm-0 text-sm font-normal sm:text-base',
            'text-zinc-500',
            'dark:text-zinc-400'
          )}
        >
          Last updated {formatDate(new Date(file.lastModified))}
        </p>
      </div>
    </Link>
  );
};

export default FigmaFile;
