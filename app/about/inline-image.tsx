import Image from 'next/image';
import { Link } from '@/components/link';
import type { StaticImageData } from 'next/image';
import type { FC } from 'react';

type InlineImageProperties = {
  readonly src: StaticImageData | string;
  readonly text: string;
  readonly url: string;
};

export const InlineImage: FC<InlineImageProperties> = ({ src, text, url }) => (
  <Link
    href={url}
    className="ml-0.5 dark:ml-0 inline-flex gap-1 items-center align-bottom"
  >
    <Image
      src={src}
      alt=""
      width={16}
      height={16}
      className="dark:hidden m-0 w-4 h-4 rounded-sm object-contain select-none"
      quality={100}
    />
    <span>{text}</span>
  </Link>
);
