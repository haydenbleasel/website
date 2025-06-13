'use client';

import { stack } from '@/lib/stack';
import { useState } from 'react';
import { Link } from './link';
import { Tool } from './tool';

export const Stack = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="grid gap-3">
        {stack
          .sort((a, b) => (b.affiliate ? 1 : -1))
          .filter((tool) => tool.featured || open)
          .map((tool) => (
            <Tool key={tool.name} {...tool} />
          ))}
      </div>
      {!open && stack.some((tool) => !tool.affiliate) && (
        <div className="flex w-full items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="cursor-pointer text-left text-foreground-lighter text-sm hover:text-foreground"
          >
            Show more tools...
          </button>
          <Link
            href="https://logo.dev"
            aria-label="Logo API"
            target="_blank"
            className="text-foreground-lighter text-xs hover:text-foreground"
          >
            Logos provided by Logo.dev
          </Link>
        </div>
      )}
    </>
  );
};
