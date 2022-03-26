import type { FC } from 'react';
import type { SliceComponentProps } from '@prismicio/react';
import type { ImageField, KeyTextField, RichTextField } from '@prismicio/types';
import Image from 'next/image';

const Quote: FC<
  SliceComponentProps<{
    slice_type: 'quote';
    primary: {
      content: RichTextField;
      author: KeyTextField;
      photo: ImageField;
    };
  }>
> = ({ slice }) => (
  <div className="my-8 grid gap-2">
    <p className="m-0 text-md text-gray-900 dark:text-white">
      {slice.primary.content}
    </p>
    <div className="flex items-center gap-3">
      {slice.primary.photo.url && (
        <div className="flex overflow-hidden rounded-full">
          <Image src={slice.primary.photo.url} width={32} height={32} />
        </div>
      )}
      <p className="m-0 text-sm text-gray-500 dark:text-gray-400">
        {slice.primary.author}
      </p>
    </div>
  </div>
);

export default Quote;
