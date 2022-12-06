import type { FC } from 'react';
import FormatHead from '@/components/formatHead';

const title = 'Blog';
const description = 'Thoughts, ideas, and opinions.';
const path = '/blog';

const Head: FC = () => (
  <FormatHead title={title} description={description} path={path} />
);

export default Head;
