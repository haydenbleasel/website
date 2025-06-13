'use client';

import { interviews, speaking } from '@/lib/live';
import { useState } from 'react';
import { Feature } from './feature';

export const Features = () => {
  const [open, setOpen] = useState(false);
  const data = [...speaking, ...interviews];

  return (
    <>
      <div className="grid gap-3">
        {data.slice(0, open ? data.length : 5).map((feature) => (
          <Feature key={feature.name} {...feature} />
        ))}
      </div>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="cursor-pointer text-left text-foreground-lighter text-sm hover:text-foreground"
        >
          and more...
        </button>
      )}
    </>
  );
};
