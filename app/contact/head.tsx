import type { FC } from 'react';
import Seo from '@/components/seo';

const title = 'Contact';
const description = 'Get in touch by email or social media.';
const path = '/contact';

const Head: FC = () => (
  <Seo title={title} description={description} path={path} />
);

export default Head;
