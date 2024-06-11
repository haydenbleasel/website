import type { FC } from 'react';

export const Wave: FC = () => (
  <span
    className="inline-block hover:animate-wave"
    style={{
      transformOrigin: '70% 70%',
    }}
  >
    👋
  </span>
);
