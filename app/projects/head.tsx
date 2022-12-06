import type { FC } from 'react';
import FormatHead from '@/components/formatHead';

const title = 'Projects';
const description = 'A collection of projects I have worked on.';
const path = '/projects';

const Head: FC = () => (
  <FormatHead title={title} description={description} path={path} />
);

export default Head;
