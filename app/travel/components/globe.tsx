'use client';

import { useWindowSize } from '@uidotdev/usehooks';
import createGlobe from 'cobe';
import { useTheme } from 'next-themes';
import { useEffect, useMemo, useRef } from 'react';
import type { FC } from 'react';

export const Globe: FC = () => {
  const { resolvedTheme } = useTheme();
  const canvasReference = useRef<HTMLCanvasElement>(null);
  const windowSize = useWindowSize();
  const globeSize = useMemo(() => {
    if (windowSize.width && windowSize.width >= 1280) {
      return 580;
    }

    if (windowSize.width && windowSize.width >= 1024) {
      return 440;
    }

    if (windowSize.width && windowSize.width >= 768) {
      return 320;
    }

    return 240;
  }, [windowSize.width]);

  useEffect(() => {
    let phi = 0;

    if (!canvasReference.current) {
      return undefined;
    }

    const globe = createGlobe(canvasReference.current, {
      devicePixelRatio: 2,
      width: globeSize * 2,
      height: globeSize * 2,
      phi: 0,
      theta: 0,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16_000,
      mapBrightness: 6,
      baseColor: resolvedTheme === 'dark' ? [0.1, 0.1, 0.1] : [0.9, 0.9, 0.9],
      markerColor: resolvedTheme === 'dark' ? [0.1, 0.1, 0.1] : [0.9, 0.9, 0.9],
      glowColor:
        resolvedTheme === 'dark' ? [0.05, 0.05, 0.05] : [0.9, 0.9, 0.9],
      markers: [],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.001;
      },
    });

    return () => globe.destroy();
  }, [globeSize, resolvedTheme]);

  return (
    <canvas aria-label="Globe" ref={canvasReference} className="size-full" />
  );
};
