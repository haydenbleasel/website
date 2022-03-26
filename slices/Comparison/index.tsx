import type { FC } from 'react';
import type { SliceComponentProps } from '@prismicio/react';
import type { ImageField } from '@prismicio/types';
import { ReactCompareSlider } from 'react-compare-slider';
import Image from 'next/image';

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
    <ReactCompareSlider
      itemOne={
        <Image
          src={slice.primary.before.url}
          width={480}
          height={
            480 *
            (slice.primary.before.dimensions.height /
              slice.primary.before.dimensions.width)
          }
        />
      }
      itemTwo={
        <Image
          src={slice.primary.after.url}
          width={480}
          height={
            480 *
            (slice.primary.after.dimensions.height /
              slice.primary.after.dimensions.width)
          }
        />
      }
    />
  );
};

export default Comparison;
