import type { FC } from 'react';
import Seo from '@/components/seo';

const title = 'Case Studies';
const description = 'Some of my projects from across the years.';
const path = '/case-studies';

const Head: FC = () => (
  <Seo title={title} description={description} path={path} />
);

export default Head;
