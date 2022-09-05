import type { FC } from 'react';
import type { SliceComponentProps } from '@prismicio/react';
import type { ImageField } from '@prismicio/types';
import { ReactCompareSlider } from 'react-compare-slider';
import Image from 'next/future/image';

const Comparison: FC<
  SliceComponentProps<{
    slice_type: 'quote';
    primary: {
      before: ImageField;
      after: ImageField;
    };
  }>
> = ({ slice }) => {
  if (!slice.primary.before.url || !slice.primary.after.url) {
    return null;
  }

  return (
    <div className="my-8 flex flex-col gap-1">
      <ReactCompareSlider
        itemOne={
          <Image
            src={slice.primary.before.url}
            width={640}
            height={
              640 *
              (slice.primary.before.dimensions.height /
                slice.primary.before.dimensions.width)
            }
            quality={100}
            alt="Before Image"
            className="m-0 animate-burst"
          />
        }
        itemTwo={
          <Image
            src={slice.primary.after.url}
            width={640}
            height={
              640 *
              (slice.primary.after.dimensions.height /
                slice.primary.after.dimensions.width)
            }
            quality={100}
            alt="After Image"
            className="m-0 animate-burst"
          />
        }
      />
      <div className="flex items-center justify-between">
        <p className="m-0 text-sm text-neutral-500 dark:text-neutral-400">
          Before
        </p>
        <p className="m-0 text-sm text-neutral-500 dark:text-neutral-400">
          After
        </p>
      </div>
    </div>
  );
};

export default Comparison;
