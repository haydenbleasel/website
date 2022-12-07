import type { Blog } from '@/.contentlayer/generated';

const sortBlogPostByDate = (blogPostA: Blog, blogPostB: Blog): number =>
  new Date(blogPostB.date).getTime() > new Date(blogPostA.date).getTime()
    ? 1
    : -1;

export default sortBlogPostByDate;
