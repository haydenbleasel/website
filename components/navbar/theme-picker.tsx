'use client';

import dynamic from 'next/dynamic';
import type { FC } from 'react';

const ModeToggle = dynamic(
  async () => {
    const mod = await import(
      /* webpackChunkName: "mode-toggle" */
      '@/components/mode-toggle'
    );

    return mod.ModeToggle;
  },
  {
    ssr: false,
  }
);

export const ThemePicker: FC = () => <ModeToggle />;
