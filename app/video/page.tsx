import { Video } from '@/components/video';
import { Container } from '@/components/container';
import { createMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import type { FC } from 'react';

const title = 'Videos';
const description = 'Drone footage of my travels.';

export const metadata: Metadata = createMetadata({
  title,
  description,
  path: '/videos',
});

const VideoPage: FC = () => (
  <Container>
    <h1 className="mb-0">{title}</h1>
    <p>{description}</p>
    <h2>Delray Beach</h2>
    <Video controls url="https://www.youtube.com/watch?v=gBl6Ue9LQlU" />
    <h2>Pompano Beach</h2>
    <Video controls url="https://www.youtube.com/watch?v=khtU6emGjtg" />
    <h2>Sydney</h2>
    <Video controls url="https://www.youtube.com/watch?v=on4L86BnJz0" />
  </Container>
);

export default VideoPage;
