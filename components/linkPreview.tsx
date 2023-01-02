'use client';

import type { FC } from 'react';
import { Glimpse, useGlimpse } from '@haydenbleasel/glimpse/client';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const fetcher = async (url: string) => {
  const response = await fetch('/api/glimpse', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
    }),
  });

  return response.json();
};

const LinkPreview: FC = () => {
  const data = useGlimpse(fetcher);

  if (!data.image) {
    return null;
  }

  return (
    <Glimpse className="pointer-events-none fixed z-20 flex w-[316px] translate-x-2 translate-y-2 flex-col rounded-lg bg-zinc-900/90 p-3 shadow-lg backdrop-blur-md transition-opacity group-hover:-translate-y-2 dark:bg-zinc-800 print:hidden">
      <Image
        className="m-0 h-[174px] w-full rounded-sm object-cover"
        src={data.image}
        width={316}
        height={174}
        alt=""
        unoptimized
      />
      <p
        className={`text-md mt-2 block font-medium leading-normal text-white ${
          data.description ? 'line-clamp-1' : 'line-clamp-3'
        }`}
      >
        {data.title}
      </p>
      <p className="line-clamp-2 block text-sm leading-normal text-zinc-300">
        {data.description}
      </p>
      <span className="flex items-center gap-1">
        <p className="line-clamp-1 block text-sm leading-normal text-zinc-400">
          {data.url}
        </p>
        <ArrowUpRight width={12} height={12} className="text-zinc-400" />
      </span>
    </Glimpse>
  );
};

export default LinkPreview;
