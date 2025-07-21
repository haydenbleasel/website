import { Post } from '@/components/post';
import { createMetadata } from '@/lib/metadata';
import { allPosts } from 'content-collections';
import type { Metadata } from 'next';

const postsByYear = allPosts
  .sort((a, b) => b.date.getTime() - a.date.getTime())
  .reduce(
    (acc, post) => {
      const year = post.date.getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    },
    {} as Record<number, typeof allPosts>
  );

const title = 'Blog';
const description = 'Thoughts, stories and ideas.';

export const metadata: Metadata = createMetadata({
  title,
  description,
  ogText: 'My blog — thoughts, stories and ideas.',
});

const Posts = () => (
  <>
    <div className="not-prose not-prose mb-12 gap-0">
      <h1 className="font-semibold text-4xl">{title}</h1>
      <p className="mt-2 text-lg text-muted-foreground">{description}</p>
    </div>
    <div className="not-prose grid gap-12">
      {Object.entries(postsByYear)
        .sort(([a], [b]) => Number(b) - Number(a))
        .map(([year, posts]) => (
          <div key={year}>
            <h2 className="font-normal text-muted-foreground text-sm">
              {year}
            </h2>
            <ul className="grid gap-6">
              {posts.map((post) => (
                <li key={post._meta.path}>
                  <Post {...post} />
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  </>
);

export default Posts;
