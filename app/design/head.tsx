import type { FC } from 'react';
import Seo from '@/components/seo';

const title = 'Design';
const description = 'My shared design files and portfolio.';
const path = '/design';

const Head: FC = () => (
  <Seo title={title} description={description} path={path} />
);

export default Head;
