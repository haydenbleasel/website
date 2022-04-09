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
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Image from 'next/image';
import type { DribbbleResponse } from '../../pages/api/dribbble';
import Placeholder from '../../components/placeholder';

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
            <Image
              src={data.image}
              width={400}
              height={300}
              layout="fixed"
              quality={100}
            />
          ) : (
            <Placeholder className="h-[300px] w-[400px]" />
          )}
          <div className="flex flex-col gap-1 border-t border-gray-100 p-4">
            <p className="m-0 text-lg font-semibold text-gray-900 line-clamp-1 dark:text-white">
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
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: 0,
    loop: false,
    dragFree: false,
    draggable: false,
    align: 'start',
  });

  return (
    <>
      <div className="mt-8" ref={emblaRef}>
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
          <ArrowLeft className="text-gray-500 dark:text-gray-400" />
        </div>
        <div
          className="rounded-full border border-gray-200 p-4 transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
          onClick={() => emblaApi?.scrollNext()}
          onKeyDown={() => emblaApi?.scrollNext()}
          role="button"
          tabIndex={0}
        >
          <ArrowRight className="text-gray-500 dark:text-gray-400" />
        </div>
      </div>
    </>
  );
};

export default DribbbleSlider;
