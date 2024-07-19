import { Link } from '@/components/link';
import Image from 'next/image';
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
    className="ml-0.5 inline-flex items-center gap-1 align-bottom dark:ml-0"
  >
    <Image
      src={src}
      alt=""
      width={16}
      height={16}
      className="m-0 h-4 w-4 select-none rounded-sm object-contain dark:hidden"
      quality={100}
    />
    <span>{text}</span>
  </Link>
);
