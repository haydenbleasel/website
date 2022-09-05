import Image from 'next/future/image';
import { useMouse, useWindowScroll } from 'react-use';
import type { FC, RefObject } from 'react';
import { ArrowUpRight } from 'react-feather';
import Placeholder from './placeholder';
import Portal from './portal';

type LinkPreviewProps = {
  linkRef: RefObject<Element>;
  image: string | undefined;
  title: string | undefined;
  description: string | undefined;
  href: string;
};

const LinkPreview: FC<LinkPreviewProps> = ({
  linkRef,
  image,
  title,
  description,
  href,
}) => {
  const { docX, docY } = useMouse(linkRef);
  const { x: scrollX, y: scrollY } = useWindowScroll();

  const relativeX = docX - scrollX;
  const relativeY = docY - scrollY;

  return (
    <Portal>
      <span
        className="pointer-events-none fixed z-20 flex w-[316px] translate-x-2 translate-y-2 flex-col rounded-lg bg-neutral-900/90 p-3 shadow-lg backdrop-blur-md transition-opacity group-hover:-translate-y-2 dark:bg-neutral-800 print:hidden"
        style={{
          left: relativeX,
          top: relativeY,
          opacity: relativeX && relativeY ? 1 : 0,
        }}
      >
        <div className="h-[174px]">
          {image ? (
            <Image
              src={image}
              unoptimized
              width={300}
              height={158}
              alt=""
              className="m-0 h-[174px] rounded-sm object-cover"
            />
          ) : (
            <Placeholder className="h-full w-full rounded-sm" />
          )}
        </div>
        {title && (
          <span
            className={`mt-2 block text-md font-medium leading-normal text-white ${
              description ? 'line-clamp-1' : 'line-clamp-3'
            }`}
          >
            {title}
          </span>
        )}
        {description && (
          <span className="block text-sm leading-normal text-neutral-300 line-clamp-2">
            {description}
          </span>
        )}
        <span className="flex items-center gap-1">
          <span className="block text-sm leading-normal text-neutral-400 line-clamp-1">
            {new URL(href).hostname}
          </span>
          <ArrowUpRight width={12} height={12} className="text-neutral-400" />
        </span>
      </span>
    </Portal>
  );
};

export default LinkPreview;
