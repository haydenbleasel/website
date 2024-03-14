'use client';

import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
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

type VideoProps = ReactPlayerProps & {
  readonly className?: string;
};

export const Video: FC<VideoProps> = ({ className, ...props }) => (
  <div
    className={cn('relative aspect-video rounded overflow-hidden', className)}
  >
    <ReactPlayer
      {...props}
      width="100%"
      height="100%"
      style={{ position: 'absolute', inset: 0 }}
    />
  </div>
);
