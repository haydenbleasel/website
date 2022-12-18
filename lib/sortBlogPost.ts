import type { Blog, CaseStudy } from '@/.contentlayer/generated';

const sortBlogPostByDate = (
  blogPostA: Blog | CaseStudy,
  blogPostB: Blog | CaseStudy
): number =>
  new Date(blogPostB.date).getTime() > new Date(blogPostA.date).getTime()
    ? 1
    : -1;

export default sortBlogPostByDate;
