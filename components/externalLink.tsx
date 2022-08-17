import type { LinkProps } from '@prismicio/react';
import Image from 'next/future/image';
import Link from 'next/link';
import type { FC } from 'react';
import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight } from 'react-feather';
import { useAsync, useMountEffect } from '@react-hookz/web';
import { useMouse, useWindowScroll } from 'react-use';
import { createPortal } from 'react-dom';
import type { PreviewResponse } from '../pages/api/link-preview';
import Placeholder from './placeholder';

const ExternalLinkComponent: FC<LinkProps> = ({ children, href, ...props }) => {
  const root = useRef<HTMLElement>();
  const ref = useRef<HTMLSpanElement>(null);
  const { docX, docY } = useMouse(ref);
  const { x: scrollX, y: scrollY } = useWindowScroll();
  const [showPreview, setShowPreview] = useState(false);

  const relativeX = docX - scrollX;
  const relativeY = docY - scrollY;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      root.current = document.body;
    }
  }, []);

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

  const Modal = (
    <span
      className="pointer-events-none fixed z-20 flex w-[316px] translate-x-2 translate-y-2 flex-col rounded-lg bg-neutral-900/90 p-3 shadow-lg backdrop-blur-md transition-opacity group-hover:-translate-y-2 dark:bg-neutral-800"
      style={{
        left: relativeX,
        top: relativeY,
        opacity: showPreview ? 1 : 0,
      }}
    >
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
            screenshot.result.data.description ? 'line-clamp-1' : 'line-clamp-3'
          }`}
        >
          {screenshot.result.data.title}
        </span>
      )}
      {screenshot.result?.data?.description && (
        <span className="block text-sm leading-normal text-neutral-300 line-clamp-2">
          {screenshot.result.data.description}
        </span>
      )}
      <span className="flex items-center gap-1">
        <span className="block text-sm leading-normal text-neutral-400 line-clamp-1">
          {new URL(href).hostname}
        </span>
        <ArrowUpRight width={12} height={12} className="text-neutral-400" />
      </span>
    </span>
  );

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
      {!screenshot.error &&
        !isEmpty &&
        root.current &&
        createPortal(Modal, root.current)}
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline text-md font-normal text-neutral-900 transition-colors hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300"
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
