import type { ReactNode } from 'react';
import Link from 'next/link';
import * as Figma from 'figma-api';
import Image from 'next/image';
import formatDate from '@/lib/formatDate';

type FigmaFileProps = {
  id: string;
};

const api = new Figma.Api({
  personalAccessToken: process.env.FIGMA_ACCESS_TOKEN ?? '',
});

const FigmaFile = async ({ id }: FigmaFileProps): Promise<ReactNode> => {
  const file = await api.getFile(id);

  return (
    <Link
      href={`https://www.figma.com/file/${id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block overflow-hidden rounded-lg border border-zinc-200 bg-white no-underline shadow-lg shadow-zinc-800/5 transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:hover:bg-zinc-800"
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
        <p className="line-clamp-1 m-0 text-base font-medium text-zinc-900 dark:text-white sm:text-lg">
          {file.name}
        </p>
        <p className="m-0 text-sm font-normal text-zinc-500 dark:text-zinc-400 sm:text-base">
          Last updated {formatDate(new Date(file.lastModified))}
        </p>
      </div>
    </Link>
  );
};

export default FigmaFile;
