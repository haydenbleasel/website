import { allPosts } from 'content-collections';
import { Post } from '@/components/post';

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

const Posts = () => (
  <div className="not-prose grid gap-12">
    {Object.entries(postsByYear)
      .sort(([a], [b]) => Number(b) - Number(a))
      .map(([year, posts]) => (
        <div key={year}>
          <h2 className="font-medium text-3xl">{year}</h2>
          <ul className="mt-6 grid gap-6">
            {posts.map((post) => (
              <li key={post._meta.path}>
                <Post {...post} />
              </li>
            ))}
          </ul>
        </div>
      ))}
  </div>
);

export default Posts;
