'use client';

import { stack } from '@/lib/stack';
import { Tool } from './tool';

export const Stack = () => (
  <div className="not-prose grid gap-3">
    {stack
      .sort((a, b) => (b.affiliate ? 1 : -1))
      .filter((tool) => tool.featured || open)
      .map((tool) => (
        <Tool key={tool.name} {...tool} />
      ))}
  </div>
);
