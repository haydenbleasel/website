import type { FC } from 'react';
import Seo from '@/components/seo';

const title = 'About';
const description = 'A little bit about me.';
const path = '/about';

const Head: FC = () => (
  <Seo title={title} description={description} path={path} />
);

export default Head;
