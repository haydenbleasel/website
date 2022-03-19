import type { GetStaticProps } from "next";
import type { FC } from "react";
import type { KeyTextField, PrismicDocumentWithUID, SliceZone } from "@prismicio/types";
import { getDevPosts } from "../../utils/dev";
import type { Post } from "../../types/post";
import { getPages } from "../../utils/prismic";
import BlogTemplate from '../../templates/blog';
import { getMediumPosts } from "../../utils/medium";

type BlogData = {
  posts: Post[];
}

const Blog: FC<BlogData> = ({ posts }) => (
  <BlogTemplate posts={posts} />
);

export const getStaticProps: GetStaticProps = async () => {
  const mediumPosts = await getMediumPosts();
  const devPosts = await getDevPosts();
  const caseStudies = await getPages('case-study') as PrismicDocumentWithUID<{
    title: KeyTextField;
    description: KeyTextField;
    slices: SliceZone;
  }>[];

  const posts = [
    ...mediumPosts,
    ...devPosts,
    ...caseStudies.map((caseStudy) => ({
      id: caseStudy.uid,
      title: caseStudy.data.description,
      date: caseStudy.first_publication_date,
      link: `/blog/work/${caseStudy.uid}`,
    })) as Post[],
  ];

  return {
    props: {
      posts,
    }
  }
};

export default Blog;