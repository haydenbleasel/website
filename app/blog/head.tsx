import type { FC } from 'react';
import Seo from '@/components/seo';

const title = 'Blog';
const description = 'Thoughts, ideas, and opinions.';
const path = '/blog';

const Head: FC = () => (
  <Seo title={title} description={description} path={path} />
);

export default Head;
