import type { FC } from 'react';
import Seo from '@/components/seo';

const title = 'Playlists';
const description = 'A collection of playlists I have made.';
const path = '/playlists';

const Head: FC = () => (
  <Seo title={title} description={description} path={path} />
);

export default Head;
