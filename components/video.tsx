'use client';

import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import type { FC } from 'react';
import type { ReactPlayerProps } from 'react-player';

const ReactPlayer = dynamic(
  async () =>
    import(
      /* webpackChunkName: "react-player" */
      'react-player'
    ),
  { ssr: false }
);

type VideoProperties = ReactPlayerProps & {
  readonly className?: string;
};

export const Video: FC<VideoProperties> = ({ className, ...properties }) => (
  <div
    className={cn('relative aspect-video overflow-hidden rounded', className)}
  >
    <ReactPlayer
      {...properties}
      width="100%"
      height="100%"
      style={{ position: 'absolute', inset: 0 }}
    />
  </div>
);
