import type { FC } from 'react';
import FormatHead from '@/components/formatHead';

const title = 'Work';
const description = 'A collection of work I have done.';
const path = '/work';

const Head: FC = () => (
  <FormatHead title={title} description={description} path={path} />
);

export default Head;
