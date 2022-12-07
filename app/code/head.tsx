import type { FC } from 'react';
import Seo from '@/components/seo';

const title = 'Code';
const description = 'My shared code repositories and NPM packages';
const path = '/code';

const Head: FC = () => (
  <Seo title={title} description={description} path={path} />
);

export default Head;
