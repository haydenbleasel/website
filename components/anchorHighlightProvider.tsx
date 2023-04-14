'use client';

import { useEventListener } from '@react-hookz/web';
import type { FC, ReactNode } from 'react';
import { useRef } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '@/tailwind.config';
import type { DefaultColors } from 'tailwindcss/types/generated/colors';

const fullConfig = resolveConfig(tailwindConfig);

type AnchorHighlightProviderProps = {
  children: ReactNode;
};

const AnchorHighlightProvider: FC<AnchorHighlightProviderProps> = ({
  children,
}) => {
  const active = useRef<HTMLElement | null>(null);

  useEventListener(
    typeof window === 'undefined' ? null : window,
    'mouseover',
    (event: MouseEvent) => {
      if (event.target instanceof HTMLAnchorElement) {
        const parent = event.target.parentElement;

        if (!parent) return;

        parent.style.color = (
          fullConfig.theme?.colors as unknown as DefaultColors
        ).neutral[400];
        active.current = parent;
      }
    },
    { passive: true }
  );

  useEventListener(
    typeof window === 'undefined' ? null : window,
    'mouseout',
    () => {
      if (active.current) {
        active.current.style.color = 'inherit';
        active.current = null;
      }
    },
    { passive: true }
  );

  return <div>{children}</div>;
};

export default AnchorHighlightProvider;
