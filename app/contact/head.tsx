import type { FC } from 'react';
import FormatHead from '@/components/formatHead';

const title = 'Contact';
const description = 'Get in touch by email or social media.';
const path = '/contact';

const Head: FC = () => (
  <FormatHead title={title} description={description} path={path} />
);

export default Head;
