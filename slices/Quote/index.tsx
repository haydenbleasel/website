import type { FC } from 'react';
import type { SliceComponentProps } from '@prismicio/react';
import type { ImageField, KeyTextField } from '@prismicio/types';
import Image from 'next/future/image';

const Quote: FC<
  SliceComponentProps<{
    slice_type: 'quote';
    primary: {
      content: KeyTextField;
      author: KeyTextField;
      photo: ImageField;
    };
  }>
> = ({ slice }) => (
  <div className="my-8 flex flex-col gap-4">
    <p className="m-0 text-md text-neutral-900 dark:text-white">
      {slice.primary.content}
    </p>
    <div className="flex items-center gap-3">
      {slice.primary.photo.url && (
        <Image
          src={slice.primary.photo.url}
          width={32}
          height={32}
          quality={100}
          alt=""
          className="flex animate-burst overflow-hidden rounded-full"
        />
      )}
      <p className="m-0 text-sm text-neutral-500 dark:text-neutral-400">
        {slice.primary.author}
      </p>
    </div>
  </div>
);

export default Quote;
