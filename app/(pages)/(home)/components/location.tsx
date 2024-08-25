import { get } from '@vercel/edge-config';

export const Location = async () => {
  const location = await get<string>('location');

  if (!location) {
    return <div />;
  }

  return location;
};
