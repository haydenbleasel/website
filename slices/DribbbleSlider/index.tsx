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
import Image from 'next/future/image';
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
      .catch((error) => {
        const message =
          error instanceof Error ? error.message : (error as string);
        toast.error(message);
      });
  }, [shot]);

  return (
    <Link
      key={shot}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex w-full max-w-[400px] flex-shrink-0 flex-grow-0 flex-col no-underline"
    >
      <div className="flex flex-col overflow-hidden rounded-md bg-white shadow-md transition-all group-hover:shadow-lg dark:bg-neutral-800">
        <div className="relative aspect-[4/3] w-full">
          <Placeholder className="absolute z-0 h-full w-full" />

          {data && (
            <Image
              src={data.image}
              width={400}
              height={300}
              quality={100}
              alt=""
              className="relative z-10 m-0 animate-burst"
            />
          )}
        </div>
        <div className="flex flex-col gap-1 border-t border-neutral-100 p-4 dark:border-neutral-700">
          <p className="m-0 text-lg font-semibold text-neutral-900 line-clamp-1 dark:text-white">
            {data?.title ?? 'Loading'}
          </p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <MessageSquare size={16} className="text-neutral-400" />
              <p className="m-0 text-md text-neutral-500 dark:text-neutral-400">
                {formatNumbers(data?.comments ?? 0)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <ThumbsUp size={16} className="text-neutral-400" />
              <p className="m-0 text-md text-neutral-500 dark:text-neutral-400">
                {formatNumbers(data?.likes ?? 0)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Eye size={16} className="text-neutral-400" />
              <p className="m-0 text-md text-neutral-500 dark:text-neutral-400">
                {formatNumbers(data?.views ?? 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

type ArrowProps = {
  icon: FC<{ className?: string }>;
  active: boolean;
  handleClick: () => void;
};

const Arrow: FC<ArrowProps> = ({ icon: Icon, active, handleClick }) => (
  <div
    className={`select-none rounded-full border border-neutral-200 p-4 transition-all hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800 ${
      active ? '' : 'cursor-not-allowed opacity-50'
    }`}
    onClick={handleClick}
    onKeyDown={handleClick}
    role="button"
    tabIndex={0}
    aria-label="Previous"
    aria-controls="embla-carousel"
    aria-disabled={!active}
  >
    <Icon className="text-neutral-500 dark:text-neutral-400" />
  </div>
);

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
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    const onSelect = () => {
      if (emblaApi) {
        setCanScrollNext(emblaApi.canScrollNext());
        setCanScrollPrev(emblaApi.canScrollPrev());
      }
    };

    if (emblaApi) {
      setCanScrollNext(emblaApi.canScrollNext());
      setCanScrollPrev(emblaApi.canScrollPrev());

      emblaApi.on('select', onSelect);
    }

    return () => {
      emblaApi?.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="my-8 -mx-4 flex flex-col gap-8 overflow-hidden px-4 sm:overflow-visible">
      <div ref={emblaRef}>
        <div className="flex gap-8">{slice.items.map(Shot)}</div>
      </div>
      <div className="flex gap-8">
        <Arrow
          icon={ArrowLeft}
          active={canScrollPrev}
          handleClick={() => emblaApi?.scrollPrev()}
        />
        <Arrow
          icon={ArrowRight}
          active={canScrollNext}
          handleClick={() => emblaApi?.scrollNext()}
        />
      </div>
    </div>
  );
};

export default DribbbleSlider;
