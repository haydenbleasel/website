import type { LinkProps } from '@prismicio/react';
import Link from 'next/link';
import type { FC } from 'react';
import { useRef } from 'react';
import { ArrowUpRight } from 'react-feather';
import Glimpse from '@haydenbleasel/glimpse/client';
import { useMountEffect, useAsync } from '@react-hookz/web';

const ExternalLinkComponent: FC<LinkProps> = ({ children, href, ...props }) => {
  const ref = useRef<HTMLSpanElement>(null);

  const [data, { execute }] = useAsync(async () => {
    const response = await fetch('/api/link-preview', {
      method: 'POST',
      body: JSON.stringify({
        url: href,
      }),
    });

    const json = (await response.json()) as {
      error?: string;
      data: {
        title?: string | null;
        description?: string | null;
        image?: string | null;
        url?: string | null;
      };
    };

    if (json.error) {
      throw new Error(json.error);
    }

    return json.data;
  });

  useMountEffect(execute);

  return (
    <span ref={ref} className="group inline-block" tabIndex={-1} role="link">
      <Glimpse.Dialog linkRef={ref} data={data.result}>
        <Glimpse.Image />
        <Glimpse.Title />
        <Glimpse.Description />
        <span className="flex items-center gap-1">
          <Glimpse.Link />
          <ArrowUpRight width={12} height={12} className="text-neutral-400" />
        </span>
      </Glimpse.Dialog>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline text-md font-normal text-neutral-900 transition-colors hover:text-neutral-500 dark:text-white dark:hover:text-neutral-300"
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
