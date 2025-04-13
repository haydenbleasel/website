'use client';

import { type ComponentProps, useState } from 'react';
import { Tool } from './tool';

type StackProps = {
  data: ComponentProps<typeof Tool>[];
};

export const Stack = ({ data }: StackProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="grid gap-3">
        {data
          .sort((a, b) => (b.affiliate ? 1 : -1))
          .filter((tool) => tool.featured || open)
          .map((tool) => (
            <Tool key={tool.name} {...tool} />
          ))}
      </div>
      {!open && data.some((tool) => !tool.affiliate) && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="cursor-pointer text-left text-foreground-lighter text-sm hover:text-foreground"
        >
          Show more tools...
        </button>
      )}
    </>
  );
};
