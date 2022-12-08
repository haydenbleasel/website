import type { FC } from 'react';
import Seo from '@/components/seo';

const title = 'Modern Frontend Engineering';
const description =
  'A series on the tools and technologies in frontend engineering and how we can use them to build great user experiences.';
const path = '/blog/frontend';

const Head: FC = () => (
  <Seo title={title} description={description} path={path} />
);

export default Head;
