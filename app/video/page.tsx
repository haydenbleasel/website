import { Video } from '@/components/video';
import { Container } from '@/components/container';
import type { FC } from 'react';

const VideoPage: FC = () => (
  <Container>
    <h1>Videos</h1>
    <h2>Delray Beach</h2>
    <Video controls url="https://www.youtube.com/watch?v=gBl6Ue9LQlU" />
    <h2>Pompano Beach</h2>
    <Video controls url="https://www.youtube.com/watch?v=khtU6emGjtg" />
    <h2>Sydney</h2>
    <Video controls url="https://www.youtube.com/watch?v=on4L86BnJz0" />
  </Container>
);

export default VideoPage;
