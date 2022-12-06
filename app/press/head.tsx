import type { FC } from 'react';
import FormatHead from '@/components/formatHead';

const title = 'Press';
const description = 'Press mentions and articles about me.';
const path = '/press';

const Head: FC = () => (
  <FormatHead title={title} description={description} path={path} />
);

export default Head;
