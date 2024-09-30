import { Card } from '@/components/card';
import { Video } from '@/components/video';
import type { ReactElement } from 'react';

const VideoCard = async (): Promise<ReactElement> => (
  <Card title="Latest Drone Video">
    <Video url="https://youtu.be/5NOgrMM72k8" controls />
  </Card>
);

export default VideoCard;
