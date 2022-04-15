import type { FC } from 'react';
import React, { useEffect } from 'react';
import type { SliceComponentProps } from '@prismicio/react';
import type { KeyTextField } from '@prismicio/types';
import useSWR from 'swr';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';
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
    <Link href={href} passHref>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative mt-8 mb-4 flex w-full flex-shrink-0 flex-grow-0 flex-col"
      >
        <div className="flex flex-col overflow-hidden rounded-md bg-white shadow-md transition-all group-hover:shadow-lg dark:bg-gray-900">
          {data ? (
            <Image
              src={data.image}
              width={640}
              height={320}
              layout="responsive"
              quality={100}
            />
          ) : (
            <Placeholder className="h-[320px] w-[640px]" />
          )}
          <div className="flex flex-col gap-1 border-t border-gray-100 p-4">
            <p className="m-0 text-md sm:text-lg font-semibold text-gray-900 line-clamp-1 dark:text-white">
              {data?.title ?? 'Loading'}
            </p>
            <p className="m-0 text-sm sm:text-md font-normal text-gray-500 dark:text-gray-400">
              {data
                ? `Last updated ${format(
                    parseISO(data.lastUpdated),
                    'MMM dd, yyyy'
                  )}`
                : 'Loading'}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default FigmaFile;
