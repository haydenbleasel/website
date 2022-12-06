import type { FC } from 'react';
import Seo from '@/components/seo';

const title = 'Work';
const description = 'A collection of work I have done.';
const path = '/work';

const Head: FC = () => (
  <Seo title={title} description={description} path={path} />
);

export default Head;
