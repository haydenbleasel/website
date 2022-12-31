import type { CaseStudy } from '@/.contentlayer/generated';

const sortBlogPostByDate = (
  blogPostA: CaseStudy,
  blogPostB: CaseStudy
): number =>
  new Date(blogPostB.date).getTime() > new Date(blogPostA.date).getTime()
    ? 1
    : -1;

export default sortBlogPostByDate;
