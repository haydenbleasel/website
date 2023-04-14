import clsx from 'clsx';
import type { ImageProps } from 'next/image';
import NextImage from 'next/image';
import type { FC } from 'react';

const Image: FC<ImageProps> = ({ className, ...props }) => (
  <NextImage
    className={clsx('select-none', className)}
    {...props}
    quality={100}
  />
);

export default Image;
