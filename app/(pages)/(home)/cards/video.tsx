import { Card } from '@/components/card';
import { Video } from '@/components/video';
import { get } from '@vercel/edge-config';
import type { ReactElement } from 'react';

export const VideoCard = async (): Promise<ReactElement> => {
  const video = await get<string>('video');

  if (!video) {
    return <div />;
  }

  return (
    <Card title="Latest Drone Video">
      <Video url={video} controls />
    </Card>
  );
};
