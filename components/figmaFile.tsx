import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import formatDate from '@/lib/formatDate';

type FigmaFileProps = {
  id: string;
};

type FigmaDocument = {
  name: string;
  role: string;
  lastModified: string;
  editorType: string;
  thumbnailUrl: string;
  version: string;
  document: Node;
  components: Record<string, unknown>;
  componentSets: Record<string, unknown>;
  schemaVersion: number;
  styles: Record<string, unknown>;
  mainFileKey: string;
  branches: [
    {
      key: string;
      name: string;
      thumbnail_url: string;
      last_modified: string;
      link_access: string;
    }
  ];
};

const FigmaFile = async ({ id }: FigmaFileProps): Promise<ReactNode> => {
  const response = await fetch(`https://api.figma.com/v1/files/${id}`, {
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'X-FIGMA-TOKEN': process.env.FIGMA_ACCESS_TOKEN ?? '',
    },
  });

  const file = (await response.json()) as FigmaDocument;

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
