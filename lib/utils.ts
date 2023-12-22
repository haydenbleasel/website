import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Blog, Work } from '@/.contentlayer/generated';
import type { Thing, WithContext } from 'schema-dts';
import type { ClassValue } from 'clsx';

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

export const toJsonLd = <T extends Thing>(
  json: WithContext<T>
): string => `<script type="application/ld+json">
${JSON.stringify(json, null, 2)}
</script>`;

export const isValidEmail = (email: string): boolean => /.+@.+/u.test(email);

export const formatDate = (date: string): string =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'America/New_York',
  }).format(new Date(date));

export const sortBlogPostByDate = (blogPostA: Blog, blogPostB: Blog): number =>
  new Date(blogPostB.date).getTime() > new Date(blogPostA.date).getTime()
    ? 1
    : -1;

export const sortByStartYear = (workA: Work, workB: Work): number => {
  if (!workA.endYear) {
    return -1;
  }

  if (!workB.endYear) {
    return 1;
  }

  return workB.endYear - workA.endYear;
};
