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
      className="block shadow-lg shadow-gray-800/5 overflow-hidden rounded-lg border border-gray-200 bg-white no-underline transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-900 dark:hover:bg-gray-800"
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
      <div className="flex flex-col gap-1 border-t border-gray-200 p-4 dark:border-gray-700">
        <p className="m-0 text-base font-medium text-gray-900 line-clamp-1 dark:text-white sm:text-lg">
          {file.name}
        </p>
        <p className="m-0 text-sm font-normal text-gray-500 dark:text-gray-400 sm:text-base">
          Last updated {formatDate(new Date(file.lastModified))}
        </p>
      </div>
    </Link>
  );
};

export default FigmaFile;
