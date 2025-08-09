'use client';

import { useRef } from 'react';

type VideoProps = {
  location: string;
  src: string;
};

export const Video = ({ location, src }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseOver = () => {
    videoRef.current?.play();
  };

  const handleMouseOut = () => {
    videoRef.current?.pause();
    if (videoRef.current?.currentTime) {
      videoRef.current.currentTime = 0;
    }
  };

  const handleFocus = () => {
    videoRef.current?.play();
  };

  const handleBlur = () => {
    videoRef.current?.pause();
    if (videoRef.current?.currentTime) {
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="group absolute inset-0 size-full">
      <video
        className="size-full object-cover"
        loop
        muted
        onBlur={handleBlur}
        onFocus={handleFocus}
        onMouseOut={handleMouseOut}
        onMouseOver={handleMouseOver}
        playsInline
        ref={videoRef}
        src={src}
        tabIndex={0}
      />
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 select-none bg-gradient-to-b from-transparent to-black/50 p-4 opacity-0 transition-opacity group-hover:opacity-100">
        <span className="font-semibold text-sm text-white">{location}</span>
      </div>
    </div>
  );
};
