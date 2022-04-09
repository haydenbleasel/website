import type { FC } from 'react';
import React, { useState, useEffect } from 'react';
import type { SliceComponentProps } from '@prismicio/react';
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  MessageSquare,
  ThumbsUp,
} from 'react-feather';
import emblaCarouselClassNames from 'embla-carousel-class-names';
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Image from 'next/image';
import type { DribbbleResponse } from '../../pages/api/dribbble';

const options = {
  dragging: 'cursor-[grabbing]',
};

const formatNumbers = (num: number) => {
  if (num < 1000) {
    return num;
  }
  if (num < 1000000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return `${(num / 1000000).toFixed(1)}m`;
};

const loadShotData = async (shot: number) => {
  const response = await fetch('/api/dribbble', {
    method: 'POST',
    body: JSON.stringify({
      shot,
    }),
  });

  const { error, data: newData } = (await response.json()) as DribbbleResponse;

  if (error) {
    throw new Error(error);
  }

  if (!newData) {
    throw new Error('Something went wrong');
  }

  return newData;
};

const Shot: FC<{ shot: number }> = ({ shot }) => {
  const [data, setData] = useState<DribbbleResponse['data']>();
  const url = `https://dribbble.com/shots/${shot}`;

  useEffect(() => {
    loadShotData(shot)
      .then(setData)
      .catch((error) => toast.error(error as string));
  }, [shot]);

  return (
    <Link key={shot} href={url} passHref>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex w-full max-w-[400px] flex-shrink-0 flex-grow-0 flex-col"
      >
        <div className="flex flex-col overflow-hidden rounded-md bg-white shadow-md transition-all group-hover:shadow-lg dark:bg-gray-900">
          {data ? (
            <Image src={data.image} width={400} height={300} layout="fixed" />
          ) : (
            <div className="flex h-[300px] w-[400px] items-center justify-center bg-gray-50">
              <svg
                className="-ml-1 mr-3 h-5 w-5 animate-spin text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          )}
          <div className="flex flex-col gap-1 border-t border-gray-100 p-4">
            <p className="m-0 text-lg font-semibold text-gray-900 dark:text-white">
              {data?.title ?? 'Loading'}
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <MessageSquare size={16} className="text-gray-400" />
                <p className="m-0 text-md text-gray-500 dark:text-gray-400">
                  {formatNumbers(data?.comments ?? 0)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsUp size={16} className="text-gray-400" />
                <p className="m-0 text-md text-gray-500 dark:text-gray-400">
                  {formatNumbers(data?.likes ?? 0)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Eye size={16} className="text-gray-400" />
                <p className="m-0 text-md text-gray-500 dark:text-gray-400">
                  {formatNumbers(data?.views ?? 0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

const DribbbleSlider: FC<
  SliceComponentProps<{
    slice_type: 'dribbble-slider';
    items: {
      shot: number;
    }[];
  }>
> = ({ slice }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      startIndex: 0,
      dragFree: true,
      loop: false,
      align: 'start',
    },
    [emblaCarouselClassNames(options)]
  );

  return (
    <>
      <div className="w-full cursor-[grab]" ref={emblaRef}>
        <div className="flex gap-8">{slice.items.map(Shot)}</div>
      </div>
      <div className="mt-8 flex gap-8">
        <div
          className="rounded-full border border-gray-200 p-4 transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
          onClick={() => emblaApi?.scrollPrev()}
          onKeyDown={() => emblaApi?.scrollPrev()}
          role="button"
          tabIndex={0}
        >
          <ArrowLeft className="text-gray-900 dark:text-white" />
        </div>
        <div
          className="rounded-full border border-gray-200 p-4 transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
          onClick={() => emblaApi?.scrollNext()}
          onKeyDown={() => emblaApi?.scrollNext()}
          role="button"
          tabIndex={0}
        >
          <ArrowRight className="text-gray-900 dark:text-white" />
        </div>
      </div>
    </>
  );
};

export default DribbbleSlider;
