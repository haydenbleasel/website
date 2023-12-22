import { Video } from '@/components/video';
import { Container } from '@/components/container';
import type { FC } from 'react';

const VideoPage: FC = () => (
  <Container>
    <h1>Video</h1>
    <Video
      controls
      url="https://www.youtube.com/watch?v=on4L86BnJz0&list=PLw95VUVc_2gh5oGx-jj9PnatiMKtQBiV2"
    />
  </Container>
);

export default VideoPage;
