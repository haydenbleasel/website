import { allBlogs } from 'contentlayer/generated';
import type { FC } from 'react';
import Seo from '@/components/seo';

type MdxHeadProps = {
  params?: {
    slug?: string;
  };
};

const Head: FC<MdxHeadProps> = ({ params }) => {
  const slug = params?.slug;
  const mdxDoc = allBlogs.find((doc) => doc.slugAsParams === slug);

  if (!mdxDoc) {
    return null;
  }

  return (
    <Seo
      title={mdxDoc.title}
      description={mdxDoc.description}
      path={mdxDoc.slug}
      image={mdxDoc.image}
    />
  );
};

export default Head;
