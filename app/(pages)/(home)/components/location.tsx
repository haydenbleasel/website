import { get } from '@vercel/edge-config';
import { cn } from '@/lib/utils';
import type { ReactElement } from 'react';

export const Location = async (): Promise<ReactElement> => {
  const timeZone = await get<string>('timezone');
  const location = await get<string>('location');

  if (!timeZone || !location) {
    return <div />;
  }

  return (
    <>
      {location}{' '}
      <div
        className={cn(
          'not-prose align-text-bottom inline-flex overflow-hidden border rounded-md shadow-[0_1px_8px_0_rgba(0,0,0,0.04)] scale-[0.8] md:scale-100',
          'border-neutral-200',
          'dark:border-neutral-700'
        )}
      >
        <span
          className={cn(
            'px-2 py-1.5 text-sm font-medium shadow-[inset_0_-2px_5px_0_rgba(0,0,0,0.07)]',
            'bg-neutral-100',
            'dark:bg-neutral-800'
          )}
        >
          🌤️
        </span>{' '}
        <span
          className={cn(
            'px-2 py-1.5 text-sm font-medium shadow-[inset_0_-2px_5px_0_rgba(0,0,0,0.07)]',
            'bg-white',
            'dark:bg-neutral-800'
          )}
        >
          {new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            timeZone,
          }).format(new Date())}
        </span>
      </div>
    </>
  );
};
