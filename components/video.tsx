'use client';

import dynamic from 'next/dynamic';
import type { FC } from 'react';
import type { VimeoConfig } from 'react-player/vimeo';

const VimeoPlayer = dynamic(async () => {
  const Player = await import(
    /* webpackChunkName: "react-player" */
    'react-player/vimeo'
  );

  return Player;
});

const Video: FC<VimeoConfig> = (props) => (
  <div className="relative aspect-video overflow-hidden rounded">
    <VimeoPlayer
      height="100%"
      width="100%"
      style={{
        position: 'absolute',
        inset: 0,
      }}
      {...props}
    />
  </div>
);

export default Video;
