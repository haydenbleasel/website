import type { FC } from 'react';
import FormatHead from '@/components/formatHead';

const title = 'My Stack';
const description = 'Tools and technologies I use.';
const path = '/stack';

const Head: FC = () => (
  <FormatHead title={title} description={description} path={path} />
);

export default Head;
