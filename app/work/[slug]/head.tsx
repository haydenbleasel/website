import { allWorkPosts } from 'contentlayer/generated';
import type { FC } from 'react';
import Seo from '@/components/seo';

type MdxHeadProps = {
  params?: {
    slug?: string;
  };
};

const Head: FC<MdxHeadProps> = ({ params }) => {
  const slug = params?.slug;
  const mdxDoc = allWorkPosts.find((doc) => doc.slug === slug);

  if (!mdxDoc) {
    return null;
  }

  return (
    <Seo
      title={`${mdxDoc.role} at ${mdxDoc.company}`}
      description={mdxDoc.description}
      path={`/work/${mdxDoc.slug}`}
    />
  );
};

export default Head;
