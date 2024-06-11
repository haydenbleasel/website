import { get } from '@vercel/edge-config';
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
      <div className="not-prose align-text-bottom inline-flex overflow-hidden border rounded-md shadow-[0_1px_8px_0_rgba(0,0,0,0.04)] border-gray-200 scale-[0.8] md:scale-100">
        <span className="px-2 py-1.5 text-sm font-medium bg-gray-100 shadow-[inset_0_-2px_5px_0_rgba(0,0,0,0.07)]">
          🌤️
        </span>{' '}
        <span className="px-2 py-1.5 text-sm font-medium bg-white shadow-[inset_0_-2px_5px_0_rgba(0,0,0,0.07)]">
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
