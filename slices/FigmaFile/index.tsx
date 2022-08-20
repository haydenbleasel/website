import type { FC } from 'react';
import React, { useEffect } from 'react';
import type { SliceComponentProps } from '@prismicio/react';
import type { KeyTextField } from '@prismicio/types';
import useSWR from 'swr';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/future/image';
import { format, parseISO } from 'date-fns';
import type { FigmaResponse } from '../../pages/api/figma';
import Placeholder from '../../components/placeholder';

const FigmaFile: FC<
  SliceComponentProps<{
    slice_type: 'figma-file';
    primary: {
      key: KeyTextField;
    };
  }>
> = ({ slice }) => {
  const { key } = slice.primary;
  const href = `https://www.figma.com/file/${key ?? ''}`;
  const { data, error } = useSWR<FigmaResponse['data'], Error>(
    '/api/figma',
    async (url: string) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${
            process.env.NEXT_PUBLIC_API_PASSPHRASE ?? ''
          }`,
        },
        body: JSON.stringify({
          key,
        }),
      });

      const newData = (await response.json()) as FigmaResponse;

      if (newData.error) {
        throw new Error(newData.error);
      }

      return newData.data;
    }
  );

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative my-8 flex w-full flex-shrink-0 flex-grow-0 flex-col no-underline"
    >
      <div className="flex flex-col overflow-hidden rounded-sm bg-white shadow-md transition-all group-hover:shadow-lg dark:bg-neutral-800">
        <div className="relative aspect-[2/1] w-full">
          <Placeholder className="absolute z-0 h-full w-full" />

          {data && (
            <Image
              src={data.image}
              width={640}
              height={320}
              quality={100}
              alt=""
              className="relative z-10 m-0 animate-burst"
            />
          )}
        </div>
        <div className="flex flex-col gap-1 border-t border-neutral-200 p-4 dark:border-neutral-700">
          <p className="m-0 text-md font-semibold text-neutral-900 line-clamp-1 dark:text-white sm:text-lg">
            {data?.title ?? 'Loading'}
          </p>
          <p className="m-0 text-sm font-normal text-neutral-500 dark:text-neutral-400 sm:text-md">
            {data
              ? `Last updated ${format(
                  parseISO(data.lastUpdated),
                  'MMM dd, yyyy'
                )}`
              : 'Loading'}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default FigmaFile;
