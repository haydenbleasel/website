'use client';

import { type ComponentProps, useState } from 'react';
import { Feature } from './feature';

type FeaturesProps = {
  data: ComponentProps<typeof Feature>[];
};

export const Features = ({ data }: FeaturesProps) => {
  const [open, setOpen] = useState(false);

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
