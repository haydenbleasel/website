'use client';

import { HoverCard } from 'radix-ui';
import { type ReactNode, useEffect, useState } from 'react';

type LocationCardProps = {
  children: ReactNode;
};

export const LocationCard = ({ children }: LocationCardProps) => {
  const setTimeZone = 'America/New_York';
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timezones = [
    {
      label: 'You',
      timeZone: userTimeZone,
    },
    {
      label: 'PST',
      timeZone: setTimeZone,
    },
  ];

  return (
    <HoverCard.Root openDelay={20} closeDelay={20}>
      <HoverCard.Trigger className="border-dotted">
        {children}
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          side="top"
          className="rounded-lg bg-background p-4 shadow-xl"
        >
          <div className="flex flex-col gap-2">
            {timezones.map(({ label, timeZone }) => (
              <div
                key={label}
                className="flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-1.5">
                  <div className="flex h-4 items-center justify-center rounded-xs bg-secondary px-1.5">
                    <span className="font-mono">{label}</span>
                  </div>
                  <span>
                    {new Intl.DateTimeFormat('en-US', {
                      dateStyle: 'long',
                      timeZone,
                    }).format(time)}
                  </span>
                </div>
                <span className="text-foreground-lighter tabular-nums">
                  {new Intl.DateTimeFormat('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    timeZone,
                  }).format(time)}
                </span>
              </div>
            ))}
          </div>
          <HoverCard.Arrow className="fill-background" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};
