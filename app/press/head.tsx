import type { FC } from 'react';
import Seo from '@/components/seo';

const title = 'Press';
const description = 'Press mentions and articles about me.';
const path = '/press';

const Head: FC = () => (
  <Seo title={title} description={description} path={path} />
);

export default Head;
