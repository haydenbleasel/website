import type { LinkProps } from '@prismicio/react';
import Image from 'next/future/image';
import Link from 'next/link';
import type { FC } from 'react';
import { ArrowUpRight } from 'react-feather';
import { useAsync, useMountEffect } from '@react-hookz/web';
import type { PreviewResponse } from '../pages/api/link-preview';
import Placeholder from './placeholder';

const ExternalLinkComponent: FC<LinkProps> = ({ children, href, ...props }) => {
  // const x = useCurso
  const [screenshot, { execute }] = useAsync(async () => {
    const response = await fetch('/api/link-preview', {
      method: 'POST',
      body: JSON.stringify({
        url: href,
      }),
    });

    const data = (await response.json()) as PreviewResponse;

    return data;
  });

  const isEmpty = screenshot.result ? !screenshot.result.data?.image : false;

  useMountEffect(execute);

  return (
    <span className="group relative inline-block">
      {!screenshot.error && !isEmpty && (
        <span className="pointer-events-none absolute left-0 bottom-full ml-[50%] flex w-[316px] -translate-x-2/4 -translate-y-0 flex-col rounded-lg bg-gray-900/90 p-3 opacity-0 shadow-lg backdrop-blur-md transition-all group-hover:-translate-y-2 group-hover:opacity-100 dark:bg-gray-800">
          <div className="h-[174px]">
            {screenshot.result?.data?.image ? (
              <Image
                src={screenshot.result.data.image}
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
          {screenshot.result?.data?.title && (
            <span
              className={`mt-2 block text-md font-medium leading-normal text-white ${
                screenshot.result.data.description
                  ? 'line-clamp-1'
                  : 'line-clamp-3'
              }`}
            >
              {screenshot.result.data.title}
            </span>
          )}
          {screenshot.result?.data?.description && (
            <span className="block text-sm leading-normal text-gray-300 line-clamp-2">
              {screenshot.result.data.description}
            </span>
          )}
          <span className="flex items-center gap-1">
            <span className="block text-sm leading-normal text-gray-400 line-clamp-1">
              {new URL(href).hostname}
            </span>
            <ArrowUpRight width={12} height={12} className="text-gray-400" />
          </span>
        </span>
      )}
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline text-md font-normal text-gray-900 transition-colors hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
        {...props}
      >
        {children}
        <ArrowUpRight
          size={14}
          className="ml-[2px] inline -translate-y-[2px]"
        />
      </Link>
    </span>
  );
};

export default ExternalLinkComponent;
