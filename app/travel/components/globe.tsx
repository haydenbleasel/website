'use client';

import createGlobe from 'cobe';
import { useEffect, useRef } from 'react';
import type { FC } from 'react';

export const Globe: FC = () => {
  const canvasReference = useRef<HTMLCanvasElement>(null);
  const width = 580;
  const height = 580;

  useEffect(() => {
    let phi = 0;

    if (!canvasReference.current) {
      return undefined;
    }

    const globe = createGlobe(canvasReference.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: height * 2,
      phi: 0,
      theta: 0,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16_000,
      mapBrightness: 6,
      baseColor: [0.9, 0.9, 0.9],
      markerColor: [0.9, 0.9, 0.9],
      glowColor: [0.9, 0.9, 0.9],
      markers: [],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.001;
      },
    });

    return () => globe.destroy();
  }, []);

  return (
    <canvas
      aria-label="Globe"
      ref={canvasReference}
      className="w-full h-full"
    />
  );
};
