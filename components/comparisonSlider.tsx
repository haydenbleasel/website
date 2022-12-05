'use client';

import type { FC } from 'react';
import { ReactCompareSlider } from 'react-compare-slider';
import Image from 'next/image';

type ComparisonSliderProps = {
  before: string;
  after: string;
};

const ComparisonSlider: FC<ComparisonSliderProps> = ({ before, after }) => (
  <div className="my-8 flex flex-col gap-1">
    <ReactCompareSlider
      itemOne={
        <Image
          src={before}
          width={640}
          height={400}
          quality={100}
          alt="Before Image"
          className="m-0 w-full rounded-md"
        />
      }
      itemTwo={
        <Image
          src={after}
          width={640}
          height={400}
          quality={100}
          alt="After Image"
          className="m-0 w-full rounded-md"
        />
      }
    />
    <div className="flex items-center justify-between">
      <p className="m-0 text-sm text-zinc-500 dark:text-zinc-400">Before</p>
      <p className="m-0 text-sm text-zinc-500 dark:text-zinc-400">After</p>
    </div>
  </div>
);

export default ComparisonSlider;
