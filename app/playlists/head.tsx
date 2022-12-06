import type { FC } from 'react';
import FormatHead from '@/components/formatHead';

const title = 'Playlists';
const description = 'A collection of playlists I have made.';
const path = '/playlists';

const Head: FC = () => (
  <FormatHead title={title} description={description} path={path} />
);

export default Head;
