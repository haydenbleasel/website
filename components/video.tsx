import type { EmbedField } from '@prismicio/types';
import dynamic from 'next/dynamic';
import type { FC } from 'react';
import type { VimeoPlayerProps } from 'react-player/vimeo';
import Placeholder from './placeholder';

type VideoProps = {
  data: EmbedField;
} & VimeoPlayerProps;

const Video: FC<VideoProps> = ({ data, ...props }) => {
  const ReactPlayer = dynamic(
    async () =>
      import(
        /* webpackChunkName: "react-player/vimeo" */
        'react-player/vimeo'
      )
  );

  return (
    <div
      className="relative overflow-hidden rounded-sm"
      style={{
        aspectRatio: `${data.width as number}/${data.height as number}`,
      }}
    >
      <Placeholder className="absolute inset-0 z-0" />
      <div className="relative z-10 h-full w-full">
        <ReactPlayer
          url={data.embed_url}
          loop
          controls={false}
          muted
          playsinline
          playing
          width="100%"
          height="100%"
          {...props}
        />
      </div>
    </div>
  );
};

export default Video;
