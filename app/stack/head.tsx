import type { FC } from 'react';
import Seo from '@/components/seo';

const title = 'My Stack';
const description = 'Tools and technologies I use.';
const path = '/stack';

const Head: FC = () => (
  <Seo title={title} description={description} path={path} />
);

export default Head;
