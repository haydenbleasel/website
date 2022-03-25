import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import type {
  KeyTextField,
  PrismicDocumentWithUID,
  SliceZone,
} from '@prismicio/types';
import type { Post } from '../../../types/post';
import { getPages } from '../../../utils/prismic';
import BlogTemplate from '../../../templates/blog';

type BlogData = {
  posts: Post[];
};

const Blog: FC<BlogData> = ({ posts }) => <BlogTemplate posts={posts} />;

export const getStaticProps: GetStaticProps = async () => {
  const caseStudies = (await getPages('case-study')) as PrismicDocumentWithUID<{
    title: KeyTextField;
    description: KeyTextField;
    slices: SliceZone;
  }>[];

  const posts: Post[] = caseStudies.map((caseStudy) => ({
    id: caseStudy.uid,
    title: caseStudy.data.description ?? '',
    date: caseStudy.first_publication_date,
    link: `/blog/work/${caseStudy.uid}`,
  }));

  return {
    props: {
      posts,
    },
  };
};

export default Blog;
