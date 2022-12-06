import type { FC } from 'react';
import FormatHead from '@/components/formatHead';

const title = 'About';
const description = 'A little bit about me.';
const path = '/about';

const Head: FC = () => (
  <FormatHead title={title} description={description} path={path} />
);

export default Head;
