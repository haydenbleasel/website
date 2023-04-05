import type { ImageProps } from 'next/image';
import NextImage from 'next/image';
import type { FC } from 'react';

const Image: FC<ImageProps> = (props) => <NextImage {...props} quality={100} />;

export default Image;
