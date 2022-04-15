import type { LinkProps } from '@prismicio/react';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { ArrowUpRight } from 'react-feather';
import { useAsync } from 'react-use';
import type { ScreenshotResponse } from '../pages/api/screenshot';
import Placeholder from './placeholder';

const ExternalLinkComponent: FC<LinkProps> = ({ children, href, ...props }) => {
  const screenshot = useAsync(async () => {
    if (href.includes('twitter.com')) {
      return null;
    }

    const response = await fetch('/api/screenshot', {
      method: 'POST',
      body: JSON.stringify({
        url: href,
      }),
    });

    const { error, image } = (await response.json()) as ScreenshotResponse;

    if (error) {
      throw new Error(error);
    }

    return image;
  }, [href]);

  return (
    <span className="group relative">
      {!href.includes('twitter.com') && (
        <span className="pointer-events-none absolute left-0 bottom-full ml-[50%] flex -translate-x-2/4 -translate-y-0 rounded-lg bg-white p-2 opacity-0 shadow-lg transition-all group-hover:-translate-y-2 group-hover:opacity-100 dark:bg-gray-900">
          {screenshot.value ? (
            <Image
              src={`data:image/png;base64,${screenshot.value}`}
              width={300}
              height={187}
              layout="fixed"
            />
          ) : (
            <Placeholder className="h-[187.5px] w-[300px] rounded-md" />
          )}
        </span>
      )}
      <Link href={href} passHref>
        <a
          {...props}
          target="_blank"
          rel="noopener noreferrer"
          className="inline text-md font-normal text-gray-900 transition-colors hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
        >
          {children}
          <ArrowUpRight
            size={14}
            className="ml-[2px] inline -translate-y-[2px]"
          />
        </a>
      </Link>
    </span>
  );
};

export default ExternalLinkComponent;
