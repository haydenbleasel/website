'use client';

import { useRef } from 'react';

type VideoProps = {
  src: string;
};

export const Video = ({ src }: VideoProps) => {
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
    <video
      className="absolute inset-0 h-full w-full object-cover"
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
  );
};
