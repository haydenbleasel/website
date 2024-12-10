'use client';

import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@uidotdev/usehooks';
import dynamic from 'next/dynamic';

type ProjectVideoProps = {
  url: string;
  offset: string;
  position: string;
};

const VideoPlayer = dynamic(() => import('react-player/file'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full rounded-2xl border bg-secondary" />
  ),
});

export const ProjectVideo = ({ url, offset, position }: ProjectVideoProps) => {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0.2,
    root: null,
    rootMargin: '0px',
  });

  return (
    <div
      ref={ref}
      className={cn(
        'h-full w-full',
        '[&_video]:overflow-hidden [&_video]:object-cover',
        position === 'Center' && '[&_video]:object-center',
        position === 'Left' && '[&_video]:object-left',
        position === 'Right' && '[&_video]:object-right',
        position === 'Top' && '[&_video]:object-top',
        position === 'Bottom' && '[&_video]:object-bottom',
        offset === 'Center' && '[&_video]:rounded-2xl [&_video]:border',
        offset === 'Top-Left' &&
          '[&_video]:rounded-tl-2xl [&_video]:border-t [&_video]:border-l',
        offset === 'Top-Right' &&
          '[&_video]:rounded-tr-2xl [&_video]:border-t [&_video]:border-r',
        offset === 'Bottom-Left' &&
          '[&_video]:rounded-bl-2xl [&_video]:border-b [&_video]:border-l',
        offset === 'Bottom-Right' &&
          '[&_video]:rounded-br-2xl [&_video]:border-r [&_video]:border-b'
      )}
    >
      <VideoPlayer
        url={url}
        playing={entry?.isIntersecting}
        width="100%"
        height="100%"
      />
    </div>
  );
};
