'use client';

import tailwind from '@/lib/tailwind';
import createGlobe from 'cobe';
import type { COBEOptions } from 'cobe';
import hexRgb from 'hex-rgb';
import { useEffect, useRef } from 'react';
import type { FC } from 'react';

const tailwindToRgb = (color: string): [number, number, number] =>
  hexRgb(color, {
    format: 'array',
  })
    .map((number) => number / 255)
    .slice(0, 3) as [number, number, number];

type TravelProperties = {
  readonly width: number;
  readonly height: number;
  readonly markers: COBEOptions['markers'];
};

export const Travel: FC<TravelProperties> = ({ width, height, markers }) => {
  const canvasReference = useRef<HTMLCanvasElement>(null);

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
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16_000,
      mapBrightness: 6,
      baseColor: tailwindToRgb(tailwind.theme.colors.neutral[800]),
      markerColor: tailwindToRgb(tailwind.theme.colors.orange[500]),
      glowColor: tailwindToRgb(tailwind.theme.colors.neutral[100]),
      markers,
      onRender: (state) => {
        state.phi = phi;
        phi += 0.001;
      },
    });

    return () => globe.destroy();
  }, [width, height]);

  return (
    <canvas
      aria-label="Globe"
      ref={canvasReference}
      className="aspect-[4/3] w-full max-w-full"
    />
  );
};
