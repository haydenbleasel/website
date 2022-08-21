import type { LinkProps } from '@prismicio/react';
import Link from 'next/link';
import type { FC } from 'react';
import { useState, useRef } from 'react';
import { ArrowUpRight } from 'react-feather';
import { useAsync, useMountEffect } from '@react-hookz/web';

import dynamic from 'next/dynamic';
import type { PreviewResponse } from '../pages/api/link-preview';

const ExternalLinkComponent: FC<LinkProps> = ({ children, href, ...props }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [showPreview, setShowPreview] = useState(false);

  const LinkPreview = dynamic(
    async () =>
      import(
        /* webpackChunkName: "link-preview" */
        './linkPreview'
      ),
    {
      ssr: false,
    }
  );

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
    <span
      ref={ref}
      className="group inline-block"
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
      onKeyDown={() => setShowPreview(false)}
      tabIndex={0}
      role="link"
    >
      {!screenshot.error && !isEmpty && showPreview && (
        <LinkPreview
          image={screenshot.result?.data?.image}
          title={screenshot.result?.data?.title}
          description={screenshot.result?.data?.description}
          href={href}
          linkRef={ref}
        />
      )}
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
