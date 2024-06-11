'use client';

import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import hexRgb from 'hex-rgb';
import tailwind from '@/lib/tailwind';
import type { COBEOptions } from 'cobe';
import type { FC } from 'react';

const tailwindToRgb = (color: string): [number, number, number] =>
  hexRgb(color, {
    format: 'array',
  })
    .map((number) => number / 255)
    .slice(0, 3) as [number, number, number];

const markers: COBEOptions['markers'] = [
  // Sydney, Australia
  { location: [-33.8688, 151.2093], size: 0.1 },

  // Boca Raton, Florida
  { location: [26.4615, -80.0728], size: 0.1 },

  // Palo Alto, California
  { location: [37.4419, -122.143], size: 0.1 },
];

export const Travel: FC = () => {
  const canvasReference = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasReference.current) {
      // eslint-disable-next-line unicorn/no-useless-undefined
      return undefined;
    }

    const globe = createGlobe(canvasReference.current, {
      devicePixelRatio: 2,
      width: 655 * 2,
      height: 491 * 2,
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
  }, []);

  return (
    <canvas
      aria-label="Globe"
      ref={canvasReference}
      className="w-full aspect-[4/3] max-w-full"
    />
  );
};
