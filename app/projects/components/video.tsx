'use client';

import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@uidotdev/usehooks';
import dynamic from 'next/dynamic';

type ProjectVideoProps = {
  url: string;
};

const VideoPlayer = dynamic(() => import('react-player/file'), {
  ssr: false,
  loading: () => (
    <div className="size-full rounded-lg border bg-secondary sm:rounded-2xl" />
  ),
});

export const ProjectVideo = ({ url }: ProjectVideoProps) => {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0.2,
    root: null,
    rootMargin: '0px',
  });

  return (
    <div
      ref={ref}
      className={cn(
        'size-full',
        '[&_video]:overflow-hidden [&_video]:object-cover'
      )}
    >
      <VideoPlayer
        url={url}
        playing={entry?.isIntersecting}
        width="100%"
        height="100%"
        loop
        muted
        playsinline
      />
    </div>
  );
};
