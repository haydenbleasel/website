import { allWorkPosts } from 'contentlayer/generated';
import type { FC } from 'react';

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

  const title = `${mdxDoc.role} at ${mdxDoc.company} - Hayden Bleasel`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={mdxDoc.description} />
    </>
  );
};

export default Head;
