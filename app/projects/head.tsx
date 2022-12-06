import type { FC } from 'react';
import Seo from '@/components/seo';

const title = 'Projects';
const description = 'A collection of projects I have worked on.';
const path = '/projects';

const Head: FC = () => (
  <Seo title={title} description={description} path={path} />
);

export default Head;
